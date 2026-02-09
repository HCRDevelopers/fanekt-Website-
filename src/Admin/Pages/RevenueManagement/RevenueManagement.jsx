import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronLeft, ChevronRight, Search, DollarSign, Users, Percent, Settings, BarChart3, TrendingUp } from "lucide-react";

const RevenueManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
  const [revenueData, setRevenueData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [editingSplits, setEditingSplits] = useState(null);
  const [splitForm, setSplitForm] = useState({});

  const typeOptions = ["All Types", "Clubs", "Athletes", "Universities", "Teams"];
  const revenueTypes = [
    { key: 'clubSplit', label: 'Club/Team Share', color: 'bg-blue-500' },
    { key: 'fanSplit', label: 'Fan Share', color: 'bg-green-500' },
    { key: 'marketingSplit', label: 'Marketing', color: 'bg-yellow-500' },
    { key: 'profitSplit', label: 'FanEKT Profit', color: 'bg-purple-500' }
  ];

  // Mock data for revenue splits
  const mockRevenueData = [
    {
      id: 1,
      name: "FC Barcelona",
      type: "Club",
      totalRevenue: 50000,
      clubSplit: 50,
      fanSplit: 25,
      marketingSplit: 15,
      profitSplit: 10,
      fanEarnings: 12500,
      fanCount: 1500,
      averageFanEarning: 8.33
    },
    {
      id: 2,
      name: "Real Madrid CF",
      type: "Club",
      totalRevenue: 75000,
      clubSplit: 50,
      fanSplit: 25,
      marketingSplit: 15,
      profitSplit: 10,
      fanEarnings: 18750,
      fanCount: 2200,
      averageFanEarning: 8.52
    },
    {
      id: 3,
      name: "Lionel Messi",
      type: "Athlete",
      totalRevenue: 30000,
      clubSplit: 60,
      fanSplit: 20,
      marketingSplit: 12,
      profitSplit: 8,
      fanEarnings: 6000,
      fanCount: 800,
      averageFanEarning: 7.50
    },
    {
      id: 4,
      name: "University of Michigan",
      type: "University",
      totalRevenue: 25000,
      clubSplit: 45,
      fanSplit: 30,
      marketingSplit: 15,
      profitSplit: 10,
      fanEarnings: 7500,
      fanCount: 1200,
      averageFanEarning: 6.25
    },
    {
      id: 5,
      name: "LA Lakers",
      type: "Team",
      totalRevenue: 45000,
      clubSplit: 55,
      fanSplit: 22,
      marketingSplit: 13,
      profitSplit: 10,
      fanEarnings: 9900,
      fanCount: 1800,
      averageFanEarning: 5.50
    }
  ];

  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setRevenueData(mockRevenueData);
      setFilteredData(mockRevenueData);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = revenueData;

    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(lowerSearch) ||
        item.type.toLowerCase().includes(lowerSearch)
      );
    }

    if (typeFilter !== "All Types") {
      filtered = filtered.filter(item => item.type === typeFilter.replace("s", ""));
    }

    setFilteredData(filtered);
    setCurrentPage(1);
  }, [searchTerm, typeFilter, revenueData]);

  const handleEditSplits = (item) => {
    setEditingSplits(item.id);
    setSplitForm({
      clubSplit: item.clubSplit,
      fanSplit: item.fanSplit,
      marketingSplit: item.marketingSplit,
      profitSplit: item.profitSplit
    });
  };

  const handleSaveSplits = (itemId) => {
    const total = parseFloat(splitForm.clubSplit) + parseFloat(splitForm.fanSplit) + 
                  parseFloat(splitForm.marketingSplit) + parseFloat(splitForm.profitSplit);
    
    if (total !== 100) {
      alert("Revenue splits must total 100%");
      return;
    }

    setRevenueData(prevData =>
      prevData.map(item =>
        item.id === itemId
          ? {
              ...item,
              clubSplit: parseFloat(splitForm.clubSplit),
              fanSplit: parseFloat(splitForm.fanSplit),
              marketingSplit: parseFloat(splitForm.marketingSplit),
              profitSplit: parseFloat(splitForm.profitSplit),
              fanEarnings: (item.totalRevenue * parseFloat(splitForm.fanSplit)) / 100
            }
          : item
      )
    );
    setFilteredData(prevData =>
      prevData.map(item =>
        item.id === itemId
          ? {
              ...item,
              clubSplit: parseFloat(splitForm.clubSplit),
              fanSplit: parseFloat(splitForm.fanSplit),
              marketingSplit: parseFloat(splitForm.marketingSplit),
              profitSplit: parseFloat(splitForm.profitSplit),
              fanEarnings: (item.totalRevenue * parseFloat(splitForm.fanSplit)) / 100
            }
          : item
      )
    );
    setEditingSplits(null);
    setSplitForm({});
  };

  const handleCancelSplits = () => {
    setEditingSplits(null);
    setSplitForm({});
  };

  const handleSplitChange = (field, value) => {
    setSplitForm(prev => ({ ...prev, [field]: value }));
  };

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const formatCurrency = (amount) => `$${amount.toLocaleString()}`;
  const formatPercentage = (percent) => `${percent}%`;

  // Summary calculations
  const totalRevenue = filteredData.reduce((acc, item) => acc + item.totalRevenue, 0);
  const totalFanEarnings = filteredData.reduce((acc, item) => acc + item.fanEarnings, 0);
  const totalFanCount = filteredData.reduce((acc, item) => acc + item.fanCount, 0);
  const avgFanEarning = totalFanCount > 0 ? totalFanEarnings / totalFanCount : 0;

  return (
    <div className="lg:ml-[290px] px-4 lg:px-6 py-3 lg:pb-5 lg:pt-5 pt-28">
      <div className="flex flex-wrap gap-4 justify-between">
        <div>
          <p className="text-2xl font-medium text-white">Revenue Management</p>
          <p className="text-[14px] font-medium text-[#ffffff8b]">
            Manage revenue splits, commissions, and professional account earnings
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-pink-600 text-white font-medium hover:from-blue-700 hover:to-pink-700 transition-all shadow-lg">
            <BarChart3 size={20} />
            Generate Report
          </button>
          <button className="flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-gray-800 font-medium hover:bg-gray-100 transition-all shadow-lg">
            <TrendingUp size={20} />
            Export Earnings
          </button>
        </div>
      </div>

      <div className="bg-[#3135543d] rounded-xl mt-6 border border-[#1584f259] p-5">
        <div className="max-w-7xl mx-auto">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-400 text-sm font-medium">Total Revenue</p>
                  <p className="text-white text-2xl font-bold">{formatCurrency(totalRevenue)}</p>
                </div>
                <DollarSign className="text-blue-400 text-3xl" />
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/30 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-400 text-sm font-medium">Fan Earnings</p>
                  <p className="text-white text-2xl font-bold">{formatCurrency(totalFanEarnings)}</p>
                </div>
                <Users className="text-green-400 text-3xl" />
              </div>
            </div>
            <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-400 text-sm font-medium">Active Fans</p>
                  <p className="text-white text-2xl font-bold">{totalFanCount.toLocaleString()}</p>
                </div>
                <Percent className="text-yellow-400 text-3xl" />
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/30 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-400 text-sm font-medium">Avg Fan Earning</p>
                  <p className="text-white text-2xl font-bold">{formatCurrency(avgFanEarning)}</p>
                </div>
                <DollarSign className="text-purple-400 text-3xl" />
              </div>
            </div>
          </div>

          {/* Search + Filters */}
          <div className="flex items-center flex-wrap justify-between mb-6 gap-4">
            <div className="relative">
              <input
                placeholder="Search by name or type..."
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="sm:w-[400px] w-full ps-10 pe-3 py-3 rounded-lg bg-[#ffffff0d] border border-[#42527a] text-white placeholder:text-[#ffffff8b]"
              />
              <Search className="w-[20px] absolute top-3.5 left-3 text-white/60" />
            </div>

            <div className="flex gap-3 flex-wrap">
              {/* Type Filter */}
              <div className="relative">
                <button
                  onClick={() => setIsTypeDropdownOpen(!isTypeDropdownOpen)}
                  className="px-4 py-3 rounded-lg justify-between bg-[#ffffff0d] border border-white/50 text-white flex items-center gap-3 hover:bg-white/50 transition-all min-w-[180px]"
                >
                  <span>{typeFilter}</span>
                  <ChevronDown size={20} className={`transition-transform ${isTypeDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {isTypeDropdownOpen && (
                  <div className="absolute top-full mt-2 w-full bg-[#1a1d2e] border border-white/30 rounded-lg shadow-xl z-50 overflow-hidden">
                    {typeOptions.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setTypeFilter(option);
                          setIsTypeDropdownOpen(false);
                        }}
                        className={`w-full px-4 py-3 text-left text-white hover:bg-white/20 transition-colors ${typeFilter === option ? "bg-white/10" : ""}`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Entries Per Page */}
              <div className="relative">
                <button
                  onClick={() => setItemsPerPage(itemsPerPage === 10 ? 25 : 10)}
                  className="px-4 py-3 rounded-lg bg-white/10 border border-white/30 text-white flex items-center gap-2 hover:bg-white/20 transition-all min-w-[120px] justify-between"
                >
                  <span className="font-medium">{itemsPerPage} entries</span>
                  <ChevronDown size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-[#4a4e6a77] backdrop-blur-md rounded-xl overflow-hidden shadow-xl border border-[#42527a]">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1600px]">
                <thead>
                  <tr className="bg-[#4a4e6a] backdrop-blur-sm border-b border-white/40">
                    <th className="px-4 lg:px-6 py-5 text-center text-white font-medium border-r border-white/30 whitespace-nowrap">
                      Organization
                    </th>
                    <th className="px-4 lg:px-6 py-5 text-center text-white font-medium border-r border-white/30 whitespace-nowrap">
                      Type
                    </th>
                    <th className="px-4 lg:px-6 py-5 text-center text-white font-medium border-r border-white/30 whitespace-nowrap">
                      Total Revenue
                    </th>
                    <th className="px-4 lg:px-6 py-5 text-center text-white font-medium border-r border-white/30 whitespace-nowrap">
                      Fan Earnings
                    </th>
                    <th className="px-4 lg:px-6 py-5 text-center text-white font-medium border-r border-white/30 whitespace-nowrap">
                      Fan Count
                    </th>
                    <th className="px-4 lg:px-6 py-5 text-center text-white font-medium border-r border-white/30 whitespace-nowrap">
                      Avg Fan Earning
                    </th>
                    <th className="px-4 lg:px-6 py-5 text-center text-white font-medium border-r border-white/30 whitespace-nowrap">
                      Revenue Splits
                    </th>
                    <th className="px-4 lg:px-6 py-5 text-center text-white font-medium border-r border-white/30 whitespace-nowrap">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    Array.from({ length: itemsPerPage }).map((_, index) => (
                      <tr key={index} className="border-b border-white/20 animate-pulse">
                        {Array.from({ length: 8 }).map((_, cellIndex) => (
                          <td key={cellIndex} className="px-4 lg:px-6 py-6 border-r border-white/20 text-center">
                            <div className="h-4 bg-white/20 rounded w-24 mx-auto"></div>
                          </td>
                        ))}
                      </tr>
                    ))
                  ) : currentItems.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="text-center py-16 text-white/70">
                        <div className="flex flex-col items-center">
                          <DollarSign className="text-6xl text-white/20 mb-4" />
                          <h3 className="text-xl font-semibold mb-2">No Revenue Data Found</h3>
                          <p className="text-sm">No revenue data found matching your criteria.</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    currentItems.map((item, index) => (
                      <tr key={index} className="border-b border-white/20 hover:bg-white/20 transition-colors">
                        {/* Organization */}
                        <td className="px-4 lg:px-6 py-6 text-white/90 border-r border-white/20 text-center whitespace-nowrap">
                          <div className="text-left">
                            <p className="font-medium">{item.name}</p>
                            <span className="inline-block mt-1 px-2 py-1 bg-white/10 rounded-full text-xs text-white/70">
                              {item.type}
                            </span>
                          </div>
                        </td>
                        
                        {/* Type */}
                        <td className="px-4 lg:px-6 py-6 text-white/90 border-r border-white/20 text-center whitespace-nowrap">
                          <span className={`inline-block px-3 py-1 rounded-full text-white font-semibold ${item.type === 'Club' ? 'bg-blue-500' : item.type === 'Athlete' ? 'bg-green-500' : item.type === 'University' ? 'bg-yellow-500' : 'bg-purple-500'}`}>
                            {item.type}
                          </span>
                        </td>

                        {/* Total Revenue */}
                        <td className="px-4 lg:px-6 py-6 text-white/90 border-r border-white/20 text-center whitespace-nowrap">
                          <span className="font-semibold">{formatCurrency(item.totalRevenue)}</span>
                        </td>

                        {/* Fan Earnings */}
                        <td className="px-4 lg:px-6 py-6 text-white/90 border-r border-white/20 text-center whitespace-nowrap">
                          <span className="text-green-400 font-semibold">{formatCurrency(item.fanEarnings)}</span>
                        </td>

                        {/* Fan Count */}
                        <td className="px-4 lg:px-6 py-6 text-white/90 border-r border-white/20 text-center whitespace-nowrap">
                          <span className="font-semibold">{item.fanCount.toLocaleString()}</span>
                        </td>

                        {/* Avg Fan Earning */}
                        <td className="px-4 lg:px-6 py-6 text-white/90 border-r border-white/20 text-center whitespace-nowrap">
                          <span className="text-blue-400 font-semibold">{formatCurrency(item.averageFanEarning)}</span>
                        </td>

                        {/* Revenue Splits */}
                        <td className="px-4 lg:px-6 py-6 border-r border-white/20 text-center whitespace-nowrap">
                          {editingSplits === item.id ? (
                            <div className="grid grid-cols-2 gap-2">
                              {revenueTypes.map((type) => (
                                <div key={type.key} className="flex flex-col gap-1">
                                  <label className="text-xs text-white/60">{type.label}</label>
                                  <input
                                    type="number"
                                    step="0.1"
                                    value={splitForm[type.key] || item[type.key]}
                                    onChange={(e) => handleSplitChange(type.key, e.target.value)}
                                    className="w-full px-2 py-1 bg-white/10 border border-white/30 rounded text-white text-center text-sm"
                                  />
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="grid grid-cols-2 gap-2">
                              {revenueTypes.map((type) => (
                                <div key={type.key} className="flex flex-col gap-1">
                                  <span className={`inline-block px-2 py-1 rounded text-white text-xs font-semibold ${type.color}`}>
                                    {formatPercentage(item[type.key])}
                                  </span>
                                  <span className="text-xs text-white/60">{type.label}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="px-4 lg:px-6 py-6 text-center">
                          {editingSplits === item.id ? (
                            <div className="flex gap-2 justify-center">
                              <button
                                onClick={() => handleSaveSplits(item.id)}
                                className="p-2 bg-green-500/20 border border-green-500/30 rounded-lg hover:bg-green-500/30 transition-colors"
                              >
                                <Settings size={18} className="text-green-400" />
                              </button>
                              <button
                                onClick={handleCancelSplits}
                                className="p-2 bg-red-500/20 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition-colors"
                              >
                                <Settings size={18} className="text-red-400" />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => handleEditSplits(item)}
                              className="p-2 bg-blue-500/20 border border-blue-500/30 rounded-lg hover:bg-blue-500/30 transition-colors"
                            >
                              <Settings size={18} className="text-blue-400" />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {!loading && (
            <div className="flex items-center justify-between mt-7 flex-wrap gap-4">
              <div className="text-white/70 text-sm">
                Showing {filteredData.length > 0 ? indexOfFirstItem + 1 : 0} to{" "}
                {Math.min(indexOfLastItem, filteredData.length)} of {filteredData.length} organizations
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-lg border border-white/30 text-white transition-all ${
                    currentPage === 1 ? "bg-white/5 cursor-not-allowed opacity-50" : "bg-white/10 hover:bg-white/20"
                  }`}
                >
                  <ChevronLeft size={20} />
                </button>

                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const startPage = Math.max(1, currentPage - 2);
                  const endPage = Math.min(totalPages, startPage + 4);
                  const page = startPage + i;
                  
                  if (page <= endPage) {
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${
                          currentPage === page
                            ? "bg-blue-500 text-white shadow-lg"
                            : "bg-white/10 border border-white/30 text-white hover:bg-white/20"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  }
                  return null;
                })}

                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages || totalPages === 0}
                  className={`p-2 rounded-lg border border-white/30 text-white transition-all ${
                    currentPage === totalPages || totalPages === 0
                      ? "bg-white/5 cursor-not-allowed opacity-50"
                      : "bg-white/10 hover:bg-white/20"
                  }`}
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RevenueManagement;