import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FaWallet,
  FaArrowLeft,
  FaEuroSign,
  FaDollarSign,
  FaCoins,
  FaLock,
  FaEye,
  FaDownload,
  FaFilter,
  FaSearch,
  FaCalendar,
  FaClock,
  FaCheckCircle,
  FaInfoCircle,
  FaChartLine,
  FaUsers,
  FaStar,
  FaShieldAlt,
  FaLink,
  FaExclamationTriangle,
  FaPlus,
  FaMinus,
  FaChevronDown,
  FaChevronUp,
  FaTrophy
} from "react-icons/fa";

const AthleteWallet = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [expandedTransaction, setExpandedTransaction] = useState(null);

  // Mock data - replace with actual API calls
  const walletData = {
    available: 8500, // F̈ 8,500
    pending: 1200,   // F̈ 1,200 (under validation)
    lifetimeEarned: 12500, // F̈ 12,500
    athleteName: "Test Athlete",
    verificationStatus: "Verified Athlete",
    payoutStatus: "Admin Controlled"
  };

  const earningSources = [
    {
      source: "Sponsor Campaigns",
      amount: 6500,
      percentage: 65,
      campaigns: 3,
      color: "#f64c68"
    },
    {
      source: "Fan Engagement",
      amount: 3000,
      percentage: 30,
      interactions: 890,
      color: "#4ecdc4"
    },
    {
      source: "Platform Bonuses",
      amount: 500,
      percentage: 5,
      bonuses: 2,
      color: "#ffd93d"
    }
  ];

  const campaigns = [
    {
      name: "Nike Athlete Spotlight",
      sponsor: "Nike",
      earnings: 3500,
      interactions: 450,
      split: { athlete: 25, sponsor: 65, platform: 10 },
      status: "Active"
    },
    {
      name: "Adidas Performance Series",
      sponsor: "Adidas",
      earnings: 3000,
      interactions: 340,
      split: { athlete: 20, sponsor: 70, platform: 10 },
      status: "Active"
    }
  ];

  const transactions = [
    {
      id: "TXN-A001",
      date: "2024-01-15",
      time: "16:30",
      type: "Campaign Revenue",
      amount: 3500,
      status: "Confirmed",
      campaign: "Nike Athlete Spotlight",
      interactionType: "Fan Engagement",
      interactions: 450,
      grossAmount: 14000,
      netAmount: 3500,
      splitApplied: { athlete: 25, sponsor: 65, platform: 10 },
      verification: "Platform Verified",
      adminReference: "REV-2024-001"
    },
    {
      id: "TXN-A002",
      date: "2024-01-13",
      time: "14:45",
      type: "Campaign Revenue",
      amount: 3000,
      status: "Confirmed",
      campaign: "Adidas Performance Series",
      interactionType: "Content Engagement",
      interactions: 340,
      grossAmount: 15000,
      netAmount: 3000,
      splitApplied: { athlete: 20, sponsor: 70, platform: 10 },
      verification: "Platform Verified",
      adminReference: "REV-2024-002"
    },
    {
      id: "TXN-A003",
      date: "2024-01-10",
      time: "12:20",
      type: "Pending Revenue",
      amount: 1200,
      status: "Pending",
      campaign: "Coca-Cola Fan Challenge",
      interactionType: "Multiple Engagements",
      interactions: 100,
      grossAmount: 4800,
      netAmount: 1200,
      splitApplied: { athlete: 25, sponsor: 65, platform: 10 },
      verification: "Under Validation",
      expectedConfirmation: "2024-01-17",
      adminReference: "PEND-2024-001"
    },
    {
      id: "TXN-A004",
      date: "2024-01-08",
      time: "10:15",
      type: "Bonus Credit",
      amount: 500,
      status: "Confirmed",
      campaign: null,
      interactionType: "Performance Bonus",
      interactions: null,
      grossAmount: null,
      netAmount: 500,
      splitApplied: null,
      verification: "Admin Verified",
      adminReference: "BONUS-2024-001",
      reason: "Outstanding fan engagement performance"
    }
  ];

  const TransactionDetailModal = ({ transaction, onClose }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-[#1e2139] rounded-2xl border border-[#286db24c] shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white text-2xl font-bold">Transaction Details</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <FaTimes />
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Transaction ID</span>
              <span className="text-white font-mono">{transaction.id}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-400">Type</span>
              <span className={`font-semibold ${transaction.amount > 0 ? 'text-green-400' : 'text-red-400'}`}>
                {transaction.amount > 0 ? '+' : ''}{transaction.amount.toLocaleString()} F̈
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-400">Status</span>
              <span className={`font-semibold ${transaction.status === 'Confirmed' ? 'text-green-400' :
                  transaction.status === 'Pending' ? 'text-yellow-400' :
                    'text-blue-400'
                }`}>
                {transaction.status}
              </span>
            </div>

            {transaction.campaign && (
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Campaign</span>
                <span className="text-white">{transaction.campaign}</span>
              </div>
            )}

            <div className="border-t border-[#286db24c] pt-4">
              <p className="text-gray-300 text-sm mb-2">Description</p>
              <p className="text-white">{transaction.type} - {transaction.interactionType || 'N/A'}</p>
            </div>

            {transaction.interactions && (
              <div className="bg-[#2a2d4a] rounded-lg p-4">
                <h5 className="text-white font-semibold mb-2">Engagement Details</h5>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Fan Interactions:</span>
                    <span className="text-white">{transaction.interactions}</span>
                  </div>
                  {transaction.grossAmount && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Gross Campaign Value:</span>
                      <span className="text-white">{transaction.grossAmount.toLocaleString()} F̈</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-400">Your Share:</span>
                    <span className="text-green-400 font-semibold">{transaction.netAmount.toLocaleString()} F̈</span>
                  </div>
                </div>
              </div>
            )}

            {transaction.splitApplied && (
              <div className="bg-[#2a2d4a] rounded-lg p-4">
                <h5 className="text-white font-semibold mb-2">Revenue Split Applied</h5>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Your Share:</span>
                    <span className="text-green-400 font-semibold">{transaction.splitApplied.athlete}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Sponsor Share:</span>
                    <span className="text-white">{transaction.splitApplied.sponsor}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Platform Share:</span>
                    <span className="text-white">{transaction.splitApplied.platform}%</span>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mt-4">
              <div className="flex items-start gap-2">
                <FaShieldAlt className="text-blue-400 mt-0.5 flex-shrink-0" />
                <p className="text-gray-300 text-sm">
                  "This transaction was system-controlled and is fully auditable."
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

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
            onClick={() => navigate('/athlete/dashboard')}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FaArrowLeft className="text-xl" />
          </button>
          <h1 className="text-3xl lg:text-4xl font-bold text-white">Athlete Revenue Wallet</h1>
        </div>
        <p className="text-gray-400 text-lg">
          Track earnings from verified fan engagement and sponsor campaigns
        </p>
      </motion.div>

      {/* Tab Navigation */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-6"
      >
        <div className="grid lg:grid-cols-4 grid-cols-2 gap-2 bg-[#1e2139] p-1 rounded-xl border border-[#286db24c]">
          {[
            { key: 'overview', label: 'Overview', icon: <FaWallet /> },
            { key: 'campaigns', label: 'Campaigns', icon: <FaChartLine /> },
            { key: 'history', label: 'History', icon: <FaClock /> },
            { key: 'analytics', label: 'Analytics', icon: <FaEye /> }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${activeTab === tab.key
                  ? 'bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
                }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Content Sections */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Balance Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <FaCoins className="text-[#f64c68] text-2xl" />
                  <h3 className="text-white text-lg font-semibold">Available Balance</h3>
                </div>
                <div className="text-3xl font-bold text-[#f64c68] mb-2">
                  F̈ {walletData.available.toLocaleString()}
                </div>
                <div className="text-gray-400 text-sm">€{(walletData.available / 100).toFixed(2)}</div>
                <div className="mt-2 text-xs text-gray-500">Ready for settlement</div>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <FaClock className="text-yellow-400 text-2xl" />
                  <h3 className="text-white text-lg font-semibold">Pending Earnings</h3>
                </div>
                <div className="text-3xl font-bold text-yellow-400 mb-2">
                  F̈ {walletData.pending.toLocaleString()}
                </div>
                <div className="text-gray-400 text-sm">€{(walletData.pending / 100).toFixed(2)}</div>
                <div className="mt-2 text-xs text-gray-500">Under validation</div>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <FaChartLine className="text-blue-400 text-2xl" />
                  <h3 className="text-white text-lg font-semibold">Lifetime Earned</h3>
                </div>
                <div className="text-3xl font-bold text-blue-400 mb-2">
                  F̈ {walletData.lifetimeEarned.toLocaleString()}
                </div>
                <div className="text-gray-400 text-sm">€{(walletData.lifetimeEarned / 100).toFixed(2)}</div>
                <div className="mt-2 text-xs text-gray-500">Since wallet creation</div>
              </motion.div>
            </div>

            {/* Status Indicators */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-[#3c385996] border border-[#286db24c] rounded-2xl shadow-lg p-6"
            >
              <h3 className="text-white text-xl font-semibold mb-6">Wallet Status</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <FaTrophy className="text-green-400 text-3xl mx-auto mb-2" />
                  <h4 className="text-white font-semibold mb-1">Athlete</h4>
                  <p className="text-gray-400 text-sm">{walletData.athleteName}</p>
                  <span className="text-green-400 text-xs">Verified</span>
                </div>

                <div className="text-center">
                  <FaShieldAlt className="text-blue-400 text-3xl mx-auto mb-2" />
                  <h4 className="text-white font-semibold mb-1">Verification</h4>
                  <p className="text-gray-400 text-sm">Identity Confirmed</p>
                  <span className="text-blue-400 text-xs">Active</span>
                </div>

                <div className="text-center">
                  <FaLock className="text-purple-400 text-3xl mx-auto mb-2" />
                  <h4 className="text-white font-semibold mb-1">Payouts</h4>
                  <p className="text-gray-400 text-sm">Admin Controlled</p>
                  <span className="text-purple-400 text-xs">Secure</span>
                </div>
              </div>

              <div className="mt-6 bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <FaInfoCircle className="text-blue-400 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-300 text-sm">
                    "This wallet receives earnings generated through verified fan engagement and cannot be edited manually."
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Revenue Sources Breakdown */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-[#3c385996] border border-[#286db24c] rounded-2xl shadow-lg md:p-6 p-2"
            >
              <h3 className="text-white text-xl font-semibold mb-6">Revenue Sources</h3>

              <div className="space-y-4">
                {earningSources.map((source, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * index }}
                    className="bg-[#3337597b] rounded-xl md:p-4 p-2 border border-[#286db24c]"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-white font-semibold">{source.source}</h4>
                      <div className="text-right">
                        <div className="text-xl font-bold" style={{ color: source.color }}>
                          F̈ {source.amount.toLocaleString()}
                        </div>
                        <div className="text-gray-400 text-sm">{source.percentage}% of total</div>
                      </div>
                    </div>

                    <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                      <div
                        className="h-2 rounded-full"
                        style={{ width: `${source.percentage}%`, backgroundColor: source.color }}
                      ></div>
                    </div>

                    <div className="text-gray-400 text-sm">
                      {source.campaigns && `${source.campaigns} campaigns`}
                      {source.interactions && `${source.interactions} fan interactions`}
                      {source.bonuses && `${source.bonuses} performance bonuses`}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        )}

        {activeTab === 'campaigns' && (
          <div className="space-y-6">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-[#3c385996] border border-[#286db24c] rounded-2xl shadow-lg md:p-6 p-2"
            >
              <h3 className="text-white text-xl font-semibold mb-6">Campaign Performance & Earnings</h3>

              {campaigns.map((campaign, index) => (
                <motion.div
                  key={campaign.name}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * index }}
                  className="mb-6 last:mb-0"
                >
                  <div className="bg-[#3337597b] rounded-xl md:p-6 p-2 border border-[#286db24c]">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-white text-lg font-semibold">{campaign.name}</h4>
                      <span className={`text-xs px-2 py-1 rounded ${campaign.status === 'Active' ? 'bg-green-500/20 text-green-400' :
                          'bg-gray-500/20 text-gray-400'
                        }`}>
                        {campaign.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-[#f64c68]">{campaign.earnings.toLocaleString()}</div>
                        <div className="text-gray-400 text-sm">Your Earnings (F̈)</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-400">{campaign.interactions}</div>
                        <div className="text-gray-400 text-sm">Fan Interactions</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-400">{campaign.split.athlete}%</div>
                        <div className="text-gray-400 text-sm">Your Revenue Share</div>
                      </div>
                    </div>

                    <div className="bg-[#2a2d4a] rounded-lg md:p-4 p-1">
                      <h5 className="text-white font-semibold mb-3">Revenue Split Configuration</h5>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div className="text-center">
                          <div className="text-green-400 font-semibold md:text-[14px] text-[10px]">Your Share</div>
                          <div className="text-green-400 font-bold">{campaign.split.athlete}%</div>
                        </div>
                        <div className="text-center">
                          <div className="text-gray-400 md:text-[14px] text-[10px]">Sponsor Share</div>
                          <div className="text-white font-semibold">{campaign.split.sponsor}%</div>
                        </div>
                        <div className="text-center">
                          <div className="text-gray-400 md:text-[14px] text-[10px]">Platform Share</div>
                          <div className="text-white font-semibold">{campaign.split.platform}%</div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 text-sm text-gray-400">
                      Sponsored by: <span className="text-white font-semibold">{campaign.sponsor}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="bg-[#3c385996] border border-[#286db24c] rounded-2xl shadow-lg md:p-6 p-2">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white text-xl font-semibold">Financial Transaction Ledger</h3>
              <div className="flex gap-2">
                <button className="p-2 bg-[#1e2139] rounded-lg border border-[#286db24c] text-gray-400 hover:text-white">
                  <FaFilter />
                </button>
                <button className="p-2 bg-[#1e2139] rounded-lg border border-[#286db24c] text-gray-400 hover:text-white">
                  <FaDownload />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {transactions.map((transaction, index) => (
                <motion.div
                  key={transaction.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-[#3337597b] rounded-xl border border-[#286db24c] overflow-hidden"
                >
                  <div
                    className="md:p-4 p-2 cursor-pointer hover:bg-[#2a2d4a] transition-colors"
                    onClick={() => setExpandedTransaction(
                      expandedTransaction === transaction.id ? null : transaction.id
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center md:gap-4 gap-2">
                        <div className={`p-2 rounded-full ${transaction.amount > 0 ? 'bg-green-500/20' :
                            transaction.amount < 0 ? 'bg-red-500/20' :
                              'bg-yellow-500/20'
                          }`}>
                          {transaction.amount > 0 ? (
                            <FaPlus className="text-green-400" />
                          ) : transaction.amount < 0 ? (
                            <FaMinus className="text-red-400" />
                          ) : (
                            <FaClock className="text-yellow-400" />
                          )}
                        </div>
                        <div>
                          <span className="text-white font-semibold">{transaction.type}</span>
                          <div className="text-gray-400 md:text-sm text-xs flex items-center gap-4">
                            <span>{transaction.date} {transaction.time}</span>
                            <span className={`flex items-center gap-1 ${transaction.status === 'Confirmed' ? 'text-green-400' :
                                transaction.status === 'Pending' ? 'text-yellow-400' :
                                  'text-blue-400'
                              }`}>
                              <FaCheckCircle className="text-xs" />
                              {transaction.status}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right flex items-center gap-2">
                        <div className={`font-bold text-lg md:flex hidden ${transaction.amount > 0 ? 'text-green-400' :
                            transaction.amount < 0 ? 'text-red-400' :
                              'text-yellow-400'
                          }`}>
                          {transaction.amount > 0 ? '+' : ''}F̈ {Math.abs(transaction.amount).toLocaleString()}
                        </div>
                        {expandedTransaction === transaction.id ? (
                          <FaChevronUp className="text-gray-400" />
                        ) : (
                          <FaChevronDown className="text-gray-400" />
                        )}
                      </div>
                    </div>
                  </div>

                  {expandedTransaction === transaction.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-[#286db24c] p-4 bg-[#2a2d4a]"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-gray-400 mb-2">Transaction Details</div>
                          <div className="space-y-1">
                            <div className="flex justify-between">
                              <span className="text-gray-400">ID:</span>
                              <span className="text-white font-mono">{transaction.id}</span>
                            </div>
                            {transaction.campaign && (
                              <div className="flex justify-between">
                                <span className="text-gray-400">Campaign:</span>
                                <span className="text-white">{transaction.campaign}</span>
                              </div>
                            )}
                            <div className="flex justify-between">
                              <span className="text-gray-400">Type:</span>
                              <span className="text-white">{transaction.interactionType}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <div className="text-gray-400 mb-2">Financial Breakdown</div>
                          <div className="space-y-1">
                            {transaction.grossAmount && (
                              <div className="flex justify-between">
                                <span className="text-gray-400">Campaign Value:</span>
                                <span className="text-white">F̈ {transaction.grossAmount.toLocaleString()}</span>
                              </div>
                            )}
                            <div className="flex justify-between">
                              <span className="text-gray-400">Your Earnings:</span>
                              <span className="text-green-400 font-semibold">F̈ {transaction.netAmount.toLocaleString()}</span>
                            </div>
                            {transaction.splitApplied && (
                              <div className="flex justify-between">
                                <span className="text-gray-400">Your Share:</span>
                                <span className="text-green-400">{transaction.splitApplied.athlete}%</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-[#286db24c]">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">Verification:</span>
                          <span className="text-blue-400 flex items-center gap-1">
                            <FaShieldAlt className="text-xs" />
                            {transaction.verification}
                          </span>
                        </div>
                        {transaction.adminReference && (
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-gray-400">Reference:</span>
                            <span className="text-white font-mono">{transaction.adminReference}</span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Security Notice */}
            <div className="mt-6 bg-[#1e2139] rounded-xl p-4 border border-[#286db24c]">
              <div className="flex items-start gap-3">
                <FaShieldAlt className="text-blue-400 mt-1" />
                <h4 className="text-white font-semibold mb-2">Security & Auditability</h4>
              </div>
              <div>
                <p className="text-gray-300 text-sm">
                  All wallet balances and transactions are system-controlled and cannot be altered manually. Every transaction is verified and permanently recorded for full auditability.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              <div className="bg-[#3c385996] border border-[#286db24c] rounded-2xl shadow-lg p-6">
                <h3 className="text-white text-xl font-semibold mb-6">Earnings Analytics</h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FaCoins className="text-[#f64c68]" />
                      <span className="text-gray-400">Total Earnings</span>
                    </div>
                    <span className="text-white font-bold text-xl">F̈ {walletData.lifetimeEarned.toLocaleString()}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FaUsers className="text-blue-400" />
                      <span className="text-gray-400">Fan Engagements</span>
                    </div>
                    <span className="text-white font-bold text-xl">1,247</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FaChartLine className="text-green-400" />
                      <span className="text-gray-400">Avg Earnings/Engagement</span>
                    </div>
                    <span className="text-white font-bold text-xl">F̈ 10.02</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FaStar className="text-purple-400" />
                      <span className="text-gray-400">Active Campaigns</span>
                    </div>
                    <span className="text-white font-bold text-xl">{campaigns.length}</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#3c385996] border border-[#286db24c] rounded-2xl shadow-lg p-6">
                <h3 className="text-white text-xl font-semibold mb-6">Performance Trends</h3>

                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-[#f64c68] mb-2">+18%</div>
                    <div className="text-gray-400 text-sm">Monthly Growth</div>
                  </div>

                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-400 mb-2">€85</div>
                    <div className="text-gray-400 text-sm">This Month (EUR)</div>
                  </div>

                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-400 mb-2">97.3%</div>
                    <div className="text-gray-400 text-sm">Engagement Validation Rate</div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-[#3c385996] border border-[#286db24c] rounded-2xl shadow-lg p-6"
            >
              <h3 className="text-white text-xl font-semibold mb-6">Revenue Share Summary</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-1">22.5%</div>
                  <div className="text-gray-400 text-sm">Average Athlete Share</div>
                </div>

                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-400 mb-1">67.5%</div>
                  <div className="text-gray-400 text-sm">Average Sponsor Share</div>
                </div>

                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-1">10%</div>
                  <div className="text-gray-400 text-sm">Platform Share</div>
                </div>
              </div>

              <div className="mt-6 bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <FaInfoCircle className="text-green-400 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-300 text-sm">
                    "Revenue shares are configured at the campaign level and applied automatically to all verified engagements."
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </motion.div>

      {/* Transaction Detail Modal */}
      {selectedTransaction && (
        <TransactionDetailModal
          transaction={selectedTransaction}
          onClose={() => setSelectedTransaction(null)}
        />
      )}
    </div>
  );
};

export default AthleteWallet;