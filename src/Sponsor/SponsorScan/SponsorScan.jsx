import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaSearch,
  FaEye,
  FaFilter,
  FaDownload,
  FaBullhorn,
  FaUsers,
  FaCoins,
  FaChartLine,
  FaClock,
  FaMapMarkerAlt,
  FaTrophy,
  FaShieldAlt,
  FaExclamationTriangle,
  FaCheckCircle,
  FaTimesCircle,
  FaPauseCircle,
  FaPlayCircle,
  FaCalendarAlt,
  FaBarcode,
  FaShoppingCart,
  FaGift,
  FaPercentage,
  FaCrown,
  FaStar,
  FaRunning,
  FaFootballBall,
  FaBasketballBall,
  FaSwimmer,
  FaChild,
  FaUserCheck,
  FaChartArea,
  FaChartBar,
  FaChartPie,
  FaThermometerHalf
} from 'react-icons/fa';

// Static data only - no API calls

function SponsorScan() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d');
  const [selectedSegment, setSelectedSegment] = useState('all');

  // Mock sponsor data
  const sponsorData = {
    name: 'Nike Official',
    totalCampaigns: 12,
    activeCampaigns: 8,
    totalScans: 45678,
    totalValidScans: 42150,
    totalRewardsDistributed: 892340,
    scanConversionRate: 92.4,
    avgCostPerScan: 21.1,
    verificationStatus: 'verified'
  };

  // Mock campaigns data
  const [campaigns, setCampaigns] = useState([
    {
      id: 'CAMP-001',
      name: 'Barcelona FC Partnership',
      status: 'active',
      totalScans: 15230,
      validScans: 14100,
      uniqueScans: 12850,
      rewardsDistributed: 298000,
      remainingBudget: 202000,
      scanThreshold: 15000,
      thresholdReached: false,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      targetSegments: ['fans', 'clubs', 'athletes'],
      scanFunnel: {
        totalScans: 15230,
        validScans: 14100,
        completedActions: 13200,
        rewardsIssued: 12850
      },
      dailyScans: [
        { date: '2024-01-15', scans: 450 },
        { date: '2024-01-16', scans: 520 },
        { date: '2024-01-17', scans: 380 },
        { date: '2024-01-18', scans: 610 },
        { date: '2024-01-19', scans: 490 },
        { date: '2024-01-20', scans: 580 },
        { date: '2024-01-21', scans: 420 }
      ],
      segmentBreakdown: {
        fans: { scans: 8900, percentage: 58.4 },
        clubs: { scans: 4200, percentage: 27.6 },
        athletes: { scans: 2130, percentage: 14.0 }
      },
      actionBreakdown: {
        scan: { scans: 12000, percentage: 78.8 },
        vote: { scans: 2500, percentage: 16.4 },
        redeem: { scans: 730, percentage: 4.8 }
      }
    },
    {
      id: 'CAMP-002',
      name: 'Global Football Campaign',
      status: 'active',
      totalScans: 8940,
      validScans: 8230,
      uniqueScans: 7890,
      rewardsDistributed: 174000,
      remainingBudget: 326000,
      scanThreshold: 10000,
      thresholdReached: false,
      startDate: '2024-02-01',
      endDate: '2024-11-30',
      targetSegments: ['fans', 'youth'],
      scanFunnel: {
        totalScans: 8940,
        validScans: 8230,
        completedActions: 7890,
        rewardsIssued: 7560
      },
      dailyScans: [
        { date: '2024-01-15', scans: 280 },
        { date: '2024-01-16', scans: 320 },
        { date: '2024-01-17', scans: 190 },
        { date: '2024-01-18', scans: 410 },
        { date: '2024-01-19', scans: 290 },
        { date: '2024-01-20', scans: 380 },
        { date: '2024-01-21', scans: 210 }
      ],
      segmentBreakdown: {
        fans: { scans: 6230, percentage: 69.7 },
        youth: { scans: 2710, percentage: 30.3 }
      },
      actionBreakdown: {
        scan: { scans: 7100, percentage: 79.4 },
        vote: { scans: 1520, percentage: 17.0 },
        redeem: { scans: 320, percentage: 3.6 }
      }
    },
    {
      id: 'CAMP-003',
      name: 'Youth Development Program',
      status: 'paused',
      totalScans: 18750,
      validScans: 17820,
      uniqueScans: 17200,
      rewardsDistributed: 420000,
      remainingBudget: 80000,
      scanThreshold: 20000,
      thresholdReached: false,
      startDate: '2024-03-01',
      endDate: '2024-10-31',
      targetSegments: ['youth', 'parents'],
      scanFunnel: {
        totalScans: 18750,
        validScans: 17820,
        completedActions: 17200,
        rewardsIssued: 16800
      },
      dailyScans: [
        { date: '2024-01-15', scans: 650 },
        { date: '2024-01-16', scans: 720 },
        { date: '2024-01-17', scans: 580 },
        { date: '2024-01-18', scans: 890 },
        { date: '2024-01-19', scans: 760 },
        { date: '2024-01-20', scans: 820 },
        { date: '2024-01-21', scans: 610 }
      ],
      segmentBreakdown: {
        youth: { scans: 12450, percentage: 66.4 },
        parents: { scans: 6320, percentage: 33.6 }
      },
      actionBreakdown: {
        scan: { scans: 14500, percentage: 77.3 },
        vote: { scans: 3200, percentage: 17.1 },
        redeem: { scans: 1050, percentage: 5.6 }
      }
    }
  ]);

  // Mock anti-fraud messages
  const fraudMessages = [
    { type: 'info', message: 'Only verified scans are counted', icon: FaShieldAlt },
    { type: 'success', message: 'Duplicate scans are automatically filtered', icon: FaCheckCircle },
    { type: 'warning', message: 'Fraud prevention systems are active', icon: FaExclamationTriangle }
  ];

  // Mock scan trends data
  const scanTrends = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    data: [12500, 15200, 18750, 22100, 19800, 23400],
    campaigns: ['Barcelona FC', 'Global Football', 'Youth Program']
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-400/10';
      case 'paused': return 'text-yellow-400 bg-yellow-400/10';
      case 'completed': return 'text-blue-400 bg-blue-400/10';
      case 'cancelled': return 'text-red-400 bg-red-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return FaPlayCircle;
      case 'paused': return FaPauseCircle;
      case 'completed': return FaCheckCircle;
      case 'cancelled': return FaTimesCircle;
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

  const getSegmentIcon = (segment) => {
    switch (segment) {
      case 'fans': return FaUsers;
      case 'clubs': return FaTrophy;
      case 'athletes': return FaRunning;
      case 'youth': return FaChild;
      case 'parents': return FaUserCheck;
      default: return FaUsers;
    }
  };

  const calculateScanFunnelPercentage = (current, total) => {
    return total > 0 ? ((current / total) * 100).toFixed(1) : 0;
  };

  return (
    <div className="min-h-screen lg:ml-[290px] md:px-4 px-2 lg:px-8 py-6 pt-28 lg:pt-6">
      {/* Header Section */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-8"
      >
        <div className="flex items-center md:gap-4 gap-2 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
            <FaBarcode className="text-white text-3xl" />
          </div>
          <h1 className="md:text-3xl text-xl lg:text-4xl font-bold text-white mb-2">
            Scan Analytics & Engagement
          </h1>
          </div>
          <div>
          <div className="flex md:items-center flex-wrap md:gap-4 gap-2">
            <div className="flex items-center gap-2">
              <FaShieldAlt className="text-green-400" />
              <span className="text-green-400 font-semibold">Verified Fan Engagement</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCrown className="text-yellow-400" />
              <span className="text-yellow-400">Premium Sponsor</span>
            </div>
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${sponsorData.verificationStatus === 'verified'
                ? 'bg-green-600/20 text-green-400 border border-green-400/30'
                : 'bg-yellow-600/20 text-yellow-400 border border-yellow-400/30'
              }`}>
              <FaCheckCircle />
              Verified Analytics
            </div>
          </div>
        </div>
        <p className="text-gray-400 text-lg">
          Monitor verified fan engagement and SmartPatch scan performance across all your campaigns
        </p>
      </motion.div>

      {/* Anti-Fraud Messaging */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {fraudMessages.map((msg, index) => (
            <div key={index} className={`flex items-center gap-3 p-4 rounded-lg border ${msg.type === 'info' ? 'bg-blue-600/10 border-blue-400/30 text-blue-400' :
                msg.type === 'success' ? 'bg-green-600/10 border-green-400/30 text-green-400' :
                  'bg-yellow-600/10 border-yellow-400/30 text-yellow-400'
              }`}>
              <msg.icon className="text-xl flex-shrink-0" />
              <span className="text-sm font-medium">{msg.message}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Scan Overview Stats */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8"
      >
        <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-blue-400/30 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-400 text-sm font-medium">Total Scans</p>
              <p className="text-white text-2xl font-bold">{sponsorData.totalScans.toLocaleString()}</p>
              <p className="text-blue-400 text-sm">verified engagements</p>
            </div>
            <FaBarcode className="text-blue-400 text-3xl" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 border border-green-400/30 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-400 text-sm font-medium">Valid Scans</p>
              <p className="text-white text-2xl font-bold">{sponsorData.totalValidScans.toLocaleString()}</p>
              <p className="text-green-400 text-sm">{sponsorData.scanConversionRate}% conversion</p>
            </div>
            <FaCheckCircle className="text-green-400 text-3xl" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-400/30 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-400 text-sm font-medium">FNKT Distributed</p>
              <p className="text-white text-2xl font-bold">{sponsorData.totalRewardsDistributed.toLocaleString()}</p>
              <p className="text-purple-400 text-sm">reward payments</p>
            </div>
            <FaCoins className="text-purple-400 text-3xl" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-600/20 to-red-600/20 border border-orange-400/30 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-400 text-sm font-medium">Avg Cost/Scan</p>
              <p className="text-white text-2xl font-bold">{sponsorData.avgCostPerScan}</p>
              <p className="text-orange-400 text-sm">FNKT per engagement</p>
            </div>
            <FaPercentage className="text-orange-400 text-3xl" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-600/20 to-amber-600/20 border border-yellow-400/30 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-400 text-sm font-medium">Active Campaigns</p>
              <p className="text-white text-2xl font-bold">{sponsorData.activeCampaigns}</p>
              <p className="text-yellow-400 text-sm">generating scans</p>
            </div>
            <FaBullhorn className="text-yellow-400 text-3xl" />
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
            onClick={() => setActiveTab('trends')}
            className={`py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${activeTab === 'trends'
                ? 'bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] text-white shadow-lg'
                : 'text-gray-400 hover:text-white'
              }`}
          >
            <FaChartArea className="inline mr-2" />
            Trends
          </button>
          <button
            onClick={() => setActiveTab('segments')}
            className={`py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${activeTab === 'segments'
                ? 'bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] text-white shadow-lg'
                : 'text-gray-400 hover:text-white'
              }`}
          >
            <FaUsers className="inline mr-2" />
            Segments
          </button>
          <button
            onClick={() => setActiveTab('rewards')}
            className={`py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${activeTab === 'rewards'
                ? 'bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] text-white shadow-lg'
                : 'text-gray-400 hover:text-white'
              }`}
          >
            <FaGift className="inline mr-2" />
            Rewards
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${activeTab === 'settings'
                ? 'bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] text-white shadow-lg'
                : 'text-gray-400 hover:text-white'
              }`}
          >
            <FaShieldAlt className="inline mr-2" />
            Security
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
          {/* Campaign Performance Summary */}
          <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl md:p-6 p-2">
            <h3 className="text-white text-xl font-bold mb-4">Campaign Scan Performance</h3>

            <div className="space-y-4">
              {campaigns.map((campaign, index) => (
                <motion.div
                  key={campaign.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex md:items-center md:flex-row flex-col gap-2 justify-between bg-[#1e2139] rounded-lg md:p-4 p-2 border border-[#286db24c]"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#2a2d4a] rounded-lg flex items-center justify-center">
                      <FaBullhorn className="text-blue-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-white font-semibold">{campaign.name}</span>
                        <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${getStatusColor(campaign.status)}`}>
                          {React.createElement(campaign.status === 'active' ? FaPlayCircle : FaPauseCircle, { className: "text-xs" })}
                          {campaign.status}
                        </div>
                      </div>
                      <p className="text-gray-400 text-sm">
                        {campaign.validScans.toLocaleString()} valid scans • {campaign.rewardsDistributed.toLocaleString()} FNKT distributed
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-2">
                      <FaBarcode className="text-green-400 text-sm" />
                      <span className="text-green-400 font-semibold">{campaign.totalScans.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaCoins className="text-purple-400 text-sm" />
                      <span className="text-purple-400 text-sm">{formatCurrency(campaign.rewardsDistributed)}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Scan Funnel Visualization */}
          <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl md:p-6 p-4">
            <h3 className="text-white text-xl font-bold mb-4">Scan Engagement Funnel</h3>
            <p className="text-gray-400 text-sm mb-6">Understanding fan engagement quality across all campaigns</p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {campaigns.slice(0, 2).map((campaign, index) => (
                <div key={campaign.id} className="space-y-4">
                  <h4 className="text-white font-semibold">{campaign.name}</h4>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between md:p-3 p-2 bg-[#1e2139] rounded-lg">
                      <div className="flex items-center gap-3">
                        <FaBarcode className="text-blue-400" />
                        <span className="text-white">Total Scans</span>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-bold">{campaign.scanFunnel.totalScans.toLocaleString()}</div>
                        <div className="text-gray-400 text-xs">100%</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between md:p-3 p-2 bg-[#1e2139] rounded-lg">
                      <div className="flex items-center gap-3">
                        <FaCheckCircle className="text-green-400" />
                        <span className="text-white">Valid Scans</span>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-bold">{campaign.scanFunnel.validScans.toLocaleString()}</div>
                        <div className="text-green-400 text-xs">
                          {calculateScanFunnelPercentage(campaign.scanFunnel.validScans, campaign.scanFunnel.totalScans)}%
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between md:p-3 p-2 bg-[#1e2139] rounded-lg">
                      <div className="flex items-center gap-3">
                        <FaShoppingCart className="text-yellow-400" />
                        <span className="text-white">Completed Actions</span>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-bold">{campaign.scanFunnel.completedActions.toLocaleString()}</div>
                        <div className="text-yellow-400 text-xs">
                          {calculateScanFunnelPercentage(campaign.scanFunnel.completedActions, campaign.scanFunnel.totalScans)}%
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between md:p-3 p-2 bg-[#1e2139] rounded-lg">
                      <div className="flex items-center gap-3">
                        <FaGift className="text-purple-400" />
                        <span className="text-white">Rewards Issued</span>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-bold">{campaign.scanFunnel.rewardsIssued.toLocaleString()}</div>
                        <div className="text-purple-400 text-xs">
                          {calculateScanFunnelPercentage(campaign.scanFunnel.rewardsIssued, campaign.scanFunnel.totalScans)}%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
          {/* Campaign Scan Details */}
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
                    <p className="text-gray-400 text-sm">
                      {formatDate(campaign.startDate)} - {formatDate(campaign.endDate)}
                    </p>
                  </div>
                  <div className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm ${getStatusColor(campaign.status)}`}>
                    {React.createElement(getStatusIcon(campaign.status), { className: "text-sm" })}
                    {campaign.status}
                  </div>
                </div>

                {/* Scan Metrics Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400 mb-1">{campaign.totalScans.toLocaleString()}</div>
                    <p className="text-gray-400 text-sm">Total Scans</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400 mb-1">{campaign.validScans.toLocaleString()}</div>
                    <p className="text-gray-400 text-sm">Valid Scans</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400 mb-1">{campaign.uniqueScans.toLocaleString()}</div>
                    <p className="text-gray-400 text-sm">Unique Users</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-400 mb-1">{formatCurrency(campaign.rewardsDistributed)}</div>
                    <p className="text-gray-400 text-sm">FNKT Distributed</p>
                  </div>
                </div>

                {/* Segment Breakdown */}
                <div className="mb-6">
                  <h4 className="text-white font-semibold mb-3">Scan Distribution by Segment</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {Object.entries(campaign.segmentBreakdown).map(([segment, data]) => {
                      const Icon = getSegmentIcon(segment);
                      return (
                        <div key={segment} className="bg-[#1e2139] rounded-lg p-4">
                          <div className="flex items-center gap-3 mb-2">
                            <Icon className="text-blue-400" />
                            <span className="text-white capitalize">{segment}</span>
                          </div>
                          <div className="text-2xl font-bold text-white mb-1">{data.scans.toLocaleString()}</div>
                          <div className="text-gray-400 text-sm">{data.percentage}% of total scans</div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Action Breakdown */}
                <div className="mb-6">
                  <h4 className="text-white font-semibold mb-3">Scan Actions Breakdown</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {Object.entries(campaign.actionBreakdown).map(([action, data]) => (
                      <div key={action} className="bg-[#1e2139] rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <FaBarcode className="text-green-400" />
                          <span className="text-white capitalize">{action}</span>
                        </div>
                        <div className="text-2xl font-bold text-white mb-1">{data.scans.toLocaleString()}</div>
                        <div className="text-gray-400 text-sm">{data.percentage}% of total scans</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Status Indicators */}
                {campaign.thresholdReached && (
                  <div className="bg-yellow-600/20 border border-yellow-400/30 rounded-lg p-4 mb-4">
                    <div className="flex items-center gap-3">
                      <FaExclamationTriangle className="text-yellow-400" />
                      <div>
                        <p className="text-yellow-400 font-semibold">Scan Threshold Reached</p>
                        <p className="text-yellow-400 text-sm">Campaign may be paused to prevent overspending</p>
                      </div>
                    </div>
                  </div>
                )}

                {campaign.remainingBudget < 50000 && (
                  <div className="bg-red-600/20 border border-red-400/30 rounded-lg p-4 mb-4">
                    <div className="flex items-center gap-3">
                      <FaTimesCircle className="text-red-400" />
                      <div>
                        <p className="text-red-400 font-semibold">Low Budget Warning</p>
                        <p className="text-red-400 text-sm">Only {formatCurrency(campaign.remainingBudget)} remaining</p>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Trends Tab */}
      {activeTab === 'trends' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl md:p-6 p-2">
            <h3 className="text-white text-xl font-bold mb-4">Scan Trends & Analytics</h3>
            <p className="text-gray-400 text-sm mb-6">Monitor scan performance over time and across campaigns</p>

            {/* Time Range Selector */}
            <div className="flex gap-4 mb-6">
              {['7d', '30d', '90d', '1y'].map((range) => (
                <button
                  key={range}
                  onClick={() => setSelectedTimeframe(range)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${selectedTimeframe === range
                      ? 'bg-[#f64c68] text-white'
                      : 'bg-[#1e2139] text-gray-400 hover:text-white'
                    }`}
                >
                  {range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : range === '90d' ? '90 Days' : '1 Year'}
                </button>
              ))}
            </div>

            {/* Scan Trend Chart */}
            <div className="bg-[#1e2139] rounded-lg md:p-6 p-4 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-white font-semibold">Scan Trends Over Time</h4>
                <div className="flex gap-4">
                  {scanTrends.campaigns.map((campaign, index) => (
                    <div key={campaign} className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${index === 0 ? 'bg-blue-400' : index === 1 ? 'bg-green-400' : 'bg-purple-400'
                        }`}></div>
                      <span className="text-gray-400 text-sm">{campaign}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <svg width="100%" height="300" viewBox="0 0 600 300" className="overflow-visible">
                  {/* Grid lines */}
                  <defs>
                    <pattern id="grid" width="60" height="30" patternUnits="userSpaceOnUse">
                      <path d="M 60 0 L 0 0 0 30" fill="none" stroke="#374151" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />

                  {/* Y-axis labels */}
                  {[0, 5000, 10000, 15000, 20000, 25000].map((value, index) => (
                    <g key={index}>
                      <text x="20" y={250 - (index * 40)} className="text-gray-500 text-xs fill-current">
                        {value.toLocaleString()}
                      </text>
                      <line x1="40" y1={250 - (index * 40)} x2="580" y2={250 - (index * 40)}
                        stroke="#374151" strokeWidth="0.5" />
                    </g>
                  ))}

                  {/* Chart lines */}
                  {scanTrends.campaigns.map((campaign, campaignIndex) => {
                    const points = scanTrends.data.map((value, index) => {
                      const x = 60 + (index * 80);
                      const y = 250 - (value * 250 / 25000);
                      return `${x},${y}`;
                    }).join(' ');

                    return (
                      <g key={campaign}>
                        <polyline
                          points={points}
                          fill="none"
                          stroke={campaignIndex === 0 ? '#3b82f6' : campaignIndex === 1 ? '#10b981' : '#8b5cf6'}
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        {/* Data points */}
                        {scanTrends.data.map((value, index) => {
                          const x = 60 + (index * 80);
                          const y = 250 - (value * 250 / 25000);
                          return (
                            <circle
                              key={index}
                              cx={x}
                              cy={y}
                              r="4"
                              fill={campaignIndex === 0 ? '#3b82f6' : campaignIndex === 1 ? '#10b981' : '#8b5cf6'}
                              className="hover:r-6 transition-all duration-200"
                            />
                          );
                        })}
                      </g>
                    );
                  })}

                  {/* X-axis labels */}
                  {scanTrends.labels.map((label, index) => (
                    <text key={index} x={60 + (index * 80)} y="280" className="text-gray-400 text-xs fill-current text-center">
                      {label}
                    </text>
                  ))}
                </svg>

                {/* Tooltip */}
                <div className="absolute top-4 right-4 bg-[#2a2d4a] rounded-lg p-3 border border-[#286db24c]">
                  <div className="text-white text-sm font-semibold mb-2">Scan Performance</div>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span className="text-gray-300">Barcelona FC: </span>
                      <span className="text-blue-400 font-semibold">+12.5%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-gray-300">Global Football: </span>
                      <span className="text-green-400 font-semibold">+8.3%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      <span className="text-gray-300">Youth Program: </span>
                      <span className="text-purple-400 font-semibold">+15.7%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chart Summary */}
              <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-[#286db24c]">
                <div className="text-center">
                  <div className="text-green-400 text-lg font-bold">+12.2%</div>
                  <div className="text-gray-400 text-sm">Overall Growth</div>
                </div>
                <div className="text-center">
                  <div className="text-blue-400 text-lg font-bold">23,400</div>
                  <div className="text-gray-400 text-sm">Peak Month</div>
                </div>
                <div className="text-center">
                  <div className="text-purple-400 text-lg font-bold">18,950</div>
                  <div className="text-gray-400 text-sm">Avg Monthly</div>
                </div>
              </div>
            </div>

            {/* Campaign Comparison */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-[#1e2139] rounded-lg md:p-6 p-4">
                <h4 className="text-white font-semibold mb-4">Campaign Performance Comparison</h4>
                <div className="space-y-4">
                  {campaigns.map((campaign, index) => (
                    <div key={campaign.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${index === 0 ? 'bg-blue-400' : index === 1 ? 'bg-green-400' : 'bg-purple-400'
                          }`}></div>
                        <span className="text-white text-sm">{campaign.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-semibold">{campaign.validScans.toLocaleString()}</div>
                        <div className="text-gray-400 text-xs">valid scans</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#1e2139] rounded-lg md:p-6 p-4">
                <h4 className="text-white font-semibold mb-4">Daily Scan Activity</h4>
                <div className="space-y-3">
                  {campaigns[0]?.dailyScans.slice(-7).map((day, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">{formatDate(day.date)}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-blue-400 h-2 rounded-full"
                            style={{ width: `${(day.scans / 700) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-white text-sm font-semibold w-12 text-right">{day.scans}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Segments Tab */}
      {activeTab === 'segments' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl md:p-6 p-2">
            <h3 className="text-white text-xl font-bold mb-4">Segment Performance Analysis</h3>
            <p className="text-gray-400 text-sm mb-6">Understand which fan segments are most engaged with your campaigns</p>

            {/* Segment Filter */}
            <div className="flex flex-wrap gap-4 mb-6">
              {['all', 'fans', 'clubs', 'athletes', 'youth', 'parents'].map((segment) => (
                <button
                  key={segment}
                  onClick={() => setSelectedSegment(segment)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 capitalize ${selectedSegment === segment
                      ? 'bg-[#f64c68] text-white'
                      : 'bg-[#1e2139] text-gray-400 hover:text-white'
                    }`}
                >
                  {segment === 'all' ? 'All Segments' : segment}
                </button>
              ))}
            </div>

            {/* Segment Performance Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {['fans', 'clubs', 'athletes', 'youth', 'parents'].map((segment) => {
                const Icon = getSegmentIcon(segment);
                const totalScans = campaigns.reduce((acc, camp) => {
                  return acc + (camp.segmentBreakdown[segment]?.scans || 0);
                }, 0);
                const avgEngagement = totalScans > 0 ? (totalScans / campaigns.length).toFixed(0) : 0;

                return (
                  <div key={segment} className="bg-[#1e2139] rounded-lg p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <Icon className="text-blue-400 text-2xl" />
                      <div>
                        <h4 className="text-white font-semibold capitalize">{segment}</h4>
                        <p className="text-gray-400 text-sm">Target Segment</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-400">Total Scans</span>
                          <span className="text-white font-semibold">{totalScans.toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-blue-400 h-2 rounded-full"
                            style={{ width: `${Math.min((totalScans / 20000) * 100, 100)}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Avg per Campaign</span>
                        <span className="text-green-400 font-semibold">{avgEngagement}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}

      {/* Rewards Tab */}
      {activeTab === 'rewards' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl md:p-6 p-2">
            <h3 className="text-white text-xl font-bold mb-4">Scan-Triggered Rewards</h3>
            <p className="text-gray-400 text-sm mb-6">Monitor FNKT distribution and cost per scan across campaigns</p>

            {/* Rewards Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">{sponsorData.totalRewardsDistributed.toLocaleString()}</div>
                <p className="text-gray-400">Total FNKT Distributed</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">{sponsorData.avgCostPerScan}</div>
                <p className="text-gray-400">Average Cost per Scan</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">{sponsorData.scanConversionRate}%</div>
                <p className="text-gray-400">Reward Conversion Rate</p>
              </div>
            </div>

            {/* Campaign Rewards Breakdown */}
            <div className="space-y-4">
              {campaigns.map((campaign, index) => (
                <motion.div
                  key={campaign.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-[#1e2139] rounded-lg md:p-6 p-2"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-white font-semibold">{campaign.name}</h4>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-green-400 font-bold">{formatCurrency(campaign.rewardsDistributed)}</div>
                        <div className="text-gray-400 text-sm">distributed</div>
                      </div>
                      <div className="text-right">
                        <div className="text-blue-400 font-bold">{formatCurrency(campaign.remainingBudget)}</div>
                        <div className="text-gray-400 text-sm">remaining</div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-gray-400 text-sm">Cost per Scan</p>
                      <p className="text-white font-semibold">
                        {(campaign.rewardsDistributed / campaign.validScans).toFixed(1)} FNKT
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Reward Rate</p>
                      <p className="text-white font-semibold">
                        {((campaign.rewardsDistributed / campaign.validScans) * 100).toFixed(0)}%
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Budget Utilized</p>
                      <p className="text-orange-400 font-semibold">
                        {Math.round((campaign.rewardsDistributed / (campaign.rewardsDistributed + campaign.remainingBudget)) * 100)}%
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">ROI Estimate</p>
                      <p className="text-purple-400 font-semibold">2.4x</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Security Tab */}
      {activeTab === 'settings' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl md:p-6 p-2">
            <h3 className="text-white text-xl font-bold mb-4">Scan Security & Validation</h3>
            <p className="text-gray-400 text-sm mb-6">Understanding how scan verification and fraud prevention works</p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="bg-[#1e2139] rounded-lg md:p-6 p-4">
                  <div className="flex items-center gap-3 mb-4">
                    <FaShieldAlt className="text-green-400 text-2xl" />
                    <h4 className="text-white font-semibold">Scan Verification Process</h4>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-gray-300">NFC UID validation against registered devices</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-gray-300">Geographic and temporal validation</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-gray-300">Duplicate scan detection and filtering</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-gray-300">User account verification</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#1e2139] rounded-lg md:p-6 p-4">
                  <div className="flex items-center gap-3 mb-4">
                    <FaExclamationTriangle className="text-yellow-400 text-2xl" />
                    <h4 className="text-white font-semibold">Fraud Prevention Measures</h4>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <span className="text-gray-300">Real-time anomaly detection</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <span className="text-gray-300">Pattern analysis and behavioral monitoring</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <span className="text-gray-300">Automated scan throttling</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <span className="text-gray-400 text-xs">Implementation details not exposed to sponsors</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-[#1e2139] rounded-lg md:p-6 p-4">
                  <div className="flex items-center gap-3 mb-4">
                    <FaTimesCircle className="text-red-400 text-2xl" />
                    <h4 className="text-white font-semibold">What Sponsors Cannot Access</h4>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      <span className="text-gray-300">Individual NFC UIDs or raw scan data</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      <span className="text-gray-300">Personal user information or identities</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      <span className="text-gray-300">Direct NFC scanning capabilities</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      <span className="text-gray-300">Manual reward trigger controls</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      <span className="text-gray-300">Fraud detection algorithm details</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#1e2139] rounded-lg md:p-6 p-4">
                  <div className="flex items-center gap-3 mb-4">
                    <FaCheckCircle className="text-blue-400 text-2xl" />
                    <h4 className="text-white font-semibold">Data Privacy & Security</h4>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span className="text-gray-300">GDPR compliant data handling</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span className="text-gray-300">End-to-end encrypted communications</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span className="text-gray-300">Regular security audits and penetration testing</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span className="text-gray-300">ISO 27001 certified infrastructure</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default SponsorScan;


