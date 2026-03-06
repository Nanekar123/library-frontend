import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav style={styles.navbar}>
      <h2 style={styles.logo}>Library System</h2>

      <div>
        <Link to="/dashboard" style={styles.link}>Dashboard</Link>
        <Link to="/books" style={styles.link}>Books</Link>
        <Link to="/history" style={styles.link}>Issue History</Link>

        <button onClick={handleLogout} style={styles.button}>
          Logout
        </button>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px",
    backgroundColor: "#282c34",
    color: "white",
  },
  logo: {
    margin: 0,
  },
  link: {
    color: "white",
    marginRight: "20px",
    textDecoration: "none",
  },
  button: {
    padding: "6px 12px",
    backgroundColor: "red",
    border: "none",
    color: "white",
    cursor: "pointer",
  },
};

export default Navbar;