import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "./Assets/logo.png";
import { motion } from "framer-motion";
import sideImage from "./Assets/authimg.png";
import toast, { Toaster } from "react-hot-toast";
import { sendVerificationEmail } from "../../API/apiService";

function SendVerificationEmail() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendVerification = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Email is required");
      return;
    }

    if (!email.includes("@")) {
      toast.error("Please enter a valid email");
      return;
    }

    setLoading(true);

    try {
      const response = await sendVerificationEmail({ email });
      const data = response?.data;

      if (data?.status) {
        toast.success(data.message || "Verification email sent! Please check your inbox.");

        setTimeout(() => {
          navigate('/verify-code', { state: { email } });
        }, 2000);
      } else {
        toast.error(data?.message || "Failed to send verification email.");
      }

    } catch (error) {
      console.error("Error sending verification email:", error);

      let errorMessage = "Failed to send verification email. Please try again.";

      if (error.response) {
        if (error.response.data?.message) {
          errorMessage = error.response.data.message;
        } else if (error.response.status >= 500) {
          errorMessage = "Server error. Please try again later.";
        }
      } else if (error.request) {
        errorMessage = "Network error. Please check your connection.";
      }

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex justify-center items-center
                 bg-[linear-gradient(to_bottom_left,_#4a1755_30%,_#352862_50%,_#8a58a2_100%)] lg:h-[100vh]"
    >
      <Toaster />
      {/* Left Side Image */}
      <div className="w-1/2 h-screen hidden lg:block relative overflow-hidden">
        <motion.img
          src={sideImage}
          alt="Background"
          className="w-full h-full p-3 object-cover rounded-[40px]"
        />
      </div>

      {/* Right Side Form */}
      <div className="w-full lg:w-[50%] flex flex-col items-center justify-center px-3 md:px-6 h-full">
        <motion.img
          animate={{ y: [0, -20, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          src={logo}
          alt="Logo"
          className="h-[120px] w-[120px] block lg:hidden"
        />

        <div className="text-center">
          <h1 className="md:text-[36px] text-white text-[29px] font-[700]">
            Verify Your Email
          </h1>
          <p className="text-white/80 mt-2 text-sm max-w-md mx-auto">
            Enter your email address to receive a verification code
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSendVerification}
          className="w-full mt-3 px-3 md:px-16"
          autoComplete="off"
        >
          <label>
            <p className="text-left text-[22px] pt-2 text-white font-[400]">
              Email Address
            </p>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-white placeholder:text-[16px] placeholder:font-[400] placeholder:text-white border-2 border-t-0 border-l-0 border-r-0 border-[#e6e7e9] py-3 pr-1 w-full outline-0 bg-transparent"
            />
          </label>

          <div className="flex items-center mt-8 justify-center">
            <div className="w-full flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="w-full max-w-[400px] py-3 text-white text-lg text-center font-medium rounded-lg cursor-pointer
                           bg-[linear-gradient(to_bottom_right,_#3b82f6_0%,_#8b5cf6_30%,_#ef4444_100%)]
                           hover:opacity-90 transition-all duration-300 shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? "Sending..." : "Send Verification Email"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SendVerificationEmail;
