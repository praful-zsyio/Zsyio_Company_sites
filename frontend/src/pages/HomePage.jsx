import React, { useRef } from 'react';
import VideoComponent from '../components/home/VideoComponent';
import HeroSection from '../components/home/HeroSection';
import AboutSection from '../components/home/AboutSection';
import MarqueeStrip from '../components/home/MarqueeStrip';
import ProjectsGlimpse from '../components/home/homeProjects/ProjectsGlimpse';
import PartnerMarquee from '../components/home/PartnerMarquee';
import ProductsSection from '../components/home/ProductsSection';
import Services from '../components/home/Services';
import NewsletterBox from '../components/globalComponents/NewsletterBox';
import EnggExcell from '../components/home/EnggExcell';

import StatsMarquee from '../components/home/StatsMarquee';
import { usePageSEO } from '../utils/seo';

const HomePage = () => {
  const mainRef = useRef(null);

  usePageSEO({
    title: "Enterprise Software Engineering & Digital Solutions",
    description: "Zsyio engineers scalable digital systems, cloud architectures, AI/ML platforms, and high-performance custom applications for global enterprises.",
    url: "/",
  });



  return (

    <main className='flex flex-col' 
    ref={mainRef}>
      <HeroSection />
      <MarqueeStrip />
      <Services />
      <ProjectsGlimpse />
      <PartnerMarquee />
      <ProductsSection />
      <EnggExcell />
      <StatsMarquee />
      <AboutSection />
      <NewsletterBox />
    </main>
  );
};

export default HomePage;