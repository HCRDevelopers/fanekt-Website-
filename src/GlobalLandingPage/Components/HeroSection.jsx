
import React, { forwardRef, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import LeftCorner from "./../assets/left-corner.png";
import RightCorner from "./../assets/right-corner.png";
import BgImg from "./../assets/bg.webp";
import Navbar from "../../Components/Navbar/Navbar";
import ScanSmartPatch from "../modals/ScanSmartPatch";
import { Link } from "react-router-dom";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const buttonVariants = {
  variant: {
    hero: "bg-[#14d8bf] text-white hover:bg-[#12c4ad] hover:shadow-[0_0_30px_rgba(20,216,191,0.4)] transition-all duration-300 hover:scale-105 font-semibold",
    heroSecondary: "bg-transparent border-2 border-[#14d8bf] text-[#14d8bf] hover:bg-[#14d8bf]/10 hover:shadow-[0_0_20px_rgba(20,216,191,0.3)] transition-all duration-300 hover:scale-105 font-semibold",
  },
  size: {
    xl: "h-14 rounded-lg px-10 text-base",
  },
};

const Button = forwardRef(({ className, variant = "default", size = "default", children, ...props }, ref) => {
  const variantClass = buttonVariants.variant[variant] || "";
  const sizeClass = buttonVariants.size[size] || "";

  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#14d8bf] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        variantClass,
        sizeClass,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});



const HeroSection = () => {
  const [isScanModalOpen, setIsScanModalOpen] = useState(false);

  const handleScanClick = () => {
    setIsScanModalOpen(true);
  };

  const handleCloseScanModal = () => {
    setIsScanModalOpen(false);
  };

  return (
    <section className="relative lg:min-h-[90vh] h-full rounded-xl shadow-sm shadow-[#424b64] overflow-hidden" style={{backgroundImage: `url(${BgImg})`, backgroundSize: 'cover', backgroundPosition: 'top'}}>
      <Navbar onScanClick={handleScanClick} />
      <div className="flex items-center justify-center">
        <div className="absolute inset-0 " />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(20,216,191,0.15)_0%,transparent_70%)] animate-pulse pointer-events-none" />

        <div className="relative z-10 container mx-auto sm:px-6 px-3 sm:pt-40 pt-30 pb-10">
          <div className="max-w-5xl mx-auto text-center space-y-4">


            <h1 className="text-3xl md:text-4xl lg:text-6xl z-50 font-bold tracking-tight">
              <span className="block text-white">
                FanEKT – Where FANs
              </span>
              <span className="block text-white">
                Conn€KT & Always WIN
              </span>
            </h1>

            <p className="sm:text-xl text-lg text-slate-400 max-w-7xl mx-auto leading-relaxed">
              FANEKT connects fans with their favorite teams and athletes and rewards them through targetted smart sponsorhips using our patented X-KRYPTED OS. We use our NFC SmartPatches and the FAN€KT (FNKT, F̈) reward system. One global ecosystem where every scan, vote, invitation and participation counts.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link to={"/fan/register"} className="bg-[linear-gradient(to_bottom_right,_#155BF2_20%,_#7654b4_40%,_#FE4B5E_100%)] w-[200px] py-3.5 rounded-lg text-white text-xl">
                Join as Fan
              </Link>
              <Link to={"/login"} className="bg-white w-[200px] py-3.5 rounded-lg text-black text-xl">
                Fan Login
              </Link>
            </div>

            <p className="sm:text-xl text-lg text-slate-400 max-w-7xl mx-auto leading-relaxed">
              One account per person or organization. Fans prove who they support, PRO accounts see their real verified community, and everyone shares value transparently.
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#3c3a61] to-transparent pointer-events-none" />
      </div>
      <ScanSmartPatch isOpen={isScanModalOpen} onClose={handleCloseScanModal} />
    </section>
  );
};

export default HeroSection;
