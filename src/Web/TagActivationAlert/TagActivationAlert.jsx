import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import FanektIcon from "./assets/fanekt-icon.png";
import Arrow from "./assets/arrow.png";
import { fanProfile, sendVerificationEmail } from "../../API/apiService";

// Skeleton Loading Component
const SkeletonLoader = () => {
    return (
        <div className="animate-pulse">
            <div className="space-y-4">
                {/* Title Skeleton */}
                <div className="h-8 bg-white/10 rounded-lg w-3/4 mx-auto"></div>
                <div className="h-6 bg-white/10 rounded-lg w-2/3 mx-auto"></div>

                {/* Card Content Skeleton */}
                <div className="mt-4 space-y-3">
                    {/* Tag ID Section */}
                    <div className="pb-3 border-b-[2px] border-dashed border-white/20">
                        <div className="flex justify-between mb-2 items-center">
                            <div className="h-6 bg-white/10 rounded w-24"></div>
                            <div className="h-8 bg-white/10 rounded-lg w-20"></div>
                        </div>
                        <div className="h-8 bg-white/10 rounded w-32 mb-2"></div>
                        <div className="h-5 bg-white/10 rounded w-40"></div>
                    </div>

                    {/* Full Name */}
                    <div>
                        <div className="h-4 bg-white/10 rounded w-20 mb-2"></div>
                        <div className="h-5 bg-white/10 rounded w-full"></div>
                    </div>

                    {/* Email */}
                    <div>
                        <div className="h-4 bg-white/10 rounded w-28 mb-2"></div>
                        <div className="h-5 bg-white/10 rounded w-full"></div>
                    </div>

                    {/* City and Country */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <div className="h-4 bg-white/10 rounded w-16 mb-2"></div>
                            <div className="h-5 bg-white/10 rounded w-full"></div>
                        </div>
                        <div>
                            <div className="h-4 bg-white/10 rounded w-20 mb-2"></div>
                            <div className="h-5 bg-white/10 rounded w-full"></div>
                        </div>
                    </div>

                    {/* Fan of */}
                    <div>
                        <div className="h-4 bg-white/10 rounded w-24 mb-2"></div>
                        <div className="h-5 bg-white/10 rounded w-full"></div>
                    </div>

                    {/* Dream of */}
                    <div>
                        <div className="h-4 bg-white/10 rounded w-48 mb-2"></div>
                        <div className="h-5 bg-white/10 rounded w-full"></div>
                    </div>

                    {/* Benefits Cards */}
                    <div className="pb-4 border-b-[2px] border-dashed border-white/20">
                        <div className="mt-3 rounded-xl p-3 bg-white/5">
                            <div className="h-6 bg-white/10 rounded w-40 mb-2"></div>
                            <div className="h-4 bg-white/10 rounded w-full"></div>
                        </div>
                        <div className="mt-3 rounded-xl p-3 bg-white/5">
                            <div className="h-6 bg-white/10 rounded w-32 mb-2"></div>
                            <div className="h-4 bg-white/10 rounded w-full"></div>
                        </div>
                    </div>

                    {/* Footer Text */}
                    <div className="h-4 bg-white/10 rounded w-full mx-auto mt-2"></div>
                </div>
            </div>
        </div>
    );
};

function TagActivationAlert() {
    const { uid, tagId } = useParams();
    const navigate = useNavigate();
    const [fanData, setFanData] = useState(null);
    const [tagData, setTagData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showVerifyModal, setShowVerifyModal] = useState(false);
    const [verificationEmail, setVerificationEmail] = useState("");
    const [isVerifying, setIsVerifying] = useState(false);

    useEffect(() => {
        const fetchFanProfile = async () => {
            try {
                setIsLoading(true);
                const payload = { uid };
                const res = await fanProfile(payload);

                if (res?.data?.data) {
                    setFanData(res.data.data.fan);
                    setTagData(res.data.data.tag);
                } else {
                    console.error(res?.message || "Failed to fetch fan profile.");
                }
            } catch (err) {
                console.error("Error fetching fan profile:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchFanProfile();
    }, [uid]);

    const handleVerifyClick = () => {
        setShowVerifyModal(true);
    };

    const handleCloseModal = () => {
        setShowVerifyModal(false);
        setVerificationEmail("");
    };

    const handleVerifySubmit = async (e) => {
        e.preventDefault();

        if (!verificationEmail.trim()) {
            toast.error("Email is required.");
            return;
        }

        setIsVerifying(true);

        try {
            const payload = {
                email: verificationEmail
            };

            const response = await sendVerificationEmail(payload);

            if (response) {
                toast.success("Verification email sent! Redirecting...");
                handleCloseModal();

                setTimeout(() => {
                    navigate(`/app/verify/${uid}/${tagId}`, {
                        state: { email: verificationEmail }
                    });
                }, 1500);
            } else {
                toast.error(response?.message || "Failed to send verification email.");
            }
        } catch (error) {
            console.error("Verification error:", error);
            toast.error(error?.response?.data?.message || "Verification failed. Please try again.");
        } finally {
            setIsVerifying(false);
        }
    };

    return (
        <div>
            <Toaster />
            <motion.div
                className={`min-h-[100vh] bg-[#1e1e1e] items-center justify-center sm:p-4 p-0 flex`}
            >
                <div className="w-full max-w-[400px] sm:border-2 border-white/90 p-3 sm:rounded-3xl bg-[linear-gradient(to_bottom_left,_#2d3569_20%,_#3f283d_50%,_#2d3569_100%)] ">
                    {/* <img src={Arrow} className="w-[40px]" alt="" /> */}
                    <div>
                        <p className="text-white font-[600] text-[25px]">
                            Are you a conneKted Fan ?
                        </p>
                        <p className="text-white font-[400] text-[16px]">
                            Welcome to FANEKT where Fans always win
                        </p>
                    </div>
                    <div
                        onClick={handleVerifyClick}
                        className="btn-gradient bg-gradient-to-r from-[#3a3a5a]/50 to-[#2a2a4a]/50 rounded-xl p-3 my-3 border border-[#5a5a8a]/30 flex items-center justify-start gap-2 cursor-pointer hover:opacity-80 transition-opacity"
                    >
                        <img src={FanektIcon} className="w-[23px]" alt="" />
                        <span className="text-white font-[400]">
                            Verify ownership
                        </span>
                    </div>
                    {/* Main Card */}
                    <div className="bg-gradient-to-br from-[#2a2a4a]/60 to-[#1a1a3a]/40 backdrop-blur-lg rounded-3xl py-4 px-3 border-2 border-[#4a4a7a]/70 shadow-2xl mb-2">
                        {isLoading ? (
                            <SkeletonLoader />
                        ) : (
                            <>
                                <p className="text-center font-medium text-[25px] text-[#F94C65]">
                                    ALREADY ACTIVATED !
                                </p>
                                <p className="text-white font-[400] text-center text-[16px]">
                                    This FANEKT tag / item ID has already <br></br> been activated.
                                </p>

                                <div className="mt-2 rounded-xl p-3 btn-gradient">
                                    {/* <div className="pb-2 border-b-[2px] border-dashed border-white/40">
                                        <div className="flex justify-between mb-2 items-center">
                                            <p className="text-white text-lg font-[400]">Your Tag ID</p>
                                            <button className="btn-gradient-blue3 py-2 rounded-lg px-4 text-white capitalize">
                                                {tagData?.status || "Activated"}
                                            </button>
                                        </div>
                                        <p className="text-[28px] font-semibold text-white mt-[-15px] mb-0">
                                            {tagData?.uid || "N/A"}
                                        </p>
                                        <p className="text-white/80 text-[16px] capitalize">
                                            Status : {tagData?.status || "Activated"}
                                        </p>
                                    </div> */}
                                    <div className="mt-2 space-y-2">
                                        {/* <div>
                                            <p className="text-white/40 text-[16px] font-[300]">Full Name</p>
                                            <p className="text-white text-[17px] font-[400]">
                                                {fanData?.name || "N/A"}
                                            </p>
                                        </div> */}
                                        {/* <div>
                                            <p className="text-white/40 text-[16px] font-[300]">Email Address</p>
                                            <p className="text-white text-[17px] font-[400]">
                                                {fanData?.email || "N/A"}
                                            </p>
                                        </div> */}
                                        <div className="grid grid-cols-2">
                                            <div>
                                                <p className="text-white/40 text-[16px] font-[300]">City</p>
                                                <p className="text-white text-[17px] font-[400] capitalize">
                                                    {fanData?.city || "N/A"}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-white/40 text-[16px] font-[300]">Country</p>
                                                <p className="text-white text-[17px] font-[400] capitalize">
                                                    {fanData?.country || "N/A"}
                                                </p>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-white/40 text-[16px] font-[300]">Home fan of:</p>
                                            <p className="text-white text-[17px] font-[400]">
                                                {fanData?.fan_of || "N/A"}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-white/40 text-[16px] font-[300]">Global fan of:</p>
                                            <p className="text-white text-[17px] font-[400]">
                                                {fanData?.dream_of || "N/A"}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="pb-4 border-b-[2px] border-dashed border-white/30">
                                        <div className="mt-3 rounded-xl p-3 btn-gradient-blue3">
                                            <p className="text-white text-lg font-[400]">
                                                Exclusive Content
                                            </p>
                                            <p className="text-white/40 text-[14px] font-[400]">
                                                Get access to behind-the-scenes content and fan experiences
                                            </p>
                                        </div>
                                        <div className="mt-3 rounded-xl p-3 btn-gradient-blue3">
                                            <p className="text-white text-lg font-[400]">
                                                Special Offers
                                            </p>
                                            <p className="text-white/40 text-[14px] font-[400]">
                                                Receive exclusive deals from our sponsor partners
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-white/40 text-[16px] font-[400] mt-2 text-center">
                                        Stay tuned for exclusive content and offers. Check your email for updates!
                                    </p>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </motion.div>

            {/* Email Verification Modal */}
            <AnimatePresence>
                {showVerifyModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-2 z-50"
                        onClick={handleCloseModal}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            transition={{ type: "spring", duration: 0.5 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-gradient-to-br from-[#2d3569] via-[#3f283d] to-[#2d3569] rounded-2xl p-3 w-full max-w-md border-2 border-[#4a4a7a]/70 shadow-2xl"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-white text-[22px] font-[600]">Verify Ownership</h2>
                                <button
                                    onClick={handleCloseModal}
                                    className="text-white/60 hover:text-white text-3xl leading-none transition-colors"
                                >
                                    ×
                                </button>
                            </div>

                            <p className="text-white/70 text-[15px] mb-5">
                                Please enter your email address to verify that you are the owner of this tag / item. We'll send you a verification link.
                            </p>

                            <form onSubmit={handleVerifySubmit}>
                                <div className="mb-5">
                                    <label className="text-white text-[16px] font-[400] mb-2 block">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        value={verificationEmail}
                                        onChange={(e) => setVerificationEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        required
                                        className="w-full bg-[#1a1a3a]/80 border border-[#4a4a7a]/50 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#F94C65] focus:ring-2 focus:ring-[#F94C65]/30 transition-all"
                                    />
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        type="button"
                                        onClick={handleCloseModal}
                                        disabled={isVerifying}
                                        className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 rounded-lg font-[500] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isVerifying}
                                        className="flex-1 bg-gradient-to-r from-[#F94C65] to-[#d63850] hover:from-[#d63850] hover:to-[#F94C65] text-white py-3 rounded-lg font-[500] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                                    >
                                        {isVerifying ? "Verifying..." : "Verify"}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default TagActivationAlert;