import React from 'react';
import { motion } from 'framer-motion';
import { FaTimes, FaCheckCircle, FaShieldAlt, FaCamera, FaTicketAlt } from 'react-icons/fa';

function TicketDetailsModal({ isOpen, ticket, onClose, onSuccess }) {
  if (!isOpen || !ticket) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl w-full max-w-2xl mx-auto max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-[#286db24c] flex-shrink-0">
          <div className="flex items-center justify-between">
            <h3 className="text-white text-2xl font-bold">Event Ticket</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <FaTimes className="text-white text-xl" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* Ticket Header */}
          <div className="text-center mb-6">
            <div className="w-24 h-24 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-green-400">
              <FaTicketAlt className="text-green-400 text-4xl" />
            </div>
            <h4 className="text-white text-2xl font-bold mb-2">{ticket.eventName}</h4>
            <div className="flex items-center justify-center gap-4 text-gray-300">
              <span>{ticket.eventDate}</span>
              <span>•</span>
              <span>{ticket.eventTime}</span>
            </div>
          </div>

          {/* Ticket Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#1e2139] rounded-lg p-4 border border-[#286db24c]">
              <h5 className="text-white font-semibold mb-3">Event Information</h5>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Venue:</span>
                  <span className="text-white">{ticket.venue}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Ticket Type:</span>
                  <span className="text-green-400">{ticket.ticketType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Ticket Number:</span>
                  <span className="text-white">{ticket.ticketNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Status:</span>
                  <span className="text-green-400">{ticket.status}</span>
                </div>
              </div>
            </div>

            <div className="bg-[#1e2139] rounded-lg p-4 border border-[#286db24c]">
              <h5 className="text-white font-semibold mb-3">Attendee Information</h5>
              <div className="space-y-3">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Attendee Name:</p>
                  <p className="text-white font-medium">{ticket.attendeeName}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-2">Attendee Photo:</p>
                  <div className="w-20 h-20 bg-gray-600 rounded-lg flex items-center justify-center">
                    <FaCamera className="text-gray-400 text-2xl" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Security Notice */}
          <div className="bg-blue-600/20 border border-blue-400/30 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <FaShieldAlt className="text-blue-400 text-lg mt-1 flex-shrink-0" />
              <div>
                <h5 className="text-blue-400 font-semibold mb-1">Event Security</h5>
                <p className="text-blue-300 text-sm">
                  At the event, login to your account and show this ticket to security. They will verify your identity using the attendee photo and ticket details. No additional verification required.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={() => {
                onClose();
                onSuccess('Ticket ready for event!');
              }}
              className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
            >
              <FaCheckCircle />
              Ready for Event
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 border border-gray-600 text-gray-400 rounded-lg hover:border-gray-500 hover:text-white transition-all duration-300"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default TicketDetailsModal;