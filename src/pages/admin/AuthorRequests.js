import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

function AuthorRequests() {
  const navigate = useNavigate();
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    try {
      const res = await API.get("/author/pending");
      setAuthors(res.data);
    } catch (err) {
      console.log("FETCH AUTHORS ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  /* APPROVE AUTHOR */
  const approveAuthor = async (id) => {
    try {
      await API.put(`/author/approve/${id}`);
      alert("Author Approved");
      fetchAuthors();
    } catch (err) {
      console.log("APPROVE ERROR:", err);
    }
  };

  /* REJECT AUTHOR */
  const rejectAuthor = async (id) => {
    try {
      await API.put(`/author/reject/${id}`);
      alert("Author Rejected");
      fetchAuthors();
    } catch (err) {
      console.log("REJECT ERROR:", err);
    }
  };

  if (loading)
    return <h2 style={{ textAlign: "center", color: "gold" }}>Loading...</h2>;

  return (
    <div style={container}>
      {/* Centered Back Button */}
      <div style={{ textAlign: "center", marginBottom: "25px" }}>
        <button style={backBtn} onClick={() => navigate("/admin-dashboard")}>
          ← Back to Dashboard
        </button>
      </div>

      <h1 style={title}>Pending Author Requests</h1>

      {authors.length === 0 && (
        <p style={{ textAlign: "center", color: "gold" }}>No pending authors</p>
      )}

      {authors.map((author) => (
        <div key={author.id} style={card}>
          <h3 style={{ color: "gold" }}>{author.name}</h3>
          <p><b>Email:</b> {author.email}</p>
          <p><b>Biography:</b> {author.biography}</p>
          <p><b>Qualification:</b> {author.qualifications}</p>
          <p><b>Experience:</b> {author.experience} years</p>

          {/* MANUSCRIPT VIEW */}
          {author.manuscript && (
            <a
              href={`http://localhost:5000/uploads/manuscripts/${author.manuscript}`}
              target="_blank"
              rel="noreferrer"
              style={viewBtn}
            >
              View Manuscript
            </a>
          )}

          <div style={btnBox}>
            <button style={approveBtn} onClick={() => approveAuthor(author.id)}>
              Approve
            </button>
            <button style={rejectBtn} onClick={() => rejectAuthor(author.id)}>
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

/* =================== STYLES =================== */
const container = {
  maxWidth: "900px",
  margin: "40px auto",
  padding: "20px",
  color: "white",
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
  textAlign: "center",
  color: "gold",
  marginBottom: "30px",
  letterSpacing: "1px",
};

const card = {
  background: "#111",
  padding: "25px",
  marginBottom: "20px",
  borderRadius: "12px",
  border: "2px solid gold",
  boxShadow: "0 4px 12px rgba(0,0,0,0.6)",
};

const btnBox = {
  marginTop: "15px",
  display: "flex",
  gap: "10px",
};

const approveBtn = {
  background: "gold",
  color: "#000",
  border: "none",
  padding: "10px 18px",
  fontWeight: "bold",
  borderRadius: "6px",
  cursor: "pointer",
  transition: "0.3s",
  boxShadow: "0 3px 6px rgba(0,0,0,0.4)",
};

const rejectBtn = {
  background: "red",
  color: "white",
  border: "none",
  padding: "10px 18px",
  fontWeight: "bold",
  borderRadius: "6px",
  cursor: "pointer",
  transition: "0.3s",
  boxShadow: "0 3px 6px rgba(0,0,0,0.4)",
};

const viewBtn = {
  display: "inline-block",
  marginTop: "10px",
  background: "gold",
  color: "#000",
  padding: "8px 14px",
  borderRadius: "6px",
  textDecoration: "none",
  fontWeight: "bold",
  transition: "0.3s",
  boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
};

export default AuthorRequests;