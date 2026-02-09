import React, { useCallback, useEffect, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import Search from "./assets/search.png";
import View from "./assets/view.png";
import ClubUniTeamDetailModal from "./Modals/ClubUniTeamDetailModal";
import { getAllTeamUsers } from "../../../API/apiService";

const ClubUniTeamManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [clubUniTeamModal, setClubUniTeamModal] = useState(false);
  const [clubUniTeams, setClubUniTeams] = useState([]);
  const [filteredClubUniTeams, setFilteredClubUniTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedClubUniTeam, setSelectedClubUniTeam] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [total, setTotal] = useState(0);

  const openClubUniTeamModal = (clubUniTeam) => {
    setSelectedClubUniTeam(clubUniTeam);
    setClubUniTeamModal(true);
  };

  const closeClubUniTeamModal = () => {
    setClubUniTeamModal(false);
    setSelectedClubUniTeam(null);
  };

  // Fetch team users data
  const fetchTeamUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getAllTeamUsers();
      const data = response?.data;

      if (data?.status && data?.data?.users) {
        // Transform API data to match component structure
        const transformedData = data.data.users.map(user => ({
          id: user.id,
          fullLegalName: user.team?.full_name || user.name,
          registrationNumber: user.team?.registration_no || null,
          publicAkaName: user.team?.aka_name || user.name,
          searchDisplayName: user.team?.how_appear || user.name,
          legalRepresentative: user.team?.legal_represent || null,
          loginEmail: user.email,
          secondaryEmail: user.team?.sec_email || null,
          country: user.country,
          city: user.city,
          organizationType: user.team?.type_of_org || null,
          profitType: user.team?.profit_non_profit || null,
          primarySport: user.team?.primary_sport || null,
          youthScope: user.team?.adult_scope || null,
          teamName: user.team?.team_name || null,
          teamSport: user.team?.sport_name || null,
          team1Name: user.team?.team_name_1 || null,
          team1Sport: user.team?.sport_name_1 || null,
          team2Name: user.team?.team_name_2 || null,
          team2Sport: user.team?.sport_name_2 || null,
          team3Name: user.team?.team_name_3 || null,
          team3Sport: user.team?.sport_name_3 || null,
          team4Name: user.team?.team_name_4 || null,
          team4Sport: user.team?.sport_name_4 || null,
          team5Name: user.team?.team_name_5 || null,
          team5Sport: user.team?.sport_name_5 || null,
          mainWebsite: user.team?.main_website || null,
          website2: user.team?.websites_1 || null,
          website3: user.team?.websites_2 || null,
          website4: user.team?.websites_3 || null,
          website5: user.team?.websites_4 || null,
          instagram: user.team?.instagram || null,
          facebook: user.team?.facebook || null,
          twitter: user.team?.twitter || null,
          tiktok: user.team?.tiktok || null,
          youtube: user.team?.youtube || null,
          linkedin: user.team?.linkedin || null,
          shortBio: user.team?.short_bio || null,
          motto: user.team?.slogan || null,
          createdAt: user.created_at,
          updatedAt: user.updated_at
        }));

        setClubUniTeams(transformedData);
        setFilteredClubUniTeams(transformedData);
        setTotal(transformedData.length);
        setLastPage(Math.ceil(transformedData.length / perPage));
      }
    } catch (error) {
      console.error("Error fetching team users:", error);
      setClubUniTeams([]);
      setFilteredClubUniTeams([]);
      setTotal(0);
      setLastPage(1);
    } finally {
      setLoading(false);
    }
  }, [perPage]);

  useEffect(() => {
    fetchTeamUsers();
  }, [fetchTeamUsers]);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredClubUniTeams(clubUniTeams);
      return;
    }

    const lowerSearch = searchTerm.toLowerCase();

    const filtered = clubUniTeams.filter(
      (clubUniTeam) =>
        clubUniTeam.publicAkaName?.toLowerCase().includes(lowerSearch) ||
        clubUniTeam.loginEmail?.toLowerCase().includes(lowerSearch) ||
        clubUniTeam.primarySport?.toLowerCase().includes(lowerSearch) ||
        clubUniTeam.city?.toLowerCase().includes(lowerSearch) ||
        clubUniTeam.organizationType?.toLowerCase().includes(lowerSearch)
    );

    setFilteredClubUniTeams(filtered);
  }, [searchTerm, clubUniTeams]);

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
      {/* Club Uni Team Detail Modal */}
      <ClubUniTeamDetailModal
        isOpen={clubUniTeamModal}
        onClose={closeClubUniTeamModal}
        clubUniTeam={selectedClubUniTeam}
      />

      {/* Header */}
      <div className="flex flex-wrap gap-4 justify-between">
        <div>
          <p className="text-2xl font-medium text-white">Club/University/Team Management</p>
          <p className="text-[14px] font-medium text-[#ffffff8b]">
            Monitor and manage all registered clubs, universities, and teams
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
                      Type
                    </th>
                    <th className="px-4 lg:px-6 py-5 text-center text-white font-medium border-r border-white/30">
                      Primary Sport
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
                          <div className="h-4 bg-white/20 rounded animate-pulse mx-auto w-20"></div>
                        </td>
                        <td className="px-4 lg:px-6 py-6 border-r border-white/20 text-center">
                          <div className="h-4 bg-white/20 rounded animate-pulse mx-auto w-16"></div>
                        </td>
                        <td className="px-4 lg:px-6 py-6 text-center">
                          <div className="w-12 h-12 bg-white/20 rounded animate-pulse mx-auto"></div>
                        </td>
                      </tr>
                    ))
                  ) : filteredClubUniTeams.length === 0 ? (
                    <tr>
                      <td
                        colSpan="5"
                        className="text-center py-8 text-white/70"
                      >
                        No clubs, universities, or teams found.
                      </td>
                    </tr>
                  ) : (
                    filteredClubUniTeams.map((clubUniTeam, index) => (
                      <tr
                        key={index}
                        className="border-b border-white/20 hover:bg-white/20 transition-colors"
                      >
                        <td className="px-4 lg:px-6 py-6 text-white/90 border-r border-white/20 text-center whitespace-nowrap">
                          {clubUniTeam.publicAkaName}
                        </td>
                        <td className="px-4 lg:px-6 py-6 text-white/90 border-r border-white/20 text-center whitespace-nowrap">
                          {clubUniTeam.loginEmail}
                        </td>
                        <td className="px-4 lg:px-6 py-6 text-white/90 border-r border-white/20 text-center whitespace-nowrap">
                          {clubUniTeam.organizationType}
                        </td>
                        <td className="px-4 lg:px-6 py-6 text-white/90 border-r border-white/20 text-center whitespace-nowrap">
                          {clubUniTeam.primarySport}
                        </td>
                        <td className="px-4 lg:px-6 py-6 text-center">
                          <button onClick={() => openClubUniTeamModal(clubUniTeam)}>
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

export default ClubUniTeamManagement;
