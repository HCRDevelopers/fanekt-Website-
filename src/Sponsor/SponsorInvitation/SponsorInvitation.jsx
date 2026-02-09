import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FaUsers,
  FaCheckCircle,
  FaClock,
  FaPaperPlane,
  FaLink,
  FaCopy,
  FaShare,
  FaWhatsapp,
  FaInstagram,
  FaFacebook,
  FaDownload,
  FaInfoCircle,
  FaUserPlus,
  FaStar,
  FaQrcode
} from 'react-icons/fa';

// Import API service
import { getProfile } from '../../API/apiService';

// Import QR Code library
import { QRCodeCanvas } from "qrcode.react";

function SponsorInvitation() {
  const [invitationSent, setInvitationSent] = useState(false);
  const [formData, setFormData] = useState({
    recipientEmail: '',
    recipientName: '',
    message: ''
  });
  const [copied, setCopied] = useState(false);
  const [referralCode, setReferralCode] = useState('');
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [profileError, setProfileError] = useState(null);
  const qrRef = React.useRef();

  // Add missing state variables
  const [invitationCreated, setInvitationCreated] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(true);

  // Mock invitation data - universal invitations (anyone can invite anyone)
  const invitationStats = {
    totalSent: 45,
    successfulInvites: 23,
    pendingInvites: 12
  };

  const invitationsList = [
    { id: 1, email: 'john.doe@email.com', name: 'John Doe', status: 'joined', role: 'Fan', date: '2024-01-15' },
    { id: 2, email: 'sarah.smith@email.com', name: 'Sarah Smith', status: 'joined', role: 'Athlete', date: '2024-01-14' },
    { id: 3, email: 'mike.johnson@email.com', name: 'Mike Johnson', status: 'sent', role: null, date: '2024-01-13' },
    { id: 4, email: 'emma.wilson@email.com', name: 'Emma Wilson', status: 'joined', role: 'Sponsor', date: '2024-01-12' },
    { id: 5, email: 'alex.brown@email.com', name: 'Alex Brown', status: 'sent', role: null, date: '2024-01-11' },
    { id: 6, email: 'lisa.chen@email.com', name: 'Lisa Chen', status: 'joined', role: 'Club', date: '2024-01-10' },
    { id: 7, email: 'david.wilson@email.com', name: 'David Wilson', status: 'joined', role: 'University', date: '2024-01-09' },
    { id: 8, email: 'maria.garcia@email.com', name: 'Maria Garcia', status: 'sent', role: null, date: '2024-01-08' }
  ];

  // Fetch profile data on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoadingProfile(true);
        setProfileError(null);
        const response = await getProfile();

        if (response.data.status && response.data.data.user.fan) {
          setReferralCode(response.data.data.user.fan.referral_code);
        } else {
          setProfileError('Failed to fetch profile data');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        setProfileError('Failed to load profile data. Please try again.');
      } finally {
        setIsLoadingProfile(false);
      }
    };

    fetchProfile();
  }, []);

  // Generate invitation link using the actual referral code
  const invitationLink = referralCode ? `https://fanekt.com/invite/${referralCode}` : 'https://fanekt.com/invite/loading...';

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSendInvitation = () => {
    if (!formData.recipientEmail.trim() || !formData.recipientName.trim()) return;

    // Mock invitation sending - in real app this would call API
    console.log('Sending invitation to:', formData.recipientEmail);
    setInvitationSent(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setInvitationSent(false);
      setFormData({
        recipientEmail: '',
        recipientName: '',
        message: ''
      });
    }, 3000);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(invitationLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleShare = (platform) => {
    const text = `Join me on FANEKT! Use my invitation link: ${invitationLink}`;
    const encodedText = encodeURIComponent(text);

    const urls = {
      whatsapp: `https://wa.me/?text=${encodedText}`,
      instagram: `https://www.instagram.com/?url=${encodeURIComponent(invitationLink)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(invitationLink)}&quote=${encodedText}`
    };

    if (urls[platform]) {
      window.open(urls[platform], '_blank');
    }
  };

  const handleDownloadQR = () => {
    if (qrRef.current && referralCode) {
      const canvas = qrRef.current;
      const link = document.createElement('a');
      link.download = 'fanekt-invitation-qr.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'joined': return 'text-green-400 bg-green-400/10';
      case 'sent': return 'text-yellow-400 bg-yellow-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'joined': return <FaCheckCircle className="text-green-400" />;
      case 'sent': return <FaClock className="text-yellow-400" />;
      default: return <FaClock className="text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen lg:ml-[290px] md:px-4 px-2 lg:px-8 py-6 pt-28 lg:pt-6">
      {/* Header Section */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-8"
      >
        <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
          Universal Invitations
        </h1>
        <p className="text-gray-400 text-lg">
          Invite anyone to join FANEKT - they choose their role after signing up
        </p>
      </motion.div>

      {/* Success Message */}
      {invitationSent && (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50"
        >
          <div className="px-6 py-3 rounded-lg shadow-2xl border-2 backdrop-blur-sm bg-green-600/90 border-green-400 text-white">
            <div className="flex items-center gap-3">
              <FaCheckCircle className="text-green-200 text-xl" />
              <span className="font-medium text-sm">Invitation sent successfully! 🎉</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Invitation Stats */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-r from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl md:p-6 p-2 mb-8"
      >
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <FaPaperPlane className="text-[#f64c68] text-2xl mr-2" />
              <span className="text-white text-2xl font-bold">{invitationStats.totalSent}</span>
            </div>
            <p className="text-gray-400 text-sm">Invitations Sent</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <FaCheckCircle className="text-green-400 text-2xl mr-2" />
              <span className="text-white text-2xl font-bold">{invitationStats.successfulInvites}</span>
            </div>
            <p className="text-gray-400 text-sm">Joined Platform</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <FaClock className="text-yellow-400 text-2xl mr-2" />
              <span className="text-white text-2xl font-bold">{invitationStats.pendingInvites}</span>
            </div>
            <p className="text-gray-400 text-sm">Pending Invites</p>
          </div>
        </div>
        <div className="mt-4 text-center">
          <p className="text-gray-400 text-sm">Help grow the FANEKT community by inviting friends and colleagues.</p>
        </div>
      </motion.div>

      {/* Send Invitation Form */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl md:p-6 p-2 mb-8"
      >
        <h3 className="text-white text-xl font-bold mb-6">Send Invitation</h3>

        <div className="space-y-6">
          <div>
            <label className="block text-white font-medium mb-2">
              Recipient Email <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              name="recipientEmail"
              value={formData.recipientEmail}
              onChange={handleInputChange}
              placeholder="Enter email address..."
              className="w-full bg-[#1e2139] text-white px-4 py-3 rounded-lg border border-[#286db24c] focus:outline-none focus:border-[#f64c68]"
            />
          </div>

          <div>
            <label className="block text-white font-medium mb-2">
              Recipient Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="recipientName"
              value={formData.recipientName}
              onChange={handleInputChange}
              placeholder="Enter full name..."
              className="w-full bg-[#1e2139] text-white px-4 py-3 rounded-lg border border-[#286db24c] focus:outline-none focus:border-[#f64c68]"
            />
          </div>

          <div>
            <label className="block text-white font-medium mb-2">
              Personal Message (Optional)
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Add a personal message..."
              rows={3}
              className="w-full bg-[#1e2139] text-white px-4 py-3 rounded-lg border border-[#286db24c] focus:outline-none focus:border-[#f64c68] resize-none"
            />
          </div>

          <div className="bg-blue-600/20 border border-blue-400/30 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <FaInfoCircle className="text-blue-400 text-lg mt-1 flex-shrink-0" />
              <div>
                <p className="text-blue-400 font-medium mb-1">Universal Invitation System</p>
                <p className="text-blue-300 text-sm">
                  Anyone can invite anyone. The invited person will choose their role (Fan/Athlete/Club/Sponsor) after joining.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={handleSendInvitation}
            disabled={!formData.recipientEmail.trim() || !formData.recipientName.trim()}
            className="w-full bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <FaPaperPlane />
            Send Invitation
          </button>
        </div>
      </motion.div>

      {/* Your Invitations */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl overflow-hidden mb-8"
      >
        <div className="md:p-6 p-2 border-b border-[#286db24c]">
          <h3 className="text-white text-xl font-bold">Your Invitations</h3>
        </div>
        <div className="md:p-6 p-2">
          {invitationsList.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-[#286db24c]">
                    <th className="text-left text-gray-400 text-sm font-medium pb-3 pl-4">Name</th>
                    <th className="text-left text-gray-400 text-sm font-medium pb-3">Email</th>
                    <th className="text-left text-gray-400 text-sm font-medium pb-3">Role</th>
                    <th className="text-left text-gray-400 text-sm font-medium pb-3 pr-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {invitationsList.map((invitation) => (
                    <tr key={invitation.id} className="border-b border-[#286db24c] hover:bg-[#1e2139] transition-colors duration-200">
                      <td className="py-4 pl-4 w-[25%]">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-[#286db24c] rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold">{invitation.name.charAt(0).toUpperCase()}</span>
                          </div>
                          <div>
                            <p className="text-white font-medium">{invitation.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4">
                        <p className="text-gray-400 text-sm">{invitation.email}</p>
                      </td>
                      <td className="py-4">
                        {invitation.role ? (
                          <span className="text-xs bg-purple-600/20 text-purple-300 px-3 py-1 rounded-full">
                            {invitation.role}
                          </span>
                        ) : (
                          <span className="text-gray-500 text-sm">-</span>
                        )}
                      </td>
                      <td className="py-4 pr-4">
                        <div className={`flex items-center gap-2 px-3 py-1 w-[100px] rounded-full ${getStatusColor(invitation.status)}`}>
                          {getStatusIcon(invitation.status)}
                          <span className="text-sm font-medium capitalize">{invitation.status}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <FaUsers className="text-gray-400 text-6xl mx-auto mb-4" />
              <h4 className="text-white text-xl font-bold mb-2">No Invitations Yet</h4>
              <p className="text-gray-400">Send your first invitation to grow the FANEKT community.</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Referral Link Section */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl md:p-6 p-2 mb-8"
      >
        <h3 className="text-white text-xl font-bold mb-4">Share Your Referral Link</h3>
        <div className="bg-[#1e2139] rounded-xl p-4 mb-4 border border-[#286db24c]">
          <p className="text-gray-300 text-sm mb-2">Your personal referral link:</p>
          <div className="flex items-center flex-wrap gap-2">
            <input
              type="text"
              value={invitationLink}
              readOnly
              className="flex-1 bg-[#2a2d4a] text-white px-3 py-2 rounded-lg border border-[#286db24c] focus:outline-none focus:border-[#f64c68] text-sm"
            />
            <button
              onClick={handleCopyLink}
              className="bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2"
            >
              <FaCopy />
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>

        {/* Social Sharing */}
        <div>
          <p className="text-white font-semibold mb-3">Share via:</p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => handleShare('whatsapp')}
              className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-all duration-300 flex items-center gap-2"
            >
              <FaWhatsapp />
              WhatsApp
            </button>
            <button
              onClick={() => handleShare('instagram')}
              className="bg-pink-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-pink-700 transition-all duration-300 flex items-center gap-2"
            >
              <FaInstagram />
              Instagram
            </button>
            <button
              onClick={() => handleShare('facebook')}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 flex items-center gap-2"
            >
              <FaFacebook />
              Facebook
            </button>
          </div>
        </div>
      </motion.div>

      {/* QR Code Section */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl md:p-6 p-2"
      >
        <h3 className="text-white text-xl font-bold mb-4">QR Code</h3>
        <div className="text-center">
          <div className="bg-white p-4 rounded-lg inline-block mb-4">
            <QRCodeCanvas
              value={invitationLink}
              size={150}
              ref={qrRef}
            />
          </div>
          <p className="text-gray-400 text-sm mb-4">Scan to join FANEKT instantly</p>
          <button
            onClick={handleDownloadQR}
            className="bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2"
          >
            <FaDownload />
            Download QR Code
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default SponsorInvitation;
