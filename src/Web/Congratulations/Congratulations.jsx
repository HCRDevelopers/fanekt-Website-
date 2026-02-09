import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import FanektIcon from "./assets/fanekt-icon.png";
import { useParams, useNavigate } from "react-router-dom";
import { fanProfile } from "../../API/apiService";
import toast from "react-hot-toast";

function Congratulations() {
  const { uid, tagId } = useParams();
  const navigate = useNavigate();

  const [fanData, setFanData] = useState(null);
  const [tagData, setTagData] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // start true to show skeletons

  useEffect(() => {
    const fetchFanProfile = async () => {
      try {
        setIsLoading(true);
        const payload = { uid };
        const res = await fanProfile(payload);

        if (res?.data?.data) {
          setFanData(res.data.data.fan);
          setTagData(res.data.data.tag);
          toast.success("Fan profile loaded!");
        } else {
          toast.error(res?.message || "Failed to fetch fan profile.");
        }
      } catch (err) {
        console.error("Error fetching fan profile:", err);
        if (err.response?.data?.errors) {
          Object.values(err.response.data.errors).forEach((msgArr) => {
            toast.error(msgArr[0]);
          });
        } else {
          toast.error(err.response?.data?.message || "Something went wrong.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchFanProfile();
  }, [uid]);

  // 🔹 Skeleton Loader Component
  const Skeleton = ({ width, height, className }) => (
    <div
      className={`animate-pulse bg-white/20 rounded-md ${className}`}
      style={{ width, height }}
    ></div>
  );

  return (
    <div>
      <motion.div
        className={`min-h-[100vh] bg-[#1e1e1e] items-center justify-center sm:p-4 p-0 flex`}
      >
        <div className="w-full max-w-[400px] sm:border-2 border-white/90 p-3 sm:rounded-3xl bg-[linear-gradient(to_bottom_left,_#2d3569_20%,_#3f283d_50%,_#2d3569_100%)] ">
          <div>
            {isLoading ? (
              <div className="animate-pulse space-y-2 mt-4">
                <Skeleton width="60%" height="25px" />
                <Skeleton width="40%" height="18px" />
              </div>
            ) : (
              <>
                <p className="text-white font-[600] text-[25px] mt-4">
                  You're In!
                </p>
                <p className="text-white font-[400] text-[16px]">
                  Welcome to FANEKT
                </p>
              </>
            )}
          </div>

          <div className="btn-gradient bg-gradient-to-r from-[#3a3a5a]/50 to-[#2a2a4a]/50 rounded-xl p-3 my-3 border border-[#5a5a8a]/30 flex items-center justify-start gap-2">
            <img src={FanektIcon} className="w-[23px]" alt="" />
            <span className="text-white font-[400]">
              Verified FANEKT Member
            </span>
          </div>

          {/* Main Card */}
          <div className="bg-gradient-to-br from-[#2a2a4a]/60 to-[#1a1a3a]/40 backdrop-blur-lg rounded-3xl py-4 px-3 border-2 border-[#4a4a7a]/70 shadow-2xl mb-2">
            <p className="text-center font-medium text-[25px] text-[#F94C65]">
              Congratulations!
            </p>
            <p className="text-white font-[400] text-center text-[16px]">
              You're now a verified member of the <br /> FANEKT community
            </p>

            <div className="mt-2 rounded-xl p-3 btn-gradient">
              <div className="pb-2 border-b-[2px] border-dashed border-white/40">
                <div className="flex justify-between mb-2 items-center">
                  <p className="text-white text-lg font-[400]">Your Tag ID</p>
                  {isLoading ? (
                    <Skeleton width="80px" height="32px" className="rounded-lg" />
                  ) : (
                    <button className="btn-gradient-blue3 py-2 rounded-lg px-4 text-white">
                      {tagData?.status || "N/A"}
                    </button>
                  )}
                </div>

                {isLoading ? (
                  <>
                    <Skeleton width="70%" height="35px" className="mt-2" />
                    <Skeleton width="50%" height="16px" className="mt-2" />
                  </>
                ) : (
                  <>
                    <p className="text-[28px] font-semibold text-white mt-[-15px] mb-0">
                      {tagData?.uid || "N/A"}
                    </p>
                    <p className="text-white/80 text-[16px]">
                      Status : {tagData?.status || "N/A"}
                    </p>
                  </>
                )}
              </div>

              {/* User Info */}
              <div className="mt-2 space-y-2">
                {[
                  { label: "Full Name", value: fanData?.name },
                  { label: "Email Address", value: fanData?.email },
                  { label: "City", value: fanData?.city },
                  { label: "Country", value: fanData?.country },
                  { label: "Home fan of:", value: fanData?.fan_of },
                  {
                    label: "Global fan of:",
                    value: fanData?.dream_of,
                  },
                ].map((item, idx) => (
                  <div key={idx}>
                    <p className="text-white/40 text-[16px] font-[300]">
                      {item.label}
                    </p>
                    {isLoading ? (
                      <Skeleton width="60%" height="18px" />
                    ) : (
                      <p className="text-white text-[17px] font-[400]">
                        {item.value || "N/A"}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* Button */}
              <div className="mt-2 text-center">
                {isLoading ? (
                  <Skeleton width="60%" height="40px" className="mx-auto rounded-lg" />
                ) : (
                  <button
                    disabled={isLoading}
                    onClick={() =>
                      navigate(`/app/my/items/${uid}/${tagId}`, {
                        state: { email: fanData?.email },
                      })
                    }
                    className="btn-gradient-white py-2.5 rounded-lg px-8 text-white cursor-pointer disabled:opacity-60"
                  >
                    View My Items
                  </button>
                )}
              </div>

              {/* Extra Info */}
              <div className="pb-4 border-b-[2px] border-dashed border-white/30">
                {isLoading ? (
                  <div className="space-y-3 mt-3">
                    <Skeleton width="100%" height="80px" className="rounded-xl" />
                    <Skeleton width="100%" height="80px" className="rounded-xl" />
                  </div>
                ) : (
                  <>
                    <div className="mt-3 rounded-xl p-3 btn-gradient-blue3">
                      <p className="text-white text-lg font-[400]">
                        Exclusive Content
                      </p>
                      <p className="text-white/40 text-[14px] font-[400]">
                        Get access to behind-the-scenes content and fan
                        experiences
                      </p>
                    </div>
                    <div className="mt-3 rounded-xl p-3 btn-gradient-blue3">
                      <p className="text-white text-lg font-[400]">
                        Special Offers
                      </p>
                      <p className="text-white/40 text-[14px] font-[400]">
                        Receive exclusive deals from our sponsor partners
                      </p>
                    </div>
                  </>
                )}
              </div>

              {isLoading ? (
                <Skeleton
                  width="90%"
                  height="20px"
                  className="mx-auto mt-3 rounded-md"
                />
              ) : (
                <p className="text-white/40 text-[16px] font-[400] mt-2 text-center">
                  Stay tuned for exclusive content and offers. Check your email
                  for updates!
                </p>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Congratulations;
