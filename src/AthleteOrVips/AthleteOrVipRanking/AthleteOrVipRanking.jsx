import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  FaTrophy,
  FaUsers,
  FaAward,
  FaCrown,
  FaMedal,
  FaArrowUp,
  FaArrowDown,
  FaMinus,
  FaCalendarAlt,
  FaStar,
  FaLock,
  FaChartLine,
  FaUserFriends,
  FaTags,
  FaArrowLeft
} from 'react-icons/fa'

function AthleteOrVipRanking() {
  const [activeCategory, setActiveCategory] = useState('global')

  // Mock athlete data
  const athleteData = {
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    name: 'Marcus Johnson',
    role: 'Professional Athlete',
    totalFans: 15420,
    activeItems: 89,
    tier: 'Elite',
    fanTrend: 'up' // up, down, neutral
  }

  // Mock ranking data
  const fanRankings = {
    global: [
      { rank: 1, username: 'TopFan1', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face', engagement: 12500, change: 0, tier: 'Elite' },
      { rank: 2, username: 'SuperEngaged', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face', engagement: 11800, change: 1, tier: 'Gold' },
      { rank: 3, username: 'FanaticPro', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face', engagement: 11200, change: -1, tier: 'Gold' },
      { rank: 4, username: 'EngagementKing', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face', engagement: 10900, change: 2, tier: 'Gold' },
      { rank: 5, username: 'LoyalSupporter', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face', engagement: 10500, change: 0, tier: 'Silver' },
      { rank: 6, username: 'MatchDayHero', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', engagement: 9800, change: -2, tier: 'Silver' },
      { rank: 7, username: 'NFCScanner', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face', engagement: 9500, change: 1, tier: 'Silver' },
      { rank: 8, username: 'CampaignWarrior', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face', engagement: 9200, change: 0, tier: 'Silver' },
      { rank: 9, username: 'TeamSpirit', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face', engagement: 8900, change: 3, tier: 'Silver' },
      { rank: 10, username: 'UltimateFan', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face', engagement: 8600, change: -1, tier: 'Bronze' },
    ],
    club: [
      { rank: 1, username: 'ClubChampion', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face', engagement: 8900, change: 0, tier: 'Gold' },
      { rank: 2, username: 'TeamLoyal', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face', engagement: 8500, change: 1, tier: 'Silver' },
      { rank: 3, username: 'StadiumRegular', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face', engagement: 8200, change: -1, tier: 'Silver' },
    ],
    campaign: [
      { rank: 1, username: 'CampaignHero', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face', engagement: 9800, change: 0, tier: 'Gold' },
      { rank: 2, username: 'PromoMaster', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face', engagement: 9200, change: 1, tier: 'Silver' },
      { rank: 3, username: 'EngagePro', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face', engagement: 8900, change: -1, tier: 'Silver' },
    ]
  }

  const categories = [
    { key: 'global', label: 'Global Fan Ranking', icon: <FaTrophy />, available: true },
    { key: 'club', label: 'Club / Team Fan Ranking', icon: <FaUsers />, available: true },
    { key: 'campaign', label: 'Campaign Fan Ranking', icon: <FaAward />, available: true }
  ]

  const getTierColor = (tier) => {
    switch (tier) {
      case 'Bronze': return 'text-amber-600'
      case 'Silver': return 'text-gray-400'
      case 'Gold': return 'text-yellow-500'
      case 'Elite': return 'text-purple-500'
      default: return 'text-gray-400'
    }
  }

  const getTierBadgeStyle = (tier) => {
    switch (tier) {
      case 'Bronze': return 'text-amber-600 border-amber-600 bg-amber-600/10'
      case 'Silver': return 'text-gray-400 border-gray-400 bg-gray-400/10'
      case 'Gold': return 'text-yellow-500 border-yellow-500 bg-yellow-500/10'
      case 'Elite': return 'text-purple-500 border-purple-500 bg-purple-500/10'
      default: return 'text-gray-400 border-gray-400 bg-gray-400/10'
    }
  }

  const getRankChangeIcon = (change) => {
    if (change > 0) return <FaArrowUp className="text-green-400 text-xs" />
    if (change < 0) return <FaArrowDown className="text-red-400 text-xs" />
    return <FaMinus className="text-gray-400 text-xs" />
  }

  const getTopRankIcon = (rank) => {
    switch (rank) {
      case 1: return <FaCrown className="text-yellow-500 text-2xl" />
      case 2: return <FaMedal className="text-gray-400 text-2xl" />
      case 3: return <FaAward className="text-amber-600 text-2xl" />
      default: return null
    }
  }

  const getFanTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return <FaArrowUp className="text-green-400 text-sm" />
      case 'down': return <FaArrowDown className="text-red-400 text-sm" />
      default: return <FaMinus className="text-gray-400 text-sm" />
    }
  }

  const currentRankingData = fanRankings[activeCategory] || []

  return (
    <div className="min-h-screen lg:ml-[290px] md:px-4 px-2 lg:px-8 py-6 pt-28 lg:pt-6">
      {/* Header */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-8"
      >
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => window.history.back()}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FaArrowLeft className="text-xl" />
          </button>
          <h1 className="text-3xl lg:text-4xl font-bold text-white">Fan Rankings</h1>
        </div>
        <p className="text-gray-400 text-lg">
          See how your fans engage with you on FANEKT.
        </p>
      </motion.div>

      {/* Athlete/VIP Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] rounded-2xl md:p-6 p-2 mb-8 text-white"
      >
        <div className="flex md:items-center justify-between md:flex-row flex-col-reverse gap-6 mb-6">
          <div className="flex gap-2">
            <img
              src={athleteData.avatar}
              alt={athleteData.name}
              className="w-20 h-20 rounded-full border-4 border-white/20"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-bold">{athleteData.name}</h2>
              <p className="text-white/80 text-lg">{athleteData.role}</p>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-2">
                  <FaUserFriends className="text-white/80" />
                  <span className="font-semibold">{athleteData.totalFans.toLocaleString()} Fans</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaTags className="text-white/80" />
                  <span className="font-semibold">{athleteData.activeItems} Active Items</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end w-full md:w-auto">
            <div className="text-right">
              <span className={`text-sm px-3 py-1 rounded-full border border-white/30 bg-white/10 ${getTierColor(athleteData.tier)}`}>
                {athleteData.tier} Tier
              </span>
              <div className="flex items-center gap-2 mt-2">
                {getFanTrendIcon(athleteData.fanTrend)}
                <span className="text-sm">Fan engagement trending</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Ranking Period Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-[#2a2d4a] border border-[#286db24c] rounded-lg p-4 mb-6 flex items-center justify-between"
      >
        <div className="flex items-center gap-2">
          <FaCalendarAlt className="text-blue-400" />
          <span className="text-white text-sm font-medium">Current ranking period ends in 9 days</span>
        </div>
        <span className="text-gray-400 text-xs">Monthly Rankings</span>
      </motion.div>

      {/* Category Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => category.available && setActiveCategory(category.key)}
              disabled={!category.available}
              className={`relative p-4 rounded-xl border transition-all duration-300 ${activeCategory === category.key
                ? 'bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] border-[#f64c68] text-white'
                : category.available
                  ? 'bg-[#1e2139] border-[#286db24c] text-gray-400 hover:text-white hover:border-[#f64c68]/50'
                  : 'bg-[#2a2d4a] border-[#286db24c]/50 text-gray-600 cursor-not-allowed'
                }`}
            >
              <div className="flex flex-col items-center gap-2">
                <div className={`text-2xl ${activeCategory === category.key ? 'text-white' : category.available ? 'text-gray-400' : 'text-gray-600'}`}>
                  {category.icon}
                </div>
                <span className="text-sm font-medium text-center">{category.label}</span>
              </div>
              {!category.available && (
                <div className="absolute top-2 right-2">
                  <FaLock className="text-gray-600 text-xs" />
                </div>
              )}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Rankings Content */}
      <motion.div
        key={activeCategory}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        {/* Top 3 Fans Highlight */}
        {currentRankingData.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {currentRankingData.slice(0, 3).map((fan, index) => (
              <div
                key={fan.rank}
                className="bg-[#1e2139] border border-[#286db24c] rounded-xl p-6 text-center relative overflow-hidden"
              >
                {/* Background decoration */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#f64c68] to-[#ff6b6b]"></div>

                <div className="flex justify-center mb-4">
                  {getTopRankIcon(fan.rank)}
                </div>

                <img
                  src={fan.avatar}
                  alt={fan.username}
                  className="w-16 h-16 rounded-full mx-auto mb-4 border-2 border-[#f64c68]"
                />

                <h3 className="text-white font-bold text-lg mb-2">{fan.username}</h3>
                <p className="text-[#f64c68] font-semibold text-xl">{fan.engagement.toLocaleString()}</p>
                <p className="text-gray-400 text-sm mb-2">Engagement Points</p>

                <div className="flex items-center justify-center gap-1">
                  {getRankChangeIcon(fan.change)}
                  <span className="text-gray-400 text-sm">
                    {fan.change === 0 ? 'No change' : `${Math.abs(fan.change)} position${Math.abs(fan.change) !== 1 ? 's' : ''}`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Fan Ranking Table */}
        <div className="bg-[#1e2139] border border-[#286db24c] rounded-xl overflow-hidden">
          {/* Table Header */}
          <div className="px-6 py-4 border-b border-[#286db24c] bg-[#2a2d4a]">
            <h3 className="text-white font-bold text-lg">
              {categories.find(cat => cat.key === activeCategory)?.label}
            </h3>
          </div>

          {/* Table Content */}
          <div className="overflow-x-auto">
            {currentRankingData.length === 0 ? (
              <div className="p-8 text-center">
                <FaTrophy className="text-4xl text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400">No fan rankings available yet</p>
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-[#2a2d4a] border-b border-[#286db24c]">
                  <tr>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Rank</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Fan</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Tier</th>
                    <th className="text-right px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Points</th>
                    <th className="text-center px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Change</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#286db24c]/50">
                  {currentRankingData.map((fan) => (
                    <tr 
                      key={fan.rank}
                      className="hover:bg-[#2a2d4a]/50 transition-colors"
                    >
                      {/* Rank Column */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-lg text-white">
                            #{fan.rank}
                          </span>
                          {getRankChangeIcon(fan.change)}
                        </div>
                      </td>

                      {/* Fan Column */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <img
                            src={fan.avatar}
                            alt={fan.username}
                            className="w-10 h-10 rounded-full border border-[#286db24c]"
                          />
                          <span className="font-semibold text-white">
                            {fan.username}
                          </span>
                        </div>
                      </td>

                      {/* Tier Column */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        {fan.tier && (
                          <span className={`text-xs px-3 py-1 rounded-full border ${getTierBadgeStyle(fan.tier)}`}>
                            {fan.tier}
                          </span>
                        )}
                      </td>

                      {/* Points Column */}
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div>
                          <span className="text-white font-semibold">{fan.engagement.toLocaleString()}</span>
                          <p className="text-gray-400 text-sm">Points</p>
                        </div>
                      </td>

                      {/* Change Column */}
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center gap-1">
                          {getRankChangeIcon(fan.change)}
                          <span className="text-gray-400 text-sm">
                            {fan.change === 0 ? 'No change' : `${Math.abs(fan.change)} position${Math.abs(fan.change) !== 1 ? 's' : ''}`}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Ranking Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-[#1e2139] border border-[#286db24c] rounded-xl md:p-6 p-2"
        >
          <div className="flex items-center gap-3 mb-4">
            <FaChartLine className="text-blue-400 text-xl" />
            <h3 className="text-white font-bold text-lg">Fan Engagement Insights</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center justify-between p-4 bg-[#2a2d4a] rounded-lg">
              <div>
                <p className="text-gray-400 text-sm">Engagement Trend</p>
                <p className="text-green-400 font-semibold">Increasing</p>
              </div>
              <FaArrowUp className="text-green-400 text-2xl" />
            </div>

            <div className="flex items-center justify-between p-4 bg-[#2a2d4a] rounded-lg">
              <div>
                <p className="text-gray-400 text-sm">Participation Level</p>
                <p className="text-blue-400 font-semibold">Stable</p>
              </div>
              <FaMinus className="text-blue-400 text-2xl" />
            </div>
          </div>

          <div className="mt-4 p-4 bg-gradient-to-r from-[#f64c68]/10 to-[#ff6b6b]/10 rounded-lg border border-[#f64c68]/20">
            <p className="text-white text-sm">
              Your fans are showing increased engagement this month. Keep up the great work building your community!
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default AthleteOrVipRanking
