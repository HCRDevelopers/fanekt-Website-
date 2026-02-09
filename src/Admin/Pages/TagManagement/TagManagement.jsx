// import React, { useEffect, useState, useCallback } from "react";
// import { motion } from "framer-motion";
// import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
// import Search from "./assets/search.png";
// import { getNfcTags } from "../../../API/apiService";

// const TagManagement = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("All Status");
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [tags, setTags] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(10);
//   const [isEntriesDropdownOpen, setIsEntriesDropdownOpen] = useState(false);

//   const statusOptions = ["All Status", "Activated", "Programmed", "Unprogrammed"];
//   const entriesOptions = [5, 10, 25, 50, 100];

//   const getStatusStyle = (status) => {
//     switch (status?.toLowerCase()) {
//       case "activated":
//         return "bg-green-500 text-white";
//       case "programmed":
//         return "bg-blue-500 text-white";
//       case "unprogrammed":
//         return "bg-gray-200 text-gray-700";
//       default:
//         return "bg-gray-200 text-gray-700";
//     }
//   };

//   // Fetch NFC Tags API
//   const fetchTags = useCallback(async () => {
//     setLoading(true);
//     try {
//       const response = await getNfcTags();
//       if (response?.status && Array.isArray(response.data.data)) {
//         setTags(response.data.data);
//       } else {
//         setTags([]);
//       }
//     } catch (error) {
//       console.error("Error fetching NFC tags:", error);
//       setTags([]);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchTags();
//   }, [fetchTags]);

//   // Filter logic
//   const filteredTags = tags.filter((tag) => {
//     const matchesSearch =
//       tag.uid.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       tag.id.toString().includes(searchTerm.toLowerCase());
//     const matchesStatus =
//       statusFilter === "All Status" ||
//       tag.status?.toLowerCase() === statusFilter.toLowerCase();
//     return matchesSearch && matchesStatus;
//   });

//   // Pagination calculations
//   const totalPages = Math.ceil(filteredTags.length / itemsPerPage);
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredTags.slice(indexOfFirstItem, indexOfLastItem);

