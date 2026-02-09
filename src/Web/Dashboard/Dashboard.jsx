import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaWallet, FaTrophy, FaStar, FaCrown, FaFire, FaMedal, FaHeart, FaCoins, FaEuroSign, FaDollarSign } from "react-icons/fa";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('fans');

  // Fan-specific data
  const walletBalance = {
    fnkt: 15750,
    euro: 157.50,
    usd: 170.25,
    usdt: 169.80
  };

  const topLocalFans = [
    { name: "SPANISH GO", location: "MADRID, SPAIN", fnkt: 45230 },
    { name: "LOCAL HERO", location: "BARCELONA, SPAIN", fnkt: 38750 },
    { name: "IBERIAN FAN", location: "VALENCIA, SPAIN", fnkt: 32100 },
    { name: "SOUTH LEGEND", location: "SEVILLE, SPAIN", fnkt: 28950 },
    { name: "NORTHERN STAR", location: "BILBAO, SPAIN", fnkt: 25680 }
  ];

  const topGlobalFans = [
    { name: "IP", location: "ISTANBUL, TURKEY", fnkt: 89450 },
    { name: "TOPTEST", location: "ISTANBUL, TURKEY", fnkt: 78230 },
    { name: "SPANISH GO", location: "MADRID, SPAIN", fnkt: 75680 },
    { name: "FAN_ONE", location: "NYC, USA", fnkt: 69340 },
    { name: "THE GOAT 1", location: "DALLAS, USA", fnkt: 65890 },
    { name: "F4", location: "MONACO, MONACO", fnkt: 62470 },
    { name: "ONDERS", location: "ISTANBUL, TURKEY", fnkt: 59820 },
    { name: "EURO FAN", location: "LONDON, UK", fnkt: 57210 },
    { name: "ASIAN TIGER", location: "TOKYO, JAPAN", fnkt: 54890 },
    { name: "AFRICAN LION", location: "CAPE TOWN, RSA", fnkt: 52140 }
  ];

  const topLocalFavorites = [
    { name: "Real Madrid", category: "Football Club", followers: 45230 },
    { name: "FC Barcelona", category: "Football Club", followers: 38750 },
    { name: "Atlético Madrid", category: "Football Club", followers: 32100 },
    { name: "Sevilla FC", category: "Football Club", followers: 28950 },
    { name: "Valencia CF", category: "Football Club", followers: 25680 }
  ];

  const topGlobalFavorites = [
    { name: "Fenerbahçe", category: "Football Club", followers: 89450 },
    { name: "EFE POSTEL", category: "Athlete", followers: 78230 },
    { name: "FCR", category: "Football Club", followers: 75680 },
    { name: "Djokovic", category: "Tennis Player", followers: 69340 },
    { name: "Tofaş", category: "Basketball Team", followers: 65890 },
    { name: "Michael Jordan", category: "Basketball Legend", followers: 62470 },
    { name: "LA Lakers", category: "Basketball Team", followers: 59820 },
    { name: "FRC", category: "Football Club", followers: 57210 },
    { name: "Michael Jordan", category: "Basketball Legend", followers: 54890 },
    { name: "Nikola Jokić", category: "Basketball Player", followers: 52140 }
  ];

  const FanItem = ({ fan, index, showFnkt = false }) => (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: index * 0.1 }}
      className="flex items-center justify-between bg-gradient-to-r from-[#2a2d4a] to-[#333759] hover:from-[#333759] hover:to-[#3c3859] rounded-xl p-4 border border-[#286db24c] transition-all duration-300 group"
    >
      <div className="flex items-center gap-4">
        <div className={`flex items-center justify-center w-8 h-8 rounded-full ${index === 0 ? 'bg-gradient-to-r from-yellow-400 to-orange-500' :
            index === 1 ? 'bg-gradient-to-r from-gray-300 to-gray-500' :
              index === 2 ? 'bg-gradient-to-r from-orange-400 to-orange-600' :
                'bg-[#286db24c]'
          }`}>
          {index < 3 ? (
            <FaCrown className="text-white text-xs" />
          ) : (
            <span className="text-white font-bold text-sm">{index + 1}</span>
          )}
        </div>
        <div>
          <span className="text-white font-semibold text-sm">{fan.name}</span>
          <span className="text-gray-400 text-xs ml-2">· {fan.location}</span>
        </div>
      </div>
      {showFnkt && (
        <div className="flex items-center gap-2">
          <FaCoins className="text-[#f64c68] text-sm" />
          <span className="text-[#f64c68] font-bold text-sm">{fan.fnkt.toLocaleString()}</span>
        </div>
      )}
    </motion.div>
  );

  const FavoriteItem = ({ favorite, index, showFollowers = false }) => (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: index * 0.1 }}
      className="flex sm:items-center justify-between flex-col sm:flex-row gap-2 bg-gradient-to-r from-[#2a2d4a] to-[#333759] hover:from-[#333759] hover:to-[#3c3859] rounded-xl sm:p-4 p-2 border border-[#286db24c] transition-all duration-300 group"
    >
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#286db24c]">
          <span className="text-white font-bold text-sm">{index + 1}</span>
        </div>
        <div>
          <span className="text-white font-semibold text-sm">{favorite.name}</span>
          <span className="text-gray-400 text-xs ml-2">· {favorite.category}</span>
        </div>
      </div>
      {showFollowers && (
        <div className="flex justify-end w-full">
          <div className="flex items-center gap-2">
            <FaHeart className="text-red-400 text-sm" />
            <span className="text-red-400 font-bold text-sm">{favorite.followers.toLocaleString()}</span>
          </div>
        </div>
      )}
    </motion.div>
  );

  return (
    <div className="min-h-screen lg:ml-[290px] px-4 lg:px-8 py-6 pt-28 lg:pt-6">
      {/* Header */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-6 lg:mb-8"
      >
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
          Fan Dashboard
        </h1>
        <p className="text-gray-400 text-sm sm:text-base">
          Track your progress and explore the top performers in the FanEKT ecosystem
        </p>
      </motion.div>

      {/* FNKT Wallet Section */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="bg-gradient-to-r from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl p-2 md:p-6 lg:p-8 mb-6 lg:mb-8"
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-0 mb-6">
          <div className="flex items-center gap-4 w-full lg:w-auto">
            <div className="p-3 bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] rounded-xl">
              <FaWallet className="text-white text-2xl" />
            </div>
            <div>
              <h2 className="text-white text-xl lg:text-2xl font-bold">Your FNKT Wallet</h2>
              <p className="text-gray-400 text-sm">Your digital currency balance</p>
            </div>
          </div>
          <div className="text-center lg:text-right w-full lg:w-auto">
            <div className="text-2xl lg:text-3xl font-bold text-[#f64c68] mb-1">
              F̈ {walletBalance.fnkt.toLocaleString()}
            </div>
            <div className="text-gray-400 text-sm">≈ {walletBalance.euro} €</div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#1e2139] rounded-xl p-4 border border-[#286db24c]">
            <div className="flex items-center gap-2 mb-2">
              <FaEuroSign className="text-green-400" />
              <span className="text-gray-400 text-sm">Euro</span>
            </div>
            <div className="text-white font-bold text-xl">{walletBalance.euro} €</div>
          </div>
          <div className="bg-[#1e2139] rounded-xl p-4 border border-[#286db24c]">
            <div className="flex items-center gap-2 mb-2">
              <FaDollarSign className="text-blue-400" />
              <span className="text-gray-400 text-sm">USD</span>
            </div>
            <div className="text-white font-bold text-xl">{walletBalance.usd} $</div>
          </div>
          <div className="bg-[#1e2139] rounded-xl p-4 border border-[#286db24c]">
            <div className="flex items-center gap-2 mb-2">
              <FaCoins className="text-purple-400" />
              <span className="text-gray-400 text-sm">USDT</span>
            </div>
            <div className="text-white font-bold text-xl">{walletBalance.usdt} USDT</div>
          </div>
        </div>
        <div className="mt-4 text-center">
          <p className="text-gray-400 text-sm">1 F̈ = 1 euro cent (0.01 €)</p>
        </div>
        <div className="mt-4 text-center lg:text-right">
          <button
            onClick={() => navigate('/fan/wallet')}
            className="bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] text-white py-2 px-4 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg"
          >
            Wallet Settings
          </button>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-6"
      >
        <div className="flex space-x-1 bg-[#1e2139] p-1 rounded-xl border border-[#286db24c]">
          <button
            onClick={() => setActiveTab('fans')}
            className={`flex-1 py-3 px-4 sm:text-[18px] text-[13px] rounded-lg font-semibold transition-all duration-300 ${activeTab === 'fans'
                ? 'bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] text-white shadow-lg'
                : 'text-gray-400 hover:text-white'
              }`}
          >
            <FaTrophy className="inline mr-2" />
            Top Fans
          </button>
          <button
            onClick={() => setActiveTab('favorites')}
            className={`flex-1 py-3 px-4 sm:text-[18px] text-[13px] rounded-lg font-semibold transition-all duration-300 ${activeTab === 'favorites'
                ? 'bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] text-white shadow-lg'
                : 'text-gray-400 hover:text-white'
              }`}
          >
            <FaStar className="inline mr-2" />
            Top Favorites
          </button>
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8"
      >
        {activeTab === 'fans' ? (
          <>
            {/* Top Local Fans */}
            <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl overflow-hidden">
              <div className="p-4 lg:p-6 border-b border-[#286db24c]">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] rounded-lg">
                    <FaFire className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-white text-lg lg:text-xl font-bold">Top Local Fans</h3>
                    <p className="text-gray-400 text-sm">Lifetime FNKT earned in your region</p>
                  </div>
                </div>
              </div>
              <div className="p-4 lg:p-6 space-y-3">
                {topLocalFans.map((fan, index) => (
                  <FanItem key={index} fan={fan} index={index} showFnkt={true} />
                ))}
              </div>
            </div>

            {/* Top Global Fans */}
            <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl overflow-hidden">
              <div className="p-4 lg:p-6 border-b border-[#286db24c]">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] rounded-lg">
                    <FaCrown className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-white text-lg lg:text-xl font-bold">Top Global Fans</h3>
                    <p className="text-gray-400 text-sm">Worldwide FNKT leaderboard</p>
                  </div>
                </div>
              </div>
              <div className="p-4 lg:p-6 space-y-3 max-h-80 lg:max-h-96 overflow-y-auto">
                {topGlobalFans.map((fan, index) => (
                  <FanItem key={index} fan={fan} index={index} showFnkt={true} />
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Top Local Favorites */}
            <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl overflow-hidden">
              <div className="p-4 lg:p-6 border-b border-[#286db24c]">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] rounded-lg">
                    <FaHeart className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-white text-lg lg:text-xl font-bold">Top Local Favorites</h3>
                    <p className="text-gray-400 text-sm">Most followed in your region</p>
                  </div>
                </div>
              </div>
              <div className="p-4 lg:p-6 space-y-3">
                {topLocalFavorites.map((favorite, index) => (
                  <FavoriteItem key={index} favorite={favorite} index={index} showFollowers={true} />
                ))}
              </div>
            </div>

            {/* Top Global Favorites */}
            <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl overflow-hidden">
              <div className="p-4 lg:p-6 border-b border-[#286db24c]">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] rounded-lg">
                    <FaMedal className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-white text-lg lg:text-xl font-bold">Top Global Favorites</h3>
                    <p className="text-gray-400 text-sm">Most popular worldwide</p>
                  </div>
                </div>
              </div>
              <div className="p-4 lg:p-6 space-y-3 max-h-80 lg:max-h-96 overflow-y-auto">
                {topGlobalFavorites.map((favorite, index) => (
                  <FavoriteItem key={index} favorite={favorite} index={index} showFollowers={true} />
                ))}
              </div>
            </div>
          </>
        )}
      </motion.div>


    </div>
  );
};

export default Dashboard;

