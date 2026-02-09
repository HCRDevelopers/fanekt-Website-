import React, { useState, useEffect } from "react";
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
  FaShoppingCart,
  FaGift,
  FaCog,
  FaPlus,
  FaMinus,
  FaLink,
  FaExclamationTriangle,
  FaShieldAlt
} from "react-icons/fa";

// Import API service
import { getUserPoints, stripeMakePayment } from '../../API/apiService';

const SponsorWallet = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // Wallet data state
  const [availableBalance, setAvailableBalance] = useState(0);
  const [isLoadingBalance, setIsLoadingBalance] = useState(true);
  const [balanceError, setBalanceError] = useState(null);

  // Mock data for other wallet data - can be replaced with APIs later
  const walletData = {
    reserved: 220000,   // F̈ 220,000 (for active campaigns)
    spent: 0,          // F̈ 0
    lastTopUp: {
      amount: 1000000,
      date: "2024-01-15",
      method: "Bank Transfer"
    }
  };

  // Fetch user points on component mount
  useEffect(() => {
    const fetchUserPoints = async () => {
      try {
        setIsLoadingBalance(true);
        setBalanceError(null);
        const response = await getUserPoints();

        if (response.data.status && response.data.data) {
          setAvailableBalance(response.data.data.total_points || 0);
        } else {
          setBalanceError('Failed to fetch balance data');
        }
      } catch (error) {
        console.error('Error fetching user points:', error);
        setBalanceError('Failed to load balance data. Please try again.');
      } finally {
        setIsLoadingBalance(false);
      }
    };

    fetchUserPoints();
  }, []);

  const campaigns = [
    {
      id: 1,
      name: "Real Madrid Fan Engagement",
      type: "FNKT Reward",
      allocated: 150000,
      remaining: 120000,
      spent: 30000,
      status: "Active",
      interactions: {
        scans: 150,
        clicks: 89,
        redemptions: 30,
        costPerScan: 100,
        costPerClick: 200,
        costPerRedemption: 500
      }
    },
    {
      id: 2,
      name: "Nike Product Launch",
      type: "Product-Funded",
      allocated: 70000,
      remaining: 45000,
      spent: 25000,
      status: "Active",
      products: {
        name: "Nike Air Max",
        funded: 100,
        consumed: 50,
        remaining: 50
      }
    }
  ];

  const transactions = [
    {
      id: "TXN-S001",
      date: "2024-01-15",
      time: "10:30",
      type: "Funding",
      amount: 1000000,
      description: "Wallet top-up via Bank Transfer",
      status: "Completed",
      reference: "FT-2024-001"
    },
    {
      id: "TXN-S002",
      date: "2024-01-14",
      time: "14:22",
      type: "Campaign Spend",
      amount: -15000,
      description: "Real Madrid Fan Engagement - NFC Scans",
      campaign: "Real Madrid Fan Engagement",
      interactions: 150,
      costPerInteraction: 100,
      status: "Completed",
      reference: "CMP-RM-001"
    },
    {
      id: "TXN-S003",
      date: "2024-01-13",
      time: "16:45",
      type: "Product Consumption",
      amount: -25000,
      description: "Nike Product Launch - 50 units consumed",
      campaign: "Nike Product Launch",
      productsConsumed: 50,
      unitCost: 500,
      status: "Completed",
      reference: "PRD-NIKE-001"
    }
  ];

  const performanceMetrics = {
    totalInteractions: 239,
    totalEngagement: 1847,
    avgCostPerEngagement: 120,
    conversionRate: 15.2
  };

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
              <span className="text-gray-400">Date & Time</span>
              <span className="text-white">{transaction.date} {transaction.time}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-400">Status</span>
              <span className="text-green-400 flex items-center gap-1">
                <FaCheckCircle /> {transaction.status}
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
              <p className="text-white">{transaction.description}</p>
            </div>

            {transaction.interactions && (
              <div className="bg-[#2a2d4a] rounded-lg p-4">
                <h5 className="text-white font-semibold mb-2">Interaction Breakdown</h5>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Interactions:</span>
                    <span className="text-white">{transaction.interactions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Cost per interaction:</span>
                    <span className="text-white">{transaction.costPerInteraction} F̈</span>
                  </div>
                </div>
              </div>
            )}

            {transaction.productsConsumed && (
              <div className="bg-[#2a2d4a] rounded-lg p-4">
                <h5 className="text-white font-semibold mb-2">Product Consumption</h5>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Units consumed:</span>
                    <span className="text-white">{transaction.productsConsumed}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Unit cost:</span>
                    <span className="text-white">{transaction.unitCost} F̈</span>
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

  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [topUpAmount, setTopUpAmount] = useState('');
  const [isProcessingTopUp, setIsProcessingTopUp] = useState(false);

  const handleTopUp = async () => {
    if (!topUpAmount || parseFloat(topUpAmount) < 100) {
      alert('Please enter a minimum amount of €100.00');
      return;
    }

    setIsProcessingTopUp(true);

    try {
      const amount = parseFloat(topUpAmount);
      const points = amount * 100; // Convert euros to FAN€KT points (1€ = 100 F̈)

      const response = await stripeMakePayment({
        amount: amount,
        points: points
      });

      if (response.data.status && response.data.data?.url) {
        // Redirect to Stripe checkout URL
        window.location.href = response.data.data.url;
      } else {
        alert('Failed to create payment session. Please try again.');
      }
    } catch (error) {
      console.error('Stripe payment error:', error);
      alert('Payment initiation failed. Please try again.');
    } finally {
      setIsProcessingTopUp(false);
    }
  };

  return (
    <div className="min-h-screen lg:ml-[290px] md:px-4 px-2 lg:px-8 py-6 pt-28 lg:pt-6">
      {/* Header */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-8"
      >
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => navigate('/sponsor/dashboard')}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FaArrowLeft className="text-xl" />
          </button>
          <h1 className="text-3xl lg:text-4xl font-bold text-white">Sponsor Wallet</h1>
        </div>
        <p className="text-gray-400 text-lg">
          Financial control center for budget management and campaign spending
        </p>
      </motion.div>

      {/* Tab Navigation */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-6"
      >
        <div className="grid lg:grid-cols-6 md:grid-cols-3 grid-cols-2 bg-[#1e2139] p-1 rounded-xl border border-[#286db24c]">
          {[
            { key: 'overview', label: 'Overview', icon: <FaWallet /> },
            { key: 'topup', label: 'Top-up', icon: <FaPlus /> },
            { key: 'campaigns', label: 'Campaigns', icon: <FaChartLine /> },
            { key: 'history', label: 'History', icon: <FaClock /> },
            { key: 'analytics', label: 'Analytics', icon: <FaEye /> }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                activeTab === tab.key
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
            {/* Wallet Balance Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl md:p-6 p-2"
              >
                <div className="flex items-center gap-3 mb-4">
                  <FaWallet className="text-[#f64c68] text-2xl" />
                  <h3 className="text-white text-lg font-semibold">Available Balance</h3>
                </div>
                <div className="text-3xl font-bold text-[#f64c68] mb-2">
                  {isLoadingBalance ? (
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 border-2 border-[#f64c68] border-t-transparent rounded-full animate-spin"></div>
                      Loading...
                    </div>
                  ) : balanceError ? (
                    <span className="text-red-400 text-lg">Error</span>
                  ) : (
                    `F̈ ${availableBalance.toLocaleString()}`
                  )}
                </div>
                <div className="text-gray-400 text-sm">
                  {isLoadingBalance ? (
                    'Loading...'
                  ) : balanceError ? (
                    'Unable to load balance'
                  ) : (
                    `€${(availableBalance / 100).toFixed(2)}`
                  )}
                </div>
                <div className="mt-2 text-xs text-gray-500">Funds not allocated to campaigns</div>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl md:p-6 p-2"
              >
                <div className="flex items-center gap-3 mb-4">
                  <FaLock className="text-blue-400 text-2xl" />
                  <h3 className="text-white text-lg font-semibold">Reserved Funds</h3>
                </div>
                <div className="text-3xl font-bold text-blue-400 mb-2">
                  F̈ {walletData.reserved.toLocaleString()}
                </div>
                <div className="text-gray-400 text-sm">€{(walletData.reserved / 100).toFixed(2)}</div>
                <div className="mt-2 text-xs text-gray-500">Locked in active campaigns</div>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl md:p-6 p-2"
              >
                <div className="flex items-center gap-3 mb-4">
                  <FaMinus className="text-red-400 text-2xl" />
                  <h3 className="text-white text-lg font-semibold">Total Spent</h3>
                </div>
                <div className="text-3xl font-bold text-red-400 mb-2">
                  F̈ {walletData.spent.toLocaleString()}
                </div>
                <div className="text-gray-400 text-sm">€{(walletData.spent / 100).toFixed(2)}</div>
                <div className="mt-2 text-xs text-gray-500">Historical spend across campaigns</div>
              </motion.div>
            </div>

            {/* Wallet Funding Status */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-[#3c385996] border border-[#286db24c] rounded-2xl shadow-lg md:p-6 p-2"
            >
              <h3 className="text-white text-xl font-semibold mb-4">Recent Funding</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-semibold">Last Top-up</p>
                  <p className="text-gray-400 text-sm">{walletData.lastTopUp.date}</p>
                  <p className="text-gray-400 text-sm">{walletData.lastTopUp.method}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-[#f64c68]">
                    F̈ {walletData.lastTopUp.amount.toLocaleString()}
                  </div>
                  <div className="text-gray-400 text-sm">€{(walletData.lastTopUp.amount / 100).toFixed(2)}</div>
                </div>
              </div>
            </motion.div>

            {/* Campaign Budget Overview */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-[#3c385996] border border-[#286db24c] rounded-2xl shadow-lg md:p-6 p-2"
            >
              <h3 className="text-white text-xl font-semibold mb-6">Active Campaign Budgets</h3>
              <div className="space-y-4">
                {campaigns.map((campaign, index) => (
                  <motion.div
                    key={campaign.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * index }}
                    className="bg-[#3337597b] rounded-xl p-4 border border-[#286db24c]"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="text-white font-semibold">{campaign.name}</h4>
                        <span className={`text-xs px-2 py-1 rounded ${
                          campaign.type === 'FNKT Reward' ? 'bg-green-500/20 text-green-400' :
                          campaign.type === 'Product-Funded' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-purple-500/20 text-purple-400'
                        }`}>
                          {campaign.type}
                        </span>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded ${
                        campaign.status === 'Active' ? 'bg-green-500/20 text-green-400' :
                        campaign.status === 'Paused' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {campaign.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">Allocated</p>
                        <p className="text-white font-semibold">F̈ {campaign.allocated.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Remaining</p>
                        <p className="text-green-400 font-semibold">F̈ {campaign.remaining.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Spent</p>
                        <p className="text-red-400 font-semibold">F̈ {campaign.spent.toLocaleString()}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        )}

        {activeTab === 'topup' && (
          <div className="space-y-6">
            {/* Important Notice */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 border border-blue-500/30 rounded-xl md:p-6 p-2"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="text-blue-400 text-2xl">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-white text-xl font-bold">Important Notice</h3>
              </div>
              <div className="space-y-2">
                <p className="text-gray-300">
                  <strong className="text-white">Enterprise Funding:</strong> Sponsors can fund their wallets through secure payment processing.
                </p>
                <p className="text-gray-300">
                  <strong className="text-white">Instant Conversion:</strong> Your euro payment is instantly converted to FAN€KT at the rate of 1€ = 100 F̈.
                </p>
                <p className="text-gray-300">
                  <strong className="text-white">Bank-Level Security:</strong> All transactions are processed securely through Stripe with enterprise-grade encryption.
                </p>
              </div>
            </motion.div>

            {/* Top-up Form */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl md:p-8 p-2"
            >
              <div className="text-center mb-8">
                <FaPlus className="text-[#f64c68] text-4xl mx-auto mb-4" />
                <h3 className="text-white text-2xl font-bold mb-2">Top-up Your Sponsor Wallet</h3>
                <p className="text-gray-400">Fund your campaigns and drive fan engagement</p>
              </div>

              <div className="max-w-md mx-auto">
                {/* Amount Input */}
                <div className="mb-6">
                  <label className="block text-white font-semibold mb-2">Enter Amount (€)</label>
                  <div className="relative">
                    <FaEuroSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="number"
                      value={topUpAmount}
                      onChange={(e) => setTopUpAmount(e.target.value)}
                      placeholder="0.00"
                      min="100"
                      step="0.01"
                      className="w-full pl-12 pr-4 py-4 bg-[#1e2139] border border-[#286db24c] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#f64c68] transition-colors"
                    />
                  </div>
                </div>

                {/* Amount Preview */}
                {topUpAmount && parseFloat(topUpAmount) >= 100 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#1e2139] rounded-xl md:p-4 p-2 mb-6 border border-[#286db24c]"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-400">Amount to Pay:</span>
                      <span className="text-white font-semibold">€{parseFloat(topUpAmount).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">FAN€KT to Receive:</span>
                      <span className="text-[#f64c68] font-bold">{(parseFloat(topUpAmount) * 100).toLocaleString()} F̈</span>
                    </div>
                    <div className="text-center text-xs text-gray-500 mt-2">
                      Rate: 1€ = 100 F̈
                    </div>
                  </motion.div>
                )}

                {/* Top-up Button */}
                <button
                  onClick={handleTopUp}
                  disabled={!topUpAmount || parseFloat(topUpAmount) < 100 || isProcessingTopUp}
                  className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 ${
                    !topUpAmount || parseFloat(topUpAmount) < 100 || isProcessingTopUp
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] text-white hover:shadow-lg transform hover:scale-105'
                  }`}
                >
                  {isProcessingTopUp ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <FaPlus />
                      Top-up with Stripe
                    </div>
                  )}
                </button>

                {/* Security Note */}
                <div className="mt-6 bg-[#1e2139] rounded-xl p-4 border border-[#286db24c]">
                  <div className="flex items-start gap-3">
                    <FaShieldAlt className="text-green-400 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-white font-semibold mb-2">Enterprise-Grade Security</h4>
                      <p className="text-gray-300 text-sm">
                        Your payment information is securely processed by Stripe. We never store your card details on our servers.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Minimum Amount Notice */}
                <div className="mt-4 text-center">
                  <p className="text-gray-400 text-sm">
                    Minimum top-up amount: €100.00 (10,000 F̈)
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Quick Amount Buttons */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl md:p-6 p-2"
            >
              <h4 className="text-white font-semibold mb-4 text-center">Quick Top-up Amounts</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[500, 1000, 2500, 5000].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setTopUpAmount(amount.toString())}
                    className="p-4 bg-[#1e2139] border border-[#286db24c] rounded-xl hover:border-[#f64c68] transition-colors"
                  >
                    <div className="text-center">
                      <div className="text-white font-bold text-lg">€{amount}</div>
                      <div className="text-gray-400 text-sm">{(amount * 100).toLocaleString()} F̈</div>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Billing Information */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-[#3c385996] border border-[#286db24c] rounded-2xl shadow-lg md:p-6 p-2"
            >
              <h3 className="text-white text-xl font-semibold mb-6">Billing & Invoicing</h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FaInfoCircle className="text-blue-400" />
                    <span className="text-gray-400">Invoice Generation</span>
                  </div>
                  <span className="text-green-400">Automatic</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FaCalendar className="text-purple-400" />
                    <span className="text-gray-400">Payment Terms</span>
                  </div>
                  <span className="text-white">Net 30 days</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FaDownload className="text-orange-400" />
                    <span className="text-gray-400">Tax Documents</span>
                  </div>
                  <span className="text-white">Available</span>
                </div>
              </div>

              <div className="mt-6 bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <FaInfoCircle className="text-blue-400 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-300 text-sm">
                    "All transactions are fully documented and available for accounting purposes. Contact support for custom billing arrangements."
                  </p>
                </div>
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
              <h3 className="text-white text-xl font-semibold mb-3">Campaign Performance & Spending</h3>

              {campaigns.map((campaign, index) => (
                <motion.div
                  key={campaign.id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * index }}
                  className="mb-6 last:mb-0"
                >
                  <div className="bg-[#3337597b] rounded-xl md:p-6 p-2 border border-[#286db24c]">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-white text-lg font-semibold">{campaign.name}</h4>
                      <span className={`text-xs px-2 py-1 rounded ${
                        campaign.type === 'FNKT Reward' ? 'bg-green-500/20 text-green-400' :
                        campaign.type === 'Product-Funded' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-purple-500/20 text-purple-400'
                      }`}>
                        {campaign.type}
                      </span>
                    </div>

                    {campaign.type === 'FNKT Reward' && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-400">{campaign.interactions.scans}</div>
                          <div className="text-gray-400 text-sm">NFC Scans</div>
                          <div className="text-gray-500 text-xs">F̈ {campaign.interactions.costPerScan} each</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-400">{campaign.interactions.clicks}</div>
                          <div className="text-gray-400 text-sm">Clicks</div>
                          <div className="text-gray-500 text-xs">F̈ {campaign.interactions.costPerClick} each</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-400">{campaign.interactions.redemptions}</div>
                          <div className="text-gray-400 text-sm">Redemptions</div>
                          <div className="text-gray-500 text-xs">F̈ {campaign.interactions.costPerRedemption} each</div>
                        </div>
                      </div>
                    )}

                    {campaign.type === 'Product-Funded' && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-400">{campaign.products.funded}</div>
                          <div className="text-gray-400 text-sm">Units Funded</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-red-400">{campaign.products.consumed}</div>
                          <div className="text-gray-400 text-sm">Units Consumed</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-400">{campaign.products.remaining}</div>
                          <div className="text-gray-400 text-sm">Units Remaining</div>
                        </div>
                      </div>
                    )}

                    <div className="bg-[#2a2d4a] rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400">Budget Utilization</span>
                        <span className="text-white font-semibold">
                          {((campaign.spent / campaign.allocated) * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-[#f64c68] h-2 rounded-full"
                          style={{ width: `${(campaign.spent / campaign.allocated) * 100}%` }}
                        ></div>
                      </div>
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
              <h3 className="text-white text-xl font-semibold">Financial Transaction History</h3>
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
                  onClick={() => setSelectedTransaction(transaction)}
                  className="flex md:items-center justify-between md:flex-row flex-col bg-[#3337597b] rounded-xl md:p-4 p-2 border border-[#286db24c] cursor-pointer hover:bg-[#2a2d4a] transition-colors"
                >
                  <div className="flex items-center md:gap-4 gap-2">
                    <div className={`p-2 rounded-full ${
                      transaction.amount > 0 ? 'bg-green-500/20' : 'bg-red-500/20'
                    }`}>
                      {transaction.amount > 0 ? (
                        <FaPlus className="text-green-400" />
                      ) : (
                        <FaMinus className="text-red-400" />
                      )}
                    </div>
                    <div>
                      <span className="text-white font-semibold">{transaction.description}</span>
                      <div className="text-gray-400 text-sm flex items-center gap-4">
                        <span>{transaction.date} {transaction.time}</span>
                        <span className="text-green-400 flex items-center gap-1">
                          <FaCheckCircle className="text-xs" />
                          {transaction.type}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-bold text-lg ${
                      transaction.amount > 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {transaction.amount > 0 ? '+' : ''}F̈ {Math.abs(transaction.amount).toLocaleString()}
                    </div>
                    <div className="text-gray-400 text-sm">ID: {transaction.id}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Security Notice */}
            <div className="mt-6 bg-[#1e2139] rounded-xl p-4 border border-[#286db24c]">
              <div className="flex items-start gap-3">
                <FaShieldAlt className="text-blue-400 mt-1" />
                <div>
                  <h4 className="text-white font-semibold mb-2">Security & Auditability</h4>
                  <p className="text-gray-300 text-sm">
                    All wallet balances and transactions are system-controlled and cannot be altered manually. Every transaction is verified and permanently recorded for full auditability.
                  </p>
                </div>
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
                <h3 className="text-white text-xl font-semibold mb-6">Performance Metrics</h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FaUsers className="text-blue-400" />
                      <span className="text-gray-400">Total Interactions</span>
                    </div>
                    <span className="text-white font-bold text-xl">{performanceMetrics.totalInteractions}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FaChartLine className="text-green-400" />
                      <span className="text-gray-400">Engagement Rate</span>
                    </div>
                    <span className="text-white font-bold text-xl">{performanceMetrics.totalEngagement}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FaCoins className="text-purple-400" />
                      <span className="text-gray-400">Avg Cost/Engagement</span>
                    </div>
                    <span className="text-white font-bold text-xl">F̈ {performanceMetrics.avgCostPerEngagement}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FaShoppingCart className="text-orange-400" />
                      <span className="text-gray-400">Conversion Rate</span>
                    </div>
                    <span className="text-white font-bold text-xl">{performanceMetrics.conversionRate}%</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#3c385996] border border-[#286db24c] rounded-2xl shadow-lg md:p-6 p-2">
                <h3 className="text-white text-xl font-semibold mb-6">Campaign Distribution</h3>

                <div className="space-y-4">
                  {campaigns.map((campaign, index) => (
                    <div key={campaign.id} className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="text-white font-semibold text-sm mb-1">{campaign.name}</div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-[#f64c68] h-2 rounded-full"
                            style={{ width: `${(campaign.spent / campaign.allocated) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-white font-bold">{((campaign.spent / campaign.allocated) * 100).toFixed(0)}%</div>
                        <div className="text-gray-400 text-sm">F̈ {campaign.spent.toLocaleString()}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-[#3c385996] border border-[#286db24c] rounded-2xl shadow-lg md:p-6 p-2"
            >
              <h3 className="text-white text-xl font-semibold mb-6">Interaction Validation</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <FaShieldAlt className="text-green-400 text-3xl mx-auto mb-2" />
                  <h4 className="text-white font-semibold mb-1">NFC Verified</h4>
                  <p className="text-gray-400 text-sm">All scans authenticated</p>
                </div>

                <div className="text-center">
                  <FaUsers className="text-blue-400 text-3xl mx-auto mb-2" />
                  <h4 className="text-white font-semibold mb-1">Real Users</h4>
                  <p className="text-gray-400 text-sm">No bots or fake accounts</p>
                </div>

                <div className="text-center">
                  <FaLock className="text-purple-400 text-3xl mx-auto mb-2" />
                  <h4 className="text-white font-semibold mb-1">Fraud Protected</h4>
                  <p className="text-gray-400 text-sm">Advanced security measures</p>
                </div>
              </div>

              <div className="mt-6 bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <FaInfoCircle className="text-blue-400 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-300 text-sm">
                    "All interactions shown are verified and generated by real users."
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

export default SponsorWallet;
