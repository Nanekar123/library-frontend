import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import "../styles/admin.css";

function UpdateBook(){

const navigate = useNavigate();

const [id,setId] = useState("");
const [title,setTitle] = useState("");
const [category,setCategory] = useState("");
const [quantity,setQuantity] = useState("");
const [authorId,setAuthorId] = useState("");

const handleUpdate = async (e) => {

e.preventDefault();

try{

await API.put(`/books/${id}`,{
title,
category,
quantity,
authorId
});

alert("📚 Book updated successfully");

setId("");
setTitle("");
setCategory("");
setQuantity("");
setAuthorId("");

}catch(error){

console.log(error);
alert("Error updating book");

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

<h2 style={titleStyle}>✏ Update Book</h2>

<div style={card}>

<form onSubmit={handleUpdate}>

<input
type="number"
placeholder="Book ID"
value={id}
onChange={(e)=>setId(e.target.value)}
required
style={input}
/>

<input
type="text"
placeholder="Title"
value={title}
onChange={(e)=>setTitle(e.target.value)}
required
style={input}
/>

<input
type="text"
placeholder="Category"
value={category}
onChange={(e)=>setCategory(e.target.value)}
required
style={input}
/>

<input
type="number"
placeholder="Quantity"
value={quantity}
onChange={(e)=>setQuantity(e.target.value)}
required
style={input}
/>

<input
type="number"
placeholder="Author ID"
value={authorId}
onChange={(e)=>setAuthorId(e.target.value)}
required
style={input}
/>

<button type="submit" style={updateBtn}>
Update Book
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
justifyContent:"center",
padding:"20px"
};

const titleStyle={
color:"gold",
marginBottom:"20px"
};

const card={
background:"#111827",
padding:"30px",
borderRadius:"12px",
border:"1px solid gold",
width:"350px",
textAlign:"center"
};

const input={
width:"100%",
padding:"10px",
marginBottom:"15px",
borderRadius:"8px",
border:"1px solid gold"
};

const updateBtn={
background:"gold",
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

export default UpdateBook;