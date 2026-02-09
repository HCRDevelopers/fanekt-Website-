import React from 'react'
import HeroSection from './Components/HeroSection'
import RankingsDemo from './Components/RankingsOverview'
import FanektUniqueness from './Components/FanektUniqueness'
import PortalTabs from './Components/PortalTabs'
import Footer from '../Components/Footer/Footer'

function GlobalLandingPage() {
    return (
        <div className='bg-[linear-gradient(to_bottom_left,_#4a1755_30%,_#352862_50%,_#8a58a2_100%)] 
  min-h-[calc(100vh)]'>
            <div className="lg:p-8 p-2">
                <HeroSection />
            </div>
            <RankingsDemo />
            <div className="lg:px-8 lg:pb-8 px-2 pb-2">
                <FanektUniqueness />
            </div>
            <div className="lg:px-8 lg:pb-8 p-2">
                <PortalTabs />
            </div>
            <Footer />
        </div>
    )
}

export default GlobalLandingPage