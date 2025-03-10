import axios from "axios";
import React, { useState } from "react";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    if (formData.password !== formData.confirmPassword) {
      return setMessage({ type: "error", text: "Passwords do not match" });
    }

    try {
      const res = await axios.post("http://localhost:7000/auth/signup", {
        name: formData.username,
        email: formData.email,
        phone: formData.phoneNumber,
        password: formData.password,
      });

      if (res.status === 201) {
        setMessage({ type: "success", text: "Account created successfully!" });
      }
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Signup failed!",
      });
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center  mt-5">
      <div
        className="card px-4 py-5 shadow"
        style={{ maxWidth: 400, width: "100%" }}
      >
        <h2 className="text-center">Sign Up</h2>
        {message.text && (
          <div
            className={`alert alert-${
              message.type === "error" ? "danger" : "success"
            }`}
          >
            {message.text}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="my-3">
            <input
              type="text"
              name="username"
              className="form-control"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="my-3">
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="my-3">
            <input
              type="tel"
              name="phoneNumber"
              className="form-control"
              placeholder="Phone Number"
              pattern="[0-9]{10}"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="my-3">
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="my-3">
            <input
              type="password"
              name="confirmPassword"
              className="form-control"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className=" text-center">
            <button
              type="submit"
              className="btn rounded-5 w-50 btn-primary  text-center "
            >
              Sign Up
            </button>
          </div>
        </form>
        <p className="text-center mt-2">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
