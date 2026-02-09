import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaSearch,
  FaEye,
  FaFilter,
  FaTrophy,
  FaUsers,
  FaChartLine,
  FaClock,
  FaMapMarkerAlt,
  FaCoins,
  FaStar,
  FaCrown,
  FaRunning,
  FaFootballBall,
  FaBasketballBall,
  FaSwimmer,
  FaChild,
  FaUserCheck,
  FaChartArea,
  FaChartBar,
  FaChartPie,
  FaFire,
  FaHeart,
  FaRocket,
  FaBullhorn,
  FaMedal,
  FaCalendarAlt,
  FaBarcode,
  FaGift,
  FaWallet,
  FaShieldAlt,
  FaExclamationTriangle,
  FaCheckCircle,
  FaTimesCircle,
  FaPlayCircle,
  FaPauseCircle,
  FaShareAlt,
  FaEyeSlash
} from 'react-icons/fa';

// Static data only - no API calls

function AthleteVipScan() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState('30d');

  // Mock athlete data
  const athleteData = {
    name: 'Marcus Johnson',
    sport: 'Professional Basketball',
    totalScans: 89450,
    uniqueFans: 32100,
    activeCampaigns: 5,
    weeklyGrowth: 12.8,
    monthlyGrowth: 34.2,
    totalEngagement: 156780,
    currentRank: 3,
    globalRank: 15,
    walletEarnings: 45230,
    verificationStatus: 'verified'
  };

  // Mock campaigns involving this athlete
  const [campaigns, setCampaigns] = useState([
    {
      id: 'CAMP-001',
      name: 'Nike Elite Basketball Campaign',
      sponsor: 'Nike',
      status: 'active',
      athleteScans: 28450,
      totalCampaignScans: 89200,
      athleteContribution: 31.9,
      fnktEarned: 18900,
      rankingBoost: 2,
      startDate: '2024-01-15',
      endDate: '2024-12-31',
      engagementQuality: 94.2,
      fanSegments: {
        youth: 45,
        fans: 35,
        clubs: 20
      },
      weeklyTrend: [2100, 2350, 2680, 2890, 3120, 3340, 3580, 3750],
      itemTypes: [
        { name: 'Signature Jersey', scans: 12450, engagement: 89.3 },
        { name: 'Training Shoes', scans: 8900, engagement: 92.1 },
        { name: 'Autographed Ball', scans: 7100, engagement: 96.7 }
      ]
    },
    {
      id: 'CAMP-002',
      name: 'Global Basketball Championship',
      sponsor: 'Adidas',
      status: 'active',
      athleteScans: 19800,
      totalCampaignScans: 67800,
      athleteContribution: 29.2,
      fnktEarned: 12400,
      rankingBoost: 1,
      startDate: '2024-02-01',
      endDate: '2024-11-30',
      engagementQuality: 91.8,
      fanSegments: {
        fans: 52,
        youth: 28,
        clubs: 20
      },
      weeklyTrend: [1800, 1950, 2100, 2280, 2450, 2600, 2750, 2900],
      itemTypes: [
        { name: 'Championship Ring', scans: 8900, engagement: 94.5 },
        { name: 'Team Merchandise', scans: 6500, engagement: 87.2 },
        { name: 'Digital Content', scans: 4400, engagement: 92.3 }
      ]
    },
    {
      id: 'CAMP-003',
      name: 'Youth Basketball Initiative',
      sponsor: 'Under Armour',
      status: 'completed',
      athleteScans: 25600,
      totalCampaignScans: 45200,
      athleteContribution: 56.6,
      fnktEarned: 9800,
      rankingBoost: 3,
      startDate: '2024-03-01',
      endDate: '2024-08-31',
      engagementQuality: 96.1,
      fanSegments: {
        youth: 68,
        parents: 22,
        clubs: 10
      },
      weeklyTrend: [2400, 2650, 2900, 3150, 3380, 3620, 3850, 4100],
      itemTypes: [
        { name: 'Youth Training Kit', scans: 12800, engagement: 97.8 },
        { name: 'Inspirational Posters', scans: 7800, engagement: 93.4 },
        { name: 'Online Workshops', scans: 5000, engagement: 98.1 }
      ]
    },
    {
      id: 'CAMP-004',
      name: 'Street Basketball Movement',
      sponsor: 'Puma',
      status: 'active',
      athleteScans: 15600,
      totalCampaignScans: 38900,
      athleteContribution: 40.1,
      fnktEarned: 3130,
      rankingBoost: 1,
      startDate: '2024-04-01',
      endDate: '2024-10-31',
      engagementQuality: 88.7,
      fanSegments: {
        fans: 60,
        youth: 30,
        clubs: 10
      },
      weeklyTrend: [1200, 1350, 1480, 1620, 1750, 1890, 2020, 2150],
      itemTypes: [
        { name: 'Street Style Apparel', scans: 8200, engagement: 85.6 },
        { name: 'Urban Sneakers', scans: 4800, engagement: 91.2 },
        { name: 'Street Art NFTs', scans: 2600, engagement: 94.7 }
      ]
    }
  ]);

  // Mock ranking data
  const rankingData = {
    currentLocalRank: 3,
    currentGlobalRank: 15,
    scanContributionToRanking: 28.5,
    peersComparison: [
      { name: 'Player A', scans: 45600, rank: 8 },
      { name: 'Player B', scans: 52300, rank: 5 },
      { name: 'Player C', scans: 38700, rank: 12 },
      { name: 'Player D', scans: 67800, rank: 2 }
    ]
  };

  // Mock wallet transactions from scans
  const walletTransactions = [
    { id: 'TXN-001', campaign: 'Nike Elite Basketball', amount: 1250, date: '2024-01-20', type: 'scan_reward' },
    { id: 'TXN-002', campaign: 'Global Basketball Championship', amount: 890, date: '2024-01-18', type: 'scan_reward' },
    { id: 'TXN-003', campaign: 'Youth Basketball Initiative', amount: 2100, date: '2024-01-15', type: 'scan_reward' },
    { id: 'TXN-004', campaign: 'Nike Elite Basketball', amount: 1350, date: '2024-01-12', type: 'scan_reward' },
    { id: 'TXN-005', campaign: 'Street Basketball Movement', amount: 780, date: '2024-01-10', type: 'scan_reward' }
  ];

  // Mock notifications
  const notifications = [
    { id: 'NOT-001', type: 'milestone', message: 'Congratulations! You reached 50,000 total scans!', date: '2024-01-20', read: false },
    { id: 'NOT-002', type: 'engagement', message: 'Your Nike campaign is generating excellent fan engagement!', date: '2024-01-18', read: true },
    { id: 'NOT-003', type: 'ranking', message: 'Scan activity boosted your global ranking by 2 positions!', date: '2024-01-15', read: true },
    { id: 'NOT-004', type: 'campaign', message: 'Youth Basketball Initiative campaign completed successfully!', date: '2024-01-12', read: true }
  ];

  // Mock audience insights
  const audienceInsights = {
    totalReach: 89450,
    segments: [
      { name: 'Youth (13-17)', percentage: 42.3, scans: 37850, growth: 15.2 },
      { name: 'Adult Fans', percentage: 35.8, scans: 32030, growth: 8.7 },
      { name: 'Club Members', percentage: 21.9, scans: 19570, growth: 12.1 }
    ],
    geography: [
      { region: 'North America', percentage: 45.2, scans: 40400 },
      { region: 'Europe', percentage: 32.8, scans: 29350 },
      { region: 'Asia', percentage: 15.6, scans: 13950 },
      { region: 'Other', percentage: 6.4, scans: 5750 }
    ]
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-400/10';
      case 'completed': return 'text-blue-400 bg-blue-400/10';
      case 'paused': return 'text-yellow-400 bg-yellow-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return FaPlayCircle;
      case 'completed': return FaCheckCircle;
      case 'paused': return FaPauseCircle;
      default: return FaPlayCircle;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount / 100);
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'milestone': return FaTrophy;
      case 'engagement': return FaFire;
      case 'ranking': return FaChartLine;
      case 'campaign': return FaBullhorn;
      default: return FaBell;
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'milestone': return 'text-yellow-400 bg-yellow-600/20';
      case 'engagement': return 'text-orange-400 bg-orange-600/20';
      case 'ranking': return 'text-green-400 bg-green-600/20';
      case 'campaign': return 'text-blue-400 bg-blue-600/20';
      default: return 'text-gray-400 bg-gray-600/20';
    }
  };

  return (
    <div className="min-h-screen lg:ml-[290px] px-4 lg:px-8 py-6 pt-28 lg:pt-6">
      {/* Header Section */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-8"
      >
        <div className="flex md:items-center items-start gap-4 mb-4">
          <div className="md:w-16 w-12 md:h-16 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
            <FaBarcode className="text-white text-3xl" />
          </div>
          <h1 className="md:text-3xl text-xl lg:text-4xl font-bold text-white mb-2">
            Fan Engagement & Reach
          </h1>
        </div>
        <div>
          <div className="flex md:items-center md:flex-row flex-col md:gap-4 gap-2">
            <div className="flex items-center gap-2">
              <FaHeart className="text-red-400" />
              <span className="text-red-400 font-semibold">{athleteData.totalEngagement.toLocaleString()} Total Engagements</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCrown className="text-yellow-400" />
              <span className="text-yellow-400">Elite Athlete</span>
            </div>
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm w-[150px] text-center ${athleteData.verificationStatus === 'verified'
              ? 'bg-green-600/20 text-green-400 border border-green-400/30'
              : 'bg-yellow-600/20 text-yellow-400 border border-yellow-400/30'
              }`}>
              <FaCheckCircle />
              Verified Athlete
            </div>
          </div>
        </div>
        <p className="text-gray-400 text-lg">
          Discover your fan engagement, influence growth, and campaign performance through verified interactions
        </p>
      </motion.div>

      {/* Trust & Security Messaging */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <div className="flex items-center gap-3 p-4 rounded-lg bg-blue-600/10 border border-blue-400/30 text-blue-400">
          <FaShieldAlt className="text-xl flex-shrink-0" />
          <div className="text-sm">
            <span className="font-semibold">Verified Engagement Only:</span> All interactions are authenticated and reflect genuine fan interest in your content and campaigns.
          </div>
        </div>
      </motion.div>

      {/* Engagement Overview Stats */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8"
      >
        <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-400/30 rounded-2xl md:p-6 p-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-400 text-sm font-medium">Total Fan Interactions</p>
              <p className="text-white text-2xl font-bold">{athleteData.totalScans.toLocaleString()}</p>
              <p className="text-purple-400 text-sm">verified engagements</p>
            </div>
            <FaUsers className="text-purple-400 text-3xl" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 border border-green-400/30 rounded-2xl md:p-6 p-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-400 text-sm font-medium">Unique Fans Reached</p>
              <p className="text-white text-2xl font-bold">{athleteData.uniqueFans.toLocaleString()}</p>
              <p className="text-green-400 text-sm">authentic supporters</p>
            </div>
            <FaUserCheck className="text-green-400 text-3xl" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-blue-400/30 rounded-2xl md:p-6 p-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-400 text-sm font-medium">Active Campaigns</p>
              <p className="text-white text-2xl font-bold">{athleteData.activeCampaigns}</p>
              <p className="text-blue-400 text-sm">driving engagement</p>
            </div>
            <FaBullhorn className="text-blue-400 text-3xl" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-600/20 to-red-600/20 border border-orange-400/30 rounded-2xl md:p-6 p-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-400 text-sm font-medium">Weekly Growth</p>
              <p className="text-white text-2xl font-bold">+{athleteData.weeklyGrowth}%</p>
              <p className="text-orange-400 text-sm">fan engagement up</p>
            </div>
            <FaRocket className="text-orange-400 text-3xl" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-600/20 to-amber-600/20 border border-yellow-400/30 rounded-2xl md:p-6 p-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-400 text-sm font-medium">FNKT Earned</p>
              <p className="text-white text-2xl font-bold">{formatCurrency(athleteData.walletEarnings)}</p>
              <p className="text-yellow-400 text-sm">from engagements</p>
            </div>
            <FaCoins className="text-yellow-400 text-3xl" />
          </div>
        </div>
      </motion.div>

      {/* Tab Navigation */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-6"
      >
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-1 bg-[#1e2139] p-1 rounded-xl border border-[#286db24c]">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${activeTab === 'overview'
              ? 'bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] text-white shadow-lg'
              : 'text-gray-400 hover:text-white'
              }`}
          >
            <FaChartLine className="inline mr-2" />
            Overview
          </button>
          <button
            onClick={() => setActiveTab('campaigns')}
            className={`py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${activeTab === 'campaigns'
              ? 'bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] text-white shadow-lg'
              : 'text-gray-400 hover:text-white'
              }`}
          >
            <FaBullhorn className="inline mr-2" />
            Campaigns
          </button>
          <button
            onClick={() => setActiveTab('rankings')}
            className={`py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${activeTab === 'rankings'
              ? 'bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] text-white shadow-lg'
              : 'text-gray-400 hover:text-white'
              }`}
          >
            <FaTrophy className="inline mr-2" />
            Rankings
          </button>
          <button
            onClick={() => setActiveTab('audience')}
            className={`py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${activeTab === 'audience'
              ? 'bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] text-white shadow-lg'
              : 'text-gray-400 hover:text-white'
              }`}
          >
            <FaUsers className="inline mr-2" />
            Audience
          </button>
          <button
            onClick={() => setActiveTab('wallet')}
            className={`py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${activeTab === 'wallet'
              ? 'bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] text-white shadow-lg'
              : 'text-gray-400 hover:text-white'
              }`}
          >
            <FaWallet className="inline mr-2" />
            Earnings
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${activeTab === 'notifications'
              ? 'bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] text-white shadow-lg'
              : 'text-gray-400 hover:text-white'
              }`}
          >
            <FaBullhorn className="inline mr-2" />
            Updates
          </button>
        </div>
      </motion.div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {/* Recent Activity Summary */}
          <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl md:p-6 p-2">
            <h3 className="text-white text-xl font-bold mb-4">Recent Fan Engagement</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">{athleteData.currentRank}</div>
                <p className="text-gray-400">Local Ranking</p>
                <div className="text-green-400 text-sm mt-1">↑ 2 positions this week</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">{athleteData.globalRank}</div>
                <p className="text-gray-400">Global Ranking</p>
                <div className="text-green-400 text-sm mt-1">↑ 3 positions this month</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">{athleteData.monthlyGrowth}%</div>
                <p className="text-gray-400">Monthly Growth</p>
                <div className="text-blue-400 text-sm mt-1">Fan engagement up</div>
              </div>
            </div>
          </div>

          {/* Campaign Performance Overview */}
          <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl md:p-6 p-2">
            <h3 className="text-white text-xl font-bold mb-4">Campaign Performance</h3>

            <div className="space-y-4">
              {campaigns.map((campaign, index) => (
                <motion.div
                  key={campaign.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex md:items-center justify-between md:flex-row flex-col bg-[#1e2139] rounded-lg md:p-4 p-2 border border-[#286db24c]"
                >
                  <div className="w-full md:hidden flex justify-end">
                    <div className={`md:hidden flex w-[120px] justify-center items-center gap-1 px-2 py-1 rounded-full text-xs ${getStatusColor(campaign.status)}`}>
                      {React.createElement(getStatusIcon(campaign.status), { className: "text-xs" })}
                      {campaign.status}
                    </div>
                  </div>
                  <div className="flex items-start md:gap-4 gap-2">
                    <div className="w-12 h-12 bg-[#2a2d4a] rounded-lg flex items-center justify-center">
                      <FaBullhorn className="text-blue-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-white font-semibold">{campaign.name}</span>
                        <div className={`md:flex hidden w-[120px] justify-center items-center gap-1 px-2 py-1 rounded-full text-xs ${getStatusColor(campaign.status)}`}>
                          {React.createElement(getStatusIcon(campaign.status), { className: "text-xs" })}
                          {campaign.status}
                        </div>
                      </div>
                      <p className="text-gray-400 text-sm">
                        {campaign.athleteScans.toLocaleString()} fan interactions • {formatCurrency(campaign.fnktEarned)} earned
                      </p>
                      <p className="text-blue-400 text-xs">
                        {campaign.athleteContribution}% of total campaign engagement
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-2">
                      <FaHeart className="text-red-400 text-sm" />
                      <span className="text-red-400 font-semibold">{campaign.engagementQuality}%</span>
                      <span className="text-gray-400 text-xs">quality score</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaChartLine className="text-green-400 text-sm" />
                      <span className="text-green-400 text-xs">+{campaign.rankingBoost} ranking boost</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Top Performing Items */}
          <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl md:p-6 p-2">
            <h3 className="text-white text-xl font-bold mb-4">Most Engaging Content</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {campaigns.flatMap(campaign => campaign.itemTypes).sort((a, b) => b.scans - a.scans).slice(0, 6).map((item, index) => (
                <motion.div
                  key={`${item.name}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-[#1e2139] rounded-lg p-4 border border-[#286db24c]"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-[#2a2d4a] rounded-lg flex items-center justify-center text-xl">
                      {item.name.includes('Jersey') ? '👕' : item.name.includes('Shoes') ? '👟' : item.name.includes('Ball') ? '🏀' : '📦'}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-semibold text-sm">{item.name}</h4>
                      <p className="text-gray-400 text-xs">High engagement</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-white font-bold">{item.scans.toLocaleString()}</div>
                      <div className="text-gray-400 text-xs">fan interactions</div>
                    </div>
                    <div className="text-right">
                      <div className="text-green-400 font-bold">{item.engagement}%</div>
                      <div className="text-gray-400 text-xs">engagement rate</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Campaigns Tab */}
      {activeTab === 'campaigns' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {/* Campaign Details */}
          <div className="space-y-4">
            {campaigns.map((campaign, index) => (
              <motion.div
                key={campaign.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl md:p-6 p-2"
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-white font-bold text-lg">{campaign.name}</h3>
                    <p className="text-gray-400 text-sm">Sponsored by {campaign.sponsor}</p>
                    <p className="text-gray-400 text-xs">
                      {formatDate(campaign.startDate)} - {formatDate(campaign.endDate)}
                    </p>
                  </div>
                  <div className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm ${getStatusColor(campaign.status)}`}>
                    {React.createElement(getStatusIcon(campaign.status), { className: "text-sm" })}
                    {campaign.status}
                  </div>
                </div>

                {/* Campaign Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400 mb-1">{campaign.athleteScans.toLocaleString()}</div>
                    <p className="text-gray-400 text-sm">Your Fan Interactions</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400 mb-1">{campaign.athleteContribution}%</div>
                    <p className="text-gray-400 text-sm">Campaign Contribution</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400 mb-1">{formatCurrency(campaign.fnktEarned)}</div>
                    <p className="text-gray-400 text-sm">FNKT Earned</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-400 mb-1">{campaign.engagementQuality}%</div>
                    <p className="text-gray-400 text-sm">Engagement Quality</p>
                  </div>
                </div>

                {/* Weekly Trend Chart */}
                <div className="mb-6">
                  <h4 className="text-white font-semibold mb-3">Weekly Engagement Trend</h4>
                  <div className="bg-[#1e2139] rounded-lg p-4">
                    <div className="flex items-end justify-between h-40 gap-1">
                      {campaign.weeklyTrend.map((value, idx) => {
                        const maxValue = Math.max(...campaign.weeklyTrend);
                        const percentage = maxValue > 0 ? (value / maxValue) * 100 : 0;
                        const barHeight = Math.max(percentage * 0.8, 4); // Minimum height of 4px

                        return (
                          <div key={idx} className="flex flex-col items-center flex-1">
                            <div className="relative w-full flex flex-col items-center justify-end h-full">
                              {/* Value label on top of bar */}
                              <div className="text-blue-400 text-xs font-semibold mb-1">
                                {value.toLocaleString()}
                              </div>
                              {/* Bar */}
                              <div
                                className="bg-gradient-to-t from-blue-600 to-blue-400 rounded-t w-full transition-all duration-300 hover:from-blue-500 hover:to-blue-300 min-h-[4px]"
                                style={{ height: `${barHeight}px` }}
                              ></div>
                            </div>
                            <span className="text-gray-400 text-xs mt-2">W{idx + 1}</span>
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex justify-between items-center mt-4 text-sm">
                      <span className="text-gray-400">Weekly fan interactions</span>
                      <span className="text-blue-400 font-semibold">
                        Avg: {Math.round(campaign.weeklyTrend.reduce((a, b) => a + b, 0) / campaign.weeklyTrend.length).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Fan Segment Breakdown */}
                <div className="mb-6">
                  <h4 className="text-white font-semibold mb-3">Fan Engagement by Segment</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {Object.entries(campaign.fanSegments).map(([segment, percentage]) => (
                      <div key={segment} className="bg-[#1e2139] rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-2">
                          {segment === 'youth' && <FaChild className="text-green-400" />}
                          {segment === 'fans' && <FaUsers className="text-blue-400" />}
                          {segment === 'clubs' && <FaTrophy className="text-yellow-400" />}
                          <span className="text-white capitalize">{segment}</span>
                        </div>
                        <div className="text-2xl font-bold text-white mb-1">{percentage}%</div>
                        <div className="text-gray-400 text-sm">of your interactions</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Item Performance */}
                <div>
                  <h4 className="text-white font-semibold mb-3">Content Performance</h4>
                  <div className="space-y-3">
                    {campaign.itemTypes.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center justify-between bg-[#1e2139] rounded-lg p-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-[#2a2d4a] rounded flex items-center justify-center text-sm">
                            {item.name.includes('Jersey') ? '👕' : item.name.includes('Shoes') ? '👟' : item.name.includes('Ball') ? '🏀' : '📦'}
                          </div>
                          <div>
                            <div className="text-white text-sm font-semibold">{item.name}</div>
                            <div className="text-gray-400 text-xs">{item.scans.toLocaleString()} interactions</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-green-400 font-bold">{item.engagement}%</div>
                          <div className="text-gray-400 text-xs">engagement</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Rankings Tab */}
      {activeTab === 'rankings' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl md:p-6 p-2">
            <h3 className="text-white text-xl font-bold mb-4">Ranking Performance</h3>
            <p className="text-gray-400 text-sm mb-6">How fan engagement influences your athlete rankings</p>

            {/* Current Rankings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-400 mb-2">#{rankingData.currentLocalRank}</div>
                <p className="text-gray-400">Local Ranking</p>
                <p className="text-green-400 text-sm mt-1">↑ 2 positions from fan engagement</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-400 mb-2">#{rankingData.currentGlobalRank}</div>
                <p className="text-gray-400">Global Ranking</p>
                <p className="text-green-400 text-sm mt-1">↑ 3 positions this month</p>
              </div>
            </div>

            {/* Ranking Factors */}
            <div className="mb-6">
              <h4 className="text-white font-semibold mb-3">Ranking Influence Factors</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between bg-[#1e2139] rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <FaHeart className="text-red-400" />
                    <span className="text-white">Fan Engagement</span>
                  </div>
                  <div className="text-right">
                    <div className="text-red-400 font-bold">{rankingData.scanContributionToRanking}%</div>
                    <div className="text-gray-400 text-sm">of ranking score</div>
                  </div>
                </div>
                <div className="flex items-center justify-between bg-[#1e2139] rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <FaTrophy className="text-yellow-400" />
                    <span className="text-white">Performance Metrics</span>
                  </div>
                  <div className="text-right">
                    <div className="text-yellow-400 font-bold">23.4%</div>
                    <div className="text-gray-400 text-sm">of ranking score</div>
                  </div>
                </div>
                <div className="flex items-center justify-between bg-[#1e2139] rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <FaStar className="text-blue-400" />
                    <span className="text-white">Brand Partnerships</span>
                  </div>
                  <div className="text-right">
                    <div className="text-blue-400 font-bold">18.7%</div>
                    <div className="text-gray-400 text-sm">of ranking score</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Peer Comparison */}
            <div>
              <h4 className="text-white font-semibold mb-3">Peer Comparison</h4>
              <div className="space-y-2">
                {rankingData.peersComparison.map((peer, index) => (
                  <div key={peer.name} className={`flex items-center justify-between p-3 rounded-lg ${index === 0 ? 'bg-green-600/20 border border-green-400/30' :
                    index === 1 ? 'bg-yellow-600/20 border border-yellow-400/30' :
                      'bg-[#1e2139] border border-[#286db24c]'
                    }`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${index === 0 ? 'bg-green-400 text-black' :
                        index === 1 ? 'bg-yellow-400 text-black' :
                          'bg-gray-600 text-white'
                        }`}>
                        {peer.rank}
                      </div>
                      <div>
                        <div className="text-white text-sm font-semibold">{peer.name}</div>
                        <div className="text-gray-400 text-xs">{peer.scans.toLocaleString()} fan interactions</div>
                      </div>
                    </div>
                    <div className={`text-sm font-bold ${index === 0 ? 'text-green-400' :
                      index === 1 ? 'text-yellow-400' :
                        'text-gray-400'
                      }`}>
                      #{peer.rank}
                    </div>
                  </div>
                ))}
                <div className="flex items-center justify-between p-3 rounded-lg bg-blue-600/20 border-2 border-blue-400">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center text-sm font-bold text-black">
                      {rankingData.currentGlobalRank}
                    </div>
                    <div>
                      <div className="text-white text-sm font-semibold">You (Marcus Johnson)</div>
                      <div className="text-gray-400 text-xs">{athleteData.totalScans.toLocaleString()} fan interactions</div>
                    </div>
                  </div>
                  <div className="text-blue-400 text-sm font-bold">
                    #{rankingData.currentGlobalRank}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Audience Tab */}
      {activeTab === 'audience' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl md:p-6 p-2">
            <h3 className="text-white text-xl font-bold mb-4">Audience Insights</h3>
            <p className="text-gray-400 text-sm mb-6">Understanding your fan base and engagement patterns</p>

            {/* Audience Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">{audienceInsights.totalReach.toLocaleString()}</div>
                <p className="text-gray-400">Total Reach</p>
                <p className="text-green-400 text-sm mt-1">Authentic fans reached</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">{audienceInsights.segments.length}</div>
                <p className="text-gray-400">Fan Segments</p>
                <p className="text-blue-400 text-sm mt-1">Diverse engagement</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">+12.1%</div>
                <p className="text-gray-400">Avg Growth</p>
                <p className="text-green-400 text-sm mt-1">Segment expansion</p>
              </div>
            </div>

            {/* Segment Analysis */}
            <div className="mb-6">
              <h4 className="text-white font-semibold mb-3">Fan Segments</h4>
              <div className="space-y-4">
                {audienceInsights.segments.map((segment, index) => (
                  <div key={index} className="bg-[#1e2139] rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {segment.name.includes('Youth') && <FaChild className="text-green-400" />}
                        {segment.name.includes('Adult') && <FaUsers className="text-blue-400" />}
                        {segment.name.includes('Club') && <FaTrophy className="text-yellow-400" />}
                        <span className="text-white font-semibold">{segment.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-bold">{segment.percentage}%</div>
                        <div className="text-green-400 text-sm">+{segment.growth}% growth</div>
                      </div>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-blue-400 h-2 rounded-full"
                        style={{ width: `${segment.percentage}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-400 mt-2">
                      <span>{segment.scans.toLocaleString()} interactions</span>
                      <span>{segment.percentage}% of total audience</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Geographic Distribution */}
            <div>
              <h4 className="text-white font-semibold mb-3">Geographic Reach</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {audienceInsights.geography.map((region, index) => (
                  <div key={index} className="bg-[#1e2139] rounded-lg p-4 text-center">
                    <div className="text-2xl mb-2">
                      {region.region === 'North America' && '🇺🇸'}
                      {region.region === 'Europe' && '🇪🇺'}
                      {region.region === 'Asia' && '🌏'}
                      {region.region === 'Other' && '🌍'}
                    </div>
                    <div className="text-white font-semibold mb-1">{region.region}</div>
                    <div className="text-2xl font-bold text-blue-400 mb-1">{region.percentage}%</div>
                    <div className="text-gray-400 text-sm">{region.scans.toLocaleString()} fans</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Wallet/Earnings Tab */}
      {activeTab === 'wallet' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl md:p-6 p-2">
            <h3 className="text-white text-xl font-bold mb-4">Engagement Earnings</h3>
            <p className="text-gray-400 text-sm mb-6">FNKT earned through fan interactions and campaign participation</p>

            {/* Earnings Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">{formatCurrency(athleteData.walletEarnings)}</div>
                <p className="text-gray-400">Total FNKT Earned</p>
                <p className="text-yellow-400 text-sm mt-1">From fan engagement</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">{formatCurrency(walletTransactions.reduce((acc, tx) => acc + tx.amount, 0))}</div>
                <p className="text-gray-400">Recent Earnings</p>
                <p className="text-green-400 text-sm mt-1">Last 30 days</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">2.4x</div>
                <p className="text-gray-400">ROI Multiplier</p>
                <p className="text-blue-400 text-sm mt-1">Engagement value</p>
              </div>
            </div>

            {/* Recent Transactions */}
            <div>
              <h4 className="text-white font-semibold mb-3">Recent Engagement Rewards</h4>
              <div className="space-y-3">
                {walletTransactions.map((transaction, index) => (
                  <motion.div
                    key={transaction.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex md:items-center justify-between md:flex-row flex-col bg-[#1e2139] rounded-lg p-4 border border-[#286db24c]"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-[#2a2d4a] rounded-lg flex items-center justify-center">
                        <FaCoins className="text-yellow-400" />
                      </div>
                      <div>
                        <div className="text-white font-semibold">{transaction.campaign}</div>
                        <div className="text-gray-400 text-sm">{formatDate(transaction.date)}</div>
                        <div className="text-blue-400 text-xs">Campaign scan reward</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <FaCoins className="text-yellow-400 text-sm" />
                        <span className="text-yellow-400 font-bold text-lg">+{formatCurrency(transaction.amount)}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl md:p-6 p-2">
            <h3 className="text-white text-xl font-bold mb-4">Engagement Updates</h3>
            <p className="text-gray-400 text-sm mb-6">Stay updated on your fan engagement milestones and achievements</p>

            <div className="space-y-4">
              {notifications.map((notification, index) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-start gap-4 p-4 rounded-lg border ${notification.read
                    ? 'bg-[#1e2139] border-[#286db24c]'
                    : `${getNotificationColor(notification.type)} border-current`
                    }`}
                >
                  <div className="flex-shrink-0">
                    {React.createElement(getNotificationIcon(notification.type), {
                      className: `text-2xl ${notification.read ? 'text-gray-400' : 'text-current'}`
                    })}
                  </div>
                  <div className="flex-1">
                    <div className={`font-semibold ${notification.read ? 'text-gray-300' : 'text-white'}`}>
                      {notification.message}
                    </div>
                    <div className="text-gray-400 text-sm mt-1">
                      {formatDate(notification.date)}
                    </div>
                  </div>
                  {!notification.read && (
                    <div className="w-2 h-2 bg-current rounded-full flex-shrink-0"></div>
                  )}
                </motion.div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-600/10 border border-blue-400/30 rounded-lg">
              <div className="flex items-center gap-3">
                <FaShieldAlt className="text-blue-400" />
                <div className="text-sm">
                  <div className="text-blue-400 font-semibold">Privacy Protected</div>
                  <div className="text-gray-300">No raw scan data or personal fan information is shared. All updates are aggregated and anonymized.</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default AthleteVipScan;

