import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SignInPage from "../page/SignInPage/SignInPage";
// import Home from "../page/Home/HomePage";
import LoginPage from "../page/LoginPage/LoginPage";
import NavbarComponent from "../component/Navbar";
import HomePage from "../page/Home/HomePage";

const Navigation = () => {
  return (
    <>
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignInPage />} />
      </Routes>
    </>
  );
};

export default Navigation;
