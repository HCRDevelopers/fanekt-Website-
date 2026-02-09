import React from 'react';

const RankingsOverview = () => {
    const rankings = [
        { rank: 1, name: "Darlene Robertson", score: 3 },
        { rank: 2, name: "Kathryn Murphy", score: 3 },
        { rank: 3, name: "Savannah Nguyen", score: 3 },
        { rank: 4, name: "Ronald Richards", score: 3 },
        { rank: 5, name: "Jane Cooper", score: 3 }
    ];

    return (
        <div className="bg-[#363246] rounded-2xl p-3 shadow-xl border border-[#FFFFFF0D]">
            <h2 className="text-white text-[25px] font-medium mb-2">
                Who has most fans globally
            </h2>

            <div className="space-y-0">
                {rankings.map((item, index) => (
                    <div key={item.rank}>
                        <div className="flex items-center justify-between py-4">
                            <div className="flex items-center space-x-2">
                                <span className="text-white text-xl font-light">
                                    {item.rank}:
                                </span>
                                <span className="text-white text-xl font-light">
                                    {item.name}
                                </span>
                            </div>
                            <span className="text-white text-xl font-light">
                                (--)3
                            </span>
                        </div>
                        {index < rankings.length - 1 && (
                            <div className="h-px bg-white/30"></div>
                        )}
                    </div>
                ))}
            </div>

            <div className="mt-3 flex justify-center">
                <button className="bg-transparent text-white font-[500] text-lg px-16 py-4 rounded-lg whitespace-nowrap backdrop-blur-sm transition-all duration-300 border border-white/30 hover:border-white/50">
                    View Full Ranking
                </button>
            </div>
        </div>
    );
};
const BestFan = () => {
    const rankings = [
        { rank: 1, name: "Darlene Robertson", score: 100 },
        { rank: 2, name: "Kathryn Murphy", score: 100 },
        { rank: 3, name: "Savannah Nguyen", score: 100 },
        { rank: 4, name: "Ronald Richards", score: 100 },
        { rank: 5, name: "Jane Cooper", score: 100 }
    ];

    return (
        <div className="bg-[#814d8d] rounded-2xl p-3 shadow-xl border border-[#FFFFFF0D]">
            <h2 className="text-white text-[25px] font-medium mb-2">
                Who is the best fan in World
            </h2>

            <div className="space-y-0">
                {rankings.map((item, index) => (
                    <div key={item.rank}>
                        <div className="flex items-center justify-between py-4">
                            <div className="flex items-center space-x-2">
                                <span className="text-white text-xl font-light">
                                    {item.rank}:
                                </span>
                                <span className="text-white text-xl font-light">
                                    {item.name}
                                </span>
                            </div>
                            <span className="text-white text-xl font-light">
                                F 100
                            </span>
                        </div>
                        {index < rankings.length - 1 && (
                            <div className="h-px bg-white/30"></div>
                        )}
                    </div>
                ))}
            </div>

            <div className="mt-3 flex justify-center">
                <button className="bg-[linear-gradient(to_bottom_right,_#155BF2_20%,_#7654b4_40%,_#FE4B5E_100%)] px-16 py-4 rounded-lg text-white font-[500] text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg whitespace-nowrap">
                    View Full Rankings
                </button>
            </div>
        </div>
    );
};
const MoreFan = () => {
    const rankings = [
        { rank: 1, name: "Darlene Robertson", score: 3 },
        { rank: 2, name: "Kathryn Murphy", score: 3 },
        { rank: 3, name: "Savannah Nguyen", score: 3 },
        { rank: 4, name: "Ronald Richards", score: 3 },
        { rank: 5, name: "Jane Cooper", score: 3 }
    ];

    return (
        <div className="bg-[#353655] rounded-2xl p-3 shadow-xl border border-[#FFFFFF0D]">
            <h2 className="text-white text-[25px] font-medium mb-2">
              Who has most fans locally
            </h2>

            <div className="space-y-0">
                {rankings.map((item, index) => (
                    <div key={item.rank}>
                        <div className="flex items-center justify-between py-4">
                            <div className="flex items-center space-x-2">
                                <span className="text-white text-xl font-light">
                                    {item.rank}:
                                </span>
                                <span className="text-white text-xl font-light">
                                    {item.name}
                                </span>
                            </div>
                            <span className="text-white text-xl font-light">
                                (--)3
                            </span>
                        </div>
                        {index < rankings.length - 1 && (
                            <div className="h-px bg-white/30"></div>
                        )}
                    </div>
                ))}
            </div>

            <div className="mt-3 flex justify-center">
                <button className="bg-transparent text-white font-[500] text-lg px-16 py-4 rounded-lg whitespace-nowrap backdrop-blur-sm transition-all duration-300 border border-white/30 hover:border-white/50">
                    View Full Ranking
                </button>
            </div>
        </div>
    );
};

// Demo with grid layout
export default function RankingsDemo() {
    return (
        <div className="lg:p-8 p-2">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <RankingsOverview />
                <BestFan />
                <MoreFan />
            </div>
        </div>
    );
}