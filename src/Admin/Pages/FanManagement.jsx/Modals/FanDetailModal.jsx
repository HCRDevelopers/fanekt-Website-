import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import Back from "./../assets/back-arrow.png";

function FanDetailModal({ isOpen, onClose, fan }) {
    if (!isOpen || !fan) return null;

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    return (
        <motion.div
            className="bg-black/50 backdrop-blur-lg overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full poppins"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="flex items-center justify-center p-2 min-h-screen w-full">
                <motion.div
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    className="bg-[#f4f8fb] rounded-[16px] sm:w-[50rem] lg:w-[55rem] w-[95%] max-h-[90vh] overflow-y-auto"
                >
                    {/* Header */}
                    <div className="bg-white rounded-xl px-5 py-4 w-full relative">
                        <img
                            onClick={onClose}
                            src={Back}
                            className="w-[50px] absolute mt-[-2px] cursor-pointer"
                            alt="Back"
                        />
                        <div className="flex flex-col justify-center items-center w-full">
                            <h2 className="text-[28px] text-[#301820] font-semibold">
                                Fan Details
                            </h2>
                        </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-4 px-5 mb-5">
                        {/* Basic User Information */}
                        <div className="mt-4">
                            <h3 className="text-[18px] font-semibold text-[#301820] mb-4">Basic Information</h3>

                            <div className="grid grid-cols-2">
                                <div>
                                    <p className="text-[13px] text-[#8D9299]">User ID</p>
                                    <p className="text-[14px] font-medium text-black">
                                        {fan.id}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[13px] text-[#8D9299]">Name</p>
                                    <p className="text-[14px] font-medium text-black">
                                        {fan.name || "N/A"}
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 mt-4">
                                <div>
                                    <p className="text-[13px] text-[#8D9299]">Email</p>
                                    <p className="text-[14px] font-medium text-black">
                                        {fan.email || "N/A"}
                                    </p>
                                </div>
                             <div>
                                    <p className="text-[13px] text-[#8D9299]">Terms Accepted</p>
                                    <p className="text-[14px] font-medium text-black">
                                        {fan?.term_condition === "1" ? "Yes" : "No"}
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 mt-4">
                                <div>
                                    <p className="text-[13px] text-[#8D9299]">Country</p>
                                    <p className="text-[14px] font-medium text-black">
                                        {fan.country || "N/A"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[13px] text-[#8D9299]">City</p>
                                    <p className="text-[14px] font-medium text-black">
                                        {fan.city || "N/A"}
                                    </p>
                                </div>
                            </div>

                            
                        </div>

                        {/* Fan Specific Information */}
                        {fan.fan && (
                            <div className="mt-6">
                                <h3 className="text-[18px] font-semibold text-[#301820] mb-4">Fan Profile</h3>

                                <div className="grid grid-cols-2">
                                    <div>
                                        <p className="text-[13px] text-[#8D9299]">First Name</p>
                                        <p className="text-[14px] font-medium text-black">
                                            {fan.fan.first_name || "N/A"}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-[13px] text-[#8D9299]">Surname</p>
                                        <p className="text-[14px] font-medium text-black">
                                            {fan.fan.sur_name || "N/A"}
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 mt-4">
                                    <div>
                                        <p className="text-[13px] text-[#8D9299]">Nickname</p>
                                        <p className="text-[14px] font-medium text-black">
                                            {fan.fan.nick_name || "N/A"}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-[13px] text-[#8D9299]">Date of Birth</p>
                                        <p className="text-[14px] font-medium text-black">
                                            {fan.fan.date_of_birth ? formatDate(fan.fan.date_of_birth) : "N/A"}
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 mt-4">
                                    <div>
                                        <p className="text-[13px] text-[#8D9299]">Age</p>
                                        <p className="text-[14px] font-medium text-black">
                                            {fan.fan.age || "N/A"}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-[13px] text-[#8D9299]">Gender</p>
                                        <p className="text-[14px] font-medium text-black">
                                            {fan.fan.gender || "N/A"}
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 mt-4">
                                    <div>
                                        <p className="text-[13px] text-[#8D9299]">Preferred Sport</p>
                                        <p className="text-[14px] font-medium text-black">
                                            {fan.fan.preferred_sport || "N/A"}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-[13px] text-[#8D9299]">Hobbies</p>
                                        <p className="text-[14px] font-medium text-black">
                                            {fan.fan.hobbies || "N/A"}
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 mt-4">
                                    <div>
                                        <p className="text-[13px] text-[#8D9299]">KYC Verified</p>
                                        <p className="text-[14px] font-medium text-black">
                                            {fan.fan.kyc_verified ? "Yes" : "No"}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-[13px] text-[#8D9299]">Home Fan Of (Type)</p>
                                        <p className="text-[14px] font-medium text-black">
                                            {fan.fan.home_fan_of_type || "N/A"}
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 mt-4">
                                    <div>
                                        <p className="text-[13px] text-[#8D9299]">Global Fan Of</p>
                                        <p className="text-[14px] font-medium text-black">
                                            {fan.fan.global_fan_of || "N/A"}
                                        </p>
                                    </div>
                                </div>

                                {/* Global Fans */}
                                <div className="mt-4">
                                    <h4 className="text-[16px] font-semibold text-[#301820] mb-2">Global Fan Preferences</h4>

                                    <div className="grid grid-cols-2">
                                        <div>
                                            <p className="text-[13px] text-[#8D9299]">Global Fan 1 (Type)</p>
                                            <p className="text-[14px] font-medium text-black">
                                                {fan.fan.global_fan_of_type_1 || "N/A"}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-[13px] text-[#8D9299]">Global Fan 1 (Name)</p>
                                            <p className="text-[14px] font-medium text-black">
                                                {fan.fan.global_fan_of_name_1 || "N/A"}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 mt-4">
                                        <div>
                                            <p className="text-[13px] text-[#8D9299]">Global Fan 2 (Type)</p>
                                            <p className="text-[14px] font-medium text-black">
                                                {fan.fan.global_fan_of_type_2 || "N/A"}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-[13px] text-[#8D9299]">Global Fan 2 (Name)</p>
                                            <p className="text-[14px] font-medium text-black">
                                                {fan.fan.global_fan_of_name_2 || "N/A"}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 mt-4">
                                        <div>
                                            <p className="text-[13px] text-[#8D9299]">Global Fan 3 (Type)</p>
                                            <p className="text-[14px] font-medium text-black">
                                                {fan.fan.global_fan_of_type_3 || "N/A"}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-[13px] text-[#8D9299]">Global Fan 3 (Name)</p>
                                            <p className="text-[14px] font-medium text-black">
                                                {fan.fan.global_fan_of_name_3 || "N/A"}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 mt-4">
                                    <div>
                                        <p className="text-[13px] text-[#8D9299]">Full Address</p>
                                        <p className="text-[14px] font-medium text-black">
                                            {fan.fan.full_address || "N/A"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}

FanDetailModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    fan: PropTypes.object,
};

export default FanDetailModal;
