import React, { useState } from "react";

function Register() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  async function captureData() {
    // alert("Hii..." + name + email + password);
    const res = await fetch("http://localhost:4007/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
  }

  return (
    <div className="container mt-5">
      <h2>Student Registration form</h2>
      <form>
        {/* Added Name Column */}
        <div className="form-group">
          <label htmlFor="nameInput">Name</label>
          <input
            type="text"
            className="form-control"
            id="nameInput"
            placeholder="Enter name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
          />
        </div>

        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Accept Terms & Conditions
          </label>
        </div>

        <button
          type="submit"
          onClick={captureData}
          className="btn btn-primary mt-3"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
