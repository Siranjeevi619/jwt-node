import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "../components/Navbar";
import HomePage from "../pages/home/HomePage";
import SignInPage from "../pages/signin/SignInPage";
import LoginPage from "../pages/login/LoginPage";

function AppNavigation() {
  return (
    <>
      <Navbar />
      <>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignInPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </>
    </>
  );
}

export default AppNavigation;
