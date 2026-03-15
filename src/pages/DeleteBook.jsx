import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import "../styles/admin.css";

function DeleteBook(){

const navigate = useNavigate();

const [id,setId] = useState("");

const handleDelete = async (e) => {

e.preventDefault();

try{

await API.delete(`/books/${id}`);

alert("Book deleted successfully");

setId("");

}catch(error){

console.log(error);
alert("Error deleting book");

}

};

return(

<div style={container}>

<button
onClick={()=>navigate("/admin-dashboard")}
style={backBtn}
>
⬅ Back to Dashboard
</button>

<h2 style={title}>🗑 Delete Book</h2>

<div style={card}>

<form onSubmit={handleDelete}>

<input
type="number"
placeholder="Enter Book ID"
value={id}
onChange={(e)=>setId(e.target.value)}
required
style={input}
/>

<button type="submit" style={deleteBtn}>
Delete Book
</button>

</form>

</div>

</div>

);

}


/* ================= STYLES ================= */

const container={
background:"#0f172a",
minHeight:"100vh",
display:"flex",
flexDirection:"column",
alignItems:"center",
justifyContent:"center"
};

const title={
color:"gold",
marginBottom:"20px"
};

const card={
background:"#111827",
padding:"30px",
borderRadius:"12px",
border:"1px solid gold",
textAlign:"center",
width:"320px"
};

const input={
width:"100%",
padding:"10px",
marginBottom:"20px",
borderRadius:"8px",
border:"1px solid gold"
};

const deleteBtn={
background:"#ef4444",
color:"white",
border:"none",
padding:"12px",
width:"100%",
borderRadius:"8px",
cursor:"pointer",
fontWeight:"bold"
};

const backBtn={
background:"gold",
border:"none",
padding:"10px 20px",
borderRadius:"8px",
cursor:"pointer",
fontWeight:"bold",
marginBottom:"30px"
};

export default DeleteBook;