import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Registration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function captureData(e) {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:4007/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
        headers: { "Content-Type": "application/json" },
      });
      const response = await res.json();
      if (res.ok || response.msg === "Registered successfully") {
        alert(name + " registered successfully!");
        navigate("/login");
      } else {
        alert(response.msg || "Registration failed");
      }
    } catch {
      alert("Error connecting to server");
    }
  }


  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-premium p-4">
            <h2 className="text-center mb-4">Create Account</h2>
            <form onSubmit={captureData}>
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="John Doe"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="name@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                />
                <div className="form-text">We'll never share your email.</div>
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="••••••••"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                />
              </div>

              <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="termsCheck" required />
                <label className="form-check-label" htmlFor="termsCheck">
                  I agree to the terms and conditions
                </label>
              </div>

              <button type="submit" className="btn btn-primary w-100 mt-2">
                Register Account
              </button>

              <div className="text-center mt-3">
                <p className="small text-muted">
                  Already have an account? <a href="/login">Login here</a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

}

export default Registration;
