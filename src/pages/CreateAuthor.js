import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function CreateAuthor(){

const navigate = useNavigate();

const [author,setAuthor] = useState({
name:"",
email:"",
password:""
});

const handleChange = (e)=>{
setAuthor({...author,[e.target.name]:e.target.value});
};

const createAuthor = async()=>{

try{

await API.post("/auth/create-author",author);

alert("Author Created Successfully");

navigate("/admin-dashboard");

}catch(error){

console.log(error);
alert("Error creating author");

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

<h1 style={title}>✍ Create Author</h1>

<div style={formCard}>

<input
name="name"
placeholder="Author Name"
onChange={handleChange}
style={input}
/>

<input
name="email"
placeholder="Author Email"
onChange={handleChange}
style={input}
/>

<input
type="password"
name="password"
placeholder="Password"
onChange={handleChange}
style={input}
/>

<button
onClick={createAuthor}
style={button}
>
Create Author
</button>

</div>

</div>

);

}


/* ================= STYLES ================= */

const container={
background:"#0f172a",
minHeight:"100vh",
padding:"40px",
display:"flex",
flexDirection:"column",
alignItems:"center",
color:"white"
};

const title={
color:"gold",
marginBottom:"30px"
};

const backBtn={
alignSelf:"flex-start",
background:"gold",
border:"none",
padding:"10px 18px",
borderRadius:"8px",
cursor:"pointer",
fontWeight:"bold",
marginBottom:"20px"
};

const formCard={
background:"#111827",
padding:"35px",
borderRadius:"12px",
border:"1px solid gold",
display:"flex",
flexDirection:"column",
gap:"15px",
width:"320px"
};

const input={
padding:"12px",
borderRadius:"8px",
border:"1px solid gold",
background:"#0f172a",
color:"white"
};

const button = {
background: "gold",
border: "none",
padding: "10px 22px",
borderRadius: "8px",
cursor: "pointer",
fontWeight: "bold",
margin: "0 auto 25px auto",
display: "block"
};

export default CreateAuthor;