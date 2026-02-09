// import React, { useEffect, useState } from "react";
// import { Shield, Radio, Sparkles } from "lucide-react";
// import { AnimatePresence, motion } from "framer-motion";
// import SplashView from "./SplashView";
// import Logo from "./assets/logo.png";
// import StarIcon from "./assets/star-icon.png";
// import FanektIcon from "./assets/fanekt-icon.png";
// import Secure from "./assets/secure.png";
// import X from "./assets/x.png";
// import Official from "./assets/official.png";
// import toast, { Toaster } from "react-hot-toast";
// import { useNavigate, useParams } from "react-router-dom";
// import { fanProfile } from "../../API/apiService";

// export default function Splash() {
//   const { uid, tagId } = useParams();
//   const [showSplash, setShowSplash] = useState(true);
//   const [isLoading, setIsLoading] = useState(false);
//   const [locationSent, setLocationSent] = useState(false);
//   const navigate = useNavigate();

//   const handleActivateClick = () => {
//     if (!locationSent) {
//       toast.custom((t) => (
//         <div
//           className={`${t.visible ? "animate-enter" : "animate-leave"
//             } bg-[#db0d286b] border border-[#e00f0f] text-white px-5 py-3 rounded-2xl mt-4 shadow-lg`}
//         >
//           Please allow location access to continue.
//         </div>
//       ));
//       return;
//     }

//     if (uid && tagId) {
//       navigate(`/app/register/${uid}/${tagId}`);
//     } else {
//       console.error("Missing UID or Tag ID");
//     }
//   };

//   // Auto-hide splash after 5s
//   useEffect(() => {
//     const timer = setTimeout(() => setShowSplash(false), 5000);
//     return () => clearTimeout(timer);
//   }, []);

//   //  Automatically run sendLocation API on mount

//   useEffect(() => {
//     const sendLocation = async () => {
//       if (!uid) {
//         toast.error("Missing UID.");
//         return;
//       }

//       try {
//         setIsLoading(true);

//         const position = await new Promise((resolve, reject) => {
//           navigator.geolocation.getCurrentPosition(resolve, reject, {
//             enableHighAccuracy: true,
//             timeout: 10000,
//             maximumAge: 0,
//           });
//         });

//         const { latitude, longitude } = position.coords;
//         const location = `${latitude},${longitude}`;
//         const payload = { uid, location };

//         console.log("Sending payload:", payload);

//         const res = await fanProfile(payload);

//         if (res?.data?.status) {
//           const data = res.data.data;
//           setLocationSent(true);
//           // toast.success("Location sent successfully!");

//           if (data.tag?.status === "activated") {
//             navigate(`/app/alert/${uid}/${tagId}`, {
//               state: data,
//             });
//           } else {
//             console.log("Tag still programmed, staying on page.");
//           }
//         } else {
//           toast.error(res?.data?.message || "Failed to fetch fan profile.");
//         }
//       } catch (err) {
//         console.error("Error getting or sending location:", err);

//         //  Handle geolocation errors
//         if (err.code === 1) {
//           toast.error("Location permission denied. Please enable it manually.");
//         } else if (err.code === 2) {
//           toast.error("Position unavailable. Try again later.");
//         } else if (err.code === 3) {
//           toast.error("Location request timed out.");
//         } else {
//           toast.error("Error communicating with server.");
//         }
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     sendLocation();
//   }, [uid, tagId, navigate]);


//   return (
//     <>
//       <Toaster position="top-center" />
//       {/* SplashView (shows only for 5 seconds) */}
//       <AnimatePresence>
//         {showSplash && (
//           <motion.div
//             key="splash"
//             initial={{ opacity: 1 }}
//             exit={{ opacity: 0, scale: 0.98 }}
//             transition={{ duration: 0.8, ease: "easeOut" }}
//             className="fixed inset-0 z-50 bg-[#1e1e1e]"
//           >
//             <SplashView />
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Main Screen */}
//       <motion.div
//         key="main"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: showSplash ? 0 : 1 }}
//         transition={{ duration: 1, ease: "easeOut" }}
//         className={`min-h-screen bg-[#1e1e1e] items-center justify-center sm:p-4 p-0 ${showSplash ? "hidden" : "flex"
//           }`}
//       >
//         <div className="w-full max-w-[400px] sm:border-2 border-white/90 p-3 sm:rounded-3xl bg-[linear-gradient(to_bottom_left,_#2d3569_20%,_#3f283d_50%,_#2d3569_100%)] ">
//           {/* Logo */}
//           <div className="w-full flex justify-center">
//             <img src={Logo} className="w-[170px] mb-3 mt-5" alt="" />
//           </div>

//           {/* Main Card */}
//           <div className="bg-gradient-to-br from-[#2a2a4a]/60 to-[#1a1a3a]/40 backdrop-blur-lg rounded-3xl p-6 border-2 border-[#4a4a7a]/40 shadow-2xl mb-6">
//             <div className="btn-gradient bg-gradient-to-r from-[#3a3a5a]/50 to-[#2a2a4a]/50 rounded-xl p-3 mb-3 border border-[#5a5a8a]/30 flex items-center justify-center gap-2">
//               <img src={FanektIcon} className="w-[20px]" alt="" />
//               <span className="text-white font-[400]">
//                 Official FANEKT Tag Verified
//               </span>
//             </div>

