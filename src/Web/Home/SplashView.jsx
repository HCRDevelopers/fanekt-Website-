import React from "react";
import { motion } from "framer-motion";
import SplashLogo from "./assets/splash-logo.png";

export default function SplashView() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2 }}
      className="min-h-screen bg-[#1e1e1e] flex items-center justify-center sm:p-4 p-0"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative w-full max-w-[400px] sm:h-[94vh] h-[100vh] flex justify-center items-center sm:border-2 border-white/10 p-3 sm:rounded-3xl overflow-hidden bg-gradient-to-b from-[#7861F8] via-[#B657B1] to-[#F94C65] shadow-[0_0_40px_#7861F850]"
      >
        {/* Animated Glow Behind Logo */}
        <motion.div
          className="absolute w-[300px] h-[300px] rounded-full bg-white/20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 3,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />

        {/* Logo with Floating & Pulse Animation */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{
            y: [0, -15, 0],
            opacity: 1,
            scale: [1, 1.03, 1],
          }}
          transition={{
            duration: 3,
            ease: "easeInOut",
            repeat: Infinity,
          }}
          className="relative"
        >
          <motion.img
            src={SplashLogo}
            alt="Splash Logo"
            className="w-[240px] relative z-10"
          />

          {/* Optional Shine Sweep over Logo */}
          <motion.div
            className="absolute top-0 left-[-150%] w-[150%] h-full bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-[25deg] z-20"
            animate={{
              left: ["-150%", "150%"],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              repeatDelay: 2,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
