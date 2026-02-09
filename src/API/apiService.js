import API from "./axiosInstance";

// // Authentication APIs
export const login = (credentials) => API.post("login", credentials);
export const getNfcTags = () => API.get("nfc-tags");

// batches
export const getBatches = () => API.get("all-batches");
export const addBatch = (data) => API.post("add-batches", data);


// fans apis
export const registerFan = (data) => API.post("register-fan", data)

// program tag api
export const programTag = (data) => API.post("program-tag", data)

// add tag api
export const addTag = (data) => API.post("add-tag", data)

// api for register
export const register = (data) => API.post("register-fan", data)

// get all fans api
export const getAllFans = () => API.get("get-all-fans")

// get all compaigns
export const getAllCompaigns = () => API.get("all-campaigns")


// get all tags
export const getAllTsgs = () => API.get("all-tag")


// create compaign api
export const createCompaign = (data) => API.post("add-campaign", data)

// get dashboard
export const getDashboard = (data) => API.post("dashboard", data)


// check mail api

export const checkEmail = (data) => API.post("check-email", data)

// my items
export const getMyItems = (data) => API.post("my-fanekt-item", data)

// update profile of fan
export const updateProfile = (data) => API.post("edit-fan-profile", data)

// send locatio api
export const fanProfile = (data) => API.post("fan-profile", data)

// send-verification-email
export const sendVerificationEmail = (data) => API.post("send-verification-email", data)
export const verifyEmail = (data) => API.post("verify-email-code", data)

// ========================== fan side apis =================================
// register fan api
export const fanSignup = (data) => API.post("register-fan", data)
export const fanUpdate = (data) => API.post("update-fan", data)

// ========================== team side apis =================================
// register team api
export const teamSignup = (data) => API.post("register-team", data)

// ========================== athlete side apis =================================
// register athlete api
export const athleteSignup = (data) => API.post("register-athlete", data)

// ========================== sponsor side apis =================================
// register sponsor api
export const sponsorSignup = (data) => API.post("register-sponsor", data)
export const updateSponsor = (data) => API.post("update-sponsor", data)

// ========================== admin side apis =================================
// get all team users
export const getAllTeamUsers = () => API.get("get-all-users?type=team")

// get all athlete users
export const getAllAthleteUsers = () => API.get("get-all-users?type=athlete")

// get all sponsor users
export const getAllSponsorUsers = () => API.get("get-all-users?type=sponsor")

// get all fan users
export const getAllFanUsers = () => API.get("get-all-users?type=fan")

// get profile
export const getProfile = () => API.get("get-profile")

// update team profile
export const updateTeam = (data) => API.post("update-team", data)
// update athlete profile
export const updateAthlete = (data) => API.post("update-athlete", data)

// change password
export const changePassword = (data) => API.post("change-password", data)

// get user points
export const getUserPoints = () => API.get("user-points")

// stripe make payment
export const stripeMakePayment = (data) => API.post("stripe-make-payment", data)
