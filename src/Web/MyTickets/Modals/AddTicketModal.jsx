import React from 'react';
import { motion } from 'framer-motion';
import { FaTimes, FaPlus, FaCamera, FaInfoCircle } from 'react-icons/fa';

function AddTicketModal({ isOpen, onClose, onSuccess }) {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center md:p-4 p-2"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl w-full max-w-lg mx-auto max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-[#286db24c] flex-shrink-0">
          <h3 className="text-white text-xl font-bold">Add New Ticket</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <FaTimes className="text-white text-xl" />
          </button>
        </div>

        <div className="md:p-6 p-2 space-y-6 overflow-y-auto flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white font-medium mb-2">
                Event Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g., Barcelona FC vs Real Madrid"
                className="w-full bg-[#1e2139] text-white px-4 py-3 rounded-lg border border-[#286db24c] focus:outline-none focus:border-green-400"
              />
            </div>
            <div>
              <label className="block text-white font-medium mb-2">
                Event Date <span className="text-red-400">*</span>
              </label>
              <input
                type="date"
                className="w-full bg-[#1e2139] text-white px-4 py-3 rounded-lg border border-[#286db24c] focus:outline-none focus:border-green-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white font-medium mb-2">
                Event Time <span className="text-red-400">*</span>
              </label>
              <input
                type="time"
                className="w-full bg-[#1e2139] text-white px-4 py-3 rounded-lg border border-[#286db24c] focus:outline-none focus:border-green-400"
              />
            </div>
            <div>
              <label className="block text-white font-medium mb-2">
                Ticket Type <span className="text-red-400">*</span>
              </label>
              <select className="w-full bg-[#1e2139] text-white px-4 py-3 rounded-lg border border-[#286db24c] focus:outline-none focus:border-green-400">
                <option value="standard">Standard</option>
                <option value="vip">VIP</option>
                <option value="premium">Premium</option>
                <option value="student">Student</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-white font-medium mb-2">
              Venue <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g., Camp Nou, Barcelona"
              className="w-full bg-[#1e2139] text-white px-4 py-3 rounded-lg border border-[#286db24c] focus:outline-none focus:border-green-400"
            />
          </div>

          <div>
            <label className="block text-white font-medium mb-2">
              Attendee Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              placeholder="Full name of ticket holder"
              className="w-full bg-[#1e2139] text-white px-4 py-3 rounded-lg border border-[#286db24c] focus:outline-none focus:border-green-400"
            />
          </div>

          <div>
            <label className="block text-white font-medium mb-2">
              Attendee Photo <span className="text-red-400">*</span>
            </label>
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-green-400 transition-colors cursor-pointer">
              <FaCamera className="text-gray-400 text-3xl mx-auto mb-3" />
              <p className="text-gray-400 mb-2">Click to upload photo</p>
              <p className="text-gray-500 text-sm">JPG, PNG up to 5MB</p>
              <input type="file" accept="image/*" className="hidden" />
            </div>
          </div>

          <div className="bg-green-600/20 border border-green-400/30 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <FaInfoCircle className="text-green-400 text-lg mt-1 flex-shrink-0" />
              <div>
                <p className="text-green-400 font-medium mb-1">Ticket Security</p>
                <p className="text-green-300 text-sm">
                  Photo verification ensures the correct person uses the ticket. Security will compare the photo at the event.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => {
                onClose();
                onSuccess('Ticket added successfully!');
              }}
              className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
            >
              <FaPlus />
              Add Ticket
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 border border-gray-600 text-gray-400 rounded-lg hover:border-gray-500 hover:text-white transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default AddTicketModal;