import React, { useRef } from 'react';
import VideoComponent from '../components/home/VideoComponent';
import HeroSection from '../components/home/HeroSection';
import AboutSection from '../components/home/AboutSection';
import ProjectsGlimpse from '../components/home/homeProjects/ProjectsGlimpse';
import Services from '../components/home/Services';
import NewsletterBox from '../components/globalComponents/NewsletterBox';

const HomePage = () => {
  const mainRef = useRef(null);


  return (

    <main className='flex flex-col' ref={mainRef}>
      <div className="relative flex items-center justify-center px-6 h-screen pt-16">
        <VideoComponent />

        <div className="relative z-10 w-full py-32 md:py-0">
          <HeroSection />
        </div>
      </div>
      <AboutSection />
      <ProjectsGlimpse />
      <Services />
      {/* <NewsletterBox /> */}
    </main>
  );
};

export default HomePage;