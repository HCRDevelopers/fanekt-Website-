import React from 'react';
import Logo from './assets/logo.png'

const Footer = () => {
    return (
        <div className="lg:p-8 p-3">
            <footer className="bg-[#555179] text-white rounded-xl">
                {/* Main Content Section */}
                <div className="w-full lg:px-8 p-2">
                    <div className="flex lg:flex-nowrap flex-wrap space-y-4 items-start lg:space-x-5">
                        {/* Left Section - Logo and Branding */}
                        <div className="flex items-start justify-start lg:w-[320px] w-full">
                            <img src={Logo} className='w-[200px]' alt="" />
                        </div>

                        {/* Right Section - Content */}
                        <div>
                            {/* How FANEKT Points Works */}
                            <div className="mb-4">
                                <h2 className="lg:text-4xl text-2xl font-medium mb-4">How FANEKT points (FNKT) works</h2>
                                <p className="text-white text-lg font-[400] leading-relaxed mb-4">
                                    1F = 1 euro cent. Fans earn FANEKT points (F) through SmartPatch scans, F&F invitations and sponsor campaigns. Teams, clubs, athletes, FANEKT and all the verified fans share a transparent revenue split on every paid marketing campaign.
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-4 py-2 border border-white rounded-full text-xs">Fan earnings from sponsor campaigns</span>
                                    <span className="px-4 py-2 border border-white rounded-full text-xs">Clubs & teams share revenues</span>
                                    <span className="px-4 py-2 border border-white rounded-full text-xs">No fake metrics - only real fans</span>
                                    <span className="px-4 py-2 border border-white rounded-full text-xs">Athletes rewarded for their community</span>
                                </div>
                            </div>

                            {/* SmartPatch & Verification */}
                            <div className='mb-5'>
                                <h2 className="lg:text-4xl text-2xl font-medium mb-4">SmartPatch & Verification</h2>
                                <p className="text-white text-lg font-[400] leading-relaxed mb-4">
                                    Every X-KRYPTED item has a SmartPatch with a unique NFC code. When registered, it proves the item is genuine (can even be turned into a NFT) and linked to a real, verified fan. This is the base for everything: security, rewards, stadium access and future experiences.
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-4 py-2 rounded-full text-xs border border-white">Anti-fake, anti-bot</span>
                                    <span className="px-4 py-2 rounded-full text-xs border border-white">Stadium & arena ready</span>
                                    <span className="px-4 py-2 rounded-full text-xs border border-white">Multi-sport & multi-team</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-zinc-700">
                    <div className="max-w-7xl mx-auto px-6 py-6">
                        <div className="flex flex-wrap items-center justify-between gap-4 text-sm">
                            <div className="text-pink-400">
                                FANEKT™, All rights reserved.
                            </div>
                            <div className="flex flex-wrap items-center gap-6">
                                <a href="#" className="text-pink-400 hover:text-pink-300 transition-colors">Terms & Conditions</a>
                                <span className="text-zinc-600">|</span>
                                <a href="#" className="text-pink-400 hover:text-pink-300 transition-colors">Legal & Privacy</a>
                                <span className="text-zinc-600">|</span>
                                <a href="#" className="text-pink-400 hover:text-pink-300 transition-colors">FAQ</a>
                                <span className="text-zinc-600">|</span>
                                <a href="#" className="text-pink-400 hover:text-pink-300 transition-colors">Admin Login</a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;