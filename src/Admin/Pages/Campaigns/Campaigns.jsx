import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FaTrophy,
  FaUsers,
  FaCoins,
  FaChartLine,
  FaCalendarAlt,
  FaEye,
  FaEdit,
  FaTrash,
  FaCheck,
  FaTimes,
  FaSearch,
  FaFilter,
  FaDownload,
  FaStar,
  FaMoneyBillWave,
  FaPercentage,
  FaVoteYea,
  FaInfoCircle,
  FaExclamationTriangle,
  FaShieldAlt,
  FaChartBar,
  FaPlus,
  FaBell,
  FaFlag,
  FaCog
} from 'react-icons/fa';

function Campaigns() {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [showRevenueModal, setShowRevenueModal] = useState(false);
  const [revenueSplit, setRevenueSplit] = useState({
    proShare: 50,
    fanShare: 25,
    marketingShare: 15,
    fanektShare: 10,
    reason: ''
  });

  // Mock data for all campaigns across the platform
  const [allCampaigns, setAllCampaigns] = useState([
    {
      id: 1,
      title: 'McDonald\'s PSG Promotion',
      sponsor: { id: 101, name: 'McDonald\'s Global', email: 'campaigns@mcdonalds.com' },
      type: 'targeted_promotion',
      status: 'active',
      targetType: 'fan_groups',
      targetEntities: ['Paris Saint-Germain'],
      budget: 5000,
      spent: 3200,
      clicks: 3200,
      redemptions: 2150,
      totalVotes: 15420,
      createdDate: '2024-01-15',
      endDate: '2024-01-30',
      proApprovals: { pending: 0, approved: 1, rejected: 0 },
      adminStatus: 'approved',
      revenue: 8750,
      issues: 0,
      flagged: false
    },
    {
      id: 2,
      title: 'Coca-Cola Paris Direct Message',
      sponsor: { id: 102, name: 'Coca-Cola Europe', email: 'marketing@coca-cola.eu' },
      type: 'direct_message',
      status: 'active',
      targetType: 'location_based',
      targetLocation: 'Paris, France',
      budget: 2500,
      spent: 1250,
      messagesSent: 2500,
      messagesOpened: 1800,
      totalVotes: 0,
      createdDate: '2024-01-14',
      endDate: '2024-01-28',
      proApprovals: { pending: 0, approved: 1, rejected: 0 },
      adminStatus: 'approved',
      revenue: 0,
      issues: 0,
      flagged: false
    },
    {
      id: 3,
      title: 'Nike Messi Fan Campaign',
      sponsor: { id: 103, name: 'Nike Football', email: 'football@nike.com' },
      type: 'targeted_promotion',
      status: 'completed',
      targetType: 'fan_groups',
      targetEntities: ['Lionel Messi'],
      budget: 10000,
      spent: 10000,
      clicks: 4000,
      redemptions: 3200,
      totalVotes: 0,
      createdDate: '2024-01-10',
      endDate: '2024-01-25',
      proApprovals: { pending: 0, approved: 1, rejected: 0 },
      adminStatus: 'approved',
      revenue: 31200,
      issues: 0,
      flagged: false
    },
    {
      id: 4,
      title: 'Real Madrid Fan Appreciation',
      sponsor: { id: 104, name: 'Adidas Global', email: 'football@adidas.com' },
      type: 'targeted_promotion',
      status: 'active',
      targetType: 'fan_groups',
      targetEntities: ['Real Madrid', 'Cristiano Ronaldo', 'Vinicius Jr'],
      budget: 15000,
      spent: 8750,
      clicks: 8750,
      redemptions: 6230,
      totalVotes: 15420,
      createdDate: '2024-01-20',
      endDate: '2024-01-30',
      proApprovals: { pending: 0, approved: 1, rejected: 0 },
      adminStatus: 'approved',
      revenue: 15420,
      issues: 0,
      flagged: false
    },
    {
      id: 5,
      title: 'Controversial Brand Promotion',
      sponsor: { id: 105, name: 'Controversial Corp', email: 'promo@controversial.com' },
      type: 'direct_message',
      status: 'pending_admin',
      targetType: 'fan_groups',
      targetEntities: ['Multiple Athletes'],
      budget: 20000,
      spent: 0,
      messagesSent: 0,
      messagesOpened: 0,
      totalVotes: 0,
      createdDate: '2024-01-22',
      endDate: '2024-02-05',
      proApprovals: { pending: 2, approved: 3, rejected: 1 },
      adminStatus: 'pending',
      revenue: 0,
      issues: 5,
      flagged: true,
      flagReason: 'Multiple PRO rejections, potential brand controversy'
    },
    {
      id: 6,
      title: 'Barcelona Youth Program',
      sponsor: { id: 106, name: 'Nike Foundation', email: 'foundation@nike.com' },
      type: 'targeted_promotion',
      status: 'active',
      targetType: 'fan_groups',
      targetEntities: ['Barcelona FC', 'Pedri', 'Gavi'],
      budget: 8000,
      spent: 6230,
      clicks: 6230,
      redemptions: 4360,
      totalVotes: 8920,
      createdDate: '2024-01-18',
      endDate: '2024-01-28',
      proApprovals: { pending: 0, approved: 1, rejected: 0 },
      adminStatus: 'approved',
      revenue: 8920,
      issues: 0,
      flagged: false
    },
    {
      id: 7,
      title: 'Olympic Dreams 2024',
      sponsor: { id: 107, name: 'Puma Sports', email: 'olympics@puma.com' },
      type: 'targeted_promotion',
      status: 'ended',
      targetType: 'fan_groups',
      targetEntities: ['Simone Biles', 'Michael Phelps', 'Usain Bolt'],
      budget: 12000,
      spent: 9820,
      clicks: 9820,
      redemptions: 6870,
      totalVotes: 18750,
      createdDate: '2024-01-10',
      endDate: '2024-01-20',
      proApprovals: { pending: 0, approved: 1, rejected: 0 },
      adminStatus: 'approved',
      revenue: 18750,
      issues: 0,
      flagged: false
    }
  ]);

  // Platform-wide campaign statistics
  const platformStats = {
    totalCampaigns: allCampaigns.length,
    activeCampaigns: allCampaigns.filter(c => c.status === 'active').length,
    pendingApprovals: allCampaigns.filter(c => c.adminStatus === 'pending').length,
    totalRevenue: allCampaigns.reduce((sum, c) => sum + c.revenue, 0),
    totalSpent: allCampaigns.reduce((sum, c) => sum + c.spent, 0),
    totalClicks: allCampaigns.reduce((sum, c) => sum + (c.clicks || 0), 0),
    totalMessages: allCampaigns.reduce((sum, c) => sum + (c.messagesSent || 0), 0),
    flaggedCampaigns: allCampaigns.filter(c => c.flagged).length,
    issuesCount: allCampaigns.reduce((sum, c) => sum + c.issues, 0)
  };

  const handleCampaignAction = (campaignId, action) => {
    const campaign = allCampaigns.find(c => c.id === campaignId);
    if (!campaign) return;

    switch (action) {
      case 'view':
        setSelectedCampaign(campaign);
        setShowCampaignModal(true);
        break;
      case 'approve':
        setSelectedCampaign(campaign);
        setShowApprovalModal(true);
        break;
      case 'reject':
        setSelectedCampaign(campaign);
        setShowApprovalModal(true);
        break;
      case 'delete':
        setSelectedCampaign(campaign);
        setShowDeleteModal(true);
        break;
      case 'change_revenue_split':
        setSelectedCampaign(campaign);
        setRevenueSplit({
          proShare: campaign.revenueSplit?.proShare || 50,
          fanShare: campaign.revenueSplit?.fanShare || 25,
          marketingShare: campaign.revenueSplit?.marketingShare || 15,
          fanektShare: campaign.revenueSplit?.fanektShare || 10,
          reason: ''
        });
        setShowRevenueModal(true);
        break;
      default:
        console.log(`Campaign ${campaignId}: ${action}`);
    }
  };

  const handleApproveCampaign = () => {
    setAllCampaigns(prevCampaigns =>
      prevCampaigns.map(campaign =>
        campaign.id === selectedCampaign.id
          ? { ...campaign, adminStatus: 'approved', status: 'active' }
          : campaign
      )
    );
    setShowApprovalModal(false);
    setSelectedCampaign(null);
  };

  const handleRejectCampaign = () => {
    setAllCampaigns(prevCampaigns =>
      prevCampaigns.map(campaign =>
        campaign.id === selectedCampaign.id
          ? { ...campaign, adminStatus: 'rejected', status: 'cancelled' }
          : campaign
      )
    );
    setShowApprovalModal(false);
    setSelectedCampaign(null);
  };

  const handleDeleteCampaign = () => {
    setAllCampaigns(prevCampaigns =>
      prevCampaigns.filter(campaign => campaign.id !== selectedCampaign.id)
    );
    setShowDeleteModal(false);
    setSelectedCampaign(null);
  };

  const handleChangeRevenueSplit = () => {
    const total = revenueSplit.proShare + revenueSplit.fanShare + revenueSplit.marketingShare + revenueSplit.fanektShare;

    if (total !== 100) {
      alert('Revenue split percentages must total 100%');
      return;
    }

    if (!revenueSplit.reason.trim()) {
      alert('Please provide a reason for the revenue split change');
      return;
    }

    // Create audit log entry
    const auditEntry = {
      id: Date.now(),
      campaignId: selectedCampaign.id,
      campaignTitle: selectedCampaign.title,
      oldSplit: selectedCampaign.revenueSplit || { proShare: 50, fanShare: 25, marketingShare: 15, fanektShare: 10 },
      newSplit: revenueSplit,
      reason: revenueSplit.reason,
      adminId: 'admin', // In real app, this would be current admin ID
      timestamp: new Date().toISOString(),
      type: 'revenue_split_change'
    };

    // Update campaign revenue split
    setAllCampaigns(prevCampaigns =>
      prevCampaigns.map(campaign =>
        campaign.id === selectedCampaign.id
          ? { ...campaign, revenueSplit: { ...revenueSplit } }
          : campaign
      )
    );

    // In real app, save audit entry to database
    console.log('Revenue split change audit:', auditEntry);

    setShowRevenueModal(false);
    setSelectedCampaign(null);
    setRevenueSplit({
      proShare: 50,
      fanShare: 25,
      marketingShare: 15,
      fanektShare: 10,
      reason: ''
    });
  };

  const filteredCampaigns = allCampaigns.filter(campaign => {
    const matchesSearch = campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         campaign.sponsor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (campaign.targetEntities && campaign.targetEntities.some(entity => entity.toLowerCase().includes(searchQuery.toLowerCase())));
    const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter || campaign.adminStatus === statusFilter;
    const matchesType = typeFilter === 'all' || campaign.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status, adminStatus) => {
    if (adminStatus === 'pending') return 'text-yellow-400 bg-yellow-400/10';
    if (adminStatus === 'rejected') return 'text-red-400 bg-red-400/10';

    switch (status) {
      case 'active': return 'text-green-400 bg-green-400/10';
      case 'completed': return 'text-blue-400 bg-blue-400/10';
      case 'ended': return 'text-gray-400 bg-gray-400/10';
      case 'draft': return 'text-purple-400 bg-purple-400/10';
      case 'cancelled': return 'text-red-400 bg-red-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getStatusIcon = (status, adminStatus) => {
    if (adminStatus === 'pending') return <FaBell className="text-yellow-400" />;
    if (adminStatus === 'rejected') return <FaTimes className="text-red-400" />;

    switch (status) {
      case 'active': return <FaCheck className="text-green-400" />;
      case 'completed': return <FaTrophy className="text-blue-400" />;
      case 'ended': return <FaCalendarAlt className="text-gray-400" />;
      case 'draft': return <FaEdit className="text-purple-400" />;
      case 'cancelled': return <FaTrash className="text-red-400" />;
      default: return <FaInfoCircle className="text-gray-400" />;
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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
              Campaign Management
            </h1>
            <p className="text-gray-400 text-lg">
              Platform-wide campaign oversight and administration
            </p>
          </div>
          <div className="flex gap-3">
            <button className="bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2">
              <FaDownload />
              Export Report
            </button>
            <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2">
              <FaCog />
              Settings
            </button>
          </div>
        </div>
      </motion.div>

      {/* Platform Statistics Overview */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-r from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl p-6 mb-8"
      >
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <FaTrophy className="text-[#f64c68] text-2xl mr-2" />
              <span className="text-white text-xl font-bold">{platformStats.totalCampaigns}</span>
            </div>
            <p className="text-gray-400 text-sm">Total Campaigns</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <FaCheck className="text-green-400 text-2xl mr-2" />
              <span className="text-white text-xl font-bold">{platformStats.activeCampaigns}</span>
            </div>
            <p className="text-gray-400 text-sm">Active</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <FaBell className="text-yellow-400 text-2xl mr-2" />
              <span className="text-white text-xl font-bold">{platformStats.pendingApprovals}</span>
            </div>
            <p className="text-gray-400 text-sm">Pending Approval</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <FaCoins className="text-yellow-400 text-2xl mr-2" />
              <span className="text-white text-xl font-bold">{platformStats.totalRevenue.toLocaleString()}</span>
            </div>
            <p className="text-gray-400 text-sm">Total Revenue</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <FaVoteYea className="text-blue-400 text-2xl mr-2" />
              <span className="text-white text-xl font-bold">{platformStats.totalClicks.toLocaleString()}</span>
            </div>
            <p className="text-gray-400 text-sm">Total Clicks</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <FaFlag className="text-red-400 text-2xl mr-2" />
              <span className="text-white text-xl font-bold">{platformStats.flaggedCampaigns}</span>
            </div>
            <p className="text-gray-400 text-sm">Flagged</p>
          </div>
        </div>
      </motion.div>

      {/* Navigation Tabs */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-6"
      >
        <div className="flex space-x-1 bg-[#1e2139] p-1 rounded-xl border border-[#286db24c]">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
              activeTab === 'overview'
                ? 'bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] text-white shadow-lg'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('campaigns')}
            className={`py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
              activeTab === 'campaigns'
                ? 'bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] text-white shadow-lg'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            All Campaigns
          </button>
          <button
            onClick={() => setActiveTab('approvals')}
            className={`py-3 px-6 rounded-lg font-semibold transition-all duration-300 relative ${
              activeTab === 'approvals'
                ? 'bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] text-white shadow-lg'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Pending Approvals
            {platformStats.pendingApprovals > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {platformStats.pendingApprovals}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
              activeTab === 'analytics'
                ? 'bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] text-white shadow-lg'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Analytics
          </button>
          <button
            onClick={() => setActiveTab('moderation')}
            className={`py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
              activeTab === 'moderation'
                ? 'bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] text-white shadow-lg'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Moderation
          </button>
        </div>
      </motion.div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Recent Activity */}
          <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl p-6">
            <h3 className="text-white text-xl font-bold mb-6">Recent Campaign Activity</h3>
            <div className="space-y-4">
              {allCampaigns.slice(0, 5).map((campaign) => (
                <div key={campaign.id} className="flex items-center justify-between bg-[#1e2139] rounded-xl p-4 border border-[#286db24c]">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#286db24c] rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">{campaign.title.charAt(0)}</span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">{campaign.title}</h4>
                      <p className="text-gray-400 text-sm">{campaign.sponsor.name} • {campaign.status} • ${campaign.spent.toLocaleString()} spent</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`flex items-center gap-2 px-3 py-1 rounded-full ${getStatusColor(campaign.status, campaign.adminStatus)}`}>
                      {getStatusIcon(campaign.status, campaign.adminStatus)}
                      <span className="text-sm font-medium capitalize">{campaign.status}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl p-6">
              <h3 className="text-white text-xl font-bold mb-6">Revenue Distribution</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Total Platform Revenue</span>
                  <span className="text-white font-bold">{platformStats.totalRevenue.toLocaleString()} FNKT</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">PRO Account Share (50%)</span>
                  <span className="text-[#f64c68] font-bold">{(platformStats.totalRevenue * 0.5).toLocaleString()} FNKT</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Fan Rewards (25%)</span>
                  <span className="text-blue-400 font-bold">{(platformStats.totalRevenue * 0.25).toLocaleString()} FNKT</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">FANEKT Platform (35%)</span>
                  <span className="text-purple-400 font-bold">{(platformStats.totalRevenue * 0.35).toLocaleString()} FNKT</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl p-6">
              <h3 className="text-white text-xl font-bold mb-6">Campaign Health</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Active Campaigns</span>
                  <span className="text-green-400 font-bold">{platformStats.activeCampaigns}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Pending Approvals</span>
                  <span className="text-yellow-400 font-bold">{platformStats.pendingApprovals}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Flagged Campaigns</span>
                  <span className="text-red-400 font-bold">{platformStats.flaggedCampaigns}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Avg. Campaign Budget</span>
                  <span className="text-blue-400 font-bold">${(allCampaigns.reduce((sum, c) => sum + c.budget, 0) / allCampaigns.length).toFixed(0)}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {activeTab === 'campaigns' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Filters and Search */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search campaigns, sponsors, or entities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#1e2139] text-white pl-10 pr-4 py-3 rounded-lg border border-[#286db24c] focus:outline-none focus:border-[#f64c68]"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#1e2139] text-white px-4 py-3 rounded-lg border border-[#286db24c] focus:outline-none focus:border-[#f64c68]"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="ended">Ended</option>
              <option value="pending_admin">Pending Admin</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-[#1e2139] text-white px-4 py-3 rounded-lg border border-[#286db24c] focus:outline-none focus:border-[#f64c68]"
            >
              <option value="all">All Types</option>
              <option value="targeted_promotion">Targeted Promotion</option>
              <option value="direct_message">Direct Message</option>
            </select>
          </div>

          {/* Campaigns List */}
          {filteredCampaigns.length > 0 ? (
            <div className="space-y-4">
              {filteredCampaigns.map((campaign) => (
                <div key={campaign.id} className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-white text-xl font-bold">{campaign.title}</h3>
                        <span className={`flex items-center gap-2 px-3 py-1 rounded-full ${getStatusColor(campaign.status, campaign.adminStatus)}`}>
                          {getStatusIcon(campaign.status, campaign.adminStatus)}
                          <span className="text-sm font-medium capitalize">
                            {campaign.adminStatus === 'pending' ? 'Pending Admin' : campaign.status}
                          </span>
                        </span>
                        {campaign.flagged && (
                          <FaFlag className="text-red-400" title={campaign.flagReason} />
                        )}
                      </div>
                      <p className="text-gray-300 mb-3">{campaign.type === 'targeted_promotion' ? 'Targeted Promotion' : 'Direct Message'} by {campaign.sponsor.name}</p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                          <FaCalendarAlt className="text-purple-400" />
                          <span>{campaign.createdDate} - {campaign.endDate}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FaMoneyBillWave className="text-yellow-400" />
                          <span>${campaign.budget.toLocaleString()} budget</span>
                        </div>
                        {campaign.type === 'targeted_promotion' && (
                          <>
                            <div className="flex items-center gap-1">
                              <FaVoteYea className="text-blue-400" />
                              <span>{campaign.clicks?.toLocaleString() || 0} clicks</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <FaTrophy className="text-green-400" />
                              <span>{campaign.redemptions?.toLocaleString() || 0} redemptions</span>
                            </div>
                          </>
                        )}
                        {campaign.type === 'direct_message' && (
                          <>
                            <div className="flex items-center gap-1">
                              <FaUsers className="text-blue-400" />
                              <span>{campaign.messagesSent?.toLocaleString() || 0} sent</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <FaEye className="text-green-400" />
                              <span>{campaign.messagesOpened?.toLocaleString() || 0} opened</span>
                            </div>
                          </>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {campaign.targetEntities?.map((entity, idx) => (
                          <span key={idx} className="bg-[#286db24c] text-white text-sm px-3 py-1 rounded-full">
                            {entity}
                          </span>
                        ))}
                        {campaign.targetLocation && (
                          <span className="bg-blue-600/20 text-blue-400 text-sm px-3 py-1 rounded-full">
                            📍 {campaign.targetLocation}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="ml-6 flex flex-col gap-2">
                      <div className="text-right">
                        <div className="text-[#f64c68] font-bold text-lg">{campaign.revenue.toLocaleString()} FNKT</div>
                        <div className="text-gray-400 text-sm">Revenue</div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleCampaignAction(campaign.id, 'view')}
                          className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <FaEye className="text-sm" />
                        </button>
                        <button
                          onClick={() => handleCampaignAction(campaign.id, 'change_revenue_split')}
                          className="bg-yellow-600 hover:bg-yellow-700 text-white p-2 rounded-lg transition-colors"
                          title="Change Revenue Split"
                        >
                          <FaPercentage className="text-sm" />
                        </button>
                        {campaign.adminStatus === 'pending' && (
                          <>
                            <button
                              onClick={() => handleCampaignAction(campaign.id, 'approve')}
                              className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg transition-colors"
                              title="Approve"
                            >
                              <FaCheck className="text-sm" />
                            </button>
                            <button
                              onClick={() => handleCampaignAction(campaign.id, 'reject')}
                              className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-colors"
                              title="Reject"
                            >
                              <FaTimes className="text-sm" />
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => handleCampaignAction(campaign.id, 'delete')}
                          className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <FaTrash className="text-sm" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <FaSearch className="text-gray-400 text-8xl mx-auto mb-6" />
              <h3 className="text-white text-2xl font-bold mb-4">No campaigns found</h3>
              <p className="text-gray-400 text-lg">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </motion.div>
      )}

      {activeTab === 'approvals' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Pending Approvals Header */}
          <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <FaShieldAlt className="text-yellow-400 text-xl" />
              <div>
                <h3 className="text-white text-xl font-bold">Admin Campaign Approvals</h3>
                <p className="text-gray-400">Review campaigns that require administrative approval</p>
              </div>
            </div>
            <div className="bg-yellow-600/20 border border-yellow-400/30 rounded-lg p-4">
              <p className="text-yellow-300 text-sm">
                <strong>Admin Override:</strong> These campaigns may have been rejected by PRO accounts or flagged for other issues.
                Your approval overrides all previous decisions and activates the campaign immediately.
              </p>
            </div>
          </div>

          {/* Pending Campaigns */}
          {allCampaigns.filter(c => c.adminStatus === 'pending').length > 0 ? (
            <div className="space-y-4">
              {allCampaigns.filter(c => c.adminStatus === 'pending').map((campaign) => (
                <div key={campaign.id} className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-yellow-400/50 shadow-2xl p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-white text-xl font-bold">{campaign.title}</h3>
                        <span className="flex items-center gap-2 px-3 py-1 rounded-full text-yellow-400 bg-yellow-400/10">
                          <FaBell className="text-sm" />
                          <span className="text-sm font-medium">Pending Admin Approval</span>
                        </span>
                        {campaign.flagged && (
                          <FaFlag className="text-red-400" title={campaign.flagReason} />
                        )}
                      </div>
                      <p className="text-gray-300 mb-3">{campaign.type === 'targeted_promotion' ? 'Targeted Promotion' : 'Direct Message'} by {campaign.sponsor.name}</p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-3">
                        <div className="flex items-center gap-1">
                          <FaCalendarAlt className="text-purple-400" />
                          <span>{campaign.createdDate} - {campaign.endDate}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FaMoneyBillWave className="text-yellow-400" />
                          <span>${campaign.budget.toLocaleString()} budget</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {campaign.targetEntities?.map((entity, idx) => (
                          <span key={idx} className="bg-[#286db24c] text-white text-sm px-3 py-1 rounded-full">
                            {entity}
                          </span>
                        ))}
                      </div>
                      {campaign.flagReason && (
                        <div className="mt-4 bg-red-600/20 border border-red-400/30 rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <FaExclamationTriangle className="text-red-400 text-lg mt-1 flex-shrink-0" />
                            <div>
                              <p className="text-red-400 font-medium mb-1">Flagged for Review</p>
                              <p className="text-red-300 text-sm">{campaign.flagReason}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="ml-6 flex gap-3">
                      <button
                        onClick={() => handleCampaignAction(campaign.id, 'view')}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2"
                      >
                        <FaEye />
                        Review
                      </button>
                      <button
                        onClick={() => handleCampaignAction(campaign.id, 'approve')}
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2"
                      >
                        <FaCheck />
                        Approve
                      </button>
                      <button
                        onClick={() => handleCampaignAction(campaign.id, 'reject')}
                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2"
                      >
                        <FaTimes />
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <FaShieldAlt className="text-gray-400 text-8xl mx-auto mb-6" />
              <h3 className="text-white text-2xl font-bold mb-4">No campaigns pending approval</h3>
              <p className="text-gray-400 text-lg">All campaigns have been reviewed by administrators.</p>
            </div>
          )}
        </motion.div>
      )}

      {activeTab === 'analytics' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Analytics */}
            <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl p-6">
              <h3 className="text-white text-xl font-bold mb-6">Platform Revenue Analytics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-[#1e2139] rounded-lg">
                  <span className="text-gray-300">Total Platform Revenue</span>
                  <span className="text-[#f64c68] font-bold">{platformStats.totalRevenue.toLocaleString()} FNKT</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-[#1e2139] rounded-lg">
                  <span className="text-gray-300">Average per Campaign</span>
                  <span className="text-white font-bold">{(platformStats.totalRevenue / platformStats.totalCampaigns).toFixed(0)} FNKT</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-[#1e2139] rounded-lg">
                  <span className="text-gray-300">Highest Revenue Campaign</span>
                  <span className="text-green-400 font-bold">{Math.max(...allCampaigns.map(c => c.revenue)).toLocaleString()} FNKT</span>
                </div>
              </div>
            </div>

            {/* Campaign Type Analytics */}
            <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl p-6">
              <h3 className="text-white text-xl font-bold mb-6">Campaign Type Breakdown</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-[#1e2139] rounded-lg">
                  <span className="text-gray-300">Targeted Promotions</span>
                  <span className="text-blue-400 font-bold">{allCampaigns.filter(c => c.type === 'targeted_promotion').length}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-[#1e2139] rounded-lg">
                  <span className="text-gray-300">Direct Messages</span>
                  <span className="text-green-400 font-bold">{allCampaigns.filter(c => c.type === 'direct_message').length}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-[#1e2139] rounded-lg">
                  <span className="text-gray-300">Avg. Campaign Duration</span>
                  <span className="text-purple-400 font-bold">14 days</span>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Chart */}
          <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl p-6">
            <h3 className="text-white text-xl font-bold mb-6">Campaign Performance Trends</h3>
            <div className="space-y-4">
              {allCampaigns.slice(0, 5).map((campaign) => (
                <div key={campaign.id} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300 truncate">{campaign.title}</span>
                    <span className="text-white font-medium">{campaign.revenue.toLocaleString()} FNKT</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <div
                      className="bg-[#f64c68] h-3 rounded-full"
                      style={{ width: `${(campaign.revenue / Math.max(...allCampaigns.map(c => c.revenue))) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {activeTab === 'moderation' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Moderation Tools */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <FaFlag className="text-red-400 text-2xl" />
                <div>
                  <h3 className="text-white text-xl font-bold">Flagged Campaigns</h3>
                  <p className="text-gray-400 text-sm">Require immediate attention</p>
                </div>
              </div>
              <div className="text-3xl font-bold text-red-400 mb-2">{platformStats.flaggedCampaigns}</div>
              <p className="text-gray-400 text-sm">Campaigns flagged for review</p>
            </div>

            <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <FaExclamationTriangle className="text-yellow-400 text-2xl" />
                <div>
                  <h3 className="text-white text-xl font-bold">Open Issues</h3>
                  <p className="text-gray-400 text-sm">Reported problems</p>
                </div>
              </div>
              <div className="text-3xl font-bold text-yellow-400 mb-2">{platformStats.issuesCount}</div>
              <p className="text-gray-400 text-sm">Issues across all campaigns</p>
            </div>

            <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <FaShieldAlt className="text-green-400 text-2xl" />
                <div>
                  <h3 className="text-white text-xl font-bold">Approved Today</h3>
                  <p className="text-gray-400 text-sm">Recent admin actions</p>
                </div>
              </div>
              <div className="text-3xl font-bold text-green-400 mb-2">12</div>
              <p className="text-gray-400 text-sm">Campaigns approved</p>
            </div>
          </div>

          {/* Flagged Campaigns List */}
          {allCampaigns.filter(c => c.flagged).length > 0 && (
            <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-red-400/50 shadow-2xl p-6">
              <h3 className="text-white text-xl font-bold mb-6 flex items-center gap-3">
                <FaFlag className="text-red-400" />
                Flagged Campaigns
              </h3>
              <div className="space-y-4">
                {allCampaigns.filter(c => c.flagged).map((campaign) => (
                  <div key={campaign.id} className="flex items-center justify-between bg-[#1e2139] rounded-xl p-4 border border-red-400/30">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-red-600/20 rounded-full flex items-center justify-center">
                        <FaFlag className="text-red-400" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold">{campaign.title}</h4>
                        <p className="text-red-300 text-sm">{campaign.flagReason}</p>
                        <p className="text-gray-400 text-sm">by {campaign.sponsor.name} • {campaign.issues} issues reported</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleCampaignAction(campaign.id, 'view')}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300"
                      >
                        Review
                      </button>
                      <button
                        onClick={() => handleCampaignAction(campaign.id, 'approve')}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleCampaignAction(campaign.id, 'reject')}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* Campaign Details Modal */}
      {showCampaignModal && selectedCampaign && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-[#286db24c]">
              <div className="flex items-center justify-between">
                <h3 className="text-white text-xl font-bold">Campaign Details</h3>
                <button
                  onClick={() => setShowCampaignModal(false)}
                  className="text-gray-400 hover:text-white p-2"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-white font-bold mb-4">Campaign Information</h4>
                  <div className="space-y-3">
                    <div>
                      <span className="text-gray-400">Title:</span>
                      <span className="text-white ml-2">{selectedCampaign.title}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Sponsor:</span>
                      <span className="text-white ml-2">{selectedCampaign.sponsor.name}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Type:</span>
                      <span className="text-white ml-2">{selectedCampaign.type === 'targeted_promotion' ? 'Targeted Promotion' : 'Direct Message'}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Status:</span>
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs ${getStatusColor(selectedCampaign.status, selectedCampaign.adminStatus)}`}>
                        {selectedCampaign.adminStatus === 'pending' ? 'Pending Admin' : selectedCampaign.status}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400">Budget:</span>
                      <span className="text-white ml-2">${selectedCampaign.budget.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-4">Performance Metrics</h4>
                  <div className="space-y-3">
                    <div>
                      <span className="text-gray-400">Revenue Generated:</span>
                      <span className="text-[#f64c68] font-bold ml-2">{selectedCampaign.revenue.toLocaleString()} FNKT</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Amount Spent:</span>
                      <span className="text-white ml-2">${selectedCampaign.spent.toLocaleString()}</span>
                    </div>
                    {selectedCampaign.clicks && (
                      <div>
                        <span className="text-gray-400">Clicks:</span>
                        <span className="text-blue-400 ml-2">{selectedCampaign.clicks.toLocaleString()}</span>
                      </div>
                    )}
                    {selectedCampaign.redemptions && (
                      <div>
                        <span className="text-gray-400">Redemptions:</span>
                        <span className="text-green-400 ml-2">{selectedCampaign.redemptions.toLocaleString()}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Approval Modal */}
      {showApprovalModal && selectedCampaign && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl max-w-md w-full">
            <div className="p-6 border-b border-[#286db24c]">
              <div className="flex items-center gap-3">
                <FaShieldAlt className="text-yellow-400 text-xl" />
                <div>
                  <h3 className="text-white text-xl font-bold">
                    {selectedCampaign.adminStatus === 'pending' ? 'Approve Campaign' : 'Confirm Action'}
                  </h3>
                  <p className="text-gray-400 text-sm">Review campaign before proceeding</p>
                </div>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="bg-gray-800/50 rounded-lg p-4">
                <h4 className="text-white font-semibold mb-2">{selectedCampaign.title}</h4>
                <p className="text-gray-400 text-sm mb-2">by {selectedCampaign.sponsor.name}</p>
                <p className="text-gray-400 text-sm">Budget: ${selectedCampaign.budget.toLocaleString()}</p>
              </div>
              <div className="flex gap-4 pt-4">
                <button
                  onClick={handleApproveCampaign}
                  className="flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white"
                >
                  <FaCheck />
                  Approve
                </button>
                <button
                  onClick={handleRejectCampaign}
                  className="flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white"
                >
                  <FaTimes />
                  Reject
                </button>
                <button
                  onClick={() => {
                    setShowApprovalModal(false);
                    setSelectedCampaign(null);
                  }}
                  className="px-6 py-3 border border-gray-600 text-gray-400 rounded-lg hover:border-gray-500 hover:text-white transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && selectedCampaign && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl max-w-md w-full">
            <div className="p-6 border-b border-[#286db24c]">
              <div className="flex items-center gap-3">
                <FaTrash className="text-red-400 text-xl" />
                <div>
                  <h3 className="text-white text-xl font-bold">Delete Campaign</h3>
                  <p className="text-gray-400 text-sm">This action cannot be undone</p>
                </div>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="bg-gray-800/50 rounded-lg p-4">
                <h4 className="text-white font-semibold mb-2">{selectedCampaign.title}</h4>
                <p className="text-gray-400 text-sm mb-2">by {selectedCampaign.sponsor.name}</p>
                <p className="text-gray-400 text-sm">Revenue: {selectedCampaign.revenue.toLocaleString()} FNKT</p>
              </div>
              <div className="bg-red-600/20 border border-red-400/30 rounded-lg p-4">
                <p className="text-red-300 text-sm">
                  Deleting this campaign will permanently remove all associated data, revenue, and user interactions.
                </p>
              </div>
              <div className="flex gap-4 pt-4">
                <button
                  onClick={handleDeleteCampaign}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <FaTrash />
                  Delete Campaign
                </button>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-6 py-3 border border-gray-600 text-gray-400 rounded-lg hover:border-gray-500 hover:text-white transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Revenue Split Change Modal */}
      {showRevenueModal && selectedCampaign && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-[#286db24c]">
              <div className="flex items-center gap-3">
                <FaPercentage className="text-yellow-400 text-xl" />
                <div>
                  <h3 className="text-white text-xl font-bold">Change Revenue Split</h3>
                  <p className="text-gray-400 text-sm">Admin override for revenue distribution</p>
                </div>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="bg-gray-800/50 rounded-lg p-4">
                <h4 className="text-white font-semibold mb-2">{selectedCampaign.title}</h4>
                <p className="text-gray-400 text-sm mb-2">by {selectedCampaign.sponsor.name}</p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Total Revenue:</span>
                  <span className="text-[#f64c68] font-bold">{selectedCampaign.revenue.toLocaleString()} FNKT</span>
                </div>
              </div>

              {/* Current Split Display */}
              <div className="bg-blue-600/10 border border-blue-400/30 rounded-lg p-4">
                <h5 className="text-blue-400 font-semibold mb-3">Current Revenue Split</h5>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-300">PRO Accounts:</span>
                    <span className="text-white">{(selectedCampaign.revenueSplit?.proShare || 50)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Fans:</span>
                    <span className="text-white">{(selectedCampaign.revenueSplit?.fanShare || 25)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Marketing:</span>
                    <span className="text-white">{(selectedCampaign.revenueSplit?.marketingShare || 15)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">FANEKT:</span>
                    <span className="text-white">{(selectedCampaign.revenueSplit?.fanektShare || 10)}%</span>
                  </div>
                </div>
              </div>

              {/* New Split Inputs */}
              <div className="space-y-4">
                <h5 className="text-white font-semibold">New Revenue Split (%)</h5>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 text-sm mb-1">PRO Accounts</label>
                    <input
                      type="number"
                      value={revenueSplit.proShare}
                      onChange={(e) => setRevenueSplit({...revenueSplit, proShare: parseInt(e.target.value) || 0})}
                      className="w-full bg-[#1e2139] text-white px-3 py-2 rounded-lg border border-[#286db24c] focus:outline-none focus:border-[#f64c68] text-sm"
                      min="0"
                      max="100"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm mb-1">Fans</label>
                    <input
                      type="number"
                      value={revenueSplit.fanShare}
                      onChange={(e) => setRevenueSplit({...revenueSplit, fanShare: parseInt(e.target.value) || 0})}
                      className="w-full bg-[#1e2139] text-white px-3 py-2 rounded-lg border border-[#286db24c] focus:outline-none focus:border-[#f64c68] text-sm"
                      min="0"
                      max="100"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm mb-1">Marketing</label>
                    <input
                      type="number"
                      value={revenueSplit.marketingShare}
                      onChange={(e) => setRevenueSplit({...revenueSplit, marketingShare: parseInt(e.target.value) || 0})}
                      className="w-full bg-[#1e2139] text-white px-3 py-2 rounded-lg border border-[#286db24c] focus:outline-none focus:border-[#f64c68] text-sm"
                      min="0"
                      max="100"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm mb-1">FANEKT</label>
                    <input
                      type="number"
                      value={revenueSplit.fanektShare}
                      onChange={(e) => setRevenueSplit({...revenueSplit, fanektShare: parseInt(e.target.value) || 0})}
                      className="w-full bg-[#1e2139] text-white px-3 py-2 rounded-lg border border-[#286db24c] focus:outline-none focus:border-[#f64c68] text-sm"
                      min="0"
                      max="100"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Reason for Change</label>
                  <textarea
                    value={revenueSplit.reason}
                    onChange={(e) => setRevenueSplit({...revenueSplit, reason: e.target.value})}
                    rows={3}
                    className="w-full bg-[#1e2139] text-white px-4 py-3 rounded-lg border border-[#286db24c] focus:outline-none focus:border-[#f64c68] resize-none text-sm"
                    placeholder="Enter reason for revenue split adjustment..."
                  />
                </div>
              </div>

              {/* Total Validation */}
              {revenueSplit.proShare + revenueSplit.fanShare + revenueSplit.marketingShare + revenueSplit.fanektShare !== 100 && (
                <div className="bg-red-600/20 border border-red-400/30 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <FaExclamationTriangle className="text-red-400 text-lg mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-red-400 font-medium mb-1">Invalid Split</p>
                      <p className="text-red-300 text-sm">
                        Percentages must total 100%. Current total: {revenueSplit.proShare + revenueSplit.fanShare + revenueSplit.marketingShare + revenueSplit.fanektShare}%
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Preview */}
              {revenueSplit.proShare + revenueSplit.fanShare + revenueSplit.marketingShare + revenueSplit.fanektShare === 100 && (
                <div className="bg-green-600/20 border border-green-400/30 rounded-lg p-4">
                  <h5 className="text-green-400 font-semibold mb-3">Revenue Split Preview</h5>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-300">PRO Accounts:</span>
                      <span className="text-green-400 font-semibold">{revenueSplit.proShare}% ({(selectedCampaign.revenue * revenueSplit.proShare / 100).toLocaleString()} FNKT)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Fans:</span>
                      <span className="text-green-400 font-semibold">{revenueSplit.fanShare}% ({(selectedCampaign.revenue * revenueSplit.fanShare / 100).toLocaleString()} FNKT)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Marketing:</span>
                      <span className="text-green-400 font-semibold">{revenueSplit.marketingShare}% ({(selectedCampaign.revenue * revenueSplit.marketingShare / 100).toLocaleString()} FNKT)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">FANEKT:</span>
                      <span className="text-green-400 font-semibold">{revenueSplit.fanektShare}% ({(selectedCampaign.revenue * revenueSplit.fanektShare / 100).toLocaleString()} FNKT)</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-yellow-600/20 border border-yellow-400/30 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <FaExclamationTriangle className="text-yellow-400 text-lg mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-yellow-400 font-medium mb-1">Admin Action Warning</p>
                    <p className="text-yellow-300 text-sm">
                      This action will modify campaign revenue distribution and create an audit trail entry.
                      Changes affect PRO account payouts, fan rewards, and platform revenue calculations.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={handleChangeRevenueSplit}
                  disabled={revenueSplit.proShare + revenueSplit.fanShare + revenueSplit.marketingShare + revenueSplit.fanektShare !== 100}
                  className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                    revenueSplit.proShare + revenueSplit.fanShare + revenueSplit.marketingShare + revenueSplit.fanektShare === 100
                      ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <FaPercentage />
                  Update Split
                </button>
                <button
                  onClick={() => setShowRevenueModal(false)}
                  className="px-6 py-3 border border-gray-600 text-gray-400 rounded-lg hover:border-gray-500 hover:text-white transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Campaigns;