import React from 'react';
import { motion } from 'framer-motion';
import { FaMobileAlt, FaCheckCircle, FaShieldAlt, FaTimes } from 'react-icons/fa';

function NFCTicketAccessModal({ isOpen, onClose, onSuccess }) {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center md:p-4 p-2"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl w-full max-w-lg mx-auto max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="md:p-6 p-2 border-b border-[#286db24c] flex-shrink-0">
          <h3 className="text-white text-xl font-bold text-center">NFC Event Access</h3>
        </div>

        <div className="md:p-6 p-2 text-center space-y-6 overflow-y-auto flex-1">
          {/* NFC Animation */}
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-20 h-20 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto border-2 border-blue-400"
          >
            <FaMobileAlt className="text-blue-400 text-3xl" />
          </motion.div>

          <div>
            <h4 className="text-white text-lg font-semibold mb-2">Quick Event Entry</h4>
            <p className="text-gray-300 text-sm mb-4">
              Security can tap your X-KRYPTED item to instantly access your tickets without you logging in.
            </p>
          </div>

          {/* Process Steps */}
          <div className="bg-[#1e2139] rounded-lg p-4 border border-[#286db24c] text-left">
            <h5 className="text-white font-semibold mb-3">Access Process:</h5>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">1</div>
                <p className="text-gray-300">Security taps your X-KRYPTED item with NFC-enabled phone</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                <p className="text-gray-300">System identifies your account and displays available tickets</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">3</div>
                <p className="text-gray-300">Security selects the correct ticket and verifies attendee photo</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">4</div>
                <p className="text-gray-300">Access granted - no login or app required!</p>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-600/10 border border-green-400/30 rounded-lg p-4">
              <FaCheckCircle className="text-green-400 text-xl mx-auto mb-2" />
              <h6 className="text-green-400 font-semibold text-sm">No Login Required</h6>
              <p className="text-green-300 text-xs">Access tickets instantly</p>
            </div>
            <div className="bg-blue-600/10 border border-blue-400/30 rounded-lg p-4">
              <FaShieldAlt className="text-blue-400 text-xl mx-auto mb-2" />
              <h6 className="text-blue-400 font-semibold text-sm">Secure Verification</h6>
              <p className="text-blue-300 text-xs">Photo ID confirmation</p>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => {
                onClose();
                onSuccess('NFC access demo completed!');
              }}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
            >
              Got It
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 border border-gray-600 text-gray-400 rounded-lg hover:border-gray-500 hover:text-white transition-all duration-300"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default NFCTicketAccessModal;