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
  FaEyeSlash,
  FaHome,
  FaGraduationCap,
  FaHandshake,
  FaUserFriends,
  FaAward,
  FaGlobe
} from 'react-icons/fa';

// Static data only - no API calls

function ClubTeamUniScan() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState('30d');

  // Mock club data
  const clubData = {
    name: 'Barcelona FC Youth Academy',
    type: 'football_club',
    totalScans: 156780,
    uniqueFans: 45230,
    activeCampaigns: 8,
    weeklyGrowth: 15.3,
    monthlyGrowth: 42.1,
    totalEngagement: 289450,
    currentRank: 2,
    regionalRank: 1,
    leagueRank: 5,
    walletEarnings: 89450,
    youthMembers: 1250,
    parentEngagement: 890,
    verificationStatus: 'verified'
  };

  // Mock campaigns involving this club
  const [campaigns, setCampaigns] = useState([
    {
      id: 'CAMP-001',
      name: 'Nike Youth Development Program',
      sponsor: 'Nike',
      status: 'active',
      totalScans: 45200,
      clubScans: 32100,
      attributionPercentage: 71.0,
      fnktEarned: 25600,
      rankingBoost: 3,
      startDate: '2024-01-15',
      endDate: '2024-12-31',
      engagementQuality: 95.2,
      scanBreakdown: {
        youth: 68,
        parents: 22,
        fans: 10
      },
      actionBreakdown: {
        scan: 75,
        redeem: 15,
        vote: 10
      },
      weeklyTrend: [2800, 3100, 3450, 3680, 3920, 4150, 4380, 4620],
      attributionSources: [
        { type: 'Club-branded patches', scans: 15800, percentage: 49.2 },
        { type: 'Youth athlete patches', scans: 12300, percentage: 38.3 },
        { type: 'Parent-linked items', scans: 4000, percentage: 12.5 }
      ]
    },
    {
      id: 'CAMP-002',
      name: 'Adidas Championship Series',
      sponsor: 'Adidas',
      status: 'active',
      totalScans: 38900,
      clubScans: 28900,
      attributionPercentage: 74.3,
      fnktEarned: 18900,
      rankingBoost: 2,
      startDate: '2024-02-01',
      endDate: '2024-11-30',
      engagementQuality: 92.1,
      scanBreakdown: {
        youth: 55,
        parents: 25,
        fans: 20
      },
      actionBreakdown: {
        scan: 70,
        redeem: 20,
        vote: 10
      },
      weeklyTrend: [2200, 2450, 2680, 2890, 3120, 3340, 3580, 3750],
      attributionSources: [
        { type: 'Club-branded patches', scans: 14500, percentage: 50.2 },
        { type: 'Youth athlete patches', scans: 11200, percentage: 38.8 },
        { type: 'Parent-linked items', scans: 3200, percentage: 11.0 }
      ]
    },
    {
      id: 'CAMP-003',
      name: 'Puma Community Engagement',
      sponsor: 'Puma',
      status: 'completed',
      totalScans: 52300,
      clubScans: 41200,
      attributionPercentage: 78.8,
      fnktEarned: 28900,
      rankingBoost: 4,
      startDate: '2024-03-01',
      endDate: '2024-08-31',
      engagementQuality: 96.7,
      scanBreakdown: {
        youth: 72,
        parents: 18,
        fans: 10
      },
      actionBreakdown: {
        scan: 80,
        redeem: 12,
        vote: 8
      },
      weeklyTrend: [3200, 3450, 3720, 3980, 4250, 4520, 4780, 5050],
      attributionSources: [
        { type: 'Club-branded patches', scans: 20600, percentage: 50.0 },
        { type: 'Youth athlete patches', scans: 16200, percentage: 39.3 },
        { type: 'Parent-linked items', scans: 4400, percentage: 10.7 }
      ]
    },
    {
      id: 'CAMP-004',
      name: 'Under Armour Youth Initiative',
      sponsor: 'Under Armour',
      status: 'active',
      totalScans: 29800,
      clubScans: 23500,
      attributionPercentage: 78.9,
      fnktEarned: 15600,
      rankingBoost: 2,
      startDate: '2024-04-01',
      endDate: '2024-10-31',
      engagementQuality: 93.4,
      scanBreakdown: {
        youth: 78,
        parents: 15,
        fans: 7
      },
      actionBreakdown: {
        scan: 85,
        redeem: 10,
        vote: 5
      },
      weeklyTrend: [1800, 1950, 2100, 2280, 2450, 2600, 2750, 2900],
      attributionSources: [
        { type: 'Club-branded patches', scans: 11750, percentage: 50.0 },
        { type: 'Youth athlete patches', scans: 9400, percentage: 40.0 },
        { type: 'Parent-linked items', scans: 2350, percentage: 10.0 }
      ]
    }
  ]);

  // Mock ranking data
  const rankingData = {
    currentClubRank: 2,
    regionalRank: 1,
    leagueRank: 5,
    scanContributionToRanking: 35.2,
    category: 'Youth Football Academy',
    region: 'Catalonia',
    league: 'Spanish Youth League',
    peerComparison: [
      { name: 'Real Madrid Youth', rank: 1, scans: 178900 },
      { name: 'Atletico Madrid Academy', rank: 3, scans: 145600 },
      { name: 'Valencia CF Youth', rank: 4, scans: 132400 },
      { name: 'Sevilla FC Academy', rank: 6, scans: 118700 }
    ]
  };

  // Mock youth and parent engagement data
  const youthEngagementData = {
    totalYouthMembers: 1250,
    activeYouthScans: 890,
    parentEngagement: 645,
    licensedAthletes: 980,
    engagementRate: 71.2,
    equipmentDistributed: 2340,
    youthSegments: [
      { age: 'U-12', members: 320, scans: 245, engagement: 76.6 },
      { age: 'U-14', members: 380, scans: 298, engagement: 78.4 },
      { age: 'U-16', members: 290, scans: 227, engagement: 78.3 },
      { age: 'U-18', members: 260, scans: 120, engagement: 46.2 }
    ],
    parentActivities: [
      { type: 'Equipment Claims', count: 345, percentage: 53.5 },
      { type: 'Event Registrations', count: 156, percentage: 24.2 },
      { type: 'Information Access', count: 98, percentage: 15.2 },
      { type: 'Communication', count: 46, percentage: 7.1 }
    ]
  };

  // Mock wallet transactions
  const walletTransactions = [
    { id: 'TXN-001', campaign: 'Nike Youth Development', amount: 1850, date: '2024-01-20', type: 'scan_reward' },
    { id: 'TXN-002', campaign: 'Adidas Championship Series', amount: 1420, date: '2024-01-18', type: 'scan_reward' },
    { id: 'TXN-003', campaign: 'Puma Community Engagement', amount: 2100, date: '2024-01-15', type: 'scan_reward' },
    { id: 'TXN-004', campaign: 'Under Armour Youth Initiative', amount: 980, date: '2024-01-12', type: 'scan_reward' },
    { id: 'TXN-005', campaign: 'Nike Youth Development', amount: 1650, date: '2024-01-10', type: 'scan_reward' }
  ];

  // Mock notifications
  const notifications = [
    { id: 'NOT-001', type: 'milestone', message: 'Congratulations! Your club reached 150,000 total community scans!', date: '2024-01-20', read: false },
    { id: 'NOT-002', type: 'engagement', message: 'Youth engagement is up 23% this week across all programs', date: '2024-01-18', read: true },
    { id: 'NOT-003', type: 'ranking', message: 'Club ranking improved to #2 in regional youth academies!', date: '2024-01-15', read: true },
    { id: 'NOT-004', type: 'campaign', message: 'Puma Community Engagement campaign completed successfully!', date: '2024-01-12', read: true },
    { id: 'NOT-005', type: 'youth', message: 'New youth athlete registrations are generating strong engagement', date: '2024-01-10', read: true }
  ];

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
      case 'youth': return FaChild;
      default: return FaBell;
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'milestone': return 'text-yellow-400 bg-yellow-600/20';
      case 'engagement': return 'text-orange-400 bg-orange-600/20';
      case 'ranking': return 'text-green-400 bg-green-600/20';
      case 'campaign': return 'text-blue-400 bg-blue-600/20';
      case 'youth': return 'text-purple-400 bg-purple-600/20';
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
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
            <FaHome className="text-white text-3xl" />
          </div>
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
              Community Engagement Hub
            </h1>
            <div className="flex md:items-center md:flex-row flex-col md:gap-4 gap-2">
              <div className="flex items-center gap-2">
                <FaUserFriends className="text-blue-400" />
                <span className="text-blue-400 font-semibold">{clubData.totalEngagement.toLocaleString()} Community Interactions</span>
              </div>
              <div className="flex items-center gap-2">
                <FaChild className="text-green-400" />
                <span className="text-green-400">{clubData.youthMembers} Youth Members</span>
              </div>
              <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm w-[150px] text-center ${clubData.verificationStatus === 'verified'
                ? 'bg-green-600/20 text-green-400 border border-green-400/30'
                : 'bg-yellow-600/20 text-yellow-400 border border-yellow-400/30'
                }`}>
                <FaCheckCircle />
                Verified Club
              </div>
            </div>
          </div>
        </div>
        <p className="text-gray-400 text-lg">
          Monitor community engagement, youth participation, and club growth through verified interactions
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
            <span className="font-semibold">Community-First Engagement:</span> All interactions reflect genuine community participation and youth development activities.
          </div>
        </div>
      </motion.div>

      {/* Community Overview Stats */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8"
      >
        <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-400/30 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-400 text-sm font-medium">Community Scans</p>
              <p className="text-white text-2xl font-bold">{clubData.totalScans.toLocaleString()}</p>
              <p className="text-purple-400 text-sm">verified interactions</p>
            </div>
            <FaUsers className="text-purple-400 text-3xl" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 border border-green-400/30 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-400 text-sm font-medium">Youth Engagement</p>
              <p className="text-white text-2xl font-bold">{clubData.youthMembers.toLocaleString()}</p>
              <p className="text-green-400 text-sm">active members</p>
            </div>
            <FaChild className="text-green-400 text-3xl" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-blue-400/30 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-400 text-sm font-medium">Active Campaigns</p>
              <p className="text-white text-2xl font-bold">{clubData.activeCampaigns}</p>
              <p className="text-blue-400 text-sm">driving engagement</p>
            </div>
            <FaBullhorn className="text-blue-400 text-3xl" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-600/20 to-red-600/20 border border-orange-400/30 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-400 text-sm font-medium">Weekly Growth</p>
              <p className="text-white text-2xl font-bold">+{clubData.weeklyGrowth}%</p>
              <p className="text-orange-400 text-sm">community expansion</p>
            </div>
            <FaRocket className="text-orange-400 text-3xl" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-600/20 to-amber-600/20 border border-yellow-400/30 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-400 text-sm font-medium">FNKT Earned</p>
              <p className="text-white text-2xl font-bold">{formatCurrency(clubData.walletEarnings)}</p>
              <p className="text-yellow-400 text-sm">from engagement</p>
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
            onClick={() => setActiveTab('youth')}
            className={`py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${activeTab === 'youth'
              ? 'bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] text-white shadow-lg'
              : 'text-gray-400 hover:text-white'
              }`}
          >
            <FaChild className="inline mr-2" />
            Youth & Parents
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
            onClick={() => setActiveTab('updates')}
            className={`py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${activeTab === 'updates'
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
            <h3 className="text-white text-xl font-bold mb-4">Community Activity Summary</h3>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">#{rankingData.currentClubRank}</div>
                <p className="text-gray-400">Club Ranking</p>
                <div className="text-green-400 text-sm mt-1">↑ 2 positions this month</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">#{rankingData.regionalRank}</div>
                <p className="text-gray-400">Regional Rank</p>
                <div className="text-green-400 text-sm mt-1">Leading {rankingData.region}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">{youthEngagementData.engagementRate}%</div>
                <p className="text-gray-400">Youth Engagement</p>
                <div className="text-blue-400 text-sm mt-1">Active participation</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400 mb-2">{clubData.monthlyGrowth}%</div>
                <p className="text-gray-400">Monthly Growth</p>
                <div className="text-orange-400 text-sm mt-1">Community expansion</div>
              </div>
            </div>
          </div>

          {/* Campaign Performance Overview */}
          <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl md:p-6 p-2">
            <h3 className="text-white text-xl font-bold mb-4">Campaign Participation</h3>

            <div className="space-y-4">
              {campaigns.map((campaign, index) => (
                <motion.div
                  key={campaign.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex md:items-center justify-between md:flex-row flex-col gap-2 bg-[#1e2139] rounded-lg p-4 border border-[#286db24c]"
                >
                  <div className="w-full md:hidden flex justify-end">
                    <div className={`md:hidden flex w-[120px] justify-center items-center gap-1 px-2 py-1 rounded-full text-xs ${getStatusColor(campaign.status)}`}>
                      {React.createElement(getStatusIcon(campaign.status), { className: "text-xs" })}
                      {campaign.status}
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#2a2d4a] rounded-lg flex items-center justify-center">
                      <FaBullhorn className="text-blue-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-white font-semibold">{campaign.name}</span>
                        <div className={`md:flex hidden items-center gap-1 px-2 py-1 rounded-full text-xs ${getStatusColor(campaign.status)}`}>
                          {React.createElement(getStatusIcon(campaign.status), { className: "text-xs" })}
                          {campaign.status}
                        </div>
                      </div>
                      <p className="text-gray-400 text-sm">
                        {campaign.clubScans.toLocaleString()} community interactions • {formatCurrency(campaign.fnktEarned)} earned
                      </p>
                      <p className="text-blue-400 text-xs">
                        {campaign.attributionPercentage}% attributed to our club
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-2">
                      <FaHeart className="text-red-400 text-sm" />
                      <span className="text-red-400 font-semibold">{campaign.engagementQuality}%</span>
                      <span className="text-gray-400 text-xs">engagement quality</span>
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

          {/* Top Engagement Sources */}
          <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl md:p-6 p-2">
            <h3 className="text-white text-xl font-bold mb-4">Engagement Attribution</h3>
            <p className="text-gray-400 text-sm mb-6">How community interactions are attributed to our club</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#1e2139] rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <FaHome className="text-blue-400 text-xl" />
                  <div>
                    <div className="text-white font-semibold">Club-Branded Items</div>
                    <div className="text-gray-400 text-xs">Official club merchandise</div>
                  </div>
                </div>
                <div className="text-2xl font-bold text-blue-400 mb-1">49.2%</div>
                <div className="text-gray-400 text-sm">of attributed scans</div>
              </div>

              <div className="bg-[#1e2139] rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <FaChild className="text-green-400 text-xl" />
                  <div>
                    <div className="text-white font-semibold">Youth Athlete Items</div>
                    <div className="text-gray-400 text-xs">Licensed youth members</div>
                  </div>
                </div>
                <div className="text-2xl font-bold text-green-400 mb-1">38.3%</div>
                <div className="text-gray-400 text-sm">of attributed scans</div>
              </div>

              <div className="bg-[#1e2139] rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <FaUserCheck className="text-purple-400 text-xl" />
                  <div>
                    <div className="text-white font-semibold">Parent-Linked Items</div>
                    <div className="text-gray-400 text-xs">Parent/guardian interactions</div>
                  </div>
                </div>
                <div className="text-2xl font-bold text-purple-400 mb-1">12.5%</div>
                <div className="text-gray-400 text-sm">of attributed scans</div>
              </div>
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
                    <div className="text-2xl font-bold text-blue-400 mb-1">{campaign.clubScans.toLocaleString()}</div>
                    <p className="text-gray-400 text-sm">Club Interactions</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400 mb-1">{campaign.attributionPercentage}%</div>
                    <p className="text-gray-400 text-sm">Attribution Rate</p>
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
                  <h4 className="text-white font-semibold mb-3">Weekly Community Engagement</h4>
                  <div className="bg-[#1e2139] rounded-lg p-4">
                    <div className="flex items-end justify-between h-40 gap-1">
                      {campaign.weeklyTrend.map((value, idx) => {
                        const maxValue = Math.max(...campaign.weeklyTrend);
                        const percentage = maxValue > 0 ? (value / maxValue) * 100 : 0;
                        const barHeight = Math.max(percentage * 0.8, 4);

                        return (
                          <div key={idx} className="flex flex-col items-center flex-1">
                            <div className="relative w-full flex flex-col items-center justify-end h-full">
                              <div className="text-blue-400 text-xs font-semibold mb-1">
                                {value.toLocaleString()}
                              </div>
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
                      <span className="text-gray-400">Weekly community interactions</span>
                      <span className="text-blue-400 font-semibold">
                        Avg: {Math.round(campaign.weeklyTrend.reduce((a, b) => a + b, 0) / campaign.weeklyTrend.length).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Breakdown */}
                <div className="mb-6">
                  <h4 className="text-white font-semibold mb-3">Interaction Types</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {Object.entries(campaign.actionBreakdown).map(([action, percentage]) => (
                      <div key={action} className="bg-[#1e2139] rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <FaBarcode className="text-green-400" />
                          <span className="text-white capitalize">{action}</span>
                        </div>
                        <div className="text-2xl font-bold text-white mb-1">{percentage}%</div>
                        <div className="text-gray-400 text-sm">of interactions</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Attribution Sources */}
                <div>
                  <h4 className="text-white font-semibold mb-3">Engagement Attribution Sources</h4>
                  <div className="space-y-3">
                    {campaign.attributionSources.map((source, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-[#1e2139] rounded-lg p-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-[#2a2d4a] rounded flex items-center justify-center text-sm">
                            {source.type.includes('Club') ? '🏠' : source.type.includes('Youth') ? '👶' : '👨‍👩‍👧‍👦'}
                          </div>
                          <div>
                            <div className="text-white text-sm font-semibold">{source.type}</div>
                            <div className="text-gray-400 text-xs">{source.scans.toLocaleString()} interactions</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-green-400 font-bold">{source.percentage}%</div>
                          <div className="text-gray-400 text-xs">attribution</div>
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

      {/* Youth & Parents Tab */}
      {activeTab === 'youth' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl md:p-6 p-2">
            <h3 className="text-white text-xl font-bold mb-4">Youth & Parent Engagement</h3>
            <p className="text-gray-400 text-sm mb-6">Critical community engagement metrics for youth development programs</p>

            {/* Youth Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">{youthEngagementData.totalYouthMembers.toLocaleString()}</div>
                <p className="text-gray-400">Youth Members</p>
                <p className="text-green-400 text-sm mt-1">Active participants</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">{youthEngagementData.activeYouthScans.toLocaleString()}</div>
                <p className="text-gray-400">Youth Interactions</p>
                <p className="text-blue-400 text-sm mt-1">Engaged activities</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">{youthEngagementData.parentEngagement.toLocaleString()}</div>
                <p className="text-gray-400">Parent Engagement</p>
                <p className="text-purple-400 text-sm mt-1">Guardian participation</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400 mb-2">{youthEngagementData.engagementRate}%</div>
                <p className="text-gray-400">Engagement Rate</p>
                <p className="text-orange-400 text-sm mt-1">Active participation</p>
              </div>
            </div>

            {/* Age Group Breakdown */}
            <div className="mb-6">
              <h4 className="text-white font-semibold mb-3">Youth Age Group Participation</h4>
              <div className="space-y-4">
                {youthEngagementData.youthSegments.map((segment, index) => (
                  <div key={index} className="bg-[#1e2139] rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <FaChild className={`text-${index === 0 ? 'blue' : index === 1 ? 'green' : index === 2 ? 'purple' : 'orange'}-400`} />
                        <span className="text-white font-semibold">{segment.age} Years</span>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-bold">{segment.members} members</div>
                        <div className="text-green-400 text-sm">+{segment.growth}% growth</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-gray-400 mb-1">Interactions</div>
                        <div className="text-xl font-bold text-blue-400">{segment.scans}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400 mb-1">Engagement Rate</div>
                        <div className="text-xl font-bold text-green-400">{segment.engagement}%</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Parent Activities */}
            <div className="mb-6">
              <h4 className="text-white font-semibold mb-3">Parent Engagement Activities</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {youthEngagementData.parentActivities.map((activity, index) => (
                  <div key={index} className="bg-[#1e2139] rounded-lg p-4 text-center">
                    <div className="text-2xl mb-2">
                      {activity.type.includes('Equipment') ? '🏆' : activity.type.includes('Event') ? '📅' : activity.type.includes('Information') ? 'ℹ️' : '💬'}
                    </div>
                    <div className="text-white font-semibold mb-1">{activity.type}</div>
                    <div className="text-2xl font-bold text-blue-400 mb-1">{activity.count}</div>
                    <div className="text-gray-400 text-sm">{activity.percentage}% of activities</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Equipment Distribution */}
            <div>
              <h4 className="text-white font-semibold mb-3">Equipment & Resource Distribution</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#1e2139] rounded-lg p-6 text-center">
                  <FaGift className="text-green-400 text-3xl mx-auto mb-3" />
                  <div className="text-2xl font-bold text-green-400 mb-2">{youthEngagementData.equipmentDistributed.toLocaleString()}</div>
                  <div className="text-white font-semibold mb-1">Items Distributed</div>
                  <div className="text-gray-400 text-sm">Equipment provided to youth</div>
                </div>
                <div className="bg-[#1e2139] rounded-lg p-6 text-center">
                  <FaUserCheck className="text-blue-400 text-3xl mx-auto mb-3" />
                  <div className="text-2xl font-bold text-blue-400 mb-2">{youthEngagementData.licensedAthletes.toLocaleString()}</div>
                  <div className="text-white font-semibold mb-1">Licensed Athletes</div>
                  <div className="text-gray-400 text-sm">Officially registered members</div>
                </div>
                <div className="bg-[#1e2139] rounded-lg p-6 text-center">
                  <FaBullhorn className="text-purple-400 text-3xl mx-auto mb-3" />
                  <div className="text-2xl font-bold text-purple-400 mb-2">94.2%</div>
                  <div className="text-white font-semibold mb-1">Eligibility Rate</div>
                  <div className="text-gray-400 text-sm">Members meeting requirements</div>
                </div>
              </div>
            </div>
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
            <h3 className="text-white text-xl font-bold mb-4">Club Rankings & Performance</h3>
            <p className="text-gray-400 text-sm mb-6">How community engagement influences club rankings</p>

            {/* Current Rankings */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-400 mb-2">#{rankingData.currentClubRank}</div>
                <p className="text-gray-400">Club Ranking</p>
                <p className="text-green-400 text-sm mt-1">↑ 2 positions this month</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-400 mb-2">#{rankingData.regionalRank}</div>
                <p className="text-gray-400">Regional Ranking</p>
                <p className="text-green-400 text-sm mt-1">Leading {rankingData.region}</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-400 mb-2">#{rankingData.leagueRank}</div>
                <p className="text-gray-400">League Ranking</p>
                <p className="text-orange-400 text-sm mt-1">{rankingData.league} position</p>
              </div>
            </div>

            {/* Ranking Factors */}
            <div className="mb-6">
              <h4 className="text-white font-semibold mb-3">Ranking Influence Factors</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between bg-[#1e2139] rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <FaUserFriends className="text-red-400" />
                    <span className="text-white">Community Engagement</span>
                  </div>
                  <div className="text-right">
                    <div className="text-red-400 font-bold">{rankingData.scanContributionToRanking}%</div>
                    <div className="text-gray-400 text-sm">of ranking score</div>
                  </div>
                </div>
                <div className="flex items-center justify-between bg-[#1e2139] rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <FaChild className="text-green-400" />
                    <span className="text-white">Youth Development</span>
                  </div>
                  <div className="text-right">
                    <div className="text-green-400 font-bold">28.4%</div>
                    <div className="text-gray-400 text-sm">of ranking score</div>
                  </div>
                </div>
                <div className="flex items-center justify-between bg-[#1e2139] rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <FaTrophy className="text-yellow-400" />
                    <span className="text-white">Performance Metrics</span>
                  </div>
                  <div className="text-right">
                    <div className="text-yellow-400 font-bold">22.3%</div>
                    <div className="text-gray-400 text-sm">of ranking score</div>
                  </div>
                </div>
                <div className="flex items-center justify-between bg-[#1e2139] rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <FaHandshake className="text-blue-400" />
                    <span className="text-white">Partnerships</span>
                  </div>
                  <div className="text-right">
                    <div className="text-blue-400 font-bold">18.9%</div>
                    <div className="text-gray-400 text-sm">of ranking score</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Peer Comparison */}
            <div>
              <h4 className="text-white font-semibold mb-3">Regional Peer Comparison</h4>
              <div className="space-y-2">
                {rankingData.peerComparison.map((peer, index) => (
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
                        <div className="text-gray-400 text-xs">{peer.scans.toLocaleString()} community scans</div>
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
                      {rankingData.currentClubRank}
                    </div>
                    <div>
                      <div className="text-white text-sm font-semibold">Barcelona FC Youth Academy</div>
                      <div className="text-gray-400 text-xs">{clubData.totalScans.toLocaleString()} community scans</div>
                    </div>
                  </div>
                  <div className="text-blue-400 text-sm font-bold">
                    #{rankingData.currentClubRank}
                  </div>
                </div>
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
            <h3 className="text-white text-xl font-bold mb-4">Community Earnings</h3>
            <p className="text-gray-400 text-sm mb-6">FNKT earned through community engagement and campaign participation</p>

            {/* Earnings Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">{formatCurrency(clubData.walletEarnings)}</div>
                <p className="text-gray-400">Total FNKT Earned</p>
                <p className="text-yellow-400 text-sm mt-1">From community engagement</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">{formatCurrency(walletTransactions.reduce((acc, tx) => acc + tx.amount, 0))}</div>
                <p className="text-gray-400">Recent Earnings</p>
                <p className="text-green-400 text-sm mt-1">Last 30 days</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">3.2x</div>
                <p className="text-gray-400">ROI Multiplier</p>
                <p className="text-blue-400 text-sm mt-1">Community value</p>
              </div>
            </div>

            {/* Recent Transactions */}
            <div>
              <h4 className="text-white font-semibold mb-3">Recent Community Rewards</h4>
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
                        <div className="text-blue-400 text-xs">Community engagement reward</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-end md:w-auto w-full mt-1">
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

      {/* Updates Tab */}
      {activeTab === 'updates' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl md:p-6 p-2">
            <h3 className="text-white text-xl font-bold mb-4">Community Updates</h3>
            <p className="text-gray-400 text-sm mb-6">Stay updated on community engagement milestones and achievements</p>

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
                  <div className="text-blue-400 font-semibold">Community Protection</div>
                  <div className="text-gray-300">No individual member data or personal information is shared. All updates focus on community achievements and engagement milestones.</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default ClubTeamUniScan;
