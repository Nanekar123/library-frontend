import { Link } from "react-router-dom";

function AdminNavbar() {

  return (

    <div style={{
      background: "#222",
      color: "white",
      padding: "15px",
      display: "flex",
      justifyContent: "space-between"
    }}>

      <h3>Library Admin</h3>

      <div>

        <Link to="/admin" style={{color:"white", marginRight:"20px"}}>
          Dashboard
        </Link>

        <Link to="/books" style={{color:"white", marginRight:"20px"}}>
          Books
        </Link>

        <Link to="/" style={{color:"white"}}>
          Logout
        </Link>

      </div>

    </div>

  );

}

export default AdminNavbar;