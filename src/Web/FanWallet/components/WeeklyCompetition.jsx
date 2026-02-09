import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trophy, Star, Users, Calendar, DollarSign, Award } from "lucide-react";

const WeeklyCompetition = () => {
  const [activeTab, setActiveTab] = useState('current');
  const [competitionData, setCompetitionData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock data for weekly competitions
  const mockCompetitionData = {
    current: {
      week: "Week 45",
      period: "Nov 4 - Nov 10, 2024",
      totalBudget: 1000,
      totalParticipants: 1500,
      top10: [
        { rank: 1, name: "SoccerKing", points: 15000, reward: 100 },
        { rank: 2, name: "Fanatic99", points: 12500, reward: 80 },
        { rank: 3, name: "ChampionFan", points: 11000, reward: 60 },
        { rank: 4, name: "TrueSupporter", points: 9500, reward: 50 },
        { rank: 5, name: "LoyalFan", points: 8500, reward: 40 },
        { rank: 6, name: "GameChanger", points: 7500, reward: 35 },
        { rank: 7, name: "PassionateFan", points: 6500, reward: 30 },
        { rank: 8, name: "DieHardFan", points: 5500, reward: 25 },
        { rank: 9, name: "UltimateFan", points: 4500, reward: 20 },
        { rank: 10, name: "SuperFan", points: 3500, reward: 15 }
      ],
      yourRank: {
        rank: 23,
        name: "YourFanName",
        points: 2800,
        reward: 10
      },
      prizeDistribution: {
        '1-3': { percentage: 24, description: 'Top 3 winners' },
        '4-10': { percentage: 21, description: 'Ranks 4-10' },
        '11-100': { percentage: 50, description: 'Top 10% (90 fans)' },
        '101-150': { percentage: 5, description: 'Ranks 101-150' }
      }
    },
    allTime: {
      totalPoints: 52500,
      bestRank: 3,
      totalRewards: 345,
      competitionsParticipated: 12,
      topPerformances: [
        { week: "Week 23", rank: 3, points: 11000, reward: 60 },
        { week: "Week 15", rank: 7, points: 6500, reward: 30 },
        { week: "Week 8", rank: 12, points: 4200, reward: 8 }
      ]
    }
  };

  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setCompetitionData(mockCompetitionData);
      setLoading(false);
    }, 1000);
  }, []);

  const formatCurrency = (amount) => `F̈ ${amount}.00`;

  const getRewardDistribution = (rank) => {
    if (rank <= 3) return 'top3';
    if (rank <= 10) return 'top10';
    if (rank <= 100) return 'top10percent';
    if (rank <= 150) return 'honorable';
    return 'participation';
  };

  const getRewardColor = (rank) => {
    const distribution = getRewardDistribution(rank);
    switch (distribution) {
      case 'top3': return 'from-yellow-400 to-orange-500';
      case 'top10': return 'from-gray-300 to-gray-500';
      case 'top10percent': return 'from-orange-400 to-orange-600';
      case 'honorable': return 'from-blue-400 to-blue-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getRewardIcon = (rank) => {
    if (rank === 1) return <Trophy className="text-yellow-400" />;
    if (rank <= 3) return <Award className="text-orange-400" />;
    if (rank <= 10) return <Star className="text-gray-300" />;
    return <Users className="text-blue-400" />;
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl md:p-6 p-2">
        <div className="animate-pulse">
          <div className="h-8 bg-white/20 rounded mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-24 bg-white/10 rounded"></div>
            ))}
          </div>
          <div className="space-y-3">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="h-16 bg-white/10 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl md:p-6 p-2">
      <div className="flex md:items-center md:flex-row flex-col gap-3 justify-between mb-6">
        <div>
          <h2 className="md:text-2xl text-lg mb-2 md:mb-0 font-bold text-white flex items-center gap-3">
            <Trophy className="text-yellow-400" />
            Weekly Fan Competition
          </h2>
          <p className="text-gray-400 text-sm">Earn FNKT by participating in weekly challenges</p>
        </div>
        
        {/* Tabs */}
        <div className="flex space-x-1 bg-white/10 p-1 rounded-lg">
          {['current', 'allTime'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-white/20'
              }`}
            >
              {tab === 'current' ? 'Current Week' : 'All Time'}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'current' && competitionData?.current && (
        <div className="space-y-6">
          {/* Current Week Info */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-400 text-sm font-medium">Current Week</p>
                  <p className="text-white text-xl font-bold">{competitionData.current.week}</p>
                </div>
                <Calendar className="text-blue-400 text-2xl" />
              </div>
              <p className="text-gray-300 text-xs mt-2">{competitionData.current.period}</p>
            </div>
            
            <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/30 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-400 text-sm font-medium">Total Budget</p>
                  <p className="text-white text-xl font-bold">{formatCurrency(competitionData.current.totalBudget)}</p>
                </div>
                <DollarSign className="text-green-400 text-2xl" />
              </div>
              <p className="text-gray-300 text-xs mt-2">Available for distribution</p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/30 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-400 text-sm font-medium">Participants</p>
                  <p className="text-white text-xl font-bold">{competitionData.current.totalParticipants.toLocaleString()}</p>
                </div>
                <Users className="text-purple-400 text-2xl" />
              </div>
              <p className="text-gray-300 text-xs mt-2">Active competitors</p>
            </div>
            
            <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-400 text-sm font-medium">Your Rank</p>
                  <p className="text-white text-xl font-bold">#{competitionData.current.yourRank.rank}</p>
                </div>
                <Star className="text-yellow-400 text-2xl" />
              </div>
              <p className="text-gray-300 text-xs mt-2">{competitionData.current.yourRank.points} points</p>
            </div>
          </div>

          {/* Prize Distribution */}
          <div className="bg-gradient-to-br from-[#1e2139] to-[#2a2d4a] border border-[#286db24c] rounded-xl p-4">
            <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
              <Award className="text-yellow-400" />
              Prize Distribution
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              {Object.entries(competitionData.current.prizeDistribution).map(([key, prize]) => (
                <div key={key} className="bg-white/5 border border-white/20 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white text-sm font-medium">{prize.description}</span>
                    <span className="text-yellow-400 text-sm font-bold">{prize.percentage}%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full"
                      style={{ width: `${prize.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Leaderboard */}
          <div className="bg-gradient-to-br from-[#1e2139] to-[#2a2d4a] border border-[#286db24c] rounded-xl md:p-4 p-2">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Trophy className="text-yellow-400" />
              Top 10 Leaderboard
            </h3>
            
            <div className="space-y-2">
              {competitionData.current.top10.map((fan, index) => (
                <motion.div
                  key={fan.rank}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center justify-between md:p-3 p-2 rounded-lg border transition-all duration-300 ${
                    fan.rank <= 3 
                      ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/40' 
                      : 'bg-white/5 border-white/20 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center md:gap-4 gap-2">
                    <div className={`flex items-center justify-center md:w-12 w-10 md:h-12 h-10 rounded-full bg-gradient-to-r ${getRewardColor(fan.rank)} shadow-lg`}>
                      {getRewardIcon(fan.rank)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-white font-semibold md:text-lg text-sm">{fan.name}</span>
                        {fan.rank <= 3 && (
                          <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full">
                            Top {fan.rank}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-400 md:text-sm text-xs">{fan.points.toLocaleString()} points</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-white font-bold md:text-lg text-sm">{formatCurrency(fan.reward)}</p>
                    <p className="text-gray-400 text-xs">Reward</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Your Position */}
            {competitionData.current.yourRank && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 md:p-4 p-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/40 rounded-lg"
              >
                <div className="flex md:items-center justify-between md:flex-row flex-col">
                  <div className="flex items-center md:gap-4 gap-2">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg">
                      <Star className="text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-white font-semibold">{competitionData.current.yourRank.name}</span>
                        <span className="text-xs bg-blue-500/30 text-blue-300 px-2 py-1 rounded-full">
                          Your Rank: #{competitionData.current.yourRank.rank}
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm">{competitionData.current.yourRank.points.toLocaleString()} points</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-white font-bold text-lg">{formatCurrency(competitionData.current.yourRank.reward)}</p>
                    <p className="text-gray-300 text-xs">Potential Reward</p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'allTime' && competitionData?.allTime && (
        <div className="space-y-6">
          {/* All-Time Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-400 text-sm font-medium">Total Points</p>
                  <p className="text-white text-xl font-bold">{competitionData.allTime.totalPoints.toLocaleString()}</p>
                </div>
                <Star className="text-blue-400 text-2xl" />
              </div>
              <p className="text-gray-300 text-xs mt-2">All-time accumulation</p>
            </div>
            
            <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/30 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-400 text-sm font-medium">Best Rank</p>
                  <p className="text-white text-xl font-bold">#{competitionData.allTime.bestRank}</p>
                </div>
                <Trophy className="text-green-400 text-2xl" />
              </div>
              <p className="text-gray-300 text-xs mt-2">Highest achievement</p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/30 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-400 text-sm font-medium">Total Rewards</p>
                  <p className="text-white text-xl font-bold">{formatCurrency(competitionData.allTime.totalRewards)}</p>
                </div>
                <DollarSign className="text-purple-400 text-2xl" />
              </div>
              <p className="text-gray-300 text-xs mt-2">Lifetime earnings</p>
            </div>
            
            <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-400 text-sm font-medium">Competitions</p>
                  <p className="text-white text-xl font-bold">{competitionData.allTime.competitionsParticipated}</p>
                </div>
                <Calendar className="text-yellow-400 text-2xl" />
              </div>
              <p className="text-gray-300 text-xs mt-2">Participation count</p>
            </div>
          </div>

          {/* Top Performances */}
          <div className="bg-gradient-to-br from-[#1e2139] to-[#2a2d4a] border border-[#286db24c] rounded-xl p-4">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Award className="text-yellow-400" />
              Top Performances
            </h3>
            
            <div className="space-y-3">
              {competitionData.allTime.topPerformances.map((performance, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/20 hover:bg-white/10 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 shadow-lg">
                      <Trophy className="text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-white font-semibold">{performance.week}</span>
                        <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full">
                          Rank #{performance.rank}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm">{performance.points.toLocaleString()} points</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-white font-bold text-lg">{formatCurrency(performance.reward)}</p>
                    <p className="text-gray-400 text-xs">Reward</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Progress Summary */}
          <div className="bg-gradient-to-br from-[#1e2139] to-[#2a2d4a] border border-[#286db24c] rounded-xl p-4">
            <h3 className="text-white font-semibold mb-3">Progress Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Average Points per Competition</span>
                  <span className="text-white font-medium">
                    {(competitionData.allTime.totalPoints / competitionData.allTime.competitionsParticipated).toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Average Rank</span>
                  <span className="text-white font-medium">~25</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeeklyCompetition;