import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaWallet, FaCheckCircle, FaTimesCircle, FaClock, FaEye } from "react-icons/fa";

const TeamDashboard = () => {
  const navigate = useNavigate();

  const rightsData = {
    logoUsage: "Pending",
    commercialRights: "Not signed"
  };

  const walletData = {
    balance: 0,
    currency: "F̈",
    description: "(FAN€KT – FNKT)",
    euroEquivalent: "0.00 €",
    referenceCurrency: "EUR"
  };

  return (
    <div className="lg:ml-[290px] px-4 lg:px-6 py-3 lg:pb-5 lg:pt-5 pt-28">
      {/* Welcome Section */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="bg-[#3337597b] rounded-[10px] border-[1.5px] md:p-6 p-2 border-[#286db24c] shadow-sm mb-6"
      >
        <h1 className="text-white text-3xl font-bold mb-4">Team / Club Portal</h1>
        <p className="text-white text-lg leading-relaxed">
          Welcome to your official Team test portal. Here you manage your participation in the FAN€KT ecosystem: logo and branding rights, fan base, and future revenue distributions via FAN€KT PAY (F̈).
        </p>
      </motion.div>

      {/* Rights & Approvals Section */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="bg-[#3c385996] border border-[#286db24c] rounded-2xl shadow-lg md:p-6 p-2 mb-6"
      >
        <h3 className="text-white text-2xl font-semibold mb-3">Rights & Approvals</h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-[#3337597b] rounded-lg p-4 border border-[#286db24c]">
            <div className="flex items-center md:gap-3 gap-1 mb-2">
              <FaClock className="text-[#f64c68] sm:text-lg text-md" />
              <h4 className="text-white text-lg font-medium">Logo usage authorization</h4>
            </div>
            <p className="text-gray-300 text-sm mb-3">
              Permission for FAN€KT / X-KRYPTED to use your official logo on digital and physical items.
            </p>
            <div className="flex items-center gap-2">
              <FaClock className="text-yellow-500 text-sm" />
              <span className="text-yellow-400 text-sm font-medium">Pending</span>
            </div>
          </div>

          <div className="bg-[#3337597b] rounded-lg md:p-4 p-2 border border-[#286db24c]">
            <div className="flex items-center md:gap-3 gap-1 mb-2">
              <FaTimesCircle className="text-red-500 text-lg" />
              <h4 className="text-white text-lg font-medium">Commercial & image rights</h4>
            </div>
            <p className="text-gray-300 text-sm mb-3">
              Agreement for the club to receive FAN€KT PAY distributions from sponsor campaigns targeting your team.
            </p>
            <div className="flex items-center gap-2">
              <FaTimesCircle className="text-red-500 text-sm" />
              <span className="text-red-400 text-sm font-medium">Not signed</span>
            </div>
          </div>
        </div>

        <div className="bg-[#3337597b] rounded-lg p-4 border border-[#286db24c]">
          <p className="text-gray-300 text-sm leading-relaxed">
            <strong className="text-white">Note:</strong> If these approvals are not completed, the club will not receive its share of sponsor revenues from campaigns that target your team. You can finalize these agreements by contacting the FAN€KT team.
          </p>
        </div>
      </motion.div>

      {/* FAN€KT PAY Wallet Section */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="bg-[#3c385996] border border-[#286db24c] rounded-2xl shadow-lg md:p-6 p-2 mb-6"
      >
        <div className="flex items-center md:gap-4 gap-2 mb-4">
          <FaWallet className="text-[#f64c68] text-3xl" />
          <h2 className="text-white text-2xl font-semibold">FAN€KT PAY Wallet</h2>
        </div>

        <div className="bg-[#3337597b] rounded-lg p-4 border border-[#286db24c] mb-4">
          <h4 className="text-white text-lg font-medium mb-2">Club balance</h4>
          <p className="text-2xl font-bold text-[#f64c68] mb-1">
            {walletData.balance} {walletData.currency}
          </p>
          <p className="text-gray-300 text-sm mb-2">{walletData.description}</p>
          <p className="text-gray-400 text-sm">≈ {walletData.euroEquivalent}</p>
          <p className="text-gray-500 text-xs">Ref. currency: {walletData.referenceCurrency}</p>
        </div>

        <p className="text-gray-300 text-sm mb-4">
          This wallet will receive the club's share of sponsor campaigns that target your team once all rights are approved.
        </p>

        <div className="mt-4 text-right">
          <button
            onClick={() => navigate('/team/wallet')}
            className="bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] text-white py-2 px-4 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg flex items-center gap-2"
          >
            <FaWallet className="text-sm" />
            Wallet Settings
          </button>
        </div>
      </motion.div>

      {/* Fanbase & Tools Section */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="bg-[#3c385996] border border-[#286db24c] rounded-2xl shadow-lg md:p-6 p-2"
      >
        <div className="flex items-center gap-4 mb-3">
          <FaEye className="text-[#f64c68] text-2xl" />
          <h3 className="text-white text-xl font-semibold">Fanbase & Tools</h3>
        </div>

        <p className="text-gray-300 text-lg leading-relaxed mb-6">
          Future updates to this portal will allow you to:
        </p>

        <div className="space-y-3 mb-6">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-[#f64c68] mt-2 flex-shrink-0"></div>
            <p className="text-gray-300">See how many verified fans follow your team and where they are located.</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-[#f64c68] mt-2 flex-shrink-0"></div>
            <p className="text-gray-300">Configure official tickets and products that can be sold via FAN€KT and X-KRYPTED.</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-[#f64c68] mt-2 flex-shrink-0"></div>
            <p className="text-gray-300">Access analytics about sponsor campaigns targeting your club.</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-[#f64c68] mt-2 flex-shrink-0"></div>
            <p className="text-gray-300">Approve or manage special activations (VIP experiences, meet & greet, etc.).</p>
          </div>
        </div>

        <div className="bg-[#3337597b] rounded-lg p-4 border border-[#286db24c]">
          <p className="text-gray-300 text-sm leading-relaxed">
            This area will progressively be expanded with full tools for verified professional clubs. Our team will contact you to finalize your onboarding and rights agreements.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default TeamDashboard;
