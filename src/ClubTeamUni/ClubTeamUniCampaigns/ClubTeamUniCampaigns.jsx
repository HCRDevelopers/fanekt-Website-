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
  FaChartBar
} from 'react-icons/fa';

function ClubTeamUniCampaigns() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  // Mock data for campaigns targeting this team's fans
  const [teamCampaigns, setTeamCampaigns] = useState([
    {
      id: 1,
      title: 'Real Madrid Fan Appreciation',
      sponsor: 'Nike Global',
      description: 'Vote for your favorite Real Madrid player',
      status: 'active',
      duration: '2024-01-20 to 2024-01-30',
      totalVotes: 15420,
      teamVotes: 8750, // Votes from this team's fans
      teamShare: 4375, // 50% of revenue from team fan votes
      revenue: 8750, // Total campaign revenue
      fanEngagement: 67.5, // % of team's fans who participated
      options: [
        { id: 1, name: 'Cristiano Ronaldo', teamVotes: 4200, percentage: 48.0 },
        { id: 2, name: 'Vinicius Jr', teamVotes: 4550, percentage: 52.0 }
      ]
    },
    {
      id: 2,
      title: 'Barcelona Youth Program',
      sponsor: 'Adidas Partnership',
      description: 'Support Barcelona\'s youth development',
      status: 'active',
      duration: '2024-01-18 to 2024-01-28',
      totalVotes: 8920,
      teamVotes: 6230,
      teamShare: 3115,
      revenue: 6230,
      fanEngagement: 71.2,
      options: [
        { id: 1, name: 'Youth Academy Expansion', teamVotes: 6230, percentage: 100.0 }
      ]
    },
    {
      id: 3,
      title: 'Premier League All-Stars',
      sponsor: 'Under Armour',
      description: 'Vote for the ultimate Premier League team',
      status: 'ended',
      duration: '2024-01-15 to 2024-01-25',
      totalVotes: 23150,
      teamVotes: 11230,
      teamShare: 5615,
      revenue: 11230,
      fanEngagement: 85.3,
      winner: 'Manchester United Dominance',
      options: [
        { id: 1, name: 'Manchester United Dominance (Winner)', teamVotes: 11230, percentage: 100.0 }
      ]
    },
    // Pending campaigns requiring approval
    {
      id: 4,
      title: 'Champions League Glory',
      sponsor: 'Puma Sports',
      description: 'Celebrate Champions League achievements with exclusive fan rewards',
      status: 'pending',
      duration: '2024-02-01 to 2024-02-15',
      totalVotes: 0,
      teamVotes: 0,
      teamShare: 0,
      revenue: 0,
      fanEngagement: 0,
      options: [
        { id: 1, name: 'Champions League Trophy Display', teamVotes: 0, percentage: 0 },
        { id: 2, name: 'Fan Festival Celebration', teamVotes: 0, percentage: 0 },
        { id: 3, name: 'Player Victory Parade', teamVotes: 0, percentage: 0 }
      ]
    },
    {
      id: 5,
      title: 'Youth Development Initiative',
      sponsor: 'Adidas Global',
      description: 'Support our youth academy development programs',
      status: 'pending',
      duration: '2024-02-05 to 2024-02-20',
      totalVotes: 0,
      teamVotes: 0,
      teamShare: 0,
      revenue: 0,
      fanEngagement: 0,
      options: [
        { id: 1, name: 'New Training Facilities', teamVotes: 0, percentage: 0 },
        { id: 2, name: 'Youth Coach Development', teamVotes: 0, percentage: 0 }
      ]
    },
    // Rejected campaigns
    {
      id: 6,
      title: 'Rival Team Merchandise',
      sponsor: 'Competitor Brand',
      description: 'Cross-promotion with rival team merchandise',
      status: 'rejected',
      duration: '2024-01-10 to 2024-01-25',
      totalVotes: 0,
      teamVotes: 0,
      teamShare: 0,
      revenue: 0,
      fanEngagement: 0,
      options: [
        { id: 1, name: 'Joint Merchandise Line', teamVotes: 0, percentage: 0 }
      ]
    }
  ]);

  const campaignStats = {
    totalCampaigns: teamCampaigns.length,
    activeCampaigns: teamCampaigns.filter(c => c.status === 'active').length,
    pendingCampaigns: teamCampaigns.filter(c => c.status === 'pending').length,
    totalRevenue: teamCampaigns.reduce((sum, c) => sum + c.revenue, 0),
    totalTeamShare: teamCampaigns.reduce((sum, c) => sum + c.teamShare, 0),
    totalTeamVotes: teamCampaigns.reduce((sum, c) => sum + c.teamVotes, 0),
    averageEngagement: (teamCampaigns.reduce((sum, c) => sum + c.fanEngagement, 0) / teamCampaigns.length).toFixed(1)
  };

  const handleAcceptCampaign = (campaignId) => {
    setTeamCampaigns(prevCampaigns =>
      prevCampaigns.map(campaign =>
        campaign.id === campaignId
          ? { ...campaign, status: 'active' }
          : campaign
      )
    );
  };

  const handleRejectCampaign = (campaignId) => {
    setTeamCampaigns(prevCampaigns =>
      prevCampaigns.map(campaign =>
        campaign.id === campaignId
          ? { ...campaign, status: 'rejected' }
          : campaign
      )
    );
  };

  return (
    <div className="min-h-screen lg:ml-[290px] md:px-4 px-2 lg:px-8 py-6 pt-28 lg:pt-6">
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
          Monitor campaigns targeting your fans and track your revenue sharing
        </p>
      </motion.div>

      {/* Revenue Stats Overview */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-r from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl md:p-6 p-2 mb-8"
      >
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
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
              <span className="text-white text-xl font-bold">{campaignStats.totalTeamShare.toLocaleString()} FNKT</span>
            </div>
            <p className="text-gray-400 text-sm">Your Revenue Share</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <FaVoteYea className="text-blue-400 text-2xl mr-2" />
              <span className="text-white text-xl font-bold">{campaignStats.totalTeamVotes.toLocaleString()}</span>
            </div>
            <p className="text-gray-400 text-sm">Fan Votes</p>
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
          <p className="text-gray-400 text-sm">You receive 50% of FNKT generated from campaigns where your fans participate and vote.</p>
        </div>
      </motion.div>

      {/* Navigation Tabs */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-6"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 bg-[#1e2139] p-1 rounded-xl border border-[#286db24c]">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-2 md:px-6 px-2 border rounded-lg font-semibold transition-all duration-300 ${activeTab === 'overview'
                ? 'bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] text-white shadow-lg'
                : 'text-gray-400 hover:text-white'
              }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('pending')}
            className={`py-2 md:px-6 px-2 border rounded-lg font-semibold transition-all duration-300 relative ${activeTab === 'pending'
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
            className={`py-2 md:px-6 px-2 border rounded-lg font-semibold transition-all duration-300 ${activeTab === 'campaigns'
                ? 'bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] text-white shadow-lg'
                : 'text-gray-400 hover:text-white'
              }`}
          >
            Campaign Details
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${activeTab === 'analytics'
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
            <h3 className="text-white text-xl font-bold mb-6">Campaign Performance</h3>
            <div className="space-y-4">
              {teamCampaigns.map((campaign) => (
                <div key={campaign.id} className="flex md:items-center justify-between md:flex-row flex-col bg-[#1e2139] rounded-xl md:p-4 p-2 border border-[#286db24c]">
                  <div className="flex items-center md:gap-4 gap-2">
                    <div className="w-12 h-12 bg-[#286db24c] rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">{campaign.title.charAt(0)}</span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">{campaign.title}</h4>
                      <p className="text-gray-400 text-sm">{campaign.sponsor} • {campaign.teamVotes.toLocaleString()} fan votes</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[#f64c68] font-bold">{campaign.teamShare.toLocaleString()} FNKT</div>
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
              <h3 className="text-white text-xl font-bold mb-6">Revenue Breakdown</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Total Campaign Revenue</span>
                  <span className="text-white font-bold">{campaignStats.totalRevenue.toLocaleString()} FNKT</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Your 50% Share</span>
                  <span className="text-[#f64c68] font-bold">{campaignStats.totalTeamShare.toLocaleString()} FNKT</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Sponsor Share</span>
                  <span className="text-blue-400 font-bold">{campaignStats.totalRevenue.toLocaleString()} FNKT</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl md:p-6 p-2">
              <h3 className="text-white text-xl font-bold mb-6">Fan Engagement</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Total Fan Votes</span>
                  <span className="text-white font-bold">{campaignStats.totalTeamVotes.toLocaleString()}</span>
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
            <div className="flex items-center md:gap-3 gap-2 mb-4">
              <FaInfoCircle className="text-yellow-400 text-xl" />
              <h3 className="text-white md:text-xl text-lg font-bold">Pending Campaign Approvals</h3>
            </div>
            <div>
              <p className="text-gray-400">Review and approve campaigns targeting your fans before they go live</p>
            </div>
          </div>
          <div className="bg-yellow-600/20 border border-yellow-400/30 rounded-lg p-4">
            <p className="text-yellow-300 text-sm">
              <strong>Important:</strong> Only approved campaigns will generate revenue sharing for your team.
              You receive 50% of all revenue from campaigns where your fans participate and vote.
            </p>
          </div>

          {/* Pending Campaigns List */}
          {teamCampaigns.filter(c => c.status === 'pending').length > 0 ? (
            <div className="space-y-4">
              {teamCampaigns.filter(c => c.status === 'pending').map((campaign) => (
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
          {teamCampaigns.map((campaign) => (
            <div key={campaign.id} className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl md:p-6 p-2">
              <div className="flex md:items-start justify-between md:flex-row flex-col gap-3 mb-6">
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
                  <div className="text-[#f64c68] font-bold text-2xl">{campaign.teamShare.toLocaleString()} FNKT</div>
                  <div className="text-gray-400 text-sm">Your revenue share</div>
                </div>
              </div>

              {/* Campaign Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-[#1e2139] rounded-lg p-4 border border-[#286db24c]">
                  <div className="flex items-center gap-3">
                    <FaVoteYea className="text-blue-400" />
                    <div>
                      <div className="text-white font-bold">{campaign.teamVotes.toLocaleString()}</div>
                      <div className="text-gray-400 text-sm">Your fan votes</div>
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
                <h4 className="text-white font-semibold mb-4">Voting Results (Your Fans)</h4>
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
                          <div className="text-white font-semibold">{option.teamVotes.toLocaleString()}</div>
                          <div className="text-gray-400 text-sm">{option.percentage}% of your fans</div>
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
                      This campaign generated {campaign.revenue.toLocaleString()} FNKT in total revenue.
                      As {campaign.teamVotes.toLocaleString()} of your fans participated, you receive 50% share: <strong className="text-[#f64c68]">{campaign.teamShare.toLocaleString()} FNKT</strong>
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
            <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl md:p-6 p-2">
              <h3 className="text-white text-xl font-bold mb-3">Revenue Analytics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-[#1e2139] rounded-lg">
                  <span className="text-gray-300">Total Revenue Earned</span>
                  <span className="text-[#f64c68] font-bold">{campaignStats.totalTeamShare.toLocaleString()} FNKT</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-[#1e2139] rounded-lg">
                  <span className="text-gray-300">Average per Campaign</span>
                  <span className="text-white font-bold">{(campaignStats.totalTeamShare / campaignStats.totalCampaigns).toFixed(0)} FNKT</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-[#1e2139] rounded-lg">
                  <span className="text-gray-300">Best Performing</span>
                  <span className="text-green-400 font-bold">{Math.max(...teamCampaigns.map(c => c.teamShare)).toLocaleString()} FNKT</span>
                </div>
              </div>
            </div>

            {/* Engagement Analytics */}
            <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl md:p-6 p-2">
              <h3 className="text-white text-xl font-bold mb-3">Fan Engagement Analytics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-[#1e2139] rounded-lg">
                  <span className="text-gray-300">Total Fan Votes</span>
                  <span className="text-blue-400 font-bold">{campaignStats.totalTeamVotes.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-[#1e2139] rounded-lg">
                  <span className="text-gray-300">Average Engagement</span>
                  <span className="text-green-400 font-bold">{campaignStats.averageEngagement}%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-[#1e2139] rounded-lg">
                  <span className="text-gray-300">Campaigns with High Engagement</span>
                  <span className="text-purple-400 font-bold">{teamCampaigns.filter(c => c.fanEngagement > 70).length}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Campaign Performance Chart */}
          <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl md:p-6 p-2">
            <h3 className="text-white text-xl font-bold mb-3">Campaign Performance Comparison</h3>
            <div className="space-y-4">
              {teamCampaigns.map((campaign) => (
                <div key={campaign.id} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300 truncate md:text-[18px] text-[12px]">{campaign.title}</span>
                    <span className="text-white font-medium md:text-[18px] text-[12px]">{campaign.teamShare.toLocaleString()} FNKT earned</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <div
                      className="bg-[#f64c68] h-3 rounded-full"
                      style={{ width: `${(campaign.teamShare / Math.max(...teamCampaigns.map(c => c.teamShare))) * 100}%` }}
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

export default ClubTeamUniCampaigns;
