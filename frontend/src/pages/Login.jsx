// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function Login() {
//   const navigate = useNavigate();
//   const [data, setData] = useState({ username: "", password: "" });
//   const [error, setError] = useState("");

//   const handleChange = e => {
//     setData({ ...data, [e.target.name]: e.target.value });
//   };

//   const handleLogin = e => {
//     e.preventDefault();
//     const { username, password } = data;

//     const users = JSON.parse(localStorage.getItem("users")) || [];

//     const user = users.find(
//       u =>
//         u.username.toLowerCase() === username.trim().toLowerCase() &&
//         u.password === password.trim()
//     );

//     if (user) {
//       console.log("Login successful", user);
//       localStorage.setItem("currentUser", JSON.stringify(user));
//       setError("");

//       <Route
//         path="/chat"
//         element={currentUser ? <ChatLayout /> : <navigate to="/login" replace />}
//       />;
//     } else {
//       console.log("Login failed");
//       setError("Invalid username or password");
//     }
//   };
  
//   const signupFirst = () =>{
//     navigate("/signup");
//   }

//   return (
//     <div>
//       <h2>Login</h2>
//       <form onSubmit={handleLogin}>
//         <input
//           name="username"
//           value={data.username}
//           onChange={handleChange}
//           placeholder="Username"
//         />
//         <input
//           type="password"
//           name="password"
//           value={data.password}
//           onChange={handleChange}
//           placeholder="Password"
//         />
//         <button type="submit">Login</button>
       
//       </form>
//        <p>does not have account<button type="submit" onClick={signupFirst}> Signup</button></p>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//     </div>
//   );
// }

// export default Login;

import "./auth.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const matchedUser = users.find(
      (u) =>
        u.username === formData.username &&
        u.password === formData.password
    );

    if (matchedUser) {
      console.log("Login successful", matchedUser);

      // save logged-in user
      localStorage.setItem("currentUser", JSON.stringify(matchedUser));

      // ✅ REDIRECT TO CHATLAYOUT
      navigate("/");
    } else {
      alert("Invalid username or password");
    }
  };

  const signupFirst = () =>{
  navigate("/signup");
  }


  return (
    <div className="auth-container">
    <form className="auth-card" onSubmit={handleLogin}>
      <h2>Login</h2>

      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
       

      />

      <button type="submit">Login</button>
          <div className="auth-footer">
          New here?{" "}
          <span onClick={() => navigate("/signup")}>Create account</span>
        </div>
    </form>
    </div>

  );
}

export default Login;

