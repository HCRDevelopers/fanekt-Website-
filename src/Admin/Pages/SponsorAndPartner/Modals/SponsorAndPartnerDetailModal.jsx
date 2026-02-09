import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import Back from "./../assets/back-arrow.png";

function SponsorAndPartnerDetailModal({ isOpen, onClose, sponsor }) {
    if (!isOpen || !sponsor) return null;

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
                    className="bg-[#f4f8fb] rounded-[16px] sm:w-[45rem] lg:w-[40rem] w-[95%]"
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
                                Sponsor and Partner Details
                            </h2>
                        </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-4 px-5 mb-5">
                        <div className="grid lg:grid-cols-2 grid-cols-1 mt-4">
                            <div>
                                <p className="text-[13px] text-[#8D9299]">Company Full Legal Name *</p>
                                <p className="text-[14px] font-medium text-black">
                                    {sponsor?.companyFullLegalName || "N/A"}
                                </p>
                            </div>
                              <div>
                                <p className="text-[13px] text-[#8D9299]">Brand / AKA *</p>
                                <p className="text-[14px] font-medium text-black">
                                    {sponsor?.brandAKA || "N/A"}
                                </p>
                            </div>
                        </div>


                        <div className="grid lg:grid-cols-2 grid-cols-1">
                            <div>
                                <p className="text-[13px] text-[#8D9299]">How you want to appear in search *</p>
                                <p className="text-[14px] font-medium text-black">
                                    {sponsor?.appearInSearch || sponsor?.companyFullLegalName || "N/A"}
                                </p>
                                <p className="text-[12px] text-[#8D9299] mt-1">
                                    Default: Company Full Legal Name
                                </p>
                            </div>
                             <div>
                                <p className="text-[13px] text-[#8D9299]">Full name of Legal representative *</p>
                                <p className="text-[14px] font-medium text-black">
                                    {sponsor?.legalRepresentativeName || "N/A"}
                                </p>
                            </div>
                        </div>


                        <div className="grid lg:grid-cols-2 grid-cols-1">
                            <div>
                                <p className="text-[13px] text-[#8D9299]">Login Email (Company) *</p>
                                <p className="text-[14px] font-medium text-black">
                                    {sponsor?.companyLoginEmail || "N/A"}
                                </p>
                            </div>
                              <div>
                                <p className="text-[13px] text-[#8D9299]">Email 2 (Legal Representative)</p>
                                <p className="text-[14px] font-medium text-black">
                                    {sponsor?.legalRepEmail || "N/A"}
                                </p>
                            </div>
                        </div>


                        <div className="grid lg:grid-cols-2 grid-cols-1">
                            <div>
                                <p className="text-[13px] text-[#8D9299]">Country *</p>
                                <p className="text-[14px] font-medium text-black">
                                    {sponsor?.country || "N/A"}
                                </p>
                            </div>
                              <div>
                                <p className="text-[13px] text-[#8D9299]">City *</p>
                                <p className="text-[14px] font-medium text-black">
                                    {sponsor?.city || "N/A"}
                                </p>
                            </div>
                        </div>

                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}

SponsorAndPartnerDetailModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    sponsor: PropTypes.object,
};

export default SponsorAndPartnerDetailModal;
