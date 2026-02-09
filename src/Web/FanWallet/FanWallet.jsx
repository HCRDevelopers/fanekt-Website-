import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaMobile,
  FaTrophy,
  FaArrowLeft,
  FaUsers,
  FaEnvelope,
  FaWallet,
  FaCreditCard,
  FaHistory,
  FaGift,
  FaQuestionCircle,
  FaPlus,
  FaTimes,
  FaCheckCircle,
  FaInfoCircle
} from "react-icons/fa";

// Import API service
import { getUserPoints, stripeMakePayment } from "../../API/apiService";

// Import components
import WalletHeader from "./components/WalletHeader";
import EarningOverview from "./components/EarningOverview";
import RecentTransactions from "./components/RecentTransactions";
import RechargeSection from "./components/RechargeSection";
import TransactionHistory from "./components/TransactionHistory";
import RedemptionSection from "./components/RedemptionSection";
import EarningGuide from "./components/EarningGuide";
import WeeklyCompetition from "./components/WeeklyCompetition";

// Import modals
import TransactionDetailModal from "./modals/TransactionDetailModal";
import RedemptionModal from "./modals/RedemptionModal";

const FanWallet = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [selectedReward, setSelectedReward] = useState(null);
  const [rechargeAmount, setRechargeAmount] = useState('');
  const [isProcessingRecharge, setIsProcessingRecharge] = useState(false);
  const [isProcessingRedemption, setIsProcessingRedemption] = useState(false);

  // Wallet data state
  const [walletData, setWalletData] = useState({
    fnkt: 0,
    euro: 0,
    status: 'verified',
    isGuardianControlled: false
  });
  const [isLoadingPoints, setIsLoadingPoints] = useState(true);
  const [pointsError, setPointsError] = useState(null);

  // Fetch user points on component mount
  useEffect(() => {
    const fetchUserPoints = async () => {
      try {
        setIsLoadingPoints(true);
        setPointsError(null);
        const response = await getUserPoints();

        if (response.data.status) {
          setWalletData(prev => ({
            ...prev,
            fnkt: response.data.data.total_points,
            euro: response.data.data.total_points * 0.01 // Assuming 1 FNKT = 0.01 EUR conversion
          }));
        } else {
          setPointsError('Failed to fetch points');
        }
      } catch (error) {
        console.error('Error fetching user points:', error);
        setPointsError('Failed to load points. Please try again.');
      } finally {
        setIsLoadingPoints(false);
      }
    };

    fetchUserPoints();
  }, []);

  const earningSources = [
    {
      icon: <FaMobile className="text-blue-400" />,
      source: "NFC Scan Rewards",
      amount: 1200,
      date: "2024-01-15",
      time: "14:30",
      verified: true,
      type: "nfc"
    },
    {
      icon: <FaTrophy className="text-yellow-400" />,
      source: "Sponsor Campaign Participation",
      amount: 850,
      date: "2024-01-12",
      time: "16:45",
      verified: true,
      type: "campaign"
    },
    {
      icon: <FaUsers className="text-green-400" />,
      source: "Fan Activities",
      amount: 300,
      date: "2024-01-10",
      time: "11:20",
      verified: true,
      type: "activity"
    },
    {
      icon: <FaEnvelope className="text-purple-400" />,
      source: "Invitations",
      amount: 100,
      date: "2024-01-08",
      time: "09:15",
      verified: true,
      type: "invitation"
    }
  ];

  const transactions = [
    {
      id: "TXN001",
      type: "earned",
      amount: 500,
      source: "NFC Scan - Stadium Event",
      date: "2024-01-15",
      time: "14:30",
      status: "completed",
      verification: "NFC Verified",
      campaign: "Real Madrid vs Barcelona",
      description: "Scanned NFC tag at Santiago Bernabéu Stadium during match",
      referenceId: "NFC-2024-001"
    },
    {
      id: "TXN002",
      type: "earned",
      amount: 300,
      source: "Campaign Participation",
      date: "2024-01-12",
      time: "16:45",
      status: "completed",
      verification: "Campaign Verified",
      campaign: "Fan Engagement Challenge",
      description: "Participated in sponsored fan engagement activities",
      referenceId: "CMP-2024-012"
    },
    {
      id: "TXN003",
      type: "spent",
      amount: -150,
      source: "Item Redemption",
      date: "2024-01-10",
      time: "11:20",
      status: "completed",
      verification: "System Verified",
      campaign: null,
      description: "Redeemed FNKT for official team merchandise",
      referenceId: "RED-2024-010"
    }
  ];

  const availableRewards = [
    {
      id: 1,
      name: "Official Team Jersey",
      cost: 500,
      sponsor: "Nike",
      availability: "In Stock",
      image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&h=100",
      category: "Merchandise",
      description: "Authentic Real Madrid jersey with player name and number customization"
    },
    {
      id: 2,
      name: "VIP Match Tickets",
      cost: 800,
      sponsor: "La Liga",
      availability: "Limited",
      image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&h=100",
      category: "Tickets",
      description: "VIP seats for Real Madrid vs Barcelona match with premium hospitality"
    },
    {
      id: 3,
      name: "Premium Subscription",
      cost: 300,
      sponsor: "FanEKT",
      availability: "Available",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&h=100",
      category: "Digital",
      description: "3-month premium FanEKT subscription with exclusive content and early access"
    },
    {
      id: 4,
      name: "Stadium Tour Experience",
      cost: 400,
      sponsor: "Santiago Bernabéu",
      availability: "In Stock",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&h=100",
      category: "Experience",
      description: "Guided tour of Santiago Bernabéu stadium including dressing rooms and trophy room"
    },
    {
      id: 5,
      name: "Player Meet & Greet",
      cost: 1200,
      sponsor: "Real Madrid",
      availability: "Limited",
      image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&h=100",
      category: "Experience",
      description: "Meet and greet with Real Madrid players after training session"
    },
    {
      id: 6,
      name: "Official Football",
      cost: 150,
      sponsor: "Adidas",
      availability: "In Stock",
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&h=100",
      category: "Merchandise",
      description: "Official match ball used in La Liga games"
    }
  ];


  const handleRecharge = async () => {
    if (!rechargeAmount || parseFloat(rechargeAmount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    const amount = parseFloat(rechargeAmount);
    const points = Math.floor(amount * 100); // 1€ = 100 FNKT

    setIsProcessingRecharge(true);

    try {
      const response = await stripeMakePayment({ amount, points });

      if (response.data.status && response.data.data.url) {
        window.location.href = response.data.data.url;
      } else {
        alert('Failed to initiate payment. Please try again.');
      }
    } catch (error) {
      console.error('Recharge error:', error);
      alert('Recharge failed. Please try again.');
    } finally {
      setIsProcessingRecharge(false);
    }
  };

  const handleRedeem = async (reward) => {
    if (walletData.fnkt < reward.cost) {
      alert('Insufficient FNKT balance');
      return;
    }

    if (walletData.isGuardianControlled) {
      alert('Redemption requests require guardian approval');
      return;
    }

    setSelectedReward(reward);
  };

  const confirmRedemption = async () => {
    if (!selectedReward) return;

    setIsProcessingRedemption(true);

    try {
      // Mock API call - replace with actual redemption API
      await new Promise(resolve => setTimeout(resolve, 2000));

      alert(`Successfully redeemed ${selectedReward.name}! Check your email for redemption details.`);
      setSelectedReward(null);

      // In a real app, you'd update the wallet balance here
    } catch (error) {
      alert('Redemption failed. Please try again.');
    } finally {
      setIsProcessingRedemption(false);
    }
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
        className="bg-[#1e2139] rounded-2xl border border-[#286db24c] shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white text-xl font-bold">Transaction Details</h3>
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
              <span className={`font-semibold ${transaction.type === 'earned' ? 'text-green-400' : 'text-red-400'}`}>
                {transaction.type === 'earned' ? '+' : ''}{transaction.amount} FNKT
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-400">Source</span>
              <span className="text-white">{transaction.source}</span>
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

            <div className="flex items-center justify-between">
              <span className="text-gray-400">Verification</span>
              <span className="text-blue-400">{transaction.verification}</span>
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

            <div className="bg-[#2a2d4a] rounded-lg p-4 mt-4">
              <div className="flex items-start gap-2">
                <FaInfoCircle className="text-blue-400 mt-0.5 flex-shrink-0" />
                <p className="text-gray-300 text-sm">
                  "This transaction was verified and securely recorded by FANEKT."
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  const RedemptionModal = ({ reward, onClose, onConfirm }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 md:p-4 p-2"
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
            <h3 className="text-white text-2xl font-bold">Confirm Redemption</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <FaTimes />
            </button>
          </div>

          {/* Reward Image and Details */}
          <div className="flex items-start gap-4 mb-6">
            <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
              <img
                src={reward.image}
                alt={reward.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = '/api/placeholder/100/100';
                }}
              />
            </div>
            <div className="flex-1">
              <h4 className="text-white text-xl font-bold mb-2">{reward.name}</h4>
              <p className="text-gray-300 text-sm mb-3">{reward.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Sponsored by {reward.sponsor}</span>
                <span className={`text-xs px-2 py-1 rounded ${
                  reward.availability === 'In Stock' ? 'bg-green-500/20 text-green-400' :
                  reward.availability === 'Limited' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-blue-500/20 text-blue-400'
                }`}>
                  {reward.availability}
                </span>
              </div>
            </div>
          </div>

          {/* Cost Breakdown */}
          <div className="bg-[#2a2d4a] rounded-xl p-4 mb-6">
            <h5 className="text-white font-semibold mb-3">Redemption Summary</h5>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Current Balance:</span>
                <span className="text-white">{walletData.fnkt.toLocaleString()} FNKT</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Redemption Cost:</span>
                <span className="text-red-400">-{reward.cost} FNKT</span>
              </div>
              <div className="border-t border-[#286db24c] pt-2 mt-2">
                <div className="flex justify-between">
                  <span className="text-white font-semibold">Balance After:</span>
                  <span className={`font-bold ${(walletData.fnkt - reward.cost) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {(walletData.fnkt - reward.cost).toLocaleString()} FNKT
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Important Notice */}
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-2">
              <FaInfoCircle className="text-yellow-400 mt-0.5 flex-shrink-0" />
              <div>
                <h5 className="text-yellow-400 font-semibold mb-1">Important Notice</h5>
                <p className="text-gray-300 text-sm">
                  This redemption cannot be reversed. You will receive redemption details via email once confirmed.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 px-4 border border-[#286db24c] rounded-lg text-gray-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={isProcessingRedemption}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                isProcessingRedemption
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] text-white hover:shadow-lg'
              }`}
            >
              {isProcessingRedemption ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processing...
                </div>
              ) : (
                'Confirm Redemption'
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

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
            onClick={() => window.history.back()}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FaArrowLeft className="text-xl" />
          </button>
          <h1 className="text-3xl lg:text-4xl font-bold text-white">Fan Wallet</h1>
        </div>
        <p className="text-gray-400 text-lg">
          Manage your FNKT balance and track all transactions
        </p>
      </motion.div>

      {/* Wallet Header */}
      <WalletHeader walletData={walletData} />


      {/* Tab Navigation */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-6"
      >
        <div className="grid lg:grid-cols-6 md:grid-cols-4 grid-cols-2 gap-2 bg-[#1e2139] rounded-xl border border-[#286db24c] mt-7 p-2">
          {[
            { key: 'overview', label: 'Overview', icon: <FaWallet /> },
            { key: 'recharge', label: 'Recharge', icon: <FaCreditCard /> },
            { key: 'history', label: 'History', icon: <FaHistory /> },
            { key: 'redemption', label: 'Redeem', icon: <FaGift /> },
            { key: 'competition', label: 'Weekly Competition', icon: <FaTrophy /> },
            { key: 'earning', label: 'How to Earn', icon: <FaQuestionCircle /> }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 border py-1.5 px-2 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-1 sm:text-[14px] text-[12px] ${
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
          <>
            <EarningOverview earningSources={earningSources} />
            <RecentTransactions
              transactions={transactions}
              onViewAll={() => setActiveTab('history')}
              onTransactionClick={setSelectedTransaction}
            />
          </>
        )}

        {activeTab === 'recharge' && (
          <RechargeSection
            rechargeAmount={rechargeAmount}
            setRechargeAmount={setRechargeAmount}
            onRecharge={handleRecharge}
            isProcessingRecharge={isProcessingRecharge}
          />
        )}

        {activeTab === 'history' && (
          <TransactionHistory
            transactions={transactions}
            onTransactionClick={setSelectedTransaction}
          />
        )}

        {activeTab === 'redemption' && (
          <RedemptionSection
            availableRewards={availableRewards}
            walletData={walletData}
            onRedeem={handleRedeem}
          />
        )}

        {activeTab === 'earning' && (
          <EarningGuide />
        )}

        {activeTab === 'competition' && (
          <WeeklyCompetition />
        )}
      </motion.div>

      {/* Transaction Detail Modal */}
      {selectedTransaction && (
        <TransactionDetailModal
          transaction={selectedTransaction}
          onClose={() => setSelectedTransaction(null)}
        />
      )}

      {/* Redemption Confirmation Modal */}
      {selectedReward && (
        <RedemptionModal
          reward={selectedReward}
          onClose={() => setSelectedReward(null)}
          onConfirm={confirmRedemption}
        />
      )}
    </div>
  );
};

export default FanWallet;
