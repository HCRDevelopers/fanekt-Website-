import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaWallet, FaUser, FaMapMarkerAlt, FaShieldAlt, FaCog } from "react-icons/fa";

const AthleteDashboard = () => {
  const navigate = useNavigate();

  const fanbaseData = {
    homeFans: 0,
    globalFavourites: 0
  };

  const imageRights = {
    appRights: "Approved",
    commercialRights: "Approved",
    termsAccepted: "2025-12-12 15:43:25"
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
        <h1 className="text-white text-3xl font-bold mb-4">Athlete / VIP Portal</h1>
        <p className="text-white text-lg leading-relaxed">
          Manage your FANEKT presence as an athlete or VIP in sports. Grow and understand your real fanbase, control your image rights, and prepare for sponsor campaigns that reward both you and your fans.
        </p>
      </motion.div>

      {/* Public Profile Section */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="bg-[#3c385996] border border-[#286db24c] rounded-2xl shadow-lg md:p-6 p-2 mb-6"
      >
        <div className="flex items-center gap-4 mb-4">
          <FaUser className="text-[#f64c68] text-3xl" />
          <h2 className="text-white text-2xl font-semibold">My public profile (summary)</h2>
        </div>
        <div className="text-white">
          <p className="text-lg mb-4">
            <span className="font-medium">Name / AKA:</span> <span className="text-[#f64c68]">Test athlete</span>
          </p>
          <p className="text-gray-300 text-sm">
            To edit your bio, socials or location, use <span className="text-[#f64c68]">My Account</span>.
          </p>
        </div>
      </motion.div>

      {/* FNKT Wallet Section */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="bg-[#3c385996] border border-[#286db24c] rounded-2xl shadow-lg md:p-6 p-2 mb-6"
      >
        <div className="flex items-center gap-4 mb-4">
          <FaWallet className="text-[#f64c68] text-3xl" />
          <h2 className="text-white text-2xl font-semibold">My FNKT wallet</h2>
        </div>
        <div className="text-white">
          <p className="md:text-2xl text-sm font-bold mb-2">
            Balance: <span className="text-[#f64c68]">F̈ 0</span> (0.00 € · 0.00 $ · 0.00 USDT)
          </p>
          <p className="text-gray-300 text-sm">
            1 F̈ equals 1 euro cent. In the future, you will be able to receive FAN€KT from sponsors and fans for your campaigns, content and interactions.
          </p>
        </div>
        <div className="mt-4 text-right">
          <button
            onClick={() => navigate('/athlete/wallet')}
            className="bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] text-white py-2 px-4 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg flex items-center gap-2"
          >
            <FaWallet className="text-sm" />
            Wallet History
          </button>
        </div>
      </motion.div>

      {/* Fanbase Section */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="bg-[#3c385996] border border-[#286db24c] rounded-2xl shadow-lg md:p-6 p-2 mb-6"
      >
        <h3 className="text-white text-2xl font-semibold mb-6">My fanbase in FANEKT</h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-[#3337597b] rounded-lg p-4 border border-[#286db24c]">
            <p className="text-white text-2xl font-bold">{fanbaseData.homeFans}</p>
            <p className="text-gray-300 text-sm">Home fans</p>
            <p className="text-gray-400 text-xs mt-1">Fans who chose you as their main Home Fan.</p>
          </div>
          <div className="bg-[#3337597b] rounded-lg p-4 border border-[#286db24c]">
            <p className="text-white text-2xl font-bold">{fanbaseData.globalFavourites}</p>
            <p className="text-gray-300 text-sm">Global favourites</p>
            <p className="text-gray-400 text-xs mt-1">Fans who included you in their top 3 global favourites.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-[#3337597b] rounded-lg p-4 border border-[#286db24c]">
            <div className="flex items-center gap-2 mb-2">
              <FaMapMarkerAlt className="text-[#f64c68] text-lg" />
              <p className="text-white text-sm font-medium">Top countries of your fans</p>
            </div>
            <p className="text-gray-400 text-sm">No data yet.</p>
          </div>
          <div className="bg-[#3337597b] rounded-lg p-4 border border-[#286db24c]">
            <div className="flex items-center gap-2 mb-2">
              <FaMapMarkerAlt className="text-[#f64c68] text-lg" />
              <p className="text-white text-sm font-medium">Top cities of your fans</p>
            </div>
            <p className="text-gray-400 text-sm">No data yet.</p>
          </div>
        </div>

        <div className="mt-4 p-4 bg-[#3337597b] rounded-lg border border-[#286db24c]">
          <p className="text-gray-300 text-sm leading-relaxed">
            In the future, you will be able to send targeted messages or benefits to these fans through campaigns, just like sponsors – but under your own brand.
          </p>
        </div>
      </motion.div>

      {/* Image & Commercial Rights Section */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="bg-[#3c385996] border border-[#286db24c] rounded-2xl shadow-lg md:p-6 p-2 mb-6"
      >
        <div className="flex items-center gap-4 mb-6">
          <FaShieldAlt className="text-[#f64c68] text-2xl" />
          <h3 className="text-white text-xl font-semibold">Image & commercial rights</h3>
        </div>

        <p className="text-gray-300 text-lg leading-relaxed mb-6">
          Control how your image can be used inside FANEKT and in sponsor campaigns. You decide if your photos and name appear only inside the app or also in external marketing.
        </p>

        <div className="space-y-3 mb-6">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-[#f64c68] mt-2 flex-shrink-0"></div>
            <p className="text-gray-300">Image use inside the app only (lists, rankings, fan pages).</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-[#f64c68] mt-2 flex-shrink-0"></div>
            <p className="text-gray-300">Optional: allow FANEKT & sponsors to use your image in campaigns and promotions.</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-[#f64c68] mt-2 flex-shrink-0"></div>
            <p className="text-gray-300">Everything is recorded with a timestamp of when you accepted the terms.</p>
          </div>
        </div>

        <div className="bg-[#3337597b] rounded-lg p-4 border border-[#286db24c] mb-6">
          <h4 className="text-white text-lg font-medium mb-3">Current status:</h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">• Image rights inside app:</span>
              <span className="text-[#f64c68] font-medium">{imageRights.appRights}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">• Commercial / sponsor rights:</span>
              <span className="text-[#f64c68] font-medium">{imageRights.commercialRights}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">• Terms accepted:</span>
              <span className="text-[#f64c68] font-medium">{imageRights.termsAccepted}</span>
            </div>
          </div>
        </div>

        <button className="bg-[#f64c68] hover:bg-[#e03e5c] text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors">
          <FaCog className="text-sm" />
          Manage my image & commercial rights
        </button>
      </motion.div>

      {/* How to Use FANEKT Section */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.0 }}
        className="bg-[#3c385996] border border-[#286db24c] rounded-2xl shadow-lg md:p-6 p-2"
      >
        <h3 className="text-white text-2xl font-semibold mb-6">How you will use FANEKT as an Athlete / VIP</h3>

        <div className="space-y-4 mb-8">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-[#f64c68] mt-2 flex-shrink-0"></div>
            <p className="text-gray-300">Build and measure your real fanbase, not fake followers.</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-[#f64c68] mt-2 flex-shrink-0"></div>
            <p className="text-gray-300">Encourage your fans to wear and register X-KRYPTED items connected to you via SmartPatch.</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-[#f64c68] mt-2 flex-shrink-0"></div>
            <p className="text-gray-300">Participate in sponsor campaigns that include you as target, receiving a share of FNKT.</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-[#f64c68] mt-2 flex-shrink-0"></div>
            <p className="text-gray-300">Later: create your own campaigns to reward your most loyal fans with FNKT and exclusive experiences.</p>
          </div>
        </div>

        <div className="bg-[#3337597b] rounded-lg p-4 border border-[#286db24c]">
          <p className="text-gray-300 text-sm leading-relaxed">
            For now, make sure your profile is complete and your rights are configured correctly. This will make it easier for sponsors to work with you and for fans to find and support you.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AthleteDashboard;
