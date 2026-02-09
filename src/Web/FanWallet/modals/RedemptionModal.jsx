import React from "react";
import { motion } from "framer-motion";
import {
  FaTimes,
  FaInfoCircle
} from "react-icons/fa";

const RedemptionModal = ({ reward, onClose, onConfirm, isProcessing }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      className="bg-[#1e2139] rounded-2xl border border-[#286db24c] shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white text-2xl font-bold">Confirm Redemption</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <FaTimes />
          </button>
        </div>

        {/* Reward Image and Details */}
        <div className="flex items-start gap-4 mb-6">
          <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
            <img
              src={reward.image}
              alt={reward.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = '/api/placeholder/100/100';
              }}
            />
          </div>
          <div className="flex-1">
            <h4 className="text-white text-xl font-bold mb-2">{reward.name}</h4>
            <p className="text-gray-300 text-sm mb-3">{reward.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm">Sponsored by {reward.sponsor}</span>
              <span className={`text-xs px-2 py-1 rounded ${
                reward.availability === 'In Stock' ? 'bg-green-500/20 text-green-400' :
                reward.availability === 'Limited' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-blue-500/20 text-blue-400'
              }`}>
                {reward.availability}
              </span>
            </div>
          </div>
        </div>

        {/* Cost Breakdown */}
        <div className="bg-[#2a2d4a] rounded-xl p-4 mb-6">
          <h5 className="text-white font-semibold mb-3">Redemption Summary</h5>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Current Balance:</span>
              <span className="text-white">2,450 FNKT</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Redemption Cost:</span>
              <span className="text-red-400">-{reward.cost} FNKT</span>
            </div>
            <div className="border-t border-[#286db24c] pt-2 mt-2">
              <div className="flex justify-between">
                <span className="text-white font-semibold">Balance After:</span>
                <span className={`font-bold ${(2450 - reward.cost) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {(2450 - reward.cost).toLocaleString()} FNKT
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Important Notice */}
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-2">
            <FaInfoCircle className="text-yellow-400 mt-0.5 flex-shrink-0" />
            <div>
              <h5 className="text-yellow-400 font-semibold mb-1">Important Notice</h5>
              <p className="text-gray-300 text-sm">
                This redemption cannot be reversed. You will receive redemption details via email once confirmed.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 border border-[#286db24c] rounded-lg text-gray-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isProcessing}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
              isProcessing
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] text-white hover:shadow-lg'
            }`}
          >
            {isProcessing ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Processing...
              </div>
            ) : (
              'Confirm Redemption'
            )}
          </button>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

export default RedemptionModal;