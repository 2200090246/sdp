import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminDashboard = () => {
  const [username, setUsername] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showAddStudentForm, setShowAddStudentForm] = useState(false);
  const [showUpdateUserForm, setShowUpdateUserForm] = useState(false);
  const [showDeleteUserForm, setShowDeleteUserForm] = useState(false); // State for delete form
  const [studentUsername, setStudentUsername] = useState("");
  const [studentPassword, setStudentPassword] = useState("");
  const [newPassword, setNewPassword] = useState(""); // New password for updating
  const [role, setRole] = useState("Student");
  const [showSearchUserForm, setShowSearchUserForm] = useState(false);
const [searchQuery, setSearchQuery] = useState("");

const [searchResults, setSearchResults] = useState(null);

  const [successMessage, setSuccessMessage] = useState("");
  const [userDetails, setUserDetails] = useState(null); // State for storing user details
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
    setShowMenu(!showMenu);
  };
  const toggleSearchUserForm = () => {
    setShowSearchUserForm(!showSearchUserForm);
  };
  

  const toggleAddStudentForm = () => {
    setShowAddStudentForm(!showAddStudentForm);
    setSuccessMessage("");
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  const toggleUpdateUserForm = () => {
    setShowUpdateUserForm(!showUpdateUserForm);
    setSuccessMessage("");
  };

  const toggleDeleteUserForm = () => {
    setShowDeleteUserForm(!showDeleteUserForm); // Toggle delete form
    setSuccessMessage("");
  };

  const handleAddStudent = async () => {
    if (!studentUsername || !studentPassword) {
      alert("Please fill out all fields before submitting.");
      return;
    }

    try {
      const response = await axios.post("https://springbootsdpbackend.up.railway.app/api/auth/users", {
        username: studentUsername,
        password: studentPassword,
        role: role,
      });

      if (response.data.success) {
        setSuccessMessage("User added successfully!");
        setStudentUsername("");
        setStudentPassword("");
        setRole("Student");
        setShowAddStudentForm(false);
      } else {
        alert("Failed to add user. Please try again.");
      }
    } catch (error) {
      alert("An error occurred while adding the user. Please try again.");
    }
  };

  const handleUpdateUser = async () => {
    if (!studentUsername || !newPassword) {
      alert("Please fill out all fields before submitting.");
      return;
    }

    try {
      const response = await axios.put("https://springbootsdpbackend.up.railway.app/api/auth/users", {
        username: studentUsername,
        password: newPassword,
      });

      if (response.data.success) {
        setSuccessMessage("User updated successfully!");
        setStudentUsername("");
        setNewPassword("");
        setShowUpdateUserForm(false);
      } else {
        alert("Failed to update user. Please try again.");
      }
    } catch (error) {
      alert("An error occurred while updating the user. Please try again.");
    }
  };
 // Assuming using fetch to call the backend API
 const handleSearch = async () => {
  if (!searchQuery.trim()) {
    console.log("Search query is empty");
    return;
  }

  try {
    const response = await axios.get(`https://springbootsdpbackend.up.railway.app/api/auth/users/search?username=${searchQuery}`);
    const data = response.data;

    if (response.status === 200 && data) {
      setSearchResults([data]); // Handle single user object wrapped in an array for consistent rendering
    } else {
      setSearchResults([]);
      console.log("No users found");
    }
  } catch (error) {
    console.error("Error fetching search results:", error);
    setSearchResults([]);
  }
};


  

  const handleDeleteUser = async () => {
    if (!studentUsername) {
      alert("Please enter a username before submitting.");
      return;
    }

    try {
      const response = await axios.delete(`https://springbootsdpbackend.up.railway.app/api/auth/users/${studentUsername}`);
      if (response.data.success) {
        setSuccessMessage("User deleted successfully!");
        setStudentUsername("");
        setShowDeleteUserForm(false);
      } else {
        alert("Failed to delete user. Please try again.");
      }
    } catch (error) {
      console.error("Error while deleting user:", error);
      alert("An error occurred while deleting the user. Please try again.");
    }
  };

  const handleViewUserDetails = async () => {
    try {
      console.log("Fetching details for:", username); // Debug
      const response = await axios.get(`https://springbootsdpbackend.up.railway.app/api/auth/users/${username}`);
      console.log("Response Data:", response.data); // Debug
      if (response.data) {
        setUserDetails(response.data);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      alert("An error occurred while fetching user details.");
    }
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
          <div style={styles.closeIconContainer} onClick={toggleMenu}>
            &times;
          </div>
          <ul style={styles.menu}>
            {!showUserMenu ? (
              <>
                <li style={styles.menuItem}>
                  <button style={styles.menuButtonOption}>Home</button>
                </li>
                <li style={styles.menuItem}>
                  <button style={styles.menuButtonOption}>View Profile</button>
                </li>
                <li style={styles.menuItem}>
  <button onClick={toggleSearchUserForm} style={styles.menuButtonOption}>
    Search user
  </button>
</li>
                <li style={styles.menuItem}>
                  <button
                    style={styles.menuButtonOption}
                    onClick={toggleUserMenu}
                  >
                    User Information
                  </button>
                </li>
              </>
            ) : (
              <>
                <li style={styles.menuItem}>
                  <button
                    style={styles.menuButtonOption}
                    onClick={toggleAddStudentForm}
                  >
                    Add User
                  </button>
                </li>
                <li style={styles.menuItem}>
                  <button
                    style={styles.menuButtonOption}
                    onClick={toggleUpdateUserForm}
                  >
                    Update User
                  </button>
                </li>
                <li style={styles.menuItem}>
                  <button
                    style={styles.menuButtonOption}
                    onClick={toggleDeleteUserForm} // Link to delete form
                  >
                    Delete User
                  </button>
                </li>
                <li style={styles.menuItem}>
                  <button
                    style={styles.menuButtonOption}
                    onClick={handleViewUserDetails} // View User Details option
                  >
                    User Details
                  </button>
                </li>
                <li style={styles.menuItem}>
                  <button
                    style={styles.menuButtonOption}
                    onClick={toggleUserMenu}
                  >
                    Back
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
      {showSearchUserForm && (
  <div style={styles.formOverlay}>
    <div style={styles.addStudentForm}>
      <div
        style={styles.closeIconContainer}
        onClick={toggleSearchUserForm}
      >
        &times;
      </div>
      <h2 style={styles.formTitle}>Search User</h2>
      <input
        type="text"
        placeholder="Enter username"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleSearch} style={styles.submitButton}>
        Search
      </button>
    </div>
  </div>
)}
{searchResults && (
  <div style={styles.searchResultsContainer}>
    <h3 style={styles.searchResultsHeader}>Search Results</h3>
    {searchResults.length > 0 ? (
      <ul style={styles.searchResultsList}>
        {searchResults.map((user, index) => (
          <li key={index} style={styles.searchResultsItem}>
            <div style={styles.searchResultsDetails}>
              {user.profileImage && (
                <img
                  src={user.profileImage}
                  alt="Profile"
                  style={styles.searchResultsProfileImage}
                />
              )}
              <div>
                <p style={styles.searchResultsItemHeader}>
                  Username: {user.username}
                </p>
                <p>Role: {user.role}</p>
                <p>Email: {user.email}</p>
              </div>
            </div>
            <p>Password: {user.password}</p>
          </li>
        ))}
      </ul>
    ) : (
      <p style={styles.searchResultsEmpty}>No users found.</p>
    )}
  </div>
)}




      {/* Add User Form */}
      {showAddStudentForm && (
        <div style={styles.formOverlay}>
          <div style={styles.addStudentForm}>
            <div style={styles.closeIconContainer} onClick={toggleAddStudentForm}>
              &times;
            </div>
            <h2 style={styles.formTitle}>Add User</h2>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={styles.input}
            >
              <option value="Student">Student</option>
              <option value="Teacher">Teacher</option>
              <option value="Admin">Admin</option>
            </select>
            <input
              type="text"
              placeholder="Username"
              value={studentUsername}
              onChange={(e) => setStudentUsername(e.target.value)}
              style={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              value={studentPassword}
              onChange={(e) => setStudentPassword(e.target.value)}
              style={styles.input}
            />
            <button onClick={handleAddStudent} style={styles.submitButton}>
              Add User
            </button>
          </div>
        </div>
      )}

      {/* Update User Form */}
      {showUpdateUserForm && (
        <div style={styles.formOverlay}>
          <div style={styles.addStudentForm}>
            <div style={styles.closeIconContainer} onClick={toggleUpdateUserForm}>
              &times;
            </div>
            <h2 style={styles.formTitle}>Update User</h2>
            <input
              type="text"
              placeholder="Username"
              value={studentUsername}
              onChange={(e) => setStudentUsername(e.target.value)}
              style={styles.input}
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              style={styles.input}
            />
            <button onClick={handleUpdateUser} style={styles.submitButton}>
              Update User
            </button>
          </div>
        </div>
      )}

      {/* Delete User Form */}
      {showDeleteUserForm && (
        <div style={styles.formOverlay}>
          <div style={styles.addStudentForm}>
            <div style={styles.closeIconContainer} onClick={toggleDeleteUserForm}>
              &times;
            </div>
            <h2 style={styles.formTitle}>Delete User</h2>
            <input
              type="text"
              placeholder="Username"
              value={studentUsername}
              onChange={(e) => setStudentUsername(e.target.value)}
              style={styles.input}
            />
            <button onClick={handleDeleteUser} style={styles.submitButton}>
              Delete User
            </button>
          </div>
        </div>
      )}

      {/* Success Message */}
      {successMessage && (
        <div style={styles.successMessage}>
          <p>{successMessage}</p>
        </div>
      )}

      {/* User Details */}
      

      {userDetails && (
  <div style={styles.userDetailsContainer}>
    <h2>User Details</h2>
    <p><strong>Username:</strong> {userDetails.username}</p>
    <p><strong>Role:</strong> {userDetails.role}</p>
    <p><strong>Email:</strong> {userDetails.email}</p>
    <p><strong>Profile Image:</strong></p>
    <img src={userDetails.profileImage} alt="Profile" style={styles.profileImage} />
    <p><strong>Last Updated:</strong> {userDetails.updatedAt}</p> {/* Use other relevant date if available */}
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
  closeIcon: {
    color: "grey",
    fontSize: "30px",
    fontWeight: "bold",
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
  formOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  addStudentForm: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    width: "300px",
    position: "relative",
  },
  formTitle: {
    fontSize: "20px",
    marginBottom: "15px",
    color: "#333",
  },
  input: {
    width: "90%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  submitButton: {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "10px",
    borderRadius: "5px",
    cursor: "pointer",
    width: "100%",
  },
  successMessage: {
    backgroundColor: "#dff0d8",
    color: "#3c763d",
    padding: "15px",
    margin: "10px",
    textAlign: "center",
    borderRadius: "5px",
  },
  searchResultsContainer: {
    marginTop: "20px",
    padding: "20px",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    width: "80%",
    margin: "20px auto",
    textAlign: "left",
    maxWidth: "600px",
  },
  searchResultsHeader: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#34495e",
    textAlign: "center",
  },
  searchResultsList: {
    listStyleType: "none",
    padding: "0",
    margin: "0",
  },
  searchResultsItem: {
    padding: "15px",
    borderBottom: "1px solid #ddd",
    display: "flex",
    flexDirection: "column",
  },
  searchResultsItemHeader: {
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: "5px",
  },
  searchResultsProfileImage: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    objectFit: "cover",
    marginRight: "10px",
    boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
  },
  searchResultsDetails: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    marginBottom: "10px",
  },
  searchResultsEmpty: {
    textAlign: "center",
    color: "#7f8c8d",
    fontSize: "16px",
    marginTop: "20px",
  },
  profileImage: {
    width: "100px",
    height: "120px",
    borderRadius: "60%",
    objectFit: "cover",
    objectPosition: "top",
    marginTop: "10px",
  },
  userDetailsContainer: {
    padding: "20px",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    margin: "20px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
};

export default AdminDashboard;
