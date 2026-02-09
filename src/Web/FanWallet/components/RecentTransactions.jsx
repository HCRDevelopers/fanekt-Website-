import React from "react";
import { motion } from "framer-motion";
import { FaCoins, FaShoppingCart, FaCheckCircle } from "react-icons/fa";

const RecentTransactions = ({ transactions, onViewAll, onTransactionClick }) => (
  <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl md:p-6 p-2">
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-white text-xl font-bold">Recent Transactions</h3>
      <button
        onClick={onViewAll}
        className="text-[#f64c68] hover:text-[#ff6b6b] font-semibold transition-colors"
      >
        View All
      </button>
    </div>
    <div className="space-y-3">
      {transactions.slice(0, 3).map((transaction, index) => (
        <motion.div
          key={index}
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: index * 0.1 }}
          onClick={() => onTransactionClick(transaction)}
          className="flex md:items-center justify-between md:flex-row flex-col bg-[#1e2139] rounded-xl md:p-4 p-2 border border-[#286db24c] cursor-pointer hover:bg-[#2a2d4a] transition-colors"
        >
          <div className="flex items-center gap-4">
            <div className={`p-2 rounded-full ${
              transaction.type === 'earned' ? 'bg-green-500/20' : 'bg-red-500/20'
            }`}>
              {transaction.type === 'earned' ? (
                <FaCoins className="text-green-400" />
              ) : (
                <FaShoppingCart className="text-red-400" />
              )}
            </div>
            <div>
              <span className="text-white font-semibold">{transaction.source}</span>
              <div className="text-gray-400 text-sm">{transaction.date}</div>
            </div>
          </div>
          <div className="text-right">
            <div className={`font-bold ${
              transaction.type === 'earned' ? 'text-green-400' : 'text-red-400'
            }`}>
              {transaction.type === 'earned' ? '+' : ''}{transaction.amount} FNKT
            </div>
            <div className="text-green-400 text-sm flex items-center justify-end gap-1">
              <FaCheckCircle className="text-xs" />
              {transaction.status}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

export default RecentTransactions;