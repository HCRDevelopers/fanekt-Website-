import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from "./assets/logo.png";
import { Link, useLocation, useNavigate } from 'react-router-dom';
export default function Navbar({ onScanClick }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [isInstallable, setIsInstallable] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const handleBeforeInstallPrompt = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setIsInstallable(true);
        };

        const handleAppInstalled = () => {
            setDeferredPrompt(null);
            setIsInstallable(false);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        window.addEventListener('appinstalled', handleAppInstalled);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
            window.removeEventListener('appinstalled', handleAppInstalled);
        };
    }, []);

    const handleInstallClick = async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') {
                setDeferredPrompt(null);
                setIsInstallable(false);
            }
        }
    };

    const scrollToPortals = () => {
        if (location.pathname !== '/') {
            // Navigate to home page first
            navigate('/');
            // Wait for navigation to complete, then scroll
            setTimeout(() => {
                const portalElement = document.getElementById('portal-tabs');
                if (portalElement) {
                    portalElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                } else {
                    // If element not found, try again after a longer delay
                    setTimeout(() => {
                        const portalElementRetry = document.getElementById('portal-tabs');
                        if (portalElementRetry) {
                            portalElementRetry.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start'
                            });
                        }
                    }, 500);
                }
            }, 300);
        } else {
            // Already on home page, just scroll
            const portalElement = document.getElementById('portal-tabs');
            if (portalElement) {
                portalElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    };

    return (
        <nav className="bg-[#8a58a2] absolute top-0 left-0 z-40 bg-opacity-70 backdrop-blur-md shadow-md rounded-lg lg:mt-4 mt-2 w-[98%] ms-[1%]">
            <div className="w-full px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <div className="flex items-center space-x-3 group cursor-pointer flex-shrink-0">
                        <img src={Logo} className='h-[50px]' alt="" />
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-8 flex-1 justify-center">
                        <Link to="/" className={`font-medium hover:text-purple-100 transition-all duration-300 hover:scale-110 relative group ${location.pathname === '/' ? 'text-white' : 'text-white/80'}`}>
                            <span>Home</span>
                            <span className={`absolute -bottom-1 left-0 h-0.5 bg-white transition-all duration-300 ${location.pathname === '/' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                        </Link>
                        <Link to="/store" className={`font-medium hover:text-purple-100 transition-all duration-300 hover:scale-110 relative group ${location.pathname === '/store' ? 'text-white' : 'text-white/80'}`}>
                            <span>Store</span>
                            <span className={`absolute -bottom-1 left-0 h-0.5 bg-white transition-all duration-300 ${location.pathname === '/store' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                        </Link>
                        <Link to="/promos" className={`font-medium hover:text-purple-100 transition-all duration-300 hover:scale-110 relative group ${location.pathname === '/promos' ? 'text-white' : 'text-white/80'}`}>
                            <span>Promos</span>
                            <span className={`absolute -bottom-1 left-0 h-0.5 bg-white transition-all duration-300 ${location.pathname === '/promos' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                        </Link>
                        <button onClick={onScanClick} className="text-white/80 font-medium hover:text-white transition-all duration-300 hover:scale-110 relative group">
                            <span>Scan</span>
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                        </button>
                    </div>

                    {/* Desktop Buttons */}
                    <div className="hidden lg:flex items-center space-x-3 flex-shrink-0">
                        <Link to="/login" className="px-5 py-2.5 bg-white text-black font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg whitespace-nowrap">
                            Fan Login
                        </Link>
                        <button
                            onClick={scrollToPortals}
                            className="px-5 py-2.5 bg-white text-black font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg whitespace-nowrap"
                        >
                            Other Portals
                        </button>
                        <Link to="/fan/register" className="bg-[linear-gradient(to_bottom_right,_#155BF2_20%,_#7654b4_40%,_#FE4B5E_100%)] px-5 py-3 rounded-lg text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg whitespace-nowrap">
                            Join FanEkt
                        </Link>
                         <button 
                            onClick={handleInstallClick}
                            disabled={!isInstallable}
                            className={`px-6 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 ${!isInstallable ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                                Install FANEKT
                            </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="lg:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors duration-300"
                    >
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`lg:hidden transition-all duration-500 ease-in-out ${isMenuOpen ? 'max-h-[80vh] opacity-100 pb-6' : 'max-h-0 opacity-0 overflow-hidden'
                        }`}
                >
                    <div className="flex flex-col space-y-4 pt-4 max-h-[70vh] overflow-y-auto pr-2">
                        <Link to="/" className={`font-medium transition-colors duration-300 py-2 px-4 rounded-lg transform hover:translate-x-2 ${location.pathname === '/' ? 'text-white bg-white/20' : 'text-white/80 hover:text-white hover:bg-white/10'}`}>
                            Home
                        </Link>
                        <Link to="/store" className={`font-medium transition-colors duration-300 py-2 px-4 rounded-lg transform hover:translate-x-2 ${location.pathname === '/store' ? 'text-white bg-white/20' : 'text-white/80 hover:text-white hover:bg-white/10'}`}>
                            Store
                        </Link>
                        <Link to="/promos" className={`font-medium transition-colors duration-300 py-2 px-4 rounded-lg transform hover:translate-x-2 ${location.pathname === '/promos' ? 'text-white bg-white/20' : 'text-white/80 hover:text-white hover:bg-white/10'}`}>
                            Promos
                        </Link>
                        <button onClick={onScanClick} className="text-white/80 text-start font-medium hover:text-white transition-colors duration-300 py-2 px-4 rounded-lg hover:bg-white/10 transform hover:translate-x-2">
                            Scan
                        </button>
                        <div className="flex flex-col space-y-3 pt-4 border-t border-white/20">
                            <button className="px-6 py-2.5 bg-white text-purple-600 font-semibold rounded-lg hover:bg-purple-50 transition-all duration-300 transform hover:scale-105">
                                Fan Login
                            </button>
                            <button
                                onClick={scrollToPortals}
                                className="px-6 py-2.5 bg-white text-purple-600 font-semibold rounded-lg hover:bg-purple-50 transition-all duration-300 transform hover:scale-105"
                            >
                                Other Portals
                            </button>
                            <button className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
                                Join FanEKT
                            </button>
                            <button 
                                onClick={handleInstallClick}
                                disabled={!isInstallable}
                                className={`px-6 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 ${!isInstallable ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                Install FANEKT
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