//             <div className="btn-gradient rounded-xl px-3 py-4 mb-4 border border-[#5a5a8a]/30">
//               <p className="text-white/80 text-center text-[17px]">Tag ID</p>
//               <h2 className="text-white text-[28px] font-medium text-center tracking-wider">
//                 {uid ? uid.toUpperCase() : "N/A"}
//               </h2>
//               <p className="text-white/60 text-center">Status: Not Yet Activated</p>
//             </div>

//             <div className="mb-6">
//               <h3 className="text-white text-[18px] font-medium mb-2">
//                 You've just scanned an official <br /> FANEKT NFC patch.
//               </h3>
//               <p className="text-gray-400 text-sm">
//                 Register your item to activate your connection and unlock
//                 exclusive fan experiences.
//               </p>
//             </div>

//             <button
//               onClick={handleActivateClick}
//               className="w-full bg-[linear-gradient(160deg,#155BF2_10%,#9e519b_50%,#FE4B5E_90%)] 
//            text-white font-semibold text-lg py-4 rounded-xl shadow-lg 
//            transition-all duration-300 transform hover:scale-[1.02] 
//            relative overflow-hidden group disabled:opacity-50"

//               disabled={isLoading}
//             >
//               <span className=" z-10">
//                 {isLoading ? "Checking..." : "Activate My Tag"}
//                 <img src={StarIcon} className="w-[40px] absolute bottom-0 right-3" alt="" />
//               </span>
//               <div
//                 className="absolute inset-0 bg-white/20 transform translate-x-full 
//                   group-hover:translate-x-0 transition-transform duration-300"
//               ></div>
//             </button>
//           </div>

//           {/* Bottom Features */}
//           <div className="grid grid-cols-3 gap-2">
//             <div className="btn-gradient-blue rounded-xl py-3 border border-[#3a3a5a]/30 flex items-center justify-center gap-1">
//               <img src={Secure} className="w-[18px]" alt="" />
//               <span className="text-white/80 text-[12px] font-[400]">Secure</span>
//             </div>
//             <div className="btn-gradient-blue rounded-xl py-3 border border-[#3a3a5a]/30 flex items-center justify-center gap-1">
//               <img src={X} className="w-[18px]" alt="" />
//               <span className="text-white/80 text-[12px] font-[400]">
//                 X-KRYPTED®
//               </span>
//             </div>
//             <div className="btn-gradient-blue rounded-xl py-3 border border-[#3a3a5a]/30 flex items-center justify-center gap-1">
//               <img src={Official} className="w-[18px]" alt="" />
//               <span className="text-white/80 text-[12px] font-[400]">Official</span>
//             </div>
//           </div>
//         </div>
//       </motion.div >
//     </>
//   );
// }







// import React, { useEffect, useState } from "react";
// import { Shield, Radio, Sparkles, MapPin } from "lucide-react";
// import { AnimatePresence, motion } from "framer-motion";
// import SplashView from "./SplashView";
// import Logo from "./assets/logo.png";
// import StarIcon from "./assets/star-icon.png";
// import FanektIcon from "./assets/fanekt-icon.png";
// import Secure from "./assets/secure.png";
// import XIcon from "./assets/x.png";
// import Official from "./assets/official.png";
// import toast, { Toaster } from "react-hot-toast";
// import { useNavigate, useParams } from "react-router-dom";
// import { fanProfile } from "../../API/apiService";

// export default function Splash() {
//   const { uid, tagId } = useParams();
//   const [showSplash, setShowSplash] = useState(true);
//   const [isLoading, setIsLoading] = useState(false);
//   const [locationSent, setLocationSent] = useState(false);
//   const [showLocationPopup, setShowLocationPopup] = useState(false);
//   const [locationError, setLocationError] = useState("");
//   const [isRetrying, setIsRetrying] = useState(false);
//   const navigate = useNavigate();

//   const handleActivateClick = () => {
//     if (!locationSent) {
//       setShowLocationPopup(true);
//       return;
//     }

//     if (uid && tagId) {
//       navigate(`/app/register/${uid}/${tagId}`);
//     } else {
//       console.error("Missing UID or Tag ID");
//     }
//   };

//   // Auto-hide splash after 5s
//   useEffect(() => {
//     const timer = setTimeout(() => setShowSplash(false), 5000);
//     return () => clearTimeout(timer);
//   }, []);

//   useEffect(() => {
//     const sendLocation = async () => {
//       if (!uid) {
//         toast.error("Missing UID.");
//         return;
//       }

//       try {
//         setIsLoading(true);
//         setLocationError("");

//         const position = await new Promise((resolve, reject) => {
//           navigator.geolocation.getCurrentPosition(resolve, reject, {
//             enableHighAccuracy: true,
//             timeout: 10000,
//             maximumAge: 0,
//           });
//         });

