import { useEffect, useState } from "react";
import API from "../../services/api";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

function Performance() {
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalReviews: 0,
    avgRating: 0,
    totalIssues: 0
  });

  const token = localStorage.getItem("token");
  const authorId = JSON.parse(atob(token.split(".")[1])).id;

  useEffect(() => {
    API.get(`/author/performance/${authorId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => setStats(res.data))
      .catch((err) => console.log(err));
  }, []);

  // Prepare chart data
  const chartData = [
    { name: "Books", value: stats.totalBooks },
    { name: "Reviews", value: stats.totalReviews },
    { name: "Issues", value: stats.totalIssues },
    { name: "Avg Rating", value: Number(stats.avgRating) }
  ];

  return (
    <div style={container}>
      <h2 style={title}>📊 Performance Dashboard</h2>

      <div style={grid}>
        <div style={card}>
          <h3>Total Books</h3>
          <p>{stats.totalBooks}</p>
        </div>
        <div style={card}>
          <h3>Total Reviews</h3>
          <p>{stats.totalReviews}</p>
        </div>
        <div style={card}>
          <h3>Average Rating</h3>
          <p>{stats.avgRating} ⭐</p>
        </div>
        <div style={card}>
          <h3>Total Issues</h3>
          <p>{stats.totalIssues}</p>
        </div>
      </div>

      <h3 style={{ color: "gold", marginTop: "30px" }}>📈 Analytics Chart</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#555" />
          <XAxis dataKey="name" stroke="gold" />
          <YAxis stroke="gold" />
          <Tooltip contentStyle={{ backgroundColor: "#111827", border: "1px solid gold", color: "white" }} />
          <Bar dataKey="value" fill="gold" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

const container = { padding: "20px", color: "white" };
const title = { color: "gold", marginBottom: "15px" };
const grid = { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "20px" };
const card = {
  background: "#111827",
  padding: "15px",
  borderRadius: "8px",
  border: "1px solid gold",
  textAlign: "center"
};

export default Performance;