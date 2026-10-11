import React from "react";

const StorySection = () => {
  return (
    <section className="border-b border-[hsla(var(--highlight)/0.4)] grid grid-cols-1 md:grid-cols-2 text-[hsl(var(--text))] bg-transparent">
      {/* Left: Grayscale image */}
      <div className="animate-in-view relative overflow-hidden border-b md:border-b-0 md:border-r border-[hsla(var(--highlight)/0.4)] min-h-[400px] md:min-h-[560px]">
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&h=700&fit=crop&auto=format"
          alt="ZSYIO Office"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'grayscale(100%) contrast(1.1)' }}
        />
        {/* Overlay caption */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-[hsla(var(--highlight))] bg-[hsl(var(--base))] px-6 py-4">
          <p className="text-[10px] tracking-[0.25em] uppercase font-bold  text-[hsl(var(--highlight))]">Indore Hq</p>
        </div>
      </div>

      {/* Right: Narrative */}
      <div className="px-6 md:px-14 py-14 flex flex-col justify-between">
        <div className="animate-in-view">
          <p className="text-[11px] tracking-[0.25em] uppercase font-medium mb-8 opacity-50">Our Story</p>
          <div
            style={{ fontFamily: "var(--font-barlow, 'Barlow', sans-serif)", fontSize: 'clamp(6rem, 12vw, 14rem)', lineHeight: 1, letterSpacing: '-0.04em' }}
            className="font-black opacity-[0.08] select-none mb-[-2rem] mt-[-1rem] text-[hsl(var(--highlight))] "
          >
            2025
          </div>
          <p className="text-lg md:text-xl leading-relaxed opacity-70 mb-6 relative">
            It began with two engineers and a shared frustration: enterprise IT consulting was broken. The best talent was buried behind account managers. Proposals were padded. Accountability was vague.
          </p>
          <p className="text-base leading-relaxed opacity-60 mb-6">
            We built ZSYIO to fix that. Start lean. Stay senior. Make every promise in writing. Measure every outcome. The model worked — quietly, without press releases — one client at a time.
          </p>
          <p className="text-base leading-relaxed opacity-60">
            What started in a small room in Indore has evolved into a global movement, but the core remains unchanged. We still write our own code, lead our own projects, and answer our own emails.
          </p>
        </div>

        <div className="animate-in-view mt-10 pt-8 border-t border-[hsla(var(--highlight)/0.4)]">
          <p className="text-[11px] tracking-[0.2em] uppercase font-medium opacity-40 mb-3">Founders</p>
          <div className="flex flex-wrap gap-6">
            {[
              { name: 'Abhishek Tiwari', role: '' },
              { name: 'Ayan Magardey', role: '' },
              { name: 'Arpit Nigam', role: '' },
              { name: 'Ashutosh Kumar', role: '' },
              { name: 'Praful Sonwane', role: '' },
            ].map((f) => (
              <div key={f.name}>
                <p style={{ fontFamily: "var(--font-barlow, 'Barlow', sans-serif)" }} className="text-xl font-black uppercase text-[hsla(var(--highlight))]">{f.name}</p>
                <p className="text-[11px] tracking-[0.18em] uppercase font-medium opacity-40">{f.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