//         const { latitude, longitude } = position.coords;
//         const location = `${latitude},${longitude}`;
//         const payload = { uid, location };

//         console.log("Sending payload:", payload);

//         const res = await fanProfile(payload);

//         if (res?.data?.status) {
//           const data = res.data.data;
//           setLocationSent(true);
//           setShowLocationPopup(false);

//           if (data.tag?.status === "activated") {
//             navigate(`/app/alert/${uid}/${tagId}`, {
//               state: data,
//             });
//           } else {
//             console.log("Tag still programmed, staying on page.");
//           }
//         } else {
//           toast.error(res?.data?.message || "Failed to fetch fan profile.");
//           setLocationError("Failed to fetch fan profile. Please try again.");
//           setShowLocationPopup(true);
//         }
//       } catch (err) {
//         console.error("Error getting or sending location:", err);

//         // Handle geolocation errors and show persistent popup
//         if (err.code === 1) {
//           setLocationError("Location permission denied. Please enable location access to continue.");
//         } else if (err.code === 2) {
//           setLocationError("Position unavailable. Please check your device settings and try again.");
//         } else if (err.code === 3) {
//           setLocationError("Location request timed out. Please try again.");
//         } else {
//           setLocationError("Unable to access location. Please enable location services.");
//         }

//         // Always show popup on error
//         setShowLocationPopup(true);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     sendLocation();
//   }, [uid, tagId, navigate]);

//   const handleRetryLocation = async () => {
//     if (!uid) {
//       toast.error("Missing UID.");
//       return;
//     }

//     try {
//       setIsRetrying(true);
//       setLocationError("");

//       const position = await new Promise((resolve, reject) => {
//         navigator.geolocation.getCurrentPosition(resolve, reject, {
//           enableHighAccuracy: true,
//           timeout: 10000,
//           maximumAge: 0,
//         });
//       });

//       const { latitude, longitude } = position.coords;
//       const location = `${latitude},${longitude}`;
//       const payload = { uid, location };

//       console.log("Sending payload:", payload);

//       const res = await fanProfile(payload);

//       if (res?.data?.status) {
//         const data = res.data.data;
//         setLocationSent(true);
//         setShowLocationPopup(false);
//         toast.success("Location access granted!");

//         if (data.tag?.status === "activated") {
//           navigate(`/app/alert/${uid}/${tagId}`, {
//             state: data,
//           });
//         }
//       } else {
//         toast.error(res?.data?.message || "Failed to fetch fan profile.");
//         setLocationError("Failed to fetch fan profile. Please try again.");
//       }
//     } catch (err) {
//       console.error("Error getting or sending location:", err);

//       if (err.code === 1) {
//         setLocationError("Location permission denied. Please enable location access in your browser settings.");
//       } else if (err.code === 2) {
//         setLocationError("Position unavailable. Please check your device settings.");
//       } else if (err.code === 3) {
//         setLocationError("Location request timed out. Please try again.");
//       } else {
//         setLocationError("Unable to access location. Please enable location services.");
//       }
//     } finally {
//       setIsRetrying(false);
//     }
//   };

//   return (
//     <>
//       <Toaster position="top-center" />

//       {/* Persistent Location Permission Popup */}
//       {showLocationPopup && (
//         <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
//           <div className="bg-gradient-to-br from-[#2a2a4a] to-[#1a1a3a] rounded-2xl p-6 max-w-md w-full border-2 border-[#4a4a7a]/40 shadow-2xl animate-[fadeIn_0.3s_ease-out]">
//             <div className="flex flex-col items-center text-center">
//               {/* Icon */}
//               <div className="w-20 h-20 bg-gradient-to-br from-[#155BF2] to-[#9e519b] rounded-full flex items-center justify-center mb-4 animate-[pulse_2s_ease-in-out_infinite]">
//                 <MapPin className="w-10 h-10 text-white" />
//               </div>

//               {/* Title */}
//               <h3 className="text-white text-2xl font-semibold mb-3">
//                 Location Access Required
//               </h3>

//               {/* Message */}
//               <p className="text-gray-300 text-sm mb-2">
//                 {locationError || "We need your location to verify and activate your FANEKT tag."}
//               </p>

//               <p className="text-gray-400 text-xs mb-6">
//                 Your location data is secure and only used for tag activation.
//               </p>

//               {/* Retry Button */}
//               <button
//                 onClick={handleRetryLocation}
//                 disabled={isRetrying}
//                 className="w-full bg-[linear-gradient(160deg,#155BF2_10%,#9e519b_50%,#FE4B5E_90%)] 
//                   text-white font-semibold text-lg py-4 rounded-xl shadow-lg 
//                   transition-all duration-300 transform hover:scale-[1.02] 
//                   disabled:opacity-50 disabled:cursor-not-allowed mb-3"
//               >
//                 {isRetrying ? "Requesting Access..." : "Grant Location Access"}
//               </button>

