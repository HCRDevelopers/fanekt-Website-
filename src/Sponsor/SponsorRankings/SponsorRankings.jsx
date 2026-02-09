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
  FaArrowLeft,
  FaBuilding,
  FaGift,
  FaQrcode,
  FaMousePointer,
  FaExchangeAlt
} from 'react-icons/fa'

function SponsorRankings() {
  const [activeCategory, setActiveCategory] = useState('campaigns')
  const [selectedCampaign, setSelectedCampaign] = useState(null)

  // Mock sponsor data
  const sponsorData = {
    logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=150&h=150&fit=crop&crop=center',
    name: 'Nike Sports',
    activeCampaigns: 12,
    totalEngagements: 45680,
    tier: 'Premium Partner',
    engagementTrend: 'up' // up, down, stable
  }

  // Mock campaigns data
  const campaigns = [
    {
      id: 'summer-collection',
      name: 'Summer Collection Launch',
      status: 'Active',
      engagement: 12500,
      position: 1,
      duration: '23 days left',
      fans: [
        { rank: 1, username: 'FashionForward', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face', engagement: 850, interactions: ['scan', 'click', 'redeem'] },
        { rank: 2, username: 'StyleIcon', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face', engagement: 720, interactions: ['click', 'redeem'] },
        { rank: 3, username: 'SneakerHead', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face', engagement: 680, interactions: ['scan', 'redeem'] }
      ]
    },
    {
      id: 'training-gear',
      name: 'Training Gear Campaign',
      status: 'Active',
      engagement: 9800,
      position: 2,
      duration: '45 days left',
      fans: [
        { rank: 1, username: 'FitnessFan', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face', engagement: 650, interactions: ['scan', 'click'] },
        { rank: 2, username: 'GymRat', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face', engagement: 580, interactions: ['click', 'redeem'] }
      ]
    },
    {
      id: 'back-to-school',
      name: 'Back to School Collection',
      status: 'Completed',
      engagement: 15200,
      position: null,
      duration: 'Completed',
      fans: []
    }
  ]

  // Mock fan engagement data
  const fanEngagements = [
    { rank: 1, username: 'TopEngager', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face', engagement: 2450, campaign: 'Summer Collection' },
    { rank: 2, username: 'BrandLoyal', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face', engagement: 2100, campaign: 'Training Gear' },
    { rank: 3, username: 'StyleSeeker', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face', engagement: 1950, campaign: 'Summer Collection' }
  ]

  // Mock product rankings
  const productRankings = [
    { rank: 1, name: 'Air Max Running Shoes', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=100&h=100&fit=crop', engagement: 8900, redemptions: 234 },
    { rank: 2, name: 'Training T-Shirt', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=100&fit=crop', engagement: 7200, redemptions: 189 },
    { rank: 3, name: 'Sports Jacket', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=100&h=100&fit=crop', engagement: 6800, redemptions: 156 }
  ]

  const categories = [
    { key: 'campaigns', label: 'Campaign Rankings', icon: <FaAward />, available: true },
    { key: 'fans', label: 'Fan Engagement Rankings', icon: <FaUsers />, available: true },
    { key: 'products', label: 'Product / Reward Rankings', icon: <FaGift />, available: true }
  ]

  const getTierColor = (tier) => {
    switch (tier) {
      case 'Starter': return 'text-amber-600'
      case 'Active': return 'text-gray-400'
      case 'Premium Partner': return 'text-purple-500'
      default: return 'text-gray-400'
    }
  }

  const getTierBadgeStyle = (tier) => {
    switch (tier) {
      case 'Starter': return 'text-amber-600 border-amber-600 bg-amber-600/10'
      case 'Active': return 'text-gray-400 border-gray-400 bg-gray-400/10'
      case 'Premium Partner': return 'text-purple-500 border-purple-500 bg-purple-500/10'
      default: return 'text-gray-400 border-gray-400 bg-gray-400/10'
    }
  }

  const getInteractionIcon = (type) => {
    switch (type) {
      case 'scan': return <FaQrcode className="text-blue-400 text-xs" />
      case 'click': return <FaMousePointer className="text-green-400 text-xs" />
      case 'redeem': return <FaExchangeAlt className="text-purple-400 text-xs" />
      default: return null
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

  const getEngagementTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return <FaArrowUp className="text-green-400 text-sm" />
      case 'down': return <FaArrowDown className="text-red-400 text-sm" />
      default: return <FaMinus className="text-gray-400 text-sm" />
    }
  }

  const currentCampaignData = selectedCampaign ? campaigns.find(c => c.id === selectedCampaign) : null

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
            onClick={() => {
              if (selectedCampaign) {
                setSelectedCampaign(null)
              } else {
                window.history.back()
              }
            }}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FaArrowLeft className="text-xl" />
          </button>
          <h1 className="text-3xl lg:text-4xl font-bold text-white">
            {selectedCampaign ? `${currentCampaignData?.name} Rankings` : 'Engagement Rankings'}
          </h1>
        </div>
        {!selectedCampaign && (
          <p className="text-gray-400 text-lg">
            Track how your campaigns perform through real fan engagement.
          </p>
        )}
      </motion.div>

      {!selectedCampaign ? (
        <>
          {/* Sponsor Summary Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[#1e2139] border border-[#286db24c] rounded-2xl md:p-6 p-2 mb-8"
          >
            <div className="flex md:items-center md:flex-row flex-col-reverse gap-6 mb-6">
              <div className="flex gap-2">
                <img
                  src={sponsorData.logo}
                  alt={sponsorData.name}
                  className="w-20 h-20 rounded-full border-2 border-[#f64c68]"
                />
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white">{sponsorData.name}</h2>
                  <p className="text-gray-400 text-lg">Official Sponsor</p>
                  <div className="flex items-center flex-wrap gap-4 mt-2">
                    <div className="flex items-center gap-2">
                      <FaAward className="text-gray-400" />
                      <span className="text-white font-semibold">{sponsorData.activeCampaigns} Active Campaigns</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaUserFriends className="text-gray-400" />
                      <span className="text-white font-semibold">{sponsorData.totalEngagements.toLocaleString()} Engagements</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex md:w-auto w-full justify-end">
                <div className="text-right">
                  <span className={`text-sm px-3 py-1 rounded-full border ${getTierBadgeStyle(sponsorData.tier)}`}>
                    {sponsorData.tier}
                  </span>
                  <div className="flex items-center gap-2 mt-2">
                    {getEngagementTrendIcon(sponsorData.engagementTrend)}
                    <span className="text-gray-400 text-sm">Engagement trending</span>
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
              <span className="text-white text-sm font-medium">Current ranking period: Campaign-based</span>
            </div>
            <span className="text-gray-400 text-xs">Real-time Updates</span>
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

          {/* Content based on active category */}
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {activeCategory === 'campaigns' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {campaigns.map((campaign) => (
                  <div
                    key={campaign.id}
                    onClick={() => campaign.status === 'Active' && setSelectedCampaign(campaign.id)}
                    className={`bg-[#1e2139] border border-[#286db24c] rounded-xl p-6 cursor-pointer transition-all ${campaign.status === 'Active'
                      ? 'hover:border-[#f64c68]/50 hover:shadow-lg'
                      : 'opacity-60 cursor-default'
                      }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <FaAward className={`text-2xl ${campaign.status === 'Active' ? 'text-[#f64c68]' : 'text-gray-500'}`} />
                      <div className="flex items-center gap-2">
                        {campaign.position && (
                          <span className="text-xs bg-[#f64c68] text-white px-2 py-1 rounded-full">
                            #{campaign.position}
                          </span>
                        )}
                        <span className={`text-xs px-2 py-1 rounded-full ${campaign.status === 'Active'
                          ? 'bg-green-400/10 text-green-400 border border-green-400/30'
                          : 'bg-gray-500/10 text-gray-400 border border-gray-500/30'
                          }`}>
                          {campaign.status}
                        </span>
                      </div>
                    </div>
                    <h3 className={`font-bold text-lg mb-2 ${campaign.status === 'Active' ? 'text-white' : 'text-gray-400'}`}>
                      {campaign.name}
                    </h3>
                    <div className="flex items-center justify-between text-sm">
                      <span className={campaign.status === 'Active' ? 'text-gray-400' : 'text-gray-500'}>
                        {campaign.duration}
                      </span>
                      <span className={`font-semibold ${campaign.status === 'Active' ? 'text-[#f64c68]' : 'text-gray-400'}`}>
                        {campaign.engagement.toLocaleString()}
                      </span>
                    </div>
                    <div className="mt-2 bg-[#2a2d4a] rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] h-2 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min((campaign.engagement / 15000) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeCategory === 'fans' && (
              <div className="bg-[#1e2139] border border-[#286db24c] rounded-xl overflow-hidden">
                <div className="px-6 py-4 border-b border-[#286db24c] bg-[#2a2d4a]">
                  <h3 className="text-white font-bold text-lg">Top Fan Engagements</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[700px]">
                    <thead className="bg-[#2a2d4a] border-b border-[#286db24c]">
                      <tr>
                        <th className="text-left py-3 px-4 text-gray-400 font-semibold text-sm uppercase tracking-wider">Rank</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-semibold text-sm uppercase tracking-wider">Fan</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-semibold text-sm uppercase tracking-wider">Campaign</th>
                        <th className="text-right py-3 px-4 text-gray-400 font-semibold text-sm uppercase tracking-wider">Points</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#286db24c]/50">
                      {fanEngagements.map((fan) => (
                        <tr
                          key={fan.rank}
                          className="hover:bg-[#2a2d4a]/50 transition-colors"
                        >
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-lg text-white">
                                #{fan.rank}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={fan.avatar}
                                alt={fan.username}
                                className="w-10 h-10 rounded-full border border-[#286db24c]"
                              />
                              <div>
                                <span className="font-semibold text-white">
                                  {fan.username}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <span className="text-xs px-2 py-1 rounded-full bg-[#f64c68]/10 text-[#f64c68] border border-[#f64c68]/30">
                              {fan.campaign}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-right">
                            <div>
                              <span className="text-white font-semibold">{fan.engagement.toLocaleString()}</span>
                              <p className="text-gray-400 text-sm">Points</p>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeCategory === 'products' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {productRankings.map((product) => (
                  <div
                    key={product.rank}
                    className="bg-[#1e2139] border border-[#286db24c] rounded-xl p-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs bg-[#f64c68] text-white px-2 py-1 rounded-full">
                        #{product.rank}
                      </span>
                      <span className="text-gray-400 text-sm">{product.redemptions} redemptions</span>
                    </div>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-32 object-cover rounded-lg mb-4"
                    />
                    <h3 className="text-white font-bold text-lg mb-2">{product.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-[#f64c68] font-semibold">{product.engagement.toLocaleString()} engagements</span>
                    </div>
                    <div className="mt-2 bg-[#2a2d4a] rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] h-2 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min((product.engagement / 10000) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Performance Insights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-[#1e2139] border border-[#286db24c] rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <FaChartLine className="text-blue-400 text-xl" />
                <h3 className="text-white font-bold text-lg">Performance Insights</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center justify-between p-4 bg-[#2a2d4a] rounded-lg">
                  <div>
                    <p className="text-gray-400 text-sm">Overall Engagement</p>
                    <p className="text-green-400 font-semibold">High Performance</p>
                  </div>
                  <FaArrowUp className="text-green-400 text-2xl" />
                </div>

                <div className="flex items-center justify-between p-4 bg-[#2a2d4a] rounded-lg">
                  <div>
                    <p className="text-gray-400 text-sm">Fan Participation</p>
                    <p className="text-blue-400 font-semibold">Growing</p>
                  </div>
                  <FaUsers className="text-blue-400 text-2xl" />
                </div>
              </div>

              <div className="mt-4 p-4 bg-gradient-to-r from-[#f64c68]/10 to-[#ff6b6b]/10 rounded-lg border border-[#f64c68]/20">
                <p className="text-white text-sm">
                  Your campaigns are performing exceptionally well with strong fan engagement across all channels.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </>
      ) : (
        /* Campaign Detail View */
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Campaign Header */}
          <div className="bg-[#1e2139] border border-[#286db24c] rounded-xl p-6">
            <div className="flex items-center gap-4 mb-4">
              <FaAward className="text-[#f64c68] text-2xl" />
              <div>
                <h2 className="text-white text-2xl font-bold">{currentCampaignData?.name}</h2>
                <p className="text-gray-400">{currentCampaignData?.duration}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-[#f64c68]">{currentCampaignData?.engagement.toLocaleString()}</p>
                <p className="text-gray-400 text-sm">Total Engagements</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-white">{currentCampaignData?.fans.length}</p>
                <p className="text-gray-400 text-sm">Active Fans</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-400">{currentCampaignData?.position ? `#${currentCampaignData.position}` : 'N/A'}</p>
                <p className="text-gray-400 text-sm">Campaign Rank</p>
              </div>
              <div className="text-center">
                <span className="inline-block w-3 h-3 bg-green-400 rounded-full"></span>
                <p className="text-gray-400 text-sm mt-1">Active</p>
              </div>
            </div>
          </div>

          {/* Top 3 Fans */}
          {currentCampaignData?.fans.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {currentCampaignData.fans.slice(0, 3).map((fan, index) => (
                <div
                  key={fan.rank}
                  className="bg-[#1e2139] border border-[#286db24c] rounded-xl p-6 text-center relative overflow-hidden"
                >
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

                  <div className="flex justify-center gap-2">
                    {fan.interactions.map((interaction, idx) => (
                      <div key={idx} className="flex items-center justify-center">
                        {getInteractionIcon(interaction)}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Detailed Fan List */}
          <div className="bg-[#1e2139] border border-[#286db24c] rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-[#286db24c] bg-[#2a2d4a]">
              <h3 className="text-white font-bold text-lg">Fan Engagement Details</h3>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {currentCampaignData?.fans.map((fan) => (
                <div
                  key={fan.rank}
                  className="px-6 py-4 border-b border-[#286db24c]/50 hover:bg-[#2a2d4a]/50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 min-w-[60px]">
                        <span className="font-bold text-lg text-white">
                          #{fan.rank}
                        </span>
                      </div>
                      <img
                        src={fan.avatar}
                        alt={fan.username}
                        className="w-10 h-10 rounded-full border border-[#286db24c]"
                      />
                      <div className="flex-1">
                        <span className="font-semibold text-white">
                          {fan.username}
                        </span>
                      </div>
                      <div className="flex gap-1">
                        {fan.interactions.map((interaction, idx) => (
                          <div key={idx} className="flex items-center justify-center w-6 h-6">
                            {getInteractionIcon(interaction)}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-white font-semibold">{fan.engagement.toLocaleString()}</span>
                      <p className="text-gray-400 text-sm">Points</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default SponsorRankings
