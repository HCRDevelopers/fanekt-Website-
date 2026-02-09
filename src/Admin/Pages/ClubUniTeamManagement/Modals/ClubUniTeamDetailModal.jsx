import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import Back from "./../assets/back-arrow.png";

function ClubUniTeamDetailModal({ isOpen, onClose, clubUniTeam }) {
    if (!isOpen || !clubUniTeam) return null;

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
                    className="bg-[#f4f8fb] rounded-[16px] sm:w-[45rem] lg:w-[50rem] w-[95%] max-h-[90vh] overflow-y-auto"
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
                                Club/University/Team Details
                            </h2>
                        </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-4 px-5 mb-5">
                        {/* Basic Information */}
                        <div className="grid grid-cols-2 mt-4">
                            <div>
                                <p className="text-[13px] text-[#8D9299]">Full Legal Name *</p>
                                <p className="text-[14px] font-medium text-black">
                                    {clubUniTeam.fullLegalName}
                                </p>
                            </div>
                            <div>
                                <p className="text-[13px] text-[#8D9299]">Registration Number (Company/Association/University) (optional)</p>
                                <p className="text-[14px] font-medium text-black">
                                    {clubUniTeam.registrationNumber}
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2">
                            <div>
                                <p className="text-[13px] text-[#8D9299]">Public / AKA Name *</p>
                                <p className="text-[14px] font-medium text-black">
                                    {clubUniTeam.publicAkaName}
                                </p>
                            </div>
                            <div>
                                <p className="text-[13px] text-[#8D9299]">How you want to appear in search *</p>
                                <p className="text-[14px] font-medium text-black">
                                    {clubUniTeam.searchDisplayName}
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2">
                            <div>
                                <p className="text-[13px] text-[#8D9299]">Legal Representative (optional)</p>
                                <p className="text-[14px] font-medium text-black">
                                    {clubUniTeam.legalRepresentative}
                                </p>
                            </div>
                            <div>
                                <p className="text-[13px] text-[#8D9299]">Login Email (Org) *</p>
                                <p className="text-[14px] font-medium text-black">
                                    {clubUniTeam.loginEmail}
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2">
                            <div>
                                <p className="text-[13px] text-[#8D9299]">Secondary Email (Legal/Management, optional)</p>
                                <p className="text-[14px] font-medium text-black">
                                    {clubUniTeam.secondaryEmail}
                                </p>
                            </div>
                            <div>
                                <p className="text-[13px] text-[#8D9299]">Country *</p>
                                <p className="text-[14px] font-medium text-black">
                                    {clubUniTeam.country}
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2">
                            <div>
                                <p className="text-[13px] text-[#8D9299]">City *</p>
                                <p className="text-[14px] font-medium text-black">
                                    {clubUniTeam.city}
                                </p>
                            </div>
                            <div>
                                <p className="text-[13px] text-[#8D9299]">What type of organization are you?</p>
                                <p className="text-[14px] font-medium text-black">
                                    {clubUniTeam.organizationType}
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2">
                            <div>
                                <p className="text-[13px] text-[#8D9299]">Are you for-profit or non-profit?</p>
                                <p className="text-[14px] font-medium text-black">
                                    {clubUniTeam.profitType}
                                </p>
                            </div>
                            <div>
                                <p className="text-[13px] text-[#8D9299]">Primary sport *</p>
                                <p className="text-[14px] font-medium text-black">
                                    {clubUniTeam.primarySport}
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1">
                            <div>
                                <p className="text-[13px] text-[#8D9299]">Youth / adult scope (only for non-profit clubs/teams)</p>
                                <p className="text-[14px] font-medium text-black">
                                    {clubUniTeam.youthScope}
                                </p>
                            </div>
                        </div>

                        {/* Teams Section */}
                        <div className="mt-6">
                            <h3 className="text-[18px] font-semibold text-[#301820] mb-4">Define your team(s)</h3>

                            <div className="grid grid-cols-2">
                                <div>
                                    <p className="text-[13px] text-[#8D9299]">Team Name (for Teams only)</p>
                                    <p className="text-[14px] font-medium text-black">
                                        {clubUniTeam.teamName}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[13px] text-[#8D9299]">Team Sport (for Teams only)</p>
                                    <p className="text-[14px] font-medium text-black">
                                        {clubUniTeam.teamSport}
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 mt-4">
                                <div>
                                    <p className="text-[13px] text-[#8D9299]">Team 1 Name (for Clubs/Uni)</p>
                                    <p className="text-[14px] font-medium text-black">
                                        {clubUniTeam.team1Name}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[13px] text-[#8D9299]">Team 1 Sport (for Clubs/Uni)</p>
                                    <p className="text-[14px] font-medium text-black">
                                        {clubUniTeam.team1Sport}
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 mt-4">
                                <div>
                                    <p className="text-[13px] text-[#8D9299]">Team 2 Name (for Clubs/Uni)</p>
                                    <p className="text-[14px] font-medium text-black">
                                        {clubUniTeam.team2Name}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[13px] text-[#8D9299]">Team 2 Sport (for Clubs/Uni)</p>
                                    <p className="text-[14px] font-medium text-black">
                                        {clubUniTeam.team2Sport}
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 mt-4">
                                <div>
                                    <p className="text-[13px] text-[#8D9299]">Team 3 Name (for Clubs/Uni)</p>
                                    <p className="text-[14px] font-medium text-black">
                                        {clubUniTeam.team3Name}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[13px] text-[#8D9299]">Team 3 Sport (for Clubs/Uni)</p>
                                    <p className="text-[14px] font-medium text-black">
                                        {clubUniTeam.team3Sport}
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 mt-4">
                                <div>
                                    <p className="text-[13px] text-[#8D9299]">Team 4 Name (for Clubs/Uni)</p>
                                    <p className="text-[14px] font-medium text-black">
                                        {clubUniTeam.team4Name}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[13px] text-[#8D9299]">Team 4 Sport (for Clubs/Uni)</p>
                                    <p className="text-[14px] font-medium text-black">
                                        {clubUniTeam.team4Sport}
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 mt-4">
                                <div>
                                    <p className="text-[13px] text-[#8D9299]">Team 5 Name (for Clubs/Uni)</p>
                                    <p className="text-[14px] font-medium text-black">
                                        {clubUniTeam.team5Name}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[13px] text-[#8D9299]">Team 5 Sport (for Clubs/Uni)</p>
                                    <p className="text-[14px] font-medium text-black">
                                        {clubUniTeam.team5Sport}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Online Presence */}
                        <div className="mt-6">
                            <h3 className="text-[18px] font-semibold text-[#301820] mb-4">Online presence (optional)</h3>

                            <div className="grid grid-cols-2">
                                <div>
                                    <p className="text-[13px] text-[#8D9299]">Main website</p>
                                    <p className="text-[14px] font-medium text-black">
                                        {clubUniTeam.mainWebsite}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[13px] text-[#8D9299]">Website 2</p>
                                    <p className="text-[14px] font-medium text-black">
                                        {clubUniTeam.website2}
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 mt-4">
                                <div>
                                    <p className="text-[13px] text-[#8D9299]">Website 3</p>
                                    <p className="text-[14px] font-medium text-black">
                                        {clubUniTeam.website3}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[13px] text-[#8D9299]">Website 4</p>
                                    <p className="text-[14px] font-medium text-black">
                                        {clubUniTeam.website4}
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 mt-4">
                                <div>
                                    <p className="text-[13px] text-[#8D9299]">Website 5</p>
                                    <p className="text-[14px] font-medium text-black">
                                        {clubUniTeam.website5}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[13px] text-[#8D9299]">Instagram (optional)</p>
                                    <p className="text-[14px] font-medium text-black">
                                        {clubUniTeam.instagram}
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 mt-4">
                                <div>
                                    <p className="text-[13px] text-[#8D9299]">Facebook (optional)</p>
                                    <p className="text-[14px] font-medium text-black">
                                        {clubUniTeam.facebook}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[13px] text-[#8D9299]">X / Twitter (optional)</p>
                                    <p className="text-[14px] font-medium text-black">
                                        {clubUniTeam.twitter}
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 mt-4">
                                <div>
                                    <p className="text-[13px] text-[#8D9299]">TikTok (optional)</p>
                                    <p className="text-[14px] font-medium text-black">
                                        {clubUniTeam.tiktok}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[13px] text-[#8D9299]">YouTube (optional)</p>
                                    <p className="text-[14px] font-medium text-black">
                                        {clubUniTeam.youtube}
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 mt-4">
                                <div>
                                    <p className="text-[13px] text-[#8D9299]">LinkedIn (optional)</p>
                                    <p className="text-[14px] font-medium text-black">
                                        {clubUniTeam.linkedin}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Additional Info */}
                        <div className="mt-6">
                            <div className="grid grid-cols-1">
                                <div>
                                    <p className="text-[13px] text-[#8D9299]">Short bio / description (optional)</p>
                                    <p className="text-[14px] font-medium text-black">
                                        {clubUniTeam.shortBio}
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 mt-4">
                                <div>
                                    <p className="text-[13px] text-[#8D9299]">Motto / slogan (optional)</p>
                                    <p className="text-[14px] font-medium text-black">
                                        {clubUniTeam.motto}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}

ClubUniTeamDetailModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    clubUniTeam: PropTypes.object,
};

export default ClubUniTeamDetailModal;
