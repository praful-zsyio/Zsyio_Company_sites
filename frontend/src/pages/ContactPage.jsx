import React from 'react';
import Form from '../components/Form';
import NewsletterSection from '../components/globalComponents/NewsletterBox';
import ContactHero from '../components/contact/ContactHero';
import ProjectMarquee from '../components/projects/ProjectMarquee';
import { usePageSEO } from '../utils/seo';

const ContactPage = () => {
    usePageSEO({
        title: "Contact Us | Start Your Project",
        description: "Connect with Zsyio's engineering and consulting leaders to discuss enterprise software architecture, custom development, and technology strategy.",
        url: "/contact",
    });

    return (
        <main className="pt-20 md:pt-28 text-[hsl(var(--text))] min-h-screen flex flex-col">
            <ContactHero />
            <ProjectMarquee items={["Let's Build Something Great", 'Ready When You Are', 'Start a Conversation']} />
            <Form />
            <ProjectMarquee items={["We'd Love to Hear From You", 'Get In Touch', 'Transform Your Business']} />
            <NewsletterSection/>
        </main>
    );
};

export default ContactPage;
