import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";

function Books() {
  const [books, setBooks] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
  }, []);

  // 📚 Fetch Books
  const fetchBooks = async () => {
    try {
      const res = await API.get("/books");
      setBooks(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // 📚 Issue Book
  const issueBook = async (bookId) => {
    try {
      const token = localStorage.getItem("token");
      const payload = JSON.parse(atob(token.split(".")[1]));
      const userId = payload.id;

      await API.post("/issues", { userId, bookId });

      alert("Book Issued Successfully 📚");

      fetchBooks();
    } catch (error) {
      alert(error.response?.data?.message || "Issue failed");
    }
  };

  // ⭐ Rate Book (same working route)
  const rateBook = async (bookId, rating) => {
    try {
      await API.post("/ratings", {
        bookId,
        rating
      });

      setSelectedRatings({
        ...selectedRatings,
        [bookId]: rating
      });

      alert("Rating submitted ⭐");

      fetchBooks();
    } catch (error) {
      alert("Rating failed");
    }
  };

  return (
    <div
      style={{
        padding: "30px",
        background: "#0f172a",
        minHeight: "100vh"
      }}
    >
      <h2 style={{ color: "gold", marginBottom: "20px" }}>
        📚 Library Books
      </h2>

      {/* Navigation Button */}
      <button
        onClick={() => navigate("/history")}
        style={{
          marginBottom: "20px",
          padding: "10px 20px",
          borderRadius: "8px",
          border: "none",
          background: "gold",
          fontWeight: "bold",
          cursor: "pointer"
        }}
      >
        Issue History
      </button>

      {books.map((book) => (
        <div
          key={book._id}
          style={{
            border: "1px solid gold",
            padding: "20px",
            marginBottom: "20px",
            borderRadius: "12px",
            background: "#111827",
            color: "white",
            boxShadow: "0 6px 15px rgba(0,0,0,0.6)"
          }}
        >
          <h3 style={{ color: "gold" }}>{book.title}</h3>

          <p><b>Author:</b> {book.author}</p>
          <p><b>Category:</b> {book.category}</p>
          <p><b>Available Copies:</b> {book.availableCopies}</p>

          {/* ⭐ Average Rating Display */}
          <div style={{ marginBottom: "10px" }}>
            <b>Average Rating:</b>{" "}
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                style={{
                  color:
                    star <= Math.round(book.averageRating || 0)
                      ? "gold"
                      : "#555",
                  fontSize: "18px"
                }}
              >
                ★
              </span>
            ))}

            <span style={{ marginLeft: "8px" }}>
              ({book.averageRating?.toFixed(1) || 0})
            </span>
          </div>

          {/* ⭐ Clickable Rating Stars */}
          <div style={{ fontSize: "26px", marginBottom: "15px" }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => rateBook(book._id, star)}
                style={{
                  cursor: "pointer",
                  marginRight: "6px",
                  color:
                    selectedRatings[book._id] >= star
                      ? "gold"
                      : "#444",
                  transition: "0.2s"
                }}
              >
                ★
              </span>
            ))}
          </div>

          {/* 📚 Issue Button */}
          <button
            onClick={() => issueBook(book._id)}
            disabled={book.availableCopies === 0}
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              border: "none",
              background:
                book.availableCopies === 0 ? "gray" : "gold",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            Issue Book
          </button>
        </div>
      ))}
    </div>
  );
}

export default Books;