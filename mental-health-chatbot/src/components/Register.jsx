import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");  
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate=useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault(); // Prevent page reload
    setErr(""); // Clear previous errors

    try {
      const response = await axios.post("http://localhost:8080/register", {
        username,
        password
      });

      console.log("Full API Response:", response); // Debugging

      if (response.status===201) {
        console.log("Registration successful:", response.data);
        localStorage.setItem("token", response.data.token); // Store token
        alert("Registration successful! Redirecting to login...");
        navigate("/login"); // ✅ Redirect to login page
      } else {
        alert(response.data?.message || "Registration failed!");
      }
    } catch (err) {
      console.error("Registration Error:", err);
      setErr("Invalid credentials or server issue.");
      alert("Invalid credentials or server issue.");
    }
  };

  return (
    <div className="container">
      <div className="center">
        <h2>Register</h2>
        {/* ✅ Wrap inputs inside a <form> */}
        <form onSubmit={handleRegister}>
          <div className="txt_field">
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              placeholder="Username" 
              required
              autoComplete="username"
              className="border p-2 mb-2"
            />
          </div>
          <div className="txt_field">
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Password" 
              required
              autoComplete="new-password"
              className="border p-2 mb-2"
            />
          </div>
          <button className="logbtn" type="submit">Register</button> {/* ✅ Use type="submit" */}
        </form>
      </div>
    </div>
  );
};

export default Register;
