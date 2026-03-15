import { useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";

function AddBook() {
  const navigate = useNavigate();

  const [book, setBook] = useState({
    title: "",
    category: "",
    isbn: "",
    quantity: ""
  });

  const [pdf, setPdf] = useState(null);
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const addBook = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Author not logged in");
      navigate("/login?role=author");
      return;
    }

    const formData = new FormData();
    formData.append("title", book.title);
    formData.append("category", book.category);
    formData.append("isbn", book.isbn);
    formData.append("quantity", book.quantity);

    if (pdf) formData.append("pdf", pdf);
    if (image) formData.append("image", image);

    try {
      await API.post("/books/author", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        }
      });

      alert("Book submitted successfully");
      navigate("/author-dashboard");
    } catch (err) {
      console.error("BOOK SUBMIT ERROR:", err);
      alert("Error submitting book. Make sure you are logged in.");
    }
  };

  return (
    <div style={container}>
      <h2 style={title}>Add New Book</h2>

      <div style={formGroup}>
        <label style={label}>Book Title</label>
        <input
          style={input}
          name="title"
          placeholder="Enter book title"
          value={book.title}
          onChange={handleChange}
        />
      </div>

      <div style={formGroup}>
        <label style={label}>Category</label>
        <input
          style={input}
          name="category"
          placeholder="Enter book category"
          value={book.category}
          onChange={handleChange}
        />
      </div>

      <div style={formGroup}>
        <label style={label}>ISBN</label>
        <input
          style={input}
          name="isbn"
          placeholder="Enter ISBN number"
          value={book.isbn}
          onChange={handleChange}
        />
      </div>

      <div style={formGroup}>
        <label style={label}>Quantity</label>
        <input
          style={input}
          name="quantity"
          placeholder="Enter quantity"
          value={book.quantity}
          onChange={handleChange}
        />
      </div>

      <div style={formGroup}>
        <label style={label}>Upload PDF</label>
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setPdf(e.target.files[0])}
          style={fileInput}
        />
      </div>

      <div style={formGroup}>
        <label style={label}>Upload Book Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          style={fileInput}
        />
      </div>

      <button style={btn} onClick={addBook}>
        Submit Book
      </button>
    </div>
  );
}

/* ================= STYLES ================= */
const container = {
  background: "#0b0b17",
  color: "white",
  minHeight: "80vh",
  padding: "40px",
  borderRadius: "12px",
  maxWidth: "700px",
  margin: "auto",
  boxShadow: "0 4px 20px rgba(0,0,0,0.7)",
};

const title = {
  color: "gold",
  marginBottom: "30px",
  fontSize: "28px",
  fontFamily: "'Georgia', serif",
  textAlign: "center",
  textShadow: "1px 1px 6px #ffd700",
};

const formGroup = {
  marginBottom: "20px",
  display: "flex",
  flexDirection: "column",
};

const label = {
  color: "gold",
  marginBottom: "6px",
  fontWeight: "bold",
  fontSize: "14px",
  letterSpacing: "0.5px",
};

const input = {
  padding: "12px",
  borderRadius: "6px",
  border: "1px solid gold",
  background: "#111",
  color: "white",
  fontSize: "16px",
  outline: "none",
};

const fileInput = {
  color: "white",
  background: "#111",
  border: "1px solid gold",
  borderRadius: "6px",
  padding: "6px",
};

const btn = {
  background: "gold",
  color: "#000",
  border: "none",
  padding: "12px 25px",
  fontWeight: "bold",
  fontSize: "16px",
  cursor: "pointer",
  borderRadius: "8px",
  display: "block",
  margin: "30px auto 0",
  transition: "0.3s",
};
btn[':hover'] = {
  background: "#ffd700",
  transform: "scale(1.05)",
};

export default AddBook;