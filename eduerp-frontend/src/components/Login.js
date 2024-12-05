import React, { useState } from "react";
import axios from "axios";
import "./Login.css"; // Make sure to include the CSS for the layout

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("STUDENT");
    const [error, setError] = useState("");

    const handleLogin = async () => {
        try {
            const response = await axios.post("http://localhost:8080/api/auth/login", {
                username,
                password,
                role,
            });

            if (response.data.success) {
                // Store the username in localStorage after successful login
                localStorage.setItem('username', username); // Storing the username

                // Navigate to the appropriate dashboard based on role
                if (role === "STUDENT") {
                    window.location.href = "/student-dashboard";
                } else if (role === "TEACHER") {
                    window.location.href = "/teacher-dashboard";
                } else if (role === "ADMIN") {
                    window.location.href = "/admin-dashboard";
                }
            } else {
                setError("Login failed. Please try again.");
            }
        } catch (error) {
            setError("Login failed. Please try again.");
        }
    };

    return (
        <div className="login-page">
            <div className="login-image">
                {/* Left side: Image */}
                <img src="https://www.uaecentral.com/wp-content/uploads/2020/08/University-Education-1536x864.jpg" alt="Graduation" />
            </div>
            <div className="login-form">
                {/* Right side: Form */}
                <h1>Login</h1>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="STUDENT">Student</option>
                    <option value="TEACHER">Teacher</option>
                    <option value="ADMIN">Admin</option>
                </select>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleLogin}>Login</button>
                {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
        </div>
    );
};

export default Login;
