import React, { useState, useCallback, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import Nfc from "./../assets/nfc.png";
import { getNfcTags, programTag } from "../../../../API/apiService";
import { useMyContext } from "../../../../context/context";

function ScanNfcModal({ isOpenNfc, onCloseNfc }) {
  const { tagId } = useMyContext();
  console.log("tag id from context:", tagId);

  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState(null);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [scannedData, setScannedData] = useState({ uid: null, payloadText: '', matched: false, matchedTag: null });
  const [writing, setWriting] = useState(false);
  const [writeSuccess, setWriteSuccess] = useState(false);
  const [processComplete, setProcessComplete] = useState(false);
  const [programmingApi, setProgrammingApi] = useState(false);
  const abortControllerRef = useRef(null);
  const ndefRef = useRef(null);

  // Fetch all NFC tags from API only
  const fetchTags = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getNfcTags();
      if (response?.status && Array.isArray(response.data.data)) {
        setTags(response.data.data);
      } else {
        setTags([]);
      }
    } catch (err) {
      console.error("Error fetching NFC tags:", err);
      setTags([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch tags when modal opens
  useEffect(() => {
    if (isOpenNfc) {
      fetchTags();
      setScannedData({ uid: null, payloadText: '', matched: false, matchedTag: null });
      setWriteSuccess(false);
      setProcessComplete(false);
      setProgrammingApi(false);
    } else {
      // When modal closes, abort any ongoing scan
      if (abortControllerRef.current) {
        try {
          abortControllerRef.current.abort();
        } catch (e) {
          // ignore
        }
        abortControllerRef.current = null;
      }
      setScanning(false);
      setShowErrorPopup(false);
      setError(null);
      setWriting(false);
      setWriteSuccess(false);
      setProcessComplete(false);
      setProgrammingApi(false);
      setScannedData({ uid: null, payloadText: '', matched: false, matchedTag: null });
    }
  }, [isOpenNfc, fetchTags]);

  // Utility to decode common NDEF records to text
  const decodeNdefMessage = (message) => {
    if (!message || !message.records) return "";

    const parts = [];

    for (const record of message.records) {
      try {
        // text record
        if (record.recordType === "text") {
          const textDecoder = new TextDecoder(record.encoding || "utf-8");
          // WebNFC Text record uses data as a DataView/BufferSource with status byte + lang - try parsing
          if (record.data instanceof ArrayBuffer || ArrayBuffer.isView(record.data)) {
            const dv = new DataView(record.data instanceof ArrayBuffer ? record.data : record.data.buffer);
            const status = dv.getUint8(0);
            const langLength = status & 0x3f;
            const isUtf16 = (status & 0x80) !== 0;
            const encoding = isUtf16 ? "utf-16" : "utf-8";
            const textBytes = new Uint8Array(dv.buffer, dv.byteOffset + 1 + langLength);
            parts.push(new TextDecoder(encoding).decode(textBytes));
          } else if (typeof record.data === "string") {
            parts.push(record.data);
          } else {
            // fallback
            parts.push(textDecoder.decode(record.data));
          }
        } else if (record.recordType === "url") {
          if (typeof record.data === "string") {
            parts.push(record.data);
          } else {
            parts.push(new TextDecoder().decode(record.data));
          }
        } else if (record.recordType === "mime" || record.recordType === "unknown") {
          // try to decode as utf-8 text
          if (record.data instanceof ArrayBuffer || ArrayBuffer.isView(record.data)) {
            parts.push(new TextDecoder().decode(record.data));
          } else if (typeof record.data === "string") {
            parts.push(record.data);
          }
        } else {
          // other types: try generic decode
          if (record.data instanceof ArrayBuffer || ArrayBuffer.isView(record.data)) {
            parts.push(new TextDecoder().decode(record.data));
          } else if (record.data) {
            parts.push(String(record.data));
          }
        }
      } catch (decodeErr) {
        console.warn("Failed to decode record", decodeErr);
      }
    }

    // join multiple records into one searchable string
    return parts.filter(Boolean).join(" ").trim();
  };

  // Call programTag API after successful write
  const callProgramTagApi = async (uid) => {
    try {
      setProgrammingApi(true);
      console.log("Calling programTag API with:", { uid, tag_id: tagId });

      // Check if tagId exists in context
      if (!tagId) {
        throw new Error("Tag ID not found in context. Please select a tag first.");
      }

      const response = await programTag({ uid, tag_id: tagId });

      if (response) {
        console.log("ProgramTag API success:", response);
        toast.success("Tag programmed successfully!");

        // Redirect to success page with UID after successful API call
        setTimeout(() => {
          window.location.href = `/ProgrammedSuccess/${uid}`;
        }, 1500);

        return true;
      } else {
        throw new Error(response?.message || "Failed to program tag");
      }
    } catch (err) {
      console.error("ProgramTag API Error:", err);
      toast.error(err.message || "Failed to program tag in system");
      setProgrammingApi(false);
      return false;
    }
  };

  // Write new data to NFC tag - automatically removes previous data
  const writeToNfcTag = async (uid, matchedTag) => {
    if (!ndefRef.current) {
      setError("NFC reader not initialized. Please try scanning again.");
      setShowErrorPopup(true);
      return;
    }

    try {
      setWriting(true);
      setError(null);
      setWriteSuccess(false);

      // const newUrl = `https://fanekt-react.vercel.app/${uid}/${tagId}`;
      const newUrl = `https://fanekt.com//${uid}/${tagId}`;


      // Write the new URL to the tag
      // The write() method automatically clears all existing NDEF data 
      // and writes only the new message to the tag
      await ndefRef.current.write({
        records: [
          {
            recordType: "url",
            data: newUrl
          }
        ]
      });

      setWriteSuccess(true);
      setWriting(false);

      // Update the scanned data to show new payload
      setScannedData(prev => ({
        ...prev,
        payloadText: newUrl
      }));

      console.log("Successfully wrote to NFC tag (all previous data removed):", newUrl);

      // Call programTag API with uid from scanned card and tagId from context
      const apiSuccess = await callProgramTagApi(uid);

      if (apiSuccess) {
        setProcessComplete(true);
      }

    } catch (err) {
      console.error("NFC Write Error:", err);
      setError(
        err.name === "NotAllowedError"
          ? "NFC write permission denied. Please allow NFC access."
          : err.name === "NotSupportedError"
            ? "NFC writing is not supported on this device."
            : "Failed to write to NFC tag. Please try again and hold the tag steady."
      );
      setShowErrorPopup(true);
      setWriting(false);
      toast.error("Failed to write to NFC tag");
    }
  };

  // Start NFC scanning and automatically write when matched
  const startNfcScan = async () => {
    // Check if tagId exists in context before starting scan
    if (!tagId) {
      setError("No tag selected. Please select a tag from the context first.");
      setShowErrorPopup(true);
      toast.error("No tag selected in context");
      return;
    }

    // ensure tags are loaded first
    if (!tags || tags.length === 0) {
      await fetchTags();
    }

    // Check if we have any tags from API
    if (tags.length === 0) {
      setError("No NFC tags found in the system. Please add tags first.");
      setShowErrorPopup(true);
      return;
    }

    setScannedData({ uid: null, payloadText: '', matched: false, matchedTag: null });
    setWriteSuccess(false);
    setProcessComplete(false);
    setProgrammingApi(false);

    if (!("NDEFReader" in window)) {
      const isChrome = navigator.userAgent.includes("Chrome");
      const isAndroid = navigator.userAgent.includes("Android");

      if (isChrome && !isAndroid) {
        setError(
          "NFC scanning requires enabling experimental features in Chrome. Go to chrome://flags/#enable-experimental-web-platform-features and enable it. Note: Full NFC functionality is available on Android Chrome with NFC hardware."
        );
      } else if (isChrome && isAndroid) {
        setError(
          "NFC scanning is supported on Android Chrome but may require permissions. Ensure NFC is enabled on your device and grant permissions if prompted."
        );
      } else {
        setError("NFC is not supported on this device/browser. Try using Chrome on Android.");
      }
      setShowErrorPopup(true);
      return;
    }

    try {
      setScanning(true);
      setError(null);

      // abort previous controller if exists
      if (abortControllerRef.current) {
        try {
          abortControllerRef.current.abort();
        } catch (e) { }
      }
      abortControllerRef.current = new AbortController();
      const signal = abortControllerRef.current.signal;

      const ndef = new NDEFReader();
      ndefRef.current = ndef;
      await ndef.scan({ signal });

      // reading event
      ndef.addEventListener("reading", async (event) => {
        const { serialNumber, message } = event;
        const scannedUid = serialNumber ? serialNumber.toUpperCase().replace(/:/g, "") : null;

        // decode payload from the card (if any)
        const payloadText = decodeNdefMessage(message);

        console.log("Scanned UID:", scannedUid);
        console.log("Current Payload:", payloadText);

        // Match by UID from API data
        const matchedTag = scannedUid
          ? tags.find((t) => String(t.uid).toUpperCase() === scannedUid)
          : null;

        // Set the scanned data to display
        setScannedData({
          uid: scannedUid || 'N/A',
          payloadText: payloadText || 'No data found',
          matched: !!matchedTag,
          matchedTag: matchedTag || null
        });

        // Stop scanning
        if (abortControllerRef.current) {
          try {
            abortControllerRef.current.abort();
          } catch (e) { }
          abortControllerRef.current = null;
        }
        setScanning(false);

        // If matched, check status before writing
        if (matchedTag && scannedUid) {
          console.log("Tag matched in API! Checking status...");

          // Check if tag status is "unprogrammed"
          if (matchedTag.status === "unprogrammed") {
            console.log("Tag is unprogrammed. Auto-writing new data (removing old data)...");
            // Small delay to show the matched status
            setTimeout(() => {
              writeToNfcTag(scannedUid, matchedTag);
            }, 500);
          } else {
            // Tag is programmed or activated - show error
            setError(`This tag is already ${matchedTag.status}. Only unprogrammed tags can be written.`);
            setShowErrorPopup(true);
            toast.error(`Tag is already ${matchedTag.status}`);
            console.log(`Tag status: ${matchedTag.status} - Cannot write to programmed/activated tags`);
          }
        } else {
          setError("Tag not found in system database. Cannot write data to unregistered tag.");
          setShowErrorPopup(true);
          toast.error("Tag not found in database");
        }
      });

      // reading error event
      ndef.addEventListener("readingerror", () => {
        setError("Failed to read NFC tag. Please try again.");
        setShowErrorPopup(true);
        setScanning(false);
        toast.error("Failed to read NFC tag");
      });
    } catch (err) {
      console.error("NFC Scan Error:", err);
      setError(err.name === "NotAllowedError" ? "NFC permission denied. Please allow NFC access." : "Failed to start NFC scan. Please try again.");
      setShowErrorPopup(true);
      setScanning(false);
      toast.error("Failed to start NFC scan");
    }
  };

  const closeErrorPopup = () => {
    setShowErrorPopup(false);
    setError(null);
  };

  // when Cancel / modal close clicked, abort scan and call parent close
  const handleCancel = () => {
    if (abortControllerRef.current) {
      try {
        abortControllerRef.current.abort();
      } catch (e) { }
      abortControllerRef.current = null;
    }
    setScanning(false);
    ndefRef.current = null;
    onCloseNfc();
  };

  if (!isOpenNfc) return null;

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

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
            className="bg-white rounded-[16px] w-[450px] p-6 flex flex-col items-center justify-center gap-2"
          >
            <img src={Nfc} className="w-[100px] mt-[-75px]" alt="NFC" />
            <h2 className="text-[28px] text-[#301820] font-semibold">Place NFC Tag Near Reader</h2>
            <p className="text-[#808080] text-center text-[16px] font-[400]">Hold your NFC tag close to the reader or tap on your phone</p>

            {/* Show tagId from context */}
            {tagId && (
              <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded-[5px] w-[85%]">
                <p className="text-[12px] text-blue-700 text-center">
                  Selected Tag ID: <span className="font-semibold">{tagId}</span>
                </p>
              </div>
            )}

            <div className="flex flex-col justify-center items-center gap-3 mt-3 w-full">
              {loading ? (
                <div className="font-[400] text-[18px] text-center p-3 w-[85%] rounded-[5px] border-2 border-[#155bf23d] text-[#808080]">
                  Loading tags from database...
                </div>
              ) : scanning ? (
                <div className="font-[400] text-[18px] text-center p-3 w-[85%] rounded-[5px] border-2 border-[#155bf4] text-[#155bf4] animate-pulse">
                  Waiting for NFC Tag...
                </div>
              ) : writing ? (
                <div className="font-[400] text-[18px] text-center p-3 w-[85%] rounded-[5px] border-2 border-[#ff9800] text-[#ff9800] animate-pulse">
                  Removing old data & writing new data... Keep tag near reader!
                </div>
              ) : programmingApi ? (
                <div className="font-[400] text-[18px] text-center p-3 w-[85%] rounded-[5px] border-2 border-[#2196f3] text-[#2196f3] animate-pulse">
                  Programming tag in system...
                </div>
              ) : processComplete ? (
                <div className="font-[400] text-[18px] text-center p-3 w-[85%] rounded-[5px] border-2 border-[#4caf50] text-[#4caf50]">
                  ✓ Success! Redirecting...
                </div>
              ) : (
                <button onClick={startNfcScan} className="font-[400] text-[18px] text-center p-3 w-[85%] rounded-[5px] border-2 border-[#155bf23d] text-black hover:bg-[#155bf4] hover:text-white transition-colors cursor-pointer">
                  Start Scanning
                </button>
              )}

              {!processComplete && !programmingApi && (
                <button onClick={handleCancel} className="font-[400] text-[16px] text-center p-2 w-[85%] rounded-[5px] text-[#808080] hover:text-black transition-colors cursor-pointer">
                  Cancel
                </button>
              )}
            </div>

            {/* Display scanned NFC card data */}
            {scannedData.uid && (
              <div className="mt-4 w-full flex flex-col items-center gap-2">
                <h3 className="text-[20px] text-[#301820] font-semibold">Processing NFC Tag</h3>
                <div className="bg-gray-50 p-4 rounded-[8px] w-[90%] text-left">
                  <p className="text-[#301820] font-[500]">Scanned UID:</p>
                  <p className="text-[#808080] mb-2">{scannedData.uid}</p>
                  <p className="text-[#301820] font-[500]">Current Payload:</p>
                  <p className="text-[#808080] break-all mb-2">{scannedData.payloadText}</p>

                  {scannedData.matched ? (
                    <>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="text-green-600 font-[500]">Tag Found in Database</p>
                      </div>

                      {writing && (
                        <div className="flex items-center gap-2 mt-2">
                          <div className="w-5 h-5 border-2 border-orange-500 border-t-transparent rounded-full animate-spin flex-shrink-0"></div>
                          <p className="text-orange-600 font-[500]">Removing old data & writing new data...</p>
                        </div>
                      )}

                      {writeSuccess && !programmingApi && (
                        <div className="flex items-center gap-2 mt-2">
                          <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <p className="text-green-600 font-[500]">Data Written Successfully</p>
                        </div>
                      )}

                      {programmingApi && (
                        <div className="flex items-center gap-2 mt-2">
                          <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin flex-shrink-0"></div>
                          <p className="text-blue-600 font-[500]">Programming tag in system...</p>
                        </div>
                      )}

                      {processComplete && (
                        <>
                          <div className="flex items-center gap-2 mt-2">
                            <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <p className="text-green-600 font-[500]">Tag Programmed Successfully</p>
                          </div>

                          <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-[8px]">
                            <p className="text-green-700 font-[500] text-center text-[14px]">
                              ✓ All previous data removed
                            </p>
                            <p className="text-green-600 text-center text-[12px] mt-1">
                              New URL written: {scannedData.payloadText}
                            </p>
                            <p className="text-green-600 text-center text-[12px] mt-1 font-[600]">
                              Redirecting to success page...
                            </p>
                          </div>
                        </>
                      )}
                    </>
                  ) : (
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                      <p className="text-red-600 font-[500]">Tag Not Found in Database</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* Error Popup */}
      <AnimatePresence>
        {showErrorPopup && (
          <motion.div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} className="bg-white rounded-[16px] w-[400px] p-6 flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h3 className="text-[24px] text-[#301820] font-semibold text-center">Error</h3>
              <p className="text-[#808080] text-center text-[16px]">{error}</p>
              <button onClick={closeErrorPopup} className="font-[500] text-[16px] text-center p-3 w-full rounded-[5px] bg-[#155bf4] text-white hover:bg-[#1348c9] transition-colors cursor-pointer">
                Try Again
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

ScanNfcModal.propTypes = {
  isOpenNfc: PropTypes.bool.isRequired,
  onCloseNfc: PropTypes.func.isRequired,
};

export default ScanNfcModal;