import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./auth.css";

function Signup() {
  const navigate = useNavigate();
  const [data, setData] = useState({ username: "", password: "", email: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const { username, password, email } = data;

    // Validation
    if (!username.trim() || !password.trim() || !email.trim()) {
      setError("All fields are required");
      return;
    }

    // Get existing users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if username already exists (case-insensitive)
    if (users.some(u => u.username.toLowerCase() === username.trim().toLowerCase())) {
      setError("Username already exists");
      return;
    }

    // Save new user
    const newUser = {
      username: username.trim(),
      password: password.trim(),
      email: email.trim()
    };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    console.log("Signup successful", newUser);

    setError("");
    navigate("/login"); // redirect to login page
  };

  return (
    <div className="auth-container">
      
      <form  className="auth-card" onSubmit={handleSignup}>
        <h2>Create Account</h2>
        <input
          name="username"
          value={data.username}
          onChange={handleChange}
          placeholder="Username"
        />
        <input
          name="email"
          type="email"
          value={data.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          name="password"
          type="password"
          value={data.password}
          onChange={handleChange}
          placeholder="Password"
          autoComplete="new-password"
        />
        <button type="submit">Signup</button>
        <div className="auth-footer">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Login</span>
        </div>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default Signup;
