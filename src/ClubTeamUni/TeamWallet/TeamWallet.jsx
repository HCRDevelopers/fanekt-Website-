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
  FaBuilding,
  FaHandshake,
  FaShieldAlt,
  FaLink,
  FaExclamationTriangle,
  FaPlus,
  FaMinus,
  FaChevronDown,
  FaChevronUp
} from "react-icons/fa";

const TeamWallet = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [expandedTransaction, setExpandedTransaction] = useState(null);

  // Mock data - replace with actual API calls
  const walletData = {
    available: 25000, // F̈ 25,000
    pending: 5000,    // F̈ 5,000 (under validation)
    lifetimeEarned: 45000, // F̈ 45,000
    organizationName: "Real Madrid FC",
    verificationStatus: "Verified",
    payoutStatus: "Admin Controlled"
  };

  const earningSources = [
    {
      source: "Sponsor Campaigns",
      amount: 15000,
      percentage: 60,
      campaigns: 3,
      color: "#f64c68"
    },
    {
      source: "NFC Interactions",
      amount: 7500,
      percentage: 30,
      interactions: 1250,
      color: "#4ecdc4"
    },
    {
      source: "Platform Bonuses",
      amount: 2500,
      percentage: 10,
      bonuses: 5,
      color: "#ffd93d"
    }
  ];

  const campaigns = [
    {
      name: "Nike Partnership Campaign",
      sponsor: "Nike",
      earnings: 8500,
      interactions: 450,
      split: { sponsor: 70, organization: 20, platform: 10 },
      status: "Active"
    },
    {
      name: "Adidas Stadium Branding",
      sponsor: "Adidas",
      earnings: 6500,
      interactions: 320,
      split: { sponsor: 75, organization: 15, platform: 10 },
      status: "Active"
    }
  ];

  const transactions = [
    {
      id: "TXN-T001",
      date: "2024-01-15",
      time: "14:30",
      type: "Revenue Credit",
      amount: 8500,
      status: "Confirmed",
      campaign: "Nike Partnership Campaign",
      interactionType: "NFC Scan",
      interactions: 450,
      grossAmount: 12000,
      netAmount: 8500,
      splitApplied: { sponsor: 70, organization: 20, platform: 10 },
      verification: "Platform Verified",
      adminReference: "REV-2024-001"
    },
    {
      id: "TXN-T002",
      date: "2024-01-12",
      time: "16:45",
      type: "Revenue Credit",
      amount: 6500,
      status: "Confirmed",
      campaign: "Adidas Stadium Branding",
      interactionType: "Engagement",
      interactions: 320,
      grossAmount: 9200,
      netAmount: 6500,
      splitApplied: { sponsor: 75, organization: 15, platform: 10 },
      verification: "Platform Verified",
      adminReference: "REV-2024-002"
    },
    {
      id: "TXN-T003",
      date: "2024-01-10",
      time: "11:20",
      type: "Pending Credit",
      amount: 5000,
      status: "Pending",
      campaign: "Coca-Cola Fan Zone",
      interactionType: "Multiple",
      interactions: 180,
      grossAmount: 7200,
      netAmount: 5000,
      splitApplied: { sponsor: 70, organization: 20, platform: 10 },
      verification: "Under Validation",
      expectedConfirmation: "2024-01-17",
      adminReference: "PEND-2024-001"
    },
    {
      id: "TXN-T004",
      date: "2024-01-08",
      time: "09:15",
      type: "Admin Adjustment",
      amount: -500,
      status: "Confirmed",
      campaign: null,
      interactionType: "Correction",
      interactions: null,
      grossAmount: null,
      netAmount: -500,
      splitApplied: null,
      verification: "Admin Verified",
      adminReference: "ADJ-2024-001",
      reason: "Duplicate transaction correction"
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
                <h5 className="text-white font-semibold mb-2">Interaction Details</h5>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Interactions:</span>
                    <span className="text-white">{transaction.interactions}</span>
                  </div>
                  {transaction.grossAmount && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Gross Amount:</span>
                      <span className="text-white">{transaction.grossAmount.toLocaleString()} F̈</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-400">Net Amount:</span>
                    <span className="text-white">{transaction.netAmount.toLocaleString()} F̈</span>
                  </div>
                </div>
              </div>
            )}

            {transaction.splitApplied && (
              <div className="bg-[#2a2d4a] rounded-lg p-4">
                <h5 className="text-white font-semibold mb-2">Revenue Split Applied</h5>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Sponsor Share:</span>
                    <span className="text-white">{transaction.splitApplied.sponsor}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Organization Share:</span>
                    <span className="text-green-400 font-semibold">{transaction.splitApplied.organization}%</span>
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
            onClick={() => navigate('/team/dashboard')}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FaArrowLeft className="text-xl" />
          </button>
          <h1 className="md:text-3xl lg:text-4xl text-xl font-bold text-white">Team Revenue Wallet</h1>
        </div>
        <p className="text-gray-400 text-lg">
          Financial overview of earnings from verified fan engagement
        </p>
      </motion.div>

      {/* Tab Navigation */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-6"
      >
        <div className="grid lg:grid-cols-4 md:grid-cols-4 grid-cols-2 bg-[#1e2139] p-2 rounded-xl border border-[#286db24c]">
          {[
            { key: 'overview', label: 'Overview', icon: <FaWallet /> },
            { key: 'campaigns', label: 'Campaigns', icon: <FaChartLine /> },
            { key: 'history', label: 'History', icon: <FaClock /> },
            { key: 'analytics', label: 'Analytics', icon: <FaEye /> }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 py-2 md:px-4 px-2 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${activeTab === tab.key
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
                className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl md:p-6 p-2"
              >
                <div className="flex items-center gap-3 mb-4">
                  <FaCoins className="text-[#f64c68] text-2xl" />
                  <h3 className="text-white text-lg font-semibold">Available Balance</h3>
                </div>
                <div className="text-3xl font-bold text-[#f64c68] mb-2">
                  F̈ {walletData.available.toLocaleString()}
                </div>
                <div className="text-gray-400 text-sm">€{(walletData.available / 100).toFixed(2)}</div>
                <div className="mt-2 text-xs text-gray-500">Eligible for settlement</div>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl md:p-6 p-2"
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
                className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl md:p-6 p-2"
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
              className="bg-[#3c385996] border border-[#286db24c] rounded-2xl shadow-lg md:p-6 p-3"
            >
              <h3 className="text-white text-xl font-semibold mb-6">Wallet Status</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <FaBuilding className="text-green-400 text-3xl mx-auto mb-2" />
                  <h4 className="text-white font-semibold mb-1">Organization</h4>
                  <p className="text-gray-400 text-sm">{walletData.organizationName}</p>
                  <span className="text-green-400 text-xs">Verified</span>
                </div>

                <div className="text-center">
                  <FaShieldAlt className="text-blue-400 text-3xl mx-auto mb-2" />
                  <h4 className="text-white font-semibold mb-1">Compliance</h4>
                  <p className="text-gray-400 text-sm">Regulatory Compliant</p>
                  <span className="text-blue-400 text-xs">Active</span>
                </div>

                <div className="text-center">
                  <FaHandshake className="text-purple-400 text-3xl mx-auto mb-2" />
                  <h4 className="text-white font-semibold mb-1">Payouts</h4>
                  <p className="text-gray-400 text-sm">Admin Controlled</p>
                  <span className="text-purple-400 text-xs">Enabled</span>
                </div>
              </div>

              <div className="mt-6 bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <FaInfoCircle className="text-blue-400 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-300 text-sm">
                    "All wallet balances are generated through verified platform activity and cannot be edited manually."
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
              <h3 className="text-white text-xl font-semibold mb-3">Revenue Sources</h3>

              <div className="space-y-4">
                {earningSources.map((source, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * index }}
                    className="bg-[#3337597b] rounded-xl p-4 border border-[#286db24c]"
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
                      {source.interactions && `${source.interactions} interactions`}
                      {source.bonuses && `${source.bonuses} bonuses`}
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
              <h3 className="text-white text-xl font-semibold mb-3">Campaign Performance & Revenue</h3>

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
                      <h4 className="text-white md:text-lg text-md font-semibold">{campaign.name}</h4>
                      <span className={`text-xs px-2 py-1 rounded ${campaign.status === 'Active' ? 'bg-green-500/20 text-green-400' :
                          'bg-gray-500/20 text-gray-400'
                        }`}>
                        {campaign.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 md:grid-cols-3 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-[#f64c68]">{campaign.earnings.toLocaleString()}</div>
                        <div className="text-gray-400 text-sm">Earnings (F̈)</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-400">{campaign.interactions}</div>
                        <div className="text-gray-400 text-sm">Interactions</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-400">{campaign.split.organization}%</div>
                        <div className="text-gray-400 text-sm">Your Share</div>
                      </div>
                    </div>

                    <div className="bg-[#2a2d4a] rounded-lg md:p-4 p-1.5">
                      <h5 className="text-white font-semibold mb-3">Revenue Split Configuration</h5>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div className="text-center">
                          <div className="text-gray-400 md:text-[16px] text-[13px]">Sponsor</div>
                          <div className="text-white font-semibold">{campaign.split.sponsor}%</div>
                        </div>
                        <div className="text-center">
                          <div className="text-green-400 font-semibold md:text-[16px] text-[13px]">Organization</div>
                          <div className="text-green-400 font-bold">{campaign.split.organization}%</div>
                        </div>
                        <div className="text-center">
                          <div className="text-gray-400 md:text-[16px] text-[13px]">Platform</div>
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
            <div className="flex md:items-center justify-between md:flex-row flex-col-reverse mb-3">
              <h3 className="text-white text-xl font-semibold">Financial Transaction Ledger</h3>
              <div className="flex gap-2 justify-end">
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
                          <div className="text-gray-400 text-sm flex items-center md:gap-4 gap-1">
                            <span className="md:text-[13px] text-[11px]">{transaction.date} {transaction.time}</span>
                            <span className={`flex items-center gap-1 md:text-[13px] text-[11px] ${transaction.status === 'Confirmed' ? 'text-green-400' :
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
                                <span className="text-gray-400">Gross:</span>
                                <span className="text-white">F̈ {transaction.grossAmount.toLocaleString()}</span>
                              </div>
                            )}
                            <div className="flex justify-between">
                              <span className="text-gray-400">Net:</span>
                              <span className="text-green-400 font-semibold">F̈ {transaction.netAmount.toLocaleString()}</span>
                            </div>
                            {transaction.splitApplied && (
                              <div className="flex justify-between">
                                <span className="text-gray-400">Your Share:</span>
                                <span className="text-green-400">{transaction.splitApplied.organization}%</span>
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
              <div className="bg-[#3c385996] border border-[#286db24c] rounded-2xl shadow-lg md:p-6 p-2">
                <h3 className="text-white text-xl font-semibold mb-2">Revenue Analytics</h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center md:gap-3 gap-1">
                      <FaCoins className="text-[#f64c68]" />
                      <span className="text-gray-400">Total Revenue</span>
                    </div>
                    <span className="text-white font-bold text-xl">F̈ {walletData.lifetimeEarned.toLocaleString()}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center md:gap-3 gap-1">
                      <FaUsers className="text-blue-400" />
                      <span className="text-gray-400">Fan Interactions</span>
                    </div>
                    <span className="text-white font-bold text-xl">2,847</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center md:gap-3 gap-1">
                      <FaChartLine className="text-green-400" />
                      <span className="text-gray-400">Avg Revenue/Interaction</span>
                    </div>
                    <span className="text-white font-bold text-xl">F̈ 15.80</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center md:gap-3 gap-1">
                      <FaBuilding className="text-purple-400" />
                      <span className="text-gray-400">Active Campaigns</span>
                    </div>
                    <span className="text-white font-bold text-xl">{campaigns.length}</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#3c385996] border border-[#286db24c] rounded-2xl shadow-lg p-6">
                <h3 className="text-white text-xl font-semibold mb-6">Revenue Trends</h3>

                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-[#f64c68] mb-2">+23%</div>
                    <div className="text-gray-400 text-sm">Monthly Growth</div>
                  </div>

                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-400 mb-2">€4,500</div>
                    <div className="text-gray-400 text-sm">This Month (EUR)</div>
                  </div>

                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-400 mb-2">94.2%</div>
                    <div className="text-gray-400 text-sm">Validation Success Rate</div>
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
              <h3 className="text-white text-xl font-semibold mb-6">Revenue Split Summary</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-400 mb-1">72.5%</div>
                  <div className="text-gray-400 text-sm">Average Sponsor Share</div>
                </div>

                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-1">17.5%</div>
                  <div className="text-gray-400 text-sm">Average Organization Share</div>
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
                    "Revenue splits are configured at the campaign level and applied automatically to all earnings."
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

export default TeamWallet;