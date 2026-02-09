import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FaHandshake,
  FaUsers,
  FaStar,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaPlus,
  FaInfoCircle,
  FaEye,
  FaEdit,
  FaTrash,
  FaSearch,
  FaFilter,
  FaCrown,
  FaTrophy,
  FaMedal,
  FaGem
} from 'react-icons/fa';

function ClubTeamUniSponsorships() {
  const [activeTab, setActiveTab] = useState('sponsor_wall');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateDeal, setShowCreateDeal] = useState(false);
  const [showIncomingOffers, setShowIncomingOffers] = useState(false);
  const [selectedSponsor, setSelectedSponsor] = useState(null);

  // Mock sponsorship data
  const [sponsorships] = useState([
    {
      id: 1,
      sponsor: 'Nike',
      logo: '🏆',
      type: 'Official Kit Sponsor',
      dealValue: 2500000,
      duration: '2024-2026',
      status: 'active',
      description: 'Official kit and training apparel partner',
      benefits: ['Official match kits', 'Training apparel', 'Brand visibility', 'Social media promotion'],
      createdDate: '2024-01-15',
      tier: 'platinum'
    },
    {
      id: 2,
      sponsor: 'Coca-Cola',
      logo: '🥤',
      type: 'Beverage Partner',
      dealValue: 500000,
      duration: '2024-2025',
      status: 'active',
      description: 'Official beverage supplier for all matches',
      benefits: ['Stadium beverage rights', 'Player hydration products', 'Fan zone activation'],
      createdDate: '2024-01-20',
      tier: 'gold'
    },
    {
      id: 3,
      sponsor: 'Adidas',
      logo: '⚽',
      type: 'Ball Supplier',
      dealValue: 200000,
      duration: '2024-2025',
      status: 'active',
      description: 'Official match ball and equipment supplier',
      benefits: ['Match balls', 'Training equipment', 'Technical support'],
      createdDate: '2024-01-10',
      tier: 'silver'
    }
  ]);

  // Mock incoming sponsorship offers
  const [incomingOffers] = useState([
    {
      id: 1,
      sponsor: 'Under Armour',
      logo: '🏃',
      type: 'Training Apparel Sponsor',
      proposedValue: 300000,
      proposedDuration: '2024-2025',
      message: 'We would love to partner with your team for training apparel sponsorship.',
      benefits: ['Training kits', 'Recovery wear', 'Performance apparel'],
      status: 'pending',
      receivedDate: '2024-01-25'
    },
    {
      id: 2,
      sponsor: 'Red Bull',
      logo: '🚀',
      type: 'Energy Drink Partner',
      proposedValue: 150000,
      proposedDuration: '2024-2024',
      message: 'Exciting partnership opportunity for energy drink activation.',
      benefits: ['Player energy drinks', 'Fan zone activation', 'Social media campaigns'],
      status: 'pending',
      receivedDate: '2024-01-24'
    },
    {
      id: 3,
      sponsor: 'Mastercard',
      logo: '💳',
      type: 'Payment Partner',
      proposedValue: 400000,
      proposedDuration: '2024-2026',
      message: 'Premium payment solutions and financial partnership.',
      benefits: ['Digital payments', 'Fan engagement tools', 'Financial education'],
      status: 'pending',
      receivedDate: '2024-01-23'
    }
  ]);

  // Mock sponsorship marketplace - sponsors looking for partnerships
  const [marketplace] = useState([
    {
      id: 1,
      company: 'Puma',
      logo: '👟',
      industry: 'Sportswear',
      budget: 500000,
      targetType: 'Football Teams',
      message: 'Looking for strategic partnerships with emerging football teams.',
      contactPerson: 'Sarah Johnson',
      contactEmail: 'partnerships@puma.com'
    },
    {
      id: 2,
      company: 'EA Sports',
      logo: '🎮',
      industry: 'Gaming',
      budget: 750000,
      targetType: 'Professional Teams',
      message: 'Gaming and esports partnership opportunities available.',
      contactPerson: 'Mike Chen',
      contactEmail: 'sponsorships@easports.com'
    },
    {
      id: 3,
      company: 'Gatorade',
      logo: '🥤',
      industry: 'Beverages',
      budget: 300000,
      targetType: 'Sports Teams',
      message: 'Performance nutrition and hydration partnerships.',
      contactPerson: 'Lisa Rodriguez',
      contactEmail: 'partnerships@gatorade.com'
    },
    {
      id: 4,
      company: 'Visa',
      logo: '💳',
      industry: 'Financial Services',
      budget: 600000,
      targetType: 'Professional Clubs',
      message: 'Payment solutions and digital transformation partnerships.',
      contactPerson: 'David Kim',
      contactEmail: 'sponsorships@visa.com'
    }
  ]);

  const getTierIcon = (tier) => {
    switch (tier) {
      case 'platinum': return <FaCrown className="text-purple-400" />;
      case 'gold': return <FaTrophy className="text-yellow-400" />;
      case 'silver': return <FaMedal className="text-gray-400" />;
      default: return <FaGem className="text-blue-400" />;
    }
  };

  const getTierColor = (tier) => {
    switch (tier) {
      case 'platinum': return 'border-purple-400 bg-purple-400/10';
      case 'gold': return 'border-yellow-400 bg-yellow-400/10';
      case 'silver': return 'border-gray-400 bg-gray-400/10';
      default: return 'border-blue-400 bg-blue-400/10';
    }
  };

  const handleAcceptOffer = (offerId) => {
    console.log('Accepting sponsorship offer:', offerId);
    // In real app, this would update the offer status and create a sponsorship deal
  };

  const handleRejectOffer = (offerId) => {
    console.log('Rejecting sponsorship offer:', offerId);
    // In real app, this would update the offer status
  };

  const handleContactSponsor = (sponsor) => {
    console.log('Contacting sponsor:', sponsor);
    // In real app, this would open a contact form or email client
  };

  const filteredMarketplace = marketplace.filter(sponsor =>
    sponsor.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sponsor.industry.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sponsorshipStats = {
    totalSponsors: sponsorships.length,
    totalValue: sponsorships.reduce((sum, s) => sum + s.dealValue, 0),
    activeDeals: sponsorships.filter(s => s.status === 'active').length,
    pendingOffers: incomingOffers.filter(o => o.status === 'pending').length
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
              Sponsorship Management
            </h1>
            <p className="text-gray-400 text-lg">
              Manage sponsorship deals and explore partnership opportunities
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowIncomingOffers(true)}
              className="bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2 relative"
            >
              <FaHandshake />
              Offers
              {sponsorshipStats.pendingOffers > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {sponsorshipStats.pendingOffers}
                </span>
              )}
            </button>
            <button
              onClick={() => setShowCreateDeal(true)}
              className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2"
            >
              <FaPlus />
              Seek Sponsors
            </button>
          </div>
        </div>
      </motion.div>

      {/* Sponsorship Stats Overview */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-r from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl p-6 mb-8"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <FaHandshake className="text-[#f64c68] text-2xl mr-2" />
              <span className="text-white text-xl font-bold">{sponsorshipStats.totalSponsors}</span>
            </div>
            <p className="text-gray-400 text-sm">Active Sponsors</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <FaMoneyBillWave className="text-green-400 text-2xl mr-2" />
              <span className="text-white text-xl font-bold">${(sponsorshipStats.totalValue / 1000000).toFixed(1)}M</span>
            </div>
            <p className="text-gray-400 text-sm">Total Value</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <FaCheckCircle className="text-blue-400 text-2xl mr-2" />
              <span className="text-white text-xl font-bold">{sponsorshipStats.activeDeals}</span>
            </div>
            <p className="text-gray-400 text-sm">Active Deals</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <FaClock className="text-yellow-400 text-2xl mr-2" />
              <span className="text-white text-xl font-bold">{sponsorshipStats.pendingOffers}</span>
            </div>
            <p className="text-gray-400 text-sm">Pending Offers</p>
          </div>
        </div>
        <div className="mt-4 text-center">
          <p className="text-gray-400 text-sm">Build valuable partnerships and maximize your team's revenue potential.</p>
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
            onClick={() => setActiveTab('sponsor_wall')}
            className={`py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
              activeTab === 'sponsor_wall'
                ? 'bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] text-white shadow-lg'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Sponsor Wall
          </button>
          <button
            onClick={() => setActiveTab('marketplace')}
            className={`py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
              activeTab === 'marketplace'
                ? 'bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] text-white shadow-lg'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Marketplace
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
        </div>
      </motion.div>

      {/* Tab Content */}
      {activeTab === 'sponsor_wall' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Sponsor Wall Header */}
          <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <FaStar className="text-yellow-400 text-xl" />
              <div>
                <h3 className="text-white text-xl font-bold">Official Sponsor Wall</h3>
                <p className="text-gray-400">Showcase your premium sponsorship partnerships</p>
              </div>
            </div>
            <div className="bg-blue-600/20 border border-blue-400/30 rounded-lg p-4">
              <p className="text-blue-300 text-sm">
                This sponsor wall is visible to all fans and displays your most valuable partnerships.
                Higher-tier sponsors get premium placement and enhanced visibility.
              </p>
            </div>
          </div>

          {/* Current Sponsors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sponsorships.map((sponsor) => (
              <div
                key={sponsor.id}
                className={`bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border-2 shadow-2xl p-6 relative overflow-hidden ${getTierColor(sponsor.tier)}`}
              >
                {/* Tier Badge */}
                <div className="absolute top-4 right-4 flex items-center gap-1 bg-black/50 rounded-full px-3 py-1">
                  {getTierIcon(sponsor.tier)}
                  <span className="text-xs font-semibold capitalize">{sponsor.tier}</span>
                </div>

                {/* Sponsor Logo & Info */}
                <div className="text-center mb-4">
                  <div className="text-6xl mb-3">{sponsor.logo}</div>
                  <h4 className="text-white text-xl font-bold mb-1">{sponsor.sponsor}</h4>
                  <p className="text-gray-400 text-sm">{sponsor.type}</p>
                </div>

                {/* Deal Details */}
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Value:</span>
                    <span className="text-green-400 font-bold">${(sponsor.dealValue / 1000000).toFixed(1)}M</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Duration:</span>
                    <span className="text-white">{sponsor.duration}</span>
                  </div>
                </div>

                {/* Benefits */}
                <div className="mb-4">
                  <p className="text-gray-400 text-sm mb-2">Benefits:</p>
                  <div className="flex flex-wrap gap-1">
                    {sponsor.benefits.slice(0, 2).map((benefit, idx) => (
                      <span key={idx} className="bg-[#f64c68]/20 text-[#f64c68] text-xs px-2 py-1 rounded-full">
                        {benefit}
                      </span>
                    ))}
                    {sponsor.benefits.length > 2 && (
                      <span className="bg-gray-600/20 text-gray-400 text-xs px-2 py-1 rounded-full">
                        +{sponsor.benefits.length - 2} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center justify-center">
                  <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-400/10 border border-green-400/30">
                    <FaCheckCircle className="text-green-400 text-sm" />
                    <span className="text-green-400 text-sm font-medium">Active</span>
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Add New Sponsor Slot */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border-2 border-dashed border-gray-600 shadow-2xl p-6 text-center cursor-pointer hover:border-[#f64c68] transition-all duration-300"
               onClick={() => setShowCreateDeal(true)}>
            <FaPlus className="text-gray-400 text-4xl mx-auto mb-4" />
            <h4 className="text-white text-xl font-bold mb-2">Add New Sponsor</h4>
            <p className="text-gray-400">Find and partner with new sponsors to grow your revenue</p>
          </div>
        </motion.div>
      )}

      {activeTab === 'marketplace' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Marketplace Header */}
          <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <FaUsers className="text-blue-400 text-xl" />
                <div>
                  <h3 className="text-white text-xl font-bold">Sponsorship Marketplace</h3>
                  <p className="text-gray-400">Discover brands looking for partnership opportunities</p>
                </div>
              </div>
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search sponsors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-[#1e2139] text-white pl-10 pr-4 py-2 rounded-lg border border-[#286db24c] focus:outline-none focus:border-[#f64c68] w-64"
                />
              </div>
            </div>
            <div className="bg-green-600/20 border border-green-400/30 rounded-lg p-4">
              <p className="text-green-300 text-sm">
                Connect directly with sponsors interested in your team. Negotiate deals and formalize partnerships within the platform.
              </p>
            </div>
          </div>

          {/* Sponsors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredMarketplace.map((sponsor) => (
              <div key={sponsor.id} className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{sponsor.logo}</div>
                    <div>
                      <h4 className="text-white text-xl font-bold">{sponsor.company}</h4>
                      <p className="text-gray-400">{sponsor.industry}</p>
                    </div>
                  </div>
                  <span className="bg-blue-600/20 text-blue-400 text-sm px-3 py-1 rounded-full">
                    ${sponsor.budget.toLocaleString()}/year
                  </span>
                </div>

                <div className="mb-4">
                  <p className="text-gray-300 mb-2">{sponsor.message}</p>
                  <p className="text-sm text-gray-400">
                    <strong>Target:</strong> {sponsor.targetType}
                  </p>
                </div>

                <div className="mb-4">
                  <p className="text-gray-400 text-sm mb-2">Contact:</p>
                  <p className="text-white text-sm">{sponsor.contactPerson}</p>
                  <p className="text-gray-400 text-sm">{sponsor.contactEmail}</p>
                </div>

                <button
                  onClick={() => handleContactSponsor(sponsor)}
                  className="w-full bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <FaHandshake />
                  Initiate Partnership
                </button>
              </div>
            ))}
          </div>
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
              <h3 className="text-white text-xl font-bold mb-6">Sponsorship Revenue</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-[#1e2139] rounded-lg">
                  <span className="text-gray-300">Total Annual Value</span>
                  <span className="text-green-400 font-bold">${(sponsorshipStats.totalValue / 1000000).toFixed(1)}M</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-[#1e2139] rounded-lg">
                  <span className="text-gray-300">Average per Sponsor</span>
                  <span className="text-white font-bold">${(sponsorshipStats.totalValue / sponsorshipStats.totalSponsors / 1000000).toFixed(1)}M</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-[#1e2139] rounded-lg">
                  <span className="text-gray-300">Revenue Growth</span>
                  <span className="text-blue-400 font-bold">+23%</span>
                </div>
              </div>
            </div>

            {/* Partnership Analytics */}
            <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl p-6">
              <h3 className="text-white text-xl font-bold mb-6">Partnership Overview</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-[#1e2139] rounded-lg">
                  <span className="text-gray-300">Active Partnerships</span>
                  <span className="text-white font-bold">{sponsorshipStats.activeDeals}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-[#1e2139] rounded-lg">
                  <span className="text-gray-300">Pending Offers</span>
                  <span className="text-yellow-400 font-bold">{sponsorshipStats.pendingOffers}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-[#1e2139] rounded-lg">
                  <span className="text-gray-300">Response Rate</span>
                  <span className="text-green-400 font-bold">87%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sponsor Distribution by Tier */}
          <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl p-6">
            <h3 className="text-white text-xl font-bold mb-6">Sponsor Distribution</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-purple-600/20 rounded-lg border border-purple-400/30">
                <FaCrown className="text-purple-400 text-3xl mx-auto mb-2" />
                <div className="text-white text-2xl font-bold">1</div>
                <div className="text-purple-400 text-sm">Platinum Sponsors</div>
              </div>
              <div className="text-center p-4 bg-yellow-600/20 rounded-lg border border-yellow-400/30">
                <FaTrophy className="text-yellow-400 text-3xl mx-auto mb-2" />
                <div className="text-white text-2xl font-bold">1</div>
                <div className="text-yellow-400 text-sm">Gold Sponsors</div>
              </div>
              <div className="text-center p-4 bg-gray-600/20 rounded-lg border border-gray-400/30">
                <FaMedal className="text-gray-400 text-3xl mx-auto mb-2" />
                <div className="text-white text-2xl font-bold">1</div>
                <div className="text-gray-400 text-sm">Silver Sponsors</div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Incoming Offers Modal */}
      {showIncomingOffers && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowIncomingOffers(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-[#286db24c]">
              <div className="flex items-center justify-between">
                <h3 className="text-white text-xl font-bold">Incoming Sponsorship Offers</h3>
                <button
                  onClick={() => setShowIncomingOffers(false)}
                  className="text-gray-400 hover:text-white p-2"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                {incomingOffers.map((offer) => (
                  <div key={offer.id} className="bg-[#1e2139] rounded-xl p-6 border border-[#286db24c]">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="text-4xl">{offer.logo}</div>
                        <div>
                          <h4 className="text-white text-xl font-bold">{offer.sponsor}</h4>
                          <p className="text-gray-400">{offer.type}</p>
                          <p className="text-sm text-gray-500">Received {offer.receivedDate}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-green-400 font-bold text-xl">${offer.proposedValue.toLocaleString()}</div>
                        <div className="text-gray-400 text-sm">{offer.proposedDuration}</div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-gray-300 mb-3">{offer.message}</p>
                      <div>
                        <p className="text-gray-400 text-sm mb-2">Proposed Benefits:</p>
                        <div className="flex flex-wrap gap-2">
                          {offer.benefits.map((benefit, idx) => (
                            <span key={idx} className="bg-blue-600/20 text-blue-400 text-sm px-3 py-1 rounded-full">
                              {benefit}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => handleAcceptOffer(offer.id)}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <FaCheckCircle />
                        Accept Offer
                      </button>
                      <button
                        onClick={() => handleRejectOffer(offer.id)}
                        className="px-6 py-3 border border-red-600 text-red-400 rounded-lg hover:bg-red-600 hover:text-white transition-all duration-300"
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Create Deal Modal */}
      {showCreateDeal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowCreateDeal(false)}
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
                <h3 className="text-white text-xl font-bold">Seek New Sponsors</h3>
                <button
                  onClick={() => setShowCreateDeal(false)}
                  className="text-gray-400 hover:text-white p-2"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="bg-blue-600/20 border border-blue-400/30 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <FaInfoCircle className="text-blue-400 text-lg mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-blue-400 font-medium mb-1">Sponsorship Opportunities</p>
                    <p className="text-blue-300 text-sm">
                      Create a sponsorship profile to attract potential partners. Brands will be able to view your team's profile and send partnership offers.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Team Overview</label>
                <textarea
                  rows={4}
                  placeholder="Describe your team, achievements, fanbase size, and sponsorship opportunities..."
                  className="w-full bg-[#1e2139] text-white px-4 py-3 rounded-lg border border-[#286db24c] focus:outline-none focus:border-[#f64c68] resize-none"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Sponsorship Packages</label>
                <div className="space-y-3">
                  <div className="bg-[#1e2139] p-4 rounded-lg border border-[#286db24c]">
                    <h5 className="text-white font-semibold mb-2">Platinum Package - $2.5M/year</h5>
                    <ul className="text-gray-400 text-sm space-y-1">
                      <li>• Official kit sponsorship</li>
                      <li>• Stadium naming rights</li>
                      <li>• Premium brand visibility</li>
                    </ul>
                  </div>
                  <div className="bg-[#1e2139] p-4 rounded-lg border border-[#286db24c]">
                    <h5 className="text-white font-semibold mb-2">Gold Package - $500K/year</h5>
                    <ul className="text-gray-400 text-sm space-y-1">
                      <li>• Official beverage partnership</li>
                      <li>• Social media promotions</li>
                      <li>• Fan zone activation</li>
                    </ul>
                  </div>
                  <div className="bg-[#1e2139] p-4 rounded-lg border border-[#286db24c]">
                    <h5 className="text-white font-semibold mb-2">Silver Package - $200K/year</h5>
                    <ul className="text-gray-400 text-sm space-y-1">
                      <li>• Equipment sponsorship</li>
                      <li>• Training facility branding</li>
                      <li>• Digital presence</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => setShowCreateDeal(false)}
                  className="flex-1 bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <FaEye />
                  Publish Profile
                </button>
                <button
                  onClick={() => setShowCreateDeal(false)}
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

export default ClubTeamUniSponsorships;
