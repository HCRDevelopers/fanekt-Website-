import React, { useEffect, useState, useCallback } from "react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import Search from "./assets/search.png";
import CreateNewCompaignModal from "./Modals/CreateNewCompaignModal";
import { getAllCompaigns } from "../../../API/apiService";

const BroadCasts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [campaigns, setCampaigns] = useState([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [createCampaignModal, setCreateCampaignModal] = useState(false);

  // pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [total, setTotal] = useState(0);

  // Open / Close Modal
  const openCampaignModal = () => setCreateCampaignModal(true);
  const closeCampaignModal = () => setCreateCampaignModal(false);

  // Fetch campaigns with pagination
  const fetchData = useCallback(
    async (page = 1, perPageValue = perPage) => {
      setLoading(true);
      try {
        const response = await getAllCompaigns(page, perPageValue); // assuming your API supports pagination
        if (response) {
          const data = response.data;
          setCampaigns(data.data || []);
          setFilteredCampaigns(data.data || []);
          setCurrentPage(data.current_page || 1);
          setLastPage(data.last_page || 1);
          setTotal(data.total || 0);
        } else {
          setCampaigns([]);
          setFilteredCampaigns([]);
        }
      } catch (error) {
        console.error("Error fetching campaigns:", error);
        setCampaigns([]);
        setFilteredCampaigns([]);
      } finally {
        setLoading(false);
      }
    },
    [perPage]
  );

  useEffect(() => {
    fetchData(currentPage, perPage);
  }, [fetchData, currentPage, perPage]);

  // Filter campaigns on search
  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const filtered = campaigns.filter((item) =>
      item.title.toLowerCase().includes(term)
    );
    setFilteredCampaigns(filtered);
  }, [searchTerm, campaigns]);

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Handle pagination navigation
  const handleNextPage = () => {
    if (currentPage < lastPage) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handlePerPageChange = (value) => {
    setPerPage(value);
    setCurrentPage(1);
  };

  return (
    <>
      <CreateNewCompaignModal
        isOpen={createCampaignModal}
        onClose={closeCampaignModal}
        onAdd={fetchData}
      />

      <div className="lg:ml-[290px] px-4 lg:px-6 py-3 lg:pb-5 lg:pt-5 pt-28">
        {/* Header */}
        <div className="flex flex-wrap gap-4 justify-between">
          <div>
            <p className="text-2xl font-medium text-white">
              Broadcast Management
            </p>
            <p className="text-[14px] font-medium text-[#ffffff8b]">
              Monitor and manage all broadcast campaigns in the system
            </p>
          </div>
        </div>

        {/* Main Table Section */}
        <div className="bg-[#3135543d] rounded-xl mt-6 border border-[#1584f259] p-5">
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="flex items-center flex-wrap justify-between mb-6 gap-4">
              {/* Search Bar */}
              <div className="relative">
                <input
                  placeholder="Search..."
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="sm:w-[350px] w-full ps-10 pe-3 py-3 rounded-lg bg-[#ffffff0d] border border-[#42527a] text-white placeholder:text-[#ffffff8b]"
                />
                <img
                  src={Search}
                  className="w-[20px] absolute top-3.5 left-3"
                  alt=""
                />
              </div>

              {/* Create Button */}
              <button
                onClick={openCampaignModal}
                className="px-8 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-pink-600 text-white font-medium hover:from-blue-700 hover:to-pink-700 transition-all shadow-lg"
              >
                New Campaign
              </button>
            </div>

            {/* Table */}
            <div className="bg-[#4a4e6a77] backdrop-blur-md rounded-xl overflow-hidden shadow-xl border border-[#42527a]">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px]">
                  <thead>
                    <tr className="bg-[#4a4e6a] border-b border-white/40">
                      <th className="px-4 lg:px-6 py-5 text-center text-white font-medium border-r border-white/30 whitespace-nowrap">
                        Campaign ID
                      </th>
                      <th className="px-4 lg:px-6 py-5 text-center text-white font-medium border-r border-white/30 whitespace-nowrap">
                        Title
                      </th>
                      <th className="px-4 lg:px-6 py-5 text-center text-white font-medium border-r border-white/30 whitespace-nowrap">
                        Recipients
                      </th>
                      <th className="px-4 lg:px-6 py-5 text-center text-white font-medium whitespace-nowrap">
                        Sent Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td
                          colSpan="4"
                          className="text-center text-white/70 py-8"
                        >
                          Loading campaigns...
                        </td>
                      </tr>
                    ) : filteredCampaigns.length === 0 ? (
                      <tr>
                        <td
                          colSpan="4"
                          className="text-center text-white/70 py-8"
                        >
                          No campaigns found.
                        </td>
                      </tr>
                    ) : (
                      filteredCampaigns.map((campaign, index) => (
                        <tr
                          key={campaign.id || index}
                          className="border-b border-white/20 hover:bg-white/20 transition-colors"
                        >
                          <td className="px-4 lg:px-6 py-6 text-white/90 border-r border-white/20 text-center whitespace-nowrap">
                            CMP{campaign.id.toString().padStart(3, "0")}
                          </td>
                          <td className="px-4 lg:px-6 py-6 text-white/90 border-r border-white/20 text-center whitespace-nowrap">
                            {campaign.title}
                          </td>
                          <td className="px-4 lg:px-6 py-6 text-white/90 border-r border-white/20 text-center whitespace-nowrap">
                            {campaign.recipients}
                          </td>
                          <td className="px-4 lg:px-6 py-6 text-white/90 text-center whitespace-nowrap">
                            {formatDate(campaign.created_at)}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination Section */}
            <div className="flex items-center justify-between mt-7 flex-wrap gap-4">
              <div className="text-white/70 text-sm">
                Showing {(currentPage - 1) * perPage + 1} to{" "}
                {Math.min(currentPage * perPage, total)} of {total}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-lg border border-white/30 text-white transition-all ${
                    currentPage === 1
                      ? "opacity-40 cursor-not-allowed bg-white/10"
                      : "hover:bg-white/20 bg-white/10"
                  }`}
                >
                  <ChevronLeft size={20} />
                </button>

                {[...Array(lastPage)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-4 py-2 rounded-lg font-medium shadow-lg transition-all ${
                      currentPage === i + 1
                        ? "bg-blue-500 text-white"
                        : "bg-white/10 border border-white/30 text-white hover:bg-white/20"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={handleNextPage}
                  disabled={currentPage === lastPage}
                  className={`p-2 rounded-lg border border-white/30 text-white transition-all ${
                    currentPage === lastPage
                      ? "opacity-40 cursor-not-allowed bg-white/10"
                      : "hover:bg-white/20 bg-white/10"
                  }`}
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Per Page Dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-white/70 text-sm">Show</span>
                <div className="relative">
                  <select
                    value={perPage}
                    onChange={(e) =>
                      handlePerPageChange(Number(e.target.value))
                    }
                    className="px-4 py-2 rounded-lg bg-white/10 border border-white/30 text-white cursor-pointer focus:outline-none min-w-[120px]"
                  >
                    {[10, 25, 50].map((num) => (
                      <option
                        key={num}
                        value={num}
                        className="bg-[#1e1e1e] text-white"
                      >
                        {num} entries
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BroadCasts;
