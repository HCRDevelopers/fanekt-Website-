import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronLeft, ChevronRight, Search, Target, Users, DollarSign, BarChart3, Calendar, Edit, Eye, TrendingUp } from "lucide-react";

const CampaignManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const statusOptions = ["All Status", "Draft", "Active", "Paused", "Completed", "Expired"];
  const typeOptions = ["All Types", "Message Only", "NFC Required", "Verified Fans Only"];
  const campaignTypes = [
    { key: 'messageOnly', label: 'Message Only', color: 'bg-blue-500', icon: Eye },
    { key: 'nfcRequired', label: 'NFC Required', color: 'bg-green-500', icon: Target },
    { key: 'verifiedOnly', label: 'Verified Fans Only', color: 'bg-purple-500', icon: Users }
  ];

  // Mock data for campaigns
  const mockCampaigns = [
    {
      id: 1,
      name: "Summer Promotion Campaign",
      sponsor: "Coca-Cola",
      type: "messageOnly",
      status: "Active",
      budget: 10000,
      spent: 3500,
      targetFans: 5000,
      reachedFans: 2800,
      conversionRate: 56,
      startDate: "2024-06-01",
      endDate: "2024-08-31",
      targeting: {
        clubs: ["FC Barcelona", "Real Madrid"],
        athletes: ["Lionel Messi"],
        countries: ["Spain", "France", "Italy"],
        ageRange: "18-35",
        gender: "All"
      },
      rewards: {
        totalBudget: 10000,
        perFan: 2.00,
        currency: "FNKT"
      }
    },
    {
      id: 2,
      name: "NFC Scan Challenge",
      sponsor: "Nike",
      type: "nfcRequired",
      status: "Active",
      budget: 15000,
      spent: 8200,
      targetFans: 3000,
      reachedFans: 1200,
      conversionRate: 40,
      startDate: "2024-06-15",
      endDate: "2024-07-15",
      targeting: {
        clubs: ["Manchester United"],
        athletes: [],
        countries: ["UK", "USA"],
        ageRange: "16-40",
        gender: "All"
      },
      rewards: {
        totalBudget: 15000,
        perFan: 12.50,
        currency: "FNKT"
      }
    },
    {
      id: 3,
      name: "Verified Fan Exclusive",
      sponsor: "Adidas",
      type: "verifiedOnly",
      status: "Completed",
      budget: 8000,
      spent: 8000,
      targetFans: 2000,
      reachedFans: 1850,
      conversionRate: 92.5,
      startDate: "2024-05-01",
      endDate: "2024-05-31",
      targeting: {
        clubs: ["Bayern Munich"],
        athletes: ["Robert Lewandowski"],
        countries: ["Germany"],
        ageRange: "18-45",
        gender: "All"
      },
      rewards: {
        totalBudget: 8000,
        perFan: 4.32,
        currency: "FNKT"
      }
    },
    {
      id: 4,
      name: "Student Discount Drive",
      sponsor: "Pepsi",
      type: "messageOnly",
      status: "Draft",
      budget: 5000,
      spent: 0,
      targetFans: 8000,
      reachedFans: 0,
      conversionRate: 0,
      startDate: "2024-07-01",
      endDate: "2024-09-30",
      targeting: {
        clubs: [],
        athletes: [],
        countries: ["USA", "Canada"],
        ageRange: "16-25",
        gender: "All"
      },
      rewards: {
        totalBudget: 5000,
        perFan: 0.63,
        currency: "FNKT"
      }
    }
  ];

  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setCampaigns(mockCampaigns);
      setFilteredCampaigns(mockCampaigns);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = campaigns;

    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(campaign =>
        campaign.name.toLowerCase().includes(lowerSearch) ||
        campaign.sponsor.toLowerCase().includes(lowerSearch)
      );
    }

    if (statusFilter !== "All Status") {
      filtered = filtered.filter(campaign => campaign.status === statusFilter);
    }

    if (typeFilter !== "All Types") {
      const typeKey = typeFilter.toLowerCase().replace(/\s+/g, '');
      filtered = filtered.filter(campaign => campaign.type === typeKey);
    }

    setFilteredCampaigns(filtered);
    setCurrentPage(1);
  }, [searchTerm, statusFilter, typeFilter, campaigns]);

  const handleStatusChange = (campaignId, newStatus) => {
    setCampaigns(prevCampaigns =>
      prevCampaigns.map(campaign =>
        campaign.id === campaignId ? { ...campaign, status: newStatus } : campaign
      )
    );
    setFilteredCampaigns(prevCampaigns =>
      prevCampaigns.map(campaign =>
        campaign.id === campaignId ? { ...campaign, status: newStatus } : campaign
      )
    );
  };

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "bg-green-500 text-white";
      case "completed":
        return "bg-blue-500 text-white";
      case "paused":
        return "bg-yellow-500 text-white";
      case "draft":
        return "bg-gray-500 text-white";
      case "expired":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-200 text-gray-700";
    }
  };

  const getBudgetPercentage = (spent, budget) => {
    return budget > 0 ? Math.round((spent / budget) * 100) : 0;
  };

  const totalPages = Math.ceil(filteredCampaigns.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCampaigns.slice(indexOfFirstItem, indexOfLastItem);

  const formatCurrency = (amount) => `${amount} FNKT`;
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  // Summary calculations
  const totalBudget = filteredCampaigns.reduce((acc, campaign) => acc + campaign.budget, 0);
  const totalSpent = filteredCampaigns.reduce((acc, campaign) => acc + campaign.spent, 0);
  const totalTargetFans = filteredCampaigns.reduce((acc, campaign) => acc + campaign.targetFans, 0);
  const totalReachedFans = filteredCampaigns.reduce((acc, campaign) => acc + campaign.reachedFans, 0);
  const avgConversionRate = filteredCampaigns.length > 0 
    ? (filteredCampaigns.reduce((acc, campaign) => acc + campaign.conversionRate, 0) / filteredCampaigns.length).toFixed(1)
    : 0;

  return (
    <div className="lg:ml-[290px] px-4 lg:px-6 py-3 lg:pb-5 lg:pt-5 pt-28">
      <div className="flex flex-wrap gap-4 justify-between">
        <div>
          <p className="text-2xl font-medium text-white">Campaign Management</p>
          <p className="text-[14px] font-medium text-[#ffffff8b]">
            Manage sponsor campaigns with budget tiers, conversion tracking, and weekly competitions
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-pink-600 text-white font-medium hover:from-blue-700 hover:to-pink-700 transition-all shadow-lg">
            <Edit size={20} />
            Create Campaign
          </button>
          <button className="flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-gray-800 font-medium hover:bg-gray-100 transition-all shadow-lg">
            <BarChart3 size={20} />
            Analytics
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
                  <p className="text-blue-400 text-sm font-medium">Total Budget</p>
                  <p className="text-white text-2xl font-bold">{formatCurrency(totalBudget)}</p>
                </div>
                <DollarSign className="text-blue-400 text-3xl" />
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/30 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-400 text-sm font-medium">Total Spent</p>
                  <p className="text-white text-2xl font-bold">{formatCurrency(totalSpent)}</p>
                </div>
                <TrendingUp className="text-green-400 text-3xl" />
              </div>
            </div>
            <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-400 text-sm font-medium">Reached Fans</p>
                  <p className="text-white text-2xl font-bold">{totalReachedFans.toLocaleString()}</p>
                </div>
                <Users className="text-yellow-400 text-3xl" />
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/30 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-400 text-sm font-medium">Avg Conversion</p>
                  <p className="text-white text-2xl font-bold">{avgConversionRate}%</p>
                </div>
                <Target className="text-purple-400 text-3xl" />
              </div>
            </div>
          </div>

          {/* Search + Filters */}
          <div className="flex items-center flex-wrap justify-between mb-6 gap-4">
            <div className="relative">
              <input
                placeholder="Search campaigns by name or sponsor..."
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="sm:w-[400px] w-full ps-10 pe-3 py-3 rounded-lg bg-[#ffffff0d] border border-[#42527a] text-white placeholder:text-[#ffffff8b]"
              />
              <Search className="w-[20px] absolute top-3.5 left-3 text-white/60" />
            </div>

            <div className="flex gap-3 flex-wrap">
              {/* Status Filter */}
              <div className="relative">
                <button
                  onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
                  className="px-4 py-3 rounded-lg justify-between bg-[#ffffff0d] border border-white/50 text-white flex items-center gap-3 hover:bg-white/50 transition-all min-w-[180px]"
                >
                  <span>{statusFilter}</span>
                  <ChevronDown size={20} className={`transition-transform ${isStatusDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {isStatusDropdownOpen && (
                  <div className="absolute top-full mt-2 w-full bg-[#1a1d2e] border border-white/30 rounded-lg shadow-xl z-50 overflow-hidden">
                    {statusOptions.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setStatusFilter(option);
                          setIsStatusDropdownOpen(false);
                        }}
                        className={`w-full px-4 py-3 text-left text-white hover:bg-white/20 transition-colors ${statusFilter === option ? "bg-white/10" : ""}`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>

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
              <table className="w-full min-w-[1800px]">
                <thead>
                  <tr className="bg-[#4a4e6a] backdrop-blur-sm border-b border-white/40">
                    <th className="px-4 lg:px-6 py-5 text-center text-white font-medium border-r border-white/30 whitespace-nowrap">
                      Campaign
                    </th>
                    <th className="px-4 lg:px-6 py-5 text-center text-white font-medium border-r border-white/30 whitespace-nowrap">
                      Sponsor
                    </th>
                    <th className="px-4 lg:px-6 py-5 text-center text-white font-medium border-r border-white/30 whitespace-nowrap">
                      Type
                    </th>
                    <th className="px-4 lg:px-6 py-5 text-center text-white font-medium border-r border-white/30 whitespace-nowrap">
                      Status
                    </th>
                    <th className="px-4 lg:px-6 py-5 text-center text-white font-medium border-r border-white/30 whitespace-nowrap">
                      Budget / Spent
                    </th>
                    <th className="px-4 lg:px-6 py-5 text-center text-white font-medium border-r border-white/30 whitespace-nowrap">
                      Target / Reached
                    </th>
                    <th className="px-4 lg:px-6 py-5 text-center text-white font-medium border-r border-white/30 whitespace-nowrap">
                      Conversion Rate
                    </th>
                    <th className="px-4 lg:px-6 py-5 text-center text-white font-medium border-r border-white/30 whitespace-nowrap">
                      Dates
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
                        {Array.from({ length: 9 }).map((_, cellIndex) => (
                          <td key={cellIndex} className="px-4 lg:px-6 py-6 border-r border-white/20 text-center">
                            <div className="h-4 bg-white/20 rounded w-24 mx-auto"></div>
                          </td>
                        ))}
                      </tr>
                    ))
                  ) : currentItems.length === 0 ? (
                    <tr>
                      <td colSpan="9" className="text-center py-16 text-white/70">
                        <div className="flex flex-col items-center">
                          <Target className="text-6xl text-white/20 mb-4" />
                          <h3 className="text-xl font-semibold mb-2">No Campaigns Found</h3>
                          <p className="text-sm">No campaigns found matching your criteria.</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    currentItems.map((campaign, index) => (
                      <tr key={index} className="border-b border-white/20 hover:bg-white/20 transition-colors">
                        {/* Campaign Info */}
                        <td className="px-4 lg:px-6 py-6 text-white/90 border-r border-white/20 text-center whitespace-nowrap">
                          <div className="text-left">
                            <p className="font-medium">{campaign.name}</p>
                            <span className="inline-block mt-1 px-2 py-1 bg-white/10 rounded-full text-xs text-white/70">
                              {campaignTypes.find(t => t.key === campaign.type)?.label || campaign.type}
                            </span>
                          </div>
                        </td>
                        
                        {/* Sponsor */}
                        <td className="px-4 lg:px-6 py-6 text-white/90 border-r border-white/20 text-center whitespace-nowrap">
                          <span className="font-semibold">{campaign.sponsor}</span>
                        </td>

                        {/* Type */}
                        <td className="px-4 lg:px-6 py-6 border-r border-white/20 text-center whitespace-nowrap">
                          <span className={`inline-block px-3 py-1 rounded-full text-white font-semibold ${campaignTypes.find(t => t.key === campaign.type)?.color || 'bg-gray-500'}`}>
                            {campaignTypes.find(t => t.key === campaign.type)?.label || campaign.type}
                          </span>
                        </td>

                        {/* Status */}
                        <td className="px-4 lg:px-6 py-6 border-r border-white/20 text-center whitespace-nowrap">
                          <div className="flex flex-col gap-2">
                            <span className={`px-3 lg:px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap ${getStatusStyle(campaign.status)}`}>
                              {campaign.status}
                            </span>
                            {campaign.status === 'Active' && (
                              <select
                                value={campaign.status}
                                onChange={(e) => handleStatusChange(campaign.id, e.target.value)}
                                className="w-full px-2 py-1 bg-white/10 border border-white/30 rounded text-white text-xs"
                              >
                                <option value="Active">Active</option>
                                <option value="Paused">Paused</option>
                                <option value="Completed">Completed</option>
                              </select>
                            )}
                          </div>
                        </td>

                        {/* Budget/Spent */}
                        <td className="px-4 lg:px-6 py-6 border-r border-white/20 text-center whitespace-nowrap">
                          <div className="flex flex-col gap-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-white/60">Budget:</span>
                              <span className="font-semibold">{formatCurrency(campaign.budget)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-white/60">Spent:</span>
                              <span className="text-green-400 font-semibold">{formatCurrency(campaign.spent)}</span>
                            </div>
                            <div className="w-full bg-white/20 rounded-full h-2">
                              <div 
                                className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full"
                                style={{ width: `${getBudgetPercentage(campaign.spent, campaign.budget)}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-white/60">{getBudgetPercentage(campaign.spent, campaign.budget)}% used</span>
                          </div>
                        </td>

                        {/* Target/Reached */}
                        <td className="px-4 lg:px-6 py-6 border-r border-white/20 text-center whitespace-nowrap">
                          <div className="flex flex-col gap-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-white/60">Target:</span>
                              <span className="font-semibold">{campaign.targetFans.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-white/60">Reached:</span>
                              <span className="text-blue-400 font-semibold">{campaign.reachedFans.toLocaleString()}</span>
                            </div>
                            <div className="w-full bg-white/20 rounded-full h-2">
                              <div 
                                className="bg-gradient-to-r from-yellow-500 to-blue-500 h-2 rounded-full"
                                style={{ width: `${Math.min(100, Math.round((campaign.reachedFans / campaign.targetFans) * 100))}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-white/60">{Math.min(100, Math.round((campaign.reachedFans / campaign.targetFans) * 100))}% reached</span>
                          </div>
                        </td>

                        {/* Conversion Rate */}
                        <td className="px-4 lg:px-6 py-6 border-r border-white/20 text-center whitespace-nowrap">
                          <div className="flex flex-col gap-2">
                            <span className="text-2xl font-bold text-green-400">{campaign.conversionRate}%</span>
                            <span className="text-xs text-white/60">Conversion Rate</span>
                          </div>
                        </td>

                        {/* Dates */}
                        <td className="px-4 lg:px-6 py-6 border-r border-white/20 text-center whitespace-nowrap">
                          <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2 text-sm">
                              <Calendar size={16} className="text-white/60" />
                              <span className="text-white/60">Start:</span>
                              <span>{formatDate(campaign.startDate)}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Calendar size={16} className="text-white/60" />
                              <span className="text-white/60">End:</span>
                              <span>{formatDate(campaign.endDate)}</span>
                            </div>
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="px-4 lg:px-6 py-6 text-center">
                          <div className="flex gap-2 justify-center">
                            <button className="p-2 bg-blue-500/20 border border-blue-500/30 rounded-lg hover:bg-blue-500/30 transition-colors">
                              <Eye size={18} className="text-blue-400" />
                            </button>
                            <button className="p-2 bg-green-500/20 border border-green-500/30 rounded-lg hover:bg-green-500/30 transition-colors">
                              <Edit size={18} className="text-green-400" />
                            </button>
                            <button className="p-2 bg-purple-500/20 border border-purple-500/30 rounded-lg hover:bg-purple-500/30 transition-colors">
                              <BarChart3 size={18} className="text-purple-400" />
                            </button>
                          </div>
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
                Showing {filteredCampaigns.length > 0 ? indexOfFirstItem + 1 : 0} to{" "}
                {Math.min(indexOfLastItem, filteredCampaigns.length)} of {filteredCampaigns.length} campaigns
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

export default CampaignManagement;