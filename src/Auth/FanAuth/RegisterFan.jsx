import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import logo from "./Assets/logo.png";
import defaultAvatar from "./Assets/avatar.jpg";
import { IoEyeOutline, IoEyeOffOutline, IoChevronDown, IoChevronUp } from "react-icons/io5";
import { motion } from "framer-motion";
import Back from "./Assets/back-arrow.png";
import sideImage from "./Assets/authimg.png";
import toast, { Toaster } from "react-hot-toast";
import { fanSignup } from "../../API/apiService";


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

function RegisterFan() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
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
    hobbies: "",
    image: null,
    referral_code: "",
    kyc: false,
    terms: false,
    password: "",
    confirmPassword: ""
  });

  const getRequiredFieldsForStep = (stepNumber) => {
    switch (stepNumber) {
      case 1:
        return [
          { field: 'firstName', message: 'First name is required' },
          { field: 'surname', message: 'Surname is required' },
          { field: 'aka', message: 'AKA/Nickname is required' },
          { field: 'email', message: 'Email is required' },
          { field: 'country', message: 'Country is required' },
          { field: 'city', message: 'City is required' },
          { field: 'dob', message: 'Date of birth is required' },
          { field: 'age', message: 'Age is required' }
        ];
      case 2:
        return [
          { field: 'homeFanType', message: 'Home fan type is required' },
          { field: 'homeFanName', message: 'Home fan name is required' },
          { field: 'globalFan1Type', message: 'Global fan #1 type is required' },
          { field: 'globalFan1Name', message: 'Global fan #1 name is required' },
          { field: 'globalFan2Type', message: 'Global fan #2 type is required' },
          { field: 'globalFan2Name', message: 'Global fan #2 name is required' },
          { field: 'globalFan3Type', message: 'Global fan #3 type is required' },
          { field: 'globalFan3Name', message: 'Global fan #3 name is required' }
        ];
      case 3:
        return [
          { field: 'terms', message: 'You must accept the Terms and Conditions' },
          { field: 'password', message: 'Password is required' },
          { field: 'confirmPassword', message: 'Confirm password is required' }
        ];
      default:
        return [];
    }
  };
  const [showPasswords, setShowPasswords] = useState(false);
  const [image, setImage] = useState(null);
  const [profileImageFile, setProfileImageFile] = useState(null);
  const fileInputRef = useRef(null);

  // Set referral code from URL params on component mount
  useEffect(() => {
    if (id) {
      setFormData(prev => ({
        ...prev,
        referral_code: id
      }));
    }
  }, [id]);

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

  const nextStep = async () => {
    if (step < 3) {
      // Validate current step before proceeding
      const currentStepRequiredFields = getRequiredFieldsForStep(step);

      for (const { field, message } of currentStepRequiredFields) {
        if (!formData[field] || (typeof formData[field] === 'string' && !formData[field].trim())) {
          toast.error(message);
          return;
        }
      }

      // Additional validations for step 1
      if (step === 1) {
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
          toast.error('Please enter a valid email address');
          return;
        }

        // Validate age
        const ageNum = parseInt(formData.age);
        if (isNaN(ageNum) || ageNum < 13 || ageNum > 120) {
          toast.error('Please enter a valid age (13-120)');
          return;
        }
      }

      setStep(step + 1);
    } else if (step === 3) {
      // Validate current step (step 3)
      const currentStepRequiredFields = getRequiredFieldsForStep(step);

      for (const { field, message } of currentStepRequiredFields) {
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
      formDataToSend.append("first_name", formData.firstName.trim());
      formDataToSend.append("sur_name", formData.surname.trim());
      formDataToSend.append("nick_name", formData.aka.trim());
      formDataToSend.append("email", formData.email.trim().toLowerCase());
      formDataToSend.append("country", formData.country.trim());
      formDataToSend.append("city", formData.city.trim());
      formDataToSend.append("date_of_birth", formData.dob);
      formDataToSend.append("age", formData.age.trim());
      formDataToSend.append("home_fan_of_type", formData.homeFanType);
      formDataToSend.append("home_fan_of_name", formData.homeFanName.trim());
      formDataToSend.append("global_fan_of_type_1", formData.globalFan1Type);
      formDataToSend.append("global_fan_of_name_1", formData.globalFan1Name.trim());
      formDataToSend.append("global_fan_of_type_2", formData.globalFan2Type);
      formDataToSend.append("global_fan_of_name_2", formData.globalFan2Name.trim());
      formDataToSend.append("global_fan_of_type_3", formData.globalFan3Type);
      formDataToSend.append("global_fan_of_name_3", formData.globalFan3Name.trim());
      formDataToSend.append("full_address", formData.address.trim() || "");
      formDataToSend.append("gender", formData.gender || "");
      formDataToSend.append("preferred_sport", formData.sport || "");
      formDataToSend.append("hobbies", formData.hobbies.trim() || "");

      // Append image if exists
      if (profileImageFile) {
        formDataToSend.append("image", profileImageFile);
      } else {
        formDataToSend.append("image", "");
      }

      // Append referral code if provided
      if (formData.referral_code.trim()) {
        formDataToSend.append("referral_code", formData.referral_code.trim());
      }

      formDataToSend.append("kyc_verified", 1);
      formDataToSend.append("term_condition", formData.terms ? 1 : 0);
      formDataToSend.append("password", formData.password);

      setLoading(true);

      try {
        const response = await fanSignup(formDataToSend);
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
        if (error.response?.data?.errors) {
          const errors = error.response.data.errors;

          Object.values(errors).forEach((fieldErrors) => {
            fieldErrors.forEach((msg) => {
              toast.error(msg);
            });
          });
        } else {
          toast.error(error.response?.data?.message || "Something went wrong");
        }
      }
      finally {
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
                bg-[linear-gradient(to_bottom_left,_#4a1755_30%,_#352862_50%,_#8a58a2_100%)]"
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

          <div className="absolute top-0 left-0">
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className=""
              >
                <img src={Back} className="w-[40px]" alt="" />
              </button>
            )}
          </div>
          <div className="text-center mb-6">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="md:text-[36px] text-white text-[29px] font-[700]"
            >
              {step === 1 && "Join FANEKT as a Fan"}
              {step === 2 && "Your FANEKT votes"}
              {step === 3 && "Optional details"}
            </motion.h1>
            {step === 1 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-sm text-white/80 mt-2 max-w-md mx-auto"
              >
                Create your Fan portal to connect, collect FAN€KT (FNKT) and manage your X-KRYPTED items and tickets. You will also cast your votes (Home Fan + Global Fans) which decide your rankings and global FANEKT rankings.
              </motion.p>
            )}
            {step === 2 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-sm text-white/80 mt-2 max-w-md mx-auto"
              >
                These answers define important rankings, a critical and revolutionary feature of FANEKT. You can always change your votes later in your profile.
              </motion.p>
            )}
            {step === 3 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-sm text-white/80 mt-2 max-w-md mx-auto"
              >
                These fields are optional but help us improve your experience (deliveries, KYC, better rankings, etc.).
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
            onSubmit={(e) => e.preventDefault()}
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
                      First name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="Enter First Name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="text-white placeholder:text-[16px] placeholder:font-[400] placeholder:text-gray-300 border-2 border-t-0 border-l-0 border-r-0 border-[#e6e7e9] py-3 pr-1 w-full outline-0 bg-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-left text-[18px] pt-2 text-white font-[400]">
                      Surname *
                    </label>
                    <input
                      type="text"
                      name="surname"
                      placeholder="Enter Surname"
                      value={formData.surname}
                      onChange={handleInputChange}
                      className="text-white placeholder:text-[16px] placeholder:font-[400] placeholder:text-gray-300 border-2 border-t-0 border-l-0 border-r-0 border-[#e6e7e9] py-3 pr-1 w-full outline-0 bg-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-left text-[18px] pt-2 text-white font-[400]">
                      AKA / Nickname *
                    </label>
                    <input
                      type="text"
                      name="aka"
                      placeholder="How you want to appear in rankings"
                      value={formData.aka}
                      onChange={handleInputChange}
                      className="text-white placeholder:text-[16px] placeholder:font-[400] placeholder:text-gray-300 border-2 border-t-0 border-l-0 border-r-0 border-[#e6e7e9] py-3 pr-1 w-full outline-0 bg-transparent"
                      required
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
                      placeholder="e.g. FR, TR, USA"
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
                      Date of birth *
                    </label>
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleInputChange}
                      className="text-white placeholder:text-[16px] placeholder:font-[400] placeholder:text-gray-300 border-2 border-t-0 border-l-0 border-r-0 border-[#e6e7e9] py-3 pr-1 w-full outline-0 bg-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-left text-[18px] pt-2 text-white font-[400]">
                      Age *
                    </label>
                    <input
                      type="number"
                      name="age"
                      placeholder="Enter Age"
                      value={formData.age}
                      onChange={handleInputChange}
                      className="text-white placeholder:text-[16px] placeholder:font-[400] placeholder:text-gray-300 border-2 border-t-0 border-l-0 border-r-0 border-[#e6e7e9] py-3 pr-1 w-full outline-0 bg-transparent"
                      required
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
                      Home fan of – type *
                    </label>
                    <CustomDropdown
                      name="homeFanType"
                      value={formData.homeFanType}
                      onChange={handleInputChange}
                      placeholder="Select type"
                      options={[
                        { value: "club", label: "Club/Team/University" },
                        { value: "athlete", label: "Athlete/Other VIP" }
                      ]}
                    />
                  </div>

                  <div>
                    <label className="block text-left text-[18px] pt-2 text-white font-[400]">
                      Home fan of – name *
                    </label>
                    <input
                      type="text"
                      name="homeFanName"
                      placeholder="e.g. FC Rouen 1899, LA Lakers, Novak Djokovic"
                      value={formData.homeFanName}
                      onChange={handleInputChange}
                      className="text-white placeholder:text-[16px] placeholder:font-[400] placeholder:text-gray-300 border-2 border-t-0 border-l-0 border-r-0 border-[#e6e7e9] py-3 pr-1 w-full outline-0 bg-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-left text-[18px] pt-2 text-white font-[400]">
                      Global fan of (club/team/athlete/other)
                    </label>
                    <p className="text-sm text-white/60 mb-2">Global fan #1 – type *</p>
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
                    <label className="block text-left text-[18px] pt-2 text-white font-[400]">
                      Global fan #1 – name *
                    </label>
                    <input
                      type="text"
                      name="globalFan1Name"
                      placeholder="Your #1 global favorite"
                      value={formData.globalFan1Name}
                      onChange={handleInputChange}
                      className="text-white placeholder:text-[16px] placeholder:font-[400] placeholder:text-gray-300 border-2 border-t-0 border-l-0 border-r-0 border-[#e6e7e9] py-3 pr-1 w-full outline-0 bg-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-left text-[18px] pt-2 text-white font-[400]">
                      Global fan #2 – type *
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
                    <label className="block text-left text-[18px] pt-2 text-white font-[400]">
                      Global fan #2 – name *
                    </label>
                    <input
                      type="text"
                      name="globalFan2Name"
                      placeholder="Your #2 global favorite"
                      value={formData.globalFan2Name}
                      onChange={handleInputChange}
                      className="text-white placeholder:text-[16px] placeholder:font-[400] placeholder:text-gray-300 border-2 border-t-0 border-l-0 border-r-0 border-[#e6e7e9] py-3 pr-1 w-full outline-0 bg-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-left text-[18px] pt-2 text-white font-[400]">
                      Global fan #3 – type *
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
                    <label className="block text-left text-[18px] pt-2 text-white font-[400]">
                      Global fan #3 – name *
                    </label>
                    <input
                      type="text"
                      name="globalFan3Name"
                      placeholder="Your #3 global favorite"
                      value={formData.globalFan3Name}
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
                      Full address (optional, for deliveries)
                    </label>
                    <input
                      type="text"
                      name="address"
                      placeholder="Enter Full Address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="text-white placeholder:text-[16px] placeholder:font-[400] placeholder:text-gray-300 border-2 border-t-0 border-l-0 border-r-0 border-[#e6e7e9] py-3 pr-1 w-full outline-0 bg-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-left text-[18px] pt-2 text-white font-[400]">
                      Gender (optional)
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
                    <label className="block text-left text-[18px] pt-2 text-white font-[400]">
                      Preferred sport (optional)
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
                      Hobbies (optional)
                    </label>
                    <input
                      type="text"
                      name="hobbies"
                      placeholder="Enter Hobbies"
                      value={formData.hobbies}
                      onChange={handleInputChange}
                      className="text-white placeholder:text-[16px] placeholder:font-[400] placeholder:text-gray-300 border-2 border-t-0 border-l-0 border-r-0 border-[#e6e7e9] py-3 pr-1 w-full outline-0 bg-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-left text-[18px] pt-2 text-white font-[400]">
                      Referral Code (optional)
                    </label>
                    <input
                      type="text"
                      name="referral_code"
                      placeholder="Enter Referral Code if any"
                      value={formData.referral_code}
                      onChange={handleInputChange}
                      className="text-white placeholder:text-[16px] placeholder:font-[400] placeholder:text-gray-300 border-2 border-t-0 border-l-0 border-r-0 border-[#e6e7e9] py-3 pr-1 w-full outline-0 bg-transparent"
                    />
                  </div>

                  {/* <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="kyc"
                      checked={formData.kyc}
                      onChange={handleInputChange}
                      className="w-4 h-4"
                    />
                    <label className="text-white text-sm">
                      I want to complete KYC verification to unlock full FAN€KT features.
                    </label>
                  </div> */}

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
                type="button"
                onClick={nextStep}
                disabled={loading}
                className="px-6 py-3 text-white text-lg text-center font-medium rounded-lg cursor-pointer w-full
                         bg-[linear-gradient(to_bottom_right,_#3b82f6_0%,_#8b5cf6_30%,_#ef4444_100%)]
                         hover:opacity-90 transition-all duration-300 shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? "Registering..." : step === 3 ? "Register" : "Next"}
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </div>
  );
}

export default RegisterFan;
