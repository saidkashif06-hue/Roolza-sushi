import React from 'react'
import Hero from '../components/Hero'
import Menu from '../components/OurMenu'
import OurStory from '../components/OurStory'
import Testimonials from '../components/Testimonials'
import FirstTimeHere from '../components/FirstTImeHere'
import FAQ from '../components/FAQ'
import CTA from '../components/CTA'

const Home = () => {
  return (
    <div>
      <Hero/>
      <Menu/>
      <OurStory/>
      <Testimonials/>
      <FirstTimeHere/>
      <FAQ/>
      <CTA/>
    </div>
  )
}

export default Home
