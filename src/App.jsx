import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import AdminLogin from "./Admin/AdminAuth/AdminLogin";
import AdminLayout from "./Admin/AdminLayout/AdminLayout";
import Dashboard from "./Admin/Pages/Dashboard/Dashboard";
import ProgramTag from "./Admin/Pages/ProgramTags/ProgramTag";
import ProgrammedSuccess from "./Admin/Pages/ProgramTags/ProgrammedSuccess";
import TagManagement from "./Admin/Pages/TagManagement/TagManagement";
import FanManagement from "./Admin/Pages/FanManagement.jsx/FanManagement";
import BroadCasts from "./Admin/Pages/BroadCasts/BroadCasts";
// import Splash from "./Web/Home/Splash";
// import Register from "./Web/Register/Register";
// import Congratulations from "./Web/Congratulations/Congratulations";
// import MyItems from "./Web/MyItems/MyItems";
// import EditProfile from "./Web/EditProfile/EditProfile";
// import TagActivationAlert from "./Web/TagActivationAlert/TagActivationAlert";
import { Toaster } from "react-hot-toast";
import EmailVerificationPage from "./Web/TagActivationAlert/EmailVerificationPage";
import ClubUniTeamManagement from "./Admin/Pages/ClubUniTeamManagement/ClubUniTeamManagement";
import AthleteAndVipsManagement from "./Admin/Pages/AthleteAndVips/AthleteAndVipsManagement";
import SponsorAndPartnerManagement from "./Admin/Pages/SponsorAndPartner/SponsorAndPartnerManagement";
import GlobalLandingPage from "./GlobalLandingPage/GlobalLandingPage";
import GlobalStore from "./GlobalLandingPage/GlobalStore";
import GlobalPromos from "./GlobalLandingPage/GlobalPromos";
import GlobalPastSponsorCampaigns from "./GlobalLandingPage/GlobalPastSponsorCampaigns";
import GlobalPastWinPrizes from "./GlobalLandingPage/GlobalPastWinPrizes";
import FanLogin from "./Auth/FanAuth/FanLogin";
import SponsorLogin from "./Auth/SponsorAuth/SponsorLogin";
import AthleteLogin from "./Auth/AthleteAuth/AthleteLogin";
import TeamLogin from "./Auth/TeamAuth/TeamLogin";
import RegisterFan from "./Auth/FanAuth/RegisterFan";
import RegisterTeam from "./Auth/TeamAuth/RegisterTeam";
import RegisterAthlete from "./Auth/AthleteAuth/RegisterAthlete";
import RegisterSponsor from "./Auth/SponsorAuth/RegisterSponsor";
import FanLayout from "./Web/FanLayout/FanLayout";
import FanDashboard from "./Web/Dashboard/Dashboard";
import FanWallet from "./Web/FanWallet/FanWallet";
import SponsorLayout from "./Sponsor/SponsorLayout/SponsorLayout";
import SponsorWallet from "./Sponsor/SponsorWallet/SponsorWallet";
import SponsorDashboard from "./Sponsor/Dashboard/Dashboard";
import AthleteLayout from "./AthleteOrVips/AthleteLayout/AthleteLayout";
import AthleteDashboard from "./AthleteOrVips/Dashboard/Dashboard";
import TeamDashboard from "./ClubTeamUni/Dashboard/Dashboard";
import FanProfile from "./Web/FanProfile/FanProfile";
import SponsorProfile from "./Sponsor/SponsorProfile/SponsorProfile";
import AthleteProfile from "./AthleteOrVips/AthleteProfile/AthleteProfile";
import TeamProfile from "./ClubTeamUni/TeamProfile/TeamProfile";
import TeamWallet from "./ClubTeamUni/TeamWallet/TeamWallet";
import AthleteWallet from "./AthleteOrVips/AthleteWallet/AthleteWallet";
import FanRanking from "./Web/FanRankings/FanRanking";
import FanInvitation from "./Web/FanInvitation/FanInvitation";
import SponsorInvitation from "./Sponsor/SponsorInvitation/SponsorInvitation";
import AthleteOrVipRanking from "./AthleteOrVips/AthleteOrVipRanking/AthleteOrVipRanking";
import TeamLayout from "./ClubTeamUni/TeamLayout/TeamLayout";
import ClubTeamUniRankings from "./ClubTeamUni/ClubTeamUniRankings/ClubTeamUniRankings";
import SponsorRankings from "./Sponsor/SponsorRankings/SponsorRankings";
import ClubTeamUniInvitation from "./ClubTeamUni/ClubTeamUniInvitation/ClubTeamUniInvitation";
import AthleteVipInvitations from "./AthleteOrVips/AthleteVipInvitations/AthleteVipInvitations";
import SendVerificationEmail from "./Auth/FanAuth/SendVerificationEmail";
import VerifyCode from "./Auth/FanAuth/VerifyCode";
import FanCampaigns from "./Web/FanCampaigns/FanCampaigns";
import SponsorCampaigns from "./Sponsor/SponsorCampaigns/SponsorCampaigns";
import ClubTeamUniCampaigns from "./ClubTeamUni/ClubTeamUniCampaigns/ClubTeamUniCampaigns";
import AthleteOrVipCampaigns from "./AthleteOrVips/AthleteOrVipCampaigns/AthleteOrVipCampaigns";
import MyXKryptedItems from "./Web/XKryptedItems/MyXKryptedItems";
import Mytickets from "./Web/MyTickets/Mytickets";
import TransferFnktPoints from "./Web/TransferFnktPoints/TransferFnktPoints";
import FanStore from "./Web/FanStore/FanStore";
import ClubUniTeamStore from "./ClubTeamUni/ClunUniTeamStore/ClubUniTeamStore";
import AthleteVipStore from "./AthleteOrVips/AthleteVipStore/AthleteVipStore";
import SponsorStore from "./Sponsor/SponsorStore/SponsorStore";
import SponsorScan from "./Sponsor/SponsorScan/SponsorScan";
import AthleteVipScan from "./AthleteOrVips/AthleteVipScan/AthleteVipScan";
import ClubTeamUniScan from "./ClubTeamUni/ClubTeamUniScan/ClubTeamUniScan";
import Campaigns from "./Admin/Pages/Campaigns/Campaigns";
import AdminStore from "./Admin/AdminStore/AdminStore";
import LicenseeManagement from "./Admin/Pages/LicenseeManagement/LicenseeManagement";
import PricingManagement from "./Admin/Pages/PricingManagement/PricingManagement";
import CampaignManagement from "./Admin/Pages/CampaignManagement/CampaignManagement";
import RevenueManagement from "./Admin/Pages/RevenueManagement/RevenueManagement";
import WeeklyCompetition from "./Web/FanWallet/components/WeeklyCompetition";
import ParentGuardianModal from "./Web/FanProfile/Modals/ParentGuardianModal";
import LicenseePricingModal from "./Web/FanStore/Modals/LicenseePricingModal";
import PWAInstallPrompt from "./Components/PWAInstallPrompt";
import PWADebug from "./Components/PWADebug";

