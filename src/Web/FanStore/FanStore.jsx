import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FaShoppingCart,
  FaSearch,
  FaFilter,
  FaCoins,
  FaTruck,
  FaStar,
  FaHeart,
  FaShoppingBag,
  FaCreditCard,
  FaMapMarkerAlt,
  FaCrown,
  FaTshirt,
  FaFutbol,
  FaStore,
  FaPlus,
  FaMinus,
  FaTrash,
  FaCheckCircle,
  FaInfoCircle,
  FaExclamationTriangle
} from 'react-icons/fa';

// Import API service
import { getProfile } from '../../API/apiService';

// Import Modal Components
import ShoppingCartModal from './Modals/ShoppingCartModal';
import ProductDetailsModal from './Modals/ProductDetailsModal';

function FanStore() {
  const [activeTab, setActiveTab] = useState('browse');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStore, setSelectedStore] = useState('all');
  const [cart, setCart] = useState([]);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [showCartModal, setShowCartModal] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Notification popup state
  const [notification, setNotification] = useState({
    show: false,
    message: '',
    type: 'success' // 'success' or 'error'
  });

  // Mock products data
  const mockProducts = [
    // Global FANEKT Store
    {
      id: 1,
      name: 'X-KRYPTED SmartPatch',
      description: 'NFC-enabled smart patch for event access and digital experiences',
      price: 25,
      image: '🏷️',
      category: 'accessories',
      store: 'fanekt',
      storeName: 'FANEKT Official',
      storeType: 'global',
      rating: 4.8,
      reviews: 1247,
      inStock: true,
      shippingCost: 5.99,
      features: ['NFC enabled', 'Event access', 'Digital wallet', 'Weather resistant']
    },
    {
      id: 2,
      name: 'FNKT NFC T-Shirt',
      description: 'Comfortable cotton t-shirt with integrated NFC technology',
      price: 35,
      image: '👕',
      category: 'clothing',
      store: 'fanekt',
      storeName: 'FANEKT Official',
      storeType: 'global',
      rating: 4.6,
      reviews: 892,
      inStock: true,
      shippingCost: 7.99,
      features: ['Cotton blend', 'NFC integrated', 'Comfort fit', 'Machine washable']
    },
    {
      id: 3,
      name: 'Barcelona FC Home Jersey',
      description: 'Official Barcelona FC home jersey with X-KRYPTED NFC patch',
      price: 89,
      image: '⚽',
      category: 'clothing',
      store: 'barcelona',
      storeName: 'FC Barcelona Official',
      storeType: 'pro',
      rating: 4.9,
      reviews: 2156,
      inStock: true,
      shippingCost: 9.99,
      features: ['Official licensed', 'NFC enabled', 'Premium quality', 'Fan exclusive']
    },
    {
      id: 4,
      name: 'Real Madrid Training Kit',
      description: 'Complete training kit with shorts and NFC-enabled jersey',
      price: 120,
      image: '🏃',
      category: 'sports',
      store: 'realmadrid',
      storeName: 'Real Madrid CF',
      storeType: 'pro',
      rating: 4.7,
      reviews: 1834,
      inStock: true,
      shippingCost: 12.99,
      features: ['Training quality', 'NFC integrated', 'Moisture wicking', 'Club colors']
    },
    {
      id: 5,
      name: 'PSG Champions League Scarf',
      description: 'Luxury scarf celebrating PSG Champions League victories',
      price: 45,
      image: '🧣',
      category: 'accessories',
      store: 'psg',
      storeName: 'Paris Saint-Germain',
      storeType: 'pro',
      rating: 4.5,
      reviews: 967,
      inStock: true,
      shippingCost: 6.99,
      features: ['Luxury fabric', 'Champions design', 'Club licensed', 'Winter essential']
    },
    {
      id: 6,
      name: 'Manchester United Mug',
      description: 'Ceramic mug with Manchester United crest and NFC chip',
      price: 18,
      image: '☕',
      category: 'accessories',
      store: 'manutd',
      storeName: 'Manchester United',
      storeType: 'pro',
      rating: 4.3,
      reviews: 743,
      inStock: true,
      shippingCost: 4.99,
      features: ['Ceramic material', 'NFC enabled', 'Club crest', '11oz capacity']
    },
    {
      id: 7,
      name: 'Nike x FANEKT Limited Edition',
      description: 'Exclusive collaboration sneakers with integrated NFC technology',
      price: 199,
      image: '👟',
      category: 'shoes',
      store: 'nike',
      storeName: 'Nike Official',
      storeType: 'sponsor',
      rating: 4.9,
      reviews: 3241,
      inStock: false,
      shippingCost: 15.99,
      features: ['Limited edition', 'NFC integrated', 'Premium materials', 'Athletic performance']
    },
    {
      id: 8,
      name: 'Adidas FANEKT Backpack',
      description: 'Stylish backpack with multiple compartments and NFC wallet',
      price: 65,
      image: '🎒',
      category: 'accessories',
      store: 'adidas',
      storeName: 'Adidas Official',
      storeType: 'sponsor',
      rating: 4.4,
      reviews: 1589,
      inStock: true,
      shippingCost: 8.99,
      features: ['Multiple compartments', 'NFC wallet', 'Water resistant', 'School ready']
    }
  ];

  const [products, setProducts] = useState(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);

  // Categories
  const categories = [
    { id: 'all', name: 'All Products', icon: '🛍️' },
    { id: 'clothing', name: 'Clothing', icon: '👕' },
    { id: 'sports', name: 'Sports Gear', icon: '⚽' },
    { id: 'accessories', name: 'Accessories', icon: '🏷️' },
    { id: 'shoes', name: 'Footwear', icon: '👟' }
  ];

  // Store types
  const storeTypes = [
    { id: 'all', name: 'All Stores', icon: '🏪' },
    { id: 'global', name: 'FANEKT Official', icon: '⭐' },
    { id: 'pro', name: 'PRO Clubs & Athletes', icon: '👑' },
    { id: 'sponsor', name: 'Brand Partners', icon: '🤝' }
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
        } else {
          setCurrentBalance(1250);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        setCurrentBalance(1250);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Filter products based on search and category
  useEffect(() => {
    let filtered = products;

    // Filter by search query
    if (searchQuery.length >= 2) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.storeName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by store type
    if (selectedStore !== 'all') {
      filtered = filtered.filter(product => product.storeType === selectedStore);
    }

    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory, selectedStore, products]);

  // Show notification popup
  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: 'success' });
    }, 3000);
  };

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }

    showNotification(`${product.name} added to cart!`, 'success');
  };

  const updateCartQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart(cart.map(item =>
      item.id === productId
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
    showNotification('Item removed from cart', 'success');
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalShipping = () => {
    return cart.reduce((total, item) => total + (item.shippingCost * item.quantity), 0);
  };

  const getCartTotal = () => {
    return getTotalPrice() + getTotalShipping();
  };

  const handleCheckout = () => {
    const totalFNKT = getTotalPrice();
    const totalShipping = getTotalShipping();

    if (totalFNKT > currentBalance) {
      showNotification('Insufficient FNKT balance for this purchase!', 'error');
      return;
    }

    // Mock checkout process
    setCurrentBalance(prev => prev - totalFNKT);
    setCart([]);
    setShowCartModal(false);
    showNotification(`Purchase successful! ${totalFNKT} FNKT deducted. Shipping: €${totalShipping.toFixed(2)}`, 'success');
  };

  const getStoreTypeIcon = (type) => {
    switch (type) {
      case 'global': return <FaStar className="text-yellow-400" />;
      case 'pro': return <FaCrown className="text-yellow-400" />;
      case 'sponsor': return <FaStore className="text-blue-400" />;
      default: return <FaStore className="text-gray-400" />;
    }
  };

  const getStoreTypeColor = (type) => {
    switch (type) {
      case 'global': return 'text-yellow-400 bg-yellow-400/10';
      case 'pro': return 'text-yellow-400 bg-yellow-400/10';
      case 'sponsor': return 'text-blue-400 bg-blue-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
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
          FANEKT Store
        </h1>
        <p className="text-gray-400 text-lg">
          Discover exclusive products from FANEKT and verified PRO accounts. Pay with FNKT points - shipping charged separately in EUR.
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
          <div className={`md:px-6 px-2 py-3 rounded-lg shadow-2xl border-2 backdrop-blur-sm ${
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

      {/* Balance & Cart Header */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex justify-between items-start sm:items-center gap-4 mb-6"
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-green-600/20 border border-green-400/30 rounded-lg px-4 py-3">
            <FaCoins className="text-green-400" />
            <span className="text-green-400 font-semibold">{currentBalance.toLocaleString()} FNKT</span>
          </div>
        </div>

        <button
          onClick={() => setShowCartModal(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
        >
          <FaShoppingCart />
          Cart ({cart.length})
        </button>
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
            onClick={() => setActiveTab('browse')}
            className={`py-3 md:px-4 px-2 rounded-lg font-semibold transition-all duration-300 sm:text-lg text-sm ${
              activeTab === 'browse'
                ? 'bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] text-white shadow-lg'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <FaShoppingBag className="inline mr-2" />
            Browse Store
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-3 md:px-4 px-2 rounded-lg font-semibold transition-all duration-300 sm:text-lg text-sm ${
              activeTab === 'orders'
                ? 'bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] text-white shadow-lg'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <FaCreditCard className="inline mr-2" />
            My Orders
          </button>
        </div>
      </motion.div>

      {/* Browse Tab */}
      {activeTab === 'browse' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {/* Search and Filters */}
          <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl md:p-6 p-2">
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              {/* Search */}
              <div className="flex-1 relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products, stores, or brands..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#1e2139] text-white pl-10 pr-4 py-3 rounded-lg border border-[#286db24c] focus:outline-none focus:border-[#f64c68]"
                />
              </div>

              {/* Category Filter */}
              <div className="relative">
                <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-[#1e2139] text-white pl-10 pr-4 py-3 rounded-lg border border-[#286db24c] focus:outline-none focus:border-[#f64c68] min-w-[150px]"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.icon} {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Store Type Filters */}
            <div className="flex flex-wrap gap-2">
              {storeTypes.map(storeType => (
                <button
                  key={storeType.id}
                  onClick={() => setSelectedStore(storeType.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-300 ${
                    selectedStore === storeType.id
                      ? 'border-[#f64c68] bg-[#f64c68]/20 text-white'
                      : 'border-[#286db24c] bg-[#1e2139] text-gray-400 hover:border-[#f64c68] hover:text-white'
                  }`}
                >
                  <span className="text-lg">{storeType.icon}</span>
                  {storeType.name}
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl overflow-hidden hover:border-[#f64c68] transition-all duration-300 cursor-pointer group"
                onClick={() => {
                  setSelectedProduct(product);
                  setShowProductModal(true);
                }}
              >
                {/* Product Image */}
                <div className="aspect-square bg-[#1e2139] flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-300">
                  {product.image}
                </div>

                {/* Product Info */}
                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="text-white font-semibold text-lg mb-1 line-clamp-2">{product.name}</h3>
                    <p className="text-gray-400 text-sm line-clamp-2">{product.description}</p>
                  </div>

                  {/* Store Badge */}
                  <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${getStoreTypeColor(product.storeType)}`}>
                    {getStoreTypeIcon(product.storeType)}
                    <span>{product.storeName}</span>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <FaStar className="text-yellow-400 text-sm" />
                      <span className="text-yellow-400 text-sm font-medium">{product.rating}</span>
                    </div>
                    <span className="text-gray-400 text-sm">({product.reviews} reviews)</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FaCoins className="text-green-400" />
                      <span className="text-green-400 font-bold text-lg">{product.price}</span>
                      <span className="text-gray-400 text-sm">FNKT</span>
                    </div>

                    {!product.inStock && (
                      <span className="text-red-400 text-sm font-medium">Out of Stock</span>
                    )}
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (product.inStock) {
                        addToCart(product);
                      }
                    }}
                    disabled={!product.inStock}
                    className="w-full bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] text-white py-2 px-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <FaPlus />
                    {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <FaShoppingBag className="text-gray-400 text-4xl mx-auto mb-4" />
              <h4 className="text-white font-semibold mb-2">No products found</h4>
              <p className="text-gray-400">Try adjusting your search or filters</p>
            </div>
          )}
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
            <h3 className="text-white text-xl font-bold mb-4">My Orders</h3>
            <p className="text-gray-400">Track your FANEKT store orders and purchases</p>
          </div>

          <div className="text-center py-12">
            <FaCreditCard className="text-gray-400 text-4xl mx-auto mb-4" />
            <h4 className="text-white font-semibold mb-2">Order History Coming Soon</h4>
            <p className="text-gray-400">Your purchase history will appear here</p>
          </div>
        </motion.div>
      )}

      {/* Modal Components */}
      <ShoppingCartModal
        isOpen={showCartModal}
        cart={cart}
        currentBalance={currentBalance}
        onClose={() => setShowCartModal(false)}
        onUpdateQuantity={updateCartQuantity}
        onRemoveItem={removeFromCart}
        onCheckout={(totalFNKT, totalShipping) => {
          if (totalFNKT > currentBalance) {
            showNotification('Insufficient FNKT balance for this purchase!', 'error');
            return;
          }
          // Mock checkout process
          setCurrentBalance(prev => prev - totalFNKT);
          setCart([]);
          setShowCartModal(false);
          showNotification(`Purchase successful! ${totalFNKT} FNKT deducted. Shipping: €${totalShipping.toFixed(2)}`, 'success');
        }}
      />

      <ProductDetailsModal
        isOpen={showProductModal}
        product={selectedProduct}
        onClose={() => setShowProductModal(false)}
        onAddToCart={(product) => {
          addToCart(product);
          setShowProductModal(false);
        }}
      />
    </div>
  );
}

export default FanStore;

