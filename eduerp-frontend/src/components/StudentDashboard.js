import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const StudentDashboard = () => {
  const [username, setUsername] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState(null); // New state for profile image
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
    localStorage.clear();
    navigate("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleViewProfile = async () => {
    if (userDetails) return;  // If the user details are already fetched, do not re-fetch.
  
    setIsLoading(true);
    setError(null);
    try {
      const storedUsername = localStorage.getItem("username");
      const response = await axios.get(`http://localhost:8080/api/auth/users/${storedUsername}`);
  
      if (response.data) {
        // Log the profile image URL to ensure it's present
        console.log("Profile Image URL:", response.data.profileImage);
  
        // If profileImage is a relative path, prepend the base URL
        const imageUrl = response.data.profileImage ? `http://localhost:8080${response.data.profileImage}` : null;
        
        // Directly set profile image from console log URL for testing
        setProfileImageUrl("https://res.cloudinary.com/dlggacuga/image/upload/v1733580548/linkedin_profille_o8u9l4.jpg");
  
        // Update the user details state with the fetched data
        setUserDetails({
          ...response.data,
          profileImage: imageUrl, // Ensure the full image URL is set
        });
      }
    } catch (err) {
      setError("Failed to fetch profile details. Please try again later.");
      console.error("Error fetching profile details:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleHomeClick = () => {
    navigate(0); // Refreshes the page programmatically
  };

  return (
    <div style={styles.container}>
      <div style={styles.topBar}>
        <div onClick={toggleMenu} style={styles.menuIconContainer}>
          <div style={styles.menuIcon}></div>
          <div style={styles.menuIcon}></div>
          <div style={styles.menuIcon}></div>
        </div>
        <h1 style={styles.title}>Student Portal</h1>
        <button onClick={handleLogout} style={styles.logoutButton}>
          Logout
        </button>
      </div>

      {isMenuOpen && (
        <div style={styles.sidebar}>
          <div style={styles.closeIconContainer} onClick={toggleMenu}>
            ✖
          </div>
          <ul style={styles.menu}>
            <li style={styles.menuItem}>
              <button style={styles.menuButtonOption} onClick={handleHomeClick}>
                Home
              </button>
            </li>
            <li style={styles.menuItem}>
              <button style={styles.menuButtonOption} onClick={handleViewProfile}>
                View Profile
              </button>
            </li>
            <li style={styles.menuItem}>
              <button style={styles.menuButtonOption}>Courses</button>
            </li>
            <li style={styles.menuItem}>
              <button style={styles.menuButtonOption}>Assignments</button>
            </li>
          </ul>
        </div>
      )}

      <div style={styles.mainContent}>
        <p style={styles.welcomeText}>Welcome, {username ? username : "Student"}!</p>

        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : userDetails && (
          <div style={styles.profileDetails}>
            <h3 style={styles.profileHeading}>Profile Details</h3>
            <div style={styles.profileImageContainer}>
              {/* Display Profile Image */}
              {profileImageUrl ? (
                <img src={profileImageUrl} alt="Profile" style={styles.profileImage} />
              ) : (
                <p>No Profile Image</p>
              )}
            </div>

            <div style={styles.profileSection}>
              <h4>Personal Information</h4>
              <p><strong>Name:</strong> {userDetails.username}</p>
              <p><strong>Email:</strong> {userDetails.email}</p>
            </div>
            <div style={styles.profileSection}>
              <h4>Academic Details</h4>
              <p><strong>Role:</strong> {userDetails.role}</p>
              <p><strong>Attendance:</strong> {userDetails.attendance || "N/A"}</p>
              <p><strong>Courses:</strong> {userDetails.courses || "N/A"}</p>
              <p><strong>Grade:</strong> {userDetails.grade || "N/A"}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Styles for the page
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
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
    height: "50px",
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
    top: "50px",
    left: "0",
    width: "250px",
    height: "calc(100vh - 50px)",
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
    width: "100%",
    height: "150%",
    flex: 1,
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ecf0f1",
    padding: "20px",
  },
  welcomeText: {
    fontSize: "24px",
    color: "#333",
  },
  profileDetails: {
    marginTop: "20px",
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "700px",
    textAlign: "left",
  },
  profileHeading: {
    fontSize: "28px",
    marginBottom: "20px",
    color: "#333",
    fontWeight: "bold",
    textAlign: "center",
  },
  profileImageContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
  },
  profileImage: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "3px solid #ccc",
  },
  profileSection: {
    marginBottom: "20px",
  },
  profileSectionTitle: {
    fontWeight: "bold",
    marginBottom: "8px",
  },
};

export default StudentDashboard;
