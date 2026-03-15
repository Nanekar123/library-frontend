import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function ViewBooks() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await API.get("/books");
      setBooks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={container}>
      {/* Centered Back Button */}
      <div style={{ textAlign: "center", marginBottom: "25px" }}>
        <button style={backBtn} onClick={() => navigate("/admin-dashboard")}>
          ← Back to Dashboard
        </button>
      </div>

      <h2 style={title}>📚 Library Books</h2>

      <div style={grid}>
        {books.map((book) => (
          <div key={book.id} style={card}>
            <img
              src={`http://localhost:5000/${book.image_url}`}
              alt={book.title}
              style={image}
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/120x150?text=Book";
              }}
            />

            <h3>{book.title}</h3>
            <p><b>Author:</b> {book.authorName || "Unknown"}</p>
            <p><b>Category:</b> {book.category}</p>
            <p><b>ISBN:</b> {book.isbn}</p>
            <p><b>Available:</b> {book.available}</p>

            <a
              href={`http://localhost:5000/${book.pdf_url}`}
              target="_blank"
              rel="noreferrer"
              style={pdf}
            >
              📄 Read Book
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =================== STYLES =================== */
const container = {
  background: "#0f172a",
  minHeight: "100vh",
  padding: "40px",
  fontFamily: "'Roboto', sans-serif",
};

const backBtn = {
  background: "black",
  color: "gold",
  border: "2px solid gold",
  padding: "10px 24px",
  fontWeight: "bold",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "16px",
  transition: "0.3s",
  boxShadow: "0 4px 8px rgba(0,0,0,0.4)",
};
backBtn[':hover'] = {
  background: "gold",
  color: "black",
  transform: "scale(1.05)",
};

const title = {
  color: "gold",
  marginBottom: "30px",
  textAlign: "center",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "20px",
};

const card = {
  background: "#111827",
  padding: "20px",
  borderRadius: "12px",
  color: "white",
  border: "1px solid gold",
  textAlign: "center",
  boxShadow: "0 4px 10px rgba(0,0,0,0.5)",
};

const image = {
  width: "120px",
  height: "150px",
  objectFit: "cover",
  borderRadius: "8px",
  marginBottom: "10px",
};

const pdf = {
  display: "block",
  marginTop: "10px",
  color: "gold",
  fontWeight: "bold",
  textDecoration: "none",
};

export default ViewBooks;