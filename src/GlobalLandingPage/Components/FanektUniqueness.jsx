import React from 'react'
import Games from "./../assets/games.png"
function FanektUniqueness() {
    return (
        <div className='border border-[#235388] md:px-6 px-3 md:py-8 py-4 text-white rounded-xl bg-[linear-gradient(to_left,_#4a3649_20%,_#333b67_60%,_#393a61_100%)] flex flex-wrap items-start space-y-4'>
            <div className="lg:w-[60%] w-full space-y-2">
                <p className="lg:text-5xl md:text-4xl text-2xl font-medium">
                    What makes FANEKT Unique?
                </p>
                <p className="text-lg font-[400]">1. Connects physical products to digital identity through NFC powered SmartPatches.</p>
                <p className="text-lg font-[400]">2. Verifies real fans only – no bots, no fake followers.</p>
                <p className="text-lg font-[400]">3. Sponsors reach targets with 100% optimized ROI.</p>
                <p className="text-lg font-[400]">4. Fans earn FAN€KT Points (F̈) and get real value back from every action or purchase.</p>
                <p className="text-lg font-[400]">5. Clubs unlock new sponsor revenue beyond traditional merchandising and sponsors.</p>
                <p className="text-lg font-[400]">6. Potential FREE equipments (Jersey, Short & Socks) for some youth (Under 18) categories...</p>
                <p className="text-lg font-[400]">7. A global ecosystem where everyone wins: clubs, Athletes, Sponsors but above all the FANS.</p>
            </div>
            <div className="lg:w-[40%] w-full">
                <img src={Games} alt="" className='w-full' />
            </div>
        </div>
    )
}

export default FanektUniqueness