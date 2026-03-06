import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalIssued: 0,
    activeIssues: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const books = await API.get("/books");
    const issues = await API.get("/issues");
    const active = await API.get("/issues/active");

    setStats({
      totalBooks: books.data.length,
      totalIssued: issues.data.length,
      activeIssues: active.data.length,
    });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#000000,#1a1a1a,#000000)",
        color: "#FFD700",
        padding: "40px",
        fontFamily: "Segoe UI",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "40px" }}>
        📊 Library Dashboard
      </h2>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "30px",
          flexWrap: "wrap",
        }}
      >
        {/* TOTAL BOOKS */}
        <div style={cardStyle}>
          <h4>📚 Total Books</h4>
          <h1>{stats.totalBooks}</h1>
        </div>

        {/* TOTAL ISSUES */}
        <div style={cardStyle}>
          <h4>📖 Total Issues</h4>
          <h1>{stats.totalIssued}</h1>
        </div>

        {/* ACTIVE ISSUES */}
        <div style={cardStyle}>
          <h4>🔥 Active Issues</h4>
          <h1>{stats.activeIssues}</h1>
        </div>
      </div>
    </div>
  );
}

const cardStyle = {
  width: "260px",
  padding: "30px",
  borderRadius: "15px",
  background: "rgba(0,0,0,0.7)",
  border: "1px solid #FFD700",
  textAlign: "center",
  boxShadow: "0 0 20px rgba(255,215,0,0.5)",
  transition: "0.4s",
  cursor: "pointer",
};

export default Dashboard;