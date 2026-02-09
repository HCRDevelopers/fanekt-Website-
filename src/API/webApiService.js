import API from "./webAxiosInstance";

// // Authentication APIs
export const login = (credentials) => API.post("login", credentials);
export const getNfcTags = () => API.get("nfc-tags");