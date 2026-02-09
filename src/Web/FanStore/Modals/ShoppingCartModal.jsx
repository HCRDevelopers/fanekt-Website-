import React from 'react';
import { motion } from 'framer-motion';
import { FaInfoCircle, FaCoins, FaTruck, FaMinus, FaPlus, FaTrash, FaCreditCard } from 'react-icons/fa';

function ShoppingCartModal({
  isOpen,
  cart,
  currentBalance,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}) {
  if (!isOpen) return null;

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalShipping = () => {
    return cart.reduce((total, item) => total + (item.shippingCost * item.quantity), 0);
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
        className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-[#286db24c] flex-shrink-0">
          <div className="flex items-center justify-between">
            <h3 className="text-white text-2xl font-bold">Shopping Cart</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <FaInfoCircle className="text-white text-xl" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-4xl mx-auto mb-4">🛒</div>
              <h4 className="text-white font-semibold mb-2">Your cart is empty</h4>
              <p className="text-gray-400">Add some products to get started!</p>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 bg-[#1e2139] rounded-lg p-4 border border-[#286db24c]">
                    <div className="w-16 h-16 bg-[#2a2d4a] rounded-lg flex items-center justify-center text-2xl">
                      {item.image}
                    </div>

                    <div className="flex-1">
                      <h4 className="text-white font-semibold">{item.name}</h4>
                      <p className="text-gray-400 text-sm">{item.storeName}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <FaCoins className="text-green-400 text-sm" />
                        <span className="text-green-400 font-medium">{item.price} FNKT</span>
                        <span className="text-gray-400">•</span>
                        <FaTruck className="text-blue-400 text-sm" />
                        <span className="text-blue-400 text-sm">€{item.shippingCost.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="p-1 text-gray-400 hover:text-white transition-colors"
                      >
                        <FaMinus className="text-sm" />
                      </button>
                      <span className="text-white font-medium min-w-[2rem] text-center">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="p-1 text-gray-400 hover:text-white transition-colors"
                      >
                        <FaPlus className="text-sm" />
                      </button>
                    </div>

                    <div className="text-right">
                      <div className="text-green-400 font-bold">{(item.price * item.quantity)} FNKT</div>
                      <div className="text-blue-400 text-sm">€{(item.shippingCost * item.quantity).toFixed(2)}</div>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-red-400 hover:text-red-300 transition-colors mt-1"
                      >
                        <FaTrash className="text-sm" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="bg-[#1e2139] rounded-lg p-4 border border-[#286db24c] space-y-3">
                <h4 className="text-white font-semibold">Order Summary</h4>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Subtotal (FNKT):</span>
                    <span className="text-white">{getTotalPrice()} FNKT</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Shipping (EUR):</span>
                    <span className="text-blue-400">€{getTotalShipping().toFixed(2)}</span>
                  </div>
                  <hr className="border-[#286db24c]" />
                  <div className="flex justify-between text-lg font-semibold">
                    <span className="text-white">Total:</span>
                    <div>
                      <div className="text-green-400">{getTotalPrice()} FNKT</div>
                      <div className="text-blue-400 text-sm">+ €{getTotalShipping().toFixed(2)} shipping</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Balance Check */}
              <div className="bg-green-600/20 border border-green-400/30 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-400 font-medium">Current Balance</p>
                    <p className="text-green-300 text-sm">Available FNKT points</p>
                  </div>
                  <div className="text-right">
                    <div className="text-green-400 font-bold text-lg">{currentBalance.toLocaleString()} FNKT</div>
                    {getTotalPrice() > currentBalance && (
                      <div className="text-red-400 text-sm font-medium">Insufficient balance!</div>
                    )}
                  </div>
                </div>
              </div>

              {/* Shipping Notice */}
              <div className="bg-blue-600/20 border border-blue-400/30 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <FaInfoCircle className="text-blue-400 text-lg mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-blue-400 font-medium mb-1">Shipping Policy</p>
                    <p className="text-blue-300 text-sm">
                      Products are paid in FNKT points. Shipping costs are charged separately in EUR and will be collected during delivery.
                    </p>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <div className="flex gap-4">
                <button
                  onClick={() => onCheckout(getTotalPrice(), getTotalShipping())}
                  disabled={getTotalPrice() > currentBalance}
                  className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <FaCreditCard />
                  Checkout ({getTotalPrice()} FNKT)
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-3 border border-gray-600 text-gray-400 rounded-lg hover:border-gray-500 hover:text-white transition-all duration-300"
                >
                  Continue Shopping
                </button>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default ShoppingCartModal;