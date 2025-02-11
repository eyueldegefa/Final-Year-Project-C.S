import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:7676/api/admin/login", {
        username,
        password,
      });
      if (response.data.token) {
        localStorage.setItem("adminToken", response.data.token);
        alert("Login successful!");
        // Redirect to admin dashboard
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <h2 className="text-center">Login Page</h2>
      <form onSubmit={handleLogin} className="text-center">
        <div>
          <input
            className="w-50 p-2"
            type="text"
            placeholder="Username *"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            className="w-50 p-2"
            type="password"
            placeholder="Password *"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Link to="/admin">
          <button type="submit">Login</button>
        </Link>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default AdminLogin;
