import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FaCoins,
  FaUsers,
  FaTrophy,
  FaChartLine,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaPercentage,
  FaVoteYea,
  FaInfoCircle,
  FaEye,
  FaStar,
  FaHandshake,
  FaChartBar,
  FaUser
} from 'react-icons/fa';

function AthleteOrVipCampaigns() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  // Mock data for campaigns targeting this athlete
  const [athleteCampaigns, setAthleteCampaigns] = useState([
    {
      id: 1,
      title: 'Messi Fan Appreciation',
      sponsor: 'Adidas Global',
      description: 'Celebrate Lionel Messi\'s legacy with exclusive fan experiences',
      status: 'active',
      duration: '2024-01-20 to 2024-01-30',
      totalVotes: 45200,
      athleteVotes: 23400, // Votes where this athlete was mentioned/selected
      athleteShare: 11700, // 50% of revenue from athlete-related votes
      revenue: 23400, // Total campaign revenue from athlete votes
      fanEngagement: 78.5, // % of athlete's fans who participated
      options: [
        { id: 1, name: 'Lionel Messi Tribute', athleteVotes: 15600, percentage: 66.7 },
        { id: 2, name: 'Barcelona Legends', athleteVotes: 7800, percentage: 33.3 }
      ]
    },
    {
      id: 2,
      title: 'Champions League Heroes',
      sponsor: 'Nike Football',
      description: 'Vote for Champions League legends and their greatest moments',
      status: 'active',
      duration: '2024-01-18 to 2024-01-28',
      totalVotes: 38700,
      athleteVotes: 18900,
      athleteShare: 9450,
      revenue: 18900,
      fanEngagement: 72.3,
      options: [
        { id: 1, name: 'Messi Magic Moments', athleteVotes: 13200, percentage: 69.8 },
        { id: 2, name: 'CR7 Comebacks', athleteVotes: 5700, percentage: 30.2 }
      ]
    },
    {
      id: 3,
      title: 'Ballon d\'Or Winners',
      sponsor: 'Puma Sports',
      description: 'Celebrate the greatest individual football achievements',
      status: 'ended',
      duration: '2024-01-15 to 2024-01-25',
      totalVotes: 52100,
      athleteVotes: 31200,
      athleteShare: 15600,
      revenue: 31200,
      fanEngagement: 85.7,
      winner: 'Messi Magic Moments',
      options: [
        { id: 1, name: 'Messi Magic Moments (Winner)', athleteVotes: 21800, percentage: 69.9 },
        { id: 2, name: 'Ronaldo Records', athleteVotes: 9400, percentage: 30.1 }
      ]
    },
    // Pending campaigns requiring approval
    {
      id: 4,
      title: 'Future Football Stars',
      sponsor: 'Adidas Future',
      description: 'Vote for emerging talents who will shape the future of football',
      status: 'pending',
      duration: '2024-02-01 to 2024-02-15',
      totalVotes: 0,
      athleteVotes: 0,
      athleteShare: 0,
      revenue: 0,
      fanEngagement: 0,
      options: [
        { id: 1, name: 'Next Generation Messi', athleteVotes: 0, percentage: 0 },
        { id: 2, name: 'Young Champions', athleteVotes: 0, percentage: 0 },
        { id: 3, name: 'Rising Stars Showcase', athleteVotes: 0, percentage: 0 }
      ]
    },
    {
      id: 5,
      title: 'Football Legacy',
      sponsor: 'Nike Heritage',
      description: 'Honor the legends who changed the beautiful game forever',
      status: 'pending',
      duration: '2024-02-05 to 2024-02-20',
      totalVotes: 0,
      athleteVotes: 0,
      athleteShare: 0,
      revenue: 0,
      fanEngagement: 0,
      options: [
        { id: 1, name: 'Messi\'s Barcelona Era', athleteVotes: 0, percentage: 0 },
        { id: 2, name: 'Global Impact Stories', athleteVotes: 0, percentage: 0 }
      ]
    },
    // Rejected campaigns
    {
      id: 6,
      title: 'Rivalry Showdown',
      sponsor: 'Competitor Brand',
      description: 'Direct comparison campaigns with rival athletes',
      status: 'rejected',
      duration: '2024-01-10 to 2024-01-25',
      totalVotes: 0,
      athleteVotes: 0,
      athleteShare: 0,
      revenue: 0,
      fanEngagement: 0,
      options: [
        { id: 1, name: 'Messi vs Ronaldo', athleteVotes: 0, percentage: 0 }
      ]
    }
  ]);

  const campaignStats = {
    totalCampaigns: athleteCampaigns.length,
    activeCampaigns: athleteCampaigns.filter(c => c.status === 'active').length,
    pendingCampaigns: athleteCampaigns.filter(c => c.status === 'pending').length,
    totalRevenue: athleteCampaigns.reduce((sum, c) => sum + c.revenue, 0),
    totalAthleteShare: athleteCampaigns.reduce((sum, c) => sum + c.athleteShare, 0),
    totalAthleteVotes: athleteCampaigns.reduce((sum, c) => sum + c.athleteVotes, 0),
    averageEngagement: (athleteCampaigns.reduce((sum, c) => sum + c.fanEngagement, 0) / athleteCampaigns.length).toFixed(1)
  };

  const handleAcceptCampaign = (campaignId) => {
    setAthleteCampaigns(prevCampaigns =>
      prevCampaigns.map(campaign =>
        campaign.id === campaignId
          ? { ...campaign, status: 'active' }
          : campaign
      )
    );
  };

  const handleRejectCampaign = (campaignId) => {
    setAthleteCampaigns(prevCampaigns =>
      prevCampaigns.map(campaign =>
        campaign.id === campaignId
          ? { ...campaign, status: 'rejected' }
          : campaign
      )
    );
  };

  return (
    <div className="min-h-screen lg:ml-[290px] px-4 lg:px-8 py-6 pt-28 lg:pt-6">
      {/* Header Section */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-8"
      >
        <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
          Campaign Revenue
        </h1>
        <p className="text-gray-400 text-lg">
          Monitor campaigns targeting you and track your personal revenue sharing
        </p>
      </motion.div>

      {/* Revenue Stats Overview */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-r from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl md:p-6 p-2 mb-8"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-5 grid-cols-1 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <FaTrophy className="text-[#f64c68] text-2xl mr-2" />
              <span className="text-white text-xl font-bold">{campaignStats.totalCampaigns}</span>
            </div>
            <p className="text-gray-400 text-sm">Active Campaigns</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <FaCoins className="text-yellow-400 text-2xl mr-2" />
              <span className="text-white text-xl font-bold">{campaignStats.totalAthleteShare.toLocaleString()} FNKT</span>
            </div>
            <p className="text-gray-400 text-sm">Your Revenue Share</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <FaVoteYea className="text-blue-400 text-2xl mr-2" />
              <span className="text-white text-xl font-bold">{campaignStats.totalAthleteVotes.toLocaleString()}</span>
            </div>
            <p className="text-gray-400 text-sm">Your Fan Votes</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <FaUsers className="text-green-400 text-2xl mr-2" />
              <span className="text-white text-xl font-bold">{campaignStats.averageEngagement}%</span>
            </div>
            <p className="text-gray-400 text-sm">Avg Fan Engagement</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <FaChartLine className="text-purple-400 text-2xl mr-2" />
              <span className="text-white text-xl font-bold">{campaignStats.totalRevenue.toLocaleString()} FNKT</span>
            </div>
            <p className="text-gray-400 text-sm">Campaign Revenue</p>
          </div>
        </div>
        <div className="mt-4 text-center">
          <p className="text-gray-400 text-sm">You receive 50% of FNKT generated from campaigns where fans vote for you or your achievements.</p>
        </div>
      </motion.div>

      {/* Navigation Tabs */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-6"
      >
        <div className="lg:grid-cols-4 grid grid-cols-2 gap-2 bg-[#1e2139] p-1 rounded-xl border border-[#286db24c]">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 md:px-6 px-2 border md:text-[16px] text-[13px] rounded-lg font-semibold transition-all duration-300 ${activeTab === 'overview'
              ? 'bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] text-white shadow-lg'
              : 'text-gray-400 hover:text-white'
              }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('pending')}
            className={`py-3 md:px-6 px-2 border md:text-[16px] text-[13px] rounded-lg font-semibold transition-all duration-300 relative ${activeTab === 'pending'
              ? 'bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] text-white shadow-lg'
              : 'text-gray-400 hover:text-white'
              }`}
          >
            Pending Approvals
            {campaignStats.pendingCampaigns > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {campaignStats.pendingCampaigns}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('campaigns')}
            className={`py-3 md:px-6 px-2 border md:text-[16px] text-[13px] rounded-lg font-semibold transition-all duration-300 ${activeTab === 'campaigns'
              ? 'bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] text-white shadow-lg'
              : 'text-gray-400 hover:text-white'
              }`}
          >
            Campaign Details
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`py-3 md:px-6 px-2 border md:text-[16px] text-[13px] rounded-lg font-semibold transition-all duration-300 ${activeTab === 'analytics'
              ? 'bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] text-white shadow-lg'
              : 'text-gray-400 hover:text-white'
              }`}
          >
            Analytics
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
          {/* Recent Campaign Performance */}
          <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl md:p-6 p-2">
            <h3 className="text-white text-xl font-bold mb-3">Your Campaign Performance</h3>
            <div className="space-y-4">
              {athleteCampaigns.map((campaign) => (
                <div key={campaign.id} className="flex md:items-center justify-between md:flex-row flex-col bg-[#1e2139] rounded-xl md:p-4 p-2 border border-[#286db24c]">
                  <div className="flex items-center md:gap-4 gap-2">
                    <div className="w-12 h-12 bg-[#286db24c] rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">{campaign.title.charAt(0)}</span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">{campaign.title}</h4>
                      <p className="text-gray-400 text-sm">{campaign.sponsor} • {campaign.athleteVotes.toLocaleString()} votes for you</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[#f64c68] font-bold">{campaign.athleteShare.toLocaleString()} FNKT</div>
                    <div className="text-gray-400 text-sm">Your share</div>
                    <div className="text-green-400 text-sm">{campaign.fanEngagement}% engagement</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl md:p-6 p-2">
              <h3 className="text-white text-xl font-bold mb-3">Revenue Breakdown</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Total Campaign Revenue</span>
                  <span className="text-white font-bold">{campaignStats.totalRevenue.toLocaleString()} FNKT</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Your 50% Share</span>
                  <span className="text-[#f64c68] font-bold">{campaignStats.totalAthleteShare.toLocaleString()} FNKT</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Platform Share</span>
                  <span className="text-blue-400 font-bold">{campaignStats.totalRevenue.toLocaleString()} FNKT</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl md:p-6 p-2">
              <h3 className="text-white text-xl font-bold mb-3">Fan Engagement</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Total Votes for You</span>
                  <span className="text-white font-bold">{campaignStats.totalAthleteVotes.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Average Engagement</span>
                  <span className="text-green-400 font-bold">{campaignStats.averageEngagement}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Active Campaigns</span>
                  <span className="text-blue-400 font-bold">{campaignStats.activeCampaigns}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {activeTab === 'pending' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Pending Campaigns Header */}
          <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl md:p-6 p-2">
            <div className="flex items-start gap-3 mb-4">
              <FaInfoCircle className="text-yellow-400 text-xl" />
              <h3 className="text-white text-xl font-bold">Pending Campaign Approvals</h3>
            </div>
            <div>
              <p className="text-gray-400">Review and approve campaigns that mention or feature you</p>
            </div>
          </div>
          <div className="bg-yellow-600/20 border border-yellow-400/30 rounded-lg p-4">
            <p className="text-yellow-300 text-sm">
              <strong>Important:</strong> Only approved campaigns will generate revenue sharing for you.
              You receive 50% of all FNKT generated from votes where fans choose you or your achievements.
            </p>
          </div>

          {/* Pending Campaigns List */}
          {athleteCampaigns.filter(c => c.status === 'pending').length > 0 ? (
            <div className="space-y-4">
              {athleteCampaigns.filter(c => c.status === 'pending').map((campaign) => (
                <div key={campaign.id} className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-yellow-400/50 shadow-2xl md:p-6 p-2">
                  <div className="flex md:items-start justify-between md:flex-row flex-col-reverse gap-3 mb-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-white text-xl font-bold">{campaign.title}</h3>
                        <span className="md:flex hidden items-center gap-2 px-3 py-1 rounded-full text-yellow-400 bg-yellow-400/10">
                          <span className="text-sm font-medium">Pending Approval</span>
                        </span>
                      </div>
                      <p className="text-gray-300 mb-3">{campaign.description}</p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                          <FaUsers className="text-blue-400" />
                          <span>Sponsored by {campaign.sponsor}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FaCalendarAlt className="text-purple-400" />
                          <span>{campaign.duration}</span>
                        </div>
                      </div>
                      <span className="md:hidden flex items-center gap-2 px-3 py-2 rounded-full text-yellow-400 bg-yellow-400/10 w-[150px] mt-2 justify-center">
                        <span className="text-sm font-medium">Pending Approval</span>
                      </span>
                    </div>
                    <div className="flex gap-3 justify-end">
                      <button
                        onClick={() => handleAcceptCampaign(campaign.id)}
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2"
                      >
                        <FaHandshake />
                        Accept
                      </button>
                      <button
                        onClick={() => handleRejectCampaign(campaign.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2"
                      >
                        <FaInfoCircle />
                        Reject
                      </button>
                    </div>
                  </div>

                  {/* Campaign Options Preview */}
                  <div className="border-t border-[#286db24c] pt-6">
                    <h4 className="text-white font-semibold mb-4">Voting Options Preview</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {campaign.options.map((option) => (
                        <div key={option.id} className="bg-[#1e2139] rounded-lg p-4 border border-[#286db24c]">
                          <span className="text-white font-medium">{option.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Potential Revenue Information */}
                  <div className="mt-6 bg-green-600/20 border border-green-400/30 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <FaCoins className="text-green-400 text-lg mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-green-400 font-medium mb-1">Potential Revenue Sharing</p>
                        <p className="text-green-300 text-sm">
                          If accepted, this campaign could generate significant revenue for your team.
                          You will receive <strong className="text-[#f64c68]">50% of all revenue</strong> generated from your fans' participation.
                          Historical data shows similar campaigns generate 5,000-15,000 FNKT in total revenue.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <FaInfoCircle className="text-gray-400 text-8xl mx-auto mb-6" />
              <h3 className="text-white text-2xl font-bold mb-4">No Pending Campaigns</h3>
              <p className="text-gray-400 text-lg">
                All campaign requests have been reviewed. New campaigns requiring approval will appear here.
              </p>
            </div>
          )}
        </motion.div>
      )}

      {activeTab === 'campaigns' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Campaign Details */}
          {athleteCampaigns.map((campaign) => (
            <div key={campaign.id} className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl md:p-6 p-2">
              <div className="flex md:items-start justify-between md:flex-row flex-col mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-white text-xl font-bold">{campaign.title}</h3>
                    <span className={`flex items-center gap-2 px-3 py-1 rounded-full ${campaign.status === 'active'
                      ? 'text-green-400 bg-green-400/10'
                      : 'text-gray-400 bg-gray-400/10'
                      }`}>
                      <span className="text-sm font-medium capitalize">{campaign.status}</span>
                    </span>
                  </div>
                  <p className="text-gray-300 mb-3">{campaign.description}</p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <FaUsers className="text-blue-400" />
                      <span>Sponsored by {campaign.sponsor}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaCalendarAlt className="text-purple-400" />
                      <span>{campaign.duration}</span>
                    </div>
                  </div>
                </div>
                <div className="ml-6 text-right">
                  <div className="text-[#f64c68] font-bold text-2xl">{campaign.athleteShare.toLocaleString()} FNKT</div>
                  <div className="text-gray-400 text-sm">Your revenue share</div>
                </div>
              </div>

              {/* Campaign Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-[#1e2139] rounded-lg p-4 border border-[#286db24c]">
                  <div className="flex items-center gap-3">
                    <FaVoteYea className="text-blue-400" />
                    <div>
                      <div className="text-white font-bold">{campaign.athleteVotes.toLocaleString()}</div>
                      <div className="text-gray-400 text-sm">Votes for you</div>
                    </div>
                  </div>
                </div>
                <div className="bg-[#1e2139] rounded-lg p-4 border border-[#286db24c]">
                  <div className="flex items-center gap-3">
                    <FaPercentage className="text-green-400" />
                    <div>
                      <div className="text-white font-bold">{campaign.fanEngagement}%</div>
                      <div className="text-gray-400 text-sm">Fan engagement</div>
                    </div>
                  </div>
                </div>
                <div className="bg-[#1e2139] rounded-lg p-4 border border-[#286db24c]">
                  <div className="flex items-center gap-3">
                    <FaMoneyBillWave className="text-yellow-400" />
                    <div>
                      <div className="text-white font-bold">{campaign.revenue.toLocaleString()} FNKT</div>
                      <div className="text-gray-400 text-sm">Campaign revenue</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Voting Results */}
              <div className="border-t border-[#286db24c] pt-6">
                <h4 className="text-white font-semibold mb-4">Voting Results (Options Featuring You)</h4>
                <div className="space-y-3">
                  {campaign.options.map((option) => (
                    <div key={option.id} className="bg-[#1e2139] rounded-lg p-4 border border-[#286db24c]">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-medium">{option.name}</span>
                        {campaign.winner === option.name && (
                          <span className="bg-yellow-600/20 text-yellow-400 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                            <FaTrophy className="text-xs" />
                            Winner
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex-1 mr-4">
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div
                              className="bg-[#f64c68] h-2 rounded-full"
                              style={{ width: `${option.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-white font-semibold">{option.athleteVotes.toLocaleString()}</div>
                          <div className="text-gray-400 text-sm">{option.percentage}% of votes</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Revenue Information */}
              <div className="mt-6 bg-blue-600/20 border border-blue-400/30 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <FaInfoCircle className="text-blue-400 text-lg mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-blue-400 font-medium mb-1">Revenue Sharing</p>
                    <p className="text-blue-300 text-sm">
                      This campaign generated {campaign.revenue.toLocaleString()} FNKT in total revenue from votes related to you.
                      You receive 50% share: <strong className="text-[#f64c68]">{campaign.athleteShare.toLocaleString()} FNKT</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          
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
            <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl lg:p-6 p-2">
              <h3 className="text-white text-xl font-bold mb-3">Revenue Analytics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-[#1e2139] rounded-lg">
                  <span className="text-gray-300">Total Revenue Earned</span>
                  <span className="text-[#f64c68] font-bold">{campaignStats.totalAthleteShare.toLocaleString()} FNKT</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-[#1e2139] rounded-lg">
                  <span className="text-gray-300">Average per Campaign</span>
                  <span className="text-white font-bold">{(campaignStats.totalAthleteShare / campaignStats.totalCampaigns).toFixed(0)} FNKT</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-[#1e2139] rounded-lg">
                  <span className="text-gray-300">Best Performing</span>
                  <span className="text-green-400 font-bold">{Math.max(...athleteCampaigns.map(c => c.athleteShare)).toLocaleString()} FNKT</span>
                </div>
              </div>
            </div>

            {/* Engagement Analytics */}
            <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl md:p-6 p-2">
              <h3 className="text-white text-xl font-bold mb-3">Fan Engagement Analytics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-[#1e2139] rounded-lg">
                  <span className="text-gray-300">Total Votes for You</span>
                  <span className="text-blue-400 font-bold">{campaignStats.totalAthleteVotes.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-[#1e2139] rounded-lg">
                  <span className="text-gray-300">Average Engagement</span>
                  <span className="text-green-400 font-bold">{campaignStats.averageEngagement}%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-[#1e2139] rounded-lg">
                  <span className="text-gray-300">Campaigns with High Engagement</span>
                  <span className="text-purple-400 font-bold">{athleteCampaigns.filter(c => c.fanEngagement > 70).length}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Campaign Performance Chart */}
          <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl md:p-6 p-2">
            <h3 className="text-white text-xl font-bold mb-6">Campaign Performance Comparison</h3>
            <div className="space-y-4">
              {athleteCampaigns.map((campaign) => (
                <div key={campaign.id} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300 truncate">{campaign.title}</span>
                    <span className="text-white font-medium">{campaign.athleteShare.toLocaleString()} FNKT earned</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <div
                      className="bg-[#f64c68] h-3 rounded-full"
                      style={{ width: `${(campaign.athleteShare / Math.max(...athleteCampaigns.map(c => c.athleteShare))) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default AthleteOrVipCampaigns;
