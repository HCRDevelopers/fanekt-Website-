import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "./Assets/logo.png";
import defaultAvatar from "../FanAuth/Assets/avatar.jpg";
import { IoEyeOutline, IoEyeOffOutline, IoChevronDown, IoChevronUp } from "react-icons/io5";
import { motion } from "framer-motion";
import sideImage from "./Assets/authimg.png";
import Back from "../FanAuth/Assets/back-arrow.png";
import toast, { Toaster } from "react-hot-toast";
import { teamSignup } from "../../API/apiService";

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

function RegisterTeam() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [profileImageFile, setProfileImageFile] = useState(null);
  const fileInputRef = useRef(null);
  const [showPasswords, setShowPasswords] = useState(false);
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
    terms: false,
    password: "",
    confirmPassword: ""
  });

  const getRequiredFieldsForStep = (stepNumber) => {
    switch (stepNumber) {
      case 1:
        return [
          { field: 'fullLegalName', message: 'Full legal name is required' },
          { field: 'registrationNumber', message: 'Registration number is required' },
          { field: 'publicName', message: 'Public name is required' },
          { field: 'akaName', message: 'AKA name is required' },
          { field: 'legalRepresentative', message: 'Legal representative is required' },
          { field: 'loginEmail', message: 'Login email is required' },
          { field: 'secondaryEmail', message: 'Secondary email is required' },
          { field: 'country', message: 'Country is required' },
          { field: 'city', message: 'City is required' },
          { field: 'organizationType', message: 'Organization type is required' },
          { field: 'profitType', message: 'Profit type is required' },
          { field: 'primarySport', message: 'Primary sport is required' },
          { field: 'youthScope', message: 'Youth scope is required' }
        ];
      case 2:
        return [
          { field: 'teamName', message: 'Team name is required' },
          { field: 'teamSport', message: 'Team sport is required' },
          { field: 'team1Name', message: 'Team 1 name is required' },
          { field: 'team1Sport', message: 'Team 1 sport is required' },
          { field: 'team2Name', message: 'Team 2 name is required' },
          { field: 'team2Sport', message: 'Team 2 sport is required' },
          { field: 'team3Name', message: 'Team 3 name is required' },
          { field: 'team3Sport', message: 'Team 3 sport is required' },
          { field: 'team4Name', message: 'Team 4 name is required' },
          { field: 'team4Sport', message: 'Team 4 sport is required' },
          { field: 'team5Name', message: 'Team 5 name is required' },
          { field: 'team5Sport', message: 'Team 5 sport is required' }
        ];
      case 3:
        return [
          { field: 'mainWebsite', message: 'Main website is required' },
          { field: 'website2', message: 'Website 2 is required' },
          { field: 'website3', message: 'Website 3 is required' },
          { field: 'website4', message: 'Website 4 is required' },
          { field: 'website5', message: 'Website 5 is required' },
          { field: 'instagram', message: 'Instagram is required' },
          { field: 'facebook', message: 'Facebook is required' },
          { field: 'twitter', message: 'Twitter is required' },
          { field: 'tiktok', message: 'TikTok is required' },
          { field: 'youtube', message: 'YouTube is required' },
          { field: 'linkedin', message: 'LinkedIn is required' },
          { field: 'bio', message: 'Bio is required' },
          { field: 'motto', message: 'Motto is required' }
        ];
      case 4:
        return [
          { field: 'terms', message: 'You must accept the Terms and Conditions' },
          { field: 'password', message: 'Password is required' },
          { field: 'confirmPassword', message: 'Confirm password is required' }
        ];
      default:
        return [];
    }
  };

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

  const nextStep = async (e) => {
    e.preventDefault();

    if (step < 4) {
      // Validate required fields in current step before proceeding
      const requiredFieldsInStep = getRequiredFieldsForStep(step);

      for (const { field, message } of requiredFieldsInStep) {
        if (!formData[field] || (typeof formData[field] === 'string' && !formData[field].trim())) {
          toast.error(message);
          return;
        }
      }

      // Additional validations for step 1
      if (step === 1) {
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.loginEmail)) {
          toast.error('Please enter a valid email address');
          return;
        }
      }

      setStep(step + 1);
    } else if (step === 4) {
      // Validate required fields in step 4
      const requiredFieldsInStep = getRequiredFieldsForStep(step);

      for (const { field, message } of requiredFieldsInStep) {
        if (!formData[field] || (typeof formData[field] === 'string' && !formData[field].trim())) {
          toast.error(message);
          return;
        }
      }

      // Additional validations for final submission
      // Validate password match
      if (formData.password !== formData.confirmPassword) {
        toast.error('Passwords do not match');
        return;
      }

      // Create FormData for file upload
      const formDataToSend = new FormData();

      // Append all form fields
      formDataToSend.append("full_name", formData.fullLegalName.trim());
      formDataToSend.append("registration_no", formData.registrationNumber.trim() || "");
      formDataToSend.append("aka_name", formData.akaName.trim());
      formDataToSend.append("how_appear", formData.publicName.trim());
      formDataToSend.append("legal_represent", formData.legalRepresentative.trim() || "");
      formDataToSend.append("login_email", formData.loginEmail.trim().toLowerCase());
      formDataToSend.append("sec_email", formData.secondaryEmail.trim() || "");
      formDataToSend.append("country", formData.country.trim());
      formDataToSend.append("city", formData.city.trim());
      formDataToSend.append("type_of_org", formData.organizationType || "");
      formDataToSend.append("profit_non_profit", formData.profitType || "");
      formDataToSend.append("primary_sport", formData.primarySport);
      formDataToSend.append("adult_scope", formData.youthScope || "");
      formDataToSend.append("team_name", formData.teamName.trim() || "");
      formDataToSend.append("sport_name", formData.teamSport.trim() || "");
      formDataToSend.append("team_name_1", formData.team1Name.trim() || "");
      formDataToSend.append("sport_name_1", formData.team1Sport.trim() || "");
      formDataToSend.append("team_name_2", formData.team2Name.trim() || "");
      formDataToSend.append("sport_name_2", formData.team2Sport.trim() || "");
      formDataToSend.append("team_name_3", formData.team3Name.trim() || "");
      formDataToSend.append("sport_name_3", formData.team3Sport.trim() || "");
      formDataToSend.append("team_name_4", formData.team4Name.trim() || "");
      formDataToSend.append("sport_name_4", formData.team4Sport.trim() || "");
      formDataToSend.append("team_name_5", formData.team5Name.trim() || "");
      formDataToSend.append("sport_name_5", formData.team5Sport.trim() || "");
      formDataToSend.append("main_website", formData.mainWebsite.trim() || "");
      formDataToSend.append("websites_1", formData.website2.trim() || "");
      formDataToSend.append("websites_2", formData.website3.trim() || "");
      formDataToSend.append("websites_3", formData.website4.trim() || "");
      formDataToSend.append("websites_4", formData.website5.trim() || "");
      formDataToSend.append("websites_5", ""); // No website5 in payload
      formDataToSend.append("instagram", formData.instagram.trim() || "");
      formDataToSend.append("facebook", formData.facebook.trim() || "");
      formDataToSend.append("twitter", formData.twitter.trim() || "");
      formDataToSend.append("tiktok", formData.tiktok.trim() || "");
      formDataToSend.append("youtube", formData.youtube.trim() || "");
      formDataToSend.append("linkedin", formData.linkedin.trim() || "");
      formDataToSend.append("short_bio", formData.bio.trim() || "");
      formDataToSend.append("slogan", formData.motto.trim() || "");

      // Append image if exists
      if (profileImageFile) {
        formDataToSend.append("image", profileImageFile);
      } else {
        formDataToSend.append("image", "");
      }

      formDataToSend.append("term_condition", formData.terms ? 1 : 0);
      formDataToSend.append("password", formData.password);

      setLoading(true);

      try {
        const response = await teamSignup(formDataToSend);
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
    }
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
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
      <div className="w-full lg:w-[50%] lg:mb-20 lg:py-0 py-10 flex flex-col items-center justify-center px-3 md:px-6 h-full overflow-y-auto scrollbar-hide relative">
        {/* Back Arrow */}

        <div className="lg:h-[80vh] h-full w-full relative">

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
            {step > 1 && (
              <img
                onClick={prevStep}
                src={Back}
                className="absolute top-0 left-0 w-[50px] cursor-pointer z-10"
                alt="Back"
              />
            )}
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="md:text-[36px] text-white text-[29px] font-[700]"
            >
              {step === 1 && "Join FANEKT as Clubs/Uni/Teams"}
              {step === 2 && "Define your team(s)"}
              {step === 3 && "Online presence"}
              {step === 4 && "Final details"}
            </motion.h1>
            {step === 1 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-sm text-white/80 mt-2 max-w-md mx-auto"
              >
                Create your organization portal as a Club, University/College or single Team. You will be able to manage your teams, connect SmartPatches, and share FAN€KT revenues with your community.
              </motion.p>
            )}
            {step === 2 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-sm text-white/80 mt-2 max-w-md mx-auto"
              >
                If you are a single Team, please fill in your team name and sport below.
                If you are a Club or University, you can define up to 5 teams (e.g. Men A, Women A, U18 Boys, Varsity Football…).
              </motion.p>
            )}
            {step === 3 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-sm text-white/80 mt-2 max-w-md mx-auto"
              >
                These fields are optional but help us improve your experience and connect with your community.
              </motion.p>
            )}
            {step === 4 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-sm text-white/80 mt-2 max-w-md mx-auto"
              >
                Please set up your account credentials and accept the terms to complete registration.
              </motion.p>
            )}
          </div>

          {/* Form */}
          <motion.form
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            onSubmit={nextStep}
            className="w-full mt-3 px-3 md:px-16"
            autoComplete="off"
          >
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
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
                      Full Legal Name *
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
                      Registration Number (Company/Association/University) (optional)
                    </label>
                    <input
                      type="text"
                      name="registrationNumber"
                      placeholder="Enter Registration Number"
                      value={formData.registrationNumber}
                      onChange={handleInputChange}
                      className="text-white placeholder:text-[16px] placeholder:font-[400] placeholder:text-gray-300 border-2 border-t-0 border-l-0 border-r-0 border-[#e6e7e9] py-3 pr-1 w-full outline-0 bg-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-left text-[18px] pt-2 text-white font-[400]">
                      Public / AKA Name *
                    </label>
                    <input
                      type="text"
                      name="publicName"
                      placeholder="Enter Public Name"
                      value={formData.publicName}
                      onChange={handleInputChange}
                      className="text-white placeholder:text-[16px] placeholder:font-[400] placeholder:text-gray-300 border-2 border-t-0 border-l-0 border-r-0 border-[#e6e7e9] py-3 pr-1 w-full outline-0 bg-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-left text-[18px] pt-2 text-white font-[400]">
                      How you want to appear in search *
                    </label>
                    <input
                      type="text"
                      name="akaName"
                      placeholder="Default: AKA or Full Legal Name"
                      value={formData.akaName}
                      onChange={handleInputChange}
                      className="text-white placeholder:text-[16px] placeholder:font-[400] placeholder:text-gray-300 border-2 border-t-0 border-l-0 border-r-0 border-[#e6e7e9] py-3 pr-1 w-full outline-0 bg-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-left text-[18px] pt-2 text-white font-[400]">
                      Legal Representative (optional)
                    </label>
                    <input
                      type="text"
                      name="legalRepresentative"
                      placeholder="Enter Legal Representative"
                      value={formData.legalRepresentative}
                      onChange={handleInputChange}
                      className="text-white placeholder:text-[16px] placeholder:font-[400] placeholder:text-gray-300 border-2 border-t-0 border-l-0 border-r-0 border-[#e6e7e9] py-3 pr-1 w-full outline-0 bg-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-left text-[18px] pt-2 text-white font-[400]">
                      Login Email (Org) *
                    </label>
                    <input
                      type="email"
                      name="loginEmail"
                      placeholder="Enter Login Email"
                      value={formData.loginEmail}
                      onChange={handleInputChange}
                      className="text-white placeholder:text-[16px] placeholder:font-[400] placeholder:text-gray-300 border-2 border-t-0 border-l-0 border-r-0 border-[#e6e7e9] py-3 pr-1 w-full outline-0 bg-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-left text-[18px] pt-2 text-white font-[400]">
                      Secondary Email (Legal/Management, optional)
                    </label>
                    <input
                      type="email"
                      name="secondaryEmail"
                      placeholder="Enter Secondary Email"
                      value={formData.secondaryEmail}
                      onChange={handleInputChange}
                      className="text-white placeholder:text-[16px] placeholder:font-[400] placeholder:text-gray-300 border-2 border-t-0 border-l-0 border-r-0 border-[#e6e7e9] py-3 pr-1 w-full outline-0 bg-transparent"
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

                  <div>
                    <label className="block text-left text-[18px] pt-2 text-white font-[400]">
                      What type of organization are you?
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
                    <label className="block text-left text-[18px] pt-2 text-white font-[400]">
                      Are you for-profit or non-profit?
                    </label>
                    <CustomDropdown
                      name="profitType"
                      value={formData.profitType}
                      onChange={handleInputChange}
                      placeholder="Select type"
                      options={[
                        { value: "for-profit", label: "For profit (Professional)" },
                        { value: "non-profit", label: "Non-profit (Association / Amateur / University)" }
                      ]}
                    />
                  </div>

                  <div>
                    <label className="block text-left text-[18px] pt-2 text-white font-[400]">
                      Primary sport *
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
                    <label className="block text-left text-[18px] pt-2 text-white font-[400]">
                      Youth / adult scope (only for non-profit clubs/teams)
                    </label>
                    <CustomDropdown
                      name="youthScope"
                      value={formData.youthScope}
                      onChange={handleInputChange}
                      placeholder="Select scope"
                      options={[
                        { value: "not-youth", label: "Not youth-focused / not applicable" },
                        { value: "youth", label: "Youth-focused" },
                        { value: "mixed", label: "Mixed youth and adult" }
                      ]}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="space-y-4">
                  <div>
                    <label className="block text-left text-[18px] pt-2 text-white font-[400]">
                      Team Name (for Teams only)
                    </label>
                    <input
                      type="text"
                      name="teamName"
                      placeholder="Enter Team Name"
                      value={formData.teamName}
                      onChange={handleInputChange}
                      className="text-white placeholder:text-[16px] placeholder:font-[400] placeholder:text-gray-300 border-2 border-t-0 border-l-0 border-r-0 border-[#e6e7e9] py-3 pr-1 w-full outline-0 bg-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-left text-[18px] pt-2 text-white font-[400]">
                      Team Sport (for Teams only)
                    </label>
                    <input
                      type="text"
                      name="teamSport"
                      placeholder="e.g. Basketball"
                      value={formData.teamSport}
                      onChange={handleInputChange}
                      className="text-white placeholder:text-[16px] placeholder:font-[400] placeholder:text-gray-300 border-2 border-t-0 border-l-0 border-r-0 border-[#e6e7e9] py-3 pr-1 w-full outline-0 bg-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-left text-[18px] pt-2 text-white font-[400]">
                      Team 1 Name (for Clubs/Uni)
                    </label>
                    <input
                      type="text"
                      name="team1Name"
                      placeholder="Enter Team 1 Name"
                      value={formData.team1Name}
                      onChange={handleInputChange}
                      className="text-white placeholder:text-[16px] placeholder:font-[400] placeholder:text-gray-300 border-2 border-t-0 border-l-0 border-r-0 border-[#e6e7e9] py-3 pr-1 w-full outline-0 bg-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-left text-[18px] pt-2 text-white font-[400]">
                      Team 1 Sport (for Clubs/Uni)
                    </label>
                    <input
                      type="text"
                      name="team1Sport"
                      placeholder="e.g. Football (Soccer), Basketball, Volleyball…"
                      value={formData.team1Sport}
                      onChange={handleInputChange}
                      className="text-white placeholder:text-[16px] placeholder:font-[400] placeholder:text-gray-300 border-2 border-t-0 border-l-0 border-r-0 border-[#e6e7e9] py-3 pr-1 w-full outline-0 bg-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-left text-[18px] pt-2 text-white font-[400]">
                      Team 2 Name (for Clubs/Uni)
                    </label>
                    <input
                      type="text"
                      name="team2Name"
                      placeholder="Enter Team 2 Name"
                      value={formData.team2Name}
                      onChange={handleInputChange}
                      className="text-white placeholder:text-[16px] placeholder:font-[400] placeholder:text-gray-300 border-2 border-t-0 border-l-0 border-r-0 border-[#e6e7e9] py-3 pr-1 w-full outline-0 bg-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-left text-[18px] pt-2 text-white font-[400]">
                      Team 2 Sport (for Clubs/Uni)
                    </label>
                    <input
                      type="text"
                      name="team2Sport"
                      placeholder="e.g. Football (Soccer), Basketball, Volleyball…"
                      value={formData.team2Sport}
                      onChange={handleInputChange}
                      className="text-white placeholder:text-[16px] placeholder:font-[400] placeholder:text-gray-300 border-2 border-t-0 border-l-0 border-r-0 border-[#e6e7e9] py-3 pr-1 w-full outline-0 bg-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-left text-[18px] pt-2 text-white font-[400]">
                      Team 3 Name (for Clubs/Uni)
                    </label>
                    <input
                      type="text"
                      name="team3Name"
                      placeholder="Enter Team 3 Name"
                      value={formData.team3Name}
                      onChange={handleInputChange}
                      className="text-white placeholder:text-[16px] placeholder:font-[400] placeholder:text-gray-300 border-2 border-t-0 border-l-0 border-r-0 border-[#e6e7e9] py-3 pr-1 w-full outline-0 bg-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-left text-[18px] pt-2 text-white font-[400]">
                      Team 3 Sport (for Clubs/Uni)
                    </label>
                    <input
                      type="text"
                      name="team3Sport"
                      placeholder="e.g. Football (Soccer), Basketball, Volleyball…"
                      value={formData.team3Sport}
                      onChange={handleInputChange}
                      className="text-white placeholder:text-[16px] placeholder:font-[400] placeholder:text-gray-300 border-2 border-t-0 border-l-0 border-r-0 border-[#e6e7e9] py-3 pr-1 w-full outline-0 bg-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-left text-[18px] pt-2 text-white font-[400]">
                      Team 4 Name (for Clubs/Uni)
                    </label>
                    <input
                      type="text"
                      name="team4Name"
                      placeholder="Enter Team 4 Name"
                      value={formData.team4Name}
                      onChange={handleInputChange}
                      className="text-white placeholder:text-[16px] placeholder:font-[400] placeholder:text-gray-300 border-2 border-t-0 border-l-0 border-r-0 border-[#e6e7e9] py-3 pr-1 w-full outline-0 bg-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-left text-[18px] pt-2 text-white font-[400]">
                      Team 4 Sport (for Clubs/Uni)
                    </label>
                    <input
                      type="text"
                      name="team4Sport"
                      placeholder="e.g. Football (Soccer), Basketball, Volleyball…"
                      value={formData.team4Sport}
                      onChange={handleInputChange}
                      className="text-white placeholder:text-[16px] placeholder:font-[400] placeholder:text-gray-300 border-2 border-t-0 border-l-0 border-r-0 border-[#e6e7e9] py-3 pr-1 w-full outline-0 bg-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-left text-[18px] pt-2 text-white font-[400]">
                      Team 5 Name (for Clubs/Uni)
                    </label>
                    <input
                      type="text"
                      name="team5Name"
                      placeholder="Enter Team 5 Name"
                      value={formData.team5Name}
                      onChange={handleInputChange}
                      className="text-white placeholder:text-[16px] placeholder:font-[400] placeholder:text-gray-300 border-2 border-t-0 border-l-0 border-r-0 border-[#e6e7e9] py-3 pr-1 w-full outline-0 bg-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-left text-[18px] pt-2 text-white font-[400]">
                      Team 5 Sport (for Clubs/Uni)
                    </label>
                    <input
                      type="text"
                      name="team5Sport"
                      placeholder="e.g. Football (Soccer), Basketball, Volleyball…"
                      value={formData.team5Sport}
                      onChange={handleInputChange}
                      className="text-white placeholder:text-[16px] placeholder:font-[400] placeholder:text-gray-300 border-2 border-t-0 border-l-0 border-r-0 border-[#e6e7e9] py-3 pr-1 w-full outline-0 bg-transparent"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="space-y-4">
                  <div>
                    <label className="block text-left text-[18px] pt-2 text-white font-[400]">
                      Main website
                    </label>
                    <input
                      type="url"
                      name="mainWebsite"
                      placeholder="https://www.example.com"
                      value={formData.mainWebsite}
                      onChange={handleInputChange}
                      className="text-white placeholder:text-[16px] placeholder:font-[400] placeholder:text-gray-300 border-2 border-t-0 border-l-0 border-r-0 border-[#e6e7e9] py-3 pr-1 w-full outline-0 bg-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-left text-[18px] pt-2 text-white font-[400]">
                      Website 2
                    </label>
                    <input
                      type="url"
                      name="website2"
                      placeholder="https://www.example2.com"
                      value={formData.website2}
                      onChange={handleInputChange}
                      className="text-white placeholder:text-[16px] placeholder:font-[400] placeholder:text-gray-300 border-2 border-t-0 border-l-0 border-r-0 border-[#e6e7e9] py-3 pr-1 w-full outline-0 bg-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-left text-[18px] pt-2 text-white font-[400]">
                      Website 3
                    </label>
                    <input
                      type="url"
                      name="website3"
                      placeholder="https://www.example3.com"
                      value={formData.website3}
                      onChange={handleInputChange}
                      className="text-white placeholder:text-[16px] placeholder:font-[400] placeholder:text-gray-300 border-2 border-t-0 border-l-0 border-r-0 border-[#e6e7e9] py-3 pr-1 w-full outline-0 bg-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-left text-[18px] pt-2 text-white font-[400]">
                      Website 4
                    </label>
                    <input
                      type="url"
                      name="website4"
                      placeholder="https://www.example4.com"
                      value={formData.website4}
                      onChange={handleInputChange}
                      className="text-white placeholder:text-[16px] placeholder:font-[400] placeholder:text-gray-300 border-2 border-t-0 border-l-0 border-r-0 border-[#e6e7e9] py-3 pr-1 w-full outline-0 bg-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-left text-[18px] pt-2 text-white font-[400]">
                      Website 5
                    </label>
                    <input
                      type="url"
                      name="website5"
                      placeholder="https://www.example5.com"
                      value={formData.website5}
                      onChange={handleInputChange}
                      className="text-white placeholder:text-[16px] placeholder:font-[400] placeholder:text-gray-300 border-2 border-t-0 border-l-0 border-r-0 border-[#e6e7e9] py-3 pr-1 w-full outline-0 bg-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-left text-[18px] pt-2 text-white font-[400]">
                      Instagram (optional)
                    </label>
                    <input
                      type="text"
                      name="instagram"
                      placeholder="@username"
                      value={formData.instagram}
                      onChange={handleInputChange}
                      className="text-white placeholder:text-[16px] placeholder:font-[400] placeholder:text-gray-300 border-2 border-t-0 border-l-0 border-r-0 border-[#e6e7e9] py-3 pr-1 w-full outline-0 bg-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-left text-[18px] pt-2 text-white font-[400]">
                      Facebook (optional)
                    </label>
                    <input
                      type="text"
                      name="facebook"
                      placeholder="facebook.com/username"
                      value={formData.facebook}
                      onChange={handleInputChange}
                      className="text-white placeholder:text-[16px] placeholder:font-[400] placeholder:text-gray-300 border-2 border-t-0 border-l-0 border-r-0 border-[#e6e7e9] py-3 pr-1 w-full outline-0 bg-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-left text-[18px] pt-2 text-white font-[400]">
                      X / Twitter (optional)
                    </label>
                    <input
                      type="text"
                      name="twitter"
                      placeholder="@username"
                      value={formData.twitter}
                      onChange={handleInputChange}
                      className="text-white placeholder:text-[16px] placeholder:font-[400] placeholder:text-gray-300 border-2 border-t-0 border-l-0 border-r-0 border-[#e6e7e9] py-3 pr-1 w-full outline-0 bg-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-left text-[18px] pt-2 text-white font-[400]">
                      TikTok (optional)
                    </label>
                    <input
                      type="text"
                      name="tiktok"
                      placeholder="@username"
                      value={formData.tiktok}
                      onChange={handleInputChange}
                      className="text-white placeholder:text-[16px] placeholder:font-[400] placeholder:text-gray-300 border-2 border-t-0 border-l-0 border-r-0 border-[#e6e7e9] py-3 pr-1 w-full outline-0 bg-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-left text-[18px] pt-2 text-white font-[400]">
                      YouTube (optional)
                    </label>
                    <input
                      type="text"
                      name="youtube"
                      placeholder="youtube.com/channel"
                      value={formData.youtube}
                      onChange={handleInputChange}
                      className="text-white placeholder:text-[16px] placeholder:font-[400] placeholder:text-gray-300 border-2 border-t-0 border-l-0 border-r-0 border-[#e6e7e9] py-3 pr-1 w-full outline-0 bg-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-left text-[18px] pt-2 text-white font-[400]">
                      LinkedIn (optional)
                    </label>
                    <input
                      type="text"
                      name="linkedin"
                      placeholder="linkedin.com/company"
                      value={formData.linkedin}
                      onChange={handleInputChange}
                      className="text-white placeholder:text-[16px] placeholder:font-[400] placeholder:text-gray-300 border-2 border-t-0 border-l-0 border-r-0 border-[#e6e7e9] py-3 pr-1 w-full outline-0 bg-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-left text-[18px] pt-2 text-white font-[400]">
                      Short bio / description (optional)
                    </label>
                    <textarea
                      name="bio"
                      placeholder="Enter short bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      rows="3"
                      className="text-white placeholder:text-[16px] placeholder:font-[400] placeholder:text-gray-300 border-2 border-t-0 border-l-0 border-r-0 border-[#e6e7e9] py-3 pr-1 w-full outline-0 bg-transparent resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-left text-[18px] pt-2 text-white font-[400]">
                      Motto / slogan (optional)
                    </label>
                    <input
                      type="text"
                      name="motto"
                      placeholder="Enter motto or slogan"
                      value={formData.motto}
                      onChange={handleInputChange}
                      className="text-white placeholder:text-[16px] placeholder:font-[400] placeholder:text-gray-300 border-2 border-t-0 border-l-0 border-r-0 border-[#e6e7e9] py-3 pr-1 w-full outline-0 bg-transparent"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="space-y-4">
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
              </motion.div>
            )}

            <div className="flex items-center mt-8 justify-between">

              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 text-white text-lg text-center font-medium rounded-lg cursor-pointer w-full
                         bg-[linear-gradient(to_bottom_right,_#3b82f6_0%,_#8b5cf6_30%,_#ef4444_100%)]
                         hover:opacity-90 transition-all duration-300 shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? "Registering..." : step === 4 ? "Register" : "Next"}
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </div>
  );
}

export default RegisterTeam;
