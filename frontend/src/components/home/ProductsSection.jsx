import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import ParticleText from './ParticleText';
import { getProducts } from '../../services/api';

gsap.registerPlugin(ScrollTrigger);

const ProductsSection = () => {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    getProducts()
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : [];
        setProducts(data.slice(0, 3)); // show up to 3 products on homepage
      })
      .catch((err) => console.error("Error fetching homepage products:", err));
  }, []);

  const sectionRef = useRef(null);
  const tagRef     = useRef(null);
  const headRef    = useRef(null);
  const subRef     = useRef(null);
  const cardsRef   = useRef(null);
  const linkRef    = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        defaults: { ease: 'power3.out' },
      });

      tl.from(tagRef.current?.children || [], { opacity: 0, y: 16, stagger: 0.07, duration: 0.5 })
        .from(headRef.current, { opacity: 0, y: 50, duration: 0.7 }, '-=0.3')
        .from(subRef.current, { opacity: 0, x: 24, duration: 0.5 }, '-=0.4')
        .from(cardsRef.current?.children || [], {
          opacity: 0,
          y: 40,
          stagger: 0.15,
          duration: 0.6,
        }, '-=0.2')
        .from(linkRef.current, { opacity: 0, y: 12, duration: 0.4 }, '-=0.2');
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className='mt-16 lg:mt-24 px-6 md:px-10 w-full'>
      {/* ── Section header ── */}
      <div className='flex justify-between lg:items-center flex-col lg:flex-row pb-4'>
        <div>
          <h3 ref={tagRef} className='text-[11px] md:text-[12px] font-medium text-[hsla(var(--highlight)/0.8)] uppercase flex flex-wrap gap-3 md:gap-5 pl-1 mb-2'>
            <span className='tracking-[.2rem]'>Digital </span>
            <span className='tracking-[.2rem]'>Goods</span>
          </h3>
          <h1 ref={headRef} className='text-[2.5rem] lg:text-[5rem] font-black font-Barlow uppercase leading-none'>
            Products
          </h1>
        </div>
        <h6 ref={subRef} className='text-[0.8rem] font-Barlow uppercase mt-3 lg:mt-0 max-w-xs text-right'>
          Tools to build faster.<br />Everything designed as a <span className='text-[hsl(var(--highlight))] font-medium'>masterpiece</span>.
        </h6>
      </div>

      {/* ── Products List ── */}
      <div ref={cardsRef} className='flex flex-col mb-12 border-b border-[hsl(var(--highlight))]'>
        {products.map((product) => {
          const id = product.id || product._id;
          const title = product.name || product.title || "Untitled";
          const category = product.category || "General";
          const price = product.price || product.starting_price || "Contact Us";
          const description = product.description || "";
          const image = product.image || product.cloudinary_image || null;

          return (
            <div key={id} className='group relative flex flex-col md:flex-row items-center border-t border-[hsl(var(--highlight))] py-6 md:py-8 gap-6 md:gap-12 transition-colors duration-500 hover:bg-[hsl(var(--highlight))]/5'>
              {/* Image area */}
              <div className='relative w-full md:w-1/3 h-48 md:h-56 shrink-0'>
                <div className='w-full h-full relative overflow-hidden rounded-[1.5rem] bg-[hsl(var(--mantle))]'>
                  {image ? (
                    <img 
                      src={image} 
                      alt={title} 
                      className='absolute inset-0 w-full h-full object-cover grayscale opacity-[0.55] transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105'
                    />
                  ) : (
                    <div className="w-full h-full bg-[hsla(var(--surface1)/0.5)] flex items-center justify-center text-[hsl(var(--subtext1))] font-barlow text-sm uppercase tracking-widest">
                      No Image
                    </div>
                  )}
                  <div className='absolute inset-0 pointer-events-none transition-opacity duration-500 group-hover:opacity-0 bg-gradient-to-br from-[hsla(var(--highlight)/0.18)] to-transparent' />
                </div>
              </div>
              
              {/* Details area */}
              <div className='flex-1 flex flex-col justify-center w-full'>
                <p className='font-Barlow text-[10px] tracking-[0.2em] uppercase font-medium text-[hsl(var(--highlight))] mb-2 md:mb-4'>
                  {category}
                </p>
                <h3 className='font-Barlow text-2xl md:text-4xl font-black uppercase tracking-tight mb-3 text-[hsl(var(--text))]'>
                  {title}
                </h3>
                <p className='text-sm md:text-base text-[hsla(var(--text)/0.8)] mb-6 max-w-lg font-Barlow line-clamp-2'>
                  {description}
                </p>
                
                <div className='w-full border-t border-[hsl(var(--highlight))] py-3 mb-6'>
                  <span className='font-Barlow text-[14px] md:text-[16px] tracking-[0.1em] font-bold text-[hsl(var(--highlight))]'>
                    {price !== "Contact Us" && !isNaN(Number(price)) ? `₹${price}` : price}
                  </span>
                </div>
                
                <div>
                  <Link to={`/products/${id}`} className='inline-flex bg-[hsla(var(--highlight))] justify-center items-center font-bold text-[14px] md:text-[15px] text-[hsla(var(--base))] px-5 py-3 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg shadow-[hsla(var(--highlight)/0.25)]'>
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── View all link ── */}
      <div ref={linkRef} className='flex justify-center mb-16'>
        <a
          href='/products'
          className='text-[0.8rem] font-Barlow uppercase tracking-[.15rem] text-[hsl(var(--highlight))] underline underline-offset-4 hover:opacity-70 transition-opacity'
        >
          Explore Store
        </a>
      </div>
    </section>
  );
};

export default ProductsSection;
