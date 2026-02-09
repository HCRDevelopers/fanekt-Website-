import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";


function ConfirmModal({ openConfirmModal, closeConfirmModal }) {



  if (!openConfirmModal) return null;

  return (
    <motion.div
      className="bg-black/60 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full poppins"
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
          className="bg-[#f4f8fb] rounded-[16px] w-[300px]"
        >

          <div className="bg-white rounded-xl px-5 py-4 w-full relative">
            <div className="flex flex-col justify-center items-center w-full">
              <h2 className="text-[20px] text-[#301820] font-semibold">
                Update Fan Preferences?
              </h2>
            </div>
          </div>

          <div className="px-2 my-7">
            <div className="bg-white text-[#333333] py-5 rounded-lg my-4 text-[16px] px-2 font-medium border border-[#00000017] text-center">
          Are you sure you want to change your fan Preferences? This will update all your connected items.
            </div>
          </div>

          <div className="flex flex-row justify-center items-center gap-3 mt-3 w-full mb-5 px-5">
            <button
              className=" font-[500] text-[18px] px-3 py-2.5 md:px-6 sm:w-1/2 w-full rounded-[5px] bg-[#E5E5E5] text-black  cursor-pointer"
              onClick={closeConfirmModal}
            >
              Cancel
            </button>
            <button
            onClick={closeConfirmModal}
            className="px-3 py-2.5 cursor-pointer sm:w-1/2 w-full text-white bg-gradient-to-r from-[#155BF2] to-[#FE4B5E] rounded-lg font-semibold shadow-lg hover:opacity-90 transition-all">
              Update
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

ConfirmModal.propTypes = {
  openConfirmModal: PropTypes.bool.isRequired,
  closeConfirmModal: PropTypes.func.isRequired,
};

export default ConfirmModal;

