import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { IoEyeOutline, IoEyeOffOutline, IoChevronDown, IoChevronUp, IoCamera, IoKey } from 'react-icons/io5';

import toast, { Toaster } from 'react-hot-toast';
import { getProfile, updateTeam } from '../../API/apiService';
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

function TeamProfile() {
  const { setUserProfile } = useMyContext();
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullLegalName: "",
    registrationNumber: "",
    publicName: "",
    akaName: "",
    legalRepresentative: "",
    loginEmail: "",
    secondaryEmail: "",
    country: "",
    city: "",
    organizationType: "",
    profitType: "",
    primarySport: "",
    youthScope: "",
    teamName: "",
    teamSport: "",
    team1Name: "",
    team1Sport: "",
    team2Name: "",
    team2Sport: "",
    team3Name: "",
    team3Sport: "",
    team4Name: "",
    team4Sport: "",
    team5Name: "",
    team5Sport: "",
    mainWebsite: "",
    website1: "",
    website2: "",
    website3: "",
    website4: "",
    website5: "",
    instagram: "",
    facebook: "",
    twitter: "",
    tiktok: "",
    youtube: "",
    linkedin: "",
    bio: "",
    motto: "",
    address: "",
    phone: ""
  });

  const fileInputRef = useRef(null);

  const fetchProfile = async () => {
    setFetchLoading(true);
    try {
      const response = await getProfile();
      if (response.data.status) {
        const user = response.data.data.user;
        const team = user.team;
        setFormData({
          fullLegalName: team.full_name || "",
          registrationNumber: team.registration_no || "",
          publicName: user.name || "",
          akaName: team.how_appear || team.aka_name || team.full_name || "",
          legalRepresentative: team.legal_represent || "",
          loginEmail: user.email || "",
          secondaryEmail: team.sec_email || "",
          country: user.country || "",
          city: user.city || "",
          organizationType: team.type_of_org || "",
          profitType: team.profit_non_profit || "",
          primarySport: team.primary_sport || "",
          youthScope: team.adult_scope || "",
          teamName: team.team_name || "",
          teamSport: team.sport_name || "",
          team1Name: team.team_name_1 || "",
          team1Sport: team.sport_name_1 || "",
          team2Name: team.team_name_2 || "",
          team2Sport: team.sport_name_2 || "",
          team3Name: team.team_name_3 || "",
          team3Sport: team.sport_name_3 || "",
          team4Name: team.team_name_4 || "",
          team4Sport: team.sport_name_4 || "",
          team5Name: team.team_name_5 || "",
          team5Sport: team.sport_name_5 || "",
          mainWebsite: team.main_website || "",
          website1: team.websites_1 || "",
          website2: team.websites_2 || "",
          website3: team.websites_3 || "",
          website4: team.websites_4 || "",
          website5: team.websites_5 || "",
          instagram: team.instagram || "",
          facebook: team.facebook || "",
          twitter: team.twitter || "",
          tiktok: team.tiktok || "",
          youtube: team.youtube || "",
          linkedin: team.linkedin || "",
          bio: team.short_bio || "",
          motto: team.slogan || "",
          address: "",
          phone: ""
        });
        setProfileImage(user.image ? `https://api.fanekt.com/${user.image}` : null);

        // Set user profile data in context for sidebar
        setUserProfile({
          name: team.full_name || user.name || "",
          email: user.email || "",
          profileImage: user.image ? `https://api.fanekt.com/${user.image}` : ""
        });
      } else {
        toast.error('Failed to fetch profile data');
      }
    } catch (error) {
      toast.error('Error fetching profile data');
      console.error('Profile fetch error:', error);
    } finally {
      setFetchLoading(false);
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

  const [selectedImageFile, setSelectedImageFile] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImageFile(file);
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

      formDataToSend.append('full_name', formData.fullLegalName);
      formDataToSend.append('registration_no', formData.registrationNumber);
      formDataToSend.append('aka_name', formData.akaName);
      formDataToSend.append('how_appear', formData.akaName);
      formDataToSend.append('legal_represent', formData.legalRepresentative);
      formDataToSend.append('login_email', formData.loginEmail);
      formDataToSend.append('sec_email', formData.secondaryEmail);
      formDataToSend.append('country', formData.country);
      formDataToSend.append('type_of_org', formData.organizationType);
      formDataToSend.append('city', formData.city);
      formDataToSend.append('profit_non_profit', formData.profitType);
      formDataToSend.append('primary_sport', formData.primarySport);
      formDataToSend.append('adult_scope', formData.youthScope);
      formDataToSend.append('team_name', formData.teamName);
      formDataToSend.append('sport_name', formData.teamSport);
      formDataToSend.append('team_name_1', formData.team1Name);
      formDataToSend.append('sport_name_1', formData.team1Sport);
      formDataToSend.append('team_name_2', formData.team2Name);
      formDataToSend.append('sport_name_2', formData.team2Sport);
      formDataToSend.append('team_name_3', formData.team3Name);
      formDataToSend.append('sport_name_3', formData.team3Sport);
      formDataToSend.append('team_name_4', formData.team4Name);
      formDataToSend.append('sport_name_4', formData.team4Sport);
      formDataToSend.append('team_name_5', formData.team5Name);
      formDataToSend.append('sport_name_5', formData.team5Sport);
      formDataToSend.append('main_website', formData.mainWebsite);
      formDataToSend.append('websites_1', formData.website1);
      formDataToSend.append('websites_2', formData.website2);
      formDataToSend.append('websites_3', formData.website3);
      formDataToSend.append('websites_4', formData.website4);
      formDataToSend.append('websites_5', formData.website5);
      formDataToSend.append('instagram', formData.instagram);
      formDataToSend.append('facebook', formData.facebook);
      formDataToSend.append('twitter', formData.twitter);
      formDataToSend.append('tiktok', formData.tiktok);
      formDataToSend.append('youtube', formData.youtube);
      formDataToSend.append('linkedin', formData.linkedin);
      formDataToSend.append('short_bio', formData.bio);
      formDataToSend.append('slogan', formData.motto);

      if (selectedImageFile) {
        formDataToSend.append('image', selectedImageFile);
      }

      const response = await updateTeam(formDataToSend);
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
            Team Profile
          </h1>
          <p className="text-gray-400 text-lg">
            Manage your organization information and preferences
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
                  {formData.fullLegalName?.charAt(0) || 'T'}
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

        {fetchLoading && (
          <div className="text-center text-white text-lg mb-4">
            Loading profile data...
          </div>
        )}

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          onSubmit={(e) => e.preventDefault()}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Organization Info */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-semibold text-white mb-4">Organization Information</h2>
          </div>

          <div>
            <label className="block text-left text-lg pt-2 text-white font-medium">
              Full Legal Name
            </label>
            <input
              type="text"
              name="fullLegalName"
              placeholder="Enter Full Legal Name"
              value={formData.fullLegalName}
              onChange={handleInputChange}
              className="text-white placeholder:text-gray-300 border-2 border-t-0 border-l-0 border-r-0 border-[#e6e7e9] py-3 pr-1 w-full outline-0 bg-transparent"
            />
          </div>

          <div>
            <label className="block text-left text-lg pt-2 text-white font-medium">
              Registration Number
            </label>
            <input
              type="text"
              name="registrationNumber"
              placeholder="Enter Registration Number"
              value={formData.registrationNumber}
              onChange={handleInputChange}
              className="text-white placeholder:text-gray-300 border-2 border-t-0 border-l-0 border-r-0 border-[#e6e7e9] py-3 pr-1 w-full outline-0 bg-transparent"
            />
          </div>

          <div>
            <label className="block text-left text-lg pt-2 text-white font-medium">
              Public Name
            </label>
            <input
              type="text"
              name="publicName"
              placeholder="Enter Public Name"
              value={formData.publicName}
              onChange={handleInputChange}
              className="text-white placeholder:text-gray-300 border-2 border-t-0 border-l-0 border-r-0 border-[#e6e7e9] py-3 pr-1 w-full outline-0 bg-transparent"
            />
          </div>

          <div>
            <label className="block text-left text-lg pt-2 text-white font-medium">
              AKA Name
            </label>
            <input
              type="text"
              name="akaName"
              placeholder="Default: AKA or Full Legal Name"
              value={formData.akaName}
              onChange={handleInputChange}
              className="text-white placeholder:text-gray-300 border-2 border-t-0 border-l-0 border-r-0 border-[#e6e7e9] py-3 pr-1 w-full outline-0 bg-transparent"
            />
          </div>

          <div>
            <label className="block text-left text-lg pt-2 text-white font-medium">
              Legal Representative
            </label>
            <input
              type="text"
              name="legalRepresentative"
              placeholder="Enter Legal Representative"
              value={formData.legalRepresentative}
              onChange={handleInputChange}
              className="text-white placeholder:text-gray-300 border-2 border-t-0 border-l-0 border-r-0 border-[#e6e7e9] py-3 pr-1 w-full outline-0 bg-transparent"
            />
          </div>

          <div>
            <label className="block text-left text-lg pt-2 text-white font-medium">
              Login Email
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
              Secondary Email
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

          <div>
            <label className="block text-left text-lg pt-2 text-white font-medium">
              Organization Type
            </label>
            <CustomDropdown
              name="organizationType"
              value={formData.organizationType}
              onChange={handleInputChange}
              placeholder="Select type"
              options={[
                { value: "team", label: "Team (single team)" },
                { value: "club", label: "Club (multi-team)" },
                { value: "university", label: "University / College" }
              ]}
            />
          </div>

          <div>
            <label className="block text-left text-lg pt-2 text-white font-medium">
              Profit Type
            </label>
            <CustomDropdown
              name="profitType"
              value={formData.profitType}
              onChange={handleInputChange}
              placeholder="Select type"
              options={[
                { value: "for-profit", label: "For profit" },
                { value: "non-profit", label: "Non-profit" }
              ]}
            />
          </div>

          <div>
            <label className="block text-left text-lg pt-2 text-white font-medium">
              Primary Sport
            </label>
            <CustomDropdown
              name="primarySport"
              value={formData.primarySport}
              onChange={handleInputChange}
              placeholder="Select sport"
              options={[
                { value: "football", label: "Football" },
                { value: "basketball", label: "Basketball" },
                { value: "tennis", label: "Tennis" },
                { value: "other", label: "Other" }
              ]}
            />
          </div>

          <div>
            <label className="block text-left text-lg pt-2 text-white font-medium">
              Youth Scope
            </label>
            <CustomDropdown
              name="youthScope"
              value={formData.youthScope}
              onChange={handleInputChange}
              placeholder="Select scope"
              options={[
                { value: "not-youth", label: "Not youth-focused" },
                { value: "youth", label: "Youth-focused" },
                { value: "mixed", label: "Mixed youth and adult" }
              ]}
            />
          </div>

          {/* Team Info */}
          <div className="md:col-span-2 mt-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Team Information</h2>
          </div>

          <div>
            <label className="block text-left text-lg pt-2 text-white font-medium">
              Team Name
            </label>
            <input
              type="text"
              name="teamName"
              placeholder="Enter Team Name"
              value={formData.teamName}
              onChange={handleInputChange}
              className="text-white placeholder:text-gray-300 border-2 border-t-0 border-l-0 border-r-0 border-[#e6e7e9] py-3 pr-1 w-full outline-0 bg-transparent"
            />
          </div>

          <div>
            <label className="block text-left text-lg pt-2 text-white font-medium">
              Team Sport
            </label>
            <input
              type="text"
              name="teamSport"
              placeholder="e.g. Basketball"
              value={formData.teamSport}
              onChange={handleInputChange}
              className="text-white placeholder:text-gray-300 border-2 border-t-0 border-l-0 border-r-0 border-[#e6e7e9] py-3 pr-1 w-full outline-0 bg-transparent"
            />
          </div>

          <div>
            <label className="block text-left text-lg pt-2 text-white font-medium">
              Team 1 Name
            </label>
            <input
              type="text"
              name="team1Name"
              placeholder="Enter Team 1 Name"
              value={formData.team1Name}
              onChange={handleInputChange}
              className="text-white placeholder:text-gray-300 border-2 border-t-0 border-l-0 border-r-0 border-[#e6e7e9] py-3 pr-1 w-full outline-0 bg-transparent"
            />
          </div>

          <div>
            <label className="block text-left text-lg pt-2 text-white font-medium">
              Team 1 Sport
            </label>
            <input
              type="text"
              name="team1Sport"
              placeholder="e.g. Football"
              value={formData.team1Sport}
              onChange={handleInputChange}
              className="text-white placeholder:text-gray-300 border-2 border-t-0 border-l-0 border-r-0 border-[#e6e7e9] py-3 pr-1 w-full outline-0 bg-transparent"
            />
          </div>

          <div>
            <label className="block text-left text-lg pt-2 text-white font-medium">
              Team 2 Name
            </label>
            <input
              type="text"
              name="team2Name"
              placeholder="Enter Team 2 Name"
              value={formData.team2Name}
              onChange={handleInputChange}
              className="text-white placeholder:text-gray-300 border-2 border-t-0 border-l-0 border-r-0 border-[#e6e7e9] py-3 pr-1 w-full outline-0 bg-transparent"
            />
          </div>

          <div>
            <label className="block text-left text-lg pt-2 text-white font-medium">
              Team 2 Sport
            </label>
            <input
              type="text"
              name="team2Sport"
              placeholder="e.g. Volleyball"
              value={formData.team2Sport}
              onChange={handleInputChange}
              className="text-white placeholder:text-gray-300 border-2 border-t-0 border-l-0 border-r-0 border-[#e6e7e9] py-3 pr-1 w-full outline-0 bg-transparent"
            />
          </div>

          <div>
            <label className="block text-left text-lg pt-2 text-white font-medium">
              Team 3 Name
            </label>
            <input
              type="text"
              name="team3Name"
              placeholder="Enter Team 3 Name"
              value={formData.team3Name}
              onChange={handleInputChange}
              className="text-white placeholder:text-gray-300 border-2 border-t-0 border-l-0 border-r-0 border-[#e6e7e9] py-3 pr-1 w-full outline-0 bg-transparent"
            />
          </div>

          <div>
            <label className="block text-left text-lg pt-2 text-white font-medium">
              Team 3 Sport
            </label>
            <input
              type="text"
              name="team3Sport"
              placeholder="e.g. Hockey"
              value={formData.team3Sport}
              onChange={handleInputChange}
              className="text-white placeholder:text-gray-300 border-2 border-t-0 border-l-0 border-r-0 border-[#e6e7e9] py-3 pr-1 w-full outline-0 bg-transparent"
            />
          </div>

          <div>
            <label className="block text-left text-lg pt-2 text-white font-medium">
              Team 4 Name
            </label>
            <input
              type="text"
              name="team4Name"
              placeholder="Enter Team 4 Name"
              value={formData.team4Name}
              onChange={handleInputChange}
              className="text-white placeholder:text-gray-300 border-2 border-t-0 border-l-0 border-r-0 border-[#e6e7e9] py-3 pr-1 w-full outline-0 bg-transparent"
            />
          </div>

          <div>
            <label className="block text-left text-lg pt-2 text-white font-medium">
              Team 4 Sport
            </label>
            <input
              type="text"
              name="team4Sport"
              placeholder="e.g. Swimming"
              value={formData.team4Sport}
              onChange={handleInputChange}
              className="text-white placeholder:text-gray-300 border-2 border-t-0 border-l-0 border-r-0 border-[#e6e7e9] py-3 pr-1 w-full outline-0 bg-transparent"
            />
          </div>

          <div>
            <label className="block text-left text-lg pt-2 text-white font-medium">
              Team 5 Name
            </label>
            <input
              type="text"
              name="team5Name"
              placeholder="Enter Team 5 Name"
              value={formData.team5Name}
              onChange={handleInputChange}
              className="text-white placeholder:text-gray-300 border-2 border-t-0 border-l-0 border-r-0 border-[#e6e7e9] py-3 pr-1 w-full outline-0 bg-transparent"
            />
          </div>

          <div>
            <label className="block text-left text-lg pt-2 text-white font-medium">
              Team 5 Sport
            </label>
            <input
              type="text"
              name="team5Sport"
              placeholder="e.g. Track and Field"
              value={formData.team5Sport}
              onChange={handleInputChange}
              className="text-white placeholder:text-gray-300 border-2 border-t-0 border-l-0 border-r-0 border-[#e6e7e9] py-3 pr-1 w-full outline-0 bg-transparent"
            />
          </div>

          {/* Additional Info */}
          <div className="md:col-span-2 mt-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Additional Information</h2>
          </div>

          <div>
            <label className="block text-left text-lg pt-2 text-white font-medium">
              Main Website
            </label>
            <input
              type="url"
              name="mainWebsite"
              placeholder="https://www.example.com"
              value={formData.mainWebsite}
              onChange={handleInputChange}
              className="text-white placeholder:text-gray-300 border-2 border-t-0 border-l-0 border-r-0 border-[#e6e7e9] py-3 pr-1 w-full outline-0 bg-transparent"
            />
          </div>

          <div>
            <label className="block text-left text-lg pt-2 text-white font-medium">
              Website 1
            </label>
            <input
              type="url"
              name="website1"
              placeholder="https://www.example.com"
              value={formData.website1}
              onChange={handleInputChange}
              className="text-white placeholder:text-gray-300 border-2 border-t-0 border-l-0 border-r-0 border-[#e6e7e9] py-3 pr-1 w-full outline-0 bg-transparent"
            />
          </div>

          <div>
            <label className="block text-left text-lg pt-2 text-white font-medium">
              Website 2
            </label>
            <input
              type="url"
              name="website2"
              placeholder="https://www.example.com"
              value={formData.website2}
              onChange={handleInputChange}
              className="text-white placeholder:text-gray-300 border-2 border-t-0 border-l-0 border-r-0 border-[#e6e7e9] py-3 pr-1 w-full outline-0 bg-transparent"
            />
          </div>

          <div>
            <label className="block text-left text-lg pt-2 text-white font-medium">
              Website 3
            </label>
            <input
              type="url"
              name="website3"
              placeholder="https://www.example.com"
              value={formData.website3}
              onChange={handleInputChange}
              className="text-white placeholder:text-gray-300 border-2 border-t-0 border-l-0 border-r-0 border-[#e6e7e9] py-3 pr-1 w-full outline-0 bg-transparent"
            />
          </div>

          <div>
            <label className="block text-left text-lg pt-2 text-white font-medium">
              Website 4
            </label>
            <input
              type="url"
              name="website4"
              placeholder="https://www.example.com"
              value={formData.website4}
              onChange={handleInputChange}
              className="text-white placeholder:text-gray-300 border-2 border-t-0 border-l-0 border-r-0 border-[#e6e7e9] py-3 pr-1 w-full outline-0 bg-transparent"
            />
          </div>

          <div>
            <label className="block text-left text-lg pt-2 text-white font-medium">
              Website 5
            </label>
            <input
              type="url"
              name="website5"
              placeholder="https://www.example.com"
              value={formData.website5}
              onChange={handleInputChange}
              className="text-white placeholder:text-gray-300 border-2 border-t-0 border-l-0 border-r-0 border-[#e6e7e9] py-3 pr-1 w-full outline-0 bg-transparent"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-left text-lg pt-2 text-white font-medium">
              Bio
            </label>
            <textarea
              name="bio"
              placeholder="Enter short bio"
              value={formData.bio}
              onChange={handleInputChange}
              rows="3"
              className="text-white placeholder:text-gray-300 border-2 border-t-0 border-l-0 border-r-0 border-[#e6e7e9] py-3 pr-1 w-full outline-0 bg-transparent resize-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-left text-lg pt-2 text-white font-medium">
              Motto
            </label>
            <input
              type="text"
              name="motto"
              placeholder="Enter motto or slogan"
              value={formData.motto}
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

export default TeamProfile;
