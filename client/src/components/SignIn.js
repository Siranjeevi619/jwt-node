import axios from "axios";
import React, { useState } from "react";

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        "http://localhost:8000/auth/signinpage",
        {
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          password: formData.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setSuccess("Account created successfully.");
      console.log("Response:", response.data);
    } catch (error) {
      console.error(error.message);
      setError("Failed to submit the form. Please try again.");
    }
  };

  return (
    <div className="container my-5">
      <div className="card mx-auto" style={{ maxWidth: "500px" }}>
        <form className="p-4" onSubmit={handleSubmit}>
          <h2 className="text-center mb-4">Sign Up</h2>

          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingName"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <label htmlFor="floatingName">Name</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="floatingEmail"
              name="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label htmlFor="floatingEmail">Email address</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="tel"
              className="form-control"
              id="floatingPhone"
              name="phone"
              placeholder="1234567890"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <label htmlFor="floatingPhone">Phone</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="floatingConfirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <label htmlFor="floatingConfirmPassword">Confirm Password</label>
          </div>

          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
            <button type="button" className="btn btn-secondary">
              Go back
            </button>
          </div>

          <p className="mt-3 text-center">
            <a href="#" className="link-primary">
              Already have an account? Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
