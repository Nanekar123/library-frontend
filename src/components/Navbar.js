import { Link, useNavigate } from "react-router-dom";

function Navbar(){

const navigate=useNavigate();

const logout=()=>{

localStorage.removeItem("token");
navigate("/login");

};

return(

<nav style={nav}>

<h3 style={{color:"gold"}}>📚 Library</h3>

<div>

<Link to="/books" style={link}>
Books
</Link>

<Link to="/history" style={link}>
Issue History
</Link>

</div>

<button onClick={logout} style={btn}>
Logout
</button>

</nav>

);

}

const nav={
display:"flex",
justifyContent:"space-between",
alignItems:"center",
background:"#111",
padding:"15px 30px"
};

const link={
color:"gold",
marginRight:"20px",
textDecoration:"none"
};

const btn={
background:"gold",
border:"none",
padding:"8px 16px",
borderRadius:"6px",
cursor:"pointer"
};

export default Navbar;