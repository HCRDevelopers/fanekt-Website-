import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaWifi, FaCheckCircle, FaInfoCircle } from 'react-icons/fa';

function NFCScanningModal({ isOpen, onClose, onSuccess, onPopulateUID }) {
  const [scanningProgress, setScanningProgress] = useState(0);
  const [scanningStatus, setScanningStatus] = useState('ready'); // 'ready', 'scanning', 'success', 'error'

  const startScanning = () => {
    setScanningStatus('scanning');
    setScanningProgress(0);

    // Simulate scanning progress
    const scanInterval = setInterval(() => {
      setScanningProgress(prev => {
        if (prev >= 100) {
          clearInterval(scanInterval);
          // Simulate success/failure randomly
          const success = Math.random() > 0.1; // 90% success rate
          if (success) {
            setScanningStatus('success');
            const mockUIDs = [
              'E200341201234567890ABCDEF',
              'E200341201234567890ABCDEG',
              'E200341201234567890ABCDEH',
              'E200341201234567890ABCDEI'
            ];
            const randomUID = mockUIDs[Math.floor(Math.random() * mockUIDs.length)];
            setTimeout(() => {
              onPopulateUID(randomUID);
              onClose();
              setScanningStatus('ready');
              setScanningProgress(0);
              onSuccess('NFC scanned successfully! UID populated.', 'success');
            }, 1000);
          } else {
            setScanningStatus('error');
            setTimeout(() => {
              setScanningStatus('ready');
              setScanningProgress(0);
              onSuccess('NFC scan failed. Please try again or enter manually.', 'error');
            }, 1000);
          }
          return 100;
        }
        return prev + Math.random() * 15 + 5; // Random progress increment
      });
    }, 200);
  };

  const handleClose = () => {
    if (scanningStatus === 'scanning') return; // Prevent closing while scanning
    onClose();
    setScanningStatus('ready');
    setScanningProgress(0);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4"
      onClick={handleClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gradient-to-br from-[#1a1f35] to-[#2a2d4a] rounded-3xl border border-[#286db24c] shadow-2xl w-full max-w-md mx-auto max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 p-6 border-b border-[#286db24c] flex-shrink-0">
          <div className="flex items-center justify-center gap-3">
            <FaWifi className={`text-2xl ${scanningStatus === 'scanning' ? 'text-blue-400 animate-pulse' : scanningStatus === 'success' ? 'text-green-400' : scanningStatus === 'error' ? 'text-red-400' : 'text-blue-400'}`} />
            <h3 className="text-white text-xl font-bold">
              {scanningStatus === 'scanning' && 'Scanning NFC Tag'}
              {scanningStatus === 'success' && 'Scan Successful'}
              {scanningStatus === 'error' && 'Scan Failed'}
              {scanningStatus === 'ready' && 'Ready to Scan'}
            </h3>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 text-center space-y-6 overflow-y-auto flex-1">
          {/* Scanning Animation */}
          {scanningStatus === 'scanning' && (
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="space-y-6"
            >
              {/* NFC Wave Animation */}
              <div className="relative flex items-center justify-center">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute w-24 h-24 bg-blue-400/20 rounded-full border-2 border-blue-400"
                />
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.3
                  }}
                  className="absolute w-16 h-16 bg-cyan-400/20 rounded-full border-2 border-cyan-400"
                />
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.6
                  }}
                  className="absolute w-8 h-8 bg-blue-500/30 rounded-full border border-blue-500"
                />
                <div className="w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center">
                  <FaWifi className="text-white text-sm" />
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-3">
                <div className="w-full bg-[#1e2139] rounded-full h-3 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                    style={{ width: `${scanningProgress}%` }}
                    transition={{ duration: 0.2 }}
                  />
                </div>
                <p className="text-gray-300 text-sm">
                  Scanning for X-KRYPTED NFC tag... {Math.round(scanningProgress)}%
                </p>
              </div>

              {/* Instructions */}
              <div className="bg-blue-600/10 border border-blue-400/30 rounded-lg p-4">
                <p className="text-blue-300 text-sm">
                  Place your X-KRYPTED item close to your device's NFC reader
                </p>
              </div>
            </motion.div>
          )}

          {/* Success State */}
          {scanningStatus === 'success' && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="space-y-6"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto border-2 border-green-400"
              >
                <FaCheckCircle className="text-green-400 text-3xl" />
              </motion.div>

              <div>
                <h4 className="text-white text-lg font-semibold mb-2">NFC Tag Detected!</h4>
                <p className="text-gray-300 text-sm">
                  UID successfully read and populated in the form.
                </p>
              </div>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                onClick={handleClose}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
              >
                Continue
              </motion.button>
            </motion.div>
          )}

          {/* Error State */}
          {scanningStatus === 'error' && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="space-y-6"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto border-2 border-red-400"
              >
                <FaInfoCircle className="text-red-400 text-3xl" />
              </motion.div>

              <div>
                <h4 className="text-white text-lg font-semibold mb-2">Scan Failed</h4>
                <p className="text-gray-300 text-sm">
                  Unable to read NFC tag. Please try again or enter UID manually.
                </p>
              </div>

              <div className="flex gap-3">
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  onClick={startScanning}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Try Again
                </motion.button>

                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  onClick={handleClose}
                  className="px-6 py-3 border border-gray-600 text-gray-400 rounded-lg hover:border-gray-500 hover:text-white transition-all duration-300"
                >
                  Manual Entry
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Ready State */}
          {scanningStatus === 'ready' && (
            <div className="space-y-6">
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-20 h-20 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto border-2 border-blue-400"
              >
                <FaWifi className="text-blue-400 text-3xl" />
              </motion.div>

              <div>
                <h4 className="text-white text-lg font-semibold mb-2">Ready to Scan</h4>
                <p className="text-gray-300 text-sm mb-4">
                  Click the button below to start scanning for your X-KRYPTED NFC tag.
                </p>
              </div>

              <button
                onClick={startScanning}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 px-8 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                <FaWifi className="text-lg" />
                Start Scanning
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default NFCScanningModal;