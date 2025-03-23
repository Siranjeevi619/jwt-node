import React, { useContext } from "react";
import { UserContext } from "../../context/UserAuth";
import { Container } from "react-bootstrap";

function HomePage() {
  const { user } = useContext(UserContext);
  const token = localStorage.getItem("token");
  return (
    <div>
      <Container>{JSON.stringify(user, null, 2)}</Container>
      <Container>{token}</Container>
    </div>
  );
}

export default HomePage;
