import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Arrow from "./assets/arrow.png";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { sendVerificationEmail, verifyEmail } from "../../API/apiService";

function EmailVerificationPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { uid, tagId } = useParams();

  // Get email from navigation state
  const email = location.state?.email || "";

  const [verificationCode, setVerificationCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);

  // Redirect if no email provided
  useEffect(() => {
    if (!email) {
      toast.error("No email provided. Please try again.");
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    }
  }, [email, navigate]);

  // Handle verification code submit
  const handleCodeSubmit = async (e) => {
    e.preventDefault();

    if (verificationCode.length !== 6) {
      toast.error("Please enter a valid 6-digit code.");
      return;
    }

    setIsVerifying(true);

    try {
      const payload = { email, code: verificationCode };
      const response = await verifyEmail(payload); 

      if (response) {
        toast.success("Email verified successfully!");
        setTimeout(() => {
          navigate(`/app/congratulations/${uid}/${tagId}`);
        }, 1500);
      } else {
        toast.error(response?.data?.message || "Invalid verification code.");
      }
    } catch (error) {
      console.error("Verification Error:", error);
      toast.error(
        error?.response?.data?.message ||
          "Verification failed. Please try again."
      );
    } finally {
      setIsVerifying(false);
    }
  };

  // Handle resend verification code
  const handleResendCode = async () => {
    setIsResending(true);
    try {
      const payload = { email };
      const response = await sendVerificationEmail(payload);

      if (response) {
        toast.success("Verification code resent successfully!");
      } else {
        toast.error(response?.data?.message || "Failed to resend code.");
      }
    } catch (error) {
      console.error("Resend Error:", error);
      toast.error(
        error?.response?.data?.message || "Failed to resend code. Try again."
      );
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div>
      <Toaster />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-[100vh] bg-[#1e1e1e] items-center justify-center sm:p-4 p-0 flex"
      >
        <motion.div
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-[400px] sm:border-2 border-white/90 p-6 sm:rounded-3xl bg-[linear-gradient(to_bottom_left,_#2d3569_20%,_#3f283d_50%,_#2d3569_100%)]"
        >
          {/* Back button */}
          <button onClick={() => navigate(-1)} className="mb-4">
            <img
              src={Arrow}
              className="w-[40px] hover:opacity-70 transition-opacity"
              alt="back"
            />
          </button>

          {/* Header section */}
          <div className="mb-6">
            <p className="text-white font-[600] text-[28px] mb-2">
              Verify Your Email
            </p>
            <p className="text-white/70 font-[400] text-[16px] mb-2">
              We've sent a verification code to:
            </p>
            <p className="text-[#F94C65] font-[500] text-[17px] break-all">
              {email || "your email"}
            </p>
          </div>

          {/* Verification form */}
          <div className="bg-gradient-to-br from-[#2a2a4a]/60 to-[#1a1a3a]/40 backdrop-blur-lg rounded-3xl py-6 px-4 border-2 border-[#4a4a7a]/70 shadow-2xl">
            <form onSubmit={handleCodeSubmit}>
              <div className="mb-6">
                <label className="text-white text-[18px] font-[500] mb-3 block text-center">
                  Enter Verification Code
                </label>
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    if (value.length <= 6) setVerificationCode(value);
                  }}
                  placeholder="000000"
                  maxLength="6"
                  required
                  className="w-full bg-[#1a1a3a]/80 border-2 border-[#4a4a7a]/50 rounded-xl px-4 py-4 text-white text-center text-3xl tracking-[0.5em] font-[600] placeholder-white/30 focus:outline-none focus:border-[#F94C65] focus:ring-2 focus:ring-[#F94C65]/30 transition-all"
                />
                <p className="text-white/40 text-[13px] text-center mt-2">
                  Enter the 6-digit code sent to your email
                </p>
              </div>

              {/* Verify button */}
              <button
                type="submit"
                disabled={isVerifying || verificationCode.length !== 6}
                className="w-full bg-gradient-to-r from-[#F94C65] to-[#d63850] hover:from-[#d63850] hover:to-[#F94C65] text-white py-4 rounded-xl text-[17px] font-[600] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl mb-4"
              >
                {isVerifying ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Verifying...
                  </span>
                ) : (
                  "Verify Email"
                )}
              </button>

              {/* Resend section */}
              <div className="text-center">
                <p className="text-white/60 text-[14px] mb-2">
                  Didn’t receive the code?
                </p>
                <button
                  type="button"
                  onClick={handleResendCode}
                  disabled={isVerifying || isResending}
                  className="text-[#F94C65] hover:text-[#d63850] text-[15px] font-[500] underline transition-colors disabled:opacity-50"
                >
                  {isResending ? "Resending..." : "Resend Code"}
                </button>
              </div>
            </form>
          </div>

          {/* Footer note */}
          <div className="mt-6 text-center">
            <p className="text-white/40 text-[13px]">
              By verifying, you confirm ownership of this FANEKT tag / item
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default EmailVerificationPage;
