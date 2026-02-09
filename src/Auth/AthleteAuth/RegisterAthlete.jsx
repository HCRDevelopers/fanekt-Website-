import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "./Assets/logo.png";
import defaultAvatar from "../FanAuth/Assets/avatar.jpg";
import { IoEyeOutline, IoEyeOffOutline, IoChevronDown, IoChevronUp } from "react-icons/io5";
import { motion } from "framer-motion";
import sideImage from "./Assets/authimg.png";
import toast, { Toaster } from "react-hot-toast";
import { athleteSignup } from "../../API/apiService";

// Custom Dropdown Component
const CustomDropdown = ({ options, value, onChange, placeholder = "Select option", name }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
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
        className="text-white placeholder:text-[16px] placeholder:font-[400] placeholder:text-gray-300 border-2 border-t-0 border-l-0 border-r-0 border-[#e6e7e9] py-3 pl-1 w-full outline-0 bg-transparent text-left flex items-center justify-between"
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

function RegisterAthlete() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [profileImageFile, setProfileImageFile] = useState(null);
  const fileInputRef = useRef(null);
  const [showPasswords, setShowPasswords] = useState(false);
  const [formData, setFormData] = useState({
    fullLegalName: "",
    nickname: "",
    akaName: "",
    sport: "",
    email: "",
    country: "",
    city: "",
    terms: false,
    password: "",
    confirmPassword: ""
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      setFormData(prev => ({
        ...prev,
        [name]: files[0] || null
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handlerPassword = () => {
    setShowPasswords(!showPasswords);
  };

  // Image upload trigger
  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Image change handler
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload a valid image file");
        return;
      }

      setProfileImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.fullLegalName.trim()) {
      toast.error('Full legal name is required');
      return;
    }

    if (!formData.akaName.trim()) {
      toast.error('AKA name is required');
      return;
    }

    if (!formData.sport) {
      toast.error('Sport selection is required');
      return;
    }

    if (!formData.email.trim()) {
      toast.error('Email is required');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    if (!formData.country.trim()) {
      toast.error('Country is required');
      return;
    }

    if (!formData.city.trim()) {
      toast.error('City is required');
      return;
    }

    if (!formData.terms) {
      toast.error('You must accept the Terms and Conditions');
      return;
    }

    if (!formData.password.trim()) {
      toast.error('Password is required');
      return;
    }

    if (!formData.confirmPassword.trim()) {
      toast.error('Confirm password is required');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    // Create FormData for file upload
    const formDataToSend = new FormData();

    // Append all form fields
    formDataToSend.append("full_name", formData.fullLegalName.trim());
    formDataToSend.append("nick_name", formData.nickname.trim() || formData.fullLegalName.trim());
    formDataToSend.append("how_appear", formData.akaName.trim());
    formDataToSend.append("sport", formData.sport);
    formDataToSend.append("email", formData.email.trim().toLowerCase());
    formDataToSend.append("country", formData.country.trim());
    formDataToSend.append("city", formData.city.trim());
    formDataToSend.append("term_condition", formData.terms ? 1 : 0);
    formDataToSend.append("password", formData.password);

    // Append image if exists
    if (profileImageFile) {
      formDataToSend.append("image", profileImageFile);
    } else {
      formDataToSend.append("image", "");
    }

    setLoading(true);

      try {
        const response = await athleteSignup(formDataToSend);
      const data = response?.data;

      if (data?.status) {
        toast.success(data.message || 'Registration successful!');

        setTimeout(() => {
          navigate('/verify-email');
        }, 1000);
      } else {
        toast.error(data?.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);

      let errorMessage = 'Registration failed. Please try again.';

      if (error.response) {
        if (error.response.data?.message) {
          errorMessage = error.response.data.message;
        } else if (error.response.status === 400) {
          errorMessage = 'Invalid data provided. Please check your inputs.';
        } else if (error.response.status === 409) {
          errorMessage = 'Email already exists. Please use a different email.';
        } else if (error.response.status >= 500) {
          errorMessage = 'Server error. Please try again later.';
        }
      } else if (error.request) {
        errorMessage = 'Network error. Please check your connection.';
      }

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex justify-center items-center
                 bg-[linear-gradient(to_bottom_left,_#4a1755_30%,_#352862_50%,_#8a58a2_100%)] lg:h-[100vh]"
    >
      <Toaster />
      {/* Left Side Image */}
      <div className="w-1/2 h-screen hidden lg:block relative overflow-hidden">
        <motion.img
          src={sideImage}
          alt="Background"
          className="w-full h-full p-3 object-cover rounded-[40px]"
        />
      </div>

      {/* Right Side Form */}
      <div className="w-full lg:w-[50%] lg:mb-20 lg:py-0 py-10 flex flex-col items-center justify-center px-3 md:px-6 h-full overflow-y-auto scrollbar-hide">
        <div className="lg:h-[80vh] h-full w-full">
           <div className="w-full flex justify-center">
                     <motion.img
                       animate={{ y: [0, -20, 0] }}
                       transition={{
                         duration: 2,
                         repeat: Infinity,
                         ease: "easeInOut",
                       }}
                       src={logo}
                       alt="Logo"
                       className="h-[120px] w-[120px] block lg:hidden mb-4"
                     />
                   </div>

          <div className="text-center mb-6">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="md:text-[36px] text-white text-[29px] font-[700]"
            >
              Join FANEKT as an Athlete/Other
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-sm text-white/80 mt-2 max-w-md mx-auto"
            >
              Create your personal portal access to manage your verified community. You can later complete verification (KYC) to unlock FAN€KT PAY and financial related features such as monetization through revenue sharing with your verified fans.
            </motion.p>
          </div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            onSubmit={handleSubmit}
            className="w-full mt-3 px-3 md:px-16"
            autoComplete="off"
          >
            {/* Profile Image */}
            <motion.div
              initial={{ y: 200 }}
              animate={{ y: 0 }}
              transition={{ duration: 1 }}
              className="flex mb-8 mt-5"
            >
              <div className="relative flex flex-wrap sm:flex-nowrap justify-center items-center gap-4">
                <img
                  src={image || defaultAvatar}
                  alt="User Avatar"
                  className="w-[150px] h-[150px] border border-[#ffff] rounded-full object-cover cursor-pointer"
                  onClick={handleClick}
                />
                <div>
                  <div className="text-center sm:text-start">
                    <p className="font-medium text-white">Profile Picture</p>
                    <p className="text-white/60">
                      Upload your profile picture (optional)
                    </p>
                  </div>
                  <div
                    onClick={handleClick}
                    className="bg-white/10 mx-auto sm:mx-0 flex items-center my-2 justify-center py-3 w-[50%] gap-3 rounded-lg cursor-pointer border border-white/20"
                  >
                    <button
                      type="button"
                      className="transition font-semibold cursor-pointer text-white"
                    >
                      Upload
                    </button>
                  </div>
                </div>

                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
            </motion.div>

            <div className="space-y-4">
              <div>
                <label className="block text-left text-[18px] pt-2 text-white font-[400]">
                  Your Full Legal Name *
                </label>
                <input
                  type="text"
                  name="fullLegalName"
                  placeholder="Enter Full Legal Name"
                  value={formData.fullLegalName}
                  onChange={handleInputChange}
                  className="text-white placeholder:text-[16px] placeholder:font-[400] placeholder:text-gray-300 border-2 border-t-0 border-l-0 border-r-0 border-[#e6e7e9] py-3 pr-1 w-full outline-0 bg-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-left text-[18px] pt-2 text-white font-[400]">
                  Your Nickname
                </label>
                <input
                  type="text"
                  name="nickname"
                  placeholder="Enter Nickname"
                  value={formData.nickname}
                  onChange={handleInputChange}
                  className="text-white placeholder:text-[16px] placeholder:font-[400] placeholder:text-gray-300 border-2 border-t-0 border-l-0 border-r-0 border-[#e6e7e9] py-3 pr-1 w-full outline-0 bg-transparent"
                />
              </div>

              <div>
                <label className="block text-left text-[18px] pt-2 text-white font-[400]">
                  How you want to appear in search *
                </label>
                <input
                  type="text"
                  name="akaName"
                  placeholder="Default: your Full Legal Name"
                  value={formData.akaName}
                  onChange={handleInputChange}
                  className="text-white placeholder:text-[16px] placeholder:font-[400] placeholder:text-gray-300 border-2 border-t-0 border-l-0 border-r-0 border-[#e6e7e9] py-3 pr-1 w-full outline-0 bg-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-left text-[18px] pt-2 text-white font-[400]">
                  Sport *
                </label>
                <CustomDropdown
                  name="sport"
                  value={formData.sport}
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
                <label className="block text-left text-[18px] pt-2 text-white font-[400]">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="text-white placeholder:text-[16px] placeholder:font-[400] placeholder:text-gray-300 border-2 border-t-0 border-l-0 border-r-0 border-[#e6e7e9] py-3 pr-1 w-full outline-0 bg-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-left text-[18px] pt-2 text-white font-[400]">
                  Country *
                </label>
                <input
                  type="text"
                  name="country"
                  placeholder="Enter Country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="text-white placeholder:text-[16px] placeholder:font-[400] placeholder:text-gray-300 border-2 border-t-0 border-l-0 border-r-0 border-[#e6e7e9] py-3 pr-1 w-full outline-0 bg-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-left text-[18px] pt-2 text-white font-[400]">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  placeholder="Enter City"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="text-white placeholder:text-[16px] placeholder:font-[400] placeholder:text-gray-300 border-2 border-t-0 border-l-0 border-r-0 border-[#e6e7e9] py-3 pr-1 w-full outline-0 bg-transparent"
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="terms"
                  checked={formData.terms}
                  onChange={handleInputChange}
                  className="w-4 h-4"
                  required
                />
                <label className="text-white text-sm">
                  I have read and accept the Terms and Conditions.
                </label>
              </div>

              <div className="relative">
                <label className="block text-left text-[18px] pt-2 text-white font-[400]">
                  Password *
                </label>
                <input
                  type={showPasswords ? "text" : "password"}
                  name="password"
                  placeholder="Enter Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="text-white placeholder:text-[16px] placeholder:font-[400] placeholder:text-gray-300 border-2 border-t-0 border-l-0 border-r-0 py-3 pr-12 w-full border-[#e6e7e9] outline-0 bg-transparent"
                  required
                />
                {showPasswords ? (
                  <IoEyeOutline
                    onClick={handlerPassword}
                    className="text-[#aeafb3] absolute right-1 top-11 text-[19px] cursor-pointer"
                  />
                ) : (
                  <IoEyeOffOutline
                    onClick={handlerPassword}
                    className="text-[#aeafb3] absolute right-1 top-11 text-[19px] cursor-pointer"
                  />
                )}
              </div>

              <div>
                <label className="block text-left text-[18px] pt-2 text-white font-[400]">
                  Confirm Password *
                </label>
                <input
                  type={showPasswords ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="text-white placeholder:text-[16px] placeholder:font-[400] placeholder:text-gray-300 border-2 border-t-0 border-l-0 border-r-0 py-3 pr-1 w-full border-[#e6e7e9] outline-0 bg-transparent"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mx-auto mt-8 py-3 text-white text-lg text-center font-medium rounded-lg cursor-pointer
                       bg-[linear-gradient(to_bottom_right,_#3b82f6_0%,_#8b5cf6_30%,_#ef4444_100%)]
                       hover:opacity-90 transition-all duration-300 shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </motion.form>
        </div>
      </div>
    </div>
  );
}

export default RegisterAthlete;