//               {/* Help Text */}
//               <p className="text-gray-400 text-xs">
//                 If blocked, please enable location in your browser settings
//               </p>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* SplashView (shows only for 5 seconds) */}
//       <AnimatePresence>
//         {showSplash && (
//           <motion.div
//             key="splash"
//             initial={{ opacity: 1 }}
//             exit={{ opacity: 0, scale: 0.98 }}
//             transition={{ duration: 0.8, ease: "easeOut" }}
//             className="fixed inset-0 z-50 bg-[#1e1e1e]"
//           >
//             <SplashView />
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Main Screen */}
//       <motion.div
//         key="main"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: showSplash ? 0 : 1 }}
//         transition={{ duration: 1, ease: "easeOut" }}
//         className={`min-h-screen bg-[#1e1e1e] items-center justify-center sm:p-4 p-0 ${
//           showSplash ? "hidden" : "flex"
//         }`}
//       >
//         <div className="w-full max-w-[400px] sm:border-2 border-white/90 p-3 sm:rounded-3xl bg-[linear-gradient(to_bottom_left,_#2d3569_20%,_#3f283d_50%,_#2d3569_100%)] ">
//           {/* Logo */}
//           <div className="w-full flex justify-center">
//             <img src={Logo} className="w-[170px] mb-3 mt-5" alt="" />
//           </div>

//           {/* Main Card */}
//           <div className="bg-gradient-to-br from-[#2a2a4a]/60 to-[#1a1a3a]/40 backdrop-blur-lg rounded-3xl p-6 border-2 border-[#4a4a7a]/40 shadow-2xl mb-6">
//             <div className="btn-gradient bg-gradient-to-r from-[#3a3a5a]/50 to-[#2a2a4a]/50 rounded-xl p-3 mb-3 border border-[#5a5a8a]/30 flex items-center justify-center gap-2">
//               <img src={FanektIcon} className="w-[20px]" alt="" />
//               <span className="text-white font-[400]">
//                 Official FANEKT Tag Verified
//               </span>
//             </div>

//             <div className="btn-gradient rounded-xl px-3 py-4 mb-4 border border-[#5a5a8a]/30">
//               <p className="text-white/80 text-center text-[17px]">Tag ID</p>
//               <h2 className="text-white text-[28px] font-medium text-center tracking-wider">
//                 {uid ? uid.toUpperCase() : "N/A"}
//               </h2>
//               <p className="text-white/60 text-center">
//                 Status: {locationSent ? "Location Verified" : "Not Yet Activated"}
//               </p>
//             </div>

//             <div className="mb-6">
//               <h3 className="text-white text-[18px] font-medium mb-2">
//                 You've just scanned an official <br /> FANEKT NFC patch.
//               </h3>
//               <p className="text-gray-400 text-sm">
//                 Register your item to activate your connection and unlock
//                 exclusive fan experiences.
//               </p>
//             </div>

//             <button
//               onClick={handleActivateClick}
//               className="w-full bg-[linear-gradient(160deg,#155BF2_10%,#9e519b_50%,#FE4B5E_90%)] 
//            text-white font-semibold text-lg py-4 rounded-xl shadow-lg 
//            transition-all duration-300 transform hover:scale-[1.02] 
//            relative overflow-hidden group disabled:opacity-50"
//               disabled={isLoading}
//             >
//               <span className=" z-10">
//                 {isLoading ? "Checking..." : locationSent ? "Activate My Tag" : "Grant Location First"}
//                 <img src={StarIcon} className="w-[40px] absolute bottom-0 right-3" alt="" />
//               </span>
//               <div
//                 className="absolute inset-0 bg-white/20 transform translate-x-full 
//                   group-hover:translate-x-0 transition-transform duration-300"
//               ></div>
//             </button>
//           </div>

//           {/* Bottom Features */}
//           <div className="grid grid-cols-3 gap-2">
//             <div className="btn-gradient-blue rounded-xl py-3 border border-[#3a3a5a]/30 flex items-center justify-center gap-1">
//               <img src={Secure} className="w-[18px]" alt="" />
//               <span className="text-white/80 text-[12px] font-[400]">Secure</span>
//             </div>
//             <div className="btn-gradient-blue rounded-xl py-3 border border-[#3a3a5a]/30 flex items-center justify-center gap-1">
//               <img src={XIcon} className="w-[18px]" alt="" />
//               <span className="text-white/80 text-[12px] font-[400]">
//                 X-KRYPTED®
//               </span>
//             </div>
//             <div className="btn-gradient-blue rounded-xl py-3 border border-[#3a3a5a]/30 flex items-center justify-center gap-1">
//               <img src={Official} className="w-[18px]" alt="" />
//               <span className="text-white/80 text-[12px] font-[400]">Official</span>
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     </>
//   );
// }
















// import React, { useEffect, useState } from "react";
// import { Shield, Radio, Sparkles, MapPin } from "lucide-react";
// import { AnimatePresence, motion } from "framer-motion";
// import SplashView from "./SplashView";
// import Logo from "./assets/logo.png";
// import StarIcon from "./assets/star-icon.png";
// import FanektIcon from "./assets/fanekt-icon.png";
// import Secure from "./assets/secure.png";
// import XIcon from "./assets/x.png";
// import Official from "./assets/official.png";
// import toast, { Toaster } from "react-hot-toast";
// import { useNavigate, useParams } from "react-router-dom";
// import { fanProfile } from "../../API/apiService";

