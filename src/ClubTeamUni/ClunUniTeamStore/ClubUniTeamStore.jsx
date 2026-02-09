import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaStore,
  FaPlus,
  FaEdit,
  FaTrash,
  FaChartLine,
  FaShoppingCart,
  FaEye,
  FaCog,
  FaUpload,
  FaSave,
  FaCheckCircle,
  FaInfoCircle,
  FaExclamationTriangle,
  FaCrown,
  FaCoins,
  FaStar,
  FaBox,
  FaUsers,
  FaCalendar,
  FaEuroSign,
  FaTshirt,
  FaFutbol,
  FaMugHot,
  FaGift,
  FaSearch,
  FaFilter
} from 'react-icons/fa';

// Static data only - no API calls

function ClubUniTeamStore() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [storeData, setStoreData] = useState({
    name: 'FC Barcelona Official Store',
    description: 'Official merchandise from FC Barcelona - Camp Nou',
    type: 'club',
    isActive: true,
    totalSales: 15420,
    totalOrders: 387,
    totalProducts: 24,
    monthlyRevenue: 2850,
    storeRating: 4.8,
    verificationStatus: 'verified'
  });

  // Mock products for this store
  const [storeProducts, setStoreProducts] = useState([
    {
      id: 1,
      name: 'Barcelona Home Jersey 2024',
      price: 89,
      category: 'clothing',
      stock: 45,
      sold: 156,
      status: 'active',
      image: '⚽',
      description: 'Official Barcelona FC home jersey with sponsor logos'
    },
    {
      id: 2,
      name: 'Messi Tribute Scarf',
      price: 35,
      category: 'accessories',
      stock: 120,
      sold: 89,
      status: 'active',
      image: '🧣',
      description: 'Commemorative scarf honoring Lionel Messi'
    },
    {
      id: 3,
      name: 'Training Kit',
      price: 65,
      category: 'sports',
      stock: 23,
      sold: 67,
      status: 'active',
      image: '🏃',
      description: 'Complete training set with shorts and jersey'
    },
    {
      id: 4,
      name: 'Camp Nou Mug',
      price: 18,
      category: 'accessories',
      stock: 0,
      sold: 234,
      status: 'out_of_stock',
      image: '☕',
      description: 'Ceramic mug with Camp Nou stadium artwork'
    }
  ]);

  // Mock orders
  const [recentOrders, setRecentOrders] = useState([
    {
      id: 'ORD-001',
      customer: 'john.doe@fanekt.com',
      product: 'Barcelona Home Jersey 2024',
      quantity: 1,
      total: 89,
      status: 'completed',
      date: '2024-01-20T14:30:00Z'
    },
    {
      id: 'ORD-002',
      customer: 'maria.garcia@fanekt.com',
      product: 'Messi Tribute Scarf',
      quantity: 2,
      total: 70,
      status: 'processing',
      date: '2024-01-19T16:45:00Z'
    },
    {
      id: 'ORD-003',
      customer: 'carlos.lopez@fanekt.com',
      product: 'Camp Nou Mug',
      quantity: 1,
      total: 18,
      status: 'shipped',
      date: '2024-01-18T11:20:00Z'
    }
  ]);

  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showProductDetailsModal, setShowProductDetailsModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: 'clothing',
    stock: '',
    image: ''
  });

  // Notification popup state
  const [notification, setNotification] = useState({
    show: false,
    message: '',
    type: 'success'
  });



  // Show notification popup
  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: 'success' });
    }, 3000);
  };

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.stock) {
      showNotification('Please fill in all required fields', 'error');
      return;
    }

    const product = {
      id: Date.now(),
      ...newProduct,
      sold: 0,
      status: 'active'
    };

    setStoreProducts(prev => [...prev, product]);
    setNewProduct({
      name: '',
      description: '',
      price: '',
      category: 'clothing',
      stock: '',
      image: ''
    });
    setShowAddProductModal(false);
    showNotification('Product added successfully!', 'success');
  };

  const updateProductStatus = (productId, status) => {
    setStoreProducts(prev => prev.map(product =>
      product.id === productId ? { ...product, status } : product
    ));
    showNotification(`Product ${status === 'active' ? 'activated' : 'deactivated'}`, 'success');
  };

  const deleteProduct = (productId) => {
    setStoreProducts(prev => prev.filter(product => product.id !== productId));
    showNotification('Product deleted successfully', 'success');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-400/10';
      case 'inactive': return 'text-gray-400 bg-gray-400/10';
      case 'out_of_stock': return 'text-red-400 bg-red-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getOrderStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-400 bg-green-400/10';
      case 'processing': return 'text-blue-400 bg-blue-400/10';
      case 'shipped': return 'text-yellow-400 bg-yellow-400/10';
      case 'cancelled': return 'text-red-400 bg-red-400/10';
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

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'clothing': return '👕';
      case 'sports': return '⚽';
      case 'accessories': return '🏷️';
      default: return '📦';
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
        <div className="flex items-start md:gap-4 gap-2 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
            <FaCrown className="text-white text-2xl" />
          </div>
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
              {storeData.name}
            </h1>
            <div className="flex items-center flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <FaStar className="text-yellow-400" />
                <span className="text-yellow-400 font-semibold">{storeData.storeRating}</span>
                <span className="text-gray-400">store rating</span>
              </div>
              <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
                storeData.verificationStatus === 'verified'
                  ? 'bg-green-600/20 text-green-400 border border-green-400/30'
                  : 'bg-yellow-600/20 text-yellow-400 border border-yellow-400/30'
              }`}>
                <FaCheckCircle />
                {storeData.verificationStatus === 'verified' ? 'Verified PRO Store' : 'Pending Verification'}
              </div>
            </div>
          </div>
        </div>
        <p className="text-gray-400 text-lg">{storeData.description}</p>
      </motion.div>

      {/* Notification Popup */}
      {notification.show && (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50"
        >
          <div className={`px-6 py-3 rounded-lg shadow-2xl border-2 backdrop-blur-sm ${
            notification.type === 'success'
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

      {/* Store Stats Cards */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 border border-green-400/30 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-400 text-sm font-medium">Total Sales</p>
              <p className="text-white text-2xl font-bold">{storeData.totalSales.toLocaleString()}</p>
              <p className="text-green-400 text-sm">FNKT earned</p>
            </div>
            <FaCoins className="text-green-400 text-3xl" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-blue-400/30 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-400 text-sm font-medium">Total Orders</p>
              <p className="text-white text-2xl font-bold">{storeData.totalOrders}</p>
              <p className="text-blue-400 text-sm">this month</p>
            </div>
            <FaShoppingCart className="text-blue-400 text-3xl" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-400/30 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-400 text-sm font-medium">Active Products</p>
              <p className="text-white text-2xl font-bold">{storeData.totalProducts}</p>
              <p className="text-purple-400 text-sm">in store</p>
            </div>
            <FaBox className="text-purple-400 text-3xl" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-600/20 to-red-600/20 border border-orange-400/30 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-400 text-sm font-medium">Monthly Revenue</p>
              <p className="text-white text-2xl font-bold">{storeData.monthlyRevenue.toLocaleString()}</p>
              <p className="text-orange-400 text-sm">FNKT this month</p>
            </div>
            <FaChartLine className="text-orange-400 text-3xl" />
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
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-1 bg-[#1e2139] p-1 rounded-xl border border-[#286db24c]">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
              activeTab === 'dashboard'
                ? 'bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] text-white shadow-lg'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <FaChartLine className="inline mr-2" />
            Dashboard
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
            onClick={() => setActiveTab('settings')}
            className={`py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
              activeTab === 'settings'
                ? 'bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] text-white shadow-lg'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <FaCog className="inline mr-2" />
            Settings
          </button>
        </div>
      </motion.div>

      {/* Dashboard Tab */}
      {activeTab === 'dashboard' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {/* Store Performance */}
          <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl md:p-6 p-2">
            <h3 className="text-white text-xl font-bold mb-4">Store Performance</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">{storeData.totalSales.toLocaleString()}</div>
                <p className="text-gray-400">Total FNKT Earned</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">{storeData.totalOrders}</div>
                <p className="text-gray-400">Orders This Month</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">{storeData.storeRating}</div>
                <p className="text-gray-400">Average Rating</p>
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl md:p-6 p-2">
            <h3 className="text-white text-xl font-bold mb-4">Recent Orders</h3>

            <div className="space-y-4">
              {recentOrders.slice(0, 5).map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex md:items-center md:flex-row flex-col justify-between bg-[#1e2139] rounded-lg p-4 border border-[#286db24c]"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#2a2d4a] rounded-lg flex items-center justify-center">
                      <FaShoppingCart className="text-blue-400" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">{order.product}</p>
                      <p className="text-gray-400 text-sm">{order.customer}</p>
                    </div>
                  </div>
                  <div className="text-right md:mt-0 mt-2">
                    <div className="flex items-center gap-2 mb-1">
                      <FaCoins className="text-green-400 text-sm" />
                      <span className="text-green-400 font-semibold">{order.total} FNKT</span>
                    </div>
                    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${getOrderStatusColor(order.status)}`}>
                      {order.status}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Products Tab */}
      {activeTab === 'products' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {/* Products Header */}
          <div className="flex justify-between items-center">
            <h3 className="text-white text-xl font-bold">Store Products</h3>
            <button
              onClick={() => setShowAddProductModal(true)}
              className="bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2"
            >
              <FaPlus />
              Add Product
            </button>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {storeProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl overflow-hidden"
              >
                {/* Product Image */}
                <div className="aspect-square bg-[#1e2139] flex items-center justify-center text-4xl">
                  {product.image}
                </div>

                {/* Product Info */}
                <div className="p-4 space-y-3">
                  <div>
                    <h4 className="text-white font-semibold text-lg mb-1">{product.name}</h4>
                    <p className="text-gray-400 text-sm line-clamp-2">{product.description}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FaCoins className="text-green-400" />
                      <span className="text-green-400 font-bold text-lg">{product.price}</span>
                      <span className="text-gray-400 text-sm">FNKT</span>
                    </div>
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${getStatusColor(product.status)}`}>
                      {product.status === 'active' ? 'Active' : product.status === 'out_of_stock' ? 'Out of Stock' : 'Inactive'}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-center">
                      <p className="text-gray-400">Stock</p>
                      <p className="text-white font-semibold">{product.stock}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-400">Sold</p>
                      <p className="text-white font-semibold">{product.sold}</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedProduct(product);
                        setShowProductDetailsModal(true);
                      }}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <FaEye />
                      View
                    </button>
                    <button
                      onClick={() => updateProductStatus(product.id, product.status === 'active' ? 'inactive' : 'active')}
                      className={`px-3 py-2 rounded-lg font-semibold transition-all duration-300 ${
                        product.status === 'active'
                          ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
                          : 'bg-green-600 hover:bg-green-700 text-white'
                      }`}
                    >
                      {product.status === 'active' ? 'Deactivate' : 'Activate'}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl p-6">
            <h3 className="text-white text-xl font-bold mb-4">Order Management</h3>
            <p className="text-gray-400">Manage customer orders and track fulfillment</p>
          </div>

          <div className="space-y-4">
            {recentOrders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl md:p-6 p-2"
              >
                <div className="flex md:items-center justify-between md:flex-row flex-col">
                  <div className="flex items-start md:gap-4 gap-2">
                    <div className="w-12 h-12 bg-[#286db24c] rounded-full flex items-center justify-center">
                      <FaShoppingCart className="text-blue-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-white font-semibold">Order #{order.id}</span>
                        <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${getOrderStatusColor(order.status)}`}>
                          {order.status}
                        </div>
                      </div>
                      <p className="text-gray-400">{order.customer}</p>
                      <p className="text-gray-300 text-sm">{order.product} (x{order.quantity})</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-2">
                      <FaCoins className="text-green-400 text-sm" />
                      <span className="text-green-400 font-bold text-lg">{order.total} FNKT</span>
                    </div>
                    <p className="text-gray-400 text-sm">{formatDate(order.date)}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl p-6">
            <h3 className="text-white text-xl font-bold mb-4">Store Settings</h3>
            <p className="text-gray-400">Configure your store settings and preferences</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl p-6">
              <h4 className="text-white font-semibold mb-4">Store Information</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-white font-medium mb-2">Store Name</label>
                  <input
                    type="text"
                    value={storeData.name}
                    onChange={(e) => setStoreData({...storeData, name: e.target.value})}
                    className="w-full bg-[#1e2139] text-white px-4 py-3 rounded-lg border border-[#286db24c] focus:outline-none focus:border-[#f64c68]"
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">Description</label>
                  <textarea
                    value={storeData.description}
                    onChange={(e) => setStoreData({...storeData, description: e.target.value})}
                    rows="3"
                    className="w-full bg-[#1e2139] text-white px-4 py-3 rounded-lg border border-[#286db24c] focus:outline-none focus:border-[#f64c68] resize-none"
                  />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl p-6">
              <h4 className="text-white font-semibold mb-4">Store Status</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-white">Store Active</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={storeData.isActive}
                      onChange={(e) => setStoreData({...storeData, isActive: e.target.checked})}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#f64c68]"></div>
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <FaCrown className="text-yellow-400" />
                  <span className="text-yellow-400">Verified PRO Account</span>
                </div>
                <div className="text-center pt-4">
                  <button className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2 mx-auto">
                    <FaSave />
                    Save Settings
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Add Product Modal */}
      {showAddProductModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowAddProductModal(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-[#286db24c] flex-shrink-0">
              <div className="flex items-center justify-between">
                <h3 className="text-white text-2xl font-bold">Add New Product</h3>
                <button
                  onClick={() => setShowAddProductModal(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <FaInfoCircle className="text-white text-xl" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6 overflow-y-auto flex-1">
              <div className="space-y-4">
                <div>
                  <label className="block text-white font-medium mb-2">
                    Product Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                    placeholder="Enter product name"
                    className="w-full bg-[#1e2139] text-white px-4 py-3 rounded-lg border border-[#286db24c] focus:outline-none focus:border-[#f64c68]"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">
                    Description <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                    placeholder="Product description"
                    rows="3"
                    className="w-full bg-[#1e2139] text-white px-4 py-3 rounded-lg border border-[#286db24c] focus:outline-none focus:border-[#f64c68] resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Price (FNKT) <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="number"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                      placeholder="0"
                      min="1"
                      className="w-full bg-[#1e2139] text-white px-4 py-3 rounded-lg border border-[#286db24c] focus:outline-none focus:border-[#f64c68]"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Stock <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="number"
                      value={newProduct.stock}
                      onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                      placeholder="0"
                      min="0"
                      className="w-full bg-[#1e2139] text-white px-4 py-3 rounded-lg border border-[#286db24c] focus:outline-none focus:border-[#f64c68]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">
                    Category <span className="text-red-400">*</span>
                  </label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                    className="w-full bg-[#1e2139] text-white px-4 py-3 rounded-lg border border-[#286db24c] focus:outline-none focus:border-[#f64c68]"
                  >
                    <option value="clothing">Clothing</option>
                    <option value="sports">Sports Gear</option>
                    <option value="accessories">Accessories</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">
                    Product Image
                  </label>
                  <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-[#f64c68] transition-colors cursor-pointer">
                    <FaUpload className="text-gray-400 text-3xl mx-auto mb-3" />
                    <p className="text-gray-400 mb-2">Click to upload image</p>
                    <p className="text-gray-500 text-sm">JPG, PNG up to 5MB</p>
                    <input type="file" accept="image/*" className="hidden" />
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleAddProduct}
                  className="flex-1 bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <FaPlus />
                  Add Product
                </button>
                <button
                  onClick={() => setShowAddProductModal(false)}
                  className="px-6 py-3 border border-gray-600 text-gray-400 rounded-lg hover:border-gray-500 hover:text-white transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Product Details Modal */}
      {showProductDetailsModal && selectedProduct && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowProductDetailsModal(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-[#286db24c] flex-shrink-0">
              <div className="flex items-center justify-between">
                <h3 className="text-white text-2xl font-bold">{selectedProduct.name}</h3>
                <button
                  onClick={() => setShowProductDetailsModal(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <FaInfoCircle className="text-white text-xl" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6 overflow-y-auto flex-1">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Product Image */}
                <div className="space-y-4">
                  <div className="aspect-square bg-[#1e2139] rounded-lg flex items-center justify-center text-8xl">
                    {selectedProduct.image}
                  </div>

                  {/* Product Stats */}
                  <div className="bg-[#1e2139] rounded-lg p-4 border border-[#286db24c]">
                    <h4 className="text-white font-semibold mb-3">Product Statistics</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-400">{selectedProduct.sold}</div>
                        <p className="text-gray-400 text-sm">Units Sold</p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-400">{selectedProduct.stock}</div>
                        <p className="text-gray-400 text-sm">In Stock</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Product Details */}
                <div className="space-y-6">
                  <div>
                    <p className="text-gray-300 text-lg mb-4">{selectedProduct.description}</p>

                    {/* Price & Status */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <FaCoins className="text-green-400 text-xl" />
                        <span className="text-green-400 text-3xl font-bold">{selectedProduct.price}</span>
                        <span className="text-gray-400">FNKT</span>
                      </div>
                      <div className={`flex items-center gap-1 px-3 py-2 rounded-full text-sm ${getStatusColor(selectedProduct.status)}`}>
                        {selectedProduct.status === 'active' ? 'Active' : selectedProduct.status === 'out_of_stock' ? 'Out of Stock' : 'Inactive'}
                      </div>
                    </div>

                    {/* Category */}
                    <div className="mb-4">
                      <span className="text-gray-400">Category:</span>
                      <span className="text-white ml-2 capitalize">{selectedProduct.category}</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4">
                      <button
                        onClick={() => {
                          updateProductStatus(selectedProduct.id, selectedProduct.status === 'active' ? 'inactive' : 'active');
                          setShowProductDetailsModal(false);
                        }}
                        className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                          selectedProduct.status === 'active'
                            ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
                            : 'bg-green-600 hover:bg-green-700 text-white'
                        }`}
                      >
                        {selectedProduct.status === 'active' ? 'Deactivate Product' : 'Activate Product'}
                      </button>
                      <button
                        onClick={() => {
                          deleteProduct(selectedProduct.id);
                          setShowProductDetailsModal(false);
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
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

export default ClubUniTeamStore;

