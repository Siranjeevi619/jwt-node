import React, { useContext } from "react";
import { UserContext } from "../../context/UserAuth";
import { Button, Container } from "react-bootstrap";

function HomePage() {
  const { user, logout } = useContext(UserContext);
  const token = localStorage.getItem("token");
  return (
    <div>
      <Container>{JSON.stringify(user, null, 2)}</Container>
      <Container>{token}</Container>
      <Container>
        <Button onClick={logout}>logout</Button>
      </Container>
    </div>
  );
}

export default HomePage;