// export default function Splash() {
//   const { uid, tagId } = useParams();
//   const [showSplash, setShowSplash] = useState(true);
//   const [isLoading, setIsLoading] = useState(false);
//   const [locationSent, setLocationSent] = useState(false);
//   const [showLocationPopup, setShowLocationPopup] = useState(false);
//   const [locationError, setLocationError] = useState("");
//   const [isRetrying, setIsRetrying] = useState(false);
//   const navigate = useNavigate();

//   const handleActivateClick = () => {
//     if (!locationSent) {
//       setShowLocationPopup(true);
//       return;
//     }

//     if (uid && tagId) {
//       navigate(`/app/register/${uid}/${tagId}`);
//     } else {
//       console.error("Missing UID or Tag ID");
//     }
//   };

//   // Auto-hide splash after 5s
//   useEffect(() => {
//     const timer = setTimeout(() => setShowSplash(false), 5000);
//     return () => clearTimeout(timer);
//   }, []);

//   // Automatically run sendLocation API after splash finishes
//   useEffect(() => {
//     // Only run after splash is done
//     if (showSplash) return;

//     const sendLocation = async () => {
//       if (!uid) {
//         toast.error("Missing UID.");
//         return;
//       }

//       try {
//         setIsLoading(true);
//         setLocationError("");

//         const position = await new Promise((resolve, reject) => {
//           navigator.geolocation.getCurrentPosition(resolve, reject, {
//             enableHighAccuracy: true,
//             timeout: 10000,
//             maximumAge: 0,
//           });
//         });

//         const { latitude, longitude } = position.coords;
//         const location = `${latitude},${longitude}`;
//         const payload = { uid, location };

//         console.log("Sending payload:", payload);

//         const res = await fanProfile(payload);

//         if (res?.data?.status) {
//           const data = res.data.data;
//           setLocationSent(true);
//           setShowLocationPopup(false);

//           if (data.tag?.status === "activated") {
//             navigate(`/app/alert/${uid}/${tagId}`, {
//               state: data,
//             });
//           } else {
//             console.log("Tag still programmed, staying on page.");
//           }
//         } else {
//           toast.error(res?.data?.message || "Failed to fetch fan profile.");
//           setLocationError("Failed to fetch fan profile. Please try again.");
//           setShowLocationPopup(true);
//         }
//       } catch (err) {
//         console.error("Error getting or sending location:", err);

//         // Handle geolocation errors and show persistent popup
//         if (err.code === 1) {
//           setLocationError("Location permission denied. Please enable location access to continue.");
//         } else if (err.code === 2) {
//           setLocationError("Position unavailable. Please check your device settings and try again.");
//         } else if (err.code === 3) {
//           setLocationError("Location request timed out. Please try again.");
//         } else {
//           setLocationError("Unable to access location. Please enable location services.");
//         }

//         // Always show popup on error
//         setShowLocationPopup(true);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     sendLocation();
//   }, [uid, tagId, navigate, showSplash]);

//   const handleRetryLocation = async () => {
//     if (!uid) {
//       toast.error("Missing UID.");
//       return;
//     }

//     try {
//       setIsRetrying(true);
//       setLocationError("");

//       const position = await new Promise((resolve, reject) => {
//         navigator.geolocation.getCurrentPosition(resolve, reject, {
//           enableHighAccuracy: true,
//           timeout: 10000,
//           maximumAge: 0,
//         });
//       });

//       const { latitude, longitude } = position.coords;
//       const location = `${latitude},${longitude}`;
//       const payload = { uid, location };

//       console.log("Sending payload:", payload);

//       const res = await fanProfile(payload);

//       if (res?.data?.status) {
//         const data = res.data.data;
//         setLocationSent(true);
//         setShowLocationPopup(false);
//         toast.success("Location access granted!");

//         if (data.tag?.status === "activated") {
//           navigate(`/app/alert/${uid}/${tagId}`, {
//             state: data,
//           });
//         }
//       } else {
//         toast.error(res?.data?.message || "Failed to fetch fan profile.");
//         setLocationError("Failed to fetch fan profile. Please try again.");
//       }
//     } catch (err) {
//       console.error("Error getting or sending location:", err);

//       if (err.code === 1) {
//         setLocationError("Location permission denied. Please enable location access in your browser settings.");
//       } else if (err.code === 2) {
//         setLocationError("Position unavailable. Please check your device settings.");
//       } else if (err.code === 3) {
//         setLocationError("Location request timed out. Please try again.");
//       } else {
//         setLocationError("Unable to access location. Please enable location services.");
//       }
//     } finally {
//       setIsRetrying(false);
//     }
//   };

//   return (
//     <>
//       <Toaster position="top-center" />