function App() {
  return (
    <>
      <PWAInstallPrompt />
      {/* <PWADebug /> */}
      <Routes>
        <Route path="/verify-email" element={<SendVerificationEmail />} />
        <Route path="/verify-code" element={<VerifyCode />} />
        <Route path="/team/register" element={<RegisterTeam />} />
        <Route path="/team" element={<TeamLogin />} />
        <Route path="/athlete/register" element={<RegisterAthlete />} />
        <Route path="/athlete" element={<AthleteLogin />} />
        <Route path="/sponsor/register" element={<RegisterSponsor />} />
        <Route path="/sponsor" element={<SponsorLogin />} />
        <Route path="/fan/register" element={<RegisterFan />} />
        <Route path="/invite/:id" element={<RegisterFan />} />
        <Route path="/login" element={<FanLogin />} />
        <Route path="/" element={<GlobalLandingPage />} />
        <Route path="/store" element={<GlobalStore />} />
        <Route path="/promos" element={<GlobalPromos />} />
        <Route path="/promos/past-sponsor-campaigns" element={<GlobalPastSponsorCampaigns />} />
        <Route path="/promos/past-win-prizes" element={<GlobalPastWinPrizes />} />
        <Route path="/admin" element={<AdminLogin />} />
        {/* <Route path="/:uid/:tagId" element={<Splash />} /> */}
        {/* <Route path="/app/register/:uid/:tagId" element={<Register />} /> */}
        {/* <Route path="/app/congratulations/:uid/:tagId" element={<Congratulations />} /> */}
        {/* <Route path="/app/my/items/:uid/:tagId" element={<MyItems />} /> */}
        {/* <Route path="/app/edit/:uid/:tagId" element={<EditProfile />} /> */}
        {/* <Route path="/app/alert/:uid/:tagId" element={<TagActivationAlert />} /> */}
        {/* <Route path="/app/verify/:uid/:tagId" element={<EmailVerificationPage />} /> */}

        {/* Admin */}
        <Route element={<AdminLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/programTag" element={<ProgramTag />} />
          <Route path="/ProgrammedSuccess/:id" element={<ProgrammedSuccess />} />
          <Route path="/tagManagement" element={<TagManagement />} />
          <Route path="/fanManagement" element={<FanManagement />} />
          <Route path="/clu-uni-team-Management" element={<ClubUniTeamManagement />} />
          <Route path="/athlete-vip-Management" element={<AthleteAndVipsManagement />} />
          <Route path="/sponsor-partner-Management" element={<SponsorAndPartnerManagement />} />
          <Route path="/broadCasts" element={<BroadCasts />} />
          <Route path="/admin/campaigns" element={<Campaigns />} />
          <Route path="/admin/store" element={<AdminStore />} />
          <Route path="/dashboard/licensee-management" element={<LicenseeManagement />} />
          <Route path="/dashboard/pricing-management" element={<PricingManagement />} />
          <Route path="/dashboard/campaign-management" element={<CampaignManagement />} />
          <Route path="/dashboard/revenue-management" element={<RevenueManagement />} />
        </Route>

        {/* Fan */}
        <Route element={<FanLayout />}>
          <Route path="/fan/dashboard" element={<FanDashboard />} />
          <Route path="/fan/wallet" element={<FanWallet />} />
          <Route path="/fan/profile" element={<FanProfile />} />
          <Route path="/fan/ranking" element={<FanRanking />} />
          <Route path="/fan/invitations" element={<FanInvitation />} />
          <Route path="/fan/compaigns" element={<FanCampaigns />} />
          <Route path="/fan/items" element={<MyXKryptedItems />} />
          <Route path="/fan/tickets" element={<Mytickets />} />
          <Route path="/fan/transfer-points" element={<TransferFnktPoints />} />
          <Route path="/fan/store" element={<FanStore />} />
      
          

        </Route>
        {/* sponsor */}
        <Route element={<SponsorLayout />}>
          <Route path="/sponsor/dashboard" element={<SponsorDashboard />} />
          <Route path="/sponsor/wallet" element={<SponsorWallet />} />
          <Route path="/sponsor/profile" element={<SponsorProfile />} />
          <Route path="/sponsor/ranking" element={<SponsorRankings />} />
          <Route path="/sponsor/invitations" element={<SponsorInvitation />} />
          <Route path="/sponsor/campaigns" element={<SponsorCampaigns />} />
          <Route path="/sponsor/store" element={<SponsorStore />} />
          <Route path="/sponsor/scan" element={<SponsorScan />} />
        </Route>
        {/* Athlete */}
        <Route element={<AthleteLayout />}>
          <Route path="/athlete/dashboard" element={<AthleteDashboard />} />
          <Route path="/athlete/wallet" element={<AthleteWallet />} />
          <Route path="/athlete/profile" element={<AthleteProfile />} />
          <Route path="/athlete/ranking" element={<AthleteOrVipRanking />} />
          <Route path="/athlete/invite" element={<AthleteVipInvitations />} />
          <Route path="/athlete/campaigns" element={<AthleteOrVipCampaigns />} />
          <Route path="/athlete/store" element={<AthleteVipStore />} />
          <Route path="/athlete/scan" element={<AthleteVipScan />} />
        </Route>
        {/* club/uni/team */}
        <Route element={<TeamLayout />}>
          <Route path="/team/dashboard" element={<TeamDashboard />} />
          <Route path="/team/wallet" element={<TeamWallet />} />
          <Route path="/team/profile" element={<TeamProfile />} />
          <Route path="/team/ranking" element={<ClubTeamUniRankings />} />
          <Route path="/team/invitations" element={<ClubTeamUniInvitation />} />
          <Route path="/team/campaigns" element={<ClubTeamUniCampaigns />} />
          <Route path="/team/store" element={<ClubUniTeamStore />} />
          <Route path="/team/scan" element={<ClubTeamUniScan />} />
        </Route>

      </Routes>
    </>
  );
}

export default App;
