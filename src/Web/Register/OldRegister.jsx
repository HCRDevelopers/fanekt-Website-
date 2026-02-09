import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import StarIcon from "./assets/star-icon.png";
import FanektIcon from "./assets/fanekt-icon.png";
import Arrow from "./assets/arrow.png";
import Check from "./assets/check.png";
import { checkEmail, registerFan } from "../../API/apiService";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

function Register() {
    const { uid, tagId } = useParams();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [isCheckingEmail, setIsCheckingEmail] = useState(false);
    const [hasFanData, setHasFanData] = useState(false);

    const emailCheckTimeoutRef = useRef(null);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        city: "",
        country: "",
        gender: "",
        fan_of: "",
        dream_of: "",
    });

    const handleChange = async (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (name === "email" && value.trim().length > 4 && value.includes("@")) {
            if (emailCheckTimeoutRef.current) {
                clearTimeout(emailCheckTimeoutRef.current);
            }

            emailCheckTimeoutRef.current = setTimeout(() => {
                handleEmailCheck(value.trim());
            }, 1000);
        }
    };

    const handleGenderSelect = (gender) => {
        setFormData((prev) => ({
            ...prev,
            gender,
        }));
    };

    const handleEmailCheck = async (email) => {
        try {
            setIsCheckingEmail(true);
            const res = await checkEmail({ email });

            if (res?.data?.status && res.data.data) {
                const data = res.data.data;
                toast.success("Existing fan found — data pre-filled!");

                const hasFanOfData = data.fan_of && data.fan_of.trim() !== "";
                const hasDreamOfData = data.dream_of && data.dream_of.trim() !== "";
                setHasFanData(hasFanOfData || hasDreamOfData);

                setFormData({
                    name: data.name || "",
                    email: data.email || email,
                    city: data.city || "",
                    country: data.country || "",
                    gender: data.gender
                        ? data.gender.charAt(0).toUpperCase() + data.gender.slice(1)
                        : "",
                    fan_of: data.fan_of || "",
                    dream_of: data.dream_of || "",
                });
            } else {
                toast("No existing fan found — please continue manually.");
                setHasFanData(false);
            }
        } catch (err) {
            console.error("Email check failed:", err);
            toast.error("Error checking email.");
            setHasFanData(false);
        } finally {
            setIsCheckingEmail(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate each field individually and show separate toast for each
        if (!formData.name) {
            toast.error("Please enter your full name.");
            return;
        }

        if (!formData.email) {
            toast.error("Please enter your email address.");
            return;
        }

        if (!formData.gender) {
            toast.error("Please select your gender.");
            return;
        }

        if (!formData.city) {
            toast.error("Please enter your city.");
            return;
        }

        if (!formData.country) {
            toast.error("Please enter your country.");
            return;
        }

        if (!formData.fan_of) {
            toast.error("Please enter who you are a fan of.");
            return;
        }

        try {
            setIsLoading(true);

            const payload = {
                uid,
                tag_id: tagId,
                ...formData,
            };

            const res = await registerFan(payload);
            toast.success("Registered successfully!");

            navigate(`/app/congratulations/${uid}/${tagId}`);
        } catch (err) {
            console.error("Register API error:", err);

            if (err.response?.data?.errors) {
                const errorData = err.response.data.errors;
                const errorMessages = Object.values(errorData).flat().join(", ");
                toast.error(errorMessages);
            } else if (err.response?.data?.message) {
                toast.error(err.response.data.message);
            } else {
                toast.error("Something went wrong. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.div className="min-h-[100vh] bg-[#1e1e1e] items-center justify-center sm:p-4 p-0 flex">
            <Toaster />
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-[400px] sm:border-2 border-white/90 p-3 sm:rounded-3xl bg-[linear-gradient(to_bottom_left,_#2d3569_20%,_#3f283d_50%,_#2d3569_100%)]"
            >
                <img
                    src={Arrow}
                    className="w-[40px] cursor-pointer"
                    alt="Back"
                    onClick={() => navigate(-1)}
                />

                <p className="text-white font-[600] text-[25px]">Register Your Tag</p>
                <p className="text-white font-[400] text-[16px]">
                    Join the FANEKT community.
                </p>

                <div className="btn-gradient bg-gradient-to-r from-[#3a3a5a]/50 to-[#2a2a4a]/50 rounded-xl p-3 my-3 border border-[#5a5a8a]/30 flex items-center justify-start gap-2">
                    <img src={FanektIcon} className="w-[23px]" alt="" />
                    <span className="text-white font-[400]">
                        Tag {uid || "__"} Verified
                    </span>
                </div>

                <div className="bg-gradient-to-br from-[#2a2a4a]/60 to-[#1a1a3a]/40 backdrop-blur-lg rounded-3xl py-4 px-3 border-2 border-[#4a4a7a]/70 shadow-2xl mb-2">
                    <div className="space-y-2">
                        <div>
                            <p className="text-white font-[400] text-[16px]">Full Name*</p>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter Your Name"
                                className={`px-2 py-3 placeholder:text-gray-400 rounded-xl border border-white/10 text-white w-full mt-2 bg-transparent`}
                            />
                        </div>

                        <div>
                            <p className="text-white font-[400] text-[16px]">
                                Email*{" "}
                                {isCheckingEmail && (
                                    <span className="text-sm text-gray-400">(checking...)</span>
                                )}
                            </p>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter Your Email"
                                className={`px-2 py-3 rounded-xl border placeholder:text-gray-400 border-white/10 text-white w-full mt-2 bg-transparent`}
                            />
                        </div>

                        <div>
                            <p className="text-white font-[400] text-[16px]">Gender*</p>
                            <div className="grid grid-cols-2 gap-2 mt-2">
                                <div
                                    onClick={() => handleGenderSelect("Male")}
                                    className={`px-2 py-3 text-center rounded-xl border cursor-pointer transition-all duration-200 ${formData.gender === "Male"
                                        ? "bg-[#155BF2] text-white border-[#155BF2]"
                                        : "bg-transparent border-white/10 text-gray-400 hover:border-white/30"
                                        }`}
                                >
                                    Male
                                </div>

                                <div
                                    onClick={() => handleGenderSelect("Female")}
                                    className={`px-2 py-3 text-center rounded-xl border cursor-pointer transition-all duration-200 ${formData.gender === "Female"
                                        ? "bg-[#FE4B5E] text-white border-[#FE4B5E]"
                                        : "bg-transparent border-white/10 text-gray-400 hover:border-white/30"
                                        }`}
                                >
                                    Female
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <p className="text-white font-[400] text-[16px]">City*</p>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    placeholder="Your City"
                                    className={`px-2 py-3 placeholder:text-gray-400 rounded-xl border border-white/10 text-white w-full mt-2 bg-transparent`}
                                />
                            </div>
                            <div>
                                <p className="text-white font-[400] text-[16px]">Country*</p>
                                <input
                                    type="text"
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                    placeholder="Your Country"
                                    className={`px-2 py-3 rounded-xl border placeholder:text-gray-400 border-white/10 text-white w-full mt-2 bg-transparent`}
                                />
                            </div>
                        </div>

                        <div>
                            <p className="text-white font-[400] text-[16px]">I am a fan of*</p>
                            <input
                                type="text"
                                name="fan_of"
                                value={formData.fan_of}
                                onChange={handleChange}
                                readOnly={hasFanData}
                                placeholder="Barcelona"
                                className={`px-2 py-3 placeholder:text-gray-400 rounded-xl border border-white/10 text-white w-full mt-2 bg-transparent
                                    ${hasFanData ? "opacity-70 cursor-not-allowed" : ""}`}
                            />
                        </div>

                        <div>
                            <p className="text-white font-[400] text-[16px]">
                                The Sports Organization / Athlete of my dreams (optional)
                            </p>
                            <input
                                type="text"
                                name="dream_of"
                                value={formData.dream_of}
                                onChange={handleChange}
                                readOnly={hasFanData}
                                placeholder="e.g., Real Madrid / Cristiano Ronaldo"
                                className={`px-2 py-3 placeholder:text-gray-400 rounded-xl border border-white/10 text-white w-full mt-2 bg-transparent
                                    ${hasFanData ? "opacity-70 cursor-not-allowed" : ""}`}
                            />
                        </div>
                    </div>

                    <div className="flex items-start gap-1 my-2">
                        <img src={Check} className="w-[15px] mt-0.5" alt="" />
                        <p className="text-white font-[400] text-[14px]">
                            Register your item to activate your connection and unlock
                            exclusive fan experiences.
                        </p>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full relative bg-[linear-gradient(160deg,#155BF2_10%,#9e519b_50%,#FE4B5E_90%)] 
          text-white font-semibold text-lg py-4 rounded-xl shadow-lg 
          transition-all duration-300 transform hover:scale-[1.02] 
          overflow-hidden group ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
                    >
                        <span className="z-10">
                            {isLoading ? "Registering..." : "Save Changes"}
                            <img
                                src={StarIcon}
                                className="w-[40px] absolute bottom-0 right-3"
                                alt=""
                            />
                        </span>

                        <div
                            className="absolute inset-0 bg-white/20 transform translate-x-full 
              group-hover:translate-x-0 transition-transform duration-300"
                        ></div>
                    </button>
                </div>
            </form>
        </motion.div>
    );
}

export default Register;