//       {/* Loading Blur Overlay - Shows while API is running */}
//       {isLoading && !showLocationPopup && (
//         <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 backdrop-blur-md">
//           <div className="bg-gradient-to-br from-[#2a2a4a] to-[#1a1a3a] rounded-2xl p-8 border-2 border-[#4a4a7a]/40 shadow-2xl">
//             <div className="flex flex-col items-center text-center">
//               <div className="w-16 h-16 border-4 border-[#155BF2] border-t-transparent rounded-full animate-spin mb-4"></div>
//               <p className="text-white text-lg font-medium">Verifying Location...</p>
//               <p className="text-gray-400 text-sm mt-2">Please wait</p>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Persistent Location Permission Popup */}
//       {showLocationPopup && (
//         <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
//           <div className="bg-gradient-to-br from-[#2a2a4a] to-[#1a1a3a] rounded-2xl p-6 max-w-md w-full border-2 border-[#4a4a7a]/40 shadow-2xl animate-[fadeIn_0.3s_ease-out]">
//             <div className="flex flex-col items-center text-center">
//               {/* Icon */}
//               <div className="w-20 h-20 bg-gradient-to-br from-[#155BF2] to-[#9e519b] rounded-full flex items-center justify-center mb-4 animate-[pulse_2s_ease-in-out_infinite]">
//                 <MapPin className="w-10 h-10 text-white" />
//               </div>

//               {/* Title */}
//               <h3 className="text-white text-2xl font-semibold mb-3">
//                 Location Access Required
//               </h3>

//               {/* Message */}
//               <p className="text-gray-300 text-sm mb-2">
//                 {locationError || "We need your location to verify and activate your FANEKT tag."}
//               </p>

//               <p className="text-gray-400 text-xs mb-6">
//                 Your location data is secure and only used for tag activation.
//               </p>

//               {/* Retry Button */}
//               <button
//                 onClick={handleRetryLocation}
//                 disabled={isRetrying}
//                 className="w-full bg-[linear-gradient(160deg,#155BF2_10%,#9e519b_50%,#FE4B5E_90%)] 
//                   text-white font-semibold text-lg py-4 rounded-xl shadow-lg 
//                   transition-all duration-300 transform hover:scale-[1.02] 
//                   disabled:opacity-50 disabled:cursor-not-allowed mb-3"
//               >
//                 {isRetrying ? "Requesting Access..." : "Grant Location Access"}
//               </button>

//               {/* Help Text */}
//               <p className="text-gray-400 text-xs">
//                 If blocked, please enable location in your browser settings
//               </p>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* SplashView (shows only for 5 seconds) */}
//       <AnimatePresence>
//         {showSplash && (
//           <motion.div
//             key="splash"
//             initial={{ opacity: 1 }}
//             exit={{ opacity: 0, scale: 0.98 }}
//             transition={{ duration: 0.8, ease: "easeOut" }}
//             className="fixed inset-0 z-50 bg-[#1e1e1e]"
//           >
//             <SplashView />
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Main Screen */}
//       <motion.div
//         key="main"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: showSplash ? 0 : 1 }}
//         transition={{ duration: 1, ease: "easeOut" }}
//         className={`min-h-screen bg-[#1e1e1e] items-center justify-center sm:p-4 p-0 ${
//           showSplash ? "hidden" : "flex"
//         }`}
//       >
//         <div className="w-full max-w-[400px] sm:border-2 border-white/90 p-3 sm:rounded-3xl bg-[linear-gradient(to_bottom_left,_#2d3569_20%,_#3f283d_50%,_#2d3569_100%)] ">
//           {/* Logo */}
//           <div className="w-full flex justify-center">
//             <img src={Logo} className="w-[170px] mb-3 mt-5" alt="" />
//           </div>

//           {/* Main Card */}
//           <div className="bg-gradient-to-br from-[#2a2a4a]/60 to-[#1a1a3a]/40 backdrop-blur-lg rounded-3xl p-6 border-2 border-[#4a4a7a]/40 shadow-2xl mb-6">
//             <div className="btn-gradient bg-gradient-to-r from-[#3a3a5a]/50 to-[#2a2a4a]/50 rounded-xl p-3 mb-3 border border-[#5a5a8a]/30 flex items-center justify-center gap-2">
//               <img src={FanektIcon} className="w-[20px]" alt="" />
//               <span className="text-white font-[400]">
//                 Official FANEKT Tag Verified
//               </span>
//             </div>

//             <div className="btn-gradient rounded-xl px-3 py-4 mb-4 border border-[#5a5a8a]/30">
//               <p className="text-white/80 text-center text-[17px]">Tag ID</p>
//               <h2 className="text-white text-[28px] font-medium text-center tracking-wider">
//                 {uid ? uid.toUpperCase() : "N/A"}
//               </h2>
//               <p className="text-white/60 text-center">
//                 Status: {locationSent ? "Location Verified" : "Not Yet Activated"}
//               </p>
//             </div>

