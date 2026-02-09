import React from 'react';
import { motion } from 'framer-motion';
import { FaInfoCircle, FaCoins, FaTruck, FaStar, FaCheckCircle, FaExclamationTriangle, FaShoppingCart, FaCrown, FaStar as FaStarOutline, FaStore } from 'react-icons/fa';

function ProductDetailsModal({
  isOpen,
  product,
  onClose,
  onAddToCart
}) {
  if (!isOpen || !product) return null;

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
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
            <h3 className="text-white text-2xl font-bold">{product.name}</h3>
            <button
              onClick={onClose}
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
                {product.image}
              </div>

              {/* Store Info */}
              <div className="bg-[#1e2139] rounded-lg p-4 border border-[#286db24c]">
                <div className="flex items-center gap-3 mb-3">
                  {getStoreTypeIcon(product.storeType)}
                  <div>
                    <h4 className="text-white font-semibold">{product.storeName}</h4>
                    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${getStoreTypeColor(product.storeType)}`}>
                      {product.storeType === 'global' ? 'Official Store' :
                       product.storeType === 'pro' ? 'Verified PRO' : 'Brand Partner'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <p className="text-gray-300 text-lg mb-4">{product.description}</p>

                {/* Rating */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <FaStar className="text-yellow-400" />
                    <span className="text-yellow-400 font-semibold">{product.rating}</span>
                  </div>
                  <span className="text-gray-400">({product.reviews} reviews)</span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <FaCoins className="text-green-400 text-xl" />
                    <span className="text-green-400 text-3xl font-bold">{product.price}</span>
                    <span className="text-gray-400">FNKT</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaTruck className="text-blue-400 text-xl" />
                    <span className="text-blue-400 text-xl font-bold">€{product.shippingCost.toFixed(2)}</span>
                    <span className="text-gray-400 text-sm">shipping</span>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="text-white font-semibold mb-3">Features</h4>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-gray-300">
                        <FaCheckCircle className="text-green-400 text-sm flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Stock Status */}
                <div className="flex items-center gap-2 mb-6">
                  {product.inStock ? (
                    <>
                      <FaCheckCircle className="text-green-400" />
                      <span className="text-green-400 font-medium">In Stock</span>
                    </>
                  ) : (
                    <>
                      <FaExclamationTriangle className="text-red-400" />
                      <span className="text-red-400 font-medium">Out of Stock</span>
                    </>
                  )}
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() => {
                    if (product.inStock) {
                      onAddToCart(product);
                      onClose();
                    }
                  }}
                  disabled={!product.inStock}
                  className="w-full bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] text-white py-4 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <FaShoppingCart />
                  {product.inStock ? `Add to Cart - ${product.price} FNKT` : 'Out of Stock'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default ProductDetailsModal;