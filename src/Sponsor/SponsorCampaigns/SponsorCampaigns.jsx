import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FaPlus,
  FaTrophy,
  FaVoteYea,
  FaUsers,
  FaCoins,
  FaChartLine,
  FaCalendarAlt,
  FaEye,
  FaEdit,
  FaTrash,
  FaPlay,
  FaStop,
  FaInfoCircle,
  FaSearch,
  FaFilter,
  FaStar,
  FaMoneyBillWave,
  FaPercentage,
  FaChartBar,
  FaChevronDown
} from 'react-icons/fa';

function SponsorCampaigns() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [campaignForm, setCampaignForm] = useState({
    title: '',
    description: '',
    campaignType: 'targeted_promotion', // targeted_promotion, direct_message
    budget: '',
    pricingModel: 'per_click', // per_click, per_message, per_open
    pricingRate: '',
    targetType: 'fan_groups', // fan_groups, location_based
    targetEntities: [],
    targetLocation: '',
    promotionMessage: '',
    qrCodeRequired: true,
    redemptionType: 'unique_qr', // unique_qr, discount_code
    validityHours: 48,
    maxRedemptions: '',
    firstComeFirstServed: false
  });

  // Campaign types matching client's requirements
  const campaignTypes = [
    {
      id: 'targeted_promotion',
      name: 'Targeted Promotion Campaign',
      description: 'Target specific fan groups with promotions and QR codes',
      pricingModels: ['per_click'],
      example: '$1 per fan click on promotion = $5,000 for 5,000 clicks'
    },
    {
      id: 'direct_message',
      name: 'Direct Message Campaign',
      description: 'Send promotional messages to fans by location or interests',
      pricingModels: ['per_message', 'per_open'],
      example: '$0.50 per message sent to fans = $2,500 for 5,000 messages'
    }
  ];

  const pricingModels = {
    per_message: { name: 'Per Message Sent', unit: 'message', example: '$0.50 per message' },
    per_click: { name: 'Per Click', unit: 'click', example: '$2.00 per click' },
    per_open: { name: 'Per Message Open', unit: 'open', example: '$0.25 per open' },
    per_impression: { name: 'Per 1,000 Impressions', unit: '1K impressions', example: '$50 per 1,000 impressions' },
    per_sale: { name: 'Per Sale', unit: 'sale', example: '$10 per sale' },
    per_redemption: { name: 'Per Redemption', unit: 'redemption', example: '$1.00 per discount used' },
    fixed: { name: 'Fixed Budget', unit: 'campaign', example: '$5,000 flat fee' }
  };

  const [entitiesDropdownOpen, setEntitiesDropdownOpen] = useState(false);
  const [entitySearchQuery, setEntitySearchQuery] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Mock list of all available entities for targeting
  const availableEntities = [
    // Premier League Teams
    'Manchester United', 'Manchester City', 'Chelsea FC', 'Arsenal FC', 'Liverpool FC',
    'Tottenham Hotspur', 'Newcastle United', 'Brighton & Hove Albion', 'Aston Villa', 'Brentford FC',

    // La Liga Teams
    'Real Madrid', 'Barcelona FC', 'Atletico Madrid', 'Sevilla FC', 'Valencia CF',
    'Real Sociedad', 'Villarreal CF', 'Real Betis', 'Athletic Bilbao', 'Celta Vigo',

    // Serie A Teams
    'Juventus FC', 'AC Milan', 'Inter Milan', 'AS Roma', 'Napoli',
    'Lazio', 'Atalanta', 'Fiorentina', 'Torino FC', 'Sassuolo',

    // Bundesliga Teams
    'Bayern Munich', 'Borussia Dortmund', 'RB Leipzig', 'Bayer Leverkusen', 'Wolfsburg',
    'Eintracht Frankfurt', 'Borussia Monchengladbach', 'Hertha Berlin', 'Schalke 04', 'Freiburg',

    // Ligue 1 Teams
    'Paris Saint-Germain', 'Olympique Marseille', 'Olympique Lyon', 'AS Monaco', 'Lille OSC',
    'Stade Rennais', 'OGC Nice', 'RC Lens', 'Stade Brestois', 'Angers SCO',

    // Major Athletes
    'Cristiano Ronaldo', 'Lionel Messi', 'Neymar Jr', 'Kylian Mbappe', 'Mohamed Salah',
    'Kevin De Bruyne', 'Erling Haaland', 'Harry Kane', 'Bruno Fernandes', 'Phil Foden',
    'Pedri', 'Gavi', 'Vinicius Jr', 'Rodrygo', 'Federico Valverde',
    'Jude Bellingham', 'Florian Wirtz', 'Jamal Musiala', 'Joshua Kimmich', 'Thomas Muller',

    // Olympic Athletes
    'Simone Biles', 'Michael Phelps', 'Usain Bolt', 'Serena Williams', 'Tom Brady',
    'LeBron James', 'Stephen Curry', 'Tiger Woods', 'Muhammad Ali', 'Michael Jordan',

    // Other Sports
    'Lewis Hamilton', 'Max Verstappen', 'Sebastian Vettel', 'Fernando Alonso',
    'Roger Federer', 'Rafael Nadal', 'Novak Djokovic', 'Andy Murray',
    'Tom Brady', 'Patrick Mahomes', 'Aaron Rodgers', 'Christian McCaffrey'
  ];

  const handleEntityToggle = (entity) => {
    setCampaignForm(prev => ({
      ...prev,
      entities: prev.entities.includes(entity)
        ? prev.entities.filter(e => e !== entity)
        : [...prev.entities, entity]
    }));
  };

  const handleEntityRemove = (entityToRemove) => {
    setCampaignForm(prev => ({
      ...prev,
      entities: prev.entities.filter(entity => entity !== entityToRemove)
    }));
  };

  // Mock campaign data for sponsor campaigns (sponsors pay per engagement)
  const campaigns = [
    {
      id: 1,
      title: 'McDonald\'s PSG Promotion',
      description: 'Buy 1 menu, get 2nd free! Valid for 48h. Use unique QR codes at checkout.',
      targetType: 'fan_groups',
      targetEntities: ['Paris Saint-Germain'],
      campaignType: 'targeted_promotion',
      pricingModel: 'per_click',
      pricingRate: 1.00,
      budget: 5000,
      spent: 3200,
      clicks: 3200,
      redemptions: 2150,
      status: 'active',
      promotionMessage: 'Buy 1 menu, get 2nd free! Valid for 48h. Show this offer at checkout.',
      redemptionType: 'unique_qr',
      validityHours: 48,
      createdDate: '2024-01-15'
    },
    {
      id: 2,
      title: 'Coca-Cola Paris Direct Message',
      description: 'Exclusive Coca-Cola promotion for all Paris fans',
      targetType: 'location_based',
      targetLocation: 'Paris, France',
      campaignType: 'direct_message',
      pricingModel: 'per_message',
      pricingRate: 0.50,
      budget: 2500,
      spent: 1250,
      messagesSent: 2500,
      messagesOpened: 1800,
      status: 'active',
      promotionMessage: 'Get 20% off all Coca-Cola products! First come, first served - limited to 2,500 redemptions.',
      firstComeFirstServed: true,
      createdDate: '2024-01-14'
    },
    {
      id: 3,
      title: 'Nike Messi Fan Campaign',
      description: 'Special Nike offer for Messi fans worldwide',
      targetType: 'fan_groups',
      targetEntities: ['Lionel Messi'],
      campaignType: 'targeted_promotion',
      pricingModel: 'per_click',
      pricingRate: 2.50,
      budget: 10000,
      spent: 10000,
      clicks: 4000,
      redemptions: 3200,
      status: 'completed',
      promotionMessage: 'Messi fans get 30% off Nike apparel! Use discount code MESSI2024 at checkout.',
      redemptionType: 'discount_code',
      validityHours: 168,
      maxRedemptions: 4000,
      createdDate: '2024-01-10'
    },
    {
      id: 4,
      title: 'Adidas Chelsea FC Promotion',
      description: 'Chelsea FC fans get exclusive Adidas discount',
      targetType: 'fan_groups',
      targetEntities: ['Chelsea FC'],
      campaignType: 'targeted_promotion',
      pricingModel: 'per_click',
      pricingRate: 1.50,
      budget: 7500,
      spent: 0,
      clicks: 0,
      redemptions: 0,
      status: 'draft',
      promotionMessage: 'Chelsea FC fans: 25% off Adidas training gear! Limited time offer.',
      redemptionType: 'discount_code',
      validityHours: 72,
      maxRedemptions: 5000,
      createdDate: '2024-01-12'
    },
    {
      id: 5,
      title: 'Starbucks Global Athlete Message',
      description: 'Starbucks promotion for fans of top athletes',
      targetType: 'fan_groups',
      targetEntities: ['Cristiano Ronaldo', 'LeBron James', 'Serena Williams'],
      campaignType: 'direct_message',
      pricingModel: 'per_open',
      pricingRate: 0.75,
      budget: 6000,
      spent: 3000,
      messagesSent: 4000,
      messagesOpened: 3000,
      status: 'active',
      promotionMessage: 'Free coffee upgrade for fans of champion athletes! Mention this message at participating Starbucks locations.',
      firstComeFirstServed: false,
      createdDate: '2024-01-08'
    }
  ];

  const campaignStats = {
    totalCampaigns: campaigns.length,
    activeCampaigns: campaigns.filter(c => c.status === 'active').length,
    totalSpent: campaigns.reduce((sum, c) => sum + c.spent, 0),
    totalClicks: campaigns.reduce((sum, c) => sum + (c.clicks || 0), 0),
    totalMessagesSent: campaigns.reduce((sum, c) => sum + (c.messagesSent || 0), 0),
    totalRedemptions: campaigns.reduce((sum, c) => sum + (c.redemptions || 0), 0),
    totalBudget: campaigns.reduce((sum, c) => sum + c.budget, 0)
  };

  const handleCreateCampaign = () => {
    // Mock campaign creation
    console.log('Creating sponsor campaign:', campaignForm);
    setShowCreateForm(false);
    // Reset form
    setCampaignForm({
      title: '',
      description: '',
      campaignType: 'targeted_promotion',
      budget: '',
      pricingModel: 'per_click',
      pricingRate: '',
      targetType: 'fan_groups',
      targetEntities: [],
      targetLocation: '',
      promotionMessage: '',
      qrCodeRequired: true,
      redemptionType: 'unique_qr',
      validityHours: 48,
      maxRedemptions: '',
      firstComeFirstServed: false
    });
  };

  const handleCampaignAction = (campaignId, action) => {
    const campaign = campaigns.find(c => c.id === campaignId);
    if (!campaign) return;

    if (action === 'edit') {
      setSelectedCampaign(campaign);
      setShowEditModal(true);
    } else if (action === 'delete') {
      setSelectedCampaign(campaign);
      setShowDeleteModal(true);
    } else {
      // Mock campaign actions (start, stop, etc.)
      console.log(`Campaign ${campaignId}: ${action}`);
    }
  };

  const handleEditCampaign = () => {
    // Mock campaign editing
    console.log('Editing campaign:', selectedCampaign.id, selectedCampaign);
    setShowEditModal(false);
    setSelectedCampaign(null);
  };

  const handleDeleteCampaign = () => {
    // Mock campaign deletion
    console.log('Deleting campaign:', selectedCampaign.id);
    setShowDeleteModal(false);
    setSelectedCampaign(null);
  };

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (campaign.targetEntities && campaign.targetEntities.some(entity => entity.toLowerCase().includes(searchQuery.toLowerCase()))) ||
      (campaign.targetLocation && campaign.targetLocation.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-400/10';
      case 'ended': return 'text-gray-400 bg-gray-400/10';
      case 'draft': return 'text-yellow-400 bg-yellow-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <FaPlay className="text-green-400" />;
      case 'ended': return <FaStop className="text-gray-400" />;
      case 'draft': return <FaEdit className="text-yellow-400" />;
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
        <div className="flex md:items-center justify-between md:flex-row flex-col-reverse">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
              Sponsor Campaign Management
            </h1>
            <p className="text-gray-400 text-lg">
              Create promotional campaigns to reach targeted fan audiences
            </p>
          </div>
          <div className="flex md:w-auto w-full justify-end">
            <button
              onClick={() => setShowCreateForm(true)}
              className="w-[200px] mb-2 bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2"
            >
              <FaPlus />
              Create Campaign
            </button>
          </div>
        </div>
      </motion.div>

      {/* Campaign Stats Overview */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-r from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl md:p-6 p-2 mb-8"
      >
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <FaPlay className="text-green-400 text-2xl mr-2" />
              <span className="text-white text-xl font-bold">{campaignStats.activeCampaigns}</span>
            </div>
            <p className="text-gray-400 text-sm">Active Campaigns</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <FaVoteYea className="text-blue-400 text-2xl mr-2" />
              <span className="text-white text-xl font-bold">{campaignStats.totalClicks.toLocaleString()}</span>
            </div>
            <p className="text-gray-400 text-sm">Total Clicks</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <FaUsers className="text-green-500 text-2xl mr-2" />
              <span className="text-white text-xl font-bold">{campaignStats.totalMessagesSent.toLocaleString()}</span>
            </div>
            <p className="text-gray-400 text-sm">Messages Sent</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <FaMoneyBillWave className="text-purple-400 text-2xl mr-2" />
              <span className="text-white text-xl font-bold">${campaignStats.totalSpent.toLocaleString()}</span>
            </div>
            <p className="text-gray-400 text-sm">Total Spent</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <FaChartBar className="text-yellow-400 text-2xl mr-2" />
              <span className="text-white text-xl font-bold">${campaignStats.totalBudget.toLocaleString()}</span>
            </div>
            <p className="text-gray-400 text-sm">Total Budget</p>
          </div>
        </div>
        <div className="mt-4 text-center">
          <p className="text-gray-400 text-sm">Sponsor campaigns: You pay per engagement, Fanekt never shares your database, all redemptions are tracked and verified.</p>
        </div>
      </motion.div>

      {/* Navigation Tabs */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-6"
      >
        <div className="grid lg:grid-cols-6 md:grid-cols-4 grid-cols-2 bg-[#1e2139] p-1 rounded-xl border border-[#286db24c]">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`py-2 md:px-6 px-2 rounded-lg font-semibold transition-all duration-300 ${activeTab === 'dashboard'
              ? 'bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] text-white shadow-lg'
              : 'text-gray-400 hover:text-white'
              }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('campaigns')}
            className={`py-2 md:px-6 px-2 rounded-lg font-semibold transition-all duration-300 ${activeTab === 'campaigns'
              ? 'bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] text-white shadow-lg'
              : 'text-gray-400 hover:text-white'
              }`}
          >
            My Campaigns
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`py-2 md:px-6 px-2 rounded-lg font-semibold transition-all duration-300 ${activeTab === 'analytics'
              ? 'bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] text-white shadow-lg'
              : 'text-gray-400 hover:text-white'
              }`}
          >
            Analytics
          </button>
        </div>
      </motion.div>

      {/* Tab Content */}
      {activeTab === 'dashboard' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Recent Campaigns */}
          <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl md:p-6 p-2">
            <h3 className="text-white text-xl font-bold mb-6">Recent Campaigns</h3>
            <div className="space-y-4">
              {campaigns.slice(0, 3).map((campaign) => {
                const displayMetric = campaign.campaignType === 'targeted_promotion'
                  ? `${campaign.clicks.toLocaleString()} clicks`
                  : `${campaign.messagesSent.toLocaleString()} messages`;

                return (
                  <div key={campaign.id} className="flex md:items-center justify-between md:flex-row flex-col-reverse gap-2 bg-[#1e2139] rounded-xl md:p-4 p-2 border border-[#286db24c]">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#286db24c] rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">{campaign.title.charAt(0)}</span>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold">{campaign.title}</h4>
                        <p className="text-gray-400 text-sm">{displayMetric} • ${campaign.spent.toLocaleString()} spent</p>
                      </div>
                    </div>
                    <div className="flex justify-end md:w-auto w-full">
                      <div className="flex items-center gap-3">
                        <span className={`flex items-center gap-2 px-3 py-1 rounded-full ${getStatusColor(campaign.status)}`}>
                          {getStatusIcon(campaign.status)}
                          <span className="text-sm font-medium capitalize">{campaign.status}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl md:p-6 p-2">
              <h3 className="text-white text-xl font-bold mb-6">Spend Overview</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Total Spent</span>
                  <span className="text-white font-bold">${campaignStats.totalSpent.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Remaining Budget</span>
                  <span className="text-green-400 font-bold">${(campaignStats.totalBudget - campaignStats.totalSpent).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Budget Utilization</span>
                  <span className="text-blue-400 font-bold">{((campaignStats.totalSpent / campaignStats.totalBudget) * 100).toFixed(1)}%</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl p-6">
              <h3 className="text-white text-xl font-bold mb-6">Engagement Metrics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Total Clicks</span>
                  <span className="text-white font-bold">{campaignStats.totalClicks.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Messages Sent</span>
                  <span className="text-green-400 font-bold">{campaignStats.totalMessagesSent.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Total Redemptions</span>
                  <span className="text-[#f64c68] font-bold">{campaignStats.totalRedemptions.toLocaleString()}</span>
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
          {/* Search */}
          <div className="flex justify-between items-center">
            <div className="relative flex-1 max-w-md">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search campaigns..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#1e2139] text-white pl-10 pr-4 py-3 rounded-lg border border-[#286db24c] focus:outline-none focus:border-[#f64c68]"
              />
            </div>
          </div>

          {/* Campaigns List */}
          {filteredCampaigns.length > 0 ? (
            <div className="space-y-4">
              {filteredCampaigns.map((campaign) => (
                <div key={campaign.id} className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl md:p-6 p-2">
                  <div className="flex items-start justify-between md:flex-row flex-col mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-white text-xl font-bold">{campaign.title}</h3>
                        <span className={`flex items-center gap-2 px-3 py-1 rounded-full ${getStatusColor(campaign.status)}`}>
                          {getStatusIcon(campaign.status)}
                          <span className="text-sm font-medium capitalize">{campaign.status}</span>
                        </span>
                      </div>
                      <p className="text-gray-300 mb-3">{campaign.description}</p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-3">
                        {campaign.campaignType === 'targeted_promotion' && (
                          <>
                            <div className="flex items-center gap-1">
                              <FaVoteYea className="text-blue-400" />
                              <span>{campaign.clicks.toLocaleString()} clicks</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <FaTrophy className="text-green-400" />
                              <span>{campaign.redemptions.toLocaleString()} redemptions</span>
                            </div>
                          </>
                        )}
                        {campaign.campaignType === 'direct_message' && (
                          <>
                            <div className="flex items-center gap-1">
                              <FaUsers className="text-blue-400" />
                              <span>{campaign.messagesSent.toLocaleString()} messages sent</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <FaEye className="text-green-400" />
                              <span>{campaign.messagesOpened.toLocaleString()} opened</span>
                            </div>
                          </>
                        )}
                        <div className="flex items-center gap-1">
                          <FaMoneyBillWave className="text-yellow-400" />
                          <span>${campaign.spent.toLocaleString()} spent</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
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
                    <div className="flex justify-end md:w-auto w-full">
                      <div className="text-right">
                        <div className="text-green-400 font-bold text-lg mb-1">${campaign.spent.toLocaleString()}</div>
                        <div className="text-gray-400 text-sm mb-4">Spent</div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleCampaignAction(campaign.id, 'edit')}
                            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors"
                            title="Edit Campaign"
                          >
                            <FaEdit className="text-sm" />
                          </button>
                          {campaign.status === 'draft' && (
                            <button
                              onClick={() => handleCampaignAction(campaign.id, 'start')}
                              className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg transition-colors"
                              title="Start Campaign"
                            >
                              <FaPlay className="text-sm" />
                            </button>
                          )}
                          {campaign.status === 'active' && (
                            <button
                              onClick={() => handleCampaignAction(campaign.id, 'stop')}
                              className="bg-yellow-600 hover:bg-yellow-700 text-white p-2 rounded-lg transition-colors"
                              title="Stop Campaign"
                            >
                              <FaStop className="text-sm" />
                            </button>
                          )}
                          <button
                            onClick={() => handleCampaignAction(campaign.id, 'delete')}
                            className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-colors"
                            title="Delete Campaign"
                          >
                            <FaTrash className="text-sm" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>


                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <FaTrophy className="text-gray-400 text-8xl mx-auto mb-6" />
              <h3 className="text-white text-2xl font-bold mb-4">No campaigns found</h3>
              <p className="text-gray-400 text-lg">Try adjusting your search terms or create your first campaign.</p>
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
            {/* Campaign Performance Chart */}
            <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl md:p-6 p-2">
              <h3 className="text-white text-xl font-bold mb-6">Campaign Performance</h3>
              <div className="space-y-4">
                {campaigns.map((campaign) => {
                  const performanceValue = campaign.campaignType === 'targeted_promotion'
                    ? campaign.clicks
                    : campaign.messagesSent;
                  const performanceLabel = campaign.campaignType === 'targeted_promotion'
                    ? 'clicks'
                    : 'messages sent';

                  return (
                    <div key={campaign.id} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300 truncate">{campaign.title}</span>
                        <span className="text-white font-medium">{performanceValue.toLocaleString()} {performanceLabel}</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-[#f64c68] h-2 rounded-full"
                          style={{
                            width: `${(performanceValue / Math.max(...campaigns.map(c =>
                              c.campaignType === 'targeted_promotion' ? c.clicks : c.messagesSent
                            ))) * 100}%`
                          }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Spend Analytics */}
            <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl md:p-6 p-2">
              <h3 className="text-white text-xl font-bold mb-6">Spend Analytics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-[#1e2139] rounded-lg">
                  <span className="text-gray-300">Total Spent</span>
                  <span className="text-white font-bold">${campaigns.reduce((sum, c) => sum + c.spent, 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-[#1e2139] rounded-lg">
                  <span className="text-gray-300">Total Budget</span>
                  <span className="text-blue-400 font-bold">${campaigns.reduce((sum, c) => sum + c.budget, 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-[#1e2139] rounded-lg">
                  <span className="text-gray-300">Remaining Budget</span>
                  <span className="text-green-400 font-bold">${(campaigns.reduce((sum, c) => sum + c.budget, 0) - campaigns.reduce((sum, c) => sum + c.spent, 0)).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-[#1e2139] rounded-lg">
                  <span className="text-gray-300">Average CPC</span>
                  <span className="text-purple-400 font-bold">${(campaigns.reduce((sum, c) => sum + c.spent, 0) / campaigns.reduce((sum, c) => sum + (c.clicks || c.messagesSent), 0) || 1).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Campaign Type Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl md:p-6 p-2">
              <h3 className="text-white text-xl font-bold mb-6">Targeted Promotion Campaigns</h3>
              <div className="space-y-3">
                {campaigns.filter(c => c.campaignType === 'targeted_promotion').map((campaign) => (
                  <div key={campaign.id} className="flex items-center justify-between p-3 bg-[#1e2139] rounded-lg">
                    <div>
                      <h4 className="text-white font-medium">{campaign.title}</h4>
                      <p className="text-gray-400 text-sm">{campaign.clicks.toLocaleString()} clicks • {campaign.redemptions.toLocaleString()} redemptions</p>
                    </div>
                    <div className="text-right">
                      <p className="text-green-400 font-bold">${campaign.spent.toLocaleString()}</p>
                      <p className="text-gray-400 text-xs">spent</p>
                    </div>
                  </div>
                ))}
                {campaigns.filter(c => c.campaignType === 'targeted_promotion').length === 0 && (
                  <p className="text-gray-400 text-center py-4">No targeted promotion campaigns yet</p>
                )}
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl md:p-6 p-2">
              <h3 className="text-white text-xl font-bold mb-6">Direct Message Campaigns</h3>
              <div className="space-y-3">
                {campaigns.filter(c => c.campaignType === 'direct_message').map((campaign) => (
                  <div key={campaign.id} className="flex items-center justify-between p-3 bg-[#1e2139] rounded-lg">
                    <div>
                      <h4 className="text-white font-medium">{campaign.title}</h4>
                      <p className="text-gray-400 text-sm">{campaign.messagesSent.toLocaleString()} sent • {campaign.messagesOpened.toLocaleString()} opened</p>
                    </div>
                    <div className="text-right">
                      <p className="text-green-400 font-bold">${campaign.spent.toLocaleString()}</p>
                      <p className="text-gray-400 text-xs">spent</p>
                    </div>
                  </div>
                ))}
                {campaigns.filter(c => c.campaignType === 'direct_message').length === 0 && (
                  <p className="text-gray-400 text-center py-4">No direct message campaigns yet</p>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Create Campaign Modal */}
      {showCreateForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center md:p-4 p-2"
          onClick={() => setShowCreateForm(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-[#286db24c]">
              <div className="flex items-center justify-between">
                <h3 className="text-white text-xl font-bold">Create New Campaign</h3>
                <button
                  onClick={() => setShowCreateForm(false)}
                  className="text-gray-400 hover:text-white p-2"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className="block text-white font-medium mb-2">Campaign Title</label>
                <input
                  type="text"
                  value={campaignForm.title}
                  onChange={(e) => setCampaignForm({ ...campaignForm, title: e.target.value })}
                  className="w-full bg-[#1e2139] text-white px-4 py-3 rounded-lg border border-[#286db24c] focus:outline-none focus:border-[#f64c68]"
                  placeholder="e.g., McDonald's PSG Promotion"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Campaign Description</label>
                <textarea
                  value={campaignForm.description}
                  onChange={(e) => setCampaignForm({ ...campaignForm, description: e.target.value })}
                  rows={3}
                  className="w-full bg-[#1e2139] text-white px-4 py-3 rounded-lg border border-[#286db24c] focus:outline-none focus:border-[#f64c68] resize-none"
                  placeholder="Describe your promotional campaign..."
                />
              </div>

              {/* Campaign Type Selection */}
              <div>
                <label className="block text-white font-medium mb-2">Campaign Type</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {campaignTypes.map((type) => (
                    <div
                      key={type.id}
                      onClick={() => setCampaignForm({ ...campaignForm, campaignType: type.id, pricingModel: type.pricingModels[0] })}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${campaignForm.campaignType === type.id
                        ? 'border-[#f64c68] bg-[#f64c68]/10'
                        : 'border-[#286db24c] hover:border-[#f64c68]/50'
                        }`}
                    >
                      <h4 className="text-white font-semibold mb-1">{type.name}</h4>
                      <p className="text-gray-400 text-sm mb-2">{type.description}</p>
                      <p className="text-blue-400 text-xs">{type.example}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Target Type Selection */}
              <div>
                <label className="block text-white font-medium mb-2">Target Audience</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div
                    onClick={() => setCampaignForm({ ...campaignForm, targetType: 'fan_groups' })}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${campaignForm.targetType === 'fan_groups'
                      ? 'border-[#f64c68] bg-[#f64c68]/10'
                      : 'border-[#286db24c] hover:border-[#f64c68]/50'
                      }`}
                  >
                    <h4 className="text-white font-semibold mb-1">Fan Groups</h4>
                    <p className="text-gray-400 text-sm">Target fans of specific teams/athletes</p>
                    <p className="text-blue-400 text-xs">e.g., PSG fans, Messi fans</p>
                  </div>
                  <div
                    onClick={() => setCampaignForm({ ...campaignForm, targetType: 'location_based' })}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${campaignForm.targetType === 'location_based'
                      ? 'border-[#f64c68] bg-[#f64c68]/10'
                      : 'border-[#286db24c] hover:border-[#f64c68]/50'
                      }`}
                  >
                    <h4 className="text-white font-semibold mb-1">Location Based</h4>
                    <p className="text-gray-400 text-sm">Target fans in specific locations</p>
                    <p className="text-blue-400 text-xs">e.g., All fans in Paris</p>
                  </div>
                </div>
              </div>

              {/* Conditional Targeting Options */}
              {campaignForm.targetType === 'fan_groups' && (
                <div>
                  <label className="block text-white font-medium mb-2">Target Fan Groups</label>
                  {/* Selected Entities Display */}
                  {campaignForm.targetEntities.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {campaignForm.targetEntities.map((entity) => (
                        <span
                          key={entity}
                          className="bg-[#f64c68] text-white text-sm px-3 py-1 rounded-full flex items-center gap-2"
                        >
                          {entity}
                          <button
                            onClick={() => setCampaignForm(prev => ({
                              ...prev,
                              targetEntities: prev.targetEntities.filter(e => e !== entity)
                            }))}
                            className="hover:text-gray-300 text-xs"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Entity Selector Dropdown */}
                  <div className="relative">
                    <div
                      onClick={() => setEntitiesDropdownOpen(!entitiesDropdownOpen)}
                      className="w-full bg-[#1e2139] text-white px-4 py-3 rounded-lg border border-[#286db24c] cursor-pointer hover:border-[#f64c68] transition-all duration-300 flex items-center justify-between"
                    >
                      <span className="text-gray-400">
                        {campaignForm.targetEntities.length > 0
                          ? `${campaignForm.targetEntities.length} fan groups selected`
                          : 'Select fan groups to target...'
                        }
                      </span>
                      <FaChevronDown className={`transition-transform ${entitiesDropdownOpen ? 'rotate-180' : ''}`} />
                    </div>

                    {/* Dropdown Options */}
                    {entitiesDropdownOpen && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-[#1e2139] border border-[#286db24c] rounded-lg shadow-xl z-50 max-h-60 overflow-y-auto">
                        <div className="p-3 border-b border-[#286db24c]">
                          <div className="relative">
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                            <input
                              type="text"
                              placeholder="Search teams/athletes..."
                              value={entitySearchQuery}
                              onChange={(e) => setEntitySearchQuery(e.target.value)}
                              className="w-full bg-[#252a4a] text-white pl-8 pr-3 py-2 rounded-lg border border-[#286db24c] focus:outline-none focus:border-[#f64c68] text-sm"
                            />
                          </div>
                        </div>

                        <div className="max-h-48 overflow-y-auto">
                          {(() => {
                            const filteredEntities = availableEntities.filter(entity =>
                              entity.toLowerCase().includes(entitySearchQuery.toLowerCase())
                            );

                            return filteredEntities.length > 0 ? (
                              filteredEntities.map((entity) => (
                                <div
                                  key={entity}
                                  onClick={() => setCampaignForm(prev => ({
                                    ...prev,
                                    targetEntities: prev.targetEntities.includes(entity)
                                      ? prev.targetEntities.filter(e => e !== entity)
                                      : [...prev.targetEntities, entity]
                                  }))}
                                  className={`px-4 py-3 hover:bg-[#252a4a] cursor-pointer transition-colors duration-200 flex items-center gap-3 ${campaignForm.targetEntities.includes(entity) ? 'bg-[#f64c68]/10' : ''
                                    }`}
                                >
                                  <div className={`w-4 h-4 border-2 rounded flex items-center justify-center ${campaignForm.targetEntities.includes(entity)
                                    ? 'bg-[#f64c68] border-[#f64c68]'
                                    : 'border-gray-400'
                                    }`}>
                                    {campaignForm.targetEntities.includes(entity) && (
                                      <FaCheckCircle className="text-white text-xs" />
                                    )}
                                  </div>
                                  <span className={`text-sm ${campaignForm.targetEntities.includes(entity) ? 'text-[#f64c68] font-medium' : 'text-gray-300'
                                    }`}>
                                    {entity}
                                  </span>
                                </div>
                              ))
                            ) : (
                              <div className="px-4 py-8 text-center text-gray-400">
                                <FaSearch className="mx-auto mb-2 text-xl" />
                                <p className="text-sm">No entities found</p>
                              </div>
                            );
                          })()}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {campaignForm.targetType === 'location_based' && (
                <div>
                  <label className="block text-white font-medium mb-2">Target Location</label>
                  <input
                    type="text"
                    value={campaignForm.targetLocation}
                    onChange={(e) => setCampaignForm({ ...campaignForm, targetLocation: e.target.value })}
                    className="w-full bg-[#1e2139] text-white px-4 py-3 rounded-lg border border-[#286db24c] focus:outline-none focus:border-[#f64c68]"
                    placeholder="e.g., Paris, France"
                  />
                </div>
              )}

              {/* Promotion Message - for both campaign types */}
              <div>
                <label className="block text-white font-medium mb-2">Promotion Message</label>
                <textarea
                  value={campaignForm.promotionMessage}
                  onChange={(e) => setCampaignForm({ ...campaignForm, promotionMessage: e.target.value })}
                  rows={4}
                  className="w-full bg-[#1e2139] text-white px-4 py-3 rounded-lg border border-[#286db24c] focus:outline-none focus:border-[#f64c68] resize-none"
                  placeholder={campaignForm.campaignType === 'targeted_promotion'
                    ? "Buy 1 menu, get 2nd free! Valid for 48h. Use QR code at checkout."
                    : "Exclusive offer: Buy 1 get 1 free on all menu items! Limited time only."
                  }
                />
              </div>

              {/* Pricing Model Selection */}
              <div>
                <label className="block text-white font-medium mb-2">Pricing Model</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {campaignTypes.find(t => t.id === campaignForm.campaignType)?.pricingModels.map((modelId) => {
                    const model = pricingModels[modelId];
                    return (
                      <div
                        key={modelId}
                        onClick={() => setCampaignForm({ ...campaignForm, pricingModel: modelId })}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${campaignForm.pricingModel === modelId
                          ? 'border-[#f64c68] bg-[#f64c68]/10'
                          : 'border-[#286db24c] hover:border-[#f64c68]/50'
                          }`}
                      >
                        <h4 className="text-white font-semibold mb-1">{model.name}</h4>
                        <p className="text-blue-400 text-sm">{model.example}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Budget & Pricing Rate */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-medium mb-2">Campaign Budget ($)</label>
                  <input
                    type="number"
                    value={campaignForm.budget}
                    onChange={(e) => setCampaignForm({ ...campaignForm, budget: e.target.value })}
                    className="w-full bg-[#1e2139] text-white px-4 py-3 rounded-lg border border-[#286db24c] focus:outline-none focus:border-[#f64c68]"
                    placeholder="e.g., 5000"
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">Rate per {pricingModels[campaignForm.pricingModel]?.unit}</label>
                  <input
                    type="number"
                    step="0.01"
                    value={campaignForm.pricingRate}
                    onChange={(e) => setCampaignForm({ ...campaignForm, pricingRate: e.target.value })}
                    className="w-full bg-[#1e2139] text-white px-4 py-3 rounded-lg border border-[#286db24c] focus:outline-none focus:border-[#f64c68]"
                    placeholder={campaignForm.pricingModel === 'per_click' ? "1.00" : "0.50"}
                  />
                </div>
              </div>

              {/* QR Code and Redemption Options - only for targeted promotion */}
              {campaignForm.campaignType === 'targeted_promotion' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-white font-medium mb-2">Redemption Method</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div
                        onClick={() => setCampaignForm({ ...campaignForm, redemptionType: 'unique_qr' })}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${campaignForm.redemptionType === 'unique_qr'
                          ? 'border-[#f64c68] bg-[#f64c68]/10'
                          : 'border-[#286db24c] hover:border-[#f64c68]/50'
                          }`}
                      >
                        <h4 className="text-white font-semibold mb-1">Unique QR Codes</h4>
                        <p className="text-gray-400 text-sm">One-time use QR codes</p>
                      </div>
                      <div
                        onClick={() => setCampaignForm({ ...campaignForm, redemptionType: 'discount_code' })}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${campaignForm.redemptionType === 'discount_code'
                          ? 'border-[#f64c68] bg-[#f64c68]/10'
                          : 'border-[#286db24c] hover:border-[#f64c68]/50'
                          }`}
                      >
                        <h4 className="text-white font-semibold mb-1">Discount Codes</h4>
                        <p className="text-gray-400 text-sm">Reusable discount codes</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white font-medium mb-2">Validity Hours</label>
                      <input
                        type="number"
                        value={campaignForm.validityHours}
                        onChange={(e) => setCampaignForm({ ...campaignForm, validityHours: e.target.value })}
                        className="w-full bg-[#1e2139] text-white px-4 py-3 rounded-lg border border-[#286db24c] focus:outline-none focus:border-[#f64c68]"
                        placeholder="48"
                      />
                    </div>
                    {campaignForm.redemptionType === 'discount_code' && (
                      <div>
                        <label className="block text-white font-medium mb-2">Max Redemptions</label>
                        <input
                          type="number"
                          value={campaignForm.maxRedemptions}
                          onChange={(e) => setCampaignForm({ ...campaignForm, maxRedemptions: e.target.value })}
                          className="w-full bg-[#1e2139] text-white px-4 py-3 rounded-lg border border-[#286db24c] focus:outline-none focus:border-[#f64c68]"
                          placeholder="1000"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* First Come First Served - for direct message campaigns */}
              {campaignForm.campaignType === 'direct_message' && (
                <div>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={campaignForm.firstComeFirstServed}
                      onChange={(e) => setCampaignForm({ ...campaignForm, firstComeFirstServed: e.target.checked })}
                      className="w-4 h-4 text-[#f64c68] bg-[#1e2139] border-[#286db24c] rounded focus:ring-[#f64c68] focus:ring-2"
                    />
                    <span className="text-white font-medium">First Come, First Served</span>
                  </label>
                  <p className="text-gray-400 text-sm mt-1">Messages delivered on first-opened-first-served basis until budget is exhausted</p>
                </div>
              )}

              {/* Budget Calculator */}
              {campaignForm.budget && campaignForm.pricingRate && (
                <div className="bg-green-600/20 border border-green-400/30 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <FaMoneyBillWave className="text-green-400 text-lg mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-green-400 font-medium mb-1">Campaign Reach Estimate</p>
                      <p className="text-green-300 text-sm">
                        With ${campaignForm.budget} budget at ${campaignForm.pricingRate} per {pricingModels[campaignForm.pricingModel]?.unit},
                        you can reach approximately {Math.floor(campaignForm.budget / campaignForm.pricingRate).toLocaleString()} {pricingModels[campaignForm.pricingModel]?.unit}s.
                      </p>
                      {campaignForm.targetType === 'location_based' && campaignForm.targetLocation && (
                        <p className="text-green-300 text-sm mt-1">
                          Targeting fans in: {campaignForm.targetLocation}
                        </p>
                      )}
                      {campaignForm.targetType === 'fan_groups' && campaignForm.targetEntities.length > 0 && (
                        <p className="text-green-300 text-sm mt-1">
                          Targeting fans of: {campaignForm.targetEntities.join(', ')}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-blue-600/20 border border-blue-400/30 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <FaInfoCircle className="text-blue-400 text-lg mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-blue-400 font-medium mb-1">Sponsor Campaign Rules</p>
                    <p className="text-blue-300 text-sm">
                      You pay Fanekt per engagement. Fanekt never shares your database with sponsors.
                      Campaigns run until budget is exhausted. All redemptions are tracked and verified.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={handleCreateCampaign}
                  className="flex-1 bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <FaPlus />
                  Create Campaign
                </button>
                <button
                  onClick={() => setShowCreateForm(false)}
                  className="px-6 py-3 border border-gray-600 text-gray-400 rounded-lg hover:border-gray-500 hover:text-white transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Edit Campaign Modal */}
      {showEditModal && selectedCampaign && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowEditModal(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-[#286db24c]">
              <div className="flex items-center justify-between">
                <h3 className="text-white text-xl font-bold">Edit Campaign</h3>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-400 hover:text-white p-2"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className="block text-white font-medium mb-2">Campaign Title</label>
                <input
                  type="text"
                  defaultValue={selectedCampaign.title}
                  className="w-full bg-[#1e2139] text-white px-4 py-3 rounded-lg border border-[#286db24c] focus:outline-none focus:border-[#f64c68]"
                  placeholder="Enter campaign title..."
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Description</label>
                <textarea
                  defaultValue={selectedCampaign.description}
                  rows={3}
                  className="w-full bg-[#1e2139] text-white px-4 py-3 rounded-lg border border-[#286db24c] focus:outline-none focus:border-[#f64c68] resize-none"
                  placeholder="Describe your campaign..."
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Reward</label>
                <input
                  type="text"
                  defaultValue={selectedCampaign.reward}
                  className="w-full bg-[#1e2139] text-white px-4 py-3 rounded-lg border border-[#286db24c] focus:outline-none focus:border-[#f64c68]"
                  placeholder="e.g., 100 FNKT + Exclusive Jersey"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Duration</label>
                <input
                  type="text"
                  defaultValue={selectedCampaign.duration}
                  className="w-full bg-[#1e2139] text-white px-4 py-3 rounded-lg border border-[#286db24c] focus:outline-none focus:border-[#f64c68]"
                  placeholder="e.g., 2024-01-20 to 2024-01-30"
                />
              </div>

              <div className="bg-yellow-600/20 border border-yellow-400/30 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <FaInfoCircle className="text-yellow-400 text-lg mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-yellow-400 font-medium mb-1">Edit Campaign</p>
                    <p className="text-yellow-300 text-sm">
                      You can modify campaign details while it's in draft or active status.
                      Changes will be reflected immediately for users.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={handleEditCampaign}
                  className="flex-1 bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <FaEdit />
                  Update Campaign
                </button>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-6 py-3 border border-gray-600 text-gray-400 rounded-lg hover:border-gray-500 hover:text-white transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Delete Campaign Modal */}
      {showDeleteModal && selectedCampaign && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowDeleteModal(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-[#286db24c]">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-red-600/20 rounded-full flex items-center justify-center">
                  <FaTrash className="text-red-400 text-xl" />
                </div>
                <div>
                  <h3 className="text-white text-xl font-bold">Delete Campaign</h3>
                  <p className="text-gray-400 text-sm">This action cannot be undone</p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="bg-gray-800/50 rounded-lg p-4">
                <h4 className="text-white font-semibold mb-2">{selectedCampaign.title}</h4>
                <p className="text-gray-400 text-sm mb-2">{selectedCampaign.description}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  {selectedCampaign.campaignType === 'targeted_promotion' ? (
                    <>
                      <span>{selectedCampaign.clicks.toLocaleString()} clicks</span>
                      <span>{selectedCampaign.redemptions.toLocaleString()} redemptions</span>
                    </>
                  ) : (
                    <>
                      <span>{selectedCampaign.messagesSent.toLocaleString()} messages sent</span>
                      <span>${selectedCampaign.spent.toLocaleString()} spent</span>
                    </>
                  )}
                </div>
              </div>

              <div className="bg-red-600/20 border border-red-400/30 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <FaInfoCircle className="text-red-400 text-lg mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-red-400 font-medium mb-1">Warning</p>
                    <p className="text-red-300 text-sm">
                      Deleting this campaign will permanently remove all associated data,
                      votes, and revenue. This action cannot be reversed.
                    </p>
                  </div>
                </div>
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
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

export default SponsorCampaigns;
