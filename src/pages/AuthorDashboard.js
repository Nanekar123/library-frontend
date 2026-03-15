import { useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardHome from "./author/DashboardHome";
import MyBooks from "./author/MyBooks";
import AddBook from "./author/AddBook";
import Ratings from "./author/Ratings";
import Reviews from "./author/Reviews";
import Issues from "./author/Issues";
import Performance from "./author/Performance";
import Profile from "./author/Profile";

function AuthorDashboard() {
  const [page, setPage] = useState("dashboard");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const renderPage = () => {
    switch (page) {
      case "dashboard":
        return <DashboardHome />;
      case "books":
        return <MyBooks />;
      case "add":
        return <AddBook />;
      case "ratings":
        return <Ratings />;
      case "reviews":
        return <Reviews />;
      case "issues":
        return <Issues />;
      case "performance":
        return <Performance setPage={setPage} />;
      case "profile":
        return <Profile />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div style={container}>
      {/* Header */}
      <div style={header}>
        <h2 style={title}>📚 Author Dashboard</h2>
        <button style={logoutBtn} onClick={logout}>
          Logout
        </button>
      </div>

      {/* Navigation Bar */}
      <nav style={navBar}>
        <button style={navItem} onClick={() => setPage("dashboard")}>🏠 Dashboard</button>
        <button style={navItem} onClick={() => setPage("books")}>📚 My Books</button>
        <button style={navItem} onClick={() => setPage("add")}>Add Book</button>
        <button style={navItem} onClick={() => setPage("ratings")}>⭐ Ratings</button>
        <button style={navItem} onClick={() => setPage("reviews")}>💬 Reviews</button>
        <button style={navItem} onClick={() => setPage("issues")}>📦 Issues</button>
        <button style={navItem} onClick={() => setPage("performance")}>📊 Performance</button>
        <button style={navItem} onClick={() => setPage("profile")}>👤 Profile</button>
      </nav>

      {/* Content */}
      <div style={content}>{renderPage()}</div>
    </div>
  );
}

/* ================= STYLES ================= */
const container = {
  background: "#0a0a0f",
  minHeight: "100vh",
  color: "white",
  fontFamily: "'Roboto', sans-serif"
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "15px 30px",
  background: "#000",
  borderBottom: "3px solid gold",
  boxShadow: "0 4px 6px rgba(0,0,0,0.5)"
};

const title = {
  color: "gold",
  fontFamily: "serif",
  letterSpacing: "1px"
};

const logoutBtn = {
  background: "gold",
  color: "#000",
  border: "none",
  padding: "10px 20px",
  fontWeight: "bold",
  borderRadius: "6px",
  cursor: "pointer",
  transition: "0.3s"
};

const navBar = {
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  gap: "12px",
  padding: "15px 0",
  background: "#111",
  borderBottom: "3px solid gold",
  boxShadow: "0 3px 5px rgba(0,0,0,0.5)"
};

const navItem = {
  background: "#1a1a1a",
  border: "1px solid gold",
  color: "white",
  padding: "10px 16px",
  cursor: "pointer",
  borderRadius: "5px",
  fontWeight: "500",
  transition: "0.3s"
};

const content = {
  flex: 1,
  padding: "30px",
  background: "#0a0a0f",
  minHeight: "80vh"
};

// Hover effect for nav items
navItem[':hover'] = {
  background: "#000",
  color: "gold",
  transform: "scale(1.05)"
};

export default AuthorDashboard;