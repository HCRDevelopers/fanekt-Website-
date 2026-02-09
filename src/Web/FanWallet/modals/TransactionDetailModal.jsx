import React from "react";
import { motion } from "framer-motion";
import {
  FaTimes,
  FaCheckCircle,
  FaInfoCircle
} from "react-icons/fa";

const TransactionDetailModal = ({ transaction, onClose }) => (
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
      className="bg-[#1e2139] rounded-2xl border border-[#286db24c] shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white text-xl font-bold">Transaction Details</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <FaTimes />
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Transaction ID</span>
            <span className="text-white font-mono">{transaction.id}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-400">Type</span>
            <span className={`font-semibold ${transaction.type === 'earned' ? 'text-green-400' : 'text-red-400'}`}>
              {transaction.type === 'earned' ? '+' : ''}{transaction.amount} FNKT
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-400">Source</span>
            <span className="text-white">{transaction.source}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-400">Date & Time</span>
            <span className="text-white">{transaction.date} {transaction.time}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-400">Status</span>
            <span className="text-green-400 flex items-center gap-1">
              <FaCheckCircle /> {transaction.status}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-400">Verification</span>
            <span className="text-blue-400">{transaction.verification}</span>
          </div>

          {transaction.campaign && (
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Campaign</span>
              <span className="text-white">{transaction.campaign}</span>
            </div>
          )}

          <div className="border-t border-[#286db24c] pt-4">
            <p className="text-gray-300 text-sm mb-2">Description</p>
            <p className="text-white">{transaction.description}</p>
          </div>

          <div className="bg-[#2a2d4a] rounded-lg p-4 mt-4">
            <div className="flex items-start gap-2">
              <FaInfoCircle className="text-blue-400 mt-0.5 flex-shrink-0" />
              <p className="text-gray-300 text-sm">
                "This transaction was verified and securely recorded by FANEKT."
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

export default TransactionDetailModal;