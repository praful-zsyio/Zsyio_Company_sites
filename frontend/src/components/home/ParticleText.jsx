import React, { useMemo, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// ─────────────────────────────────────────────────────────────
// VERTEX SHADER
// ─────────────────────────────────────────────────────────────
const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform vec3  uMouse;
  uniform float uRadius;
  uniform float uForce;

  attribute vec3  aInitialPosition;
  attribute float aRandom;

  varying float vDist;
  varying float vForce;

  vec4 permute4(vec4 x){ return mod(((x * 34.0) + 1.0) * x, 289.0); }
  vec4 taylorInvSqrt4(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v){
    const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g  = step(x0.yzx, x0.xyz);
    vec3 l  = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
    i = mod(i, 289.0);
    vec4 p = permute4(permute4(permute4(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3  ns = n_ * D.wyz - D.xzx;
    vec4 j  = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x  = x_ * ns.x + ns.yyyy;
    vec4 y  = y_ * ns.x + ns.yyyy;
    vec4 h  = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt4(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
  }

  vec3 curlNoise(vec3 p){
    float e  = 0.05;
    float dx = snoise(p + vec3(e, 0.0, 0.0)) - snoise(p - vec3(e, 0.0, 0.0));
    float dy = snoise(p + vec3(0.0, e, 0.0)) - snoise(p - vec3(0.0, e, 0.0));
    float dz = snoise(p + vec3(0.0, 0.0, e)) - snoise(p - vec3(0.0, 0.0, e));
    return vec3(dy - dz, dz - dx, dx - dy) / (2.0 * e);
  }

  void main(){
    vec3 pos = aInitialPosition;

    pos.y += 0.3;
    pos.x += 0.2;

    vec2  diff      = pos.xy - uMouse.xy;
    float ellipDist = length(vec2(diff.x / uRadius, diff.y / (uRadius * 4.0)));
    float influence = smoothstep(1.0, 0.0, ellipDist) * uForce;
    vDist           = ellipDist;
    vForce          = uForce;

    vec3 pushDir = normalize(pos - uMouse + vec3(0.001, 0.001, 0.0));

    // Heavy math only runs when near the cursor
    vec3 noise = vec3(0.0);
    if (influence > 0.001) {
      noise = curlNoise(pos * 0.28 + uTime * 0.65);
    }

    float breathe = snoise(pos * 0.9 + uTime * 0.5) * 0.07;
    pos.z += breathe;

    pos += (pushDir * 0.9 + noise * 1.8) * influence * (1.5 + aRandom * 0.9);

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    
    // Increased base size from 12.0 to 18.0 to ensure solid coverage without gaps
    gl_PointSize = (18.0 / -mv.z) * (1.1 + aRandom * 0.3);
    gl_Position  = projectionMatrix * mv;
  }
`;

// ─────────────────────────────────────────────────────────────
// FRAGMENT SHADER
// ─────────────────────────────────────────────────────────────
const fragmentShader = /* glsl */ `
  uniform float uRadius;
  uniform vec3  uBaseColor;
  uniform vec3  uAccentColor;
  varying float vDist;
  varying float vForce;

  void main(){
    vec2  coord = gl_PointCoord - 0.5;
    float r     = length(coord);
    if(r > 0.5) discard;

    // Sharpened edge gradient to prevent transparency holes between particles
    float alpha  = smoothstep(0.5, 0.25, r);
    float glow   = smoothstep(uRadius, 0.3, vDist) * vForce;
    vec3  col    = mix(uBaseColor, uAccentColor, glow);

    gl_FragColor = vec4(col, alpha);
  }
`;

// ─────────────────────────────────────────────────────────────
// SAMPLE TEXT → PARTICLE POSITIONS
// ─────────────────────────────────────────────────────────────
function buildPoints(text, fontFamily = '"Arial Black", Impact, Arial, sans-serif') {
  const W = 1200, H = 300;
  const cvs = document.createElement('canvas');
  cvs.width = W; 
  cvs.height = H;
  const ctx = cvs.getContext('2d', { willReadFrequently: true });

  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, W, H);

  const fontSize = Math.floor(H * 0.82);
  ctx.font = `900 ${fontSize}px ${fontFamily}`;
  ctx.fillStyle = '#fff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, W / 2, H / 2);

  const px = ctx.getImageData(0, 0, W, H).data;
  const pos = [];
  const rnd = [];

  // DENSITY = 1 visits every pixel; tight jitter packs dots with zero voids
  const DENSITY = 1;
  const PER_PIXEL = 2;

  for (let y = 0; y < H; y += DENSITY) {
    for (let x = 0; x < W; x += DENSITY) {
      if (px[(y * W + x) * 4] > 100) {
        for (let k = 0; k < PER_PIXEL; k++) {
          const jx = (Math.random() - 0.5) * 0.45;
          const jy = (Math.random() - 0.5) * 0.45;
          pos.push(
            ((x + jx) / W - 0.5) * 14,
            -((y + jy) / H - 0.5) * 4.5,
            (Math.random() - 0.5) * 0.08
          );
          rnd.push(Math.random());
        }
      }
    }
  }

  return {
    positions: new Float32Array(pos),
    randoms: new Float32Array(rnd),
  };
}

// ─────────────────────────────────────────────────────────────
// 3-D SCENE
// ─────────────────────────────────────────────────────────────
function Scene({ text }) {
  const [geom, setGeom] = useState(null);

  useEffect(() => {
    const FONT = 'Barlow, "Arial Black", Arial, sans-serif';
    document.fonts
      .load(`900 200px Barlow`)
      .catch(() => { })
      .finally(() => {
        setGeom(buildPoints(text, FONT));
      });
  }, [text]);

  function cssHslToRgb(varName) {
    const raw = getComputedStyle(document.documentElement)
      .getPropertyValue(varName).trim();
    if (!raw) return new THREE.Color(1, 1, 1);
    const [h, s, l] = raw.split(' ').map(parseFloat);
    return new THREE.Color().setHSL(h / 360, s / 100, l / 100);
  }

  const uniforms = useMemo(() => {
    const base = cssHslToRgb('--text');
    const accent = cssHslToRgb('--highlight');
    return {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector3(999, 999, 0) },
      uRadius: { value: 0.7 },
      uForce: { value: 0.3 },
      uBaseColor: { value: new THREE.Vector3(base.r, base.g, base.b) },
      uAccentColor: { value: new THREE.Vector3(accent.r, accent.g, accent.b) },
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    function syncColors() {
      const base = cssHslToRgb('--text');
      const accent = cssHslToRgb('--highlight');
      uniforms.uBaseColor.value.set(base.r, base.g, base.b);
      uniforms.uAccentColor.value.set(accent.r, accent.g, accent.b);
    }
    const observer = new MutationObserver(syncColors);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, [uniforms]);

  const targetForce = useRef(0);
  const liveForce = useRef(0);
  const lastMoveT = useRef(0);
  const prevPointer = useRef({ x: 999, y: 999 });

  useFrame((state, delta) => {
    uniforms.uTime.value = state.clock.elapsedTime;

    const { pointer, viewport } = state;
    const currentX = (pointer.x * viewport.width) / 2;
    const currentY = (pointer.y * viewport.height) / 2;

    const dx = currentX - prevPointer.current.x;
    const dy = currentY - prevPointer.current.y;
    const hasMoved = dx * dx + dy * dy > 0.00001;

    if (hasMoved) {
      uniforms.uMouse.value.set(currentX, currentY, 0);
      targetForce.current = 1.0;
      lastMoveT.current = performance.now() / 1000;
      prevPointer.current.x = currentX;
      prevPointer.current.y = currentY;
    }

    const idle = performance.now() / 1000 - lastMoveT.current;
    if (targetForce.current > 0.001 && idle > 0.15) {
      targetForce.current = THREE.MathUtils.damp(targetForce.current, 0, 1.8, delta);
    }
    liveForce.current = THREE.MathUtils.damp(liveForce.current, targetForce.current, 22, delta);
    uniforms.uForce.value = liveForce.current;
  });

  if (!geom) return null;

  const { positions, randoms } = geom;

  return (
    <points key={text}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aInitialPosition"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aRandom"
          count={randoms.length}
          array={randoms}
          itemSize={1}
        />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </points>
  );
}

// ─────────────────────────────────────────────────────────────
// EXPORT
// ─────────────────────────────────────────────────────────────
export default function ParticleText({ text = 'ZSYIO' }) {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  // Automatically pauses the render loop when scrolled away
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
      <Canvas
        camera={{ position: [0, 0, 9], fov: 50 }}
        frameloop={isVisible ? 'always' : 'never'}
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
      >
        <Scene text={text} />
      </Canvas>
    </div>
  );
}