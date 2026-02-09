import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FaStore,
  FaBasketballBall,
  FaSwimmer,
  FaShoppingCart,
  FaCoins,
  FaChartLine,
  FaUsers,
  FaBox,
  FaEye,
  FaEdit,
  FaTrash,
  FaCheck,
  FaTimes,
  FaSearch,
  FaFilter,
  FaDownload,
  FaStar,
  FaMoneyBillWave,
  FaPercentage,
  FaVoteYea,
  FaInfoCircle,
  FaExclamationTriangle,
  FaShieldAlt,
  FaChartBar,
  FaPlus,
  FaBell,
  FaFlag,
  FaCog,
  FaTrophy,
  FaCrown,
  FaBullhorn,
  FaChild,
  FaMapMarkerAlt,
  FaCalendar,
  FaEuroSign,
  FaGift,
  FaHandshake,
  FaUserCheck,
  FaBan,
  FaClock,
  FaTruck,
  FaCheckCircle,
  FaFootballBall,
  FaRunning
} from 'react-icons/fa';

function AdminStore() {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [storeTypeFilter, setStoreTypeFilter] = useState('all');
  const [selectedStore, setSelectedStore] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showStoreModal, setShowStoreModal] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showActionModal, setShowActionModal] = useState(false);
  const [actionType, setActionType] = useState('');

  // Mock platform-wide store data
  const [platformStats, setPlatformStats] = useState({
    totalStores: 156,
    activeStores: 142,
    pendingStores: 8,
    suspendedStores: 6,
    totalProducts: 2847,
    totalOrders: 15689,
    totalRevenue: 2456780, // FNKT
    monthlyRevenue: 345890,
    totalFamilies: 1250,
    totalClubs: 89,
    flaggedProducts: 23,
    reportedStores: 5
  });

  // Mock all stores data
  const [allStores, setAllStores] = useState([
    {
      id: 1,
      name: 'Messi Official Store',
      owner: 'Lionel Messi',
      type: 'athlete',
      status: 'active',
      verificationStatus: 'verified',
      totalProducts: 18,
      totalSales: 89450,
      monthlyRevenue: 15680,
      totalOrders: 1247,
      storeRating: 4.9,
      fanEngagement: 89500,
      vipMembers: 2500,
      createdDate: '2023-08-15',
      lastActivity: '2024-01-20'
    },
    {
      id: 2,
      name: 'FC Barcelona Official',
      owner: 'FC Barcelona',
      type: 'club',
      status: 'active',
      verificationStatus: 'verified',
      totalProducts: 24,
      totalSales: 154200,
      monthlyRevenue: 28500,
      totalOrders: 387,
      storeRating: 4.8,
      fanEngagement: 450000,
      vipMembers: 0,
      createdDate: '2023-06-01',
      lastActivity: '2024-01-20'
    },
    {
      id: 3,
      name: 'Nike Official Store',
      owner: 'Nike Global',
      type: 'sponsor',
      status: 'active',
      verificationStatus: 'verified',
      totalProducts: 45,
      totalSales: 2456800,
      monthlyRevenue: 895000,
      totalOrders: 3421,
      storeRating: 4.7,
      familiesOnboarded: 1250,
      clubsSupported: 89,
      createdDate: '2023-05-10',
      lastActivity: '2024-01-20'
    },
    {
      id: 4,
      name: 'Real Madrid Store',
      owner: 'Real Madrid CF',
      type: 'club',
      status: 'active',
      verificationStatus: 'verified',
      totalProducts: 32,
      totalSales: 198450,
      monthlyRevenue: 32400,
      totalOrders: 567,
      storeRating: 4.6,
      fanEngagement: 380000,
      vipMembers: 0,
      createdDate: '2023-07-20',
      lastActivity: '2024-01-19'
    },
    {
      id: 5,
      name: 'Controversial Brand Store',
      owner: 'Controversial Corp',
      type: 'sponsor',
      status: 'suspended',
      verificationStatus: 'pending',
      totalProducts: 12,
      totalSales: 0,
      monthlyRevenue: 0,
      totalOrders: 0,
      storeRating: 0,
      issues: 15,
      flaggedReason: 'Multiple brand controversy reports',
      createdDate: '2024-01-15',
      lastActivity: '2024-01-18'
    },
    {
      id: 6,
      name: 'New Athlete Store',
      owner: 'Rookie Player',
      type: 'athlete',
      status: 'pending',
      verificationStatus: 'under_review',
      totalProducts: 0,
      totalSales: 0,
      monthlyRevenue: 0,
      totalOrders: 0,
      storeRating: 0,
      createdDate: '2024-01-22',
      lastActivity: '2024-01-22'
    }
  ]);

  // Mock all products across platform
  const [allProducts, setAllProducts] = useState([
    {
      id: 1,
      name: 'Messi Signed Jersey',
      storeName: 'Messi Official Store',
      storeId: 1,
      price: 299,
      status: 'active',
      category: 'clothing',
      stock: 15,
      sold: 234,
      flagged: false
    },
    {
      id: 2,
      name: 'Controversial Product',
      storeName: 'Controversial Brand Store',
      storeId: 5,
      price: 199,
      status: 'suspended',
      category: 'apparel',
      stock: 50,
      sold: 0,
      flagged: true,
      flagReason: 'Inappropriate content'
    }
  ]);

  const [showNotification, setShowNotification] = useState({
    show: false,
    message: '',
    type: 'success'
  });

  // Show notification popup
  const showNotificationPopup = (message, type = 'success') => {
    setShowNotification({ show: true, message, type });
    setTimeout(() => {
      setShowNotification({ show: false, message: '', type: 'success' });
    }, 3000);
  };

  const handleStoreAction = (storeId, action) => {
    const store = allStores.find(s => s.id === storeId);
    if (!store) return;

    switch (action) {
      case 'view':
        setSelectedStore(store);
        setShowStoreModal(true);
        break;
      case 'approve':
        setSelectedStore(store);
        setActionType('approve_store');
        setShowActionModal(true);
        break;
      case 'reject':
        setSelectedStore(store);
        setActionType('reject_store');
        setShowActionModal(true);
        break;
      case 'suspend':
        setSelectedStore(store);
        setActionType('suspend_store');
        setShowActionModal(true);
        break;
      case 'activate':
        setSelectedStore(store);
        setActionType('activate_store');
        setShowActionModal(true);
        break;
      default:
        console.log(`Store ${storeId}: ${action}`);
    }
  };

  const handleProductAction = (productId, action) => {
    const product = allProducts.find(p => p.id === productId);
    if (!product) return;

    switch (action) {
      case 'view':
        setSelectedProduct(product);
        setShowProductModal(true);
        break;
      case 'suspend':
        setSelectedProduct(product);
        setActionType('suspend_product');
        setShowActionModal(true);
        break;
      case 'activate':
        setSelectedProduct(product);
        setActionType('activate_product');
        setShowActionModal(true);
        break;
      case 'delete':
        setSelectedProduct(product);
        setActionType('delete_product');
        setShowActionModal(true);
        break;
      default:
        console.log(`Product ${productId}: ${action}`);
    }
  };

  const handleOrderAction = (orderId, action) => {
    // For demo purposes, we'll simulate order processing
    switch (action) {
      case 'view':
        // Find the order from the sample data
        const order = [
          {
            id: 'ORD-2024-001',
            customer: 'john.doe@fanekt.com',
            customerName: 'John Doe',
            product: 'Messi Signed Jersey',
            store: 'Messi Official Store',
            storeType: 'athlete',
            quantity: 1,
            total: 299,
            shipping: 15.99,
            status: 'completed',
            date: '2024-01-20T14:30:00Z',
            paymentMethod: 'FNKT',
            shippingAddress: '123 Fan Street, Barcelona, Spain',
            trackingNumber: 'TRK123456789',
            notes: 'VIP customer - special handling requested'
          },
          {
            id: 'ORD-2024-002',
            customer: 'maria.garcia@fanekt.com',
            customerName: 'Maria Garcia',
            product: 'Barcelona Home Jersey 2024',
            store: 'FC Barcelona Official',
            storeType: 'club',
            quantity: 2,
            total: 178,
            shipping: 12.99,
            status: 'shipped',
            date: '2024-01-19T16:45:00Z',
            paymentMethod: 'FNKT',
            shippingAddress: '456 Culé Avenue, Barcelona, Spain',
            trackingNumber: 'TRK987654321',
            notes: 'Club member discount applied'
          },
          {
            id: 'ORD-2024-003',
            customer: 'alex.smith@fanekt.com',
            customerName: 'Alex Smith',
            product: 'Nike Air Max 2024',
            store: 'Nike Official Store',
            storeType: 'sponsor',
            quantity: 1,
            total: 189,
            shipping: 9.99,
            status: 'processing',
            date: '2024-01-18T11:20:00Z',
            paymentMethod: 'FNKT',
            shippingAddress: '789 Sports Blvd, London, UK',
            trackingNumber: null,
            notes: 'Express shipping requested'
          },
          {
            id: 'ORD-2024-004',
            customer: 'sarah.jones@fanekt.com',
            customerName: 'Sarah Jones',
            product: 'Real Madrid Training Kit',
            store: 'Real Madrid Store',
            storeType: 'club',
            quantity: 1,
            total: 65,
            shipping: 8.99,
            status: 'pending',
            date: '2024-01-17T09:15:00Z',
            paymentMethod: 'FNKT',
            shippingAddress: '321 Madrid Way, Madrid, Spain',
            trackingNumber: null,
            notes: 'Gift wrapping requested'
          }
        ].find(o => o.id === orderId);

        if (order) {
          setSelectedOrder(order);
          setShowOrderModal(true);
        }
        break;
      case 'process':
        showNotificationPopup(`Order ${orderId} marked as processing`, 'success');
        break;
      case 'ship':
        showNotificationPopup(`Order ${orderId} marked as shipped`, 'success');
        break;
      default:
        console.log(`Order ${orderId}: ${action}`);
    }
  };

  const executeAction = () => {
    if (actionType === 'approve_store') {
      setAllStores(prev => prev.map(store =>
        store.id === selectedStore.id
          ? { ...store, status: 'active', verificationStatus: 'verified' }
          : store
      ));
      showNotificationPopup('Store approved successfully', 'success');
    } else if (actionType === 'reject_store') {
      setAllStores(prev => prev.map(store =>
        store.id === selectedStore.id
          ? { ...store, status: 'rejected', verificationStatus: 'rejected' }
          : store
      ));
      showNotificationPopup('Store rejected', 'success');
    } else if (actionType === 'suspend_store') {
      setAllStores(prev => prev.map(store =>
        store.id === selectedStore.id
          ? { ...store, status: 'suspended' }
          : store
      ));
      showNotificationPopup('Store suspended', 'success');
    } else if (actionType === 'activate_store') {
      setAllStores(prev => prev.map(store =>
        store.id === selectedStore.id
          ? { ...store, status: 'active' }
          : store
      ));
      showNotificationPopup('Store activated', 'success');
    } else if (actionType === 'suspend_product') {
      setAllProducts(prev => prev.map(product =>
        product.id === selectedProduct.id
          ? { ...product, status: 'suspended' }
          : product
      ));
      showNotificationPopup('Product suspended', 'success');
    } else if (actionType === 'activate_product') {
      setAllProducts(prev => prev.map(product =>
        product.id === selectedProduct.id
          ? { ...product, status: 'active' }
          : product
      ));
      showNotificationPopup('Product activated', 'success');
    } else if (actionType === 'delete_product') {
      setAllProducts(prev => prev.filter(product => product.id !== selectedProduct.id));
      showNotificationPopup('Product deleted', 'success');
    }

    setShowActionModal(false);
    setSelectedStore(null);
    setSelectedProduct(null);
    setActionType('');
  };

  const filteredStores = allStores.filter(store => {
    const matchesSearch = store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         store.owner.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || store.status === statusFilter;
    const matchesType = storeTypeFilter === 'all' || store.type === storeTypeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.storeName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const getStoreTypeIcon = (type) => {
    switch (type) {
      case 'athlete': return <FaTrophy className="text-yellow-400" />;
      case 'club': return <FaCrown className="text-blue-400" />;
      case 'sponsor': return <FaBullhorn className="text-purple-400" />;
      default: return <FaStore className="text-gray-400" />;
    }
  };

  const getStoreTypeColor = (type) => {
    switch (type) {
      case 'athlete': return 'text-yellow-400 bg-yellow-400/10';
      case 'club': return 'text-blue-400 bg-blue-400/10';
      case 'sponsor': return 'text-purple-400 bg-purple-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-400/10';
      case 'pending': return 'text-yellow-400 bg-yellow-400/10';
      case 'suspended': return 'text-red-400 bg-red-400/10';
      case 'rejected': return 'text-gray-400 bg-gray-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getVerificationColor = (status) => {
    switch (status) {
      case 'verified': return 'text-green-400 bg-green-400/10';
      case 'under_review': return 'text-yellow-400 bg-yellow-400/10';
      case 'rejected': return 'text-red-400 bg-red-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
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

  return (
    <div className="min-h-screen lg:ml-[290px] px-4 lg:px-8 py-6 pt-28 lg:pt-6">
      {/* Header Section */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
              Store Administration
            </h1>
            <p className="text-gray-400 text-lg">
              Platform-wide store oversight and marketplace management
            </p>
          </div>
          <div className="flex gap-3">
            <button className="bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2">
              <FaDownload />
              Export Report
            </button>
            <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2">
              <FaCog />
              Platform Settings
            </button>
          </div>
        </div>
      </motion.div>

      {/* Notification Popup */}
      {showNotification.show && (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50"
        >
          <div className={`px-6 py-3 rounded-lg shadow-2xl border-2 backdrop-blur-sm ${
            showNotification.type === 'success'
              ? 'bg-green-600/90 border-green-400 text-white'
              : 'bg-red-600/90 border-red-400 text-white'
          }`}>
            <div className="flex items-center gap-3">
              {showNotification.type === 'success' ? (
                <FaCheckCircle className="text-green-200 text-xl" />
              ) : (
                <FaInfoCircle className="text-red-200 text-xl" />
              )}
              <span className="font-medium text-sm">{showNotification.message}</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Platform Statistics Overview */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-r from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl p-6 mb-8"
      >
        <div className="grid grid-cols-2 lg:grid-cols-7 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <FaStore className="text-[#f64c68] text-2xl mr-2" />
              <span className="text-white text-xl font-bold">{platformStats.totalStores}</span>
            </div>
            <p className="text-gray-400 text-sm">Total Stores</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <FaCheck className="text-green-400 text-2xl mr-2" />
              <span className="text-white text-xl font-bold">{platformStats.activeStores}</span>
            </div>
            <p className="text-gray-400 text-sm">Active Stores</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <FaBell className="text-yellow-400 text-2xl mr-2" />
              <span className="text-white text-xl font-bold">{platformStats.pendingStores}</span>
            </div>
            <p className="text-gray-400 text-sm">Pending Approval</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <FaBox className="text-blue-400 text-2xl mr-2" />
              <span className="text-white text-xl font-bold">{platformStats.totalProducts.toLocaleString()}</span>
            </div>
            <p className="text-gray-400 text-sm">Total Products</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <FaCoins className="text-yellow-400 text-2xl mr-2" />
              <span className="text-white text-xl font-bold">{platformStats.totalRevenue.toLocaleString()}</span>
            </div>
            <p className="text-gray-400 text-sm">Total Revenue</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <FaChild className="text-pink-400 text-2xl mr-2" />
              <span className="text-white text-xl font-bold">{platformStats.totalFamilies.toLocaleString()}</span>
            </div>
            <p className="text-gray-400 text-sm">Families Onboarded</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <FaFlag className="text-red-400 text-2xl mr-2" />
              <span className="text-white text-xl font-bold">{platformStats.flaggedProducts}</span>
            </div>
            <p className="text-gray-400 text-sm">Flagged Items</p>
          </div>
        </div>
      </motion.div>

      {/* Navigation Tabs */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-6"
      >
        <div className="grid grid-cols-2 lg:grid-cols-7 gap-1 bg-[#1e2139] p-1 rounded-xl border border-[#286db24c]">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
              activeTab === 'overview'
                ? 'bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] text-white shadow-lg'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <FaChartLine className="inline mr-2" />
            Overview
          </button>
          <button
            onClick={() => setActiveTab('stores')}
            className={`py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
              activeTab === 'stores'
                ? 'bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] text-white shadow-lg'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <FaStore className="inline mr-2" />
            All Stores
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
              activeTab === 'products'
                ? 'bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] text-white shadow-lg'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <FaBox className="inline mr-2" />
            Products
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
              activeTab === 'orders'
                ? 'bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] text-white shadow-lg'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <FaShoppingCart className="inline mr-2" />
            Orders
          </button>
          <button
            onClick={() => setActiveTab('families')}
            className={`py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
              activeTab === 'families'
                ? 'bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] text-white shadow-lg'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <FaChild className="inline mr-2" />
            Youth Programs
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
              activeTab === 'analytics'
                ? 'bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] text-white shadow-lg'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <FaChartBar className="inline mr-2" />
            Analytics
          </button>
          <button
            onClick={() => setActiveTab('moderation')}
            className={`py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
              activeTab === 'moderation'
                ? 'bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] text-white shadow-lg'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <FaShieldAlt className="inline mr-2" />
            Moderation
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
          {/* Store Type Distribution */}
          <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl p-6">
            <h3 className="text-white text-xl font-bold mb-4">Store Distribution by Type</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">
                  {allStores.filter(s => s.type === 'athlete').length}
                </div>
                <p className="text-gray-400">Athlete Stores</p>
                <FaTrophy className="text-yellow-400 text-xl mx-auto mt-2" />
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">
                  {allStores.filter(s => s.type === 'club').length}
                </div>
                <p className="text-gray-400">Club Stores</p>
                <FaCrown className="text-blue-400 text-xl mx-auto mt-2" />
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">
                  {allStores.filter(s => s.type === 'sponsor').length}
                </div>
                <p className="text-gray-400">Sponsor Stores</p>
                <FaBullhorn className="text-purple-400 text-xl mx-auto mt-2" />
              </div>
            </div>
          </div>

          {/* Top Performing Stores */}
          <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl p-6">
            <h3 className="text-white text-xl font-bold mb-4">Top Performing Stores</h3>
            <div className="space-y-4">
              {allStores
                .filter(store => store.status === 'active')
                .sort((a, b) => b.totalSales - a.totalSales)
                .slice(0, 5)
                .map((store, index) => (
                  <motion.div
                    key={store.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between bg-[#1e2139] rounded-xl p-4 border border-[#286db24c]"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#2a2d4a] rounded-full flex items-center justify-center">
                        {getStoreTypeIcon(store.type)}
                      </div>
                      <div>
                        <h4 className="text-white font-semibold">{store.name}</h4>
                        <p className="text-gray-400 text-sm">by {store.owner}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-1">
                        <FaCoins className="text-green-400 text-sm" />
                        <span className="text-green-400 font-semibold">{store.totalSales.toLocaleString()} FNKT</span>
                      </div>
                      <p className="text-gray-400 text-sm">{store.totalOrders} orders</p>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>

          {/* Recent Store Applications */}
          <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl p-6">
            <h3 className="text-white text-xl font-bold mb-4">Recent Store Applications</h3>
            <div className="space-y-4">
              {allStores
                .filter(store => store.status === 'pending')
                .slice(0, 3)
                .map((store, index) => (
                  <motion.div
                    key={store.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between bg-[#1e2139] rounded-xl p-4 border border-yellow-400/30"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#2a2d4a] rounded-full flex items-center justify-center">
                        {getStoreTypeIcon(store.type)}
                      </div>
                      <div>
                        <h4 className="text-white font-semibold">{store.name}</h4>
                        <p className="text-gray-400 text-sm">by {store.owner}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleStoreAction(store.id, 'view')}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300"
                      >
                        Review
                      </button>
                      <button
                        onClick={() => handleStoreAction(store.id, 'approve')}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleStoreAction(store.id, 'reject')}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300"
                      >
                        Reject
                      </button>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        </motion.div>
      )}

      {activeTab === 'stores' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Filters */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search stores by name or owner..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#1e2139] text-white pl-10 pr-4 py-3 rounded-lg border border-[#286db24c] focus:outline-none focus:border-[#f64c68]"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#1e2139] text-white px-4 py-3 rounded-lg border border-[#286db24c] focus:outline-none focus:border-[#f64c68]"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="suspended">Suspended</option>
              <option value="rejected">Rejected</option>
            </select>
            <select
              value={storeTypeFilter}
              onChange={(e) => setStoreTypeFilter(e.target.value)}
              className="bg-[#1e2139] text-white px-4 py-3 rounded-lg border border-[#286db24c] focus:outline-none focus:border-[#f64c68]"
            >
              <option value="all">All Types</option>
              <option value="athlete">Athlete Stores</option>
              <option value="club">Club Stores</option>
              <option value="sponsor">Sponsor Stores</option>
            </select>
          </div>

          {/* Stores List */}
          {filteredStores.length > 0 ? (
            <div className="space-y-4">
              {filteredStores.map((store) => (
                <div key={store.id} className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-white text-xl font-bold">{store.name}</h3>
                        <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${getStatusColor(store.status)}`}>
                          {store.status}
                        </div>
                        <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${getVerificationColor(store.verificationStatus)}`}>
                          {store.verificationStatus}
                        </div>
                        {getStoreTypeIcon(store.type)}
                      </div>
                      <p className="text-gray-300 mb-3">Owned by {store.owner}</p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                          <FaBox className="text-blue-400" />
                          <span>{store.totalProducts} products</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FaShoppingCart className="text-green-400" />
                          <span>{store.totalOrders} orders</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FaCoins className="text-yellow-400" />
                          <span>{store.totalSales.toLocaleString()} FNKT earned</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FaStar className="text-yellow-400" />
                          <span>{store.storeRating} rating</span>
                        </div>
                        {store.fanEngagement && (
                          <div className="flex items-center gap-1">
                            <FaUsers className="text-purple-400" />
                            <span>{store.fanEngagement.toLocaleString()} fans</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="ml-6 flex flex-col gap-2">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleStoreAction(store.id, 'view')}
                          className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <FaEye className="text-sm" />
                        </button>
                        {store.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleStoreAction(store.id, 'approve')}
                              className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg transition-colors"
                              title="Approve Store"
                            >
                              <FaCheck className="text-sm" />
                            </button>
                            <button
                              onClick={() => handleStoreAction(store.id, 'reject')}
                              className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-colors"
                              title="Reject Store"
                            >
                              <FaTimes className="text-sm" />
                            </button>
                          </>
                        )}
                        {store.status === 'active' && (
                          <button
                            onClick={() => handleStoreAction(store.id, 'suspend')}
                            className="bg-yellow-600 hover:bg-yellow-700 text-white p-2 rounded-lg transition-colors"
                            title="Suspend Store"
                          >
                            <FaBan className="text-sm" />
                          </button>
                        )}
                        {store.status === 'suspended' && (
                          <button
                            onClick={() => handleStoreAction(store.id, 'activate')}
                            className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg transition-colors"
                            title="Activate Store"
                          >
                            <FaCheck className="text-sm" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <FaStore className="text-gray-400 text-8xl mx-auto mb-6" />
              <h3 className="text-white text-2xl font-bold mb-4">No stores found</h3>
              <p className="text-gray-400 text-lg">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </motion.div>
      )}

      {activeTab === 'products' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Search */}
          <div className="flex justify-between items-center">
            <div className="relative flex-1 max-w-md">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#1e2139] text-white pl-10 pr-4 py-3 rounded-lg border border-[#286db24c] focus:outline-none focus:border-[#f64c68]"
              />
            </div>
          </div>

          {/* Products List */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl p-6">
                  <div className="aspect-square bg-[#1e2139] rounded-lg flex items-center justify-center text-4xl mb-4">
                    📦
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-lg mb-1">{product.name}</h4>
                    <p className="text-gray-400 text-sm mb-2">{product.storeName}</p>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <FaCoins className="text-green-400" />
                        <span className="text-green-400 font-bold">{product.price} FNKT</span>
                      </div>
                      <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                        product.status === 'active' ? 'text-green-400 bg-green-400/10' : 'text-red-400 bg-red-400/10'
                      }`}>
                        {product.status}
                      </div>
                    </div>
                    {product.flagged && (
                      <div className="bg-red-600/20 border border-red-400/30 rounded-lg p-3 mb-4">
                        <p className="text-red-300 text-sm">{product.flagReason}</p>
                      </div>
                    )}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleProductAction(product.id, 'view')}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold transition-all duration-300"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleProductAction(product.id, product.status === 'active' ? 'suspend' : 'activate')}
                        className={`px-3 py-2 rounded-lg font-semibold transition-all duration-300 ${
                          product.status === 'active'
                            ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
                            : 'bg-green-600 hover:bg-green-700 text-white'
                        }`}
                      >
                        {product.status === 'active' ? 'Suspend' : 'Activate'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <FaBox className="text-gray-400 text-8xl mx-auto mb-6" />
              <h3 className="text-white text-2xl font-bold mb-4">No products found</h3>
              <p className="text-gray-400 text-lg">Try adjusting your search criteria.</p>
            </div>
          )}
        </motion.div>
      )}

      {activeTab === 'orders' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Order Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 border border-green-400/30 rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-400 text-sm font-medium">Total Orders</p>
                  <p className="text-white text-2xl font-bold">{platformStats.totalOrders.toLocaleString()}</p>
                  <p className="text-green-400 text-sm">all time</p>
                </div>
                <FaShoppingCart className="text-green-400 text-3xl" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-blue-400/30 rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-400 text-sm font-medium">Pending Orders</p>
                  <p className="text-white text-2xl font-bold">1,247</p>
                  <p className="text-blue-400 text-sm">awaiting fulfillment</p>
                </div>
                <FaClock className="text-blue-400 text-3xl" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-yellow-600/20 to-amber-600/20 border border-yellow-400/30 rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-400 text-sm font-medium">Shipped Today</p>
                  <p className="text-white text-2xl font-bold">89</p>
                  <p className="text-yellow-400 text-sm">orders processed</p>
                </div>
                <FaTruck className="text-yellow-400 text-3xl" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-400/30 rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-400 text-sm font-medium">Revenue Today</p>
                  <p className="text-white text-2xl font-bold">12,450</p>
                  <p className="text-purple-400 text-sm">FNKT earned</p>
                </div>
                <FaCoins className="text-purple-400 text-3xl" />
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search orders by ID, customer, or product..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#1e2139] text-white pl-10 pr-4 py-3 rounded-lg border border-[#286db24c] focus:outline-none focus:border-[#f64c68]"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#1e2139] text-white px-4 py-3 rounded-lg border border-[#286db24c] focus:outline-none focus:border-[#f64c68]"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <select
              value={storeTypeFilter}
              onChange={(e) => setStoreTypeFilter(e.target.value)}
              className="bg-[#1e2139] text-white px-4 py-3 rounded-lg border border-[#286db24c] focus:outline-none focus:border-[#f64c68]"
            >
              <option value="all">All Stores</option>
              <option value="athlete">Athlete Stores</option>
              <option value="club">Club Stores</option>
              <option value="sponsor">Sponsor Stores</option>
            </select>
          </div>

          {/* Orders List */}
          <div className="space-y-4">
            {/* Sample Orders */}
            {[
              {
                id: 'ORD-2024-001',
                customer: 'john.doe@fanekt.com',
                product: 'Messi Signed Jersey',
                store: 'Messi Official Store',
                storeType: 'athlete',
                quantity: 1,
                total: 299,
                shipping: 15.99,
                status: 'completed',
                date: '2024-01-20T14:30:00Z',
                paymentMethod: 'FNKT'
              },
              {
                id: 'ORD-2024-002',
                customer: 'maria.garcia@fanekt.com',
                product: 'Barcelona Home Jersey 2024',
                store: 'FC Barcelona Official',
                storeType: 'club',
                quantity: 2,
                total: 178,
                shipping: 12.99,
                status: 'shipped',
                date: '2024-01-19T16:45:00Z',
                paymentMethod: 'FNKT'
              },
              {
                id: 'ORD-2024-003',
                customer: 'alex.smith@fanekt.com',
                product: 'Nike Air Max 2024',
                store: 'Nike Official Store',
                storeType: 'sponsor',
                quantity: 1,
                total: 189,
                shipping: 9.99,
                status: 'processing',
                date: '2024-01-18T11:20:00Z',
                paymentMethod: 'FNKT'
              },
              {
                id: 'ORD-2024-004',
                customer: 'sarah.jones@fanekt.com',
                product: 'Real Madrid Training Kit',
                store: 'Real Madrid Store',
                storeType: 'club',
                quantity: 1,
                total: 65,
                shipping: 8.99,
                status: 'pending',
                date: '2024-01-17T09:15:00Z',
                paymentMethod: 'FNKT'
              }
            ].map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl p-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#286db24c] rounded-full flex items-center justify-center">
                      <FaShoppingCart className="text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-white font-semibold">Order #{order.id}</span>
                        <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                          order.status === 'completed' ? 'text-green-400 bg-green-400/10' :
                          order.status === 'shipped' ? 'text-yellow-400 bg-yellow-400/10' :
                          order.status === 'processing' ? 'text-blue-400 bg-blue-400/10' :
                          order.status === 'pending' ? 'text-orange-400 bg-orange-400/10' :
                          'text-red-400 bg-red-400/10'
                        }`}>
                          {order.status}
                        </div>
                      </div>
                      <p className="text-gray-400 text-sm">{order.customer}</p>
                      <p className="text-gray-300 text-sm">{order.product} (x{order.quantity}) from {order.store}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-1">
                          <FaCoins className="text-green-400 text-xs" />
                          <span className="text-green-400 text-sm font-medium">{order.total} FNKT</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FaEuroSign className="text-blue-400 text-xs" />
                          <span className="text-blue-400 text-sm">€{order.shipping}</span>
                        </div>
                        <span className="text-gray-400 text-xs">{formatDate(order.date)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleOrderAction(order.id, 'view')}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300"
                    >
                      View Details
                    </button>
                    {order.status === 'pending' && (
                      <button
                        onClick={() => handleOrderAction(order.id, 'process')}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300"
                      >
                        Process
                      </button>
                    )}
                    {order.status === 'processing' && (
                      <button
                        onClick={() => handleOrderAction(order.id, 'ship')}
                        className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300"
                      >
                        Mark Shipped
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {activeTab === 'families' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl p-6">
            <h3 className="text-white text-xl font-bold mb-4">Sponsor X Families - Youth Programs Oversight</h3>
            <p className="text-gray-400">Platform-wide monitoring of sponsor youth development programs and family onboarding</p>
          </div>

          {/* Program Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div className="bg-gradient-to-br from-pink-600/20 to-rose-600/20 border border-pink-400/30 rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-pink-400 text-sm font-medium">Total Families</p>
                  <p className="text-white text-2xl font-bold">{platformStats.totalFamilies.toLocaleString()}</p>
                  <p className="text-pink-400 text-sm">onboarded</p>
                </div>
                <FaUsers className="text-pink-400 text-3xl" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-blue-400/30 rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-400 text-sm font-medium">Active Sponsors</p>
                  <p className="text-white text-2xl font-bold">{allStores.filter(s => s.type === 'sponsor' && s.status === 'active').length}</p>
                  <p className="text-blue-400 text-sm">with programs</p>
                </div>
                <FaBullhorn className="text-blue-400 text-3xl" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 border border-green-400/30 rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-400 text-sm font-medium">Equipment Distributed</p>
                  <p className="text-white text-2xl font-bold">2,500</p>
                  <p className="text-green-400 text-sm">items given</p>
                </div>
                <FaGift className="text-green-400 text-3xl" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-400/30 rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-400 text-sm font-medium">Program Budget</p>
                  <p className="text-white text-2xl font-bold">500,000</p>
                  <p className="text-purple-400 text-sm">FNKT allocated</p>
                </div>
                <FaMoneyBillWave className="text-purple-400 text-3xl" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-600/20 to-amber-600/20 border border-orange-400/30 rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-400 text-sm font-medium">Clubs Supported</p>
                  <p className="text-white text-2xl font-bold">{platformStats.totalClubs}</p>
                  <p className="text-orange-400 text-sm">participating</p>
                </div>
                <FaMapMarkerAlt className="text-orange-400 text-3xl" />
              </div>
            </div>
          </div>

          {/* Sponsor Programs List */}
          <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl p-6">
            <h3 className="text-white text-xl font-bold mb-6">Active Sponsor Programs</h3>

            <div className="space-y-4">
              {allStores
                .filter(store => store.type === 'sponsor' && store.status === 'active')
                .map((sponsor, index) => (
                  <motion.div
                    key={sponsor.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between bg-[#1e2139] rounded-xl p-4 border border-[#286db24c]"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-purple-600/20 rounded-full flex items-center justify-center">
                        {getStoreTypeIcon(sponsor.type)}
                      </div>
                      <div>
                        <h4 className="text-white font-semibold">{sponsor.name}</h4>
                        <p className="text-gray-400 text-sm">by {sponsor.owner}</p>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-pink-400 text-sm">{sponsor.familiesOnboarded || 0} families onboarded</span>
                          <span className="text-blue-400 text-sm">{sponsor.clubsSupported || 0} clubs supported</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-1">
                        <FaCoins className="text-green-400 text-sm" />
                        <span className="text-green-400 font-semibold">{sponsor.totalSales.toLocaleString()} FNKT</span>
                      </div>
                      <p className="text-gray-400 text-sm">from youth programs</p>
                      <div className="flex gap-2 mt-2">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg font-semibold transition-all duration-300 text-sm">
                          View Program
                        </button>
                        <button className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-lg font-semibold transition-all duration-300 text-sm">
                          Manage Budget
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>

          {/* Geographic Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl p-6">
              <h4 className="text-white font-semibold mb-4">Geographic Distribution</h4>
              <div className="space-y-3">
                {[
                  { region: 'Europe', families: 450, clubs: 25, percentage: 36 },
                  { region: 'North America', families: 320, clubs: 18, percentage: 26 },
                  { region: 'South America', families: 280, clubs: 22, percentage: 22 },
                  { region: 'Asia', families: 200, clubs: 24, percentage: 16 }
                ].map((region, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FaMapMarkerAlt className="text-blue-400" />
                      <span className="text-white">{region.region}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-green-400 font-semibold">{region.families} families ({region.percentage}%)</p>
                      <p className="text-gray-400 text-sm">{region.clubs} clubs</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl p-6">
              <h4 className="text-white font-semibold mb-4">Sports Distribution</h4>
              <div className="space-y-3">
                {[
                  { sport: 'Football', families: 600, clubs: 35, icon: FaFootballBall },
                  { sport: 'Basketball', families: 250, clubs: 18, icon: FaBasketballBall },
                  { sport: 'Swimming', families: 180, clubs: 12, icon: FaSwimmer },
                  { sport: 'Athletics', families: 220, clubs: 24, icon: FaRunning }
                ].map((sport, index) => {
                  const Icon = sport.icon;
                  return (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Icon className="text-orange-400" />
                        <span className="text-white">{sport.sport}</span>
                      </div>
                      <div className="text-right">
                        <p className="text-green-400 font-semibold">{sport.families} families</p>
                        <p className="text-gray-400 text-sm">{sport.clubs} clubs</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Age Group Distribution */}
          <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl p-6">
            <h4 className="text-white font-semibold mb-4">Age Group Distribution</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { range: '6-12 years', families: 400, percentage: 32 },
                { range: '13-17 years', families: 550, percentage: 44 },
                { range: '18-25 years', families: 300, percentage: 24 }
              ].map((ageGroup, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-purple-400 mb-2">{ageGroup.families}</div>
                  <p className="text-gray-400 text-sm">{ageGroup.range}</p>
                  <p className="text-purple-400 text-xs">({ageGroup.percentage}% of total)</p>
                </div>
              ))}
            </div>
          </div>

          {/* Program Compliance & Monitoring */}
          <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl p-6">
            <h4 className="text-white font-semibold mb-4">Program Compliance & Monitoring</h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-green-600/10 border border-green-400/30 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <FaCheckCircle className="text-green-400" />
                  <span className="text-green-400 font-semibold">Compliant Programs</span>
                </div>
                <p className="text-white text-2xl font-bold">12</p>
                <p className="text-gray-400 text-sm">following all guidelines</p>
              </div>

              <div className="bg-yellow-600/10 border border-yellow-400/30 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <FaClock className="text-yellow-400" />
                  <span className="text-yellow-400 font-semibold">Under Review</span>
                </div>
                <p className="text-white text-2xl font-bold">3</p>
                <p className="text-gray-400 text-sm">pending compliance check</p>
              </div>

              <div className="bg-red-600/10 border border-red-400/30 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <FaExclamationTriangle className="text-red-400" />
                  <span className="text-red-400 font-semibold">Non-Compliant</span>
                </div>
                <p className="text-white text-2xl font-bold">1</p>
                <p className="text-gray-400 text-sm">requires immediate attention</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {activeTab === 'analytics' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl p-6">
            <h3 className="text-white text-xl font-bold mb-4">Platform Analytics Dashboard</h3>
            <p className="text-gray-400">Comprehensive insights into store performance and marketplace trends</p>
          </div>

          {/* Key Performance Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 border border-green-400/30 rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-400 text-sm font-medium">Monthly Revenue</p>
                  <p className="text-white text-2xl font-bold">2.4M FNKT</p>
                  <p className="text-green-400 text-sm">+23% from last month</p>
                </div>
                <FaChartLine className="text-green-400 text-3xl" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-blue-400/30 rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-400 text-sm font-medium">Active Stores</p>
                  <p className="text-white text-2xl font-bold">142</p>
                  <p className="text-blue-400 text-sm">92% of total stores</p>
                </div>
                <FaStore className="text-blue-400 text-3xl" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-400/30 rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-400 text-sm font-medium">Avg Order Value</p>
                  <p className="text-white text-2xl font-bold">€156</p>
                  <p className="text-purple-400 text-sm">including shipping</p>
                </div>
                <FaCoins className="text-purple-400 text-3xl" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-600/20 to-amber-600/20 border border-orange-400/30 rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-400 text-sm font-medium">Conversion Rate</p>
                  <p className="text-white text-2xl font-bold">3.2%</p>
                  <p className="text-orange-400 text-sm">store visits to sales</p>
                </div>
                <FaPercentage className="text-orange-400 text-3xl" />
              </div>
            </div>
          </div>

          {/* Revenue Trends */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl p-6">
              <h4 className="text-white font-semibold mb-4">Revenue Trends (Last 6 Months)</h4>
              <div className="space-y-4">
                {[
                  { month: 'Jan', revenue: 1800000, orders: 12000 },
                  { month: 'Feb', revenue: 1950000, orders: 13100 },
                  { month: 'Mar', revenue: 2100000, orders: 14200 },
                  { month: 'Apr', revenue: 2250000, orders: 15100 },
                  { month: 'May', revenue: 2350000, orders: 15800 },
                  { month: 'Jun', revenue: 2456780, orders: 15689 }
                ].map((data, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-gray-400 w-12">{data.month}</span>
                      <div className="flex-1 bg-gray-700 rounded-full h-3">
                        <div
                          className="bg-[#f64c68] h-3 rounded-full"
                          style={{ width: `${(data.revenue / 2500000) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <span className="text-green-400 font-semibold">{(data.revenue / 1000000).toFixed(1)}M FNKT</span>
                      <p className="text-gray-400 text-sm">{data.orders.toLocaleString()} orders</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl p-6">
              <h4 className="text-white font-semibold mb-4">Store Type Performance</h4>
              <div className="space-y-4">
                {[
                  { type: 'Sponsor Stores', revenue: 1234567, percentage: 50, icon: FaBullhorn, color: 'text-purple-400' },
                  { type: 'Club Stores', revenue: 741258, percentage: 30, icon: FaCrown, color: 'text-blue-400' },
                  { type: 'Athlete Stores', revenue: 370629, percentage: 15, icon: FaTrophy, color: 'text-yellow-400' },
                  { type: 'FANEKT Official', revenue: 111389, percentage: 5, icon: FaStar, color: 'text-green-400' }
                ].map((storeType, index) => {
                  const Icon = storeType.icon;
                  return (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Icon className={`text-xl ${storeType.color}`} />
                        <span className="text-white">{storeType.type}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-green-400 font-semibold">{(storeType.revenue / 1000000).toFixed(2)}M FNKT</span>
                        <p className="text-gray-400 text-sm">{storeType.percentage}% of revenue</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Geographic Performance */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl p-6">
              <h4 className="text-white font-semibold mb-4">Geographic Revenue Distribution</h4>
              <div className="space-y-4">
                {[
                  { region: 'Europe', revenue: 1478523, orders: 9856, percentage: 60 },
                  { region: 'North America', revenue: 591410, orders: 3942, percentage: 24 },
                  { region: 'South America', revenue: 221778, orders: 1478, percentage: 9 },
                  { region: 'Asia', revenue: 147852, orders: 986, percentage: 6 },
                  { region: 'Other', revenue: 18481, orders: 123, percentage: 1 }
                ].map((region, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FaMapMarkerAlt className="text-blue-400" />
                      <span className="text-white">{region.region}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-green-400 font-semibold">{(region.revenue / 1000000).toFixed(2)}M FNKT</span>
                      <p className="text-gray-400 text-sm">{region.orders} orders ({region.percentage}%)</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl p-6">
              <h4 className="text-white font-semibold mb-4">Product Category Performance</h4>
              <div className="space-y-4">
                {[
                  { category: 'Footwear', revenue: 852369, orders: 5682, growth: '+12%' },
                  { category: 'Apparel', revenue: 654321, orders: 4362, growth: '+8%' },
                  { category: 'Sports Equipment', revenue: 432198, orders: 2881, growth: '+15%' },
                  { category: 'Accessories', revenue: 321987, orders: 2146, growth: '+6%' },
                  { category: 'Memorabilia', revenue: 198765, orders: 1325, growth: '+22%' }
                ].map((category, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-gray-400 text-sm font-medium">{category.category}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-green-400 font-semibold">{(category.revenue / 1000000).toFixed(2)}M FNKT</span>
                      <p className="text-gray-400 text-sm">{category.orders} orders <span className="text-green-400">{category.growth}</span></p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Products Analytics */}
          <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl p-6">
            <h4 className="text-white font-semibold mb-4">Top Performing Products</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: 'Nike Air Max 2024', store: 'Nike Official Store', revenue: 89000, sold: 445, growth: '+25%' },
                { name: 'Barcelona Home Jersey', store: 'FC Barcelona Official', revenue: 67150, sold: 269, growth: '+18%' },
                { name: 'Messi Signed Jersey', store: 'Messi Official Store', revenue: 89700, sold: 299, growth: '+32%' },
                { name: 'Real Madrid Training Kit', store: 'Real Madrid Store', revenue: 39000, sold: 156, growth: '+15%' },
                { name: 'Adidas Elite Football', store: 'Adidas Official Store', revenue: 22500, sold: 150, growth: '+20%' },
                { name: 'PSG Champions Scarf', store: 'Paris Saint-Germain', revenue: 15750, sold: 105, growth: '+12%' }
              ].map((product, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-[#1e2139] rounded-lg p-4 border border-[#286db24c]"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-[#2a2d4a] rounded-lg flex items-center justify-center text-lg">
                      🏷️
                    </div>
                    <div className="flex-1">
                      <h5 className="text-white font-semibold text-sm">{product.name}</h5>
                      <p className="text-gray-400 text-xs">{product.store}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="text-center">
                      <p className="text-gray-400">Revenue</p>
                      <p className="text-green-400 font-semibold">{(product.revenue / 1000).toFixed(0)}K FNKT</p>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-400">Sold</p>
                      <p className="text-blue-400 font-semibold">{product.sold}</p>
                    </div>
                  </div>
                  <div className="mt-2 text-center">
                    <span className="text-green-400 text-xs font-medium">{product.growth} growth</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Platform Health Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl p-6">
              <h4 className="text-white font-semibold mb-4">Store Health Metrics</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Store Approval Rate</span>
                  <span className="text-green-400 font-semibold">96.7%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Average Store Rating</span>
                  <span className="text-yellow-400 font-semibold">4.6/5.0</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Product Approval Rate</span>
                  <span className="text-blue-400 font-semibold">98.2%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Customer Satisfaction</span>
                  <span className="text-purple-400 font-semibold">94.8%</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl p-6">
              <h4 className="text-white font-semibold mb-4">Market Trends</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Mobile Purchases</span>
                  <span className="text-green-400 font-semibold">78.5%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Average Session Time</span>
                  <span className="text-blue-400 font-semibold">4m 32s</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Cart Abandonment</span>
                  <span className="text-red-400 font-semibold">23.1%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Return Rate</span>
                  <span className="text-orange-400 font-semibold">2.8%</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl p-6">
              <h4 className="text-white font-semibold mb-4">Revenue Projections</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Next Month</span>
                  <span className="text-green-400 font-semibold">+18%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Quarterly Growth</span>
                  <span className="text-blue-400 font-semibold">+24%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Annual Target</span>
                  <span className="text-purple-400 font-semibold">32M FNKT</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Market Share</span>
                  <span className="text-yellow-400 font-semibold">67.3%</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {activeTab === 'moderation' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl p-6">
            <h3 className="text-white text-xl font-bold mb-4">Content Moderation Dashboard</h3>
            <p className="text-gray-400">Platform-wide content moderation and compliance monitoring</p>
          </div>

          {/* Moderation Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-red-600/20 to-pink-600/20 border border-red-400/30 rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-400 text-sm font-medium">Flagged Content</p>
                  <p className="text-white text-2xl font-bold">{platformStats.flaggedProducts + platformStats.reportedStores}</p>
                  <p className="text-red-400 text-sm">requires review</p>
                </div>
                <FaFlag className="text-red-400 text-3xl" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-yellow-600/20 to-amber-600/20 border border-yellow-400/30 rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-400 text-sm font-medium">Pending Review</p>
                  <p className="text-white text-2xl font-bold">47</p>
                  <p className="text-yellow-400 text-sm">in moderation queue</p>
                </div>
                <FaClock className="text-yellow-400 text-3xl" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 border border-green-400/30 rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-400 text-sm font-medium">Approved Today</p>
                  <p className="text-white text-2xl font-bold">156</p>
                  <p className="text-green-400 text-sm">content items</p>
                </div>
                <FaCheckCircle className="text-green-400 text-3xl" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-blue-400/30 rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-400 text-sm font-medium">Moderation Rate</p>
                  <p className="text-white text-2xl font-bold">98.2%</p>
                  <p className="text-blue-400 text-sm">auto-approved</p>
                </div>
                <FaShieldAlt className="text-blue-400 text-3xl" />
              </div>
            </div>
          </div>

          {/* Flagged Content Queue */}
          <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl p-6">
            <h3 className="text-white text-xl font-bold mb-6 flex items-center gap-3">
              <FaFlag className="text-red-400" />
              Flagged Content Queue
            </h3>

            <div className="space-y-4">
              {[
                {
                  id: 1,
                  type: 'product',
                  title: 'Controversial Product',
                  store: 'Controversial Brand Store',
                  reason: 'Inappropriate content',
                  severity: 'high',
                  reportedBy: 12,
                  date: '2024-01-20T10:30:00Z',
                  status: 'pending_review'
                },
                {
                  id: 2,
                  type: 'store',
                  title: 'Suspicious Store',
                  store: 'Suspicious Store',
                  reason: 'Multiple user reports',
                  severity: 'medium',
                  reportedBy: 8,
                  date: '2024-01-19T15:45:00Z',
                  status: 'pending_review'
                },
                {
                  id: 3,
                  type: 'product',
                  title: 'Inappropriate Image',
                  store: 'Some Store',
                  reason: 'Violates content guidelines',
                  severity: 'high',
                  reportedBy: 5,
                  date: '2024-01-18T09:20:00Z',
                  status: 'under_review'
                }
              ].map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between bg-[#1e2139] rounded-xl p-4 border border-red-400/30"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-600/20 rounded-full flex items-center justify-center">
                      {item.type === 'product' ? '📦' : '🏪'}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-semibold">{item.title}</h4>
                      <p className="text-gray-400 text-sm">from {item.store}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                          item.severity === 'high' ? 'text-red-400 bg-red-400/10' :
                          item.severity === 'medium' ? 'text-yellow-400 bg-yellow-400/10' :
                          'text-orange-400 bg-orange-400/10'
                        }`}>
                          <FaExclamationTriangle className="text-xs" />
                          {item.severity} priority
                        </div>
                        <span className="text-gray-400 text-xs">Reported by {item.reportedBy} users</span>
                        <span className="text-gray-400 text-xs">{formatDate(item.date)}</span>
                      </div>
                      <p className="text-red-300 text-sm mt-2">{item.reason}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 text-sm">
                      Review
                    </button>
                    <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 text-sm">
                      Approve
                    </button>
                    <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 text-sm">
                      Reject
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Moderation Tools Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Content Guidelines */}
            <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl p-6">
              <h4 className="text-white font-semibold mb-4">Content Guidelines</h4>

              <div className="space-y-4">
                <div className="bg-[#1e2139] rounded-lg p-4 border border-[#286db24c]">
                  <h5 className="text-white font-medium mb-2">Prohibited Content</h5>
                  <ul className="text-gray-400 text-sm space-y-1">
                    <li>• Hate speech or discrimination</li>
                    <li>• Inappropriate or explicit content</li>
                    <li>• Copyright infringement</li>
                    <li>• Misleading product descriptions</li>
                    <li>• Spam or promotional abuse</li>
                  </ul>
                </div>

                <div className="bg-[#1e2139] rounded-lg p-4 border border-[#286db24c]">
                  <h5 className="text-white font-medium mb-2">Store Requirements</h5>
                  <ul className="text-gray-400 text-sm space-y-1">
                    <li>• Verified PRO account status</li>
                    <li>• Clear product descriptions</li>
                    <li>• Accurate pricing and inventory</li>
                    <li>• Professional store branding</li>
                    <li>• Responsive customer service</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Moderation Actions */}
            <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl p-6">
              <h4 className="text-white font-semibold mb-4">Moderation Actions</h4>

              <div className="space-y-4">
                <div className="bg-[#1e2139] rounded-lg p-4 border border-[#286db24c]">
                  <h5 className="text-white font-medium mb-3">Product Moderation</h5>
                  <div className="grid grid-cols-2 gap-4">
                    <button className="bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded-lg font-semibold transition-all duration-300 text-sm">
                      Suspend Product
                    </button>
                    <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-semibold transition-all duration-300 text-sm">
                      Activate Product
                    </button>
                    <button className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-semibold transition-all duration-300 text-sm">
                      Delete Product
                    </button>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold transition-all duration-300 text-sm">
                      Edit Product
                    </button>
                  </div>
                </div>

                <div className="bg-[#1e2139] rounded-lg p-4 border border-[#286db24c]">
                  <h5 className="text-white font-medium mb-3">Store Moderation</h5>
                  <div className="grid grid-cols-2 gap-4">
                    <button className="bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded-lg font-semibold transition-all duration-300 text-sm">
                      Suspend Store
                    </button>
                    <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-semibold transition-all duration-300 text-sm">
                      Activate Store
                    </button>
                    <button className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-semibold transition-all duration-300 text-sm">
                      Close Store
                    </button>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold transition-all duration-300 text-sm">
                      Contact Owner
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Moderation Reports */}
          <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl p-6">
            <h4 className="text-white font-semibold mb-4">Recent Moderation Actions</h4>

            <div className="space-y-4">
              {[
                {
                  id: 1,
                  action: 'Product Suspended',
                  item: 'Inappropriate Product',
                  moderator: 'Admin User',
                  reason: 'Violates content guidelines',
                  date: '2024-01-20T14:30:00Z',
                  status: 'completed'
                },
                {
                  id: 2,
                  action: 'Store Approved',
                  item: 'New Athlete Store',
                  moderator: 'Admin User',
                  reason: 'All requirements met',
                  date: '2024-01-19T11:15:00Z',
                  status: 'completed'
                },
                {
                  id: 3,
                  action: 'Product Edited',
                  item: 'Misleading Description',
                  moderator: 'Admin User',
                  reason: 'Corrected product information',
                  date: '2024-01-18T16:45:00Z',
                  status: 'completed'
                }
              ].map((report, index) => (
                <motion.div
                  key={report.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between bg-[#1e2139] rounded-xl p-4 border border-[#286db24c]"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#2a2d4a] rounded-lg flex items-center justify-center">
                      {report.action.includes('Suspended') ? '🚫' :
                       report.action.includes('Approved') ? '✅' :
                       report.action.includes('Edited') ? '✏️' : '📋'}
                    </div>
                    <div>
                      <h5 className="text-white font-semibold text-sm">{report.action}</h5>
                      <p className="text-gray-400 text-xs">{report.item}</p>
                      <p className="text-gray-400 text-xs">by {report.moderator} • {formatDate(report.date)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                      report.status === 'completed' ? 'text-green-400 bg-green-400/10' :
                      report.status === 'pending' ? 'text-yellow-400 bg-yellow-400/10' :
                      'text-gray-400 bg-gray-400/10'
                    }`}>
                      {report.status}
                    </div>
                    <p className="text-gray-400 text-xs mt-1 max-w-xs truncate">{report.reason}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Moderation Settings */}
          {/* <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl p-6">
            <h4 className="text-white font-semibold mb-4">Moderation Settings</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="block text-white font-medium mb-1">Auto-Approval Threshold</label>
                    <p className="text-gray-400 text-sm">Products with rating  4.5</p>
                  </div>
                  <input
                    type="number"
                    defaultValue="4.5"
                    step="0.1"
                    min="0"
                    max="5"
                    className="bg-[#1e2139] text-white px-3 py-2 rounded-lg border border-[#286db24c] focus:outline-none focus:border-[#f64c68] w-20"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="block text-white font-medium mb-1">Content Filtering</label>
                    <p className="text-gray-400 text-sm">AI-powered content analysis</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#f64c68]"></div>
                  </label>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="block text-white font-medium mb-1">Keyword Monitoring</label>
                    <p className="text-gray-400 text-sm">Automatic flag detection</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#f64c68]"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="block text-white font-medium mb-1">Email Notifications</label>
                    <p className="text-gray-400 text-sm">Alert on high-priority flags</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#f64c68]"></div>
                  </label>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <button className="bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
                Save Moderation Settings
              </button>
            </div>
          </div> */}
        </motion.div>
      )}

      {/* Store Details Modal */}
      {showStoreModal && selectedStore && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-[#286db24c]">
              <div className="flex items-center justify-between">
                <h3 className="text-white text-xl font-bold">{selectedStore.name}</h3>
                <button
                  onClick={() => setShowStoreModal(false)}
                  className="text-gray-400 hover:text-white p-2"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-white font-bold mb-4">Store Information</h4>
                  <div className="space-y-3">
                    <div>
                      <span className="text-gray-400">Owner:</span>
                      <span className="text-white ml-2">{selectedStore.owner}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Type:</span>
                      <span className="text-white ml-2">{selectedStore.type}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Status:</span>
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs ${getStatusColor(selectedStore.status)}`}>
                        {selectedStore.status}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400">Verification:</span>
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs ${getVerificationColor(selectedStore.verificationStatus)}`}>
                        {selectedStore.verificationStatus}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-4">Performance Metrics</h4>
                  <div className="space-y-3">
                    <div>
                      <span className="text-gray-400">Total Sales:</span>
                      <span className="text-[#f64c68] font-bold ml-2">{selectedStore.totalSales.toLocaleString()} FNKT</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Monthly Revenue:</span>
                      <span className="text-white ml-2">{selectedStore.monthlyRevenue.toLocaleString()} FNKT</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Total Orders:</span>
                      <span className="text-blue-400 ml-2">{selectedStore.totalOrders}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Store Rating:</span>
                      <span className="text-yellow-400 ml-2">{selectedStore.storeRating}/5.0</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Product Details Modal */}
      {showProductModal && selectedProduct && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-[#286db24c]">
              <div className="flex items-center justify-between">
                <h3 className="text-white text-xl font-bold">{selectedProduct.name}</h3>
                <button
                  onClick={() => setShowProductModal(false)}
                  className="text-gray-400 hover:text-white p-2"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Product Image */}
                <div className="space-y-4">
                  <div className="aspect-square bg-[#1e2139] rounded-lg flex items-center justify-center text-8xl">
                    📦
                  </div>

                  {/* Store Information */}
                  <div className="bg-[#1e2139] rounded-lg p-4 border border-[#286db24c]">
                    <h4 className="text-white font-semibold mb-3">Store Information</h4>
                    <div className="space-y-2">
                      <p className="text-gray-400">Store: <span className="text-white">{selectedProduct.storeName}</span></p>
                      <p className="text-gray-400">Store ID: <span className="text-white">#{selectedProduct.storeId}</span></p>
                      <p className="text-gray-400">Product ID: <span className="text-white">#{selectedProduct.id}</span></p>
                    </div>
                  </div>
                </div>

                {/* Product Details */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-white font-semibold mb-4">Product Details</h4>

                    {/* Price & Status */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <FaCoins className="text-green-400 text-xl" />
                        <span className="text-green-400 text-3xl font-bold">{selectedProduct.price}</span>
                        <span className="text-gray-400">FNKT</span>
                      </div>
                      <div className={`flex items-center gap-1 px-3 py-2 rounded-full text-sm ${
                        selectedProduct.status === 'active' ? 'text-green-400 bg-green-400/10' : 'text-red-400 bg-red-400/10'
                      }`}>
                        {selectedProduct.status}
                      </div>
                    </div>

                    {/* Product Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center bg-[#1e2139] rounded-lg p-3">
                        <div className="text-2xl font-bold text-blue-400">{selectedProduct.stock}</div>
                        <p className="text-gray-400 text-sm">In Stock</p>
                      </div>
                      <div className="text-center bg-[#1e2139] rounded-lg p-3">
                        <div className="text-2xl font-bold text-green-400">{selectedProduct.sold}</div>
                        <p className="text-gray-400 text-sm">Sold</p>
                      </div>
                    </div>

                    {/* Category */}
                    <div className="mb-4">
                      <span className="text-gray-400">Category:</span>
                      <span className="text-white ml-2 capitalize">{selectedProduct.category}</span>
                    </div>

                    {/* Flagged Content Warning */}
                    {selectedProduct.flagged && (
                      <div className="bg-red-600/20 border border-red-400/30 rounded-lg p-4 mb-4">
                        <div className="flex items-start gap-3">
                          <FaExclamationTriangle className="text-red-400 text-lg mt-1 flex-shrink-0" />
                          <div>
                            <p className="text-red-400 font-medium mb-1">Flagged Content</p>
                            <p className="text-red-300 text-sm">{selectedProduct.flagReason}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-4">
                      <button
                        onClick={() => {
                          handleProductAction(selectedProduct.id, selectedProduct.status === 'active' ? 'suspend' : 'activate');
                          setShowProductModal(false);
                        }}
                        className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                          selectedProduct.status === 'active'
                            ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
                            : 'bg-green-600 hover:bg-green-700 text-white'
                        }`}
                      >
                        {selectedProduct.status === 'active' ? <FaBan /> : <FaCheck />}
                        {selectedProduct.status === 'active' ? 'Suspend Product' : 'Activate Product'}
                      </button>
                      <button
                        onClick={() => {
                          handleProductAction(selectedProduct.id, 'delete');
                          setShowProductModal(false);
                        }}
                        className="px-6 py-3 border border-red-600 text-red-400 rounded-lg hover:bg-red-600 hover:text-white transition-all duration-300 flex items-center gap-2"
                      >
                        <FaTrash />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Order Details Modal */}
      {showOrderModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-[#286db24c]">
              <div className="flex items-center justify-between">
                <h3 className="text-white text-xl font-bold">Order Details - {selectedOrder.id}</h3>
                <button
                  onClick={() => setShowOrderModal(false)}
                  className="text-gray-400 hover:text-white p-2"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Order Information */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-white font-semibold mb-4">Order Information</h4>

                    {/* Order Status */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-gray-400">Status:</span>
                      <div className={`flex items-center gap-1 px-3 py-2 rounded-full text-sm ${
                        selectedOrder.status === 'completed' ? 'text-green-400 bg-green-400/10' :
                        selectedOrder.status === 'shipped' ? 'text-yellow-400 bg-yellow-400/10' :
                        selectedOrder.status === 'processing' ? 'text-blue-400 bg-blue-400/10' :
                        selectedOrder.status === 'pending' ? 'text-orange-400 bg-orange-400/10' :
                        'text-red-400 bg-red-400/10'
                      }`}>
                        {selectedOrder.status}
                      </div>
                    </div>

                    {/* Order Date */}
                    <div className="mb-4">
                      <span className="text-gray-400">Order Date:</span>
                      <span className="text-white ml-2">{formatDate(selectedOrder.date)}</span>
                    </div>

                    {/* Customer Information */}
                    <div className="bg-[#1e2139] rounded-lg p-4 border border-[#286db24c] mb-4">
                      <h5 className="text-white font-semibold mb-3">Customer Information</h5>
                      <div className="space-y-2">
                        <p className="text-gray-400">Name: <span className="text-white">{selectedOrder.customerName}</span></p>
                        <p className="text-gray-400">Email: <span className="text-white">{selectedOrder.customer}</span></p>
                        <p className="text-gray-400">Payment: <span className="text-green-400">{selectedOrder.paymentMethod}</span></p>
                      </div>
                    </div>

                    {/* Shipping Address */}
                    {selectedOrder.shippingAddress && (
                      <div className="bg-[#1e2139] rounded-lg p-4 border border-[#286db24c]">
                        <h5 className="text-white font-semibold mb-3">Shipping Address</h5>
                        <p className="text-white text-sm">{selectedOrder.shippingAddress}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Product & Store Details */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-white font-semibold mb-4">Product & Store Details</h4>

                    {/* Store Information */}
                    <div className="bg-[#1e2139] rounded-lg p-4 border border-[#286db24c] mb-4">
                      <h5 className="text-white font-semibold mb-3">Store Information</h5>
                      <div className="space-y-2">
                        <p className="text-gray-400">Store: <span className="text-white">{selectedOrder.store}</span></p>
                        <p className="text-gray-400">Type: <span className="text-blue-400 capitalize">{selectedOrder.storeType}</span></p>
                      </div>
                    </div>

                    {/* Product Information */}
                    <div className="bg-[#1e2139] rounded-lg p-4 border border-[#286db24c] mb-4">
                      <h5 className="text-white font-semibold mb-3">Product Information</h5>
                      <div className="space-y-2">
                        <p className="text-gray-400">Product: <span className="text-white">{selectedOrder.product}</span></p>
                        <p className="text-gray-400">Quantity: <span className="text-white">{selectedOrder.quantity}</span></p>
                      </div>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-[#1e2139] rounded-lg p-4 border border-[#286db24c] mb-4">
                      <h5 className="text-white font-semibold mb-3">Order Summary</h5>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Subtotal:</span>
                          <span className="text-white">{selectedOrder.total} FNKT</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Shipping:</span>
                          <span className="text-white">€{selectedOrder.shipping}</span>
                        </div>
                        <hr className="border-gray-600 my-2" />
                        <div className="flex justify-between font-semibold">
                          <span className="text-gray-300">Total:</span>
                          <span className="text-green-400">{selectedOrder.total} FNKT + €{selectedOrder.shipping}</span>
                        </div>
                      </div>
                    </div>

                    {/* Tracking Information */}
                    {selectedOrder.trackingNumber && (
                      <div className="bg-[#1e2139] rounded-lg p-4 border border-[#286db24c] mb-4">
                        <h5 className="text-white font-semibold mb-3">Tracking Information</h5>
                        <div className="space-y-2">
                          <p className="text-gray-400">Tracking Number: <span className="text-blue-400">{selectedOrder.trackingNumber}</span></p>
                          <p className="text-gray-400">Carrier: <span className="text-white">Standard Shipping</span></p>
                        </div>
                      </div>
                    )}

                    {/* Order Notes */}
                    {selectedOrder.notes && (
                      <div className="bg-[#1e2139] rounded-lg p-4 border border-[#286db24c]">
                        <h5 className="text-white font-semibold mb-3">Order Notes</h5>
                        <p className="text-gray-300 text-sm">{selectedOrder.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Action Confirmation Modal */}
      {showActionModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl max-w-md w-full">
            <div className="p-6 border-b border-[#286db24c]">
              <div className="flex items-center gap-3">
                <FaShieldAlt className="text-yellow-400 text-xl" />
                <div>
                  <h3 className="text-white text-xl font-bold">Confirm Action</h3>
                  <p className="text-gray-400 text-sm">This action requires confirmation</p>
                </div>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="bg-gray-800/50 rounded-lg p-4">
                <h4 className="text-white font-semibold mb-2">
                  {selectedStore ? selectedStore.name : selectedProduct ? selectedProduct.name : 'Unknown'}
                </h4>
                <p className="text-gray-400 text-sm">
                  {actionType === 'approve_store' && 'Approve this store application?'}
                  {actionType === 'reject_store' && 'Reject this store application?'}
                  {actionType === 'suspend_store' && 'Suspend this store?'}
                  {actionType === 'activate_store' && 'Activate this store?'}
                  {actionType === 'suspend_product' && 'Suspend this product?'}
                  {actionType === 'activate_product' && 'Activate this product?'}
                  {actionType === 'delete_product' && 'Delete this product permanently?'}
                </p>
              </div>
              <div className="flex gap-4 pt-4">
                <button
                  onClick={executeAction}
                  className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                    actionType.includes('approve') || actionType.includes('activate')
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-red-600 hover:bg-red-700 text-white'
                  }`}
                >
                  {actionType.includes('approve') || actionType.includes('activate') ? <FaCheck /> : <FaTimes />}
                  Confirm
                </button>
                <button
                  onClick={() => setShowActionModal(false)}
                  className="px-6 py-3 border border-gray-600 text-gray-400 rounded-lg hover:border-gray-500 hover:text-white transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminStore;