import React, { useCallback, useEffect, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import Search from "./assets/search.png";
import View from "./assets/view.png";
import FanDetailModal from "./Modals/FanDetailModal";
import { getAllFanUsers } from "../../../API/apiService";

const FanManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [fanModal, setFanModal] = useState(false);
  const [fans, setFans] = useState([]);
  const [filteredFans, setFilteredFans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedFan, setSelectedFan] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [total, setTotal] = useState(0);

  const openFanModal = (fan) => {
    setSelectedFan(fan);
    setFanModal(true);
  };

  const closeFanModal = () => {
    setFanModal(false);
    setSelectedFan(null);
  };

  // Fetch fan users data
  const fetchFanUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getAllFanUsers();
      const data = response?.data;

      if (data?.status && data?.data?.users) {
        // Transform API data to match component structure
        const transformedData = data.data.users.map(user => ({
          id: user.id,
          name: user.name,
          email: user.email,
          city: user.city,
          age: user.fan?.age || null,
          preferredSport: user.fan?.preferred_sport || null,
          country: user.country,
          createdAt: user.created_at,
          updatedAt: user.updated_at,
          fan: user.fan // Keep full fan data for modal
        }));

        setFans(transformedData);
        setFilteredFans(transformedData);
        setTotal(transformedData.length);
        setLastPage(Math.ceil(transformedData.length / perPage));
      }
    } catch (error) {
      console.error("Error fetching fan users:", error);
      setFans([]);
      setFilteredFans([]);
      setTotal(0);
      setLastPage(1);
    } finally {
      setLoading(false);
    }
  }, [perPage]);

  useEffect(() => {
    fetchFanUsers();
  }, [fetchFanUsers]);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredFans(fans);
      return;
    }

    const lowerSearch = searchTerm.toLowerCase();

    const filtered = fans.filter(
      (fan) =>
        fan.name?.toLowerCase().includes(lowerSearch) ||
        fan.email?.toLowerCase().includes(lowerSearch) ||
        fan.city?.toLowerCase().includes(lowerSearch) ||
        fan.preferredSport?.toLowerCase().includes(lowerSearch)
    );

    setFilteredFans(filtered);
  }, [searchTerm, fans]);

  // Pagination controls
  const handleNextPage = () => {
    if (currentPage < lastPage) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handlePerPageChange = (value) => {
    setPerPage(value);
    setCurrentPage(1);
  };

  return (
    <div className="lg:ml-[290px] px-4 lg:px-6 py-3 lg:pb-5 lg:pt-5 pt-28">
      {/* Fan Detail Modal */}
      <FanDetailModal
        isOpen={fanModal}
        onClose={closeFanModal}
        fan={selectedFan}
      />

      {/* Header */}
      <div className="flex flex-wrap gap-4 justify-between">
        <div>
          <p className="text-2xl font-medium text-white">Fan Management</p>
          <p className="text-[14px] font-medium text-[#ffffff8b]">
            Monitor and manage all registered fans
          </p>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-[#3135543d] rounded-xl mt-6 border border-[#1584f259] p-5">
        <div className="max-w-7xl mx-auto">
          {/* Search + Export */}
          <div className="flex items-center flex-wrap justify-between mb-6 gap-4">
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

            <button className="px-8 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-pink-600 text-white font-medium hover:from-blue-700 hover:to-pink-700 transition-all shadow-lg">
              Export CSV
            </button>
          </div>

          {/* Table */}
          <div className="bg-[#4a4e6a77] backdrop-blur-md rounded-xl overflow-hidden shadow-xl border border-[#42527a]">
            <div className="overflow-x-auto table-scroll">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr className="bg-[#4a4e6a] backdrop-blur-sm border-b border-white/40">
                    <th className="px-4 lg:px-6 py-5 text-center text-white font-medium border-r border-white/30">
                      Name
                    </th>
                    <th className="px-4 lg:px-6 py-5 text-center text-white font-medium border-r border-white/30">
                      Email
                    </th>
                    <th className="px-4 lg:px-6 py-5 text-center text-white font-medium border-r border-white/30">
                      Age
                    </th>
                    <th className="px-4 lg:px-6 py-5 text-center text-white font-medium border-r border-white/30">
                      Preferred Sport
                    </th>
                    <th className="px-4 lg:px-6 py-5 text-center text-white font-medium whitespace-nowrap">
                      View
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    // Skeleton Loading
                    Array.from({ length: 5 }).map((_, index) => (
                      <tr key={index} className="border-b border-white/20">
                        <td className="px-4 lg:px-6 py-6 border-r border-white/20 text-center">
                          <div className="h-4 bg-white/20 rounded animate-pulse mx-auto w-24"></div>
                        </td>
                        <td className="px-4 lg:px-6 py-6 border-r border-white/20 text-center">
                          <div className="h-4 bg-white/20 rounded animate-pulse mx-auto w-32"></div>
                        </td>
                        <td className="px-4 lg:px-6 py-6 border-r border-white/20 text-center">
                          <div className="h-4 bg-white/20 rounded animate-pulse mx-auto w-8"></div>
                        </td>
                        <td className="px-4 lg:px-6 py-6 border-r border-white/20 text-center">
                          <div className="h-4 bg-white/20 rounded animate-pulse mx-auto w-16"></div>
                        </td>
                        <td className="px-4 lg:px-6 py-6 text-center">
                          <div className="w-12 h-12 bg-white/20 rounded animate-pulse mx-auto"></div>
                        </td>
                      </tr>
                    ))
                  ) : filteredFans.length === 0 ? (
                    <tr>
                      <td
                        colSpan="5"
                        className="text-center py-8 text-white/70"
                      >
                        No fans found.
                      </td>
                    </tr>
                  ) : (
                    filteredFans.map((fan, index) => (
                      <tr
                        key={index}
                        className="border-b border-white/20 hover:bg-white/20 transition-colors"
                      >
                        <td className="px-4 lg:px-6 py-6 text-white/90 border-r border-white/20 text-center whitespace-nowrap">
                          {fan.name}
                        </td>
                        <td className="px-4 lg:px-6 py-6 text-white/90 border-r border-white/20 text-center whitespace-nowrap">
                          {fan.email}
                        </td>
                        <td className="px-4 lg:px-6 py-6 text-white/90 border-r border-white/20 text-center whitespace-nowrap">
                          {fan.age || "N/A"}
                        </td>
                        <td className="px-4 lg:px-6 py-6 text-white/90 border-r border-white/20 text-center whitespace-nowrap">
                          {fan.preferredSport || "N/A"}
                        </td>
                        <td className="px-4 lg:px-6 py-6 text-center">
                          <button onClick={() => openFanModal(fan)}>
                            <img
                              src={View}
                              className="w-[50px] cursor-pointer"
                              alt="View"
                            />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
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

            <div className="flex items-center gap-2">
              <span className="text-white/70 text-sm">Show</span>
              <select
                value={perPage}
                onChange={(e) => handlePerPageChange(Number(e.target.value))}
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
  );
};

export default FanManagement;