//             <div className="mb-6">
//               <h3 className="text-white text-[18px] font-medium mb-2">
//                 You've just scanned an official <br /> FANEKT NFC patch.
//               </h3>
//               <p className="text-gray-400 text-sm">
//                 Register your item to activate your connection and unlock
//                 exclusive fan experiences.
//               </p>
//             </div>

//             <button
//               onClick={handleActivateClick}
//               className="w-full bg-[linear-gradient(160deg,#155BF2_10%,#9e519b_50%,#FE4B5E_90%)] 
//            text-white font-semibold text-lg py-4 rounded-xl shadow-lg 
//            transition-all duration-300 transform hover:scale-[1.02] 
//            relative overflow-hidden group disabled:opacity-50"
//               disabled={isLoading}
//             >
//               <span className=" z-10">
//                 {isLoading ? "Checking..." : locationSent ? "Activate My Tag" : "Grant Location First"}
//                 <img src={StarIcon} className="w-[40px] absolute bottom-0 right-3" alt="" />
//               </span>
//               <div
//                 className="absolute inset-0 bg-white/20 transform translate-x-full 
//                   group-hover:translate-x-0 transition-transform duration-300"
//               ></div>
//             </button>
//           </div>

//           {/* Bottom Features */}
//           <div className="grid grid-cols-3 gap-2">
//             <div className="btn-gradient-blue rounded-xl py-3 border border-[#3a3a5a]/30 flex items-center justify-center gap-1">
//               <img src={Secure} className="w-[18px]" alt="" />
//               <span className="text-white/80 text-[12px] font-[400]">Secure</span>
//             </div>
//             <div className="btn-gradient-blue rounded-xl py-3 border border-[#3a3a5a]/30 flex items-center justify-center gap-1">
//               <img src={XIcon} className="w-[18px]" alt="" />
//               <span className="text-white/80 text-[12px] font-[400]">
//                 X-KRYPTED®
//               </span>
//             </div>
//             <div className="btn-gradient-blue rounded-xl py-3 border border-[#3a3a5a]/30 flex items-center justify-center gap-1">
//               <img src={Official} className="w-[18px]" alt="" />
//               <span className="text-white/80 text-[12px] font-[400]">Official</span>
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     </>
//   );
// }




















import React, { useEffect, useState } from "react";
import { Shield, Radio, Sparkles, MapPin } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import SplashView from "./SplashView";
import Logo from "./assets/logo.png";
import StarIcon from "./assets/star-icon.png";
import FanektIcon from "./assets/fanekt-icon.png";
import Secure from "./assets/secure.png";
import XIcon from "./assets/x.png";
import Official from "./assets/official.png";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { fanProfile } from "../../API/apiService";

