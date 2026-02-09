import React, { useEffect, useRef, forwardRef, useState } from "react";
import { ArrowLeft, Sparkles, Calendar, Trophy, Users, MapPin, X, Target, TrendingUp, Award } from "lucide-react";
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

const CampaignDetailsModal = ({ isOpen, onClose, campaign }) => {
    if (!isOpen || !campaign) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-gradient-to-br from-[#4a3649] to-[#333b67] rounded-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
                <div className="p-6 border-b border-white/20">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Sparkles className="w-6 h-6 text-yellow-400" />
                            <h2 className="text-2xl font-bold text-white">Campaign Details</h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-white/70 hover:text-white transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                    <p className="text-white/70 mt-2">{campaign.title}</p>
                </div>

                <div className="p-6 overflow-y-auto max-h-[60vh]">
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-white/5 rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Calendar className="w-5 h-5 text-[#14d8bf]" />
                                    <span className="text-white font-semibold">Duration</span>
                                </div>
                                <p className="text-white/70">{campaign.period}</p>
                            </div>

                            <div className="bg-white/5 rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Users className="w-5 h-5 text-[#14d8bf]" />
                                    <span className="text-white font-semibold">Participants</span>
                                </div>
                                <p className="text-white/70">{campaign.participants}</p>
                            </div>

                            <div className="bg-white/5 rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Trophy className="w-5 h-5 text-[#14d8bf]" />
                                    <span className="text-white font-semibold">Reward</span>
                                </div>
                                <p className="text-white/70">{campaign.reward} FNKT per participant</p>
                            </div>

                            <div className="bg-white/5 rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Target className="w-5 h-5 text-[#14d8bf]" />
                                    <span className="text-white font-semibold">Type</span>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${campaign.type === 'Global' ? 'bg-blue-500/20 text-blue-300' : 'bg-green-500/20 text-green-300'}`}>
                                    {campaign.type}
                                </span>
                            </div>
                        </div>

                        <div className="bg-white/5 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-3">
                                <TrendingUp className="w-5 h-5 text-[#14d8bf]" />
                                <span className="text-white font-semibold">Campaign Performance</span>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-center">
                                <div>
                                    <p className="text-2xl font-bold text-[#14d8bf]">{campaign.totalFNKT}</p>
                                    <p className="text-white/70 text-sm">Total FNKT Distributed</p>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-[#14d8bf]">{campaign.engagement}%</p>
                                    <p className="text-white/70 text-sm">Engagement Rate</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/5 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-3">
                                <Award className="w-5 h-5 text-[#14d8bf]" />
                                <span className="text-white font-semibold">Campaign Objectives</span>
                            </div>
                            <p className="text-white/70">{campaign.objectives}</p>
                        </div>
                    </div>
                </div>

                <div className="p-6 border-t border-white/20 bg-white/5">
                    <p className="text-center text-white/70 text-sm">
                        This campaign successfully engaged fans and distributed rewards across the FanEKT ecosystem.
                    </p>
                </div>
            </div>
        </div>
    );
};

const PastCampaignCard = ({ title, sponsor, period, participants, reward, type, onViewDetails }) => (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 group cursor-pointer" onClick={onViewDetails}>
        <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-[#14d8bf] rounded-lg">
                    <Sparkles className="w-5 h-5 text-white" />
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
                <span className="text-white/80 text-sm">{participants} participants</span>
            </div>
        </div>

        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-[#14d8bf]" />
                <span className="text-white font-semibold">{reward} FNKT</span>
            </div>
            <div className="text-right">
                <p className="text-white/60 text-xs">Campaign Completed</p>
                <p className="text-[#14d8bf] text-sm font-semibold hover:text-white transition-colors">View Details</p>
            </div>
        </div>
    </div>
);

const GlobalPastSponsorCampaigns = () => {
    const [isScanModalOpen, setIsScanModalOpen] = useState(false);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [selectedCampaign, setSelectedCampaign] = useState(null);

    const handleScanClick = () => {
        setIsScanModalOpen(true);
    };

    const closeScanModal = () => {
        setIsScanModalOpen(false);
    };

    const handleViewDetails = (campaign) => {
        setSelectedCampaign(campaign);
        setIsDetailsModalOpen(true);
    };

    const closeDetailsModal = () => {
        setIsDetailsModalOpen(false);
        setSelectedCampaign(null);
    };

    // Mock data for past sponsor campaigns
    const pastCampaigns = [
        {
            title: "Summer Football Frenzy",
            sponsor: "Nike Sports",
            period: "June 1 - June 30, 2024",
            participants: "15,420",
            reward: "500",
            type: "Global",
            totalFNKT: "7,710,000",
            engagement: "85",
            objectives: "Drive global football fan engagement through interactive challenges and reward distribution. Increase brand awareness and fan participation across multiple countries."
        },
        {
            title: "Local Basketball Championship",
            sponsor: "Adidas",
            period: "May 15 - May 25, 2024",
            participants: "8,650",
            reward: "300",
            type: "Local",
            totalFNKT: "2,595,000",
            engagement: "78",
            objectives: "Support local basketball communities by rewarding fan participation and engagement. Build stronger connections between the brand and local sports enthusiasts."
        },
        {
            title: "Winter Olympics Support",
            sponsor: "Coca-Cola",
            period: "February 1 - February 28, 2024",
            participants: "22,180",
            reward: "750",
            type: "Global",
            totalFNKT: "16,635,000",
            engagement: "92",
            objectives: "Celebrate the Winter Olympics by engaging fans worldwide with exclusive content and rewards. Create memorable experiences tied to Olympic moments."
        },
        {
            title: "City Marathon 2024",
            sponsor: "Puma",
            period: "April 10 - April 15, 2024",
            participants: "12,340",
            reward: "400",
            type: "Local",
            totalFNKT: "4,936,000",
            engagement: "88",
            objectives: "Motivate runners and fitness enthusiasts to participate in city marathons. Reward health and wellness activities while promoting active lifestyles."
        },
        {
            title: "Tennis Grand Slam",
            sponsor: "Wilson",
            period: "January 20 - January 30, 2024",
            participants: "18,950",
            reward: "600",
            type: "Global",
            totalFNKT: "11,370,000",
            engagement: "90",
            objectives: "Engage tennis fans during major tournaments with interactive content and rewards. Build excitement around professional tennis events worldwide."
        },
        {
            title: "Local Soccer League",
            sponsor: "Under Armour",
            period: "March 5 - March 20, 2024",
            participants: "9,780",
            reward: "350",
            type: "Local",
            totalFNKT: "3,423,000",
            engagement: "82",
            objectives: "Support grassroots soccer by rewarding local team participation and fan engagement. Foster community spirit through sports rewards."
        }
    ];

    return (
        <div className="bg-[linear-gradient(to_bottom_left,_#4a1755_30%,_#352862_50%,_#8a58a2_100%)]
  min-h-[calc(100vh)]">
            <div className="lg:p-8 p-2">
                <section className="relative h-full  bg-[linear-gradient(to_bottom_left,_#4a1755_30%,_#352862_50%,_#8a58a2_100%)]
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
                                        Past Sponsor Campaigns
                                    </span>
                                </h1>
                                <p className="text-lg text-center text-[#ffffff94] mx-auto max-w-2xl leading-relaxed">
                                    Explore completed sponsor campaigns that fans participated in. See the rewards earned and engagement levels from past promotions.
                                </p>
                                <div className="flex items-center justify-center gap-4 mt-6">
                                    <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 rounded-lg">
                                        <MapPin className="w-4 h-4 text-blue-300" />
                                        <span className="text-blue-300 text-sm">Global Campaigns</span>
                                    </div>
                                    <div className="flex items-center gap-2 px-4 py-2 bg-green-500/20 rounded-lg">
                                        <MapPin className="w-4 h-4 text-green-300" />
                                        <span className="text-green-300 text-sm">Local Campaigns</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#3c3a61] to-transparent pointer-events-none" />
                    </div>
                </section>

                <div className="lg:py-8 py-2">
                    <div className="max-w-full mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {pastCampaigns.map((campaign, index) => (
                                <PastCampaignCard key={index} {...campaign} onViewDetails={() => handleViewDetails(campaign)} />
                            ))}
                        </div>

                        <div className="text-center mt-12">
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 max-w-md mx-auto">
                                <Sparkles className="w-12 h-12 text-[#14d8bf] mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-white mb-2">More Campaigns Coming Soon</h3>
                                <p className="text-white/70 text-sm">
                                    Stay tuned for new sponsor campaigns and exciting opportunities to earn FNKT rewards!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <ScanSmartPatch isOpen={isScanModalOpen} onClose={closeScanModal} />
            <CampaignDetailsModal
                isOpen={isDetailsModalOpen}
                onClose={closeDetailsModal}
                campaign={selectedCampaign}
            />
        </div>
    );
};

export default GlobalPastSponsorCampaigns;
