import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import FanektIcon from "./assets/fanekt-icon.png";
import Arrow from "./assets/arrow.png";
import { getMyItems } from "../../API/apiService";

function MyItems() {
  const { uid, tagId } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);

  console.log("UID:", uid);
  console.log("Tag ID:", tagId);
  console.log("Email from state:", state?.email);

  useEffect(() => {
    if (state?.email) {
      handleGetMyItems(state.email);
    } else {
      toast.error("Email not found. Please try again.");
    }
  }, [state?.email]);

  const handleGetMyItems = async (email) => {
    setLoading(true);
    try {
      const res = await getMyItems({ email });

      if (res) {
        setItems(res.data.data);
        toast.success("Items fetched successfully!");
      } else {
        toast.error(res.message || "Failed to fetch items.");
      }
    } catch (err) {
      console.error("Error fetching items:", err);

      const backendMessage =
        err?.response?.data?.message ||
        err?.response?.data?.errors?.email?.[0] ||
        "Something went wrong.";
      toast.error(backendMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <motion.div
        className={`min-h-screen h-full bg-[#1e1e1e] items-center justify-center sm:p-4 p-0 flex`}
      >
        <div className="w-full max-w-[400px] lg:min-h-[97vh] min-h-[100vh] sm:border-2 border-white/90 p-3 sm:rounded-3xl bg-[linear-gradient(to_bottom_left,_#2d3569_20%,_#3f283d_50%,_#2d3569_100%)] ">
          <div className="flex justify-between items-center">
            <img
              src={Arrow}
              className="w-[40px] cursor-pointer"
              alt="Back"
              onClick={() => navigate(-1)}
            />
            <button
              onClick={() =>
                navigate(`/app/edit/${uid}/${tagId}`, {
                  state: { itemData: items },
                })
              }
              className="py-2 rounded-lg px-4 text-white btn-gradient-white"
            >
              Edit Profile
            </button>
          </div>
          <div>
            <p className="text-white font-[600] text-[25px]">
              My FANEKT Tags / Items
            </p>
          </div>

          {/* Skeleton Loader while fetching */}
          {loading ? (
            <div className="mt-6 space-y-4 animate-pulse">
              <div className="grid grid-cols-2 gap-2">
                {[1, 2].map((i) => (
                  <div
                    key={i}
                    className="rounded-xl p-2 my-3 border border-[#5a5a8a]/30 bg-[#3a3a5a]/40 h-[80px]"
                  ></div>
                ))}
              </div>

              <div className="h-5 w-1/2 bg-white/20 rounded"></div>

              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="rounded-xl p-3 my-3 border border-[#5a5a8a]/30 bg-[#3a3a5a]/40 h-[120px]"
                ></div>
              ))}
            </div>
          ) : (
            <>
              {/* ✅ Show summary cards */}
              <div className="grid grid-cols-2 gap-2">
                <div className="btn-gradient-blue bg-gradient-to-r from-[#3a3a5a]/50 to-[#2a2a4a]/50 rounded-xl p-2 my-3 border border-[#5a5a8a]/30 flex items-center justify-start gap-2">
                  <img src={FanektIcon} className="w-[50px]" alt="" />
                  <div className="flex flex-col">
                    <span className="text-white text-[15px] font-[400]">
                      {items.length || 0}
                    </span>
                    <span className="text-white/50 text-[13px] font-[400]">
                      Total Items
                    </span>
                  </div>
                </div>
                <div className="btn-gradient-blue bg-gradient-to-r from-[#3a3a5a]/50 to-[#2a2a4a]/50 rounded-xl p-2 my-3 border border-[#5a5a8a]/30 flex items-center justify-start gap-2">
                  <img src={FanektIcon} className="w-[50px]" alt="" />
                  <div className="flex flex-col">
                    <span className="text-white text-[15px] font-[400]">
                      {items.filter((item) => item.tag_info).length}
                    </span>
                    <span className="text-white/50 text-[13px] font-[400]">
                      Active Tags / Items
                    </span>
                  </div>
                </div>
              </div>

              <span className="text-white text-[22px] font-[500] my-3">
                Your Registered Tags / Items
              </span>

              {/* ✅ Map fetched items */}
              {items.length > 0 ? (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="btn-gradient-blue bg-gradient-to-r from-[#3a3a5a]/50 to-[#2a2a4a]/50 rounded-xl p-2 my-3 border border-[#5a5a8a]/30"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center justify-start gap-2">
                        <img src={FanektIcon} className="w-[50px]" alt="" />
                        <div className="flex flex-col">
                          <span className="text-white text-[15px] font-[400]">
                            {item.tag_info?.name || "Unknown Tag"}
                          </span>
                          <span className="text-white/50 text-[13px] font-[400]">
                            {item.tag_info?.description || "No Description"}
                          </span>
                        </div>
                      </div>
                      <button className="py-1 rounded-lg px-3 btn-gradient-blue text-white flex flex-col">
                      <span className="text-[12px]">Activated</span>
                        <span className="text-white text-[10px] font-[400]">
                          {new Date(item.created_at).toLocaleDateString()}
                        </span>
                      </button>
                    </div>

                    <div className="grid grid-cols-3 mt-2">
                      <div className="flex flex-col">
                        <span className="text-white/50 text-[12px] font-[400]">
                          Tag / item ID:
                        </span>
                        <span className="text-white text-[10px] font-[400]">
                          {item.uid}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-white/50 text-[12px] font-[400]">
                         Home fan of:
                        </span>
                        <span className="text-white text-[10px] font-[400]">
                          {item.fan_of}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-white/50 text-[12px] font-[400]">
                         Global fan of:
                        </span>
                        <span className="text-white text-[10px] font-[400]">
                          {item.fan_of}
                        </span>
                      </div>
                      {/* <div className="flex flex-col">
                        <span className="text-white/50 text-[13px] font-[400]">
                          Activated:
                        </span>
                        <span className="text-white text-[12px] font-[400]">
                          {new Date(item.created_at).toLocaleDateString()}
                        </span>
                      </div> */}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-white/70 text-center mt-4">
                  No items found for this account.
                </p>
              )}
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default MyItems;
