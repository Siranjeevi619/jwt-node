import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/homepage/HomePage";
import LoginPage from "../pages/login/LoginPage";
import SignInPage from "../pages/signup/SignInPage";
import PageNotFound from "../components/PageNotFound";
import Navbar from "../components/Navbar";

function AppNavigation() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<HomePage />}></Route>
        <Route path="/loginpage" element={<LoginPage />}></Route>
        <Route path="/signinpage" exact element={<SignInPage />}></Route>
        <Route path="*" exact element={<PageNotFound />}></Route>
      </Routes>
    </div>
  );
}

export default AppNavigation;
