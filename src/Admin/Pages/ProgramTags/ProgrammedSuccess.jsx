import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ReactApexChart from "react-apexcharts";
import Tag from "./assets/tag.png";
import Complete from "./assets/complete.png";
import Scan from "./assets/scan.png";
import Search from "./assets/search.png";
import Success from "./assets/success.png";
import Add from "./assets/add.png";
import { HiPlus } from "react-icons/hi";
import CreateNewBatchModal from "./Modals/CreateNewBatchModal";
import ScanNfcModal from "./Modals/ScanNfcModal";
import { useParams } from "react-router-dom";


const ProgrammedSuccess = () => {
    const { uid, tagId } = useParams();
    const [CreateBatchModal, setCreateBatchModal] = useState(false);
    const [nfcModal, setNfcModal] = useState(false);
    const openBatchModal = () => {
        setCreateBatchModal(true);
    };
    const closeBatchModal = () => setCreateBatchModal(false);
    const openNfcchModal = () => {
        setNfcModal(true);
    };
    const closeNfcModal = () => setNfcModal(false);
    const boxes = [
        {
            icon: Tag,
            title: "1. Enter Details",
            subtext: "Tag information",
        },

        {
            icon: Scan,
            title: "2. Scan Tags",
            subtext: "Nfc detection ",
        },
        {
            icon: Complete,
            title: "3. Complete",
            subtext: "Programmingng done",
        },
    ];

    // const siteUrlBase = "https://fanekt-react.vercel.app";

    const siteUrlBase = "https://fanektd.com";
    const fullUrl = uid && tagId ? `${siteUrlBase}/${uid}/${tagId}` : `${siteUrlBase}/—`;
    return (
        <>
            <CreateNewBatchModal
                isOpen={CreateBatchModal}
                onClose={closeBatchModal}
            />
            <ScanNfcModal
                isOpenNfc={nfcModal}
                onCloseNfc={closeNfcModal}
            />
            <div className="lg:ml-[290px] px-4 lg:px-6 py-3 lg:pb-5 lg:pt-5 pt-28">

                <div className="flex flex-wrap gap-4 justify-between">
                    <div>
                        <p className="text-2xl font-medium text-white">
                            Program NFC Tags
                        </p>
                        <p className="text-[14px] font-medium text-[#ffffff8b]">
                            Configure and write URLs to NFC tags for fan engagement
                        </p>
                    </div>
                    <div className="relative">
                        <input placeholder="Search..." type="text" className="sm:w-[350px] w-full ps-10 pe-3 py-3 rounded-lg bg-[#ffffff0d] border border-[#42527a] text-white placeholder:text-[#ffffff8b]" />
                        <img src={Search} className="w-[20px] absolute top-3.5 left-3" alt="" />
                    </div>
                </div>
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6 mt-6">
                    {boxes.map((box, index) => (
                        <motion.div
                            key={index}
                            initial={{ y: -50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6, delay: index * 0.2, type: "spring" }}
                            className="bg-[#3337597b] rounded-[10px] border-[1.5px] gap-2 p-4 border-[#286db24c] shadow-sm flex items-center"
                        >
                            <div>
                                <img src={box.icon} alt={box.title} className="w-[45px]" />
                            </div>
                            <div>
                                <h2 className="text-[#ffff] text-[18px] font-medium">
                                    {box.title}
                                </h2>
                                <p className="text-[#ffffff95] font-[400] text-[13px]">{box.subtext}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="bg-[#3641721a] p-4 rounded-xl">
                    <div className="w-full">
                        {/* Success icon */}
                        <div className="flex justify-center mb-6">
                            <img src={Success} className="w-[80px]" alt="" />
                        </div>

                        {/* Title */}
                        <h2 className="text-3xl font-semibold mb-2 w-full text-center text-white">
                            Tag Programmed Successfully!
                        </h2>

                        {/* Subtitle */}
                        <p className="text-white/60 mb-8 text-center w-full">
                            The NFC has been configured and is ready to use
                        </p>

                        {/* NFC link box */}
                        <div className="flex justify-center">
                            <div className="border border-[#FFFFFF33] md:w-[400px] w-[90%] rounded-xl py-3 px-4 bg-transparent text-lg font-medium mb-8 text-white tracking-wide text-center">
                                <a
                                    href={id ? fullUrl : "#"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="truncate block"
                                >
                                    {fullUrl}
                                </a>
                            </div>
                        </div>

                        <div className="border-t border-dashed border-white/30 mb-8"></div>

                        {/* Buttons */}
                        <div className="flex justify-center gap-4">
                            <Link
                                to={"/programTag"}
                                className="bg-white cursor-pointer text-[#000] font-medium px-6 py-3 rounded-lg shadow transition">
                                Program Another Tag
                            </Link>
                            <Link to={"/tagManagement"} className="bg-[#1585F2] cursor-pointer text-white font-medium px-6 py-3 rounded-lg shadow transition">
                                View All Tags
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="flex items-start mt-5 gap-3 p-4 rounded-2xl bg-[#2d313a49] text-white shadow-lg border border-white/10">
                    {/* NFC Icon */}
                    <div className="flex items-center justify-center rounded-lg">
                        <img src={Scan} className="w-[40px]" alt="" />
                    </div>

                    {/* Text Section */}
                    <div>
                        <h2 className="text-2xl font-semibold mb-2">NFC Reader Requirements</h2>
                        <ul className="list-disc pl-5 space-y-1 text-white/50">
                            <li>Use an Android phone that supports NFC and open it in Chrome</li>
                            <li>Ensure NFC is enabled on your device</li>
                            <li>Tag UID must be pre-loaded in the system</li>
                            <li>Each tag can only be programmed once</li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProgrammedSuccess;
