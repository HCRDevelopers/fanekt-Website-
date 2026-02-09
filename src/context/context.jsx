// context.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const MyContext = createContext();

export const MyContextProvider = ({ children }) => {
  const [tagId, setTagId] = useState(null);
  const [userProfile, setUserProfile] = useState({
    name: '',
    email: '',
    profileImage: ''
  });

  // On mount, load tagId and userProfile from localStorage
  useEffect(() => {
    const storedTagId = localStorage.getItem("tagId");
    if (storedTagId) {
      setTagId(storedTagId);
    }

    const storedUserProfile = localStorage.getItem("userProfile");
    if (storedUserProfile) {
      setUserProfile(JSON.parse(storedUserProfile));
    }
  }, []);

  // Whenever tagId changes, update localStorage
  useEffect(() => {
    if (tagId) {
      localStorage.setItem("tagId", tagId);
    }
  }, [tagId]);

  // Whenever userProfile changes, update localStorage
  useEffect(() => {
    if (userProfile.name || userProfile.email || userProfile.profileImage) {
      localStorage.setItem("userProfile", JSON.stringify(userProfile));
    }
  }, [userProfile]);

  return (
    <MyContext.Provider value={{ tagId, setTagId, userProfile, setUserProfile }}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => useContext(MyContext);
