import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TeacherDashboard = () => {
  const [username, setUsername] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle the menu
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in
    const storedUsername = localStorage.getItem("username");
    if (!storedUsername) {
      // Redirect to the login page if not logged in
      navigate("/");
    } else {
      setUsername(storedUsername);
    }
  }, [navigate]);

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem("username");
    localStorage.removeItem("role");

    // Navigate back to the login page
    navigate("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div style={styles.container}>
      <div style={styles.topBar}>
        {/* Menu icon */}
        <div onClick={toggleMenu} style={styles.menuIconContainer}>
          <div style={styles.menuIcon}></div>
          <div style={styles.menuIcon}></div>
          <div style={styles.menuIcon}></div>
        </div>

        <h1 style={styles.title}>Staff Portal</h1>

        {/* Logout button */}
        <button onClick={handleLogout} style={styles.logoutButton}>
          Logout
        </button>
      </div>

      {/* Sidebar menu */}
      {isMenuOpen && (
        <div style={styles.sidebar}>
          <div style={styles.closeIconContainer} onClick={toggleMenu}>
            ✖
          </div>
          <ul style={styles.menu}>
            <li style={styles.menuItem}>
              <button style={styles.menuButtonOption}>Home</button>
            </li>
            <li style={styles.menuItem}>
              <button style={styles.menuButtonOption}>View Profile</button>
            </li>
            <li style={styles.menuItem}>
              <button style={styles.menuButtonOption}>Manage Courses</button>
            </li>
            <li style={styles.menuItem}>
              <button style={styles.menuButtonOption}>Assignments</button>
            </li>
          </ul>
        </div>
      )}

      {/* Main Content Area */}
      <div style={styles.mainContent}>
        <p style={styles.welcomeText}>Welcome, {username ? username : "Teacher"}!</p>
      </div>
    </div>
  );
};

// Inline styles for the page
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100vh", // Full height for the container
    fontFamily: "'Arial', sans-serif",
  },
  topBar: {
    backgroundColor: "#2c3e50",
    color: "white",
    textAlign: "center",
    padding: "10px 0",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "50px", // Fixed height for the header
    position: "relative",
  },
  title: {
    margin: 0,
    flex: 1,
    textAlign: "center",
  },
  logoutButton: {
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    padding: "10px 20px",
    fontSize: "16px",
    borderRadius: "5px",
    cursor: "pointer",
    position: "absolute",
    right: "20px",
    top: "10px",
  },
  menuIconContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "30px",
    height: "20px",
    margin: "10px 20px",
    cursor: "pointer",
    position: "absolute",
    left: "20px",
    top: "15px",
  },
  menuIcon: {
    width: "100%",
    height: "4px",
    backgroundColor: "#ecf0f1",
    borderRadius: "2px",
  },
  sidebar: {
    position: "absolute",
    top: "50px", // Start just below the header
    left: "0",
    width: "250px",
    height: "calc(100vh - 50px)", // Full height minus the header height
    backgroundColor: "#34495e",
    padding: "10px 0",
    boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
    zIndex: "1000",
  },
  closeIconContainer: {
    color: "#ecf0f1",
    fontSize: "24px",
    cursor: "pointer",
    textAlign: "right",
    padding: "10px 20px",
    marginBottom: "10px",
  },
  menu: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  menuItem: {
    margin: "0",
  },
  menuButtonOption: {
    width: "100%",
    backgroundColor: "transparent",
    color: "#ecf0f1",
    border: "none",
    padding: "15px 20px",
    textAlign: "left",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  mainContent: {
    flex: 1,
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ecf0f1",
  },
  welcomeText: {
    fontSize: "24px",
    color: "#333",
  },
};

export default TeacherDashboard;
