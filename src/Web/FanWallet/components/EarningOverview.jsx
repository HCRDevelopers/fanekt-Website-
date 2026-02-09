import React from "react";
import { motion } from "framer-motion";
import { FaCalendar, FaClock, FaCoins, FaCheckCircle, FaMobile, FaTrophy, FaUsers, FaEnvelope } from "react-icons/fa";

const EarningOverview = ({ earningSources }) => (
  <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl md:p-6 p-2 mb-8">
    <h3 className="text-white text-xl font-bold mb-3">How You Earned FNKT</h3>
    <div className="space-y-4">
      {earningSources.map((source, index) => (
        <motion.div
          key={index}
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: index * 0.1 }}
          className="flex md:items-center justify-between md:flex-row flex-col gap-2 bg-[#1e2139] rounded-xl md:p-4 p-2 border border-[#286db24c]"
        >
          <div className="flex items-center md:gap-4 gap-2">
            <div className="text-2xl">{source.icon}</div>
            <div>
              <span className="text-white font-semibold">{source.source}</span>
              <div className="text-gray-400 text-sm flex items-center gap-2">
                <FaCalendar className="text-xs" />
                {source.date}
                <FaClock className="text-xs ml-2" />
                {source.time}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 justify-end">
            <FaCoins className="text-[#f64c68]" />
            <span className="text-[#f64c68] font-bold">+{source.amount}</span>
            {source.verified && <FaCheckCircle className="text-green-400 text-sm" />}
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

export default EarningOverview;