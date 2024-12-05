import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [username, setUsername] = useState("");
  const [showMenu, setShowMenu] = useState(false); // State to toggle the menu
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (!storedUsername) {
      navigate("/");
    } else {
      setUsername(storedUsername);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    navigate("/");
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu); // Toggle menu visibility
  };

  return (
    <div style={styles.container}>
      {/* Top Header */}
      <div style={styles.topBar}>
        <h1 style={styles.title}>Admin Portal</h1>
        <button onClick={handleLogout} style={styles.logoutButton}>
          Logout
        </button>
      </div>

      {/* Menu Icon */}
      <div style={styles.menuIconContainer} onClick={toggleMenu}>
        <div style={styles.menuIcon}></div>
        <div style={styles.menuIcon}></div>
        <div style={styles.menuIcon}></div>
      </div>

      {/* Sidebar */}
      {showMenu && (
        <div style={styles.sidebar}>
          {/* Close Icon */}
          <div style={styles.closeIconContainer} onClick={toggleMenu}>
            &times;
          </div>
          
          <ul style={styles.menu}>
            <li style={styles.menuItem}>
              <button style={styles.menuButtonOption}>Home</button>
            </li>
            <li style={styles.menuItem}>
              <button style={styles.menuButtonOption}>View Profile</button>
            </li>
            <li style={styles.menuItem}>
              <button style={styles.menuButtonOption}>Add Student</button>
            </li>
            <li style={styles.menuItem}>
              <button style={styles.menuButtonOption}>Add Faculty</button>
            </li>
          </ul>

        </div>
      )}

      {/* Main Content */}
      <div style={styles.mainContent}>
        <p style={styles.welcomeText}>
          Welcome, {username ? username : "Admin"}!
        </p>
      </div>
    </div>
  );
};

// Styles for the page
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
    top: "15px", // Align within the header
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
    padding: "10px 0", // Padding around the menu items
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



export default AdminDashboard;
