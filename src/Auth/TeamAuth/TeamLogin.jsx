import React, { useState } from "react";
import logo from "./Assets/logo.png";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import sideImage from "./Assets/authimg.png";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { login } from "../../API/apiService";

function TeamLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPasswords, setShowPasswords] = useState(false);
  const navigate = useNavigate();

  const handlerPassword = () => {
    setShowPasswords(!showPasswords);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Email is required");
      return;
    }

    if (!password.trim()) {
      toast.error("Password is required");
      return;
    }

    if (!email.includes("@")) {
      toast.error("Please enter a valid email");
      return;
    }

    setLoading(true);

    try {
      const credentials = { email, password };
      const response = await login(credentials);
      const data = response?.data;

      if (data?.status && data?.data?.token) {
        localStorage.setItem("fanektToken", data.data.token);
        localStorage.setItem("fanektUser", JSON.stringify(data.data.user));

        toast.success(data.message || "Login successful!");

        setTimeout(() => {
          navigate('/team/dashboard');
        }, 1000);
      } else {
        toast.error(data?.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Error Logging in:", error);

      let errorMessage = "Login failed. Please try again.";

      if (error.response) {
        if (error.response.data?.message) {
          errorMessage = error.response.data.message;
        } else if (error.response.status === 401) {
          errorMessage = "Invalid email or password";
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
            Welcome back!
          </h1>
        </div>

        {/* Form */}
        <form
          onSubmit={handleLogin}
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

          <div className="relative mt-3">
            <p className="text-white text-[22px] font-[400]">Password</p>
            <input
              type={showPasswords ? "text" : "password"}
              placeholder="................."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              autoComplete="off"
              className="text-white placeholder:text-[36px] placeholder:text-white border-2 border-t-0 border-l-0 border-r-0 py-3 pr-12 w-full border-[#e6e7e9] outline-0 bg-transparent"
            />
            {showPasswords ? (
              <IoEyeOutline
                onClick={handlerPassword}
                className="text-[#aeafb3] absolute right-1 top-11 text-[19px] cursor-pointer"
              />
            ) : (
              <IoEyeOffOutline
                onClick={handlerPassword}
                className="text-[#aeafb3] absolute right-1 top-11 text-[19px] cursor-pointer"
              />
            )}
          </div>

          <div className="flex items-center mt-5 justify-center">
            <div className="w-full flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="w-full max-w-[400px] py-3 text-white text-lg text-center font-medium rounded-lg cursor-pointer
                           bg-[linear-gradient(to_bottom_right,_#3b82f6_0%,_#8b5cf6_30%,_#ef4444_100%)]
                           hover:opacity-90 transition-all duration-300 shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TeamLogin;
