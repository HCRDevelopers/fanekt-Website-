import React, { useEffect, useRef, forwardRef, useState } from "react";
import { ArrowRight, Sparkles, Trophy, Gift, History } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import ScanSmartPatch from "./modals/ScanSmartPatch";

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

const HexagonBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        const cellSize = 50;

        const drawGrid = (hoverX = -1, hoverY = -1) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
            ctx.lineWidth = 1;

            for (let x = 0; x < canvas.width; x += cellSize) {
                for (let y = 0; y < canvas.height; y += cellSize) {

                    const isHovered = hoverX === x && hoverY === y;

                    ctx.save();

                    if (isHovered) {
                        // scale around center of the cell
                        const cx = x + cellSize / 2;
                        const cy = y + cellSize / 2;
                        ctx.translate(cx, cy);
                        ctx.scale(1.2, 1.2);
                        ctx.translate(-cx, -cy);
                    }

                    ctx.strokeRect(x, y, cellSize, cellSize);
                    ctx.restore();
                }
            }
        };

        canvas.addEventListener("mousemove", (e) => {
            const rect = canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            const gridX = Math.floor(mouseX / cellSize) * cellSize;
            const gridY = Math.floor(mouseY / cellSize) * cellSize;

            drawGrid(gridX, gridY);
        });

        drawGrid();

        const animate = () => {
            drawGrid();
            requestAnimationFrame(animate);
        };
        animate();

        return () => {
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none"
            style={{ opacity: 0.6 }}
        />
    );
};

const PromoSection = ({ title, icon: Icon, activeText, pastText, pastLink }) => (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
        <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-[#14d8bf] rounded-lg">
                <Icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white">{title}</h3>
        </div>

        <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                <div>
                    <h4 className="text-lg font-semibold text-white mb-1">Active</h4>
                    <p className="text-white/70">{activeText}</p>
                </div>
                <div className="text-right">
                    <span className="text-[#14d8bf] font-semibold">Local / Global</span>
                    <p className="text-white/60 text-sm">(coming soon)</p>
                </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors cursor-pointer group">
                <div>
                    <h4 className="text-lg font-semibold text-white mb-1">Past</h4>
                    <p className="text-white/70">{pastText}</p>
                </div>
                <Link to={pastLink} className="text-right group-hover:text-[#14d8bf] transition-colors">
                    <div className="flex items-center gap-1">
                        <History className="w-4 h-4" />
                        <span className="font-semibold">View History</span>
                    </div>
                    <p className="text-white/60 text-sm">Browse past promos</p>
                </Link>
            </div>
        </div>
    </div>
);

const GlobalPromos = () => {
    const [isScanModalOpen, setIsScanModalOpen] = useState(false);

    const handleScanClick = () => {
        setIsScanModalOpen(true);
    };

    const closeScanModal = () => {
        setIsScanModalOpen(false);
    };

    return (
        <div className="bg-[linear-gradient(to_bottom_left,_#4a1755_30%,_#352862_50%,_#8a58a2_100%)]
  min-h-[calc(100vh)]">
            <div className="lg:p-8 p-2">
                <section className="relative h-full bg-[linear-gradient(to_bottom_left,_#4a1755_30%,_#352862_50%,_#8a58a2_100%)]
   rounded-xl shadow-sm shadow-[#424b64] overflow-hidden">
                    <Navbar onScanClick={handleScanClick} />
                    <HexagonBackground className="z-30" />
                    <div className="flex items-center justify-center">

                        <div className="absolute inset-0 " />

                        <div className="w-full px-6 sm:pt-35 pt-30 pb-10">
                            <div className="text-start space-y-4">


                                <h1 className="text-3xl md:text-4xl lg:text-6xl z-50 font-bold tracking-tight">
                                    <span className=" text-white">
                                        FanEKT Promos
                                    </span>
                                </h1>

                                <p className="text-lg text-start text-[#ffffff94] mx-auto leading-relaxed">
                                    Discover exciting sponsor campaigns and win prizes with FanEKT! Participate in global and local promotions to earn FNKT rewards and unlock exclusive opportunities.
                                </p>
                                <p className="text-lg text-start text-[#1587f5] mx-auto leading-relaxed">
                                    Join the ultimate fan ecosystem where every interaction rewards you with FAN€KT (FNKT) - your gateway to tickets, jerseys, holidays, and more!
                                </p>
                            </div>
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#3c3a61] to-transparent pointer-events-none" />
                    </div>
                </section>
                <div className="lg:py-8 py-2">
                    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <PromoSection
                            title="Sponsor Campaigns"
                            icon={Sparkles}
                            activeText="Current active campaigns from our sponsors"
                            pastText="View completed sponsor campaigns"
                            pastLink="/promos/past-sponsor-campaigns"
                        />
                        <PromoSection
                            title="WIN PRIZES"
                            icon={Trophy}
                            activeText="Active prize draws and competitions"
                            pastText="Check your past winnings and entries"
                            pastLink="/promos/past-win-prizes"
                        />
                    </div>
                </div>
            </div>
            <Footer />
            <ScanSmartPatch isOpen={isScanModalOpen} onClose={closeScanModal} />
        </div>
    );
};

export default GlobalPromos;
