import React from "react";
import { motion } from "framer-motion";

const QuickActions = ({ quickActions }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    {quickActions.map((action, index) => (
      <motion.button
        key={index}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: index * 0.1 }}
        onClick={action.action}
        disabled={action.disabled}
        className={`p-4 rounded-xl border transition-all duration-300 ${
          action.disabled
            ? 'bg-gray-700 border-gray-600 opacity-50 cursor-not-allowed'
            : 'bg-[#1e2139] border-[#286db24c] hover:bg-[#2a2d4a] hover:border-[#f64c68]'
        }`}
      >
        <div className="text-center">
          <div className="text-2xl mb-2">{action.icon}</div>
          <div className="text-white font-semibold text-sm">{action.label}</div>
        </div>
      </motion.button>
    ))}
  </div>
);

export default QuickActions;