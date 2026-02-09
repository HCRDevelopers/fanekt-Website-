import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FaQrcode,
  FaLink,
  FaCopy,
  FaShare,
  FaWhatsapp,
  FaInstagram,
  FaFacebook,
  FaDownload,
  FaInfoCircle,
  FaCheckCircle,
  FaShieldAlt,
  FaClock,
  FaUserPlus,
  FaGift,
  FaSearch,
  FaPlus,
  FaStar,
  FaLock,
  FaUnlock,
  FaEye,
  FaEyeSlash,
  FaExchangeAlt,
  FaMobileAlt,
  FaWifi,
  FaIdCard,
  FaDatabase,
  FaSync,
  FaTrash,
  FaEdit,
  FaCog
} from 'react-icons/fa';

// Import API service
import { getProfile } from '../../API/apiService';

// Import QR Code library
import { QRCodeCanvas } from "qrcode.react";

// Import Modal Components
import ItemDetailsModal from './Modals/ItemDetailsModal';
import ClaimConfirmationModal from './Modals/ClaimConfirmationModal';
import TransferConfirmationModal from './Modals/TransferConfirmationModal';
import NFCScanningModal from './Modals/NFCScanningModal';

function MyXKryptedItems() {
  const [activeTab, setActiveTab] = useState('items');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showNFCMScanningModal, setShowNFCMScanningModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showItemDetailsModal, setShowItemDetailsModal] = useState(false);
  const [scanningProgress, setScanningProgress] = useState(0);
  const [scanningStatus, setScanningStatus] = useState('ready'); // 'ready', 'scanning', 'success', 'error'

  // Claim modal states
  const [claimData, setClaimData] = useState({
    uid: '',
    itemName: '',
    itemType: 'jersey'
  });

  // Transfer modal states
  const [transferData, setTransferData] = useState({
    recipientEmail: '',
    itemId: ''
  });

  // Notification popup state
  const [notification, setNotification] = useState({
    show: false,
    message: '',
    type: 'success' // 'success' or 'info'
  });

  // Mock X-KRYPTED items data
  const mockXKryptedItems = [
    {
      id: 1,
      uid: 'E200341201234567890ABCDEF',
      name: 'Barcelona FC Home Jersey',
      type: 'jersey',
      status: 'active',
      linkedTickets: 2,
      lastUsed: '2024-01-20',
      purchaseDate: '2024-01-15',
      serialNumber: 'FCBJ-2024-001',
      nfcType: 'ISO 15693 - NXP ICODE SLIX',
      url: 'https://fanekt.com/nfc/E200341201234567890ABCDEF'
    },
    {
      id: 2,
      uid: 'E200341201234567890ABCDEG',
      name: 'Real Madrid Away Pullover',
      type: 'pullover',
      status: 'active',
      linkedTickets: 1,
      lastUsed: '2024-01-18',
      purchaseDate: '2024-01-10',
      serialNumber: 'RMPU-2024-002',
      nfcType: 'ISO 15693 - NXP ICODE SLIX',
      url: 'https://fanekt.com/nfc/E200341201234567890ABCDEG'
    },
    {
      id: 3,
      uid: 'E200341201234567890ABCDEH',
      name: 'PSG Training Kit',
      type: 'training-kit',
      status: 'inactive',
      linkedTickets: 0,
      lastUsed: null,
      purchaseDate: '2024-01-05',
      serialNumber: 'PSGTK-2024-003',
      nfcType: 'ISO 15693 - NXP ICODE SLIX',
      url: 'https://fanekt.com/nfc/E200341201234567890ABCDEH'
    }
  ];

  const [userItems, setUserItems] = useState(mockXKryptedItems);
  const [referralCode, setReferralCode] = useState('');
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const qrRef = React.useRef();
  const [copied, setCopied] = useState(false);

  // Fetch profile data on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoadingProfile(true);
        const response = await getProfile();

        if (response.data.status && response.data.data.user.fan) {
          setReferralCode(response.data.data.user.fan.referral_code);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setIsLoadingProfile(false);
      }
    };

    fetchProfile();
  }, []);

  // Handle search with debouncing
  useEffect(() => {
    const searchItems = async () => {
      setIsSearching(true);

      let filteredResults = userItems;

      if (searchQuery.length >= 2) {
        filteredResults = filteredResults.filter(item =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.uid.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.serialNumber.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      setSearchResults(filteredResults);
      setIsSearching(false);
    };

    const debounceTimer = setTimeout(searchItems, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery, userItems]);

  const handleCopyLink = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleShare = (platform, item) => {
    const text = `Check out my X-KRYPTED ${item.name} on FANEKT! NFC-enabled smart item for events and more. ${item.url}`;
    const encodedText = encodeURIComponent(text);
    const encodedUrl = encodeURIComponent(item.url);

    const urls = {
      whatsapp: `https://wa.me/?text=${encodedText}`,
      instagram: `https://www.instagram.com/?url=${encodedUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`
    };

    if (urls[platform]) {
      window.open(urls[platform], '_blank');
    }
  };

  const handleDownloadQR = (item) => {
    if (qrRef.current) {
      const canvas = qrRef.current;
      const link = document.createElement('a');
      link.download = `x-krypted-${item.serialNumber}-qr.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  };

  // Show notification popup
  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: 'success' });
    }, 3000);
  };

  const handleClaimItem = () => {
    if (!claimData.uid.trim() || !claimData.itemName.trim()) return;

    // Mock claim logic
    const newItem = {
      id: Date.now(),
      uid: claimData.uid,
      name: claimData.itemName,
      type: claimData.itemType,
      status: 'active',
      linkedTickets: 0,
      lastUsed: null,
      purchaseDate: new Date().toISOString().split('T')[0],
      serialNumber: `XKR-${Date.now()}`,
      nfcType: 'ISO 15693 - NXP ICODE SLIX',
      url: `https://fanekt.com/nfc/${claimData.uid}`
    };

    setUserItems(prev => [...prev, newItem]);
    setShowClaimModal(false);
    setClaimData({ uid: '', itemName: '', itemType: 'jersey' });
    showNotification('X-KRYPTED item claimed successfully!', 'success');
  };

  const handleTransferItem = () => {
    if (!transferData.recipientEmail.trim() || !transferData.itemId) return;

    // Mock transfer logic
    setUserItems(prev => prev.filter(item => item.id !== parseInt(transferData.itemId)));
    setShowTransferModal(false);
    setTransferData({ recipientEmail: '', itemId: '' });
    showNotification('X-KRYPTED item transferred successfully!', 'success');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-400/10';
      case 'inactive': return 'text-gray-400 bg-gray-400/10';
      case 'suspended': return 'text-red-400 bg-red-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getItemTypeIcon = (type) => {
    switch (type) {
      case 'jersey': return '👕';
      case 'pullover': return '🧥';
      case 'training-kit': return '⚽';
      default: return '🏷️';
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
        <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
          My X-KRYPTED Items
        </h1>
        <p className="text-gray-400 text-lg">
          Manage your NFC-enabled smart items, event access, and digital experiences.
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
              : notification.type === 'error'
                ? 'bg-red-600/90 border-red-400 text-white'
                : 'bg-blue-600/90 border-blue-400 text-white'
            }`}>
            <div className="flex items-center gap-3">
              {notification.type === 'success' ? (
                <FaCheckCircle className="text-green-200 text-xl" />
              ) : notification.type === 'error' ? (
                <FaInfoCircle className="text-red-200 text-xl" />
              ) : (
                <FaInfoCircle className="text-blue-200 text-xl" />
              )}
              <span className="font-medium text-sm">{notification.message}</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Tab Navigation */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-1 bg-[#1e2139] p-1 rounded-xl border border-[#286db24c]">
          <button
            onClick={() => setActiveTab('items')}
            className={`py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${activeTab === 'items'
                ? 'bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] text-white shadow-lg'
                : 'text-gray-400 hover:text-white'
              }`}
          >
            <FaIdCard className="inline mr-2" />
            My Items
          </button>
          <button
            onClick={() => setActiveTab('claim')}
            className={`py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${activeTab === 'claim'
                ? 'bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] text-white shadow-lg'
                : 'text-gray-400 hover:text-white'
              }`}
          >
            <FaPlus className="inline mr-2" />
            Claim Item
          </button>
          <button
            onClick={() => setActiveTab('transfer')}
            className={`py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${activeTab === 'transfer'
                ? 'bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] text-white shadow-lg'
                : 'text-gray-400 hover:text-white'
              }`}
          >
            <FaExchangeAlt className="inline mr-2" />
            Transfer
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${activeTab === 'settings'
                ? 'bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] text-white shadow-lg'
                : 'text-gray-400 hover:text-white'
              }`}
          >
            <FaLock className="inline mr-2" />
            Settings
          </button>
        </div>
      </motion.div>

      {/* Tab Content */}
      {activeTab === 'items' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {/* Search Interface */}
          <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl md:p-6 p-2">
            <h3 className="text-white text-xl font-bold mb-4">Search Your X-KRYPTED Items</h3>

            {/* Search Input */}
            <div className="relative mb-6">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, UID, or serial number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#1e2139] text-white pl-10 pr-4 py-3 rounded-lg border border-[#286db24c] focus:outline-none focus:border-[#f64c68]"
              />
            </div>

            {/* Items List */}
            <div className="space-y-3 mb-6">
              {isSearching ? (
                <div className="text-center py-8">
                  <FaSearch className="text-gray-400 text-3xl mx-auto mb-2 animate-pulse" />
                  <p className="text-gray-400">Searching...</p>
                </div>
              ) : searchResults.length > 0 ? (
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {searchResults.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex md:items-center justify-between md:flex-row flex-col bg-[#1e2139] rounded-xl md:p-4 p-2 border border-[#286db24c] hover:border-[#f64c68] transition-all duration-300 cursor-pointer"
                      onClick={() => {
                        setSelectedItem(item);
                        setShowItemDetailsModal(true);
                      }}
                    >
                      <div className="flex items-center md:gap-4 gap-2">
                        <div className="w-12 h-12 rounded-full bg-[#286db24c] flex items-center justify-center text-2xl">
                          {getItemTypeIcon(item.type)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-white font-semibold">{item.name}</h4>
                            <div className={`items-center gap-2 px-2 py-1 rounded-full text-xs md:flex hidden ${getStatusColor(item.status)}`}>
                              <FaWifi className="text-xs" />
                              {item.status}
                            </div>
                          </div>
                          <p className="text-gray-400 text-sm">
                            UID: {item.uid.substring(0, 12)}... • {item.linkedTickets} linked tickets
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 justify-end">
                        <div className={`items-center gap-2 px-2 py-1 rounded-full text-xs md:hidden flex ${getStatusColor(item.status)}`}>
                          <FaWifi className="text-xs" />
                          {item.status}
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopyLink(item.url);
                          }}
                          className="p-2 text-gray-400 hover:text-white transition-colors"
                          title="Copy NFC URL"
                        >
                          <FaCopy />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDownloadQR(item);
                          }}
                          className="p-2 text-gray-400 hover:text-white transition-colors"
                          title="Download QR"
                        >
                          <FaQrcode />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : searchQuery.length >= 2 ? (
                <div className="text-center py-8">
                  <FaSearch className="text-gray-400 text-3xl mx-auto mb-2" />
                  <p className="text-gray-400">No items found matching your search.</p>
                </div>
              ) : (
                <div className="text-center py-8">
                  <FaIdCard className="text-gray-400 text-3xl mx-auto mb-2" />
                  <p className="text-gray-400">Start typing to search your X-KRYPTED items...</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {activeTab === 'claim' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {/* Claim Info */}
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-400/30 rounded-2xl md:p-6 p-2">
            <div className="flex items-start md:flex-row flex-col gap-4">
              <FaQrcode className="text-blue-400 text-3xl mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-white text-xl font-bold mb-2">Claim Your X-KRYPTED Item</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Claim your NFC-enabled smart item by entering its UID. This links the physical item to your digital account for event access and ticket validation.
                </p>
                <div className="bg-[#1e2139] rounded-lg p-4 border border-[#286db24c]">
                  <h4 className="text-white font-semibold mb-2">How to Claim:</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Scan or manually enter the NFC UID</li>
                    <li>• Provide a name for your item</li>
                    <li>• Select the item type</li>
                    <li>• Item becomes linked to your account</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Claim Form */}
          <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl md:p-6 p-2">
            <h3 className="text-white text-xl font-bold mb-4">Claim New Item</h3>

            <div className="space-y-6">
              {/* Scan NFC Section */}
              <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-400/30 rounded-xl md:p-6 p-2">
                <div className="text-center mb-4">
                  <FaMobileAlt className="text-blue-400 text-4xl mx-auto mb-3" />
                  <h4 className="text-white font-semibold mb-2">Scan NFC Tag</h4>
                  <p className="text-gray-300 text-sm mb-4">
                    Tap your X-KRYPTED item on your phone or use the NFC reader to automatically populate the UID
                  </p>
                  <button
                    onClick={() => {
                      setShowNFCMScanningModal(true);
                      setScanningStatus('scanning');
                      setScanningProgress(0);

                      // Simulate scanning progress
                      const scanInterval = setInterval(() => {
                        setScanningProgress(prev => {
                          if (prev >= 100) {
                            clearInterval(scanInterval);
                            // Simulate success/failure randomly
                            const success = Math.random() > 0.1; // 90% success rate
                            if (success) {
                              setScanningStatus('success');
                              const mockUIDs = [
                                'E200341201234567890ABCDEF',
                                'E200341201234567890ABCDEG',
                                'E200341201234567890ABCDEH',
                                'E200341201234567890ABCDEI'
                              ];
                              const randomUID = mockUIDs[Math.floor(Math.random() * mockUIDs.length)];
                              setTimeout(() => {
                                setClaimData({ ...claimData, uid: randomUID });
                                setShowNFCMScanningModal(false);
                                setScanningStatus('ready');
                                setScanningProgress(0);
                                showNotification('NFC scanned successfully! UID populated.', 'success');
                              }, 1000);
                            } else {
                              setScanningStatus('error');
                              setTimeout(() => {
                                setShowNFCMScanningModal(false);
                                setScanningStatus('ready');
                                setScanningProgress(0);
                                showNotification('NFC scan failed. Please try again or enter manually.', 'error');
                              }, 1000);
                            }
                            return 100;
                          }
                          return prev + Math.random() * 15 + 5; // Random progress increment
                        });
                      }, 200);
                    }}
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 px-8 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 mx-auto"
                  >
                    <FaWifi className="text-lg" />
                    Scan NFC Tag
                  </button>
                </div>

                <div className="bg-[#1e2139] rounded-lg p-4 border border-[#286db24c]">
                  <h5 className="text-white font-semibold mb-2 flex items-center gap-2">
                    <FaInfoCircle className="text-blue-400" />
                    Scanning Instructions
                  </h5>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Ensure NFC is enabled on your device</li>
                    <li>• Place the X-KRYPTED item close to your phone's NFC reader</li>
                    <li>• The UID will be automatically detected and filled</li>
                    <li>• If scanning fails, enter the UID manually</li>
                  </ul>
                </div>
              </div>

              {/* Manual Entry Section */}
              <div className="bg-[#1e2139] rounded-xl md:p-6 p-2 border border-[#286db24c]">
                <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <FaEdit className="text-gray-400" />
                  Manual Entry (Alternative)
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-medium mb-2">
                      NFC UID <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={claimData.uid}
                      onChange={(e) => setClaimData({ ...claimData, uid: e.target.value })}
                      placeholder="E200341201234567890ABCDEF"
                      className="w-full bg-[#2a2d4a] text-white px-4 py-3 rounded-lg border border-[#286db24c] focus:outline-none focus:border-[#f64c68]"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Item Type <span className="text-red-400">*</span>
                    </label>
                    <select
                      value={claimData.itemType}
                      onChange={(e) => setClaimData({ ...claimData, itemType: e.target.value })}
                      className="w-full bg-[#2a2d4a] text-white px-4 py-3 rounded-lg border border-[#286db24c] focus:outline-none focus:border-[#f64c68]"
                    >
                      <option value="jersey">Jersey</option>
                      <option value="pullover">Pullover</option>
                      <option value="training-kit">Training Kit</option>
                      <option value="accessory">Accessory</option>
                    </select>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-white font-medium mb-2">
                    Item Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={claimData.itemName}
                    onChange={(e) => setClaimData({ ...claimData, itemName: e.target.value })}
                    placeholder="e.g., Barcelona FC Home Jersey 2024"
                    className="w-full bg-[#2a2d4a] text-white px-4 py-3 rounded-lg border border-[#286db24c] focus:outline-none focus:border-[#f64c68]"
                  />
                </div>
              </div>

              <div className="bg-green-600/20 border border-green-400/30 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <FaInfoCircle className="text-green-400 text-lg mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-green-400 font-medium mb-1">NFC Validation</p>
                    <p className="text-green-300 text-sm">
                      The system will validate the UID against our database. Only legitimate X-KRYPTED items can be claimed.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setShowClaimModal(true)}
                  disabled={!claimData.uid.trim() || !claimData.itemName.trim()}
                  className="flex-1 bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <FaPlus />
                  Claim Item
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {activeTab === 'transfer' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {/* Transfer Info */}
          <div className="bg-gradient-to-r from-orange-600/20 to-red-600/20 border border-orange-400/30 rounded-2xl md:p-6 p-2">
            <div className="flex items-start md:flex-row flex-col md:gap-4 gap-2">
              <FaExchangeAlt className="text-orange-400 text-3xl mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-white text-xl font-bold mb-2">Transfer X-KRYPTED Items</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Transfer ownership of your X-KRYPTED items to another FANEKT user. The recipient will gain full access to event entry and ticket validation.
                </p>
                <div className="bg-[#1e2139] rounded-lg p-4 border border-[#286db24c]">
                  <h4 className="text-white font-semibold mb-2">Transfer Process:</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Select item to transfer</li>
                    <li>• Enter recipient's email</li>
                    <li>• Confirm transfer (irreversible)</li>
                    <li>• Recipient receives notification</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Transfer Form */}
          <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl md:p-6 p-2">
            <h3 className="text-white text-xl font-bold mb-4">Transfer Item Ownership</h3>

            <div className="space-y-6">
              <div>
                <label className="block text-white font-medium mb-2">
                  Select Item to Transfer <span className="text-red-400">*</span>
                </label>
                <select
                  value={transferData.itemId}
                  onChange={(e) => setTransferData({ ...transferData, itemId: e.target.value })}
                  className="w-full bg-[#1e2139] text-white px-4 py-3 rounded-lg border border-[#286db24c] focus:outline-none focus:border-[#f64c68]"
                >
                  <option value="">Choose an item...</option>
                  {userItems.filter(item => item.status === 'active').map(item => (
                    <option key={item.id} value={item.id}>
                      {item.name} ({item.serialNumber})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">
                  Recipient Email <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  value={transferData.recipientEmail}
                  onChange={(e) => setTransferData({ ...transferData, recipientEmail: e.target.value })}
                  placeholder="recipient@fanekt.com"
                  className="w-full bg-[#1e2139] text-white px-4 py-3 rounded-lg border border-[#286db24c] focus:outline-none focus:border-[#f64c68]"
                />
              </div>

              <div className="bg-red-600/20 border border-red-400/30 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <FaInfoCircle className="text-red-400 text-lg mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-red-400 font-medium mb-1">Important Warning</p>
                    <p className="text-red-300 text-sm">
                      Transferring an item is irreversible. The recipient will gain full ownership and you will lose all access to this item.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setShowTransferModal(true)}
                  disabled={!transferData.recipientEmail.trim() || !transferData.itemId}
                  className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <FaExchangeAlt />
                  Transfer Item
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {activeTab === 'settings' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {/* Settings Info */}
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-400/30 rounded-2xl md:p-6 p-2">
            <div className="flex items-start md:flex-row flex-col md:gap-4 gap-2">
              <FaLock className="text-purple-400 text-3xl mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-white text-xl font-bold mb-2">X-KRYPTED Security Settings</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Manage security settings for your X-KRYPTED items and account protection.
                </p>
                <div className="bg-[#1e2139] rounded-lg p-4 border border-[#286db24c]">
                  <h4 className="text-white font-semibold mb-2">Security Features:</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Account password protection</li>
                    <li>• NFC UID validation</li>
                    <li>• Secure item claiming</li>
                    <li>• Transfer authorization</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Settings Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl md:p-6 p-2">
              <h3 className="text-white text-xl font-bold mb-4">Account Security</h3>

              <div className="space-y-4">
                <div className="bg-blue-600/20 border border-blue-400/30 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <FaShieldAlt className="text-blue-400 text-lg mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-blue-400 font-medium mb-1">Security Status</p>
                      <p className="text-blue-300 text-sm">
                        Your account is protected with strong password requirements and NFC validation.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl md:p-6 p-2">
              <h3 className="text-white text-xl font-bold mb-4">Item Management</h3>

              <div className="space-y-4">
                <div className="text-center py-8">
                  <FaDatabase className="text-gray-400 text-3xl mx-auto mb-2" />
                  <p className="text-gray-400 text-sm">Advanced item management features coming soon.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Modal Components */}
      <ItemDetailsModal
        isOpen={showItemDetailsModal}
        item={selectedItem}
        onClose={() => {
          setShowItemDetailsModal(false);
          setSelectedItem(null);
        }}
        onDownloadQR={handleDownloadQR}
        onCopyLink={handleCopyLink}
      />

      <ClaimConfirmationModal
        isOpen={showClaimModal}
        claimData={claimData}
        onClose={() => setShowClaimModal(false)}
        onConfirm={handleClaimItem}
      />

      <TransferConfirmationModal
        isOpen={showTransferModal}
        transferData={transferData}
        userItems={userItems}
        onClose={() => setShowTransferModal(false)}
        onConfirm={handleTransferItem}
      />

      <NFCScanningModal
        isOpen={showNFCMScanningModal}
        onClose={() => {
          setShowNFCMScanningModal(false);
          setScanningStatus('ready');
          setScanningProgress(0);
        }}
        onSuccess={showNotification}
        onPopulateUID={(uid) => setClaimData({ ...claimData, uid })}
      />

    </div>
  );
}

export default MyXKryptedItems;
