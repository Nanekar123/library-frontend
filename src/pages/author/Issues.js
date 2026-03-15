import { useEffect, useState } from "react";
import API from "../../services/api";

function Issues() {
  const [issues, setIssues] = useState([]);
  const token = localStorage.getItem("token");
  const authorId = JSON.parse(atob(token.split(".")[1])).id;

  useEffect(() => {
    API.get(`/author/issues/${authorId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => setIssues(res.data))
      .catch((err) => console.log(err));
  }, []);

  // Format date to readable string
  const formatDate = (dateStr) => {
    if (!dateStr) return "Not returned";
    const d = new Date(dateStr);
    return d.toLocaleDateString() + " " + d.toLocaleTimeString();
  };

  return (
    <div style={container}>
      <h2 style={title}>📦 Book Rentals</h2>
      <table style={table}>
        <thead style={thead}>
          <tr>
            <th style={th}>Book</th>
            <th style={th}>Issue Date</th>
            <th style={th}>Return Date</th>
            <th style={th}>Status</th>
          </tr>
        </thead>
        <tbody>
          {issues.map((i, index) => (
            <tr key={index} style={tbodyRow}>
              <td style={td}>{i.title}</td>
              <td style={td}>{formatDate(i.issueDate)}</td>
              <td style={td}>{formatDate(i.returnDate)}</td>
              <td style={{ ...td, color: i.status === "ISSUED" ? "gold" : "#10b981" }}>
                {i.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Container
const container = {
  padding: "20px",
  color: "white",
  fontFamily: "Arial, sans-serif"
};

// Title
const title = {
  color: "gold",
  marginBottom: "20px"
};

// Table
const table = {
  width: "100%",
  borderCollapse: "collapse",
  background: "#111827",
  borderRadius: "10px",
  overflow: "hidden",
  boxShadow: "0 0 10px rgba(0,0,0,0.5)"
};

const thead = {
  background: "#1f2937"
};

const th = {
  padding: "12px 15px",
  textAlign: "left",
  color: "gold",
  fontWeight: "bold",
  borderBottom: "1px solid gold"
};

const tbodyRow = {
  transition: "background 0.3s",
  cursor: "default",
  borderBottom: "1px solid #374151"
};

tbodyRow["&:hover"] = {
  background: "#374151"
};

const td = {
  padding: "12px 15px"
};

export default Issues;