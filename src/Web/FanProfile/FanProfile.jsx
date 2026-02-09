import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { IoEyeOutline, IoEyeOffOutline, IoChevronDown, IoChevronUp, IoCamera, IoKey } from 'react-icons/io5';
import { getProfile, fanUpdate } from '../../API/apiService';
import { useMyContext } from '../../context/context';
import toast, { Toaster } from 'react-hot-toast';
import ChangePasswordModal from './Modals/ChangePasswordModal';
import ParentGuardianModal from './Modals/ParentGuardianModal';

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

function FanProfile() {
  const { setUserProfile } = useMyContext();
  const [profileImage, setProfileImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
  const [isParentGuardianModalOpen, setIsParentGuardianModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    surname: "",
    aka: "",
    email: "",
    country: "",
    city: "",
    dob: "",
    age: "",
    homeFanType: "",
    homeFanName: "",
    globalFan1Type: "",
    globalFan1Name: "",
    globalFan2Type: "",
    globalFan2Name: "",
    globalFan3Type: "",
    globalFan3Name: "",
    address: "",
    gender: "",
    sport: "",
    hobbies: ""
  });

  const fileInputRef = useRef(null);

  useEffect(() => {
    // Fetch current profile data
    const fetchProfile = async () => {
      try {
        const response = await getProfile();
        if (response.data?.status) {
          const userData = response.data.data.user;
          const fanData = response.data.data.user.fan;
          setFormData({
            firstName: fanData.first_name || "",
            surname: fanData.sur_name || "",
            aka: fanData.nick_name || "",
            email: userData.email || "",
            country: userData.country || "",
            city: userData.city || "",
            dob: fanData.date_of_birth || "",
            age: fanData.age || "",
            homeFanType: fanData.home_fan_of_type || "",
            homeFanName: fanData.home_fan_of_name || "",
            globalFan1Type: fanData.global_fan_of_type_1 || "",
            globalFan1Name: fanData.global_fan_of_name_1 || "",
            globalFan2Type: fanData.global_fan_of_type_2 || "",
            globalFan2Name: fanData.global_fan_of_name_2 || "",
            globalFan3Type: fanData.global_fan_of_type_3 || "",
            globalFan3Name: fanData.global_fan_of_name_3 || "",
            address: fanData.full_address || "",
            gender: fanData.gender || "",
            sport: fanData.preferred_sport || "",
            hobbies: fanData.hobbies || ""
          });
          if (userData.image) {
            setProfileImage(`https://api.fanekt.com/${userData.image}`);
          }

          // Set user profile data in context for sidebar
          setUserProfile({
            name: `${fanData.first_name || ''} ${fanData.sur_name || ''}`.trim() || userData.name || "",
            email: userData.email || "",
            profileImage: userData.image ? `https://api.fanekt.com/${userData.image}` : ""
          });
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
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

  const handleUpdate = async () => {
    try {
      let updateData;

      if (selectedFile) {
        // Use FormData for binary file upload
        updateData = new FormData();
        updateData.append('first_name', formData.firstName);
        updateData.append('sur_name', formData.surname);
        updateData.append('nick_name', formData.aka);
        updateData.append('email', formData.email);
        updateData.append('country', formData.country);
        updateData.append('city', formData.city);
        updateData.append('image', selectedFile); // Binary file
        updateData.append('date_of_birth', formData.dob);
        updateData.append('age', formData.age ? parseInt(formData.age) : '');
        updateData.append('gender', formData.gender);
        updateData.append('preferred_sport', formData.sport);
        updateData.append('hobbies', formData.hobbies);
        updateData.append('home_fan_of_type', formData.homeFanType);
        updateData.append('home_fan_of_name', formData.homeFanName);
        updateData.append('global_fan_of_type_1', formData.globalFan1Type);
        updateData.append('global_fan_of_name_1', formData.globalFan1Name);
        updateData.append('global_fan_of_type_2', formData.globalFan2Type);
        updateData.append('global_fan_of_name_2', formData.globalFan2Name);
        updateData.append('global_fan_of_type_3', formData.globalFan3Type);
        updateData.append('global_fan_of_name_3', formData.globalFan3Name);
        updateData.append('full_address', formData.address);
      } else {
        // Use regular object for non-file updates
        updateData = {
          first_name: formData.firstName,
          sur_name: formData.surname,
          nick_name: formData.aka,
          email: formData.email,
          country: formData.country,
          city: formData.city,
          date_of_birth: formData.dob,
          age: parseInt(formData.age) || null,
          gender: formData.gender,
          preferred_sport: formData.sport,
          hobbies: formData.hobbies,
          home_fan_of_type: formData.homeFanType,
          home_fan_of_name: formData.homeFanName,
          global_fan_of_type_1: formData.globalFan1Type,
          global_fan_of_name_1: formData.globalFan1Name,
          global_fan_of_type_2: formData.globalFan2Type,
          global_fan_of_name_2: formData.globalFan2Name,
          global_fan_of_type_3: formData.globalFan3Type,
          global_fan_of_name_3: formData.globalFan3Name,
          full_address: formData.address
        };
      }

      const response = await fanUpdate(updateData);
      if (response.data?.status) {
        toast.success("Profile updated successfully");
        setSelectedFile(null); // Clear selected file after successful update
      } else {
        toast.error("Failed to update profile");
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error("Failed to update profile");
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
            Fan Profile
          </h1>
          <p className="text-gray-400 text-lg">
            Manage your personal information and preferences
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
                  {formData.firstName?.charAt(0) || 'F'}
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
          {/* Basic Info */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-semibold text-white mb-4">Basic Information</h2>
          </div>

          <div>
            <label className="block text-left text-lg pt-2 text-white font-medium">
              First name
            </label>
            <input
              type="text"
              name="firstName"
              placeholder="Enter First Name"
              value={formData.firstName}
              onChange={handleInputChange}
              className="text-white placeholder:text-gray-300 border-2 border-t-0 border-l-0 border-r-0 border-[#e6e7e9] py-3 pr-1 w-full outline-0 bg-transparent"
            />
          </div>

          <div>
            <label className="block text-left text-lg pt-2 text-white font-medium">
              Surname
            </label>
            <input
              type="text"
              name="surname"
              placeholder="Enter Surname"
              value={formData.surname}
              onChange={handleInputChange}
              className="text-white placeholder:text-gray-300 border-2 border-t-0 border-l-0 border-r-0 border-[#e6e7e9] py-3 pr-1 w-full outline-0 bg-transparent"
            />
          </div>

          <div>
            <label className="block text-left text-lg pt-2 text-white font-medium">
              AKA / Nickname
            </label>
            <input
              type="text"
              name="aka"
              placeholder="How you want to appear in rankings"
              value={formData.aka}
              onChange={handleInputChange}
              className="text-white placeholder:text-gray-300 border-2 border-t-0 border-l-0 border-r-0 border-[#e6e7e9] py-3 pr-1 w-full outline-0 bg-transparent"
            />
          </div>

          <div>
            <label className="block text-left text-lg pt-2 text-white font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
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
              Date of birth
            </label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleInputChange}
              className="text-white placeholder:text-gray-300 border-2 border-t-0 border-l-0 border-r-0 border-[#e6e7e9] py-3 pr-1 w-full outline-0 bg-transparent"
            />
          </div>

          <div>
            <label className="block text-left text-lg pt-2 text-white font-medium">
              Age
            </label>
            <input
              type="number"
              name="age"
              placeholder="Enter Age"
              value={formData.age}
              onChange={handleInputChange}
              className="text-white placeholder:text-gray-300 border-2 border-t-0 border-l-0 border-r-0 border-[#e6e7e9] py-3 pr-1 w-full outline-0 bg-transparent"
            />
          </div>

          {/* Fan Preferences */}
          <div className="md:col-span-2 mt-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Fan Preferences</h2>
          </div>

          <div>
            <label className="block text-left text-lg pt-2 text-white font-medium">
              Home fan of – type
            </label>
            <CustomDropdown
              name="homeFanType"
              value={formData.homeFanType}
              onChange={handleInputChange}
              placeholder="Select type"
              options={[
                { value: "club", label: "Club" },
                { value: "uni", label: "Uni" },
                { value: "team", label: "Team" },
                { value: "athlete", label: "Athlete" },
                { value: "other", label: "Other" }
              ]}
            />
          </div>

          <div>
            <label className="block text-left text-lg pt-2 text-white font-medium">
              Home fan of – name
            </label>
            <input
              type="text"
              name="homeFanName"
              placeholder="e.g. FC Rouen 1899, LA Lakers, Novak Djokovic"
              value={formData.homeFanName}
              onChange={handleInputChange}
              className="text-white placeholder:text-gray-300 border-2 border-t-0 border-l-0 border-r-0 border-[#e6e7e9] py-3 pr-1 w-full outline-0 bg-transparent"
            />
          </div>

          <div>
            <label className="block text-left text-lg pt-2 text-white font-medium">
              Global fan #1 – type
            </label>
            <CustomDropdown
              name="globalFan1Type"
              value={formData.globalFan1Type}
              onChange={handleInputChange}
              placeholder="Select type"
              options={[
                { value: "club", label: "Club" },
                { value: "team", label: "Team" },
                { value: "athlete", label: "Athlete" },
                { value: "other", label: "Other" }
              ]}
            />
          </div>

          <div>
            <label className="block text-left text-lg pt-2 text-white font-medium">
              Global fan #1 – name
            </label>
            <input
              type="text"
              name="globalFan1Name"
              placeholder="Your #1 global favorite"
              value={formData.globalFan1Name}
              onChange={handleInputChange}
              className="text-white placeholder:text-gray-300 border-2 border-t-0 border-l-0 border-r-0 border-[#e6e7e9] py-3 pr-1 w-full outline-0 bg-transparent"
            />
          </div>

          <div>
            <label className="block text-left text-lg pt-2 text-white font-medium">
              Global fan #2 – type
            </label>
            <CustomDropdown
              name="globalFan2Type"
              value={formData.globalFan2Type}
              onChange={handleInputChange}
              placeholder="Select type"
              options={[
                { value: "club", label: "Club" },
                { value: "team", label: "Team" },
                { value: "athlete", label: "Athlete" },
                { value: "other", label: "Other" }
              ]}
            />
          </div>

          <div>
            <label className="block text-left text-lg pt-2 text-white font-medium">
              Global fan #2 – name
            </label>
            <input
              type="text"
              name="globalFan2Name"
              placeholder="Your #2 global favorite"
              value={formData.globalFan2Name}
              onChange={handleInputChange}
              className="text-white placeholder:text-gray-300 border-2 border-t-0 border-l-0 border-r-0 border-[#e6e7e9] py-3 pr-1 w-full outline-0 bg-transparent"
            />
          </div>

          <div>
            <label className="block text-left text-lg pt-2 text-white font-medium">
              Global fan #3 – type
            </label>
            <CustomDropdown
              name="globalFan3Type"
              value={formData.globalFan3Type}
              onChange={handleInputChange}
              placeholder="Select type"
              options={[
                { value: "club", label: "Club" },
                { value: "team", label: "Team" },
                { value: "athlete", label: "Athlete" },
                { value: "other", label: "Other" }
              ]}
            />
          </div>

          <div>
            <label className="block text-left text-lg pt-2 text-white font-medium">
              Global fan #3 – name
            </label>
            <input
              type="text"
              name="globalFan3Name"
              placeholder="Your #3 global favorite"
              value={formData.globalFan3Name}
              onChange={handleInputChange}
              className="text-white placeholder:text-gray-300 border-2 border-t-0 border-l-0 border-r-0 border-[#e6e7e9] py-3 pr-1 w-full outline-0 bg-transparent"
            />
          </div>

          {/* Optional Info */}
          <div className="md:col-span-2 mt-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Optional Information</h2>
          </div>

          <div className="md:col-span-2">
            <label className="block text-left text-lg pt-2 text-white font-medium">
              Full address (for deliveries)
            </label>
            <input
              type="text"
              name="address"
              placeholder="Enter Full Address"
              value={formData.address}
              onChange={handleInputChange}
              className="text-white placeholder:text-gray-300 border-2 border-t-0 border-l-0 border-r-0 border-[#e6e7e9] py-3 pr-1 w-full outline-0 bg-transparent"
            />
          </div>

          <div>
            <label className="block text-left text-lg pt-2 text-white font-medium">
              Gender
            </label>
            <CustomDropdown
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              placeholder="Prefer not to say"
              options={[
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
                { value: "other", label: "Other" }
              ]}
            />
          </div>

          <div>
            <label className="block text-left text-lg pt-2 text-white font-medium">
              Preferred sport
            </label>
            <CustomDropdown
              name="sport"
              value={formData.sport}
              onChange={handleInputChange}
              placeholder="Select sport"
              options={[
                { value: "football_soccer", label: "Football (Soccer)" },
                { value: "football_american", label: "Football (American)" },
                { value: "cricket", label: "Cricket" },
                { value: "hockey_field", label: "Hockey (Field)" },
                { value: "hockey_ice", label: "Hockey (Ice)" },
                { value: "basketball", label: "Basketball" },
                { value: "baseball", label: "Baseball" },
                { value: "golf", label: "Golf" },
                { value: "tennis", label: "Tennis" },
                { value: "volleyball", label: "Volleyball" },
                { value: "athletics", label: "Athletics" },
                { value: "darts", label: "Darts" },
                { value: "handball", label: "Handball" },
                { value: "rugby", label: "Rugby" },
                { value: "table_tennis", label: "Table Tennis" },
                { value: "other", label: "Other" }
              ]}
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-left text-lg pt-2 text-white font-medium">
              Hobbies
            </label>
            <input
              type="text"
              name="hobbies"
              placeholder="Enter Hobbies"
              value={formData.hobbies}
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
              onClick={handleUpdate}
              className="px-8 py-3 text-white text-lg font-medium rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg"
            >
              Update
            </motion.button>
          </div>
        </motion.form>
        <div className="py-15 border-t border-b border-white mt-8 flex gap-3 justify-between flex-wrap w-full">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={() => setIsChangePasswordModalOpen(true)}
            className="md:px-8 px-6 py-3 sm:w-auto w-full text-white text-lg font-medium rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <IoKey className="text-lg" />
            Change Password
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={() => setIsParentGuardianModalOpen(true)}
            className="md:px-8 px-6 py-3 sm:w-auto w-full text-white text-lg font-medium rounded-lg bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <IoKey className="text-lg" />
            Parent/Guardian License
          </motion.button>
        </div>
      </motion.div>

      {/* Change Password Modal */}
      <ChangePasswordModal
        isOpen={isChangePasswordModalOpen}
        onClose={() => setIsChangePasswordModalOpen(false)}
      />
      
      {/* Parent/Guardian Modal */}
      <ParentGuardianModal
        isOpen={isParentGuardianModalOpen}
        onClose={() => setIsParentGuardianModalOpen(false)}
      />
    </div>
  );
}

export default FanProfile;
