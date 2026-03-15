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

    <div style={container}>

      <h2 style={title}>📊 Library Dashboard</h2>

      <div style={grid}>

        {/* TOTAL BOOKS */}
        <div style={card}>
          <div style={icon}>📚</div>
          <h3>Total Books</h3>
          <h1 style={number}>{stats.totalBooks}</h1>
        </div>

        {/* TOTAL ISSUED */}
        <div style={card}>
          <div style={icon}>📖</div>
          <h3>Total Issues</h3>
          <h1 style={number}>{stats.totalIssued}</h1>
        </div>

        {/* ACTIVE ISSUES */}
        <div style={card}>
          <div style={icon}>🔥</div>
          <h3>Active Issues</h3>
          <h1 style={number}>{stats.activeIssues}</h1>
        </div>

      </div>

    </div>

  );

}

/* ================= STYLES ================= */

const container = {
  minHeight: "100vh",
  background: "linear-gradient(135deg,#0f0f0f,#1a1a1a,#000000)",
  padding: "60px 40px",
  fontFamily: "Segoe UI, sans-serif",
  color: "#fff",
};

const title = {
  textAlign: "center",
  marginBottom: "50px",
  fontSize: "32px",
  letterSpacing: "1px",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
  gap: "30px",
  maxWidth: "900px",
  margin: "auto",
};

const card = {
  background: "rgba(255,255,255,0.05)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "18px",
  padding: "40px",
  textAlign: "center",
  transition: "0.4s",
  boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
};

const icon = {
  fontSize: "40px",
  marginBottom: "10px",
};

const number = {
  fontSize: "42px",
  marginTop: "10px",
  color: "#FFD700",
};

export default Dashboard;