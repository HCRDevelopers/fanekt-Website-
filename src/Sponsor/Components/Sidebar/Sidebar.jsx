import { useEffect, useState } from "react";
import React from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { RiMenu3Line } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  UserPlus,
  ExternalLink,
  QrCode,
  Store,
  Trophy
} from "lucide-react";

import sidebarlogo from "./Assets/sidebarlogoimg.png";
import arrowImg from "./Assets/arrowImg.png";
import logOutImg from "./Assets/LogoutImg.png";
import Admin from "./Assets/admin.png";
import LogoutModal from "./LogoutModal/LogoutModal";
import { useMyContext } from "../../../context/context";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userProfile } = useMyContext();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLogOut, setIsLogOut] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [activePath, setActivePath] = useState(location.pathname);
  const [hoveredPath, setHoveredPath] = useState(null);
  const [pageHeading, setPageHeading] = useState("Dashboard");

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  const sections = [
    {
      items: [
        {
          path: "/sponsor/dashboard",
          label: "My Account",
          icon: User,
          activeIcon: User
        },
        {
          path: "/sponsor/profile",
          label: "Profile Settings",
          icon: User,
          activeIcon: User
        },
        {
          path: "/sponsor/invitations",
          label: "Invite",
          icon: UserPlus,
          activeIcon: UserPlus
        },
        {
          path: "/sponsor/campaigns",
          label: "Compaigns",
          icon: UserPlus,
          activeIcon: UserPlus
        },
        {
          path: "/sponsor/scan",
          label: "Scan",
          icon: QrCode,
          activeIcon: QrCode
        },
        {
          path: "/sponsor/store",
          label: "Store",
          icon: Store,
          activeIcon: Store
        },
        {
          path: "/sponsor/ranking",
          label: "Rankings",
          icon: Trophy,
          activeIcon: Trophy
        },
      ],
    },
  ];

  // 🔹 Page Headings
  const pageConfigs = {
    "/sponsor/dashboard": { heading: "My Account" },
    "/sponsor/invite": { heading: "Invite" },
    "/sponsor/portal": { heading: "Open Portal" },
    "/sponsor/scan": { heading: "Scan" },
    "/sponsor/store": { heading: "Store" },
    "/sponsor/rankings": { heading: "Rankings" },
  };

  useEffect(() => {
    const currentPath = location.pathname;
    const config = pageConfigs[currentPath] || { heading: "Dashboard" };
    setPageHeading(config.heading);
    setActivePath(currentPath);
  }, [location]);

  const backEnabledPaths = [
    "/UsersDetail",
    "/SalonDetail",
    "/UsersJobRequestedDetail",
  ];
  const isBackButtonAllowed = backEnabledPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/*  Topbar (uncomment when needed) */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="lg:ml-[280px] bg-[#34305771] ml-auto flex justify-between items-center p-6 fixed lg:hidden w-full"
      >
        <div className="flex items-center gap-x-2">
          {isBackButtonAllowed ? (
            <img
              src={arrowImg}
              className="w-[40px] cursor-pointer"
              onClick={() => navigate(-1)}
              title="Go Back"
            />
          ) : (
            <img
              src={arrowImg}
              className="w-[40px] hidden"
              title="Back not available on this page"
            />
          )}
          <h1 className="md:text-[25px] text-[20px] font-bold text-white">
            {pageHeading}
          </h1>
        </div>

        <button
          onClick={toggleSidebar}
          className="lg:hidden rounded-sm bg-[#324a85] p-2 shadow-md text-white"
        >
          <RiMenu3Line size={20} />
        </button>
      </motion.div>

      {/* 🔹 Sidebar */}
      <AnimatePresence>
        {(isSidebarOpen || screenWidth >= 1024) && (
          <motion.div
            initial={{ x: -250 }}
            animate={{ x: 0 }}
            exit={{ x: -250 }}
            transition={{ duration: 0.3 }}
            className="fixed top-2.5 left-2 rounded-xl justify-between 
                  bg-[linear-gradient(to_bottom,_#19417F_0%,_#364172_100%)]
                  py-10 text-white w-[280px] h-[97vh] z-30 flex flex-col overflow-y-auto"
          >
            <style>{`::-webkit-scrollbar { display: none; }`}</style>

            <div>
              {/* Logo */}
              <div className="flex-shrink-0 mb-8 flex justify-center">
                <motion.img
                  src={sidebarlogo}
                  alt="Logo"
                  className="w-[150px]"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                />
              </div>

              <div className="w-full flex justify-center">
                <div className="flex justify-between items-center w-[240px] my-5 pb-5  border-b-[3px] border-[#ffffff86]">
                  <div className="flex gap-2 items-center">
                    {userProfile.profileImage ? (
                      <img src={userProfile.profileImage} className="w-[50px] h-[50px] rounded-full object-cover" alt="Profile" />
                    ) : (
                      <div className="w-[50px] h-[50px] rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                        <span className="text-white text-xl font-bold">
                          {userProfile.name?.charAt(0) || 'S'}
                        </span>
                      </div>
                    )}
                    <div>
                      <p className="text-white font-medium text-[17px]">
                        {userProfile.name || 'Sponsor'}
                      </p>
                      <p className="text-[#ffffff85] font-medium text-[12px]">
                        {userProfile.email || 'sponsor@example.com'}
                      </p>
                    </div>
                  </div>
                  <img
                    onClick={() => setIsLogOut(true)}
                    src={logOutImg}
                    className="w-[25px] h-[25px]"
                    alt="Logout"
                  />
                </div>
              </div>
              {/* Links */}
              <div className="flex flex-col space-y-6 px-3">
                {sections.map((section, sectionIndex) => (
                  <div key={sectionIndex}>
                    {/* Section Heading */}
                    {section.heading && (
                      <p className="text-gray-400 text-sm font-medium mb-2 ps-2 uppercase">
                        {section.heading}
                      </p>
                    )}

                    {/* Section Items */}
                    <div className="flex flex-col space-y-2">
                      {section.items.map((link, linkIndex) => {
                        const isActive =
                          activePath === link.path ||
                          (link.path1 && activePath === link.path1);

                        const isHover = hoveredPath === link.path;
                        const isHighlighted = isActive || isHover;

                        // Use active icon when highlighted, otherwise use regular icon
                        const IconComponent = isHighlighted ? link.activeIcon : link.icon;

                        return (
                          <Link
                            key={linkIndex}
                            to={link.path}
                            onMouseEnter={() => setHoveredPath(link.path)}
                            onMouseLeave={() => setHoveredPath(null)}
                            onClick={() => {
                              closeSidebar();
                              localStorage.setItem("lastAuctionPage", link.path);
                            }}
                            className="flex px-0"
                          >
                            <motion.div
                              className={`w-[95%] py-3 ms-2 flex items-center ps-2 rounded-sm transition-all duration-300 ${isHighlighted
                                ? "bg-white text-black"
                                : "bg-transparent text-white"
                                }`}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <IconComponent
                                size={25}
                                className="transition duration-300"
                              />
                              <span className="ms-2 text-[17px] font-medium">
                                {link.label}
                              </span>
                            </motion.div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Logout bottom fixed */}
            {/* <div className="mt-20 px-4">
              <div
                className="flex cursor-pointer items-center gap-2 p-3 w-[245px] rounded-lg hover:bg-white/10 transition-colors duration-300"
                onClick={() => setIsLogOut(true)}
              >

                <button className="ms-2 text-[17px] cursor-pointer">
                  LogOut
                </button>
              </div>
            </div> */}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🔹 Backdrop (Mobile) */}
      <AnimatePresence>
        {isSidebarOpen && screenWidth < 1024 && (
          <motion.div
            onClick={closeSidebar}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/75 lg:hidden z-20"
          />
        )}
      </AnimatePresence>

      {/* 🔹 Logout Modal */}
      <LogoutModal
        openLogoutModal={isLogOut}
        closeLogoutModal={() => setIsLogOut(false)}
      />
    </>
  );
};

export default Sidebar;
