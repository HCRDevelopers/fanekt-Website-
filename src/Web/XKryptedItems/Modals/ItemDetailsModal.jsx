import React from 'react';
import { motion } from 'framer-motion';
import { FaInfoCircle, FaDownload, FaCopy } from 'react-icons/fa';
import { QRCodeCanvas } from "qrcode.react";

function ItemDetailsModal({ isOpen, item, onClose, onDownloadQR, onCopyLink }) {
  if (!isOpen || !item) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-400/10';
      case 'inactive': return 'text-gray-400 bg-gray-400/10';
      case 'suspended': return 'text-red-400 bg-red-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getItemTypeIcon = (type) => {
    switch (type) {
      case 'jersey': return '👕';
      case 'pullover': return '🧥';
      case 'training-kit': return '⚽';
      default: return '🏷️';
    }
  };

  const qrRef = React.useRef();

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
        className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="md:p-6 p-2 border-b border-[#286db24c] flex-shrink-0">
          <div className="flex items-center justify-between">
            <h3 className="text-white text-2xl font-bold">Item Details</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <FaInfoCircle className="text-white text-xl" />
            </button>
          </div>
        </div>

        <div className="md:p-6 p-2 space-y-6 overflow-y-auto flex-1">
          {/* Item Header */}
        <div className="flex items-center md:gap-4 gap-1">
            <div className="w-16 h-16 rounded-full bg-[#286db24c] flex items-center justify-center text-3xl">
              {getItemTypeIcon(item.type)}
            </div>
            <div>
              <h4 className="text-white md:text-xl text-md font-bold">{item.name}</h4>
              <p className="text-gray-400">{item.serialNumber}</p>
            </div>
          </div>

          {/* Item Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#1e2139] rounded-lg p-4 border border-[#286db24c]">
              <h5 className="text-white font-semibold mb-2">NFC Information</h5>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300"><span className="text-gray-400">UID:</span> {item.uid}</p>
                <p className="text-gray-300"><span className="text-gray-400">Type:</span> {item.nfcType}</p>
                <p className="text-gray-300"><span className="text-gray-400">URL:</span> <a href={item.url} className="text-blue-400 hover:text-blue-300 break-all" target="_blank" rel="noopener noreferrer">{item.url}</a></p>
              </div>
            </div>

            <div className="bg-[#1e2139] rounded-lg p-4 border border-[#286db24c]">
              <h5 className="text-white font-semibold mb-2">Status & Usage</h5>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300"><span className="text-gray-400">Status:</span> <span className={`px-2 py-1 rounded text-xs ${getStatusColor(item.status)}`}>{item.status}</span></p>
                <p className="text-gray-300"><span className="text-gray-400">Linked Tickets:</span> {item.linkedTickets}</p>
                <p className="text-gray-300"><span className="text-gray-400">Last Used:</span> {item.lastUsed || 'Never'}</p>
                <p className="text-gray-300"><span className="text-gray-400">Purchase Date:</span> {item.purchaseDate}</p>
              </div>
            </div>
          </div>

          {/* QR Code */}
          <div className="text-center">
            <h5 className="text-white font-semibold mb-4">NFC QR Code</h5>
            <div className="inline-block bg-white p-4 rounded-lg">
              <QRCodeCanvas
                ref={qrRef}
                value={item.url}
                size={150}
                level="H"
              />
            </div>
            <p className="text-gray-400 text-sm mt-2">Scan to access item details</p>
          </div>

          {/* Action Buttons */}
          <div className="flex md:flex-row flex-col gap-4">
            <button
              onClick={() => onDownloadQR(item)}
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
            >
              <FaDownload />
              Download QR
            </button>
            <button
              onClick={() => onCopyLink(item.url)}
              className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
            >
              <FaCopy />
              Copy URL
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default ItemDetailsModal;