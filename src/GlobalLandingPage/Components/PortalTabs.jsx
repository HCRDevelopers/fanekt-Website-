import React from 'react'
import { Link } from 'react-router-dom'

function PortalTabs() {
    return (
        <div id="portal-tabs" className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4 text-white'>
            {/* tab 1 start */}
            <div className="rounded-xl bg-[#7e55a5] p-4 flex flex-col">
                <div className="flex-grow">
                    <p className="lg:text-4xl text-2xl font-medium">For FANEKT Fans</p>
                    <p className="text-[17px] font-[400] mt-2">Create your FAN portal, register your X-KRYPTED items, climb the global rankings and RECEIVE YOUR SHARE OF SPONSOR CAMPAIGNS! Register children (U18) for great surprizes. The more you participate, the more you WIN, again & again.</p>
                    <ul className="text-[15px] font-[400] list-disc list-inside space-y-2 pl-4" style={{listStyleType: 'disc', fontSize: '17px'}}>
                        <li>Prove loyalty via SmartPatch scans & get rewarded.</li>
                        <li>Scan genuine items, invite others, interact & get rewarded.</li>
                        <li>Vote for teams & athletes you truly support & get rewarded.</li>
                    </ul>
                </div>

                <div className="grid sm:grid-cols-2 grid-cools-1 gap-2 mt-auto">
                    <Link to={"/login"} className="bg-transparent mt-3 text-white font-[500] text-[14px] px-auto py-3 rounded-lg whitespace-nowrap backdrop-blur-sm transition-all duration-300 border border-white/30 hover:border-white/50 flex items-center justify-center">
                        Fan Login
                    </Link>
                    <Link to={"/fan/register"} className="mt-3 bg-[linear-gradient(to_bottom_right,_#155BF2_20%,_#7654b4_40%,_#FE4B5E_100%)] px-auto py-3 rounded-lg text-white font-[500] text-[14px] transition-all duration-300 transform hover:scale-105 hover:shadow-lg whitespace-nowrap flex items-center justify-center">
                        Join as Fan
                    </Link>
                </div>
            </div>
            {/* tab 1 end */}
         
            {/* tab 1 start */}
            <div className="rounded-xl bg-[#7e55a5] p-4 flex flex-col">
                <div className="flex-grow">
                    <p className="lg:text-4xl text-2xl font-medium">For Clubs/Uni/Teams (PRO)</p>
                    <p className="text-[17px] font-[400] mt-2">Clubs, Teams & Universities, manage your verified FAN base, attach X-KRYPTED SmartPatches to jerseys and other merchandising and share revenues from sponsor campaigns targetting your fans.</p>
                    <ul className="text-[15px] font-[400] list-disc list-inside space-y-2 pl-4" style={{listStyleType: 'disc', fontSize: '17px'}}>
                        <li>Multi-sport: football, basketball, volleyball, handball, etc.</li>
                        <li>Know exactly who your real fans are and interact with them.</li>
                        <li>Automatic revenue sharing in FAN€KT together with your fans.</li>
                    </ul>
                </div>

               <div className="grid sm:grid-cols-2 grid-cools-1 gap-2 mt-auto">
                      <Link to={"/login"} className="bg-transparent mt-3 text-white font-[500] text-[14px] px-auto py-3 rounded-lg whitespace-nowrap backdrop-blur-sm transition-all duration-300 border border-white/30 hover:border-white/50 flex items-center justify-center">
                        Club/Uni/Team Login
                    </Link>
                    <Link to={"/team/register"} className="mt-3 bg-[linear-gradient(to_bottom_right,_#155BF2_20%,_#7654b4_40%,_#FE4B5E_100%)] px-auto py-3 rounded-lg text-white font-[500] text-[14px] transition-all duration-300 transform hover:scale-105 hover:shadow-lg whitespace-nowrap flex items-center justify-center">
                        Register Club/Uni/Team
                    </Link>
                </div>
            </div>
            {/* tab 1 end */}
            {/* tab 1 start */}
            <div className="rounded-xl bg-[#7e55a5] p-4 flex flex-col">
                <div className="flex-grow">
                    <p className="lg:text-4xl text-2xl font-medium">For Athletes & Other VIPs (PRO)</p>
                    <p className="text-[17px] font-[400] mt-2">Build your own verified community, connect your apparel or gear via SmartPatch and share value with your most loyal supporters.</p>
                    <ul className="text-[15px] font-[400] list-disc list-inside space-y-2 pl-4" style={{listStyleType: 'disc', fontSize: '17px'}}>
                        <li>For athletes across all sports and high-profile individuals involved in sports.</li>
                        <li>Direct relationship with verified fans worldwide.</li>
                        <li>Revenue sharing based on your real community.</li>
                    </ul>
                </div>

               <div className="grid sm:grid-cols-2 grid-cools-1 gap-2 mt-auto">
                    <Link to={"/login"} className="bg-transparent mt-3 text-white font-[500] text-[14px] px-auto py-3 rounded-lg whitespace-nowrap backdrop-blur-sm transition-all duration-300 border border-white/30 hover:border-white/50 flex items-center justify-center">
                        Athlete/Other Login
                    </Link>
                    <Link to={"/athlete/register"} className="mt-3 bg-[linear-gradient(to_bottom_right,_#155BF2_20%,_#7654b4_40%,_#FE4B5E_100%)] px-auto py-3 rounded-lg text-white font-[500] text-[14px] transition-all duration-300 transform hover:scale-105 hover:shadow-lg whitespace-nowrap flex items-center justify-center">
                        Register as Athlete/Other
                    </Link>
                </div>
            </div>
            {/* tab 1 end */}
            {/* tab 1 start */}
            <div className="rounded-xl bg-[#7e55a5] p-4 flex flex-col">
                <div className="flex-grow">
                    <p className="lg:text-4xl text-2xl font-medium">For Sponsors & Partners (PRO)</p>
                    <p className="text-[17px] font-[400] mt-2">Target real fans with zero waste: Use our State-of-the-Art marketing tools to reach fans and only pay when we connect you to your targets.</p>
                    <ul className="text-[15px] font-[400] list-disc list-inside space-y-2 pl-4" style={{listStyleType: 'disc', fontSize: '17px'}}>
                        <li>Pay-per-real interaction (scan, click, redemption).</li>
                        <li>Target by club, sport, age, location and more for your promotions & 'sale' campaigns or simply for Brand Awareness.</li>
                        <li>Transparent FAN€KT-based reporting and accounting.</li>
                    </ul>
                </div>

                <div className="grid sm:grid-cols-2 grid-cools-1 gap-2 mt-auto">
                    <Link to={"/login"} className="mt-3 bg-transparent text-white font-[500] text-[14px] px-auto py-3 rounded-lg whitespace-nowrap backdrop-blur-sm transition-all duration-300 border border-white/30 hover:border-white/50 flex items-center justify-center">
                        Sponsor Login
                    </Link>
                    <Link to={"/sponsor/register"} className="mt-3 bg-[linear-gradient(to_bottom_right,_#155BF2_20%,_#7654b4_40%,_#FE4B5E_100%)] px-auto py-3 rounded-lg text-white font-[500] text-[14px] transition-all duration-300 transform hover:scale-105 hover:shadow-lg whitespace-nowrap flex items-center justify-center">
                        Register as Sponsor
                    </Link>
                </div>
            </div>
            {/* tab 1 end */}

        </div>
    )
}

export default PortalTabs
