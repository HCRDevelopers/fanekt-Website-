import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import Back from "../../Admin/Pages/FanManagement.jsx/assets/back-arrow.png";

function StoreItemModal({ isOpen, onClose, item }) {
    if (!isOpen || !item) return null;

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
                                {item.title}
                            </h2>
                            <p className="text-lg font-[400] text-center text-[#0000008d]">
                                {item.description}
                            </p>
                        </div>
                    </div>

                    {/* Item Content */}
                    <div className="p-6">
                        <div className="border border-[#0b0b0b22] p-4 rounded-xl bg-white">
                            <div className="flex justify-center mb-4">
                                <img src={item.image} alt={item.title} className="w-48 h-48 object-cover rounded-lg" />
                            </div>
                            <p className="text-lg font-medium text-center">
                                {item.title}
                            </p>
                            <p className="text-md text-[#00000053] font-[400] text-center">
                                {item.description}
                            </p>
                            <div className="mt-4 text-center">
                                <p className="text-xl font-medium text-[#301820]">
                                    FAN€KT price: {item.fanektPrice} (requires verified FAN€KT account)
                                </p>
                                <p className="text-lg font-medium text-[#0000008d] mt-2">
                                    Public price: {item.publicPrice}
                                </p>
                            </div>
                            <div className="flex justify-center items-center mt-4">
                                <button className="bg-[linear-gradient(to_bottom_right,_#155BF2_20%,_#7654b4_40%,_#FE4B5E_100%)] px-16 py-3 rounded-lg text-white font-[500] text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg whitespace-nowrap flex items-center justify-center">
                                    Order Now
                                </button>
                            </div>
                        </div>
                        <div className="border mt-4 border-dashed border-[#0952f1] p-4 rounded-xl bg-[#3063d132]">
                            <p className="text-lg font-medium">
                                <span className="text-[#0952f1]">Note: </span>Log in and verify to unlock FAN€KT and youth license prices.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}

StoreItemModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    item: PropTypes.object,
};

export default StoreItemModal;
