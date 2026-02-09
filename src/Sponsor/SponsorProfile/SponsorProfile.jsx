import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { IoEyeOutline, IoEyeOffOutline, IoChevronDown, IoChevronUp, IoCamera, IoKey } from 'react-icons/io5';

import toast, { Toaster } from 'react-hot-toast';
import { getProfile, updateSponsor } from '../../API/apiService';
import { useMyContext } from '../../context/context';
import ChangePasswordModal from './Modals/ChangePasswordModal';

// Custom Dropdown Component
const CustomDropdown = ({ options, value, onChange, placeholder = "Select option", name }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (optionValue) => {
    onChange({ target: { name, value: optionValue } });
    setIsOpen(false);
  };

  const selectedOption = options.find(option => option.value === value);
  const displayText = selectedOption ? selectedOption.label : placeholder;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="text-white placeholder:text-[16px] placeholder:font-[400] placeholder:text-gray-300 border-2 border-t-0 border-l-0 border-r-0 border-[#e6e7e9] py-3 pl-1 w-full outline-0 text-left flex items-center justify-between"
      >
        <span className={value ? 'text-white' : 'text-gray-300'}>
          {displayText}
        </span>
        {isOpen ? (
          <IoChevronUp className="text-[#aeafb3] text-[19px]" />
        ) : (
          <IoChevronDown className="text-[#aeafb3] text-[19px]" />
        )}
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute z-50 w-full mt-1 bg-[linear-gradient(to_bottom_right,_#2d2e58,_#2d2e58)] border border-[#e6e7e9] rounded-md shadow-lg max-h-48 overflow-y-auto"
        >
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSelect(option.value)}
              className="w-full text-left px-3 py-2 text-white hover:bg-white/10 transition-colors duration-200 first:rounded-t-md last:rounded-b-md"
            >
              {option.label}
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
};

function SponsorProfile() {
  const { setUserProfile } = useMyContext();
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    companyLegalName: "",
    brandName: "",
    akaName: "",
    legalRepresentative: "",
    loginEmail: "",
    secondaryEmail: "",
    country: "",
    city: "",
    address: "",
    website: "",
    phone: "",
    industry: "",
    description: ""
  });

  const fileInputRef = useRef(null);

  const fetchProfile = async () => {
    try {
      const response = await getProfile();
      if (response.data.status) {
        const user = response.data.data.user;
        const sponsor = user.sponsor;
        setFormData({
          companyLegalName: sponsor.full_name || "",
          brandName: user.name || "",
          akaName: sponsor.how_appear || sponsor.full_name || "",
          legalRepresentative: sponsor.legal_represent || "",
          loginEmail: user.email || "",
          secondaryEmail: sponsor.sec_email || "",
          country: user.country || "",
          city: user.city || "",
          address: "",
          website: "",
          phone: "",
          industry: "",
          description: ""
        });
        setProfileImage(user.image ? `https://api.fanekt.com/${user.image}` : null);

        // Set user profile data in context for sidebar
        setUserProfile({
          name: sponsor.full_name || user.name || "",
          email: user.email || "",
          profileImage: user.image ? `https://api.fanekt.com/${user.image}` : ""
        });
      } else {
        toast.error('Failed to fetch profile data');
      }
    } catch (error) {
      toast.error('Error fetching profile data');
      console.error('Profile fetch error:', error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCancel = () => {
    // Reset to original data or navigate away
    window.history.back();
  };

  const handleUpdateProfile = async () => {
    setLoading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('full_name', formData.companyLegalName);
      formDataToSend.append('aka_name', formData.brandName);
      formDataToSend.append('how_appear', formData.akaName);
      formDataToSend.append('legal_represent', formData.legalRepresentative);
      formDataToSend.append('login_email', formData.loginEmail);
      formDataToSend.append('sec_email', formData.secondaryEmail);
      formDataToSend.append('country', formData.country);
      formDataToSend.append('city', formData.city);
      if (selectedFile) {
        formDataToSend.append('image', selectedFile);
      }

      const response = await updateSponsor(formDataToSend);
      if (response.data.status) {
        toast.success('Profile updated successfully!');
        // Optionally refetch the profile to get updated data
        await fetchProfile();
      } else {
        toast.error('Failed to update profile');
      }
    } catch (error) {
      toast.error('Error updating profile');
      console.error('Profile update error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen lg:ml-[290px] px-4 lg:px-8 py-6 pt-28 lg:pt-6">
      <Toaster />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl mx-auto"
      >
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-8"
        >
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
            Sponsor Profile
          </h1>
          <p className="text-gray-400 text-lg">
            Manage your company information and preferences
          </p>
        </motion.div>

        {/* Profile Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center overflow-hidden">
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="text-white text-4xl font-bold">
                  {formData.companyLegalName?.charAt(0) || 'S'}
                </span>
              )}
            </div>
            <button
              onClick={() => fileInputRef.current.click()}
              className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg hover:scale-110 transition-transform"
            >
              <IoCamera className="text-gray-600 text-xl" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          onSubmit={(e) => e.preventDefault()}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Company Info */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-semibold text-white mb-4">Company Information</h2>
          </div>

          <div>
            <label className="block text-left text-lg pt-2 text-white font-medium">
              Company Full Legal Name
            </label>
            <input
              type="text"
              name="companyLegalName"
              placeholder="Enter Company Full Legal Name"
              value={formData.companyLegalName}
              onChange={handleInputChange}
              className="text-white placeholder:text-gray-300 border-2 border-t-0 border-l-0 border-r-0 border-[#e6e7e9] py-3 pr-1 w-full outline-0 bg-transparent"
            />
          </div>

          <div>
            <label className="block text-left text-lg pt-2 text-white font-medium">
              Brand / AKA Name
            </label>
            <input
              type="text"
              name="brandName"
              placeholder="Enter Brand Name"
              value={formData.brandName}
              onChange={handleInputChange}
              className="text-white placeholder:text-gray-300 border-2 border-t-0 border-l-0 border-r-0 border-[#e6e7e9] py-3 pr-1 w-full outline-0 bg-transparent"
            />
          </div>

          <div>
            <label className="block text-left text-lg pt-2 text-white font-medium">
              How you want to appear in search
            </label>
            <input
              type="text"
              name="akaName"
              placeholder="Default: Company Full Legal Name"
              value={formData.akaName}
              onChange={handleInputChange}
              className="text-white placeholder:text-gray-300 border-2 border-t-0 border-l-0 border-r-0 border-[#e6e7e9] py-3 pr-1 w-full outline-0 bg-transparent"
            />
          </div>

          <div>
            <label className="block text-left text-lg pt-2 text-white font-medium">
              Full name of Legal Representative
            </label>
            <input
              type="text"
              name="legalRepresentative"
              placeholder="Enter Full Name of Legal Representative"
              value={formData.legalRepresentative}
              onChange={handleInputChange}
              className="text-white placeholder:text-gray-300 border-2 border-t-0 border-l-0 border-r-0 border-[#e6e7e9] py-3 pr-1 w-full outline-0 bg-transparent"
            />
          </div>

          <div>
            <label className="block text-left text-lg pt-2 text-white font-medium">
              Login Email (Company)
            </label>
            <input
              type="email"
              name="loginEmail"
              placeholder="Enter Login Email"
              value={formData.loginEmail}
              onChange={handleInputChange}
              className="text-white placeholder:text-gray-300 border-2 border-t-0 border-l-0 border-r-0 border-[#e6e7e9] py-3 pr-1 w-full outline-0 bg-transparent"
            />
          </div>

          <div>
            <label className="block text-left text-lg pt-2 text-white font-medium">
              Email 2 (Legal Representative)
            </label>
            <input
              type="email"
              name="secondaryEmail"
              placeholder="Enter Secondary Email"
              value={formData.secondaryEmail}
              onChange={handleInputChange}
              className="text-white placeholder:text-gray-300 border-2 border-t-0 border-l-0 border-r-0 border-[#e6e7e9] py-3 pr-1 w-full outline-0 bg-transparent"
            />
          </div>

          <div>
            <label className="block text-left text-lg pt-2 text-white font-medium">
              Country
            </label>
            <input
              type="text"
              name="country"
              placeholder="e.g. FR, TR, USA"
              value={formData.country}
              onChange={handleInputChange}
              className="text-white placeholder:text-gray-300 border-2 border-t-0 border-l-0 border-r-0 border-[#e6e7e9] py-3 pr-1 w-full outline-0 bg-transparent"
            />
          </div>

          <div>
            <label className="block text-left text-lg pt-2 text-white font-medium">
              City
            </label>
            <input
              type="text"
              name="city"
              placeholder="Enter City"
              value={formData.city}
              onChange={handleInputChange}
              className="text-white placeholder:text-gray-300 border-2 border-t-0 border-l-0 border-r-0 border-[#e6e7e9] py-3 pr-1 w-full outline-0 bg-transparent"
            />
          </div>



          {/* Buttons */}
          <div className="md:col-span-2 flex justify-end space-x-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={handleCancel}
              className="px-8 py-3 text-white text-lg font-medium rounded-lg border-2 border-white hover:bg-white hover:text-gray-800 transition-all duration-300"
            >
              Cancel
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={handleUpdateProfile}
              disabled={loading}
              className="px-8 py-3 text-white text-lg font-medium rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Updating...' : 'Update Profile'}
            </motion.button>
          </div>
        </motion.form>
        <div className="py-15 border-t border-b border-white mt-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={() => setIsChangePasswordModalOpen(true)}
            className="px-8 py-3 text-white text-lg font-medium rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <IoKey className="text-lg" />
            Change Password
          </motion.button>
        </div>
      </motion.div>

      {/* Change Password Modal */}
      <ChangePasswordModal
        isOpen={isChangePasswordModalOpen}
        onClose={() => setIsChangePasswordModalOpen(false)}
      />
    </div>
  );
}

export default SponsorProfile;
