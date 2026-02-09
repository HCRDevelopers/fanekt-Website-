import React from "react";
import { motion } from "framer-motion";
import { FaWallet, FaCheckCircle, FaUserShield } from "react-icons/fa";

const WalletHeader = ({ walletData }) => (
  <motion.div
    initial={{ y: -50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.6, type: "spring" }}
    className="bg-gradient-to-r from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl md:p-8 p-4 mb-6"
  >
    {/* Header Section */}
    <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-4 md:gap-0">
      {/* Left Section - Icon and Title */}
      <div className="flex items-center gap-3 md:gap-4">
        <div className="p-2 md:p-3 bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] rounded-xl">
          <FaWallet className="text-white text-xl md:text-2xl" />
        </div>
        <div>
          <h2 className="text-white text-lg md:text-2xl font-bold">Your FNKT Balance</h2>
          <p className="text-gray-400 text-xs md:text-sm">Digital currency balance</p>
        </div>
      </div>

      {/* Right Section - Balance */}
      <div className="text-right md:text-right">
        <div className="text-2xl md:text-3xl font-bold text-[#f64c68] mb-1">
          {walletData.fnkt.toLocaleString()} FNKT
        </div>
        <div className="text-gray-400 text-sm md:text-sm">= €{walletData.euro}</div>
        <div className="text-xs text-gray-500 mt-1">1 FNKT = 1 euro cent</div>
      </div>
    </div>

    {/* Status Indicator */}
    <div className="flex flex-wrap items-center gap-2 md:gap-3 mt-4">
      <div className="flex items-center gap-2">
        <FaCheckCircle className="text-green-400" />
        <span className="text-green-400 font-semibold text-sm md:text-base">Verified Account</span>
      </div>
      {walletData.isGuardianControlled && (
        <>
          <span className="text-gray-400 hidden md:inline">•</span>
          <div className="flex items-center gap-2 mt-2 md:mt-0">
            <FaUserShield className="text-blue-400" />
            <span className="text-blue-400 font-semibold text-sm md:text-base">Guardian Managed</span>
          </div>
        </>
      )}
    </div>
  </motion.div>
);

export default WalletHeader;
