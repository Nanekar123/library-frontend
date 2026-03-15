import { useEffect, useState } from "react";
import API from "../../services/api";

function MyBooks() {
  const [books, setBooks] = useState([]);

  const getAuthorId = () => {
    const token = localStorage.getItem("token");
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.id;
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const authorId = getAuthorId();
    try {
      const res = await API.get(`/ratings/author/${authorId}`);
      setBooks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={container}>
      <h1 style={title}>📚 My Books</h1>

      <table style={table}>
        <thead>
          <tr style={theadRow}>
            <th style={th}>Title</th>
            <th style={th}>Category</th>
            <th style={th}>Avg Rating</th>
            <th style={th}>Reviews</th>
          </tr>
        </thead>

        <tbody>
          {books.map((b) => (
            <tr key={b.id} style={tbodyRow}>
              <td style={td}>{b.title}</td>
              <td style={td}>{b.category}</td>
              <td style={td}>⭐ {Number(b.rating || 0).toFixed(1)}</td>
              <td style={td}>{b.reviews || 0}</td>
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
  fontFamily: "Arial, sans-serif",
};

// Title
const title = {
  color: "gold",
  marginBottom: "20px",
};

// Table
const table = {
  width: "100%",
  borderCollapse: "collapse",
  background: "#111827",
  borderRadius: "10px",
  overflow: "hidden",
  boxShadow: "0 0 10px rgba(0,0,0,0.5)",
};

// Table head row
const theadRow = {
  background: "#1f2937",
};

// Table header
const th = {
  padding: "12px 15px",
  textAlign: "left",
  color: "gold",
  fontWeight: "bold",
  borderBottom: "1px solid gold",
};

// Table body row
const tbodyRow = {
  transition: "background 0.3s",
  cursor: "default",
};

tbodyRow["&:hover"] = {
  background: "#374151",
};

// Table data
const td = {
  padding: "12px 15px",
  borderBottom: "1px solid #374151",
};

export default MyBooks;