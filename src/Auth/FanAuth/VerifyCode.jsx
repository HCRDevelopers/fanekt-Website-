import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "./Assets/logo.png";
import { motion } from "framer-motion";
import sideImage from "./Assets/authimg.png";
import toast, { Toaster } from "react-hot-toast";
import { verifyEmail } from "../../API/apiService";

function VerifyCode() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const inputRefs = useRef([]);

  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
    } else {
      navigate('/verify-email');
    }
  }, [location.state, navigate]);

  // Handle input change for individual boxes
  const handleInputChange = (index, value) => {
    if (value.length > 1) return; // Only allow single digit

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle key down for backspace navigation
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle paste event
  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData('text');
    const pasteArray = paste.replace(/\D/g, '').slice(0, 6).split('');

    const newCode = [...code];
    pasteArray.forEach((digit, index) => {
      if (index < 6) {
        newCode[index] = digit;
      }
    });
    setCode(newCode);

    // Focus the next empty input or the last input
    const nextEmptyIndex = newCode.findIndex(digit => !digit);
    if (nextEmptyIndex !== -1 && nextEmptyIndex < 6) {
      inputRefs.current[nextEmptyIndex]?.focus();
    } else {
      inputRefs.current[5]?.focus();
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();

    // Check if all 6 digits are filled
    const codeString = code.join('');
    if (codeString.length !== 6 || code.includes('')) {
      toast.error("Please enter all 6 digits of the verification code");
      return;
    }

    setLoading(true);

    try {
      const response = await verifyEmail({ email, code: codeString });
      const data = response?.data;

      if (data?.status) {
        toast.success(data.message || "Email verified successfully!");

        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        toast.error(data?.message || "Invalid verification code");
      }

    } catch (error) {
      console.error("Error verifying code:", error);

      let errorMessage = "Invalid verification code. Please try again.";

      if (error.response) {
        if (error.response.data?.message) {
          errorMessage = error.response.data.message;
        } else if (error.response.status === 400) {
          errorMessage = "Invalid or expired verification code";
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

  const handleResendCode = async () => {
    if (!email) return;

    try {
      // TODO: Replace with actual API call
      // const response = await resendVerificationCode({ email });

      toast.success("Verification code resent! Please check your email.");
    } catch (error) {
      console.error("Error resending code:", error);
      toast.error("Failed to resend verification code. Please try again.");
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
            Enter Verification Code
          </h1>
          <p className="text-white/80 mt-2 text-sm max-w-md mx-auto">
            We sent a 6-digit verification code to {email}
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleVerifyCode}
          className="w-full mt-3 px-3 md:px-16"
          autoComplete="off"
        >
          <div>
            <p className="text-left text-[22px] pt-2 text-white font-[400]">
              Verification Code
            </p>
            <div className="flex justify-center gap-4 mt-4">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleInputChange(index, e.target.value.replace(/\D/g, ''))}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  className="w-12 h-12 text-center text-2xl font-semibold text-white bg-transparent border-2 border-[#e6e7e9] rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                  autoComplete="off"
                />
              ))}
            </div>
          </div>

          <div className="flex items-center mt-8 justify-center">
            <div className="w-full flex justify-center">
              <button
                type="submit"
                disabled={loading || code.some(digit => digit === '')}
                className="w-full max-w-[400px] py-3 text-white text-lg text-center font-medium rounded-lg cursor-pointer
                           bg-[linear-gradient(to_bottom_right,_#3b82f6_0%,_#8b5cf6_30%,_#ef4444_100%)]
                           hover:opacity-90 transition-all duration-300 shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? "Verifying..." : "Verify Code"}
              </button>
            </div>
          </div>

          <div className="text-center mt-4">
            <button
              type="button"
              onClick={handleResendCode}
              className="text-white/80 hover:text-white text-sm underline"
            >
              Didn't receive the code? Resend
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default VerifyCode;
