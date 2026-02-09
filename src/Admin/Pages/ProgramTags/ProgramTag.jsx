import React, { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import Tag from "./assets/tag.png";
import Complete from "./assets/complete.png";
import Scan from "./assets/scan.png";
import Search from "./assets/search.png";
import Add from "./assets/add.png";
import CreateNewBatchModal from "./Modals/CreateNewBatchModal";
import ScanNfcModal from "./Modals/ScanNfcModal";
import { addTag, getBatches } from "../../../API/apiService";
import { toast } from "react-hot-toast";
import { useMyContext } from "../../../context/context";

const ProgramTag = () => {
    const { setTagId } = useMyContext();
    const [CreateBatchModal, setCreateBatchModal] = useState(false);
    const [nfcModal, setNfcModal] = useState(false);
    const [batches, setBatches] = useState([]);
    const [filteredBatches, setFilteredBatches] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedBatch, setSelectedBatch] = useState(null);
    const [organization, setOrganization] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const [description, setDescription] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    const [isSubmitting, setIsSubmitting] = useState(false);

    const openBatchModal = () => setCreateBatchModal(true);
    const closeBatchModal = () => setCreateBatchModal(false);
    const closeNfcModal = () => setNfcModal(false);

    const boxes = [
        { icon: Tag, title: "1. Enter Details", subtext: "Tag information" },
        { icon: Scan, title: "2. Scan Tags", subtext: "Nfc detection" },
        { icon: Complete, title: "3. Complete", subtext: "Programming done" },
    ];

    const fetchBatches = useCallback(async () => {
        setLoading(true);
        try {
            const response = await getBatches();
            if (response.status && Array.isArray(response.data.data)) {
                setBatches(response.data.data);
                setFilteredBatches(response.data.data);
            } else {
                setBatches([]);
                setFilteredBatches([]);
            }
        } catch (error) {
            console.error("Error fetching batches:", error);
            setBatches([]);
            setFilteredBatches([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchBatches();
    }, [fetchBatches]);

    // Search filter effect
    useEffect(() => {
        if (searchQuery.trim() === "") {
            setFilteredBatches(batches);
        } else {
            const filtered = batches.filter((batch) =>
                batch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                batch.description?.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredBatches(filtered);
        }
    }, [searchQuery, batches]);

    const handleBatchSelect = (batch) => {
        setSelectedBatch(batch);
    };

    const handleAddTag = async () => {
        if (!organization || !description || !selectedBatch) {
            toast.error("Please fill in all required fields.");
            return;
        }

        const payload = {
            name: organization,
            description,
            batch_id: selectedBatch.id,
        };

        try {
            setIsSubmitting(true);
            const res = await addTag(payload);

            if (res?.status && res?.data?.data?.id) {
                toast.success("Tag created successfully.");
                const newTagId = res.data.data.id;
                setTagId(newTagId);
                setNfcModal(true);
            } else {
                toast.error("Failed to create tag.");
            }
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <CreateNewBatchModal
                isOpen={CreateBatchModal}
                onClose={closeBatchModal}
                onAdd={fetchBatches}
            />

            <ScanNfcModal
                isOpenNfc={nfcModal}
                onCloseNfc={closeNfcModal}

            />

            <div className="lg:ml-[290px] px-4 lg:px-6 py-3 lg:pb-5 lg:pt-5 pt-28">
                {/* Header */}
                <div className="flex flex-wrap gap-4 justify-between">
                    <div>
                        <p className="text-2xl font-medium text-white">Program NFC Tags</p>
                        <p className="text-[14px] font-medium text-[#ffffff8b]">
                            Configure and write URLs to NFC tags for fan engagement
                        </p>
                    </div>
                    <div className="relative">
                        <input
                            placeholder="Search batches..."
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="sm:w-[350px] w-full ps-10 pe-3 py-3 rounded-lg bg-[#ffffff0d] border border-[#42527a] text-white placeholder:text-[#ffffff8b]"
                        />
                        <img src={Search} className="w-[20px] absolute top-3.5 left-3" alt="" />
                    </div>
                </div>

                {/* Steps */}
                {/* <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6 mt-6">
                    {boxes.map((box, index) => (
                        <motion.div
                            key={index}
                            initial={{ y: -50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6, delay: index * 0.2, type: "spring" }}
                            className="bg-[#3337597b] rounded-[10px] border-[1.5px] gap-2 p-4 border-[#286db24c] shadow-sm flex items-center"
                        >
                            <img src={box.icon} className="w-[45px]" alt="" />
                            <div>
                                <h2 className="text-[#ffff] text-[18px] font-medium">{box.title}</h2>
                                <p className="text-[#ffffff95] font-[400] text-[13px]">{box.subtext}</p>
                            </div>
                        </motion.div>
                    ))}
                </div> */}

                {/* Tag Info */}
                {/* <div className="bg-[#2e34503e] border border-[#286db24c] rounded-2xl p-5 text-white">
                    <h2 className="text-4xl font-bold mb-8">Tag Information</h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="flex flex-col">
                            <label className="mb-2 font-medium">
                                Company / Organization / Club <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="e.g., Real Madrid"
                                value={organization}
                                onChange={(e) => setOrganization(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/40 text-white placeholder-white/60 focus:outline-none focus:border-white"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-2 font-medium">
                                Batch Name <span className="text-red-400">*</span>
                            </label>
                            <div className="relative">
                                <div
                                    className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/40 text-white placeholder-white/60 cursor-pointer"
                                    onClick={() => setShowDropdown((prev) => !prev)}
                                >
                                    {selectedBatch ? selectedBatch.name : "Select a batch"}
                                </div>

                                {showDropdown && (
                                    <div className="absolute mt-2 w-full bg-[#1e2235] border border-white/20 rounded-lg shadow-lg z-10 max-h-[200px] overflow-y-auto">
                                        {batches.map((batch) => (
                                            <div
                                                key={batch.id}
                                                className={`px-4 py-2 hover:bg-white/10 cursor-pointer text-white ${selectedBatch?.id === batch.id ? "bg-white/10" : ""}`}
                                                onClick={() => {
                                                    handleBatchSelect(batch);
                                                    setShowDropdown(false);
                                                }}
                                            >
                                                {batch.name}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="mt-8">
                        <label className="mb-2 font-medium block">Description</label>
                        <textarea
                            rows="4"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter batch description"
                            className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/40 text-white placeholder-white/60 focus:outline-none focus:border-white"
                        />
                    </div>

                    <div className="flex justify-end mt-8">
                        <button
                            onClick={handleAddTag}
                            disabled={!selectedBatch || !organization || isSubmitting}
                            className={`px-6 py-3 rounded-lg font-semibold shadow-lg transition-all ${(!selectedBatch || !organization || isSubmitting)
                                ? 'bg-gray-500 cursor-not-allowed opacity-50'
                                : 'bg-gradient-to-br from-[#155BF2] to-[#FE4B5E] hover:opacity-90'
                                }`}
                        >
                            {isSubmitting ? "Processing..." : "Continue to NFC Scan"}
                        </button>
                    </div>
                </div> */}

                {/* Batch Management */}
                <div className="bg-[#2e34503e] border border-[#286db24c] rounded-2xl p-5 text-white mt-6">
                    <div className="mb-8">
                        <h2 className="text-4xl font-bold">Batch Management</h2>
                        <p className="text-gray-300 mt-1 text-lg">Create and manage tag batches</p>
                    </div>

                    <button
                        onClick={openBatchModal}
                        className="lg:w-[50%] w-full flex items-start justify-start px-5 cursor-pointer gap-2 border border-white/30 rounded-xl py-4 mb-8 text-white hover:bg-white/10 transition"
                    >
                        <img src={Add} className="w-[30px]" alt="" />
                        <span className="font-medium text-lg">Create New Batch</span>
                    </button>

                    <h3 className="text-lg font-semibold mb-4">
                        Existing Batches ({Array.isArray(filteredBatches) ? filteredBatches.length : 0})
                        {searchQuery && ` - Filtered by "${searchQuery}"`}
                    </h3>

                    {loading ? (
                        <div className="text-center py-8">
                            <p className="text-white/70">Loading batches...</p>
                        </div>
                    ) : !filteredBatches.length ? (
                        <div className="text-center py-8">
                            <p className="text-white/70">
                                {searchQuery 
                                    ? `No batches found matching "${searchQuery}"` 
                                    : "No batches found. Create your first batch!"}
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {filteredBatches.map((batch) => (
                                <div
                                    key={batch.id}
                                    onClick={() => handleBatchSelect(batch)}
                                    className={`p-5 rounded-xl border transition cursor-pointer ${selectedBatch?.id === batch.id
                                        ? "border-blue-400 bg-blue-500/20"
                                        : "border-white/20 hover:border-white/40 hover:bg-white/5"
                                        }`}
                                >
                                    <h4 className="text-xl font-semibold">{batch.name}</h4>
                                    <p className="text-white/70 mt-1">{batch.description}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* NFC Info */}
                <div className="flex items-start mt-5 gap-3 p-4 rounded-2xl bg-[#2d313a49] text-white shadow-lg border border-white/10">
                    <div className="flex items-center justify-center rounded-lg">
                        <img src={Scan} className="w-[40px]" alt="" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold mb-2">NFC Reader Requirements</h2>
                        <ul className="list-disc pl-5 space-y-1 text-white/50">
                            <li>Use Android Chrome </li>
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

export default ProgramTag;
