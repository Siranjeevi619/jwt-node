import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Home = () => {
  const { user, logout } = useContext(UserContext);

  return (
    <div className="container text-center">
      <h1>Welcome, {user?.data || "Guest"}</h1>
      <p>This is the home page of the application.</p>

      <>
        <button className="btn btn-primary" onClick={logout}>
          Log out
        </button>
      </>
    </div>
  );
};

export default Home;