//   // Reset to page 1 when filters change
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchTerm, statusFilter, itemsPerPage]);

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   const handlePrevPage = () => {
//     if (currentPage > 1) setCurrentPage(currentPage - 1);
//   };

//   const handleNextPage = () => {
//     if (currentPage < totalPages) setCurrentPage(currentPage + 1);
//   };

//   // Generate page numbers with ellipsis
//   const getPageNumbers = () => {
//     const pages = [];
//     const maxVisible = 5;

//     if (totalPages <= maxVisible) {
//       for (let i = 1; i <= totalPages; i++) {
//         pages.push(i);
//       }
//     } else {
//       if (currentPage <= 3) {
//         for (let i = 1; i <= 4; i++) {
//           pages.push(i);
//         }
//         pages.push("...");
//         pages.push(totalPages);
//       } else if (currentPage >= totalPages - 2) {
//         pages.push(1);
//         pages.push("...");
//         for (let i = totalPages - 3; i <= totalPages; i++) {
//           pages.push(i);
//         }
//       } else {
//         pages.push(1);
//         pages.push("...");
//         pages.push(currentPage - 1);
//         pages.push(currentPage);
//         pages.push(currentPage + 1);
//         pages.push("...");
//         pages.push(totalPages);
//       }
//     }

//     return pages;
//   };

//   return (
//     <>
//       <div className="lg:ml-[290px] px-4 lg:px-6 py-3 lg:pb-5 lg:pt-5 pt-28">
//         <div className="flex flex-wrap gap-4 justify-between">
//           <div>
//             <p className="text-2xl font-medium text-white">Tag Management</p>
//             <p className="text-[14px] font-medium text-[#ffffff8b]">
//               Monitor and manage all NFC tags in the system
//             </p>
//           </div>
//         </div>

//         <div className="bg-[#3135543d] rounded-xl mt-6 border border-[#1584f259] p-5">
//           <div className="max-w-7xl mx-auto">
           
//             <div className="flex items-center flex-wrap justify-between mb-6 gap-4">
          
//               <div className="relative sm:w-[100%-350px]">
//                 <input
//                   placeholder="Search..."
//                   type="text"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="sm:w-[350px] w-full ps-10 pe-3 py-3 rounded-lg bg-[#ffffff0d] border border-[#42527a] text-white placeholder:text-[#ffffff8b]"
//                 />
//                 <img src={Search} className="w-[20px] absolute top-3.5 left-3" alt="" />
//               </div>

//               <div className="flex gap-3 flex-wrap w-[350px] lg:justify-end">
//                 {/* Status Filter Dropdown */}
//                 <div className="relative">
//                   <button
//                     onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//                     className="px-4 py-3 rounded-lg justify-between bg-[#ffffff0d] border border-white/50 text-white flex items-center gap-3 hover:bg-white/50 transition-all min-w-[180px]"
//                   >
//                     <span>{statusFilter}</span>
//                     <ChevronDown
//                       size={20}
//                       className={`transition-transform ${
//                         isDropdownOpen ? "rotate-180" : ""
//                       }`}
//                     />
//                   </button>

//                   {isDropdownOpen && (
//                     <div className="absolute top-full mt-2 w-full bg-[#1a1d2e] border border-white/30 rounded-lg shadow-xl z-50 overflow-hidden">
//                       {statusOptions.map((option, index) => (
//                         <button
//                           key={index}
//                           onClick={() => {
//                             setStatusFilter(option);
//                             setIsDropdownOpen(false);
//                           }}
//                           className={`w-full px-4 py-3 text-left text-white hover:bg-white/20 transition-colors ${
//                             statusFilter === option ? "bg-white/10" : ""
//                           }`}
//                         >
//                           {option}
//                         </button>
//                       ))}
//                     </div>
//                   )}
//                 </div>

//                 {/* Export Button */}
//                 <button className="px-8 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-pink-600 text-white font-medium hover:from-blue-700 hover:to-pink-700 transition-all shadow-lg">
//                   Export CSV
//                 </button>
//               </div>
//             </div>

//             <div className="bg-[#4a4e6a77] backdrop-blur-md rounded-xl overflow-hidden shadow-xl border border-[#42527a]">
//               <div className="bg-[#4a4e6a77] backdrop-blur-md rounded-xl overflow-x-auto shadow-xl border border-[#42527a]">
//                 <table className="w-full min-w-[1000px]">
//                   <thead>
//                     <tr className="bg-[#4a4e6a] backdrop-blur-sm border-b border-white/40">
//                       <th className="px-4 lg:px-6 py-5 text-center text-white font-medium border-r border-white/30 whitespace-nowrap">
//                         Tag ID
//                       </th>
//                       <th className="px-4 lg:px-6 py-5 text-center text-white font-medium border-r border-white/30 whitespace-nowrap">
//                         UID
//                       </th>
//                       <th className="px-4 lg:px-6 py-5 text-center text-white font-medium border-r border-white/30 whitespace-nowrap">
//                         Organization
//                       </th>
//                       <th className="px-4 lg:px-6 py-5 text-center text-white font-medium border-r border-white/30 whitespace-nowrap">
//                         Batch
//                       </th>
//                       <th className="px-4 lg:px-6 py-5 text-center text-white font-medium border-r border-white/30 whitespace-nowrap">
//                         Status
//                       </th>
//                       <th className="px-4 lg:px-6 py-5 text-center text-white font-medium whitespace-nowrap">
//                         Scans
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {loading ? (
//                       Array.from({ length: itemsPerPage }).map((_, index) => (
//                         <tr
//                           key={index}
//                           className="border-b border-white/20 animate-pulse"
//                         >
//                           <td className="px-4 lg:px-6 py-6 border-r border-white/20 text-center">
//                             <div className="h-4 bg-white/10 rounded w-12 mx-auto"></div>
//                           </td>
//                           <td className="px-4 lg:px-6 py-6 border-r border-white/20 text-center">
//                             <div className="h-4 bg-white/10 rounded w-32 mx-auto"></div>
//                           </td>
//                           <td className="px-4 lg:px-6 py-6 border-r border-white/20 text-center">
//                             <div className="h-4 bg-white/10 rounded w-20 mx-auto"></div>
//                           </td>
//                           <td className="px-4 lg:px-6 py-6 border-r border-white/20 text-center">
//                             <div className="h-4 bg-white/10 rounded w-16 mx-auto"></div>
//                           </td>
//                           <td className="px-4 lg:px-6 py-6 border-r border-white/20 text-center">
//                             <div className="h-6 bg-white/10 rounded-full w-24 mx-auto"></div>
//                           </td>
//                           <td className="px-4 lg:px-6 py-6 text-center">
//                             <div className="h-4 bg-white/10 rounded w-8 mx-auto"></div>
//                           </td>
//                         </tr>
//                       ))
//                     ) : currentItems.length > 0 ? (
//                       currentItems.map((tag, index) => (
//                         <tr
//                           key={index}
//                           className="border-b border-white/20 hover:bg-white/20 transition-colors"
//                         >
//                           <td className="px-4 lg:px-6 py-6 text-white/90 border-r border-white/20 text-center whitespace-nowrap">
//                             {tag.id}
//                           </td>
//                           <td className="px-4 lg:px-6 py-6 text-white/90 border-r border-white/20 text-center whitespace-nowrap text-sm">
//                             {tag.uid}
//                           </td>
//                           <td className="px-4 lg:px-6 py-6 text-white/90 border-r border-white/20 text-center whitespace-nowrap">
//                             {tag?.tag_info?.name || "—"}
//                           </td>
//                           <td className="px-4 lg:px-6 py-6 text-white/90 border-r border-white/20 text-center">
//                             {tag?.tag_info?.batch_id || "—"}
//                           </td>
//                           <td className="px-4 lg:px-6 py-6 border-r border-white/20 text-center">
//                             <span
//                               className={`px-3 lg:px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap ${getStatusStyle(
//                                 tag.status
//                               )}`}
//                             >
//                               {tag.status || "—"}
//                             </span>
//                           </td>
//                           <td className="px-4 lg:px-6 py-6 text-white/90 text-center whitespace-nowrap">
//                             {tag.scans_count || "0"}
//                           </td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td colSpan="6" className="py-16">
//                           <div className="flex flex-col items-center justify-center">
//                             <div className="w-32 h-32 mb-4 relative">
//                               <svg
//                                 className="w-full h-full text-white/20"
//                                 fill="none"
//                                 viewBox="0 0 24 24"
//                                 stroke="currentColor"
//                               >
//                                 <path
//                                   strokeLinecap="round"
//                                   strokeLinejoin="round"
//                                   strokeWidth={1.5}
//                                   d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                                 />
//                               </svg>
//                             </div>
//                             <h3 className="text-xl font-semibold text-white/90 mb-2">
//                               No Data Found
//                             </h3>
//                             <p className="text-white/60 text-sm">
//                               {searchTerm || statusFilter !== "All Status"
//                                 ? "Try adjusting your search or filter"
//                                 : "No tags available at the moment"}
//                             </p>
//                           </div>
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>

//             {!loading && (
//               <div className="flex items-center justify-between mt-7 flex-wrap gap-4">
//                 <div className="text-white/70 text-sm">
//                   Showing {filteredTags.length > 0 ? indexOfFirstItem + 1 : 0} to{" "}
//                   {Math.min(indexOfLastItem, filteredTags.length)} of {filteredTags.length} entries
//                 </div>

//                 <div className="flex items-center gap-2">
//                   <button
//                     onClick={handlePrevPage}
//                     disabled={currentPage === 1}
//                     className={`p-2 rounded-lg border border-white/30 text-white transition-all ${
//                       currentPage === 1
//                         ? "bg-white/5 cursor-not-allowed opacity-50"
//                         : "bg-white/10 hover:bg-white/20"
//                     }`}
//                   >
//                     <ChevronLeft size={20} />
//                   </button>

//                   {getPageNumbers().map((page, index) =>
//                     page === "..." ? (
//                       <span key={index} className="px-2 text-white/50">
//                         ...
//                       </span>
//                     ) : (
//                       <button
//                         key={index}
//                         onClick={() => handlePageChange(page)}
//                         className={`px-4 py-2 rounded-lg font-medium transition-all ${
//                           currentPage === page
//                             ? "bg-blue-500 text-white shadow-lg"
//                             : "bg-white/10 border border-white/30 text-white hover:bg-white/20"
//                         }`}
//                       >
//                         {page}
//                       </button>
//                     )
//                   )}

//                   <button
//                     onClick={handleNextPage}
//                     disabled={currentPage === totalPages || totalPages === 0}
//                     className={`p-2 rounded-lg border border-white/30 text-white transition-all ${
//                       currentPage === totalPages || totalPages === 0
//                         ? "bg-white/5 cursor-not-allowed opacity-50"
//                         : "bg-white/10 hover:bg-white/20"
//                     }`}
//                   >
//                     <ChevronRight size={20} />
//                   </button>
//                 </div>

//                 <div className="flex items-center gap-2">
//                   <span className="text-white/70 text-sm">Show</span>
//                   <div className="relative">
//                     <button
//                       onClick={() => setIsEntriesDropdownOpen(!isEntriesDropdownOpen)}
//                       className="px-4 py-2 rounded-lg bg-white/10 border border-white/30 text-white flex items-center gap-2 hover:bg-white/20 transition-all min-w-[120px] justify-between"
//                     >
//                       <span className="font-medium">{itemsPerPage} entries</span>
//                       <ChevronDown
//                         size={16}
//                         className={`transition-transform ${
//                           isEntriesDropdownOpen ? "rotate-180" : ""
//                         }`}
//                       />
//                     </button>

//                     {isEntriesDropdownOpen && (
//                       <div className="absolute bottom-full mb-2 right-0 w-full bg-[#1a1d2e] border border-white/30 rounded-lg shadow-xl z-50 overflow-hidden">
//                         {entriesOptions.map((option, index) => (
//                           <button
//                             key={index}
//                             onClick={() => {
//                               setItemsPerPage(option);
//                               setIsEntriesDropdownOpen(false);
//                             }}
//                             className={`w-full px-4 py-3 text-left text-white hover:bg-white/20 transition-colors ${
//                               itemsPerPage === option ? "bg-white/10" : ""
//                             }`}
//                           >
//                             {option} entries
//                           </button>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             )}

//             {loading && (
//               <div className="flex items-center justify-between mt-7 flex-wrap gap-4 animate-pulse">
//                 <div className="h-4 bg-white/10 rounded w-40"></div>
//                 <div className="flex items-center gap-2">
//                   <div className="h-10 w-10 bg-white/10 rounded-lg"></div>
//                   <div className="h-10 w-10 bg-white/10 rounded-lg"></div>
//                   <div className="h-10 w-10 bg-white/10 rounded-lg"></div>
//                   <div className="h-10 w-10 bg-white/10 rounded-lg"></div>
//                   <div className="h-10 w-10 bg-white/10 rounded-lg"></div>
//                 </div>
//                 <div className="h-10 bg-white/10 rounded-lg w-32"></div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default TagManagement;










import React, { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import Search from "./assets/search.png";
import { getBatches, getNfcTags } from "../../../API/apiService";

const TagManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [tags, setTags] = useState([]);
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isEntriesDropdownOpen, setIsEntriesDropdownOpen] = useState(false);

  const statusOptions = ["All Status", "Activated", "Programmed", "Unprogrammed"];
  const entriesOptions = [5, 10, 25, 50, 100];

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "activated":
        return "bg-green-500 text-white";
      case "programmed":
        return "bg-blue-500 text-white";
      case "unprogrammed":
        return "bg-gray-200 text-gray-700";
      default:
        return "bg-gray-200 text-gray-700";
    }
  };

  // Get batch name by batch_id
  const getBatchName = useCallback((batchId) => {
    if (!batchId) return "—";
    const batch = batches.find((b) => b.id === batchId);
      console.log("Found batch:", batch.name);
    return batch ? batch.name : "—";

  }, [batches]);

  // Fetch Batches API
  const fetchBatches = useCallback(async () => {
    try {
      const response = await getBatches();
      if (response) {
        setBatches(response.data.data);
      } else {
        setBatches([]);
      }
    } catch (error) {
      console.error("Error fetching batches:", error);
      setBatches([]);
    }
  }, []);

  // Fetch NFC Tags API
  const fetchTags = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getNfcTags();
      if (response?.status && Array.isArray(response.data.data)) {
        setTags(response.data.data);
      } else {
        setTags([]);
      }
    } catch (error) {
      console.error("Error fetching NFC tags:", error);
      setTags([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Fetch batches first, then tags
    const fetchData = async () => {
      await fetchBatches();
      await fetchTags();
    };
    fetchData();
  }, [fetchBatches, fetchTags]);

  // Filter logic
  const filteredTags = tags.filter((tag) => {
    const matchesSearch =
      tag.uid.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tag.id.toString().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All Status" ||
      tag.status?.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredTags.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTags.slice(indexOfFirstItem, indexOfLastItem);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, itemsPerPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  // Generate page numbers with ellipsis
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <>
      <div className="lg:ml-[290px] px-4 lg:px-6 py-3 lg:pb-5 lg:pt-5 pt-28">
        <div className="flex flex-wrap gap-4 justify-between">
          <div>
            <p className="text-2xl font-medium text-white">Tag Management</p>
            <p className="text-[14px] font-medium text-[#ffffff8b]">
              Monitor and manage all NFC tags in the system
            </p>
          </div>
        </div>

        <div className="bg-[#3135543d] rounded-xl mt-6 border border-[#1584f259] p-5">
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="flex items-center flex-wrap justify-between mb-6 gap-4">
              {/* Search Bar */}
              <div className="relative sm:w-[100%-350px]">
                <input
                  placeholder="Search..."
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="sm:w-[350px] w-full ps-10 pe-3 py-3 rounded-lg bg-[#ffffff0d] border border-[#42527a] text-white placeholder:text-[#ffffff8b]"
                />
                <img src={Search} className="w-[20px] absolute top-3.5 left-3" alt="" />
              </div>

              <div className="flex gap-3 flex-wrap w-[350px] lg:justify-end">
                {/* Status Filter Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="px-4 py-3 rounded-lg justify-between bg-[#ffffff0d] border border-white/50 text-white flex items-center gap-3 hover:bg-white/50 transition-all min-w-[180px]"
                  >
                    <span>{statusFilter}</span>
                    <ChevronDown
                      size={20}
                      className={`transition-transform ${
                        isDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute top-full mt-2 w-full bg-[#1a1d2e] border border-white/30 rounded-lg shadow-xl z-50 overflow-hidden">
                      {statusOptions.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setStatusFilter(option);
                            setIsDropdownOpen(false);
                          }}
                          className={`w-full px-4 py-3 text-left text-white hover:bg-white/20 transition-colors ${
                            statusFilter === option ? "bg-white/10" : ""
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Export Button */}
                <button className="px-8 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-pink-600 text-white font-medium hover:from-blue-700 hover:to-pink-700 transition-all shadow-lg">
                  Export CSV
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="bg-[#4a4e6a77] backdrop-blur-md rounded-xl overflow-hidden shadow-xl border border-[#42527a]">
              <div className="bg-[#4a4e6a77] backdrop-blur-md rounded-xl overflow-x-auto shadow-xl border border-[#42527a]">
                <table className="w-full min-w-[1000px]">
                  <thead>
                    <tr className="bg-[#4a4e6a] backdrop-blur-sm border-b border-white/40">
                      <th className="px-4 lg:px-6 py-5 text-center text-white font-medium border-r border-white/30 whitespace-nowrap">
                        Tag ID
                      </th>
                      <th className="px-4 lg:px-6 py-5 text-center text-white font-medium border-r border-white/30 whitespace-nowrap">
                        UID
                      </th>
                      <th className="px-4 lg:px-6 py-5 text-center text-white font-medium border-r border-white/30 whitespace-nowrap">
                        Organization
                      </th>
                      <th className="px-4 lg:px-6 py-5 text-center text-white font-medium border-r border-white/30 whitespace-nowrap">
                        Batch
                      </th>
                      <th className="px-4 lg:px-6 py-5 text-center text-white font-medium border-r border-white/30 whitespace-nowrap">
                        Status
                      </th>
                      <th className="px-4 lg:px-6 py-5 text-center text-white font-medium whitespace-nowrap">
                        Scans
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      // Skeleton Loading Rows
                      Array.from({ length: itemsPerPage }).map((_, index) => (
                        <tr
                          key={index}
                          className="border-b border-white/20 animate-pulse"
                        >
                          <td className="px-4 lg:px-6 py-6 border-r border-white/20 text-center">
                            <div className="h-4 bg-white/10 rounded w-12 mx-auto"></div>
                          </td>
                          <td className="px-4 lg:px-6 py-6 border-r border-white/20 text-center">
                            <div className="h-4 bg-white/10 rounded w-32 mx-auto"></div>
                          </td>
                          <td className="px-4 lg:px-6 py-6 border-r border-white/20 text-center">
                            <div className="h-4 bg-white/10 rounded w-20 mx-auto"></div>
                          </td>
                          <td className="px-4 lg:px-6 py-6 border-r border-white/20 text-center">
                            <div className="h-4 bg-white/10 rounded w-32 mx-auto"></div>
                          </td>
                          <td className="px-4 lg:px-6 py-6 border-r border-white/20 text-center">
                            <div className="h-6 bg-white/10 rounded-full w-24 mx-auto"></div>
                          </td>
                          <td className="px-4 lg:px-6 py-6 text-center">
                            <div className="h-4 bg-white/10 rounded w-8 mx-auto"></div>
                          </td>
                        </tr>
                      ))
                    ) : currentItems.length > 0 ? (
                      currentItems.map((tag, index) => (
                        <tr
                          key={index}
                          className="border-b border-white/20 hover:bg-white/20 transition-colors"
                        >
                          <td className="px-4 lg:px-6 py-6 text-white/90 border-r border-white/20 text-center whitespace-nowrap">
                            {tag.id}
                          </td>
                          <td className="px-4 lg:px-6 py-6 text-white/90 border-r border-white/20 text-center whitespace-nowrap text-sm">
                            {tag.uid}
                          </td>
                          <td className="px-4 lg:px-6 py-6 text-white/90 border-r border-white/20 text-center whitespace-nowrap">
                            {tag?.tag_info?.name || "—"}
                          </td>
                          <td className="px-4 lg:px-6 py-6 text-white/90 border-r border-white/20 text-center whitespace-nowrap">
                            {getBatchName(tag?.tag_info?.batch_id)}
                          </td>
                          <td className="px-4 lg:px-6 py-6 border-r border-white/20 text-center">
                            <span
                              className={`px-3 lg:px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap ${getStatusStyle(
                                tag.status
                              )}`}
                            >
                              {tag.status || "—"}
                            </span>
                          </td>
                          <td className="px-4 lg:px-6 py-6 text-white/90 text-center whitespace-nowrap">
                            {tag.scans_count || "0"}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="py-16">
                          <div className="flex flex-col items-center justify-center">
                            <div className="w-32 h-32 mb-4 relative">
                              <svg
                                className="w-full h-full text-white/20"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={1.5}
                                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-white/90 mb-2">
                              No Data Found
                            </h3>
                            <p className="text-white/60 text-sm">
                              {searchTerm || statusFilter !== "All Status"
                                ? "Try adjusting your search or filter"
                                : "No tags available at the moment"}
                            </p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            {!loading && (
              <div className="flex items-center justify-between mt-7 flex-wrap gap-4">
                <div className="text-white/70 text-sm">
                  Showing {filteredTags.length > 0 ? indexOfFirstItem + 1 : 0} to{" "}
                  {Math.min(indexOfLastItem, filteredTags.length)} of {filteredTags.length} entries
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className={`p-2 rounded-lg border border-white/30 text-white transition-all ${
                      currentPage === 1
                        ? "bg-white/5 cursor-not-allowed opacity-50"
                        : "bg-white/10 hover:bg-white/20"
                    }`}
                  >
                    <ChevronLeft size={20} />
                  </button>

                  {getPageNumbers().map((page, index) =>
                    page === "..." ? (
                      <span key={index} className="px-2 text-white/50">
                        ...
                      </span>
                    ) : (
                      <button
                        key={index}
                        onClick={() => handlePageChange(page)}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${
                          currentPage === page
                            ? "bg-blue-500 text-white shadow-lg"
                            : "bg-white/10 border border-white/30 text-white hover:bg-white/20"
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}

                  <button
                    onClick={handleNextPage}
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

                <div className="flex items-center gap-2">
                  <span className="text-white/70 text-sm">Show</span>
                  <div className="relative">
                    <button
                      onClick={() => setIsEntriesDropdownOpen(!isEntriesDropdownOpen)}
                      className="px-4 py-2 rounded-lg bg-white/10 border border-white/30 text-white flex items-center gap-2 hover:bg-white/20 transition-all min-w-[120px] justify-between"
                    >
                      <span className="font-medium">{itemsPerPage} entries</span>
                      <ChevronDown
                        size={16}
                        className={`transition-transform ${
                          isEntriesDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {isEntriesDropdownOpen && (
                      <div className="absolute bottom-full mb-2 right-0 w-full bg-[#1a1d2e] border border-white/30 rounded-lg shadow-xl z-50 overflow-hidden">
                        {entriesOptions.map((option, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              setItemsPerPage(option);
                              setIsEntriesDropdownOpen(false);
                            }}
                            className={`w-full px-4 py-3 text-left text-white hover:bg-white/20 transition-colors ${
                              itemsPerPage === option ? "bg-white/10" : ""
                            }`}
                          >
                            {option} entries
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Skeleton Loader for Pagination */}
            {loading && (
              <div className="flex items-center justify-between mt-7 flex-wrap gap-4 animate-pulse">
                <div className="h-4 bg-white/10 rounded w-40"></div>
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 bg-white/10 rounded-lg"></div>
                  <div className="h-10 w-10 bg-white/10 rounded-lg"></div>
                  <div className="h-10 w-10 bg-white/10 rounded-lg"></div>
                  <div className="h-10 w-10 bg-white/10 rounded-lg"></div>
                  <div className="h-10 w-10 bg-white/10 rounded-lg"></div>
                </div>
                <div className="h-10 bg-white/10 rounded-lg w-32"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TagManagement;