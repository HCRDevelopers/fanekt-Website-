import React from "react";
import { motion } from "framer-motion";
import { FaCoins, FaCheckCircle, FaUserShield, FaGift } from "react-icons/fa";

const RedemptionSection = ({ availableRewards, walletData, onRedeem }) => (
  <div className="space-y-6">
    <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl md:p-6 p-2">
      <h3 className="text-white text-xl font-bold mb-3">Available Rewards</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {availableRewards.map((reward, index) => (
          <motion.div
            key={index}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-[#1e2139] rounded-xl border border-[#286db24c] overflow-hidden hover:border-[#f64c68] transition-colors"
          >
            <div className="aspect-square overflow-hidden">
              <img
                src={reward.image}
                alt={reward.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = '/api/placeholder/100/100';
                }}
              />
            </div>
            <div className="p-4">
              <h4 className="text-white font-semibold mb-2">{reward.name}</h4>
              <p className="text-gray-400 text-sm mb-3 line-clamp-2">{reward.description}</p>
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-400 text-sm">{reward.sponsor}</span>
                <span className={`text-xs px-2 py-1 rounded ${
                  reward.availability === 'In Stock' ? 'bg-green-500/20 text-green-400' :
                  reward.availability === 'Limited' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-blue-500/20 text-blue-400'
                }`}>
                  {reward.availability}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FaCoins className="text-[#f64c68]" />
                  <span className="text-[#f64c68] font-bold">{reward.cost} FNKT</span>
                </div>
                <button
                  onClick={() => onRedeem(reward)}
                  disabled={walletData.fnkt < reward.cost || walletData.isGuardianControlled}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    walletData.fnkt < reward.cost || walletData.isGuardianControlled
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] text-white hover:shadow-lg'
                  }`}
                >
                  Redeem
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>

    {walletData.isGuardianControlled && (
      <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
        <div className="flex items-center gap-3">
          <FaUserShield className="text-blue-400" />
          <div>
            <h4 className="text-white font-semibold">Guardian Control Active</h4>
            <p className="text-gray-300 text-sm">
              Redemption requests require guardian approval. Your available balance is managed by your parent or guardian.
            </p>
          </div>
        </div>
      </div>
    )}
  </div>
);

export default RedemptionSection;