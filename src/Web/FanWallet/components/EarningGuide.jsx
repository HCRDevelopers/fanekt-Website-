import React from "react";
import { FaMobile, FaTrophy, FaUsers, FaEnvelope, FaStar } from "react-icons/fa";

const EarningGuide = () => {
  const earningMethods = [
    {
      icon: <FaMobile className="text-blue-400 text-2xl" />,
      title: "NFC Scanning",
      description: "Scan NFC tags at events, stadiums, and sponsored locations to earn FNKT instantly.",
      reward: "Up to 500 FNKT per scan"
    },
    {
      icon: <FaTrophy className="text-yellow-400 text-2xl" />,
      title: "Campaign Participation",
      description: "Join sponsored campaigns and complete challenges to earn bonus FNKT rewards.",
      reward: "100-1000 FNKT per campaign"
    },
    {
      icon: <FaUsers className="text-green-400 text-2xl" />,
      title: "Fan Activities",
      description: "Engage with your favorite teams and athletes through verified activities.",
      reward: "50-300 FNKT per activity"
    },
    {
      icon: <FaEnvelope className="text-purple-400 text-2xl" />,
      title: "Invitations",
      description: "Invite friends to join FanEKT and earn FNKT when they start engaging.",
      reward: "100 FNKT per successful invite"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl md:p-6 p-2">
        <h3 className="text-white text-xl font-bold mb-6">How to Earn FNKT</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {earningMethods.map((method, index) => (
            <div key={index} className="bg-[#1e2139] rounded-xl p-6 border border-[#286db24c]">
              <div className="flex items-center gap-3 mb-4">
                {method.icon}
                <h4 className="text-white font-semibold">{method.title}</h4>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                {method.description}
              </p>
              <div className="text-[#f64c68] font-semibold">{method.reward}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-[#f64c68]/10 to-[#ff6b6b]/10 border border-[#f64c68]/30 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <FaStar className="text-[#f64c68] text-2xl" />
          <h4 className="text-white font-semibold">Start Earning Today!</h4>
        </div>
        <p className="text-gray-300 mb-4">
          Every FNKT you earn is verified and securely recorded. Start by scanning NFC tags at your next event or joining available campaigns.
        </p>
        <button className="bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all">
          Find Nearby NFC Tags
        </button>
      </div>
    </div>
  );
};

export default EarningGuide;