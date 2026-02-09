import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FaCoins,
  FaExchangeAlt,
  FaHistory,
  FaUserFriends,
  FaShieldAlt,
  FaCheckCircle,
  FaInfoCircle,
  FaSearch,
  FaUser,
  FaCrown,
  FaArrowRight,
  FaArrowLeft,
  FaClock,
  FaExclamationTriangle
} from 'react-icons/fa';

// Import API service
import { getProfile } from '../../API/apiService';

function TransferFnktPoints() {
  const [activeTab, setActiveTab] = useState('transfer');
  const [currentBalance, setCurrentBalance] = useState(0);
  const [transferData, setTransferData] = useState({
    recipientType: 'fan',
    recipientEmail: '',
    amount: '',
    description: ''
  });
  const [transferHistory, setTransferHistory] = useState([
    {
      id: 1,
      type: 'sent',
      amount: 150,
      recipient: 'john.doe@fanekt.com',
      recipientType: 'fan',
      description: 'Support for Barcelona match tickets',
      timestamp: '2024-01-20T14:30:00Z',
      status: 'completed'
    },
    {
      id: 2,
      type: 'received',
      amount: 75,
      sender: 'barcelona.fc@fanekt.com',
      senderType: 'pro',
      description: 'Match ticket bonus from Barcelona FC',
      timestamp: '2024-01-18T16:45:00Z',
      status: 'completed'
    },
    {
      id: 3,
      type: 'sent',
      amount: 200,
      recipient: 'chelsea.fc@fanekt.com',
      recipientType: 'pro',
      description: 'Team sponsorship contribution',
      timestamp: '2024-01-15T11:20:00Z',
      status: 'completed'
    },
    {
      id: 4,
      type: 'received',
      amount: 50,
      sender: 'realmadrid@fanekt.com',
      senderType: 'pro',
      description: 'Loyalty reward from Real Madrid',
      timestamp: '2024-01-12T09:15:00Z',
      status: 'completed'
    },
    {
      id: 5,
      type: 'sent',
      amount: 300,
      recipient: 'psg@fanekt.com',
      recipientType: 'pro',
      description: 'Champions League sponsorship',
      timestamp: '2024-01-10T13:45:00Z',
      status: 'completed'
    },
    {
      id: 6,
      type: 'received',
      amount: 25,
      sender: 'manchester.united@fanekt.com',
      senderType: 'pro',
      description: 'Fan engagement bonus',
      timestamp: '2024-01-08T17:20:00Z',
      status: 'completed'
    },
    {
      id: 7,
      type: 'sent',
      amount: 120,
      recipient: 'bayern.munich@fanekt.com',
      recipientType: 'pro',
      description: 'Bundesliga support',
      timestamp: '2024-01-05T12:10:00Z',
      status: 'completed'
    },
    {
      id: 8,
      type: 'received',
      amount: 40,
      sender: 'juventus@fanekt.com',
      senderType: 'pro',
      description: 'Serie A fan bonus',
      timestamp: '2024-01-03T15:30:00Z',
      status: 'completed'
    }
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Notification popup state
  const [notification, setNotification] = useState({
    show: false,
    message: '',
    type: 'success' // 'success' or 'error'
  });

  // Mock transfer history data
  const mockTransferHistory = [
    {
      id: 1,
      type: 'sent',
      amount: 150,
      recipient: 'john.doe@fanekt.com',
      recipientType: 'fan',
      description: 'Support for Barcelona match tickets',
      timestamp: '2024-01-20T14:30:00Z',
      status: 'completed'
    },
    {
      id: 2,
      type: 'received',
      amount: 75,
      sender: 'barcelona.fc@fanekt.com',
      senderType: 'pro',
      description: 'Match ticket bonus from Barcelona FC',
      timestamp: '2024-01-18T16:45:00Z',
      status: 'completed'
    },
    {
      id: 3,
      type: 'sent',
      amount: 200,
      recipient: 'chelsea.fc@fanekt.com',
      recipientType: 'pro',
      description: 'Team sponsorship contribution',
      timestamp: '2024-01-15T11:20:00Z',
      status: 'completed'
    },
    {
      id: 4,
      type: 'received',
      amount: 50,
      sender: 'realmadrid@fanekt.com',
      senderType: 'pro',
      description: 'Loyalty reward from Real Madrid',
      timestamp: '2024-01-12T09:15:00Z',
      status: 'completed'
    },
    {
      id: 5,
      type: 'sent',
      amount: 300,
      recipient: 'psg@fanekt.com',
      recipientType: 'pro',
      description: 'Champions League sponsorship',
      timestamp: '2024-01-10T13:45:00Z',
      status: 'completed'
    },
    {
      id: 6,
      type: 'received',
      amount: 25,
      sender: 'manchester.united@fanekt.com',
      senderType: 'pro',
      description: 'Fan engagement bonus',
      timestamp: '2024-01-08T17:20:00Z',
      status: 'completed'
    },
    {
      id: 7,
      type: 'sent',
      amount: 120,
      recipient: 'bayern.munich@fanekt.com',
      recipientType: 'pro',
      description: 'Bundesliga support',
      timestamp: '2024-01-05T12:10:00Z',
      status: 'completed'
    },
    {
      id: 8,
      type: 'received',
      amount: 40,
      sender: 'juventus@fanekt.com',
      senderType: 'pro',
      description: 'Serie A fan bonus',
      timestamp: '2024-01-03T15:30:00Z',
      status: 'completed'
    }
  ];

  // Fetch profile data on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const response = await getProfile();

        if (response.data.status && response.data.data.user.fan) {
          // Mock balance - in real app this would come from API
          setCurrentBalance(1250);
          setTransferHistory(mockTransferHistory);
        } else {
          // If no profile data, still set mock data for demo
          setCurrentBalance(1250);
          setTransferHistory(mockTransferHistory);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        // Set mock data even on error for demo purposes
        setCurrentBalance(1250);
        setTransferHistory(mockTransferHistory);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Show notification popup
  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: 'success' });
    }, 3000);
  };

  const handleTransfer = () => {
    if (!transferData.recipientEmail.trim() || !transferData.amount || parseFloat(transferData.amount) <= 0) {
      showNotification('Please fill in all required fields with valid values.', 'error');
      return;
    }

    if (parseFloat(transferData.amount) > currentBalance) {
      showNotification('Insufficient FNKT balance for this transfer.', 'error');
      return;
    }

    setShowConfirmModal(true);
  };

  const confirmTransfer = () => {
    // Mock transfer logic
    const newBalance = currentBalance - parseFloat(transferData.amount);
    setCurrentBalance(newBalance);

    const newTransfer = {
      id: Date.now(),
      type: 'sent',
      amount: parseFloat(transferData.amount),
      recipient: transferData.recipientEmail,
      recipientType: transferData.recipientType,
      description: transferData.description || 'FNKT Transfer',
      timestamp: new Date().toISOString(),
      status: 'completed'
    };

    setTransferHistory(prev => [newTransfer, ...prev]);
    setTransferData({
      recipientType: 'fan',
      recipientEmail: '',
      amount: '',
      description: ''
    });
    setShowConfirmModal(false);
    showNotification(`Successfully transferred ${transferData.amount} FNKT!`, 'success');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getRecipientTypeIcon = (type) => {
    return type === 'pro' ? <FaCrown className="text-yellow-400" /> : <FaUser className="text-blue-400" />;
  };

  const getRecipientTypeColor = (type) => {
    return type === 'pro' ? 'text-yellow-400 bg-yellow-400/10' : 'text-blue-400 bg-blue-400/10';
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
          Transfer FNKT Points
        </h1>
        <p className="text-gray-400 text-lg">
          Transfer your FNKT points to other fans or verified PRO accounts. FNKT transfers between users are allowed but cash-out is not permitted for fans.
        </p>
      </motion.div>

      {/* Notification Popup */}
      {notification.show && (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50"
        >
          <div className={`px-6 py-3 rounded-lg shadow-2xl border-2 backdrop-blur-sm ${notification.type === 'success'
            ? 'bg-green-600/90 border-green-400 text-white'
            : 'bg-red-600/90 border-red-400 text-white'
            }`}>
            <div className="flex items-center gap-3">
              {notification.type === 'success' ? (
                <FaCheckCircle className="text-green-200 text-xl" />
              ) : (
                <FaInfoCircle className="text-red-200 text-xl" />
              )}
              <span className="font-medium text-sm">{notification.message}</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Current Balance Card */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-400/30 rounded-2xl md:p-6 p-2 mb-6"
      >
        <div className="flex sm:items-center justify-between sm:flex-row flex-col">
          <div className="flex items-center md:gap-4 gap-2">
            <div className="md:w-12 w-8 md:h-12 h-8 bg-green-600/20 rounded-full flex items-center justify-center border border-green-400">
              <FaCoins className="text-green-400 text-xl" />
            </div>
            <div>
              <h3 className="text-white md:text-xl text-md font-bold">Current Balance</h3>
              <p className="text-gray-400 md:text-md text-xs">Available FNKT points for transfer</p>
            </div>
          </div>
          <div className="text-right">
            <div className="md:text-3xl text-lg font-bold text-green-400">{currentBalance.toLocaleString()}</div>
            <div className="text-gray-400 md:text-sm text-xs">FNKT Points</div>
          </div>
        </div>
      </motion.div>

      {/* Tab Navigation */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-6"
      >
        <div className="grid grid-cols-2 gap-1 bg-[#1e2139] p-1 rounded-xl border border-[#286db24c]">
          <button
            onClick={() => setActiveTab('transfer')}
            className={`py-3 sm:px-4 px-2 rounded-lg font-semibold transition-all duration-300 sm:text-lg text-sm ${activeTab === 'transfer'
              ? 'bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] text-white shadow-lg'
              : 'text-gray-400 hover:text-white'
              }`}
          >
            <FaExchangeAlt className="inline mr-2" />
            Transfer FNKT
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`py-3 sm:px-4 px-2 rounded-lg font-semibold transition-all duration-300 sm:text-lg text-sm ${activeTab === 'history'
              ? 'bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] text-white shadow-lg'
              : 'text-gray-400 hover:text-white'
              }`}
          >
            <FaHistory className="inline mr-2" />
            Transfer History
          </button>
        </div>
      </motion.div>

      {/* Transfer Tab */}
      {activeTab === 'transfer' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {/* Transfer Rules Info */}
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-400/30 rounded-2xl md:p-6 p-2">
            <div className="flex items-start gap-4 mb-3">
              <FaShieldAlt className="text-blue-400 text-3xl mt-1 flex-shrink-0" />
              <h3 className="text-white text-xl font-bold mb-2">FNKT Transfer Rules</h3>
            </div>
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#1e2139] rounded-lg p-4 border border-[#286db24c]">
                  <h4 className="text-green-400 font-semibold mb-2 flex items-center gap-2">
                    <FaCheckCircle className="text-green-400" />
                    Allowed Transfers
                  </h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Fan → Fan transfers</li>
                    <li>• Fan → PRO transfers</li>
                    <li>• PRO → Fan transfers</li>
                    <li>• PRO → PRO transfers</li>
                  </ul>
                </div>
                <div className="bg-[#1e2139] rounded-lg p-4 border border-[#286db24c]">
                  <h4 className="text-red-400 font-semibold mb-2 flex items-center gap-2">
                    <FaExclamationTriangle className="text-red-400" />
                    Not Allowed
                  </h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Cash-out for fans</li>
                    <li>• Money conversion for fans</li>
                    <li>• Transfers to unverified accounts</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Transfer Form */}
          <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl md:p-6 p-2">
            <h3 className="text-white text-xl font-bold mb-4">Transfer FNKT Points</h3>

            <div className="space-y-6">
              {/* Recipient Type */}
              <div>
                <label className="block text-white font-medium mb-3">
                  Recipient Type <span className="text-red-400">*</span>
                </label>
                <div className="grid grid-cols-2 md:gap-4 gap-2">
                  <button
                    onClick={() => setTransferData({ ...transferData, recipientType: 'fan' })}
                    className={`md:p-4 p-2 rounded-lg border transition-all duration-300 ${transferData.recipientType === 'fan'
                      ? 'border-blue-400 bg-blue-400/10'
                      : 'border-[#286db24c] bg-[#1e2139] hover:border-blue-400'
                      }`}
                  >
                    <div className="flex sm:items-center sm:flex-row flex-col md:gap-3 gap-1">
                      <FaUser className="text-blue-400 text-xl" />
                      <div className="text-left">
                        <div className="text-white md:text-lg text-sm font-semibold">Fan Account</div>
                        <div className="text-gray-400 md:text-sm text-xs">Regular user</div>
                      </div>
                    </div>
                  </button>
                  <button
                    onClick={() => setTransferData({ ...transferData, recipientType: 'pro' })}
                    className={`md:p-4 p-2 rounded-lg border transition-all duration-300 ${transferData.recipientType === 'pro'
                      ? 'border-yellow-400 bg-yellow-400/10'
                      : 'border-[#286db24c] bg-[#1e2139] hover:border-yellow-400'
                      }`}
                  >
                    <div className="flex sm:items-center sm:flex-row flex-col md:gap-3 gap-1">
                      <FaCrown className="text-yellow-400 text-xl" />
                      <div className="text-left">
                        <div className="text-white md:text-lg text-sm font-semibold">PRO Account</div>
                        <div className="text-gray-400 md:text-sm text-xs">Verified club/team</div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Recipient Email */}
              <div>
                <label className="block text-white font-medium mb-2">
                  Recipient Email <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={transferData.recipientEmail}
                    onChange={(e) => setTransferData({ ...transferData, recipientEmail: e.target.value })}
                    placeholder="Enter recipient's email address"
                    className="w-full bg-[#1e2139] text-white pl-10 pr-4 py-3 rounded-lg border border-[#286db24c] focus:outline-none focus:border-[#f64c68]"
                  />
                </div>
                <p className="text-gray-400 text-sm mt-1">
                  Recipient must have a {transferData.recipientType === 'pro' ? 'verified PRO' : 'registered fan'} account
                </p>
              </div>

              {/* Transfer Amount */}
              <div>
                <label className="block text-white font-medium mb-2">
                  Transfer Amount <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <FaCoins className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400" />
                  <input
                    type="number"
                    value={transferData.amount}
                    onChange={(e) => setTransferData({ ...transferData, amount: e.target.value })}
                    placeholder="0"
                    min="1"
                    max={currentBalance}
                    className="w-full bg-[#1e2139] text-white pl-10 pr-4 py-3 rounded-lg border border-[#286db24c] focus:outline-none focus:border-green-400"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">FNKT</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-gray-400">Available: {currentBalance.toLocaleString()} FNKT</span>
                  {transferData.amount && (
                    <span className={`font-medium ${parseFloat(transferData.amount) > currentBalance ? 'text-red-400' : 'text-green-400'
                      }`}>
                      Remaining: {(currentBalance - parseFloat(transferData.amount || 0)).toLocaleString()} FNKT
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-white font-medium mb-2">
                  Description (Optional)
                </label>
                <textarea
                  value={transferData.description}
                  onChange={(e) => setTransferData({ ...transferData, description: e.target.value })}
                  placeholder="Add a note about this transfer..."
                  rows="3"
                  className="w-full bg-[#1e2139] text-white px-4 py-3 rounded-lg border border-[#286db24c] focus:outline-none focus:border-[#f64c68] resize-none"
                />
              </div>

              {/* Transfer Button */}
              <div className="flex gap-4">
                <button
                  onClick={handleTransfer}
                  disabled={!transferData.recipientEmail.trim() || !transferData.amount || parseFloat(transferData.amount) <= 0 || parseFloat(transferData.amount) > currentBalance}
                  className="flex-1 bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <FaExchangeAlt />
                  Transfer FNKT
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )
      }

      {/* History Tab */}
      {
        activeTab === 'history' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* History Header */}
            <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl md:p-6 p-2">
              <h3 className="text-white text-xl font-bold mb-2">Transfer History</h3>
              <p className="text-gray-400">View all your FNKT transfers and transactions</p>
            </div>

            {/* Transfer History List */}
            <div className="space-y-4">
              {transferHistory.map((transfer, index) => (
                <motion.div
                  key={transfer.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl md:p-6 p-2"
                >
                  <div className="flex md:items-center md:flex-row flex-col gap-3 justify-between">
                    <div className="flex items-start md:gap-4 gap-2">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${transfer.type === 'sent' ? 'bg-red-600/20' : 'bg-green-600/20'
                        }`}>
                        {transfer.type === 'sent' ? (
                          <FaArrowRight className="text-red-400 text-lg" />
                        ) : (
                          <FaArrowLeft className="text-green-400 text-lg" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-white font-semibold">
                            {transfer.type === 'sent' ? 'Sent to' : 'Received from'}
                          </h4>
                          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${getRecipientTypeColor(transfer.type === 'sent' ? transfer.recipientType : transfer.senderType)}`}>
                            {getRecipientTypeIcon(transfer.type === 'sent' ? transfer.recipientType : transfer.senderType)}
                            <span className="capitalize">{transfer.type === 'sent' ? transfer.recipientType : transfer.senderType}</span>
                          </div>
                        </div>
                        <p className="text-gray-400 text-sm">
                          {transfer.type === 'sent' ? transfer.recipient : transfer.sender}
                        </p>
                        {transfer.description && (
                          <p className="text-gray-300 text-sm mt-1">"{transfer.description}"</p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-xl font-bold ${transfer.type === 'sent' ? 'text-red-400' : 'text-green-400'
                        }`}>
                        {transfer.type === 'sent' ? '-' : '+'}{transfer.amount}
                      </div>
                      <div className="text-gray-400 text-sm">FNKT</div>
                      <div className="flex items-center gap-1 mt-1">
                        <FaClock className="text-gray-400 text-xs" />
                        <span className="text-gray-400 text-xs">{formatDate(transfer.timestamp)}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {transferHistory.length === 0 && (
                <div className="text-center py-12">
                  <FaHistory className="text-gray-400 text-4xl mx-auto mb-4" />
                  <h4 className="text-white font-semibold mb-2">No Transfer History</h4>
                  <p className="text-gray-400">Your FNKT transfers will appear here</p>
                </div>
              )}
            </div>
          </motion.div>
        )
      }

      {/* Confirmation Modal */}
      {
        showConfirmModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowConfirmModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-white text-xl font-bold mb-4">Confirm Transfer</h3>
              <p className="text-gray-400 text-sm mb-6">
                Please review the transfer details before confirming. This action cannot be undone.
              </p>

              <div className="space-y-4">
                <div className="bg-[#1e2139] rounded-lg p-4 border border-[#286db24c] space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Recipient:</span>
                    <span className="text-white">{transferData.recipientEmail}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Type:</span>
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${getRecipientTypeColor(transferData.recipientType)}`}>
                      {getRecipientTypeIcon(transferData.recipientType)}
                      <span className="capitalize">{transferData.recipientType}</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Amount:</span>
                    <span className="text-white font-semibold">{transferData.amount} FNKT</span>
                  </div>
                  {transferData.description && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Description:</span>
                      <span className="text-white">"{transferData.description}"</span>
                    </div>
                  )}
                </div>

                <div className="bg-blue-600/20 border border-blue-400/30 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <FaInfoCircle className="text-blue-400 text-lg mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-blue-400 font-medium mb-1">Transfer Confirmation</p>
                      <p className="text-blue-300 text-sm">
                        Once confirmed, the FNKT points will be immediately transferred to the recipient account.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={confirmTransfer}
                    className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <FaCheckCircle />
                    Confirm Transfer
                  </button>
                  <button
                    onClick={() => setShowConfirmModal(false)}
                    className="px-6 py-3 border border-gray-600 text-gray-400 rounded-lg hover:border-gray-500 hover:text-white transition-all duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )
      }
    </div >
  );
}

export default TransferFnktPoints;

