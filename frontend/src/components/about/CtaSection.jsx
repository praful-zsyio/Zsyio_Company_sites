import React from "react";

const CtaSection = () => {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden border-t border-[hsla(var(--lavender)/0.4)] text-[hsl(var(--text))]">
      <div className="container mx-auto px-6 md:px-10 max-w-7xl">
        <div className="flex flex-col lg:flex-row justify-between gap-16 lg:gap-0">
          
          {/* Left / Main Content */}
          <div className="flex flex-col justify-center flex-1 w-full lg:w-[55%] lg:pr-16">
            <h3 className="text-[11px] md:text-[12px] font-medium font-barlow text-[hsla(var(--lavender)/0.8)] uppercase flex gap-4 pl-1 mb-4">
              <span className="tracking-[.2em]">Ready to start?</span>
            </h3>

            <h2 className="font-barlow text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight mb-6 mt-2 leading-none">
              Let's Build <br />
              <span className="text-[hsla(var(--lavender))]">Something Great.</span>
            </h2>

            <p className="font-barlow text-lg md:text-xl text-[hsla(var(--text)/0.7)] max-w-xl mb-10 leading-relaxed">
              Have a project in mind, exploring an idea, or want to understand how
              we work? Our team would love to hear from you.
            </p>

            <div className="flex items-center gap-6 flex-wrap">
              <a
                href="/contact"
                className="
                  inline-flex items-center justify-center
                  bg-[hsl(var(--text))] text-[hsl(var(--base))]
                  font-barlow font-bold text-[11px] md:text-xs px-10 py-4 uppercase tracking-[0.2em]
                  hover:bg-[hsl(var(--lavender))] hover:text-[hsl(var(--base))]
                  transition-colors duration-300
                "
              >
                Get in Touch
              </a>
              <p className="font-barlow text-[9px] md:text-[10px] uppercase tracking-[0.15em] font-bold text-[hsla(var(--text)/0.5)] leading-relaxed">
                Expect a response <br /> within 24 hours.
              </p>
            </div>
          </div>

          {/* Right / Decorative & Contact Info */}
          <div className="flex flex-col flex-1 w-full lg:border-l border-[hsla(var(--lavender)/0.4)] lg:pl-16 lg:py-8 mt-4 lg:mt-0 justify-between">
            <div className="flex flex-col gap-10">
              <div className="flex flex-wrap gap-3 max-w-md">
                {['Design', 'Engineering', 'Strategy', 'Scaling'].map((tag) => (
                  <span key={tag} className="font-barlow text-[10px] tracking-[0.15em] uppercase font-bold border border-[hsl(var(--surface1))] text-[hsl(var(--text))] px-4 py-2">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-12 sm:gap-16 pt-8 border-t border-[hsla(var(--lavender)/0.4)]">
                <div>
                  <p className="font-barlow text-[10px] tracking-[0.2em] uppercase font-bold text-[hsla(var(--lavender)/0.8)] mb-3">General Inquiries</p>
                  <a href="mailto:hello@zsyio.com" className="font-barlow text-xl md:text-2xl font-medium hover:text-[hsl(var(--lavender))] transition-colors">
                    contact@zsyio.com
                  </a>
                </div>
                <div>
                  <p className="font-barlow text-[10px] tracking-[0.2em] uppercase font-bold text-[hsla(var(--lavender)/0.8)] mb-3">Headquarters</p>
                  <p className="font-barlow text-lg text-[hsla(var(--text)/0.7)] leading-relaxed">
                    Indore, India
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-12 pt-8 border-t border-[hsla(var(--lavender)/0.4)]">
              <p className="font-barlow text-2xl md:text-3xl font-medium text-[hsla(var(--text)/0.8)] leading-snug">
                "Great architecture is invisible, but its impact is felt everywhere."
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default CtaSection;