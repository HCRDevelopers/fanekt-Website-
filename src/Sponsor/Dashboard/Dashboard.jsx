import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaWallet, FaPlus, FaEye, FaCog } from "react-icons/fa";

const SponsorDashboard = () => {
  const navigate = useNavigate();

  const campaignData = {
    draft: 0,
    active: 1,
    paused: 0,
    archived: 2,
    totalBudget: 2200,
    totalSpend: 0
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
        <h1 className="text-white text-3xl font-bold mb-4">Sponsor / Partner Portal</h1>
        <p className="text-white text-lg leading-relaxed">
          Welcome to your FANEKT Sponsor dashboard. Here you manage your budgets, campaigns and access advanced fan targeting – exactly what a CMO needs for high-performance marketing.
        </p>
      </motion.div>

      {/* Budget / Wallet Section */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="bg-[#3c385996] border border-[#286db24c] rounded-2xl shadow-lg md:p-6 p-2 mb-6"
      >
        <div className="flex items-center gap-4 mb-4">
          <FaWallet className="text-[#f64c68] text-3xl" />
          <h2 className="text-white text-2xl font-semibold">Budget / Wallet</h2>
        </div>
        <div className="text-white">
          <p className="md:text-2xl text-md font-bold mb-2">
            Available balance: <br className="md:hidden flex" /> <span className="text-[#f64c68]">F̈ 1 000 000</span> (10 000.00 € · 11 000.00 $ · 11 000.00 USDT)
          </p>
          <p className="text-gray-300 text-sm mb-4">
            1 F̈ equals 1 euro cent.
          </p>
          <p className="text-gray-300 text-sm">
            Campaigns use FAN€KT dynamically based on the number of targeted fans and the reward levels you set.
          </p>
        </div>
        <div className="mt-4 text-right">
          <button
            onClick={() => navigate('/sponsor/wallet')}
            className="bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] text-white py-2 px-4 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg flex items-center gap-2"
          >
            <FaCog className="text-sm" />
            Wallet Settings
          </button>
        </div>
      </motion.div>

      {/* Campaign Overview */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="bg-[#3c385996] border border-[#286db24c] rounded-2xl shadow-lg md:p-6 p-2 mb-6"
      >
        <h3 className="text-white text-2xl font-semibold mb-6">Campaign overview</h3>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-[#3337597b] rounded-lg md:p-4 p-2 text-center border border-[#286db24c]">
            <p className="text-white text-2xl font-bold">{campaignData.draft}</p>
            <p className="text-gray-300 text-sm">Draft campaigns</p>
          </div>
          <div className="bg-[#3337597b] rounded-lg md:p-4 p-2 text-center border border-[#286db24c]">
            <p className="text-[#f64c68] text-2xl font-bold">{campaignData.active}</p>
            <p className="text-gray-300 text-sm">Active campaigns</p>
          </div>
          <div className="bg-[#3337597b] rounded-lg md:p-4 p-2 text-center border border-[#286db24c]">
            <p className="text-white text-2xl font-bold">{campaignData.paused}</p>
            <p className="text-gray-300 text-sm">Paused campaigns</p>
          </div>
          <div className="bg-[#3337597b] rounded-lg md:p-4 p-2 text-center border border-[#286db24c]">
            <p className="text-white text-2xl font-bold">{campaignData.archived}</p>
            <p className="text-gray-300 text-sm">Archived campaigns</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          <div className="bg-[#3337597b] rounded-lg md:p-4 p-2 border border-[#286db24c]">
            <p className="text-white text-sm">Total budget (all campaigns):</p>
            <p className="text-[#f64c68] text-xl font-bold">F̈{campaignData.totalBudget.toLocaleString()}.00 (€{(campaignData.totalBudget / 100).toFixed(2)})</p>
          </div>
          <div className="bg-[#3337597b] rounded-lg md:p-4 p-2 border border-[#286db24c]">
            <p className="text-white text-sm">Total spend (all campaigns):</p>
            <p className="text-[#f64c68] text-xl font-bold">F̈{campaignData.totalSpend.toLocaleString()}.00 (€{(campaignData.totalSpend / 100).toFixed(2)})</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button className="bg-[#f64c68] hover:bg-[#e03e5c] text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors">
            <FaPlus className="text-sm" />
            Create new campaign
          </button>
          <button className="bg-transparent border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
            View all campaigns
          </button>
        </div>
      </motion.div>

      {/* Why FANEKT Section */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="bg-[#3c385996] border border-[#286db24c] rounded-2xl shadow-lg md:p-6 p-2 mb-6"
      >
        <h3 className="text-white text-2xl font-semibold mb-6">Why FANEKT is a CMO's dream tool</h3>

        <div className="space-y-4 mb-8">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-[#f64c68] mt-2 flex-shrink-0"></div>
            <p className="text-gray-300">Targets only real verified fans, not bots or fake followers.</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-[#f64c68] mt-2 flex-shrink-0"></div>
            <p className="text-gray-300">Lets you choose fans by club, athlete, country, city, age segment, ranking level and more.</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-[#f64c68] mt-2 flex-shrink-0"></div>
            <p className="text-gray-300">Connects every activation to a physical item (SmartPatch) and trackable actions (scan, click, purchase).</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-[#f64c68] mt-2 flex-shrink-0"></div>
            <p className="text-gray-300">Budget is 100% visible: FNKT-in & FNKT-out, per campaign and per fan segment.</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-[#f64c68] mt-2 flex-shrink-0"></div>
            <p className="text-gray-300">Can reward fans instantly in FAN€KT, turning media spend into loyalty and data.</p>
          </div>
        </div>
      </motion.div>

      {/* SmartPatch Scanning Section */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="bg-[#3c385996] border border-[#286db24c] rounded-2xl shadow-lg md:p-6 p-2"
      >
        <div className="flex items-center gap-4 mb-6">
          <FaEye className="text-[#f64c68] text-2xl" />
          <h3 className="text-white text-xl font-semibold">SmartPatch scanning & Sponsor accounts</h3>
        </div>

        <p className="text-gray-300 text-lg leading-relaxed mb-6">
          Scan SmartPatch is a Fan feature. As a Sponsor/Partner, your role is to create campaigns and budgets – SmartPatches themselves are always owned and activated by real fans.
        </p>

        <p className="text-gray-300 text-lg leading-relaxed mb-6">
          If you click Scan SmartPatch while logged in here, you will see a message asking you to log in with a Fan account. This separation keeps:
        </p>

        <div className="space-y-3 mb-6">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-[#f64c68] mt-2 flex-shrink-0"></div>
            <p className="text-gray-300">Ownership & rewards clearly attached to real individuals (fans).</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-[#f64c68] mt-2 flex-shrink-0"></div>
            <p className="text-gray-300">Your sponsor view focused on marketing performance, not item management.</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-[#f64c68] mt-2 flex-shrink-0"></div>
            <p className="text-gray-300">Data protection and compliance simpler for your legal and IT teams.</p>
          </div>
        </div>

        <p className="text-gray-300 text-lg leading-relaxed">
          You can still create a personal Fan profile (even with a different email) to experience the SmartPatch journey like any supporter – which is often useful for CMOs and brand managers.
        </p>
      </motion.div>
    </div>
  );
};

export default SponsorDashboard;
