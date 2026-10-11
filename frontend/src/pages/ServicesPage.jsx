import React from 'react'
import ServiceHero from '../components/services/ServiceHero'
import ServicesPageGrid from '../components/services/ServicesPageGrid'
import TechnologiesGrid from '../components/services/TechnologiesGrid'
import CartAndContact from '../components/services/CartAndContact'
import { usePageSEO } from '../utils/seo'

const ServicesPage = () => {
  usePageSEO({
    title: "Enterprise Technology Services & Consulting",
    description: "End-to-end technology solutions: application modernization, cloud architecture, AI/ML engineering, mobile apps, and distributed systems.",
    url: "/services",
  });

  return(
    <div className='w-full'>
      <ServiceHero/>
      <ServicesPageGrid/>
      <TechnologiesGrid />
      <CartAndContact />
    </div>
  )
}

export default ServicesPage
