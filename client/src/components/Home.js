import React, { useEffect, useState } from "react";

const Home = () => {
  const [name, setName] = useState("unknown");

  useEffect(() => {
    fetch("http://localhost:8000/", {
      method: "GET",
    })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Network response is not ok");
        }
        return response.json();
      })
      .then((data) => {
        setName(data.message);
      })
      .catch((error) => {
        console.error("Fetch error:", error.message);
      });
  }, []);

  return (
    <div className="container text-center">
      <h1>Welcome, {name}</h1>
      <p>This is the home page of the application.</p>
    </div>
  );
};

export default Home;
