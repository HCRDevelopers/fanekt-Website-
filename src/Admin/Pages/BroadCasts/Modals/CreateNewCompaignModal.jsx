import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowLeft, Search } from "lucide-react";
import { createCompaign, getAllTsgs } from "../../../../API/apiService";
import toast from "react-hot-toast";

function CreateNewCampaignModal({ isOpen, onClose, onAdd }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedAudience, setSelectedAudience] = useState("Select Tag");
  const [selectedTagId, setSelectedTagId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    message: "",
    url: "",
  });

  // ✅ Fetch all tags
  const fetchTags = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getAllTsgs();
      if (response) {
        const tagList = response?.data?.data || [];
        setTags([{ id: "all", name: "All" }, ...tagList]);
      } else {
        toast.error("Failed to fetch tags");
      }
    } catch (error) {
      console.error("Error fetching tags:", error);
      toast.error("Error fetching tags");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) fetchTags();
  }, [isOpen, fetchTags]);

  // Filter tags by search
  const filteredTags = tags.filter((tag) =>
    tag.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (option) => {
    setSelectedAudience(option.name);
    setSelectedTagId(option.id);
    setIsDropdownOpen(false);
    setSearchQuery("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Reset all fields
  const resetForm = () => {
    setFormData({ title: "", message: "", url: "" });
    setSelectedAudience("Select Tag");
    setSelectedTagId(null);
    setSearchQuery("");
  };

  // ✅ Close and reset modal
  const handleClose = () => {
    resetForm();
    onClose();
  };

  // ✅ Create campaign
  const handleAdd = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.message) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (!selectedTagId) {
      toast.error("Please select a tag or 'All'.");
      return;
    }

    const payload = {
      title: formData.title,
      message: formData.message,
      url: formData.url || "",
      tag_id: selectedTagId,
    };

    try {
      setIsLoading(true);
      const res = await createCompaign(payload);

      if (res) {
        toast.success("Campaign created successfully!");
        onAdd?.();
        resetForm();
        onClose();
      } else {
        toast.error(res?.data?.message || "Failed to create campaign.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while creating the campaign.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="bg-black/50 backdrop-blur-lg overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-center p-2 min-h-screen w-full">
        <motion.div
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.8 }}
          transition={{ duration: 0.3 }}
          className="bg-[#f4f8fb] rounded-[16px] sm:w-[45rem] w-[95%] overflow-hidden relative"
        >
          {/* Header */}
          <div className="bg-white rounded-xl px-5 py-4 w-full relative">
            <button
              onClick={handleClose}
              className="absolute left-5 top-1/2 -translate-y-1/2 cursor-pointer hover:opacity-70 transition-opacity"
              aria-label="Close modal"
            >
              <ArrowLeft size={24} className="text-[#301820]" />
            </button>
            <div className="flex flex-col justify-center items-center w-full">
              <h2 className="text-[28px] text-[#301820] font-semibold">
                Create New Campaign
              </h2>
            </div>
          </div>

          {/* Campaign Title */}
          <div className="mt-5 px-5">
            <label className="text-[18px] text-[#333333] font-[400] mb-2 block">
              Campaign Title*
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter Campaign Name"
              className="py-3 px-4 bg-white rounded-lg w-full border border-[#00000017] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Message */}
          <div className="mt-3 px-5">
            <label className="text-[18px] text-[#333333] font-[400] mb-2 block">
              Message*
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className="py-3 px-4 bg-white rounded-lg w-full border border-[#00000017] focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Enter message ..."
            ></textarea>
          </div>

          {/* Link */}
          <div className="mt-3 px-5">
            <label className="text-[18px] text-[#333333] font-[400] mb-2 block">
              Link (Optional)
            </label>
            <input
              type="text"
              name="url"
              value={formData.url}
              onChange={handleChange}
              placeholder="https://example.com"
              className="py-3 px-4 bg-white rounded-lg w-full border border-[#00000017] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Tag Dropdown */}
          <div
            className={`mt-3 px-5 relative transition-all duration-300 ${
              isDropdownOpen ? "pb-[220px]" : "pb-4"
            }`}
          >
            <label className="text-[18px] text-[#333333] font-[400] mb-2 block">
              Target Tag
            </label>

            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex justify-between items-center py-3 px-4 bg-white rounded-lg border border-[#00000017] text-[#333333] focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-50 transition-colors"
            >
              <span>{selectedAudience}</span>
              <ChevronDown
                size={20}
                className={`transition-transform duration-300 ${
                  isDropdownOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-5 right-5 mt-2 bg-white rounded-lg border border-[#00000017] shadow-lg z-50"
                  style={{ maxHeight: "240px" }}
                >
                  {/* Search */}
                  <div className="p-3 border-b border-[#00000017] sticky top-0 bg-white rounded-t-lg">
                    <div className="relative">
                      <Search
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      />
                      <input
                        type="text"
                        placeholder="Search tags..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-[#00000017] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[14px]"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                  </div>

                  {/* Tag Options */}
                  <ul
                    className="overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400"
                    style={{ maxHeight: "180px" }}
                  >
                    {loading ? (
                      <li className="px-4 py-3 text-center text-gray-400 text-[15px]">
                        Loading tags...
                      </li>
                    ) : filteredTags.length > 0 ? (
                      filteredTags.map((tag) => (
                        <li
                          key={tag.id}
                          onClick={() => handleSelect(tag)}
                          className={`px-4 py-3 cursor-pointer text-[15px] transition-colors ${
                            selectedAudience === tag.name
                              ? "bg-[#E6E6E8] text-black rounded-lg mx-2 my-1"
                              : "hover:bg-gray-100 text-[#333333]"
                          }`}
                        >
                          {tag.name}
                        </li>
                      ))
                    ) : (
                      <li className="px-4 py-3 text-[15px] text-gray-400 text-center">
                        No tags found
                      </li>
                    )}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Buttons */}
          <div className="flex flex-row justify-center items-center gap-3 mt-5 w-full mb-5 px-5">
            <button
              className="font-[500] text-[18px] p-3 md:px-6 sm:w-1/2 w-full rounded-[5px] bg-[#E5E5E5] text-black cursor-pointer hover:bg-[#d5d5d5] transition-colors"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              onClick={handleAdd}
              disabled={isLoading}
              className="px-6 py-3 cursor-pointer sm:w-1/2 w-full text-white bg-gradient-to-r from-[#155BF2] to-[#FE4B5E] rounded-lg font-semibold shadow-lg hover:opacity-90 transition-all disabled:opacity-50"
            >
              {isLoading ? "Sending..." : "Send Now"}
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

CreateNewCampaignModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAdd: PropTypes.func,
};

export default CreateNewCampaignModal;
