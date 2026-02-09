import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  FaTrophy,
  FaMedal,
  FaAward,
  FaCrown,
  FaArrowLeft,
  FaArrowUp,
  FaArrowDown,
  FaMinus,
  FaUsers,
  FaCalendarAlt,
  FaStar,
  FaLock,
  FaCheckCircle
} from 'react-icons/fa'

function FanRanking() {
  const [activeCategory, setActiveCategory] = useState('global')

  // Mock user data - showing earned FNKT only (for ranking)
  const currentUser = {
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    username: 'FanMaster2024',
    globalRank: 128,
    clubRank: 45,
    athleteRank: 67,
    campaignRank: null, // No active campaign
    tier: 'Silver',
    progressToNext: 75, // percentage
    fnktEarned: 2450, // Only earned FNKT (counts for ranking)
    fnktPurchased: 1200, // Purchased FNKT (doesn't count)
    fnktWon: 800 // Won FNKT (doesn't count)
  }

  // Mock ranking data
  const rankings = {
    global: [
      { rank: 1, username: 'TopFan1', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face', fnkt: 12500, change: 0, tier: 'Elite' },
      { rank: 2, username: 'SuperEngaged', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face', fnkt: 11800, change: 1, tier: 'Gold' },
      { rank: 3, username: 'FanaticPro', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face', fnkt: 11200, change: -1, tier: 'Gold' },
      { rank: 4, username: 'EngagementKing', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face', fnkt: 10900, change: 2, tier: 'Gold' },
      { rank: 5, username: 'LoyalSupporter', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face', fnkt: 10500, change: 0, tier: 'Silver' },
      { rank: 6, username: 'MatchDayHero', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', fnkt: 9800, change: -2, tier: 'Silver' },
      { rank: 7, username: 'NFCScanner', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face', fnkt: 9500, change: 1, tier: 'Silver' },
      { rank: 8, username: 'CampaignWarrior', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face', fnkt: 9200, change: 0, tier: 'Silver' },
      { rank: 9, username: 'TeamSpirit', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face', fnkt: 8900, change: 3, tier: 'Silver' },
      { rank: 10, username: 'UltimateFan', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face', fnkt: 8600, change: -1, tier: 'Bronze' },
      // Current user
      { rank: 128, username: currentUser.username, avatar: currentUser.avatar, fnkt: currentUser.fnktEarned, change: 5, isCurrentUser: true, tier: currentUser.tier },
      // More users...
      { rank: 129, username: 'FanUser129', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', fnkt: 2400, change: -3, tier: 'Bronze' },
      { rank: 130, username: 'FanUser130', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face', fnkt: 2380, change: 2, tier: 'Bronze' },
    ],
    club: [
      { rank: 1, username: 'ClubChampion', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face', fnkt: 8900, change: 0, tier: 'Gold' },
      { rank: 2, username: 'TeamLoyal', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face', fnkt: 8500, change: 1, tier: 'Silver' },
      { rank: 3, username: 'StadiumRegular', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face', fnkt: 8200, change: -1, tier: 'Silver' },
      // Current user
      { rank: 45, username: currentUser.username, avatar: currentUser.avatar, fnkt: currentUser.fnktEarned, change: 2, isCurrentUser: true, tier: currentUser.tier },
    ],
    athlete: [
      { rank: 1, username: 'AthleteFan1', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', fnkt: 7600, change: 0, tier: 'Gold' },
      { rank: 2, username: 'VIPSupporter', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face', fnkt: 7200, change: 1, tier: 'Silver' },
      { rank: 3, username: 'StarFollower', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face', fnkt: 6900, change: -1, tier: 'Silver' },
      // Current user
      { rank: 67, username: currentUser.username, avatar: currentUser.avatar, fnkt: currentUser.fnktEarned, change: 3, isCurrentUser: true, tier: currentUser.tier },
    ],
    campaign: [
      { rank: 1, username: 'CampaignHero', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face', fnkt: 9800, change: 0, tier: 'Gold' },
      { rank: 2, username: 'PromoMaster', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face', fnkt: 9200, change: 1, tier: 'Silver' },
      { rank: 3, username: 'EngagePro', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face', fnkt: 8900, change: -1, tier: 'Silver' },
      { rank: 4, username: 'BrandFan', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face', fnkt: 8500, change: 2, tier: 'Silver' },
      { rank: 5, username: 'LoyalCustomer', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face', fnkt: 8200, change: 0, tier: 'Bronze' },
      // Current user would participate in campaign rankings when active
      // { rank: 23, username: currentUser.username, avatar: currentUser.avatar, fnkt: currentUser.fnktEarned, change: 1, isCurrentUser: true, tier: currentUser.tier },
    ]
  }

  const categories = [
    { key: 'global', label: 'Global Ranking', icon: <FaTrophy />, available: true },
    { key: 'club', label: 'Club / Team', icon: <FaUsers />, available: true },
    { key: 'athlete', label: 'Athlete / VIP', icon: <FaStar />, available: true },
    { key: 'campaign', label: 'Campaign', icon: <FaAward />, available: true }
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

  const currentRankingData = rankings[activeCategory] || []

  // Check if user has ranking yet
  const hasRanking = currentUser.globalRank > 0

  return (
    <div className="min-h-screen lg:ml-[290px] px-4 lg:px-8 py-6 pt-28 lg:pt-6">
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
          <h1 className="text-3xl lg:text-4xl font-bold text-white">Rankings</h1>
        </div>
        <p className="text-gray-400 text-lg">
          Rankings based on earned FNKT only - not purchased or won points.
        </p>

        {/* Ranking Explanation */}
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border mt-2 border-blue-400/30 rounded-lg md:p-4 p-2">
          <div className="flex items-start md:flex-row flex-col gap-3">
            <FaTrophy className="text-blue-400 text-xl mt-1 flex-shrink-0" />
            <div>
              <h4 className="text-blue-400 font-semibold mb-1">What Counts for Rankings?</h4>
              <p className="text-blue-300 text-sm mb-2">
                Rankings are calculated using <strong>only earned FNKT points</strong> from legitimate activities:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-2 text-green-400">
                  <FaCheckCircle className="text-xs" />
                  <span>Store purchases</span>
                </div>
                <div className="flex items-center gap-2 text-green-400">
                  <FaCheckCircle className="text-xs" />
                  <span>Converted invitations</span>
                </div>
                <div className="flex items-center gap-2 text-green-400">
                  <FaCheckCircle className="text-xs" />
                  <span>Sponsor promotions</span>
                </div>
                <div className="flex items-center gap-2 text-green-400">
                  <FaCheckCircle className="text-xs" />
                  <span>Other earning activities</span>
                </div>
              </div>
              <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-2 text-red-400">
                  <FaCheckCircle className="text-xs text-red-400" />
                  <span>Cash purchases</span>
                </div>
                <div className="flex items-center gap-2 text-red-400">
                  <FaCheckCircle className="text-xs text-red-400" />
                  <span>Won prizes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {!hasRanking ? (
        // Empty State for New Users
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16"
        >
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 bg-[#2a2d4a] rounded-full flex items-center justify-center mx-auto mb-6">
              <FaTrophy className="text-4xl text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Start Your Ranking Journey</h2>
            <p className="text-gray-400 mb-8">
              Start engaging with your X-Krypted items to appear in rankings and earn your place among top fans.
            </p>
            <button className="bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all">
              Start Engaging
            </button>
          </div>
        </motion.div>
      ) : (
        <>
          {/* User Summary Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[#1e2139] rounded-2xl border border-[#286db24c] md:p-6 p-2 mb-8"
          >
            <div className="flex items-center md:gap-4 gap-2 mb-4">
              <img
                src={currentUser.avatar}
                alt={currentUser.username}
                className="md:w-16 w-14 md:h-16 h-14 rounded-full border-2 border-[#f64c68]"
              />
              <div className="flex-1">
                <h3 className="text-white text-xl font-bold">{currentUser.username}</h3>
                <div className="flex items-center md:gap-4 gap-2 text-sm flex-wrap">
                  <span className="text-gray-400">Global Rank:</span>
                  <span className="text-white font-semibold">#{currentUser.globalRank}</span>
                  {activeCategory === 'club' && currentUser.clubRank && (
                    <>
                      <span className="text-gray-400">Club Rank:</span>
                      <span className="text-white font-semibold">#{currentUser.clubRank}</span>
                    </>
                  )}
                  {activeCategory === 'athlete' && currentUser.athleteRank && (
                    <>
                      <span className="text-gray-400">Athlete Rank:</span>
                      <span className="text-white font-semibold">#{currentUser.athleteRank}</span>
                    </>
                  )}
                  <span className="text-gray-400">Tier:</span>
                  <span className={`font-semibold ${getTierColor(currentUser.tier)}`}>{currentUser.tier}</span>
                </div>
              </div>
            </div>

            {/* FNKT Breakdown */}
            <div className="mb-4 p-3 bg-[#2a2d4a] rounded-lg">
              <h4 className="text-white font-semibold mb-2">Your FNKT Breakdown</h4>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-green-400 font-bold text-lg">{currentUser.fnktEarned.toLocaleString()}</div>
                  <div className="text-green-300 text-xs">Earned</div>
                  <div className="text-green-300 text-xs">(for ranking)</div>
                </div>
                <div className="text-center">
                  <div className="text-red-400 font-bold text-lg">{currentUser.fnktPurchased.toLocaleString()}</div>
                  <div className="text-red-300 text-xs">Purchased</div>
                  <div className="text-red-300 text-xs">(not counted)</div>
                </div>
                <div className="text-center">
                  <div className="text-yellow-400 font-bold text-lg">{currentUser.fnktWon.toLocaleString()}</div>
                  <div className="text-yellow-300 text-xs">Won</div>
                  <div className="text-yellow-300 text-xs">(not counted)</div>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Progress to {currentUser.tier === 'Bronze' ? 'Silver' : currentUser.tier === 'Silver' ? 'Gold' : 'Elite'}</span>
                <span className="text-white">{currentUser.progressToNext}%</span>
              </div>
              <div className="w-full bg-[#2a2d4a] rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] h-2 rounded-full transition-all duration-500"
                  style={{ width: `${currentUser.progressToNext}%` }}
                ></div>
              </div>
            </div>
          </motion.div>

          {/* Ranking Period Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#2a2d4a] border border-[#286db24c] rounded-lg lg:p-4 p-2 mb-6 flex md:items-center justify-between md:flex-row flex-col-reverse gap-2"
          >
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-blue-400" />
              <span className="text-white text-sm font-medium">Current ranking period ends in 12 days</span>
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
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
              {categories.map((category) => (
                <button
                  key={category.key}
                  onClick={() => category.available && setActiveCategory(category.key)}
                  disabled={!category.available}
                  className={`relative p-4 rounded-xl border transition-all duration-300 ${
                    activeCategory === category.key
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
            {/* Top 3 Highlighted */}
            {currentRankingData.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {currentRankingData.slice(0, 3).map((user, index) => (
                  <div
                    key={user.rank}
                    className="bg-[#1e2139] border border-[#286db24c] rounded-xl p-6 text-center relative overflow-hidden"
                  >
                    {/* Background decoration */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#f64c68] to-[#ff6b6b]"></div>

                    <div className="flex justify-center mb-4">
                      {getTopRankIcon(user.rank)}
                    </div>

                    <img
                      src={user.avatar}
                      alt={user.username}
                      className="w-16 h-16 rounded-full mx-auto mb-4 border-2 border-[#f64c68]"
                    />

                    <h3 className="text-white font-bold text-lg mb-2">{user.username}</h3>
                    <p className="text-[#f64c68] font-semibold text-xl">{user.fnkt.toLocaleString()} FNKT</p>

                    <div className="flex items-center justify-center gap-1 mt-2">
                      {getRankChangeIcon(user.change)}
                      <span className="text-gray-400 text-sm">
                        {user.change === 0 ? 'No change' : `${Math.abs(user.change)} position${Math.abs(user.change) !== 1 ? 's' : ''}`}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Rankings Table */}
            <div className="bg-[#1e2139] border border-[#286db24c] rounded-xl overflow-hidden">
              {/* Table Header */}
              <div className="px-6 py-4 border-b border-[#286db24c] bg-[#2a2d4a]">
                <h3 className="text-white font-bold text-lg">
                  {categories.find(cat => cat.key === activeCategory)?.label} Rankings
                </h3>
              </div>

              {/* Table Content */}
              <div className="overflow-x-auto">
                {currentRankingData.length === 0 ? (
                  <div className="p-8 text-center">
                    <FaTrophy className="text-4xl text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-400">No active campaign rankings available</p>
                  </div>
                ) : (
                  <table className="w-full">
                    <thead className="bg-[#2a2d4a] border-b border-[#286db24c]">
                      <tr>
                        <th className="text-left text-gray-400 font-semibold text-sm py-3 px-6">RANK</th>
                        <th className="text-left text-gray-400 font-semibold text-sm py-3 px-6">PLAYER</th>
                        <th className="text-left text-gray-400 font-semibold text-sm py-3 px-6">CHANGE</th>
                        <th className="text-right text-gray-400 font-semibold text-sm py-3 px-6">FNKT</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentRankingData.map((user) => (
                        <tr
                          key={user.rank}
                          className={`border-b border-[#286db24c]/50 hover:bg-[#2a2d4a]/50 transition-colors ${
                            user.isCurrentUser ? 'bg-[#f64c68]/10 border-[#f64c68]/30' : ''
                          }`}
                        >
                          {/* Rank Column */}
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-2">
                              <span className={`font-bold text-lg ${user.isCurrentUser ? 'text-[#f64c68]' : 'text-white'}`}>
                                #{user.rank}
                              </span>
                              {getRankChangeIcon(user.change)}
                            </div>
                          </td>

                          {/* Player Column */}
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-4">
                              <img
                                src={user.avatar}
                                alt={user.username}
                                className="w-10 h-10 rounded-full border border-[#286db24c]"
                              />
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className={`font-semibold ${user.isCurrentUser ? 'text-[#f64c68]' : 'text-white'}`}>
                                    {user.username}
                                    {user.isCurrentUser && <span className="ml-2 text-xs text-[#f64c68]">(You)</span>}
                                  </span>
                                  {user.tier && (
                                    <span className={`text-xs px-2 py-1 rounded-full border ${getTierBadgeStyle(user.tier)}`}>
                                      {user.tier}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Change Column */}
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-1">
                              {getRankChangeIcon(user.change)}
                              <span className="text-gray-400 text-sm">
                                {user.change === 0 ? '—' : user.change > 0 ? `+${user.change}` : user.change}
                              </span>
                            </div>
                          </td>

                          {/* FNKT Column */}
                          <td className="py-4 px-6 text-right">
                            <span className="text-white font-semibold">{user.fnkt.toLocaleString()} FNKT</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </motion.div>

          {/* Sticky Your Position Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="fixed bottom-4 left-4 right-4 lg:left-[294px] lg:right-8 bg-[#1e2139] border border-[#286db24c] rounded-xl p-4 shadow-2xl z-10"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-white font-bold text-lg">Your Position</h4>
                <p className="text-gray-400 text-sm">Keep climbing the ranks!</p>
              </div>
              <div className="text-right">
                <div className="text-[#f64c68] font-bold text-2xl">#{currentUser.globalRank}</div>
                <div className="flex items-center gap-1 text-sm">
                  <FaArrowUp className="text-green-400" />
                  <span className="text-green-400">+5 this week</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </div>
  )
}

export default FanRanking
