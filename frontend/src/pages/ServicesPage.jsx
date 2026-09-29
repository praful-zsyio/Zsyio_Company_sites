import React from 'react'
import ServiceHero from '../components/services/ServiceHero'
import ServicesPageGrid from '../components/services/ServicesPageGrid'
import TechnologiesGrid from '../components/services/TechnologiesGrid'
import CartAndContact from '../components/services/CartAndContact'

const ServicesPage = () => {
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
