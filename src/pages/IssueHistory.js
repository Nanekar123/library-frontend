import { useEffect, useState } from "react";
import API from "../services/api";

function IssueHistory() {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {
      const res = await API.get("/issues");
      setIssues(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleReturn = async (id) => {
    try {
      const res = await API.put(`/issues/return/${id}`);
      alert(`Book returned. Fine: ₹${res.data.fine}`);
      fetchIssues();
    } catch (error) {
      alert("Return failed");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#000000,#1a1a1a,#000000)",
        padding: "40px",
        color: "#FFD700",
        fontFamily: "Segoe UI",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
        📚 Issue History
      </h2>

      {issues.length === 0 ? (
        <p style={{ textAlign: "center" }}>No issue records found</p>
      ) : (
        issues.map((issue) => (
          <div
            key={issue._id}
            style={{
              background: "rgba(0,0,0,0.8)",
              border: "1px solid #FFD700",
              borderRadius: "12px",
              padding: "20px",
              marginBottom: "20px",
              boxShadow: "0 0 20px rgba(255,215,0,0.4)",
              transition: "0.3s",
            }}
          >
            <h3 style={{ color: "#FFD700" }}>
              📖 {issue.bookId?.title}
            </h3>

            <p>✍ Author: {issue.bookId?.author}</p>
            <p>📌 Status: {issue.status}</p>
            <p>
              📅 Due Date:{" "}
              {new Date(issue.dueDate).toLocaleDateString()}
            </p>
            <p>💰 Fine: ₹{issue.fine}</p>

            {issue.status === "ISSUED" && (
              <button
                onClick={() => handleReturn(issue._id)}
                style={{
                  marginTop: "10px",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  border: "none",
                  background: "#FFD700",
                  color: "#000",
                  fontWeight: "bold",
                  cursor: "pointer",
                  transition: "0.3s",
                }}
                onMouseOver={(e) =>
                  (e.target.style.background = "#e6c200")
                }
                onMouseOut={(e) =>
                  (e.target.style.background = "#FFD700")
                }
              >
                Return Book
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default IssueHistory;