import React, { useEffect, useRef, forwardRef, useState } from "react";
import { ArrowLeft, Trophy, Calendar, Users, Gift, Star, Award, X } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import ScanSmartPatch from "./modals/ScanSmartPatch";

const cn = (...classes) => classes.filter(Boolean).join(" ");

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

const PastPrizeCard = ({ title, sponsor, period, totalEntries, winners, prize, type, onViewWinners }) => (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 group">
        <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-[#14d8bf] rounded-lg">
                    <Trophy className="w-5 h-5 text-white" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-[#14d8bf] transition-colors">{title}</h3>
                    <p className="text-white/70 text-sm">by {sponsor}</p>
                </div>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-semibold ${type === 'Global' ? 'bg-blue-500/20 text-blue-300' : 'bg-green-500/20 text-green-300'}`}>
                {type}
            </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-white/60" />
                <span className="text-white/80 text-sm">{period}</span>
            </div>
            <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-white/60" />
                <span className="text-white/80 text-sm">{totalEntries} entries</span>
            </div>
        </div>

        <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-400" />
                <span className="text-white font-semibold">{winners} winners</span>
            </div>
        </div>

        <div className="border-t border-white/10 pt-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Gift className="w-5 h-5 text-[#14d8bf]" />
                    <span className="text-white font-semibold">{prize}</span>
                </div>
                <div className="text-right cursor-pointer" onClick={onViewWinners}>
                    <p className="text-white/60 text-xs">Draw Completed</p>
                    <p className="text-[#14d8bf] text-sm font-semibold hover:text-white transition-colors">View Winners</p>
                </div>
            </div>
        </div>
    </div>
);

const WinnerHighlight = ({ name, prize, location }) => (
    <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg p-4 border border-yellow-500/30">
        <div className="flex items-center gap-3">
            <Star className="w-5 h-5 text-yellow-400" />
            <div>
                <p className="text-white font-semibold">{name}</p>
                <p className="text-white/70 text-sm">Won {prize}</p>
            </div>
        </div>
        <p className="text-yellow-300 text-xs mt-1">{location}</p>
    </div>
);

const WinnersModal = ({ isOpen, onClose, prizeTitle, winners }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-gradient-to-br from-[#4a3649] to-[#333b67] rounded-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
                <div className="p-6 border-b border-white/20">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Trophy className="w-6 h-6 text-yellow-400" />
                            <h2 className="text-2xl font-bold text-white">Winners</h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-white/70 hover:text-white transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                    <p className="text-white/70 mt-2">{prizeTitle}</p>
                </div>

                <div className="p-6 overflow-y-auto max-h-[60vh]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {winners.map((winner, index) => (
                            <WinnerHighlight key={index} {...winner} />
                        ))}
                    </div>
                </div>

                <div className="p-6 border-t border-white/20 bg-white/5">
                    <p className="text-center text-white/70 text-sm">
                        Congratulations to all our winners! Stay tuned for more prize opportunities.
                    </p>
                </div>
            </div>
        </div>
    );
};

const GlobalPastWinPrizes = () => {
    const [isScanModalOpen, setIsScanModalOpen] = useState(false);
    const [isWinnersModalOpen, setIsWinnersModalOpen] = useState(false);
    const [selectedPrize, setSelectedPrize] = useState(null);

    const handleScanClick = () => {
        setIsScanModalOpen(true);
    };

    const closeScanModal = () => {
        setIsScanModalOpen(false);
    };

    const handleViewWinners = (prize) => {
        setSelectedPrize(prize);
        setIsWinnersModalOpen(true);
    };

    const closeWinnersModal = () => {
        setIsWinnersModalOpen(false);
        setSelectedPrize(null);
    };

    // Mock data for past prize draws
    const pastPrizes = [
        {
            title: "Summer Football Championship",
            sponsor: "Nike Sports",
            period: "June 1 - June 30, 2024",
            totalEntries: "15,420",
            winners: "5",
            prize: "VIP Match Tickets + 1000 FNKT",
            type: "Global",
            winnersList: [
                { name: "John Smith", prize: "VIP Match Tickets", location: "London, UK" },
                { name: "Emma Davis", prize: "VIP Match Tickets", location: "Manchester, UK" },
                { name: "Michael Brown", prize: "VIP Match Tickets", location: "Liverpool, UK" },
                { name: "Sarah Wilson", prize: "VIP Match Tickets", location: "Birmingham, UK" },
                { name: "David Johnson", prize: "VIP Match Tickets", location: "Leeds, UK" }
            ]
        },
        {
            title: "Basketball Tournament Sweepstakes",
            sponsor: "Adidas",
            period: "May 15 - May 25, 2024",
            totalEntries: "8,650",
            winners: "3",
            prize: "Signed Jersey + 750 FNKT",
            type: "Local",
            winnersList: [
                { name: "Alex Rodriguez", prize: "Signed Jersey", location: "Madrid, Spain" },
                { name: "Maria Garcia", prize: "Signed Jersey", location: "Barcelona, Spain" },
                { name: "Carlos Lopez", prize: "Signed Jersey", location: "Valencia, Spain" }
            ]
        },
        {
            title: "Winter Olympics Grand Prize",
            sponsor: "Coca-Cola",
            period: "February 1 - February 28, 2024",
            totalEntries: "22,180",
            winners: "10",
            prize: "Olympic Experience Package",
            type: "Global",
            winnersList: [
                { name: "James Wilson", prize: "Olympic Experience", location: "London, UK" },
                { name: "Sophie Taylor", prize: "Olympic Experience", location: "Paris, France" },
                { name: "Marcus Johnson", prize: "Olympic Experience", location: "Berlin, Germany" },
                { name: "Anna Schmidt", prize: "Olympic Experience", location: "Munich, Germany" },
                { name: "Luca Rossi", prize: "Olympic Experience", location: "Rome, Italy" },
                { name: "Elena Petrova", prize: "Olympic Experience", location: "Moscow, Russia" },
                { name: "Thomas Anderson", prize: "Olympic Experience", location: "Stockholm, Sweden" },
                { name: "Isabella Morales", prize: "Olympic Experience", location: "Buenos Aires, Argentina" },
                { name: "David Chen", prize: "Olympic Experience", location: "Tokyo, Japan" },
                { name: "Olivia White", prize: "Olympic Experience", location: "Sydney, Australia" }
            ]
        },
        {
            title: "City Marathon Winners",
            sponsor: "Puma",
            period: "April 10 - April 15, 2024",
            totalEntries: "12,340",
            winners: "5",
            prize: "Running Gear Package + 500 FNKT",
            type: "Local",
            winnersList: [
                { name: "Sarah Chen", prize: "Running Gear Package", location: "Sydney, Australia" },
                { name: "Mike Thompson", prize: "Running Gear Package", location: "Melbourne, Australia" },
                { name: "Lisa Wong", prize: "Running Gear Package", location: "Perth, Australia" },
                { name: "Kevin Liu", prize: "Running Gear Package", location: "Brisbane, Australia" },
                { name: "Rachel Kim", prize: "Running Gear Package", location: "Adelaide, Australia" }
            ]
        },
        {
            title: "Tennis Grand Slam Finale",
            sponsor: "Wilson",
            period: "January 20 - January 30, 2024",
            totalEntries: "18,950",
            winners: "8",
            prize: "Tennis Equipment Set",
            type: "Global",
            winnersList: [
                { name: "Rafael Nadal Jr", prize: "Tennis Equipment Set", location: "Barcelona, Spain" },
                { name: "Serena Williams", prize: "Tennis Equipment Set", location: "Miami, USA" },
                { name: "Roger Federer", prize: "Tennis Equipment Set", location: "Basel, Switzerland" },
                { name: "Venus Williams", prize: "Tennis Equipment Set", location: "Orlando, USA" },
                { name: "Novak Djokovic", prize: "Tennis Equipment Set", location: "Belgrade, Serbia" },
                { name: "Simona Halep", prize: "Tennis Equipment Set", location: "Bucharest, Romania" },
                { name: "Andy Murray", prize: "Tennis Equipment Set", location: "Glasgow, UK" },
                { name: "Naomi Osaka", prize: "Tennis Equipment Set", location: "Osaka, Japan" }
            ]
        },
        {
            title: "Local Soccer League Cup",
            sponsor: "Under Armour",
            period: "March 5 - March 20, 2024",
            totalEntries: "9,780",
            winners: "3",
            prize: "Team Merchandise + 600 FNKT",
            type: "Local",
            winnersList: [
                { name: "Antonio Silva", prize: "Team Merchandise", location: "Lisbon, Portugal" },
                { name: "Carmen Rodriguez", prize: "Team Merchandise", location: "Madrid, Spain" },
                { name: "Pedro Santos", prize: "Team Merchandise", location: "Porto, Portugal" }
            ]
        }
    ];

    const featuredWinners = [
        { name: "Alex Thompson", prize: "VIP Match Tickets", location: "New York, USA" },
        { name: "Maria Garcia", prize: "Signed Jersey", location: "Barcelona, Spain" },
        { name: "James Wilson", prize: "Olympic Experience", location: "London, UK" }
    ];

    return (
        <div className="bg-[linear-gradient(to_bottom_left,_#4a1755_30%,_#352862_50%,_#8a58a2_100%)]
  min-h-[calc(100vh)]">
            <div className="lg:p-8 p-2">
                <section className="relative h-full bg-[linear-gradient(to_bottom_left,_#4a1755_30%,_#352862_50%,_#8a58a2_100%)]
   rounded-xl shadow-sm shadow-[#424b64] overflow-hidden">
                    <Navbar onScanClick={handleScanClick} />
                    <HexagonBackground className="z-30" />

                    {/* Back Button */}
                    <div className="absolute top-24 left-6 z-50">
                        <Link to="/promos" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors group">
                            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                            <span>Back to Promos</span>
                        </Link>
                    </div>

                    <div className="flex items-center justify-center">
                        <div className="absolute inset-0 " />
                        <div className="w-full px-6 sm:pt-35 pt-30 pb-10">
                            <div className="text-center space-y-4">
                                <h1 className="text-3xl md:text-4xl lg:text-6xl z-50 font-bold tracking-tight">
                                    <span className=" text-white">
                                        Past Prize Winners
                                    </span>
                                </h1>
                                <p className="text-lg text-center text-[#ffffff94] mx-auto max-w-2xl leading-relaxed">
                                    Celebrate with our lucky winners! See past prize draws, the amazing rewards won, and get inspired for future competitions.
                                </p>
                                <div className="flex items-center justify-center gap-4 mt-6">
                                    <div className="flex items-center gap-2 px-4 py-2 bg-yellow-500/20 rounded-lg">
                                        <Trophy className="w-4 h-4 text-yellow-400" />
                                        <span className="text-yellow-300 text-sm">Featured Winners</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#3c3a61] to-transparent pointer-events-none" />
                    </div>
                </section>

                <div className="lg:py-8 py-2">
                    <div className="max-w-full mx-auto space-y-8">
                        {/* Featured Winners */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                <Star className="w-6 h-6 text-yellow-400" />
                                Recent Winners
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {featuredWinners.map((winner, index) => (
                                    <WinnerHighlight key={index} {...winner} />
                                ))}
                            </div>
                        </div>

                        {/* Past Prize Draws */}
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-6">Past Prize Draws</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {pastPrizes.map((prize, index) => (
                                    <PastPrizeCard key={index} {...prize} onViewWinners={() => handleViewWinners(prize)} />
                                ))}
                            </div>
                        </div>

                        <div className="text-center mt-12">
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 max-w-md mx-auto">
                                <Trophy className="w-12 h-12 text-[#14d8bf] mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-white mb-2">New Draws Coming Soon</h3>
                                <p className="text-white/70 text-sm">
                                    More exciting prize opportunities are on the way. Stay tuned and keep earning FNKT to enter future draws!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <ScanSmartPatch isOpen={isScanModalOpen} onClose={closeScanModal} />
            <WinnersModal
                isOpen={isWinnersModalOpen}
                onClose={closeWinnersModal}
                prizeTitle={selectedPrize?.title}
                winners={selectedPrize?.winnersList || []}
            />
        </div>
    );
};

export default GlobalPastWinPrizes;
