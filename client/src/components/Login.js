import axios from "axios";
import React, { useState } from "react";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleForm = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // console.log(form);

      const response = await axios.post(
        "http://localhost:8000/auth/loginpage",
        {
          email: form.email,
          password: form.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const user = response.data;
      if (user) {
        localStorage.setItem('token',user)
        alert("login successfull");
        window.location.href = "/";
      } else {
        alert("invalid crendititals");
      }

      // if (token) {
      //   localStorage.setItem("jwtToken", token);
      //   setMessage("Login successful!");

      //   window.location.href = "/";
      // } else {
      //   setError("Invalid credentials, please try again.");
      // }
    } catch (error) {
      console.log(error.message);
      setError("Error logging in, please try again later.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card mx-auto" style={{ maxWidth: "400px" }}>
        <form className="p-4" onSubmit={handleForm}>
          <h2 className="text-center mb-4">Login</h2>

          {error && <div className="alert alert-danger">{error}</div>}
          {message && <div className="alert alert-success">{message}</div>}

          <div className="form-floating mb-3">
            <input
              name="email"
              type="email"
              className="form-control"
              id="floatingEmail"
              value={form.email}
              onChange={handleChange}
              placeholder="name@example.com"
              required
            />
            <label htmlFor="floatingEmail">Email address</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="password"
              name="password"
              className="form-control"
              id="floatingPassword"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
            <button type="button" className="btn btn-secondary">
              Go back
            </button>
          </div>

          <p className="mt-3 text-center">
            <a href="#" className="link-primary">
              Forgot your password?
            </a>
          </p>
          <p className="mt-1 text-center">
            <a href="#" className="link-primary">
              Don't have an account? Sign Up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
