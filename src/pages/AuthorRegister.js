import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function AuthorRegister(){

const navigate = useNavigate();

const [form,setForm]=useState({
name:"",
email:"",
password:"",
biography:"",
qualifications:"",
experience:"",
manuscript:null
});

const handleChange=(e)=>{
setForm({...form,[e.target.name]:e.target.value});
};

const handleFileChange=(e)=>{
setForm({...form,manuscript:e.target.files[0]});
};

const registerAuthor=async(e)=>{

e.preventDefault();

try{

const formData = new FormData();

formData.append("name",form.name);
formData.append("email",form.email);
formData.append("password",form.password);
formData.append("biography",form.biography);
formData.append("qualifications",form.qualifications);
formData.append("experience",form.experience);
formData.append("manuscript",form.manuscript);

await API.post("/auth/register-author",formData,{
headers:{
"Content-Type":"multipart/form-data"
}
});

alert("Author request submitted. Wait for admin approval.");

navigate("/login?role=author");

}catch(err){

alert(err.response?.data?.message || "Registration failed");

}

};

return(

<div style={pageStyle}>

<div style={card}>

<h2 style={title}>Author Registration</h2>

<form onSubmit={registerAuthor}>

<input name="name" placeholder="Name" style={input} onChange={handleChange}/>

<input name="email" placeholder="Email" style={input} onChange={handleChange}/>

<input type="password" name="password" placeholder="Password" style={input} onChange={handleChange}/>

<input name="qualifications" placeholder="Qualifications" style={input} onChange={handleChange}/>

<input name="experience" placeholder="Experience (years)" style={input} onChange={handleChange}/>

<textarea name="biography" placeholder="Biography" style={textarea} onChange={handleChange}></textarea>

<input
type="file"
accept=".pdf,.doc,.docx"
style={input}
onChange={handleFileChange}
/>

<button type="submit" style={btn}>Submit Request</button>

</form>

</div>

</div>

);

}

const pageStyle = {
height:"100vh",
display:"flex",
justifyContent:"center",
alignItems:"center",
background:"#0f172a"
};

const card = {
width:"380px",
padding:"40px",
borderRadius:"12px",
background:"#111827",
textAlign:"center",
boxShadow:"0 10px 25px rgba(0,0,0,0.6)"
};

const title = {
color:"gold",
marginBottom:"25px",
fontSize:"26px"
};

const input = {
width:"100%",
padding:"12px",
marginTop:"12px",
borderRadius:"6px",
border:"none",
color:"black"
};

const textarea = {
width:"100%",
padding:"12px",
marginTop:"12px",
borderRadius:"6px",
border:"none",
height:"70px"
};

const btn = {
width:"100%",
padding:"12px",
marginTop:"18px",
background:"gold",
border:"none",
borderRadius:"6px",
fontWeight:"bold",
cursor:"pointer"
};

export default AuthorRegister;