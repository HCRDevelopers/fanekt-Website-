import React, { useState } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import Back from "./../assets/back-arrow.png";
import { addBatch } from "../../../../API/apiService";

function CreateNewBatchModal({ isOpen, onClose, onAdd }) {
  const [batchName, setBatchName] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  // ✅ API call to add a new batch
  const handleAdd = async (e) => {
    e.preventDefault();

    if (!batchName.trim()) {
      toast.error("Batch name is required.");
      return;
    }

    try {
      setIsLoading(true);

      const payload = {
        name: batchName,
        description,
      };

      const res = await addBatch(payload);

      if (res) {
        toast.success("Batch created successfully!");
        onAdd?.();
        onClose(); 
      } else {
        toast.error(res?.message || "Failed to create batch.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while creating batch.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="bg-black/50 backdrop-blur-lg overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full poppins"
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
          className="bg-[#f4f8fb] rounded-[16px] sm:w-[45rem] w-[95%]"
        >
          {/* Header */}
          <div className="bg-white rounded-xl px-5 py-3 w-full relative">
            <img
              onClick={onClose}
              src={Back}
              className="w-[50px] absolute mt-2 cursor-pointer"
              alt="Back"
            />
            <div className="flex flex-col justify-center items-center w-full">
              <h2 className="text-[28px] text-[#301820] font-semibold">
                Create New Batch
              </h2>
              <p className="text-[15px] text-[#8D9299] font-medium">
                Add a new batch for grouping your NFC Tags
              </p>
            </div>
          </div>

          {/* Form Fields */}
          <form onSubmit={handleAdd}>
            <div className="mt-5 px-5">
              <p className="text-[18px] text-[#333333] font-[400] mb-2">
                Batch Name*
              </p>
              <input
                type="text"
                placeholder="Enter Batch Name"
                className="py-3 px-4 bg-white rounded-lg w-full border border-[#00000017] focus:outline-none"
                value={batchName}
                onChange={(e) => setBatchName(e.target.value)}
              />
            </div>

            <div className="mt-3 px-5">
              <p className="text-[18px] text-[#333333] font-[400] mb-2">
                Description
              </p>
              <textarea
                rows="4"
                className="py-3 px-4 bg-white rounded-lg w-full border border-[#00000017] focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Enter description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            {/* Buttons */}
            <div className="flex flex-row justify-center items-center gap-3 mt-3 w-full mb-5 px-5">
              <button
                type="button"
                className="font-[500] text-[18px] p-3 md:px-6 sm:w-1/2 w-full rounded-[5px] bg-[#E5E5E5] text-black cursor-pointer"
                onClick={onClose}
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isLoading}
                className={`px-6 py-3 sm:w-1/2 w-full text-white rounded-lg font-semibold shadow-lg transition-all ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-[#155BF2] to-[#FE4B5E] hover:opacity-90"
                }`}
              >
                {isLoading ? "Creating..." : "Create Batch"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
}

CreateNewBatchModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAdd: PropTypes.func,
};

export default CreateNewBatchModal;
