import React, { useEffect, useState } from "react";
import { Shield, Radio, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import SplashView from "./SplashView";
import Logo from "./assets/logo.png";
import StarIcon from "./assets/star-icon.png";
import FanektIcon from "./assets/fanekt-icon.png";
import Secure from "./assets/secure.png";
import X from "./assets/x.png";
import Official from "./assets/official.png";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { fanProfile } from "../../API/apiService";

export default function Splash() {
  const { uid, tagId } = useParams();
  const [showSplash, setShowSplash] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleActivateClick = () => {
    if (uid && tagId) {
      navigate(`/app/register/${uid}/${tagId}`);
    } else {
      console.error("Missing UID or Tag ID");
    }
  };

  // Auto-hide splash after 5s
  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  // ✅ Automatically run sendLocation API on mount
  useEffect(() => {
    const sendLocation = async () => {
      if (!uid) {
        toast.error("Missing UID.");
        return;
      }

      try {
        setIsLoading(true);

        // Get current location
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 10000,
          });
        });

        const { latitude, longitude } = position.coords;
        const location = `${latitude},${longitude}`;

        const payload = { uid, location };

        // Call API
        const res = await fanProfile(payload);

        if (res?.data?.status) {
          const data = res.data.data;
          toast.success("Location sent successfully!");

          // ✅ Navigate based on tag status
          if (data.tag?.status === "activated") {
            navigate(`/app/congratulations/${uid}/${tagId}`, {
              state: data, // pass fan + tag info if needed
            });
          } else if (data.tag?.status === "programmed") {
            // stay on page
            console.log("Tag still programmed, staying on page.");
          }
        } else {
          toast.error(res?.data?.message || "Failed to fetch fan profile.");
        }
      } catch (err) {
        console.error("Error fetching fan profile:", err);
        if (err.code === 1) {
          toast.error("Please allow location access to continue.");
        } else if (err.response?.data?.errors) {
          Object.values(err.response.data.errors).forEach((msgArr) =>
            toast.error(msgArr[0])
          );
        } else {
          toast.error(err.response?.data?.message || "Something went wrong.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    sendLocation();
  }, [uid, tagId, navigate]);

  return (
    <>
      <Toaster position="top-center" />
      {/* SplashView (shows only for 5 seconds) */}
      <AnimatePresence>
        {showSplash && (
          <motion.div
            key="splash"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="fixed inset-0 z-50 bg-[#1e1e1e]"
          >
            <SplashView />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Screen */}
      <motion.div
        key="main"
        initial={{ opacity: 0 }}
        animate={{ opacity: showSplash ? 0 : 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className={`min-h-screen bg-[#1e1e1e] items-center justify-center sm:p-4 p-0 ${showSplash ? "hidden" : "flex"
          }`}
      >
        <div className="w-full max-w-[400px] sm:border-2 border-white/90 p-3 sm:rounded-3xl bg-[linear-gradient(to_bottom_left,_#2d3569_20%,_#3f283d_50%,_#2d3569_100%)] ">
          {/* Logo */}
          <div className="w-full flex justify-center">
            <img src={Logo} className="w-[170px] mb-3 mt-5" alt="" />
          </div>

          {/* Main Card */}
          <div className="bg-gradient-to-br from-[#2a2a4a]/60 to-[#1a1a3a]/40 backdrop-blur-lg rounded-3xl p-6 border-2 border-[#4a4a7a]/40 shadow-2xl mb-6">
            <div className="btn-gradient bg-gradient-to-r from-[#3a3a5a]/50 to-[#2a2a4a]/50 rounded-xl p-3 mb-3 border border-[#5a5a8a]/30 flex items-center justify-center gap-2">
              <img src={FanektIcon} className="w-[20px]" alt="" />
              <span className="text-white font-[400]">
                Official FANEKT Tag Verified
              </span>
            </div>

            <div className="btn-gradient rounded-xl px-3 py-4 mb-4 border border-[#5a5a8a]/30">
              <p className="text-white/80 text-center text-[17px]">Tag ID</p>
              <h2 className="text-white text-[28px] font-medium text-center tracking-wider">
                {uid ? uid.toUpperCase() : "N/A"}
              </h2>
              <p className="text-white/60 text-center">
                Status: Not Yet Activated
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-white text-[18px] font-medium mb-2">
                You've just scanned an official <br /> FANEKT NFC patch.
              </h3>
              <p className="text-gray-400 text-sm">
                Register your item to activate your connection and unlock
                exclusive fan experiences.
              </p>
            </div>

            <button
              onClick={handleActivateClick}
              className="w-full bg-[linear-gradient(160deg,#155BF2_10%,#9e519b_50%,#FE4B5E_90%)] 
                       text-white font-semibold text-lg py-4 rounded-xl shadow-lg 
                         transition-all duration-300 transform hover:scale-[1.02] 
                         relative overflow-hidden group"
              disabled={isLoading}
            >
              <span className=" z-10">
                {isLoading ? "Checking..." : "Activate My Tag"}
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
          </div>

          {/* Bottom Features */}
          <div className="grid grid-cols-3 gap-2">
            <div className="btn-gradient-blue rounded-xl py-3 border border-[#3a3a5a]/30 flex items-center justify-center gap-1">
              <img src={Secure} className="w-[18px]" alt="" />
              <span className="text-white/80 text-[12px] font-[400]">Secure</span>
            </div>
            <div className="btn-gradient-blue rounded-xl py-3 border border-[#3a3a5a]/30 flex items-center justify-center gap-1">
              <img src={X} className="w-[18px]" alt="" />
              <span className="text-white/80 text-[12px] font-[400]">
                X-KRYPTED®
              </span>
            </div>
            <div className="btn-gradient-blue rounded-xl py-3 border border-[#3a3a5a]/30 flex items-center justify-center gap-1">
              <img src={Official} className="w-[18px]" alt="" />
              <span className="text-white/80 text-[12px] font-[400]">
                Official
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}









import React, { useEffect, useState } from "react";
import { Shield, Radio, Sparkles, X, CheckCircle, AlertCircle } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import SplashView from "./SplashView";
import Logo from "./assets/logo.png";
import StarIcon from "./assets/star-icon.png";
import FanektIcon from "./assets/fanekt-icon.png";
import Secure from "./assets/secure.png";
import XIcon from "./assets/x.png";
import Official from "./assets/official.png";
import { useNavigate, useParams } from "react-router-dom";
import { fanProfile } from "../../API/apiService";

// Custom Popup Component
const Popup = ({ type, message, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="bg-gradient-to-br from-[#2a2a4a] to-[#1a1a3a] rounded-2xl p-6 max-w-sm w-full border-2 border-[#4a4a7a]/40 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center mb-4">
          {type === "success" ? (
            <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
              <CheckCircle size={40} className="text-green-400" />
            </div>
          ) : (
            <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center">
              <AlertCircle size={40} className="text-red-400" />
            </div>
          )}
        </div>

        <h3
          className={`text-xl font-semibold text-center mb-2 ${
            type === "success" ? "text-green-400" : "text-red-400"
          }`}
        >
          {type === "success" ? "Success!" : "Error"}
        </h3>
        <p className="text-white/80 text-center mb-6">{message}</p>

        <button
          onClick={onClose}
          className={`w-full py-3 rounded-xl font-semibold text-white transition-all duration-300 ${
            type === "success"
              ? "bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400"
              : "bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400"
          }`}
        >
          Got It
        </button>
      </motion.div>
    </motion.div>
  );
};

export default function Splash() {
  const { uid, tagId } = useParams();
  const [showSplash, setShowSplash] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [popup, setPopup] = useState(null);
  const [locationSent, setLocationSent] = useState(false);
  const navigate = useNavigate();

  const handleActivateClick = () => {
    if (uid && tagId) {
      navigate(`/app/register/${uid}/${tagId}`);
    } else {
      console.error("Missing UID or Tag ID");
    }
  };

  const showPopup = (type, message) => {
    setPopup({ type, message });
  };

  // Auto-hide splash after 5s
  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  // Auto-run location scan + fanProfile API
  useEffect(() => {
    const sendLocation = async () => {
      if (!uid) {
        showPopup("error", "Missing UID.");
        return;
      }

      // Prevent duplicate calls
      if (locationSent) return;

      try {
        setIsLoading(true);

        // Get current location
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
          });
        });

        const { latitude, longitude } = position.coords;
        const location = `${latitude},${longitude}`;
        
        // Payload matching Postman body structure
        const payload = { 
          uid, 
          location 
        };

        console.log("Sending payload:", payload);

        // Call API
        const res = await fanProfile(payload);

        if (res?.data?.status) {
          const data = res.data.data;
          setLocationSent(true);
          showPopup("success", "Location verified successfully!");

          // Navigate based on tag status
          if (data.tag?.status === "activated") {
            setTimeout(() => {
              navigate(`/app/congratulations/${uid}/${tagId}`, {
                state: data,
              });
            }, 2000);
          } else if (data.tag?.status === "programmed") {
            console.log("Tag still programmed, ready for activation.");
          }
        } else {
          showPopup("error", res?.data?.message || "Failed to verify location.");
        }
      } catch (err) {
        console.error("Error sending location:", err);
        
        if (err.code === 1) {
          showPopup("error", "Location access denied. Please enable location services.");
        } else if (err.code === 2) {
          showPopup("error", "Location unavailable. Please check your device settings.");
        } else if (err.code === 3) {
          showPopup("error", "Location request timed out. Please try again.");
        } else if (err.response?.data?.errors) {
          const errorMessages = Object.values(err.response.data.errors)
            .flat()
            .join(", ");
          showPopup("error", errorMessages);
        } else {
          showPopup("error", err.response?.data?.message || "Something went wrong.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    // Wait 3 seconds before calling API (after splash starts)
    const timer = setTimeout(sendLocation, 3000);
    return () => clearTimeout(timer);
  }, [uid, tagId, navigate, locationSent]);

  return (
    <>
      <AnimatePresence>
        {popup && (
          <Popup
            type={popup.type}
            message={popup.message}
            onClose={() => setPopup(null)}
          />
        )}
      </AnimatePresence>

      {/* SplashView */}
      <AnimatePresence>
        {showSplash && (
          <motion.div
            key="splash"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="fixed inset-0 z-50 bg-[#1e1e1e]"
          >
            <SplashView />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Screen */}
      <motion.div
        key="main"
        initial={{ opacity: 0 }}
        animate={{ opacity: showSplash ? 0 : 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className={`min-h-screen bg-[#1e1e1e] items-center justify-center sm:p-4 p-0 ${
          showSplash ? "hidden" : "flex"
        }`}
      >
        <div className="w-full max-w-[400px] sm:border-2 border-white/90 p-3 sm:rounded-3xl bg-[linear-gradient(to_bottom_left,_#2d3569_20%,_#3f283d_50%,_#2d3569_100%)] ">
          <div className="w-full flex justify-center">
            <img src={Logo} className="w-[170px] mb-3 mt-5" alt="" />
          </div>

          {/* Main Card */}
          <div className="bg-gradient-to-br from-[#2a2a4a]/60 to-[#1a1a3a]/40 backdrop-blur-lg rounded-3xl p-6 border-2 border-[#4a4a7a]/40 shadow-2xl mb-6">
            <div className="btn-gradient bg-gradient-to-r from-[#3a3a5a]/50 to-[#2a2a4a]/50 rounded-xl p-3 mb-3 border border-[#5a5a8a]/30 flex items-center justify-center gap-2">
              <img src={FanektIcon} className="w-[20px]" alt="" />
              <span className="text-white font-[400]">
                Official FANEKT Tag Verified
              </span>
            </div>

            <div className="btn-gradient rounded-xl px-3 py-4 mb-4 border border-[#5a5a8a]/30">
              <p className="text-white/80 text-center text-[17px]">Tag ID</p>
              <h2 className="text-white text-[28px] font-medium text-center tracking-wider">
                {uid ? uid.toUpperCase() : "N/A"}
              </h2>
              <p className="text-white/60 text-center">
                Status: {locationSent ? "Verified" : "Verifying Location..."}
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-white text-[18px] font-medium mb-2">
                You've just scanned an official <br /> FANEKT NFC patch.
              </h3>
              <p className="text-gray-400 text-sm">
                Register your item to activate your connection and unlock
                exclusive fan experiences.
              </p>
            </div>

            <button
              onClick={handleActivateClick}
              className="w-full bg-[linear-gradient(160deg,#155BF2_10%,#9e519b_50%,#FE4B5E_90%)] 
                       text-white font-semibold text-lg py-4 rounded-xl shadow-lg 
                         transition-all duration-300 transform hover:scale-[1.02] 
                         relative overflow-hidden group"
              disabled={isLoading}
            >
              <span className="z-10">
                {isLoading ? "Verifying..." : "Activate My Tag"}
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
          </div>

          {/* Bottom Features */}
          <div className="grid grid-cols-3 gap-2">
            <div className="btn-gradient-blue rounded-xl py-3 border border-[#3a3a5a]/30 flex items-center justify-center gap-1">
              <img src={Secure} className="w-[18px]" alt="" />
              <span className="text-white/80 text-[12px] font-[400]">Secure</span>
            </div>
            <div className="btn-gradient-blue rounded-xl py-3 border border-[#3a3a5a]/30 flex items-center justify-center gap-1">
              <img src={XIcon} className="w-[18px]" alt="" />
              <span className="text-white/80 text-[12px] font-[400]">
                X-KRYPTED®
              </span>
            </div>
            <div className="btn-gradient-blue rounded-xl py-3 border border-[#3a3a5a]/30 flex items-center justify-center gap-1">
              <img src={Official} className="w-[18px]" alt="" />
              <span className="text-white/80 text-[12px] font-[400]">
                Official
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}