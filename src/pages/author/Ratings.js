import { useEffect, useState } from "react";
import API from "../../services/api";

function Ratings() {
  const [ratings, setRatings] = useState([]);
  const token = localStorage.getItem("token");
  const authorId = JSON.parse(atob(token.split(".")[1])).id;

  useEffect(() => {
    API.get(`/author/ratings/${authorId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => setRatings(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div style={container}>
      <h2 style={title}>⭐ Ratings</h2>
      <table style={table}>
        <thead style={thead}>
          <tr>
            <th style={th}>Book</th>
            <th style={th}>Average Rating</th>
          </tr>
        </thead>
        <tbody>
          {ratings.map((r, i) => (
            <tr key={i} style={tbodyRow}>
              <td style={td}>{r.title}</td>
              <td style={td}>⭐ {Number(r.rating || 0).toFixed(1)}</td>
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

// Table head
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

// Table body row
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

export default Ratings;