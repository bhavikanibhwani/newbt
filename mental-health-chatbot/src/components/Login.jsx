import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");  
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate=useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent page reload
    setError(""); // Clear previous errors

    try {
      const response = await axios.post("http://localhost:8080/login", {
        username,
        password},
        { headers: { "Content-Type": "application/json" } } // ✅ Ensure JSON headers
      );


      if (response.status === 200) {
        console.log("Login successful:", response.data);
        localStorage.setItem("token", response.data.token); // Store token
        alert("Login successful! Redirecting to chatbot...");
        navigate("/chat"); // Redirect to chat page
        // Redirect or update state here (e.g., navigate to a dashboard)
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError("Invalid credentials or server issue.");
    }
  };

  return (
//     <div>
//       <h2>Login</h2>
//       <form onSubmit={handleLogin}>
//         <input 
//           type="text" 
//           value={username} 
//           onChange={(e) => setUsername(e.target.value)} 
//           placeholder="username" 
//           required
//           autoComplete="username"
//         />
//         <input 
//           type="password" 
//           value={password} 
//           onChange={(e) => setPassword(e.target.value)} 
//           placeholder="Password" 
//           required
//           autoComplete="current-password"
//         />
//         <button type="submit">Login</button>
//       </form>
//       {error && <p style={{ color: "red" }}>{error}</p>} {/* Show error if login fails */}
//     </div>
//   );
// };

  <div className="container">
    <div className="center">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div className="txt_field">
          <input placeholder="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoComplete="username"
          />
          <span></span>
        </div>
        <div className="txt_field">
          <input
          placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
          
          <span></span>
      
        </div>
        {/* <div className="pass">Forget Password?</div> */}
        <input className="logbtn" type="submit" value="Login" />
        <div className="signup_link">
          Not a Member? <br></br><a href="/register">Signup</a>
        </div>
      </form>
    </div>
  </div>
);
};

export default Login;
