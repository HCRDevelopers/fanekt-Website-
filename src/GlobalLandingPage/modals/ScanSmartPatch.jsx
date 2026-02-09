import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import Back from "../../Admin/Pages/FanManagement.jsx/assets/back-arrow.png";

function ScanSmartPatch({ isOpen, onClose }) {
    if (!isOpen) return null;

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
                        <div className="flex flex-col justify-center items-center w-full md:mt-4 mt-10">
                            <h2 className="md:text-[28px] text-[18px] text-[#301820] font-semibold">
                                Scan Your Smart Patch
                            </h2>
                            <p className="text-lg font-[400] text-center text-[#0000008d]">
                                Secure fan verification with your official <br className="lg:block hidden" /> FANEKT patch
                            </p>
                        </div>
                    </div>

                    {/* Scan Content */}
                    <div className="p-6">
                        <div className="border border-[#0b0b0b22] p-4 rounded-xl bg-white">
                            {/* <div>
                                <img src={NfcScan} alt="" />
                            </div> */}
                            <p className="text-lg font-medium">
                                Hold phone close to scan NFC Smart Patch and tap "Start Scanning"
                            </p>
                            <p className="text-md text-[#00000053] font-[400]">
                                On some devices (especially iPhone) you may need fanekt mobile app for best experience.
                            </p>
                            <div className="flex justify-center items-center">
                                <button className="mt-3 bg-[linear-gradient(to_bottom_right,_#155BF2_20%,_#7654b4_40%,_#FE4B5E_100%)] px-16 py-3 rounded-lg text-white font-[500] text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg whitespace-nowrap flex items-center justify-center">
                                    Start Scanning
                                </button>
                            </div>
                        </div>
                        <div className="border mt-4 border-dashed border-[#0952f1] p-4 rounded-xl bg-[#3063d132]">

                            <p className="text-lg font-medium">
                                <span className="text-[#0952f1]">Tip: </span>With the FANEKT app, you'll be able to scan even faster and instantly see nearby campaigns and rewards connected to your SmartPatches.
                            </p>


                        </div>
                        <div className="border mt-4 border-[#0b0b0b22] p-4 rounded-xl bg-[#fff]">


                            <p className="text-md text-[#000000] font-[500]">
                                NFC scan is secured. Only you, as the fan, can activate and link
                                SmartPatches to your account.
                            </p>

                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}

ScanSmartPatch.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default ScanSmartPatch;