export default function Splash() {
  const { uid, tagId } = useParams();
  const [showSplash, setShowSplash] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [locationSent, setLocationSent] = useState(false);
  const [showLocationPopup, setShowLocationPopup] = useState(false);
  const [locationError, setLocationError] = useState("");
  const [isRetrying, setIsRetrying] = useState(false);
  const navigate = useNavigate();

  const handleActivateClick = () => {
    if (!locationSent) {
      setShowLocationPopup(true);
      return;
    }

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

  // Automatically run sendLocation API after splash finishes
  useEffect(() => {
    // Only run after splash is done
    if (showSplash) return;

    const sendLocation = async () => {
      if (!uid) {
        toast.error("Missing UID.");
        return;
      }

      try {
        setIsLoading(true);
        setLocationError("");

        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
          });
        });

        const { latitude, longitude } = position.coords;
        const location = `${latitude},${longitude}`;
        const payload = { uid, location };

        console.log("Sending payload:", payload);

        const res = await fanProfile(payload);

        if (res?.data?.status) {
          const data = res.data.data;
          setLocationSent(true);
          setShowLocationPopup(false);

          if (data.tag?.status === "activated") {
            navigate(`/app/alert/${uid}/${tagId}`, {
              state: data,
            });
          } else {
            console.log("Tag still programmed, staying on page.");
          }
        } else {
          toast.error(res?.data?.message || "Failed to fetch fan profile.");
          setLocationError("Failed to fetch fan profile. Please try again.");
          setShowLocationPopup(true);
        }
      } catch (err) {
        console.error("Error getting or sending location:", err);

        // Handle geolocation errors and show persistent popup
        if (err.code === 1) {
          setLocationError("Location permission denied. Please enable location access to continue.");
        } else if (err.code === 2) {
          setLocationError("Position unavailable. Please check your device settings and try again.");
        } else if (err.code === 3) {
          setLocationError("Location request timed out. Please try again.");
        } else {
          setLocationError("Unable to access location. Please enable location services.");
        }

        // Always show popup on error
        setShowLocationPopup(true);
      } finally {
        setIsLoading(false);
      }
    };

    sendLocation();
  }, [uid, tagId, navigate, showSplash]);

  const handleRetryLocation = async () => {
    if (!uid) {
      toast.error("Missing UID.");
      return;
    }

    try {
      setIsRetrying(true);
      setLocationError("");
      // Don't close popup yet, keep it open during retry

      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        });
      });

      const { latitude, longitude } = position.coords;
      const location = `${latitude},${longitude}`;
      const payload = { uid, location };

      console.log("Sending payload:", payload);

      const res = await fanProfile(payload);

      if (res?.data?.status) {
        const data = res.data.data;
        setLocationSent(true);
        setShowLocationPopup(false); // Only close on success
        toast.success("Location access granted!");

        if (data.tag?.status === "activated") {
          navigate(`/app/alert/${uid}/${tagId}`, {
            state: data,
          });
        }
      } else {
        // Keep popup open on API failure
        const errorMsg = res?.data?.message || "Failed to fetch fan profile.";
        toast.error(errorMsg);
        setLocationError(errorMsg + " Please try again.");
      }
    } catch (err) {
      console.error("Error getting or sending location:", err);

      // Keep popup open on all errors
      if (err.code === 1) {
        setLocationError("Location permission denied. Please enable location access in your browser settings and refresh the page.");
        // Add refresh button for permission denied
        toast.error("Please enable location and refresh the page", {
          duration: 5000,
        });
      } else if (err.code === 2) {
        setLocationError("Position unavailable. Please check your device settings.");
      } else if (err.code === 3) {
        setLocationError("Location request timed out. Please try again.");
      } else {
        setLocationError("Unable to access location. Please enable location services.");
      }
    } finally {
      setIsRetrying(false);
      // Popup stays open - only closes on successful location + API call
    }
  };

  // Function to refresh the page
  const handleRefreshPage = () => {
    window.location.reload();
  };

  return (
    <>
      <Toaster position="top-center" />

      {/* Loading Blur Overlay - Shows while API is running */}
      {isLoading && !showLocationPopup && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 backdrop-blur-md">
          <div className="bg-gradient-to-br from-[#2a2a4a] to-[#1a1a3a] rounded-2xl p-8 border-2 border-[#4a4a7a]/40 shadow-2xl">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 border-4 border-[#155BF2] border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-white text-lg font-medium">Verifying Location...</p>
              <p className="text-gray-400 text-sm mt-2">Please wait</p>
            </div>
          </div>
        </div>
      )}

      {/* Persistent Location Permission Popup */}
      {showLocationPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-gradient-to-br from-[#2a2a4a] to-[#1a1a3a] rounded-2xl p-6 max-w-md w-full border-2 border-[#4a4a7a]/40 shadow-2xl animate-[fadeIn_0.3s_ease-out]">
            <div className="flex flex-col items-center text-center">
              {/* Icon */}
              <div className="w-20 h-20 bg-gradient-to-br from-[#155BF2] to-[#9e519b] rounded-full flex items-center justify-center mb-4 animate-[pulse_2s_ease-in-out_infinite]">
                <MapPin className="w-10 h-10 text-white" />
              </div>

              {/* Title */}
              <h3 className="text-white text-2xl font-semibold mb-3">
                Location Access Required
              </h3>

              {/* Message */}
              <p className="text-gray-300 text-sm mb-2">
                {locationError || "We need your location to verify and activate your FANEKT tag."}
              </p>

              <p className="text-gray-400 text-xs mb-6">
                Your location data is secure and only used for tag activation.
              </p>

              <p className="text-white text-sm font-medium mb-6">
                After Grant Location Please Refresh the Page.
              </p>

              {/* Retry Button */}
              <button
                onClick={handleRetryLocation}
                disabled={isRetrying}
                className="w-full bg-[linear-gradient(160deg,#155BF2_10%,#9e519b_50%,#FE4B5E_90%)] 
                  text-white font-semibold text-lg py-4 rounded-xl shadow-lg hidden
                  transition-all duration-300 transform hover:scale-[1.02] 
                  disabled:opacity-50 disabled:cursor-not-allowed mb-3"
              >
                {isRetrying ? "Requesting Access..." : "Grant Location Access"}
              </button>

              {/* Refresh Button - Show when there's a permission error */}
              {/* {locationError.includes("permission denied") && ( */}
                <button
                  onClick={handleRefreshPage}
                  className="w-full bg-gradient-to-r from-[#3a3a5a] to-[#2a2a4a] 
                    text-white font-medium text-base py-3 rounded-xl shadow-md 
                    transition-all duration-300 transform hover:scale-[1.02] 
                    border border-[#5a5a8a]/50 mb-3"
                >
                  Refresh Page
                </button>
              {/* )} */}

              {/* Help Text */}
              <p className="text-gray-400 text-xs">
                If blocked, please enable location in your browser settings
              </p>
            </div>
          </div>
        </div>
      )}

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
                Status: {locationSent ? "Location Verified" : "Not Yet Activated"}
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
           relative overflow-hidden group disabled:opacity-50"
              disabled={isLoading}
            >
              <span className=" z-10">
                {isLoading ? "Checking..." : locationSent ? "Activate My Tag" : "Grant Location First"}
                <img src={StarIcon} className="w-[40px] absolute bottom-0 right-3" alt="" />
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
              <span className="text-white/80 text-[12px] font-[400]">Official</span>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}