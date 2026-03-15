import { useNavigate } from "react-router-dom";
import "../styles/admin.css";

function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="admin-container">

      {/* Header */}
      <div className="top-bar">
        <h1 className="admin-title">
          👑 Admin Control Panel
        </h1>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Dashboard Buttons */}
      <div className="dashboard-grid">

        {/* AUTHOR MANAGEMENT */}
        <button
          className="dash-btn"
          onClick={() => navigate("/author-requests")}
        >
          Approve / Reject Authors
        </button>

        {/* BOOK MANAGEMENT */}
        <button
          className="dash-btn"
          onClick={() => navigate("/add-book")}
        >
          Add Book
        </button>

        <button
          className="dash-btn"
          onClick={() => navigate("/update-book")}
        >
          Edit Book
        </button>

        <button
          className="dash-btn"
          onClick={() => navigate("/delete-book")}
        >
          Delete Book
        </button>

        <button
          className="dash-btn"
          onClick={() => navigate("/view-books")}
        >
          View Books
        </button>

        {/* RATINGS */}
        <button
          className="dash-btn"
          onClick={() => navigate("/view-ratings")}
        >
          View Ratings
        </button>

      </div>
    </div>
  );
}

export default AdminDashboard;