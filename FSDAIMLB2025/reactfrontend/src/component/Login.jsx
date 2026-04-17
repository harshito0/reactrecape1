import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:4007/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json().then(data => ({ status: res.status, data })))
      .then(({ status, data }) => {
        if (status === 200 && data.msg === "success") {
          localStorage.setItem("userName", data.name);
          navigate("/dashboard");
        } else {
          alert(data.msg || "Login failed");
        }
      })
      .catch(() => {
        alert("Server is not responding. Please check your backend.");
      });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow-premium p-4">
            <h2 className="text-center mb-4">Welcome Back</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary w-100 mt-2">
                Login to Dashboard
              </button>
              
              <div className="text-center mt-3">
                <p className="small text-muted">
                  Don't have an account? <a href="/register">Register here</a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

}

export default Login;
