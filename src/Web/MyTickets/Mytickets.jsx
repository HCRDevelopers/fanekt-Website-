import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FaQrcode,
  FaLink,
  FaCopy,
  FaShare,
  FaWhatsapp,
  FaInstagram,
  FaFacebook,
  FaDownload,
  FaInfoCircle,
  FaCheckCircle,
  FaShieldAlt,
  FaClock,
  FaUserPlus,
  FaGift,
  FaSearch,
  FaPlus,
  FaStar,
  FaLock,
  FaUnlock,
  FaEye,
  FaEyeSlash,
  FaTicketAlt,
  FaExchangeAlt,
  FaMobileAlt,
  FaWifi,
  FaIdCard,
  FaDatabase,
  FaSync,
  FaTrash,
  FaEdit,
  FaCamera,
  FaCog
} from 'react-icons/fa';

// Import API service
import { getProfile } from '../../API/apiService';

// Import Modal Components
import AddTicketModal from './Modals/AddTicketModal';
import TicketDetailsModal from './Modals/TicketDetailsModal';
import NFCTicketAccessModal from './Modals/NFCTicketAccessModal';

function Mytickets() {
  const [showAddTicketModal, setShowAddTicketModal] = useState(false);
  const [showTicketDetailsModal, setShowTicketDetailsModal] = useState(false);
  const [showNFCTicketAccessModal, setShowNFCTicketAccessModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  // Notification popup state
  const [notification, setNotification] = useState({
    show: false,
    message: '',
    type: 'success' // 'success' or 'info'
  });

  // Mock user tickets data
  const [userTickets, setUserTickets] = useState([
    {
      id: 1,
      eventName: 'Barcelona FC vs Real Madrid',
      eventDate: '2024-02-15',
      eventTime: '20:00',
      venue: 'Camp Nou, Barcelona',
      attendeeName: 'John Doe',
      ticketType: 'VIP',
      ticketNumber: 'VIP-2024-001',
      photo: '/api/placeholder/150/150',
      status: 'active',
      purchaseDate: '2024-01-20'
    },
    {
      id: 2,
      eventName: 'PSG Champions League',
      eventDate: '2024-03-10',
      eventTime: '21:00',
      venue: 'Parc des Princes, Paris',
      attendeeName: 'John Doe',
      ticketType: 'Standard',
      ticketNumber: 'STD-2024-002',
      photo: '/api/placeholder/150/150',
      status: 'active',
      purchaseDate: '2024-01-18'
    }
  ]);

  const [referralCode, setReferralCode] = useState('');
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);

  // Fetch profile data on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoadingProfile(true);
        const response = await getProfile();

        if (response.data.status && response.data.data.user.fan) {
          setReferralCode(response.data.data.user.fan.referral_code);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setIsLoadingProfile(false);
      }
    };

    fetchProfile();
  }, []);

  // Show notification popup
  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: 'success' });
    }, 3000);
  };

  return (
    <div className="min-h-screen lg:ml-[290px] px-4 lg:px-8 py-6 pt-28 lg:pt-6">
      {/* Header Section */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-8"
      >
        <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
          My Tickets
        </h1>
        <p className="text-gray-400 text-lg">
          Manage your event tickets. Each ticket is owned by your account and includes a photo of the attendee.
          Show tickets to security at events - no additional verification required.
        </p>
      </motion.div>

      {/* Notification Popup */}
      {notification.show && (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50"
        >
          <div className={`px-6 py-3 rounded-lg shadow-2xl border-2 backdrop-blur-sm ${notification.type === 'success'
            ? 'bg-green-600/90 border-green-400 text-white'
            : notification.type === 'error'
              ? 'bg-red-600/90 border-red-400 text-white'
              : 'bg-blue-600/90 border-blue-400 text-white'
            }`}>
            <div className="flex items-center gap-3">
              {notification.type === 'success' ? (
                <FaCheckCircle className="text-green-200 text-xl" />
              ) : notification.type === 'error' ? (
                <FaInfoCircle className="text-red-200 text-xl" />
              ) : (
                <FaInfoCircle className="text-blue-200 text-xl" />
              )}
              <span className="font-medium text-sm">{notification.message}</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Tickets Info */}
      <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-400/30 rounded-2xl md:p-6 p-2 mb-6">
        <div className="flex items-start gap-4 mb-2">
          <FaTicketAlt className="text-green-400 text-3xl flex-shrink-0" />
          <h3 className="text-white text-xl font-bold">How Tickets Work</h3>
        </div>
        <div>
          <div className="bg-[#1e2139] rounded-lg p-4 border border-[#286db24c]">
            <h4 className="text-white font-semibold mb-2">Event Access Process:</h4>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Login to your account at the event</li>
              <li>• Open the ticket you want to use</li>
              <li>• Show to security (they see ticket details + photo)</li>
              <li>• No biometric checks or device binding required</li>
              <li>• Works on phone or web browser</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Add Ticket Button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setShowAddTicketModal(true)}
          className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2"
        >
          <FaPlus />
          Add Ticket
        </button>
      </div>

      {/* Tickets List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {/* Existing Tickets */}
        {userTickets.map((ticket, index) => (
          <motion.div
            key={ticket.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl md:p-6 p-2 cursor-pointer hover:border-green-400 transition-all duration-300"
            onClick={() => {
              setSelectedTicket(ticket);
              setShowTicketDetailsModal(true);
            }}
          >
            <div className="text-center mb-4">
              <div className="w-20 h-20 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-3 border-2 border-green-400">
                <FaTicketAlt className="text-green-400 text-2xl" />
              </div>
              <h4 className="text-white font-bold text-lg">{ticket.eventName}</h4>
              <p className="text-gray-400 text-sm">{ticket.eventDate} • {ticket.eventTime}</p>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Venue:</span>
                <span className="text-white">{ticket.venue}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Type:</span>
                <span className="text-green-400">{ticket.ticketType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Status:</span>
                <span className="text-green-400">{ticket.status}</span>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Add New Ticket Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: userTickets.length * 0.1 }}
          className="bg-gradient-to-br from-[#1e2139] to-[#2a2d4a] rounded-2xl border-2 border-dashed border-gray-600 shadow-2xl p-6 cursor-pointer hover:border-green-400 transition-all duration-300 flex flex-col items-center justify-center min-h-[250px]"
          onClick={() => setShowAddTicketModal(true)}
        >
          <FaPlus className="text-gray-400 text-4xl mb-4" />
          <h4 className="text-white font-bold text-lg mb-2">Add New Ticket</h4>
          <p className="text-gray-400 text-sm text-center">Upload or manually add event tickets to your account</p>
        </motion.div>
      </div>

      {/* NFC-Based Access Info */}
      <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-400/30 rounded-2xl md:p-6 p-2">
        <div className="flex items-start md:gap-4 gap-2 mb-2">
          <FaMobileAlt className="text-blue-400 text-3xl flex-shrink-0" />
          <h3 className="text-white text-xl font-bold">NFC-Based Event Access</h3>
        </div>
        <div>
          <p className="text-gray-300 text-sm mb-4">
            Use your X-KRYPTED items for quick event access. Security can tap your NFC-enabled item to instantly verify your tickets without you needing to login.
          </p>
          <div className="bg-[#1e2139] rounded-lg p-4 border border-[#286db24c]">
            <h4 className="text-white font-semibold mb-2">How NFC Access Works:</h4>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Bring your X-KRYPTED item to the event</li>
              <li>• Security taps NFC on their phone</li>
              <li>• System identifies your account automatically</li>
              <li>• Security selects the correct ticket from your account</li>
              <li>• Photo verification ensures the right person</li>
            </ul>
          </div>

          <div className="mt-4">
            <button
              onClick={() => setShowNFCTicketAccessModal(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 text-sm"
            >
              Try NFC Access Demo
            </button>
          </div>
        </div>
      </div>

      {/* Modal Components */}
      <AddTicketModal
        isOpen={showAddTicketModal}
        onClose={() => setShowAddTicketModal(false)}
        onSuccess={showNotification}
      />

      <TicketDetailsModal
        isOpen={showTicketDetailsModal}
        ticket={selectedTicket}
        onClose={() => {
          setShowTicketDetailsModal(false);
          setSelectedTicket(null);
        }}
        onSuccess={showNotification}
      />

      <NFCTicketAccessModal
        isOpen={showNFCTicketAccessModal}
        onClose={() => setShowNFCTicketAccessModal(false)}
        onSuccess={showNotification}
      />
    </div>
  );
}

export default Mytickets


