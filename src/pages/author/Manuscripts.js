import { useState } from "react";
import API from "../../services/api";

function Manuscripts() {

const [title,setTitle] = useState("");
const [file,setFile] = useState(null);
const [loading,setLoading] = useState(false);

const getAuthorId = () => {
const token = localStorage.getItem("token");
if(!token) return null;

const payload = JSON.parse(atob(token.split(".")[1]));
return payload.id;
};

const submit = async () => {

if(!title || !file){
alert("Please enter title and select file");
return;
}

try{

setLoading(true);

const formData = new FormData();
formData.append("title",title);
formData.append("authorId",getAuthorId());
formData.append("file",file);

await API.post("/manuscripts",formData,{
headers:{
"Content-Type":"multipart/form-data"
}
});

alert("Manuscript uploaded successfully");

setTitle("");
setFile(null);

}catch(err){

console.log("UPLOAD ERROR:",err);
alert("Upload failed");

}finally{
setLoading(false);
}

};

return(

<div style={container}>

<h2 style={heading}>Upload Manuscript</h2>

<input
style={input}
placeholder="Book Title"
value={title}
onChange={(e)=>setTitle(e.target.value)}
/>

<input
type="file"
style={input}
onChange={(e)=>setFile(e.target.files[0])}
/>

<button style={button} onClick={submit} disabled={loading}>
{loading ? "Uploading..." : "Upload Manuscript"}
</button>

</div>

);

}

const container = {
maxWidth:"400px",
margin:"40px auto",
padding:"30px",
background:"#111827",
borderRadius:"10px",
textAlign:"center",
color:"white"
};

const heading = {
color:"gold",
marginBottom:"20px"
};

const input = {
width:"100%",
padding:"10px",
marginBottom:"15px",
borderRadius:"6px",
border:"none"
};

const button = {
width:"100%",
padding:"10px",
background:"gold",
border:"none",
borderRadius:"6px",
fontWeight:"bold",
cursor:"pointer"
};

export default Manuscripts;