import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FaUsers,
  FaTrash,
  FaCheckCircle,
  FaLink,
  FaQrcode,
  FaCopy,
  FaShare,
  FaWhatsapp,
  FaInstagram,
  FaFacebook,
  FaDownload,
  FaInfoCircle,
  FaTrophy,
  FaLock,
  FaUnlock,
  FaClock,
  FaUserPlus,
  FaGift,
  FaSearch,
  FaPlus,
  FaStar,
  FaShieldAlt,
  FaChild,
  FaIdCard,
  FaDatabase,
  FaKey
} from 'react-icons/fa';
// Note: ParentGuardianModal is not needed in FanInvitation component
// It's already implemented in FanProfile/Modals/ParentGuardianModal.jsx

// Import API service
import { getProfile } from '../../API/apiService';

// Import QR Code library
import { QRCodeCanvas } from "qrcode.react";

function FanInvitation() {
  const [activeTab, setActiveTab] = useState('vote');
  const [votingMode, setVotingMode] = useState('all'); // 'official', 'free', 'all'
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newEntityName, setNewEntityName] = useState('');
  const [showParentForm, setShowParentForm] = useState(false);
  const [parentData, setParentData] = useState({
    licenseNumber: '',
    childName: '',
    childDOB: ''
  });
  const [showFavoriteModal, setShowFavoriteModal] = useState(false);
  const [selectedEntityForModal, setSelectedEntityForModal] = useState(null);
  const [showReplacementModal, setShowReplacementModal] = useState(false);
  const [pendingFavorite, setPendingFavorite] = useState(null);
  const [isParentGuardianModalOpen, setIsParentGuardianModalOpen] = useState(false);

  // Notification popup state
  const [notification, setNotification] = useState({
    show: false,
    message: '',
    type: 'success' // 'success' or 'info'
  });

  // Add missing variables
  const [referralCode, setReferralCode] = useState('');
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [profileError, setProfileError] = useState(null);
  const qrRef = React.useRef();
  const [copied, setCopied] = useState(false);
  const [invitationSent, setInvitationSent] = useState(false);

  // Mock data - using names specifically mentioned by client in messages
  const mockEntities = [
    // Official Clubs/Teams (mentioned by client)
    { id: 1, name: 'Real Madrid', type: 'club', isOfficial: true, fanCount: 125000, sport: 'football', country: 'Spain' },
    { id: 2, name: 'Barcelona FC', type: 'club', isOfficial: true, fanCount: 98000, sport: 'football', country: 'Spain' },
    { id: 3, name: 'Manchester United', type: 'club', isOfficial: true, fanCount: 89000, sport: 'football', country: 'England' },
    { id: 4, name: 'Bayern Munich', type: 'club', isOfficial: true, fanCount: 76000, sport: 'football', country: 'Germany' },
    { id: 5, name: 'Chelsea FC', type: 'club', isOfficial: true, fanCount: 58000, sport: 'football', country: 'England' },
    { id: 6, name: 'Paris Saint-Germain', type: 'club', isOfficial: true, fanCount: 52000, sport: 'football', country: 'France' },
    { id: 7, name: 'Juventus FC', type: 'club', isOfficial: true, fanCount: 49000, sport: 'football', country: 'Italy' },
    { id: 8, name: 'Borussia Dortmund', type: 'club', isOfficial: true, fanCount: 45000, sport: 'football', country: 'Germany' },
    { id: 9, name: 'AC Milan', type: 'club', isOfficial: true, fanCount: 42000, sport: 'football', country: 'Italy' },
    { id: 10, name: 'Inter Milan', type: 'club', isOfficial: true, fanCount: 39000, sport: 'football', country: 'Italy' },
    { id: 11, name: 'Ajax Amsterdam', type: 'club', isOfficial: true, fanCount: 35000, sport: 'football', country: 'Netherlands' },
    { id: 12, name: 'Feyenoord', type: 'club', isOfficial: true, fanCount: 31000, sport: 'football', country: 'Netherlands' },

    // Official Athletes (mentioned by client)
    { id: 13, name: 'Lionel Messi', type: 'athlete', isOfficial: true, fanCount: 256000, sport: 'football', country: 'Argentina' },
    { id: 14, name: 'Cristiano Ronaldo', type: 'athlete', isOfficial: true, fanCount: 234000, sport: 'football', country: 'Portugal' },
    { id: 15, name: 'Kylian Mbappé', type: 'athlete', isOfficial: true, fanCount: 189000, sport: 'football', country: 'France' },
    { id: 16, name: 'Pep Guardiola', type: 'athlete', isOfficial: true, fanCount: 167000, sport: 'football', country: 'Spain' },
    { id: 17, name: 'Usain Bolt', type: 'athlete', isOfficial: true, fanCount: 187000, sport: 'athletics', country: 'Jamaica' },
    { id: 18, name: 'Michael Phelps', type: 'athlete', isOfficial: true, fanCount: 156000, sport: 'swimming', country: 'USA' },
    { id: 19, name: 'Simone Biles', type: 'athlete', isOfficial: true, fanCount: 123000, sport: 'gymnastics', country: 'USA' },
    { id: 20, name: 'Tom Brady', type: 'athlete', isOfficial: true, fanCount: 145000, sport: 'american-football', country: 'USA' },
    { id: 21, name: 'Ronaldo Nazario', type: 'athlete', isOfficial: true, fanCount: 189000, sport: 'football', country: 'Brazil' },
    { id: 22, name: 'Rafael Nadal', type: 'athlete', isOfficial: true, fanCount: 134000, sport: 'tennis', country: 'Spain' },
    { id: 23, name: 'LeBron James', type: 'athlete', isOfficial: true, fanCount: 178000, sport: 'basketball', country: 'USA' },
    { id: 24, name: 'Michael Jordan', type: 'athlete', isOfficial: true, fanCount: 234000, sport: 'basketball', country: 'USA' },

    // Official Sponsors/Partners (mentioned by client)
    { id: 25, name: 'Nike Global', type: 'sponsor', isOfficial: true, fanCount: 89000, sport: 'multiple', country: 'USA' },
    { id: 26, name: 'Adidas Partnership', type: 'sponsor', isOfficial: true, fanCount: 78000, sport: 'multiple', country: 'Germany' },
    { id: 27, name: 'Under Armour', type: 'sponsor', isOfficial: true, fanCount: 67000, sport: 'multiple', country: 'USA' },

    // Fan-Created Entries (non-official variations mentioned by client)
    { id: 28, name: 'Real Madrid FC', type: 'fan-created', isOfficial: false, fanCount: 45000, sport: 'football', country: 'Spain' },
    { id: 29, name: 'Barça', type: 'fan-created', isOfficial: false, fanCount: 32000, sport: 'football', country: 'Spain' },
    { id: 30, name: 'Madrid', type: 'fan-created', isOfficial: false, fanCount: 18000, sport: 'football', country: 'Spain' },
    { id: 31, name: 'Barcelona Football Club', type: 'fan-created', isOfficial: false, fanCount: 28000, sport: 'football', country: 'Spain' },
    { id: 32, name: 'Man Utd', type: 'fan-created', isOfficial: false, fanCount: 67000, sport: 'football', country: 'England' },
    { id: 33, name: 'Bayern', type: 'fan-created', isOfficial: false, fanCount: 43000, sport: 'football', country: 'Germany' },
    { id: 34, name: 'PSG Paris', type: 'fan-created', isOfficial: false, fanCount: 35000, sport: 'football', country: 'France' },
    { id: 35, name: 'Messi FC', type: 'fan-created', isOfficial: false, fanCount: 89000, sport: 'football', country: 'Argentina' },
    { id: 36, name: 'CR7', type: 'fan-created', isOfficial: false, fanCount: 156000, sport: 'football', country: 'Portugal' },
    { id: 37, name: 'Bolt Lightning', type: 'fan-created', isOfficial: false, fanCount: 78000, sport: 'athletics', country: 'Jamaica' },
    { id: 38, name: 'Phelps Fish', type: 'fan-created', isOfficial: false, fanCount: 92000, sport: 'swimming', country: 'USA' },
    { id: 39, name: 'Biles Amazing', type: 'fan-created', isOfficial: false, fanCount: 67000, sport: 'gymnastics', country: 'USA' },
    { id: 40, name: 'Lionel Andres Messi', type: 'fan-created', isOfficial: false, fanCount: 145000, sport: 'football', country: 'Argentina' },

    // Additional Basketball teams mentioned by client
    { id: 41, name: 'Los Angeles Lakers', type: 'club', isOfficial: true, fanCount: 123000, sport: 'basketball', country: 'USA' },
    { id: 42, name: 'Golden State Warriors', type: 'club', isOfficial: true, fanCount: 98000, sport: 'basketball', country: 'USA' },
    { id: 43, name: 'Stephen Curry', type: 'athlete', isOfficial: true, fanCount: 145000, sport: 'basketball', country: 'USA' },
    { id: 44, name: 'Lakers Nation', type: 'fan-created', isOfficial: false, fanCount: 89000, sport: 'basketball', country: 'USA' },
    { id: 45, name: 'Warriors Fans', type: 'fan-created', isOfficial: false, fanCount: 56000, sport: 'basketball', country: 'USA' }
  ];

  const [userFavorites, setUserFavorites] = useState({
    local: null, // { entityName, entityType, isOfficial, joinedDate }
    global1: null, // { entityName, entityType, isOfficial, joinedDate }
    global2: null, // { entityName, entityType, isOfficial, joinedDate }
    global3: null  // { entityName, entityType, isOfficial, joinedDate }
  });

  // Mock invitation data (keeping for referral functionality)
  const invitationStats = {
    totalSent: 24,
    successfulInvites: 8,
    pendingInvites: 3
    // Removed earnedRewards as per SOW clarification
  };

  const invitationsList = [
    { id: 1, name: 'john.doe@email.com', status: 'verified', date: '2024-01-15' },
    { id: 2, name: 'sarah.smith@email.com', status: 'joined', date: '2024-01-14' },
    { id: 3, name: 'mike.johnson@email.com', status: 'sent', date: '2024-01-13' },
    { id: 4, name: 'emma.wilson@email.com', status: 'verified', date: '2024-01-12' },
    { id: 5, name: 'alex.brown@email.com', status: 'sent', date: '2024-01-11' }
  ];

  // Fetch profile data on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoadingProfile(true);
        setProfileError(null);
        const response = await getProfile();

        if (response.data.status && response.data.data.user.fan) {
          setReferralCode(response.data.data.user.fan.referral_code);
        } else {
          setProfileError('Failed to fetch profile data');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        setProfileError('Failed to load profile data. Please try again.');
      } finally {
        setIsLoadingProfile(false);
      }
    };

    fetchProfile();
  }, []);

  // Handle search with debouncing - show all entities initially, filter when searching
  useEffect(() => {
    const searchEntities = async () => {
      setIsSearching(true);

      let filteredResults = mockEntities;

      // Apply voting mode filter first
      if (votingMode === 'official') {
        filteredResults = filteredResults.filter(entity => entity.isOfficial);
      } else if (votingMode === 'free') {
        filteredResults = filteredResults.filter(entity => !entity.isOfficial);
      }
      // 'all' mode shows everything

      // Apply search query filter if user has typed something
      if (searchQuery.length >= 2) {
        filteredResults = filteredResults.filter(entity =>
          entity.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      // Sort by fan count (popularity)
      filteredResults.sort((a, b) => b.fanCount - a.fanCount);

      setSearchResults(filteredResults);
      setIsSearching(false);
    };

    const debounceTimer = setTimeout(searchEntities, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery, votingMode]);

  // Generate referral link using the actual referral code
  const referralLink = referralCode ? `https://fanekt.com/invite/${referralCode}` : 'https://fanekt.com/invite/loading...';

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleShare = (platform) => {
    const text = `Join me on FANEKT and become part of the ultimate sports community! Use my referral link: ${referralLink}`;
    const encodedText = encodeURIComponent(text);
    const encodedUrl = encodeURIComponent(referralLink);

    const urls = {
      whatsapp: `https://wa.me/?text=${encodedText}`,
      instagram: `https://www.instagram.com/?url=${encodedUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`
    };

    if (urls[platform]) {
      window.open(urls[platform], '_blank');
    }
  };

  const handleDownloadQR = () => {
    if (qrRef.current && referralCode) {
      const canvas = qrRef.current;
      const link = document.createElement('a');
      link.download = 'fanekt-referral-qr.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified': return 'text-green-400 bg-green-400/10';
      case 'joined': return 'text-blue-400 bg-blue-400/10';
      case 'sent': return 'text-yellow-400 bg-yellow-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'verified': return <FaCheckCircle className="text-green-400" />;
      case 'joined': return <FaUserPlus className="text-blue-400" />;
      case 'sent': return <FaClock className="text-yellow-400" />;
      default: return <FaClock className="text-gray-400" />;
    }
  };

  // Show notification popup
  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    // Auto-hide after 3 seconds
    setTimeout(() => {
      setNotification({ show: false, message: '', type: 'success' });
    }, 3000);
  };

  // Check if entity is already a favorite
  const getEntityFavoritePosition = (entityName) => {
    if (userFavorites.local?.entityName === entityName) return 'local';
    if (userFavorites.global1?.entityName === entityName) return 'global1';
    if (userFavorites.global2?.entityName === entityName) return 'global2';
    if (userFavorites.global3?.entityName === entityName) return 'global3';
    return null;
  };

  // Check if all favorite slots are filled
  const areAllFavoritesSelected = () => {
    return userFavorites.local && userFavorites.global1 && userFavorites.global2 && userFavorites.global3;
  };

  // Handle entity selection - show modal for favorite selection
  const handleEntitySelect = (entity) => {
    const existingPosition = getEntityFavoritePosition(entity.name);

    if (existingPosition) {
      // Show modal to choose new position instead of removing
      setSelectedEntityForModal(entity);
      if (areAllFavoritesSelected()) {
        // All slots filled - show replacement modal
        setShowReplacementModal(true);
      } else {
        // Show selection modal
        setShowFavoriteModal(true);
      }
    } else {
      // Show modal to select favorite position
      setSelectedEntityForModal(entity);
      if (areAllFavoritesSelected()) {
        // All slots filled - show replacement modal
        setShowReplacementModal(true);
      } else {
        // Show selection modal
        setShowFavoriteModal(true);
      }
    }
  };

  // Handle favorite position selection
  const handleFavoritePositionSelect = (position) => {
    if (!selectedEntityForModal) return;

    // Check for duplicates in global favorites
    if (position !== 'local') {
      // For global favorites (global1, global2, global3), check if entity already exists in any global slot
      const isDuplicateInGlobal = userFavorites.global1?.entityName === selectedEntityForModal.name ||
        userFavorites.global2?.entityName === selectedEntityForModal.name ||
        userFavorites.global3?.entityName === selectedEntityForModal.name;

      if (isDuplicateInGlobal) {
        showNotification('This entity is already selected as a global favorite. Please choose a different entity for global favorites.', 'info');
        return;
      }
    }

    const favoriteData = {
      entityName: selectedEntityForModal.name,
      entityType: selectedEntityForModal.type,
      isOfficial: selectedEntityForModal.isOfficial,
      joinedDate: new Date().toISOString().split('T')[0]
    };

    setUserFavorites(prev => ({
      ...prev,
      [position]: favoriteData
    }));

    setShowFavoriteModal(false);
    setSelectedEntityForModal(null);

    showNotification(`Set ${selectedEntityForModal.name} as ${getFavoriteLabel(position)}! ⭐`, 'success');
    // In real app, this would call API to update profile
    console.log('Added favorite:', selectedEntityForModal.name, 'as', position);
  };

  // Handle replacement selection
  const handleReplacementSelect = (positionToReplace) => {
    if (!selectedEntityForModal) return;

    // Check for duplicates in global favorites (only if replacing a global favorite)
    if (positionToReplace !== 'local') {
      // For global favorites, check if entity already exists in any OTHER global slot
      const isDuplicateInOtherGlobal = (userFavorites.global1?.entityName === selectedEntityForModal.name && positionToReplace !== 'global1') ||
        (userFavorites.global2?.entityName === selectedEntityForModal.name && positionToReplace !== 'global2') ||
        (userFavorites.global3?.entityName === selectedEntityForModal.name && positionToReplace !== 'global3');

      if (isDuplicateInOtherGlobal) {
        showNotification('This entity is already selected as a global favorite. Please choose a different entity for global favorites.', 'info');
        return;
      }
    }

    const favoriteData = {
      entityName: selectedEntityForModal.name,
      entityType: selectedEntityForModal.type,
      isOfficial: selectedEntityForModal.isOfficial,
      joinedDate: new Date().toISOString().split('T')[0]
    };

    setUserFavorites(prev => ({
      ...prev,
      [positionToReplace]: favoriteData
    }));

    setShowReplacementModal(false);
    setSelectedEntityForModal(null);

    showNotification(`Replaced favorite with ${selectedEntityForModal.name}! ⭐`, 'success');
    // In real app, this would call API to update profile
    console.log('Replaced favorite:', selectedEntityForModal.name, 'in position', positionToReplace);
  };

  // Get display label for favorite position
  const getFavoriteLabel = (position) => {
    switch (position) {
      case 'local': return 'Your Local Favorite';
      case 'global1': return 'Your Global Favorite #1';
      case 'global2': return 'Your Global Favorite #2';
      case 'global3': return 'Your Global Favorite #3';
      default: return '';
    }
  };

  const handleCreateEntity = () => {
    if (!newEntityName.trim()) return;

    // Check for duplicates
    const existingEntity = mockEntities.find(
      entity => entity.name.toLowerCase() === newEntityName.toLowerCase().trim()
    );

    if (existingEntity) {
      alert('This entity already exists. Please select from the list instead.');
      return;
    }

    // In real app, this would call API to create new entity
    console.log('Creating new entity:', newEntityName);
    setShowCreateForm(false);
    setNewEntityName('');
  };

  const handleParentEnrollment = () => {
    if (!parentData.licenseNumber.trim() || !parentData.childName.trim()) return;

    // In real app, this would verify license and enroll child
    console.log('Enrolling child:', parentData);
    setShowParentForm(false);
    setParentData({ licenseNumber: '', childName: '', childDOB: '' });
  };

  return (
    <div className="min-h-screen lg:ml-[290px] px-2 lg:px-8 py-6 pt-28 lg:pt-6">
      {/* Header Section */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-8"
      >
        <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
          Fan Support & Invitations
        </h1>
        <p className="text-gray-400 text-lg">
          Declare your support for teams, athletes, and invite friends to join FANEKT.
        </p>
      </motion.div>

      {/* Notification Popup */}
      {notification.show && (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          className="fixed top-24 left-1/2 transform -translate-x-1/2 z-[9999]"
        >
          <div className={`px-6 py-3 rounded-lg shadow-2xl border-2 backdrop-blur-sm ${notification.type === 'success'
            ? 'bg-green-600/90 border-green-400 text-white'
            : 'bg-blue-600/90 border-blue-400 text-white'
            }`}>
            <div className="flex items-center gap-3">
              {notification.type === 'success' ? (
                <FaCheckCircle className="text-green-200 text-xl" />
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
            onClick={() => setActiveTab('vote')}
            className={`py-3 sm:px-4 px-2 sm:text-[18px] text-[13px] rounded-lg font-semibold transition-all duration-300 ${activeTab === 'vote'
              ? 'bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] text-white shadow-lg'
              : 'text-gray-400 hover:text-white'
              }`}
          >
            <FaStar className="inline mr-2" />
            Fan Support
          </button>
          <button
            onClick={() => setActiveTab('invite')}
            className={`py-3 sm:px-4 px-2 sm:text-[18px] text-[13px] rounded-lg font-semibold transition-all duration-300 ${activeTab === 'invite'
              ? 'bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] text-white shadow-lg'
              : 'text-gray-400 hover:text-white'
              }`}
          >
            <FaUsers className="inline mr-2" />
            Invite Friends
          </button>
          <button
            onClick={() => setActiveTab('youth')}
            className={`py-3 sm:px-4 px-2 sm:text-[18px] text-[13px] rounded-lg font-semibold transition-all duration-300 ${activeTab === 'youth'
              ? 'bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] text-white shadow-lg'
              : 'text-gray-400 hover:text-white'
              }`}
          >
            <FaChild className="inline mr-2" />
            Youth Program
          </button>
          <button
            onClick={() => setActiveTab('supports')}
            className={`py-3 sm:px-4 px-2 sm:text-[18px] text-[13px] rounded-lg font-semibold transition-all duration-300 ${activeTab === 'supports'
              ? 'bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] text-white shadow-lg'
              : 'text-gray-400 hover:text-white'
              }`}
          >
            <FaDatabase className="inline mr-2" />
            My Supports
          </button>
        </div>
      </motion.div>

      {/* Tab Content */}
      {activeTab === 'vote' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {/* Three-Option Voting Mode Selector */}
          <div className="bg-gradient-to-r from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl md:p-6 p-2">
            <h3 className="text-white text-xl font-bold mb-4">Choose How to Find Your Team/Athlete</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => setVotingMode('official')}
                className={`p-4 rounded-xl border-2 transition-all duration-300 ${votingMode === 'official'
                  ? 'border-[#f64c68] bg-[#f64c68]/10'
                  : 'border-[#286db24c] hover:border-[#f64c68]/50'
                  }`}
              >
                <div className="flex flex-col items-center text-center">
                  <FaShieldAlt className={`text-3xl mb-2 ${votingMode === 'official' ? 'text-[#f64c68]' : 'text-gray-400'
                    }`} />
                  <h4 className="text-white font-semibold mb-1">Official / Verified</h4>
                  <p className="text-gray-400 text-sm">Only official clubs, teams, and athletes</p>
                </div>
              </button>

              <button
                onClick={() => setVotingMode('free')}
                className={`p-4 rounded-xl border-2 transition-all duration-300 ${votingMode === 'free'
                  ? 'border-[#f64c68] bg-[#f64c68]/10'
                  : 'border-[#286db24c] hover:border-[#f64c68]/50'
                  }`}
              >
                <div className="flex flex-col items-center text-center">
                  <FaPlus className={`text-3xl mb-2 ${votingMode === 'free' ? 'text-[#f64c68]' : 'text-gray-400'
                    }`} />
                  <h4 className="text-white font-semibold mb-1">Free Text Create</h4>
                  <p className="text-gray-400 text-sm">Create your own entry if it doesn't exist</p>
                </div>
              </button>

              <button
                onClick={() => setVotingMode('all')}
                className={`p-4 rounded-xl border-2 transition-all duration-300 ${votingMode === 'all'
                  ? 'border-[#f64c68] bg-[#f64c68]/10'
                  : 'border-[#286db24c] hover:border-[#f64c68]/50'
                  }`}
              >
                <div className="flex flex-col items-center text-center">
                  <FaSearch className={`text-3xl mb-2 ${votingMode === 'all' ? 'text-[#f64c68]' : 'text-gray-400'
                    }`} />
                  <h4 className="text-white font-semibold mb-1">All Options</h4>
                  <p className="text-gray-400 text-sm">Official + fan-created entries</p>
                </div>
              </button>
            </div>
          </div>

          {/* Search Interface */}
          <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl md:p-6 p-2">
            <h3 className="text-white text-xl font-bold mb-4">Search & Support</h3>

            {/* Search Input */}
            <div className="relative mb-6">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search for teams, athletes, clubs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#1e2139] text-white pl-10 pr-4 py-3 rounded-lg border border-[#286db24c] focus:outline-none focus:border-[#f64c68]"
              />
            </div>

            {/* Search Results - Show all entities initially, filter when searching */}
            <div className="space-y-3 mb-6">
              {isSearching ? (
                <div className="text-center py-8">
                  <FaSearch className="text-gray-400 text-3xl mx-auto mb-2 animate-pulse" />
                  <p className="text-gray-400">Searching...</p>
                </div>
              ) : searchResults.length > 0 ? (
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {searchResults.map((entity) => {
                    const favoritePosition = getEntityFavoritePosition(entity.name);
                    const isFavorite = !!favoritePosition;

                    return (
                      <div
                        key={entity.id}
                        onClick={() => handleEntitySelect(entity)}
                        className={`flex md:items-center justify-between md:flex-row flex-col gap-2 bg-[#1e2139] rounded-xl md:p-4 p-2 border transition-all duration-300 cursor-pointer ${isFavorite
                          ? 'border-yellow-400 bg-yellow-400/5'
                          : 'border-[#286db24c] hover:border-[#f64c68] hover:bg-[#f64c68]/5'
                          }`}
                      >
                        <div className="flex items-center md:gap-4 gap-1">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold text-lg ${isFavorite
                            ? 'bg-yellow-600 text-white'
                            : 'bg-[#286db24c] text-white'
                            }`}>
                            {entity.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-white font-semibold">{entity.name}</h4>
                              {entity.isOfficial && (
                                <FaShieldAlt className="text-blue-400 text-sm" title="Official/Verified" />
                              )}
                            </div>
                            <p className="text-gray-400 text-sm capitalize">
                              {entity.type} • {entity.fanCount.toLocaleString()} fans
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1 w-full">
                          {isFavorite ? (
                            <div className='w-full flex justify-end'>
                              <div className="flex flex-col items-end gap-1">
                                {userFavorites.local?.entityName === entity.name && (
                                  <div className="flex items-center gap-2 text-yellow-400">
                                    <FaStar className="text-yellow-400 text-xl" />
                                    <span className="text-sm font-medium">Your Local Favorite</span>
                                  </div>
                                )}
                                {userFavorites.global1?.entityName === entity.name && (
                                  <div className="flex items-center gap-2 text-yellow-400">
                                    <FaStar className="text-yellow-400 text-xl" />
                                    <span className="text-sm font-medium">Your Global Favorite #1</span>
                                  </div>
                                )}
                                {userFavorites.global2?.entityName === entity.name && (
                                  <div className="flex items-center gap-2 text-yellow-400">
                                    <FaStar className="text-yellow-400 text-xl" />
                                    <span className="text-sm font-medium">Your Global Favorite #2</span>
                                  </div>
                                )}
                                {userFavorites.global3?.entityName === entity.name && (
                                  <div className="flex items-center gap-2 text-yellow-400">
                                    <FaStar className="text-yellow-400 text-xl" />
                                    <span className="text-sm font-medium">Your Global Favorite #3</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 text-gray-400">
                              <FaStar className="text-gray-500 text-xl" />
                              <span className="text-sm">Click to support</span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : searchQuery.length >= 2 && votingMode === 'free' ? (
                <div className="text-center py-8">
                  <FaPlus className="text-gray-400 text-3xl mx-auto mb-2" />
                  <p className="text-gray-400 mb-4">No matches found</p>
                  <button
                    onClick={() => setShowCreateForm(true)}
                    className="bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    Create "{searchQuery}"
                  </button>
                </div>
              ) : searchQuery.length >= 2 ? (
                <div className="text-center py-8">
                  <FaSearch className="text-gray-400 text-3xl mx-auto mb-2" />
                  <p className="text-gray-400">No results found. Try switching to "All Options" mode.</p>
                </div>
              ) : (
                <div className="text-center py-8">
                  <FaSearch className="text-gray-400 text-3xl mx-auto mb-2" />
                  <p className="text-gray-400">Start typing to search for teams and athletes...</p>
                </div>
              )}
            </div>

            {/* No Duplicates Notice */}
            <div className="bg-yellow-600/20 border border-yellow-400/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <FaInfoCircle className="text-yellow-400 text-lg mt-1 flex-shrink-0" />
                <div>
                  <p className="text-yellow-400 font-medium mb-1">No Duplicate Entities</p>
                  <p className="text-yellow-300 text-sm">
                    System automatically prevents duplicate entries. If an entity exists, you'll be directed to join it instead of creating a duplicate.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {activeTab === 'invite' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {/* Invitation Summary */}
          <div className="bg-gradient-to-r from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl md:p-6 p-2">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="text-center">
                <FaUsers className="text-[#f64c68] text-2xl mx-auto mb-2" />
                <span className="text-white text-2xl font-bold">{invitationStats.totalSent}</span>
                <p className="text-gray-400 ms:text-sm text-xs">Invitations Sent</p>
              </div>
              <div className="text-center">
                <FaCheckCircle className="text-green-400 text-2xl mx-auto mb-2" />
                <span className="text-white text-2xl font-bold">{invitationStats.successfulInvites}</span>
                <p className="text-gray-400 ms:text-sm text-xs">Successful Invites</p>
              </div>
              <div className="text-center">
                <FaClock className="text-yellow-400 text-2xl mx-auto mb-2" />
                <span className="text-white text-2xl font-bold">{invitationStats.pendingInvites}</span>
                <p className="text-gray-400 ms:text-sm text-xs">Pending Invites</p>
              </div>
            </div>
            <div className="mt-4 text-center">
              <p className="text-gray-400 text-sm">Help grow the FANEKT community by inviting friends and family.</p>
            </div>
          </div>

          {/* Referral Link */}
          <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl md:p-6 p-2">
            <h3 className="text-white text-xl font-bold mb-4">Share Your Referral Link</h3>
            <div className="bg-[#1e2139] rounded-xl p-4 mb-4 border border-[#286db24c]">
              <p className="text-gray-300 text-sm mb-2">Your unique referral link:</p>
              <div className="flex items-center flex-wrap gap-2">
                <input
                  type="text"
                  value={referralLink}
                  readOnly
                  className="flex-1 bg-[#2a2d4a] text-white px-3 py-2 rounded-lg border border-[#286db24c] focus:outline-none focus:border-[#f64c68]"
                />
                <button
                  onClick={handleCopyLink}
                  className="w-full sm:w-auto justify-center bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                >
                  <FaCopy />
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>

            {/* Social Sharing */}
            <div>
              <p className="text-white font-semibold mb-3">Share via:</p>
              <div className="flex flex-wrap md:gap-3 gap-2">
                <button
                  onClick={() => handleShare('whatsapp')}
                  className="bg-green-600 md:text-[18px] text-[12px] text-white md:px-4 px-2 py-2 rounded-lg font-semibold hover:bg-green-700 transition-all duration-300 flex items-center gap-1"
                >
                  <FaWhatsapp />
                  WhatsApp
                </button>
                <button
                  onClick={() => handleShare('instagram')}
                  className="bg-pink-600 md:text-[18px] text-[12px] text-white md:px-4 px-2 py-2 rounded-lg font-semibold hover:bg-pink-700 transition-all duration-300 flex items-center gap-1"
                >
                  <FaInstagram />
                  Instagram
                </button>
                <button
                  onClick={() => handleShare('facebook')}
                  className="bg-blue-600 md:text-[18px] text-[12px] text-white md:px-4 px-2 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 flex items-center gap-1"
                >
                  <FaFacebook />
                  Facebook
                </button>
              </div>
            </div>
          </div>

          {/* Invitations List */}
          <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-[#286db24c]">
              <h3 className="text-white text-xl font-bold">Your Invitations</h3>
            </div>
            <div className="md:p-6 p-2">
              {invitationsList.length > 0 ? (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {invitationsList.map((invitation) => (
                    <div key={invitation.id} className="flex md:items-center justify-between md:flex-row flex-col gap-2 bg-[#1e2139] rounded-xl p-4 border border-[#286db24c]">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-[#286db24c] rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold">{invitation.name.charAt(0).toUpperCase()}</span>
                        </div>
                        <div>
                          <p className="text-white font-semibold">{invitation.name}</p>
                          <p className="text-gray-400 text-sm">{new Date(invitation.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex justify-end md:w-auto w-full">
                        <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${getStatusColor(invitation.status)}`}>
                          {getStatusIcon(invitation.status)}
                          <span className="text-sm font-medium capitalize">{invitation.status}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <FaUsers className="text-gray-400 text-6xl mx-auto mb-4" />
                  <h4 className="text-white text-xl font-bold mb-2">No Invitations Yet</h4>
                  <p className="text-gray-400">Start inviting friends and family to see your invitation history here.</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {activeTab === 'youth' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {/* Youth Program Info */}
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-400/30 rounded-2xl md:p-6 p-2">
            <div className="flex items-start md:flex-row flex-col gap-4">
              <FaChild className="text-blue-400 text-3xl mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-white text-xl font-bold mb-2">Youth Program & Parental Consent</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Parents and guardians can enroll their children in FANEKT and link them to licensed youth players.
                  This enables access to sponsored equipment and creates targeted family campaigns.
                </p>
                <div className="bg-[#1e2139] rounded-lg p-4 border border-[#286db24c]">
                  <h4 className="text-white font-semibold mb-2">How It Works:</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Clubs provide license numbers and player names</li>
                    <li>• Parents enroll children using license numbers</li>
                    <li>• System verifies rights to sponsored equipment</li>
                    <li>• Sponsors can target enrolled families</li>
                    <li>• Parents maintain full control and consent</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Parent/Guardian License Button */}
          {/* <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl p-6">
            <h3 className="text-white text-xl font-bold mb-4">Parent/Guardian License</h3>
            <p className="text-gray-400 text-sm mb-6">
              If you're a parent or guardian, you can access the license verification system to register underage users.
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => setIsParentGuardianModalOpen(true)}
                className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-blue-700 transition-all duration-300 shadow-lg flex items-center gap-3"
              >
                <FaKey className="text-lg" />
                Access License System
              </button>
            </div>
          </div> */}

          {/* Parent Enrollment Form */}
          <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl md:p-6 p-2">
            <h3 className="text-white text-xl font-bold mb-4">Enroll Your Child</h3>

            {!showParentForm ? (
              <div className="text-center py-8">
                <FaIdCard className="text-gray-400 text-4xl mx-auto mb-4" />
                <p className="text-gray-400 mb-6">Enroll your child to access youth programs and sponsored equipment.</p>
                <button
                  onClick={() => setShowParentForm(true)}
                  className="bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Start Enrollment
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-medium mb-2">
                      License Number <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={parentData.licenseNumber}
                      onChange={(e) => setParentData({ ...parentData, licenseNumber: e.target.value })}
                      placeholder="Enter license number from club"
                      className="w-full bg-[#1e2139] text-white px-4 py-3 rounded-lg border border-[#286db24c] focus:outline-none focus:border-[#f64c68]"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Child's Full Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={parentData.childName}
                      onChange={(e) => setParentData({ ...parentData, childName: e.target.value })}
                      placeholder="Enter child's full name"
                      className="w-full bg-[#1e2139] text-white px-4 py-3 rounded-lg border border-[#286db24c] focus:outline-none focus:border-[#f64c68]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={parentData.childDOB}
                    onChange={(e) => setParentData({ ...parentData, childDOB: e.target.value })}
                    className="w-full bg-[#1e2139] text-white px-4 py-3 rounded-lg border border-[#286db24c] focus:outline-none focus:border-[#f64c68]"
                  />
                </div>

                <div className="bg-green-600/20 border border-green-400/30 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <FaInfoCircle className="text-green-400 text-lg mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-green-400 font-medium mb-1">Parental Consent</p>
                      <p className="text-green-300 text-sm">
                        By enrolling your child, you consent to their participation in FANEKT youth programs and sponsored equipment distribution.
                        You can manage permissions and access at any time.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={handleParentEnrollment}
                    disabled={!parentData.licenseNumber.trim() || !parentData.childName.trim()}
                    className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <FaChild />
                    Enroll Child
                  </button>
                  <button
                    onClick={() => setShowParentForm(false)}
                    className="px-6 py-3 border border-gray-600 text-gray-400 rounded-lg hover:border-gray-500 hover:text-white transition-all duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {activeTab === 'supports' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {/* My Supports List */}
          <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-[#286db24c]">
              <h3 className="text-white text-xl font-bold">My Fan Supports</h3>
              <p className="text-gray-400 text-sm">Entities you support as a fan</p>
            </div>
            <div className="md:p-6 p-2">
              {Object.values(userFavorites).some(fav => fav !== null) ? (
                <div className="space-y-4">
                  {/* Local Favorite */}
                  {userFavorites.local && (
                    <div className="bg-[#1e2139] rounded-xl md:p-4 p-2 border border-yellow-400/30">
                      <div className="flex md:items-center justify-between md:flex-row flex-col gap-2">
                        <div className="flex items-center md:gap-4 gap-2">
                          <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center text-white font-semibold">
                            {userFavorites.local.entityName.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <h4 className="text-white font-semibold">{userFavorites.local.entityName}</h4>
                            <p className="text-gray-400 text-sm capitalize">
                              {userFavorites.local.entityType} • {userFavorites.local.isOfficial ? 'Official' : 'Fan-Created'}
                            </p>
                            <p className="text-gray-400 text-sm">Joined: {userFavorites.local.joinedDate}</p>
                          </div>
                        </div>
                        <div className="md:w-auto w-full flex justify-end">
                          <div className="flex items-center gap-2 text-yellow-400">
                            <FaStar className="text-yellow-400 text-xl" />
                            <span className="text-sm font-medium">Local Favorite</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Global Favorites */}
                  {userFavorites.global1 && (
                    <div className="bg-[#1e2139] rounded-xl md:p-4 p-2 border border-yellow-400/30">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center text-white font-semibold">
                            {userFavorites.global1.entityName.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <h4 className="text-white font-semibold">{userFavorites.global1.entityName}</h4>
                            <p className="text-gray-400 text-sm capitalize">
                              {userFavorites.global1.entityType} • {userFavorites.global1.isOfficial ? 'Official' : 'Fan-Created'}
                            </p>
                            <p className="text-gray-400 text-sm">Joined: {userFavorites.global1.joinedDate}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-yellow-400">
                          <FaStar className="text-yellow-400 text-xl" />
                          <span className="text-sm font-medium">Global Favorite #1</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {userFavorites.global2 && (
                    <div className="bg-[#1e2139] rounded-xl p-4 border border-yellow-400/30">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center text-white font-semibold">
                            {userFavorites.global2.entityName.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <h4 className="text-white font-semibold">{userFavorites.global2.entityName}</h4>
                            <p className="text-gray-400 text-sm capitalize">
                              {userFavorites.global2.entityType} • {userFavorites.global2.isOfficial ? 'Official' : 'Fan-Created'}
                            </p>
                            <p className="text-gray-400 text-sm">Joined: {userFavorites.global2.joinedDate}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-yellow-400">
                          <FaStar className="text-yellow-400 text-xl" />
                          <span className="text-sm font-medium">Global Favorite #2</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {userFavorites.global3 && (
                    <div className="bg-[#1e2139] rounded-xl p-4 border border-yellow-400/30">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center text-white font-semibold">
                            {userFavorites.global3.entityName.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <h4 className="text-white font-semibold">{userFavorites.global3.entityName}</h4>
                            <p className="text-gray-400 text-sm capitalize">
                              {userFavorites.global3.entityType} • {userFavorites.global3.isOfficial ? 'Official' : 'Fan-Created'}
                            </p>
                            <p className="text-gray-400 text-sm">Joined: {userFavorites.global3.joinedDate}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-yellow-400">
                          <FaStar className="text-yellow-400 text-xl" />
                          <span className="text-sm font-medium">Global Favorite #3</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Empty slots message */}
                  {!userFavorites.local && !userFavorites.global1 && !userFavorites.global2 && !userFavorites.global3 && (
                    <div className="text-center py-8">
                      <FaStar className="text-gray-400 text-4xl mx-auto mb-4" />
                      <h4 className="text-white text-xl font-bold mb-2">No Favorites Yet</h4>
                      <p className="text-gray-400 mb-4">You haven't declared support for any teams or athletes yet.</p>
                      <button
                        onClick={() => setActiveTab('vote')}
                        className="bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                      >
                        Find Teams & Athletes to Support
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <FaStar className="text-gray-400 text-4xl mx-auto mb-4" />
                  <h4 className="text-white text-xl font-bold mb-2">No Favorites Yet</h4>
                  <p className="text-gray-400 mb-4">You haven't declared support for any teams or athletes yet.</p>
                  <button
                    onClick={() => setActiveTab('vote')}
                    className="bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    Find Teams & Athletes to Support
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Database Info */}
          <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl md:p-6 p-2">
            <div className="flex items-start gap-4 md:flex-row flex-col">
              <FaDatabase className="text-[#f64c68] text-3xl mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-white text-xl font-bold mb-2">Fan-Generated Database</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Every time fans declare support, it builds our comprehensive sports database.
                  This database powers sponsor targeting and helps official entities get discovered.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#f64c68]">{mockEntities.filter(e => e.isOfficial).length}</div>
                    <div className="text-sm text-gray-400">Official Entities</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">{mockEntities.filter(e => !e.isOfficial).length}</div>
                    <div className="text-sm text-gray-400">Fan-Created</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">{mockEntities.reduce((sum, e) => sum + e.fanCount, 0).toLocaleString()}</div>
                    <div className="text-sm text-gray-400">Total Fans</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">{mockEntities.length}</div>
                    <div className="text-sm text-gray-400">Total Entities</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Favorite Selection Modal */}
      {showFavoriteModal && selectedEntityForModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowFavoriteModal(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-white text-xl font-bold mb-2">Choose Favorite Position</h3>
            <p className="text-gray-400 text-sm mb-6">
              Select where you want to place <span className="text-white font-semibold">{selectedEntityForModal.name}</span> in your favorites
            </p>

            <div className="space-y-3">
              {/* Remove Options - Show specific removal options based on current favorites */}
              {userFavorites.local?.entityName === selectedEntityForModal.name && (
                <button
                  onClick={() => {
                    setUserFavorites(prev => ({
                      ...prev,
                      local: null
                    }));
                    showNotification(`Removed ${selectedEntityForModal.name} from local favorites`, 'info');
                    setShowFavoriteModal(false);
                    setSelectedEntityForModal(null);
                  }}
                  className="w-full p-4 bg-red-600/20 hover:bg-red-600/30 border border-red-400/30 rounded-xl transition-all duration-300 text-left"
                >
                  <div className="flex items-center gap-3">
                    <FaTrash className="text-red-400 text-xl" />
                    <div>
                      <h4 className="text-white font-semibold">Remove from Local Favorite</h4>
                      <p className="text-red-400 text-sm">Remove from your local favorite position</p>
                    </div>
                  </div>
                </button>
              )}

              {userFavorites.global1?.entityName === selectedEntityForModal.name && (
                <button
                  onClick={() => {
                    setUserFavorites(prev => ({
                      ...prev,
                      global1: null
                    }));
                    showNotification(`Removed ${selectedEntityForModal.name} from global favorite #1`, 'info');
                    setShowFavoriteModal(false);
                    setSelectedEntityForModal(null);
                  }}
                  className="w-full p-4 bg-red-600/20 hover:bg-red-600/30 border border-red-400/30 rounded-xl transition-all duration-300 text-left"
                >
                  <div className="flex items-center gap-3">
                    <FaTrash className="text-red-400 text-xl" />
                    <div>
                      <h4 className="text-white font-semibold">Remove from Global Favorite #1</h4>
                      <p className="text-red-400 text-sm">Remove from your global favorite #1 position</p>
                    </div>
                  </div>
                </button>
              )}

              {userFavorites.global2?.entityName === selectedEntityForModal.name && (
                <button
                  onClick={() => {
                    setUserFavorites(prev => ({
                      ...prev,
                      global2: null
                    }));
                    showNotification(`Removed ${selectedEntityForModal.name} from global favorite #2`, 'info');
                    setShowFavoriteModal(false);
                    setSelectedEntityForModal(null);
                  }}
                  className="w-full p-4 bg-red-600/20 hover:bg-red-600/30 border border-red-400/30 rounded-xl transition-all duration-300 text-left"
                >
                  <div className="flex items-center gap-3">
                    <FaTrash className="text-red-400 text-xl" />
                    <div>
                      <h4 className="text-white font-semibold">Remove from Global Favorite #2</h4>
                      <p className="text-red-400 text-sm">Remove from your global favorite #2 position</p>
                    </div>
                  </div>
                </button>
              )}

              {userFavorites.global3?.entityName === selectedEntityForModal.name && (
                <button
                  onClick={() => {
                    setUserFavorites(prev => ({
                      ...prev,
                      global3: null
                    }));
                    showNotification(`Removed ${selectedEntityForModal.name} from global favorite #3`, 'info');
                    setShowFavoriteModal(false);
                    setSelectedEntityForModal(null);
                  }}
                  className="w-full p-4 bg-red-600/20 hover:bg-red-600/30 border border-red-400/30 rounded-xl transition-all duration-300 text-left"
                >
                  <div className="flex items-center gap-3">
                    <FaTrash className="text-red-400 text-xl" />
                    <div>
                      <h4 className="text-white font-semibold">Remove from Global Favorite #3</h4>
                      <p className="text-red-400 text-sm">Remove from your global favorite #3 position</p>
                    </div>
                  </div>
                </button>
              )}

              {/* Position Options */}
              {!userFavorites.local && (
                <button
                  onClick={() => handleFavoritePositionSelect('local')}
                  className="w-full p-4 bg-[#1e2139] hover:bg-[#f64c68]/10 border border-[#286db24c] hover:border-[#f64c68] rounded-xl transition-all duration-300 text-left"
                >
                  <div className="flex items-center gap-3">
                    <FaStar className="text-yellow-400 text-xl" />
                    <div>
                      <h4 className="text-white font-semibold">My Local Favorite</h4>
                      <p className="text-gray-400 text-sm">Your hometown team or local hero</p>
                    </div>
                  </div>
                </button>
              )}

              {!userFavorites.global1 && (
                <button
                  onClick={() => handleFavoritePositionSelect('global1')}
                  className="w-full p-4 bg-[#1e2139] hover:bg-[#f64c68]/10 border border-[#286db24c] hover:border-[#f64c68] rounded-xl transition-all duration-300 text-left"
                >
                  <div className="flex items-center gap-3">
                    <FaStar className="text-yellow-400 text-xl" />
                    <div>
                      <h4 className="text-white font-semibold">My Global Favorite #1</h4>
                      <p className="text-gray-400 text-sm">Your top global favorite</p>
                    </div>
                  </div>
                </button>
              )}

              {!userFavorites.global2 && (
                <button
                  onClick={() => handleFavoritePositionSelect('global2')}
                  className="w-full p-4 bg-[#1e2139] hover:bg-[#f64c68]/10 border border-[#286db24c] hover:border-[#f64c68] rounded-xl transition-all duration-300 text-left"
                >
                  <div className="flex items-center gap-3">
                    <FaStar className="text-yellow-400 text-xl" />
                    <div>
                      <h4 className="text-white font-semibold">My Global Favorite #2</h4>
                      <p className="text-gray-400 text-sm">Your second global favorite</p>
                    </div>
                  </div>
                </button>
              )}

              {!userFavorites.global3 && (
                <button
                  onClick={() => handleFavoritePositionSelect('global3')}
                  className="w-full p-4 bg-[#1e2139] hover:bg-[#f64c68]/10 border border-[#286db24c] hover:border-[#f64c68] rounded-xl transition-all duration-300 text-left"
                >
                  <div className="flex items-center gap-3">
                    <FaStar className="text-yellow-400 text-xl" />
                    <div>
                      <h4 className="text-white font-semibold">My Global Favorite #3</h4>
                      <p className="text-gray-400 text-sm">Your third global favorite</p>
                    </div>
                  </div>
                </button>
              )}
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setShowFavoriteModal(false)}
                className="flex-1 px-4 py-3 border border-gray-600 text-gray-400 rounded-xl font-medium hover:border-gray-500 hover:text-white transition-colors"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Replacement Modal */}
      {showReplacementModal && selectedEntityForModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowReplacementModal(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-white text-xl font-bold mb-2">All Favorites Selected</h3>
            <p className="text-gray-400 text-sm mb-6">
              You already have 4 favorites. Choose which one to replace with <span className="text-white font-semibold">{selectedEntityForModal.name}</span>
            </p>

            <div className="space-y-3">
              {userFavorites.local && (
                <button
                  onClick={() => handleReplacementSelect('local')}
                  className="w-full p-4 bg-[#1e2139] hover:bg-[#f64c68]/10 border border-[#286db24c] hover:border-[#f64c68] rounded-xl transition-all duration-300 text-left"
                >
                  <div className="flex items-center gap-3">
                    <FaStar className="text-yellow-400 text-xl" />
                    <div>
                      <h4 className="text-white font-semibold">Replace: {userFavorites.local.entityName}</h4>
                      <p className="text-gray-400 text-sm">Your Local Favorite</p>
                    </div>
                  </div>
                </button>
              )}

              {userFavorites.global1 && (
                <button
                  onClick={() => handleReplacementSelect('global1')}
                  className="w-full p-4 bg-[#1e2139] hover:bg-[#f64c68]/10 border border-[#286db24c] hover:border-[#f64c68] rounded-xl transition-all duration-300 text-left"
                >
                  <div className="flex items-center gap-3">
                    <FaStar className="text-yellow-400 text-xl" />
                    <div>
                      <h4 className="text-white font-semibold">Replace: {userFavorites.global1.entityName}</h4>
                      <p className="text-gray-400 text-sm">Your Global Favorite #1</p>
                    </div>
                  </div>
                </button>
              )}

              {userFavorites.global2 && (
                <button
                  onClick={() => handleReplacementSelect('global2')}
                  className="w-full p-4 bg-[#1e2139] hover:bg-[#f64c68]/10 border border-[#286db24c] hover:border-[#f64c68] rounded-xl transition-all duration-300 text-left"
                >
                  <div className="flex items-center gap-3">
                    <FaStar className="text-yellow-400 text-xl" />
                    <div>
                      <h4 className="text-white font-semibold">Replace: {userFavorites.global2.entityName}</h4>
                      <p className="text-gray-400 text-sm">Your Global Favorite #2</p>
                    </div>
                  </div>
                </button>
              )}

              {userFavorites.global3 && (
                <button
                  onClick={() => handleReplacementSelect('global3')}
                  className="w-full p-4 bg-[#1e2139] hover:bg-[#f64c68]/10 border border-[#286db24c] hover:border-[#f64c68] rounded-xl transition-all duration-300 text-left"
                >
                  <div className="flex items-center gap-3">
                    <FaStar className="text-yellow-400 text-xl" />
                    <div>
                      <h4 className="text-white font-semibold">Replace: {userFavorites.global3.entityName}</h4>
                      <p className="text-gray-400 text-sm">Your Global Favorite #3</p>
                    </div>
                  </div>
                </button>
              )}
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setShowReplacementModal(false)}
                className="flex-1 px-4 py-3 border border-gray-600 text-gray-400 rounded-xl font-medium hover:border-gray-500 hover:text-white transition-colors"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Create Entity Modal */}
      {showCreateForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowCreateForm(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-white text-xl font-bold mb-4">Create New Entity</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-white font-medium mb-2">Entity Name</label>
                <input
                  type="text"
                  value={newEntityName}
                  onChange={(e) => setNewEntityName(e.target.value)}
                  placeholder="e.g., Barcelona FC, Messi, Real Madrid"
                  className="w-full bg-[#1e2139] text-white px-4 py-3 rounded-lg border border-[#286db24c] focus:outline-none focus:border-[#f64c68]"
                />
              </div>
              <div className="bg-yellow-600/20 border border-yellow-400/30 rounded-lg p-4">
                <p className="text-yellow-400 text-sm">
                  Make sure this entity doesn't already exist. The system will check for duplicates.
                </p>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={handleCreateEntity}
                  disabled={!newEntityName.trim()}
                  className="flex-1 bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <FaPlus />
                  Create Entity
                </button>
                <button
                  onClick={() => setShowCreateForm(false)}
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

export default FanInvitation;

