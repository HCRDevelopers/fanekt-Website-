import React from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';

function ClaimConfirmationModal({ isOpen, claimData, onClose, onConfirm }) {
  if (!isOpen) return null;

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
        className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl max-w-md w-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-white text-xl font-bold mb-4">Confirm Item Claim</h3>
        <p className="text-gray-400 text-sm mb-6">
          Are you sure you want to claim this X-KRYPTED item? This will link it to your account.
        </p>

        <div className="space-y-4">
          <div className="bg-[#1e2139] rounded-lg p-4 border border-[#286db24c]">
            <p className="text-white font-semibold">{claimData.itemName}</p>
            <p className="text-gray-400 text-sm">UID: {claimData.uid}</p>
            <p className="text-gray-400 text-sm capitalize">Type: {claimData.itemType}</p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={onConfirm}
              className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
            >
              <FaCheckCircle />
              Confirm Claim
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 border border-gray-600 text-gray-400 rounded-lg hover:border-gray-500 hover:text-white transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default ClaimConfirmationModal;