import React from "react";
import { motion } from "framer-motion";
import { FaFilter, FaSearch, FaCoins, FaShoppingCart, FaCheckCircle, FaLock } from "react-icons/fa";

const TransactionHistory = ({ transactions, onTransactionClick }) => (
  <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl md:p-6 p-2">
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-white text-xl font-bold">Transaction History</h3>
      <div className="flex gap-2">
        <button className="p-2 bg-[#1e2139] rounded-lg border border-[#286db24c] text-gray-400 hover:text-white">
          <FaFilter />
        </button>
        <button className="p-2 bg-[#1e2139] rounded-lg border border-[#286db24c] text-gray-400 hover:text-white">
          <FaSearch />
        </button>
      </div>
    </div>

    <div className="space-y-3">
      {transactions.map((transaction, index) => (
        <motion.div
          key={index}
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: index * 0.05 }}
          onClick={() => onTransactionClick(transaction)}
          className="flex md:items-center justify-between md:flex-row flex-col bg-[#1e2139] rounded-xl md:p-4 p-2 border border-[#286db24c] cursor-pointer hover:bg-[#2a2d4a] transition-colors"
        >
          <div className="flex items-center md:gap-4 gap-2">
            <div className={`p-2 rounded-full ${transaction.type === 'earned' ? 'bg-green-500/20' : 'bg-red-500/20'
              }`}>
              {transaction.type === 'earned' ? (
                <FaCoins className="text-green-400" />
              ) : (
                <FaShoppingCart className="text-red-400" />
              )}
            </div>
            <div>
              <span className="text-white font-semibold">{transaction.source}</span>
              <div className="text-gray-400 text-sm flex items-center md:gap-4 gap-1 md:text-[14px] text-[10px]">
                <span>{transaction.date} {transaction.time}</span>
                <span className="text-green-400 flex items-center gap-1">
                  <FaCheckCircle className="text-xs" />
                  {transaction.verification}
                </span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className={`font-bold text-lg ${transaction.type === 'earned' ? 'text-green-400' : 'text-red-400'
              }`}>
              {transaction.type === 'earned' ? '+' : ''}{transaction.amount} FNKT
            </div>
            <div className="text-gray-400 text-sm">ID: {transaction.id}</div>
          </div>
        </motion.div>
      ))}
    </div>

    {/* Security Notice */}
    <div className="mt-6 bg-[#1e2139] rounded-xl p-4 border border-[#286db24c]">
      <div className="flex items-start gap-3">
        <FaLock className="text-blue-400 mt-1" />
        <h4 className="text-white font-semibold mb-2">Security & Integrity</h4>
      </div>
      <div>
        <p className="text-gray-300 text-sm">
          All FNKT balances and transactions are securely managed by the FANEKT system and cannot be altered manually. Every transaction is verified and permanently recorded.
        </p>
      </div>
    </div>
  </div>
);

export default TransactionHistory;