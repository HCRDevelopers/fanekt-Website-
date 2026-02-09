import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FaTrophy,
  FaVoteYea,
  FaClock,
  FaCheckCircle,
  FaStar,
  FaUsers,
  FaGift,
  FaInfoCircle,
  FaCalendarAlt,
  FaCoins,
  FaChartLine,
  FaFilter,
  FaSearch
} from 'react-icons/fa';

function FanCampaigns() {
  const [activeTab, setActiveTab] = useState('active');
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [voteSubmitted, setVoteSubmitted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [campaignsData, setCampaignsData] = useState([
    {
      id: 1,
      title: 'Real Madrid Fan Appreciation',
      description: 'Vote for your favorite Real Madrid player to win exclusive merchandise',
      sponsor: 'Nike Global',
      entities: ['Real Madrid', 'Cristiano Ronaldo', 'Lionel Messi'],
      reward: '100 FNKT + Exclusive Jersey',
      duration: '2024-01-20 to 2024-01-30',
      totalVotes: 15420,
      userVoted: false,
      userVoteOption: null, // Track which option user voted for
      status: 'active',
      image: null,
      options: [
        { id: 1, name: 'Cristiano Ronaldo', votes: 8750, percentage: 56.7 },
        { id: 2, name: 'Lionel Messi', votes: 4230, percentage: 27.4 },
        { id: 3, name: 'Vinicius Jr', votes: 2440, percentage: 15.8 }
      ]
    },
    {
      id: 2,
      title: 'Barcelona Youth Program',
      description: 'Support Barcelona\'s youth development initiatives',
      sponsor: 'Adidas Partnership',
      entities: ['Barcelona FC', 'Pedri', 'Gavi'],
      reward: '75 FNKT + Training Kit',
      duration: '2024-01-18 to 2024-01-28',
      totalVotes: 8920,
      userVoted: true,
      userVoteOption: 1, // User voted for "Youth Academy Expansion"
      status: 'active',
      image: null,
      options: [
        { id: 1, name: 'Youth Academy Expansion', votes: 6230, percentage: 69.8 },
        { id: 2, name: 'Training Facility Upgrade', votes: 2690, percentage: 30.2 }
      ]
    },
    {
      id: 3,
      title: 'Premier League All-Stars',
      description: 'Vote for the ultimate Premier League All-Star team',
      sponsor: 'Under Armour',
      entities: ['Manchester United', 'Chelsea FC', 'Manchester City'],
      reward: '150 FNKT + Premium Kit',
      duration: '2024-01-15 to 2024-01-25',
      totalVotes: 23150,
      userVoted: false,
      userVoteOption: null,
      status: 'active',
      image: null,
      options: [
        { id: 1, name: 'Manchester United Dominance', votes: 11230, percentage: 48.5 },
        { id: 2, name: 'Chelsea FC Revival', votes: 7890, percentage: 34.1 },
        { id: 3, name: 'Manchester City Dynasty', votes: 4030, percentage: 17.4 }
      ]
    },
    {
      id: 4,
      title: 'Olympic Dreams 2024',
      description: 'Support athletes preparing for Paris 2024 Olympics',
      sponsor: 'Puma Sports',
      entities: ['Usain Bolt', 'Simone Biles', 'Michael Phelps'],
      reward: '200 FNKT + Olympic Merchandise',
      duration: '2024-01-10 to 2024-01-20',
      totalVotes: 18750,
      userVoted: true,
      userVoteOption: 1, // User voted for "Simone Biles"
      status: 'ended',
      image: null,
      winner: 'Simone Biles',
      options: [
        { id: 1, name: 'Simone Biles (Winner)', votes: 9820, percentage: 52.4 },
        { id: 2, name: 'Michael Phelps', votes: 5670, percentage: 30.2 },
        { id: 3, name: 'Usain Bolt', votes: 3260, percentage: 17.4 }
      ]
    }
  ]);

  const campaignStats = {
    activeCampaigns: campaignsData.filter(c => c.status === 'active').length,
    totalVoted: campaignsData.filter(c => c.userVoted).length,
    totalEarned: 425, // FNKT earned
    potentialEarnings: 525 // Based on active campaigns
  };

  const handleVote = (campaignId, optionId) => {
    // Update campaign state to show user has voted and which option they chose
    setCampaignsData(prevCampaigns =>
      prevCampaigns.map(campaign =>
        campaign.id === campaignId
          ? { ...campaign, userVoted: true, userVoteOption: optionId }
          : campaign
      )
    );

    // Mock voting functionality
    console.log('Voting in campaign:', campaignId, 'for option:', optionId);
    setVoteSubmitted(true);

    // Reset success message after 3 seconds
    setTimeout(() => {
      setVoteSubmitted(false);
    }, 3000);
  };

  const handleViewCampaign = (campaign) => {
    setSelectedCampaign(campaign);
  };

  const filteredCampaigns = campaignsData.filter(campaign => {
    const matchesSearch = campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.entities.some(entity => entity.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesTab = activeTab === 'all' || campaign.status === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="min-h-screen lg:ml-[290px] px-4 lg:px-8 py-6 pt-28 lg:pt-6">
      {/* Header Section */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-8"
      >
        <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
          Fan Campaigns
        </h1>
        <p className="text-gray-400 text-lg">
          Vote in sponsor campaigns and earn rewards supporting your favorite teams and athletes
        </p>
      </motion.div>

      {/* Success Message */}
      {voteSubmitted && (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50"
        >
          <div className="px-6 py-3 rounded-lg shadow-2xl border-2 backdrop-blur-sm bg-green-600/90 border-green-400 text-white">
            <div className="flex items-center gap-3">
              <FaCheckCircle className="text-green-200 text-xl" />
              <span className="font-medium text-sm">Vote submitted successfully! 🎉</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Campaign Stats Overview */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-r from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl sm:p-6 p-2 mb-8"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <FaTrophy className="text-[#f64c68] text-2xl mr-2" />
              <span className="text-white text-2xl font-bold">{campaignStats.activeCampaigns}</span>
            </div>
            <p className="text-gray-400 text-sm">Active Campaigns</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <FaVoteYea className="text-green-400 text-2xl mr-2" />
              <span className="text-white text-2xl font-bold">{campaignStats.totalVoted}</span>
            </div>
            <p className="text-gray-400 text-sm">Campaigns Voted</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <FaCoins className="text-yellow-400 text-2xl mr-2" />
              <span className="text-white text-2xl font-bold">{campaignStats.totalEarned}</span>
            </div>
            <p className="text-gray-400 text-sm">FNKT Earned</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <FaChartLine className="text-purple-400 text-2xl mr-2" />
              <span className="text-white text-2xl font-bold">{campaignStats.potentialEarnings}</span>
            </div>
            <p className="text-gray-400 text-sm">Potential Earnings</p>
          </div>
        </div>
        <div className="mt-4 text-center">
          <p className="text-gray-400 text-sm">Vote in campaigns to earn FNKT and support your favorite entities. 50% of revenue goes to PRO accounts.</p>
        </div>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-6"
      >
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search campaigns by title or entity..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1e2139] text-white pl-10 pr-4 py-3 rounded-lg border border-[#286db24c] focus:outline-none focus:border-[#f64c68]"
            />
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 bg-[#1e2139] p-1 rounded-xl border border-[#286db24c]">
            <button
              onClick={() => setActiveTab('active')}
              className={`py-2 px-4 rounded-lg font-semibold transition-all duration-300 ${activeTab === 'active'
                ? 'bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] text-white shadow-lg'
                : 'text-gray-400 hover:text-white'
                }`}
            >
              Active
            </button>
            <button
              onClick={() => setActiveTab('ended')}
              className={`py-2 px-4 rounded-lg font-semibold transition-all duration-300 ${activeTab === 'ended'
                ? 'bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] text-white shadow-lg'
                : 'text-gray-400 hover:text-white'
                }`}
            >
              Completed
            </button>
            <button
              onClick={() => setActiveTab('all')}
              className={`py-2 px-4 rounded-lg font-semibold transition-all duration-300 ${activeTab === 'all'
                ? 'bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] text-white shadow-lg'
                : 'text-gray-400 hover:text-white'
                }`}
            >
              All
            </button>
          </div>
        </div>
      </motion.div>

      {/* Campaigns List */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="space-y-6"
      >
        {filteredCampaigns.length > 0 ? (
          filteredCampaigns.map((campaign, index) => (
            <motion.div
              key={campaign.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 * index }}
              className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl overflow-hidden"
            >
              {/* Campaign Header */}
              <div className="md:p-6 p-2 border-b border-[#286db24c]">
                <div className="flex items-start justify-between md:flex-row flex-col gap-3">
                  <div className="flex-1">
                    <div className="flex md:items-center gap-2 md:flex-row flex-col-reverse mb-2">
                      <h3 className="text-white text-xl font-bold">{campaign.title}</h3>
                      {campaign.status === 'active' && (
                        <div className="flex justify-end md:w-auto w-full">
                          <span className="bg-green-600/20 text-green-400 text-xs px-2 py-1 rounded-full">
                            Active
                          </span>
                        </div>
                      )}
                      {campaign.status === 'ended' && (
                        <div className="flex justify-end md:w-auto w-full">
                          <span className="bg-gray-600/20 text-gray-400 text-xs px-2 py-1 rounded-full">
                            Ended
                          </span>
                        </div>
                      )}
                    </div>
                    <p className="text-gray-300 mb-3">{campaign.description}</p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <FaUsers className="text-blue-400" />
                        <span>{campaign.sponsor}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaCalendarAlt className="text-purple-400" />
                        <span>{campaign.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaVoteYea className="text-green-400" />
                        <span>{campaign.totalVotes.toLocaleString()} votes</span>
                      </div>
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="text-right">
                      <div className="text-[#f64c68] font-bold text-lg">{campaign.reward}</div>
                      <div className="text-gray-400 text-sm">Reward</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Campaign Content */}
              <div className="md:p-6 p-2">
                {/* Entities */}
                <div className="mb-6">
                  <h4 className="text-white font-semibold mb-3">Participating Entities:</h4>
                  <div className="flex flex-wrap gap-2">
                    {campaign.entities.map((entity, idx) => (
                      <span
                        key={idx}
                        className="bg-[#286db24c] text-white text-sm px-3 py-1 rounded-full"
                      >
                        {entity}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Voting Options */}
                <div className="space-y-4">
                  <h4 className="text-white font-semibold">Vote for your choice:</h4>
                  {campaign.options.map((option) => (
                    <div
                      key={option.id}
                      className="bg-[#1e2139] rounded-xl p-4 border border-[#286db24c]"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="text-white font-medium">{option.name}</h5>
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
                              className="bg-[#f64c68] h-2 rounded-full transition-all duration-300"
                              style={{ width: `${option.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-white font-semibold">{option.votes.toLocaleString()}</div>
                          <div className="text-gray-400 text-sm">{option.percentage}%</div>
                        </div>
                      </div>
                      {campaign.status === 'active' && !campaign.userVoted && (
                        <button
                          onClick={() => handleVote(campaign.id, option.id)}
                          className="mt-3 w-full bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] text-white py-2 px-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                        >
                          <FaVoteYea />
                          Vote for this option
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {/* User Vote Status */}
                {campaign.userVoted && (
                  <div className="mt-4 bg-green-600/20 border border-green-400/30 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <FaCheckCircle className="text-green-400" />
                      <div>
                        <span className="text-green-300 font-medium">You voted for: </span>
                        <span className="text-white">
                          {campaign.options.find(opt => opt.id === campaign.userVoteOption)?.name}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Campaign Rules */}
                <div className="mt-6 bg-blue-600/20 border border-blue-400/30 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <FaInfoCircle className="text-blue-400 text-lg mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-blue-400 font-medium mb-1">Campaign Rules</p>
                      <p className="text-blue-300 text-sm">
                        Vote for your preferred option. Winners are determined by popular vote.
                        50% of campaign revenue goes to PRO accounts supporting the winning entities.
                        You earn FNKT rewards for participating in campaigns.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-16">
            <FaTrophy className="text-gray-400 text-8xl mx-auto mb-6" />
            <h3 className="text-white text-2xl font-bold mb-4">
              {searchQuery ? 'No campaigns found' : 'No campaigns available'}
            </h3>
            <p className="text-gray-400 text-lg">
              {searchQuery
                ? 'Try adjusting your search terms'
                : 'Campaigns will appear here when sponsors create them for entities you support'
              }
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default FanCampaigns;
