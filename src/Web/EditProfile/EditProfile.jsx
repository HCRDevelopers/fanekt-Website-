import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import StarIcon from "./assets/star-icon.png";
import FanektIcon from "./assets/fanekt-icon.png";
import Arrow from "./assets/arrow.png";
import Check from "./assets/check.png";
import ConfirmModal from "./Modals/ConfirmModal";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { updateProfile } from "../../API/apiService";
import { Mars, Venus } from "lucide-react"

function EditProfile() {
    const { uid, tagId } = useParams();
    const { state } = useLocation();
    const itemData = state?.itemData;
    const [isConfirm, setIsConfirm] = useState(false);
    const navigate = useNavigate();
    const item = itemData?.[0];
    const [isLoading, setIsLoading] = useState(false);
    const [hasShownModal, setHasShownModal] = useState(false); // Track if modal was shown

    // ✅ Form State
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        gender: "",
        city: "",
        country: "",
        fan_of: "",
        dream_of: "",
    });

    // ✅ Pre-fill data from item
    useEffect(() => {
        if (item) {
            setFormData({
                name: item.name || "",
                email: item.email || "",
                gender: item.gender || "",
                city: item.city || "",
                country: item.country || "",
                fan_of: item.fan_of || "",
                dream_of: item.dream_of || "",
            });
        }
    }, [item]);

    // ✅ Handle Input Changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // ✅ Handle Click on fan_of or dream_of fields
    const handleFanFieldClick = () => {
        if (!hasShownModal) {
            setIsConfirm(true);
            setHasShownModal(true);
        }
    };

    // ✅ Submit Update API
    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!item?.id) {
            toast.error("Missing user ID.");
            return;
        }

        try {
            setIsLoading(true);

            const payload = {
                id: item.id,
                name: formData.name,
                email: formData.email,
                city: formData.city,
                country: formData.country,
                gender: formData.gender,
                fan_of: formData.fan_of,
                dream_of: formData.dream_of,
            };

            const res = await updateProfile(payload);

            if (res) {
                toast.success("Profile updated successfully!");
                navigate(-1);
            } else {
                toast.error(res?.message || "Failed to update profile.");
            }
        } catch (err) {
            console.error(err);

            if (err.response?.data?.errors) {
                const errors = err.response.data.errors;
                Object.values(errors).forEach((msgArr) => {
                    toast.error(msgArr[0]);
                });
            } else {
                toast.error(err.response?.data?.message || "Something went wrong.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <motion.div
                className={`min-h-[100vh] bg-[#1e1e1e] items-center justify-center sm:p-4 p-0 flex`}
            >
                <div className="w-full max-w-[400px] sm:border-2 border-white/90 p-3 sm:rounded-3xl bg-[linear-gradient(to_bottom_left,_#2d3569_20%,_#3f283d_50%,_#2d3569_100%)] ">
                    <img
                        src={Arrow}
                        className="w-[40px] cursor-pointer"
                        alt="Back"
                        onClick={() => navigate(-1)}
                    />
                    <p className="text-white font-[600] text-[25px]">
                        Update Profile
                    </p>

                    <div className="btn-gradient bg-gradient-to-r from-[#3a3a5a]/50 to-[#2a2a4a]/50 rounded-xl p-3 my-3 border border-[#5a5a8a]/30 flex items-center justify-start gap-2">
                        <img src={FanektIcon} className="w-[23px]" alt="" />
                        <span className="text-white font-[400]">
                            Tag {uid} Verified
                        </span>
                    </div>

                    {/* Main Card */}
                    <form
                        onSubmit={handleUpdate}
                        className="bg-gradient-to-br from-[#2a2a4a]/60 to-[#1a1a3a]/40 backdrop-blur-lg rounded-3xl py-4 px-3 border-2 border-[#4a4a7a]/70 shadow-2xl mb-2"
                    >
                        <div className="space-y-2">
                            <div>
                                <p className="text-white font-[400] text-[16px]">Full Name*</p>
                                <input
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="Enter Your Name"
                                    className="px-2 py-3 placeholder:text-gray-400 rounded-xl border border-white/10 text-white w-full mt-2"
                                />
                            </div>
                            <div>
                                <p className="text-white font-[400] text-[16px]">
                                    <span>Email*</span>{" "}
                                    <span className="text-[#b657b1]">(can't be changed)</span>
                                </p>
                                <input
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    readOnly
                                    placeholder="Enter Your Email"
                                    type="text"
                                    className="px-2 py-3 rounded-xl border placeholder:text-gray-400 border-white/10 text-white w-full mt-2"
                                />
                            </div>

                            <p className="text-white font-[400] text-[16px]">Gender</p>
                            {/* <div className="grid grid-cols-2 gap-2">
                                <div
                                    onClick={() =>
                                        setFormData((prev) => ({ ...prev, gender: "Male" }))
                                    }
                                    className={`px-2 py-3 rounded-xl border text-center cursor-pointer ${formData.gender === "Male"
                                        ? "border-blue-500 text-white"
                                        : "border-white/10 text-gray-400"
                                        }`}
                                >
                                    Male
                                </div>
                                <div
                                    onClick={() =>
                                        setFormData((prev) => ({ ...prev, gender: "Female" }))
                                    }
                                    className={`px-2 py-3 rounded-xl border text-center cursor-pointer ${formData.gender === "Female"
                                        ? "border-pink-500 text-white"
                                        : "border-white/10 text-gray-400"
                                        }`}
                                >
                                    Female
                                </div>
                            </div> */}

                            <div className="grid grid-cols-2 gap-2">
                                <div
                                    onClick={() =>
                                        setFormData((prev) => ({ ...prev, gender: "Male" }))
                                    }
                                    className={`flex items-center justify-center gap-2 px-2 py-3 rounded-xl border text-center cursor-pointer ${formData.gender === "Male"
                                            ? "border-blue-500 text-white"
                                            : "border-white/10 text-gray-400"
                                        }`}
                                >
                                    <Mars size={18} />
                                    Male
                                </div>

                                <div
                                    onClick={() =>
                                        setFormData((prev) => ({ ...prev, gender: "Female" }))
                                    }
                                    className={`flex items-center justify-center gap-2 px-2 py-3 rounded-xl border text-center cursor-pointer ${formData.gender === "Female"
                                            ? "border-pink-500 text-white"
                                            : "border-white/10 text-gray-400"
                                        }`}
                                >
                                    <Venus size={18} />
                                    Female
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <p className="text-white font-[400] text-[16px]">City*</p>
                                    <input
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        type="text"
                                        placeholder="Your City"
                                        className="px-2 py-3 placeholder:text-gray-400 rounded-xl border border-white/10 text-gray-400 w-full mt-2"
                                    />
                                </div>
                                <div>
                                    <p className="text-white font-[400] text-[16px]">Country*</p>
                                    <input
                                        name="country"
                                        value={formData.country}
                                        onChange={handleChange}
                                        placeholder="Your Country"
                                        type="text"
                                        className="px-2 py-3 rounded-xl border placeholder:text-gray-400 border-white/10 text-gray-400 w-full mt-2"
                                    />
                                </div>
                            </div>

                            <div>
                                <p className="text-white font-[400] text-[16px]"> ⁠Home fan of (e.g., home club or athlete)
                                </p>
                                <input
                                    name="fan_of"
                                    value={formData.fan_of}
                                    onChange={handleChange}
                                    onClick={handleFanFieldClick}
                                    type="text"
                                    placeholder="Barcelona"
                                    className="px-2 py-3 placeholder:text-gray-400 rounded-xl border border-white/10 text-white w-full mt-2"
                                />
                            </div>
                            <div>
                                <p className="text-white font-[400] text-[16px]">
                                    Global fan of (e.g, World’s best club or athlete/goat)

                                </p>
                                <input
                                    name="dream_of"
                                    value={formData.dream_of}
                                    onChange={handleChange}
                                    onClick={handleFanFieldClick}
                                    type="text"
                                    placeholder="e.g, Real Madrid / Cristiano Ronaldo"
                                    className="px-2 py-3 placeholder:text-gray-400 rounded-xl border border-white/10 text-white w-full mt-2"
                                />
                            </div>
                        </div>

                        <div className="flex items-start gap-1 my-2">
                            <img src={Check} className="w-[15px] mt-0.5" alt="" />
                            <p className="text-white font-[400] text-[14px]">
                                ✅ Unlock exclusive experience as a “VERIFIED ✅ FAN” by registering your X-KRYPTED items!
                            </p>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-[linear-gradient(160deg,#155BF2_10%,#9e519b_50%,#FE4B5E_90%)] 
                       text-white font-semibold text-lg py-4 rounded-xl shadow-lg 
                         transition-all duration-300 transform hover:scale-[1.02] 
                         relative overflow-hidden group disabled:opacity-60"
                        >
                            <span className="z-10">
                                {isLoading ? "Updating..." : "UPDATE"}
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
                    </form>
                </div>
            </motion.div>

            <ConfirmModal
                openConfirmModal={isConfirm}
                closeConfirmModal={() => setIsConfirm(false)}
            />
        </div>
    );
}

export default EditProfile;