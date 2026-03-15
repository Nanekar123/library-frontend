import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function AddBook() {

const navigate = useNavigate();

const [book, setBook] = useState({
title: "",
authorId: "",
category: "",
isbn: "",
quantity: ""
});

const [pdf, setPdf] = useState(null);
const [image, setImage] = useState(null);


/* HANDLE INPUT */

const handleChange = (e) => {
setBook({ ...book, [e.target.name]: e.target.value });
};


/* FILE HANDLERS */

const handlePdfChange = (e) => {
setPdf(e.target.files[0]);
};

const handleImageChange = (e) => {
setImage(e.target.files[0]);
};


/* ADD BOOK */

const addBook = async () => {

const formData = new FormData();

formData.append("title", book.title);
formData.append("authorId", book.authorId);
formData.append("category", book.category);
formData.append("isbn", book.isbn);
formData.append("quantity", book.quantity);

if(pdf){
formData.append("pdf", pdf);
}

if(image){
formData.append("image", image);
}

try{

await API.post("/books", formData, {
headers:{
"Content-Type":"multipart/form-data"
}
});

alert("📚 Book Added Successfully");

navigate("/admin-dashboard");

}catch(error){

console.log(error);
alert("Error adding book");

}

};


return(

<div style={container}>

{/* CENTERED BACK BUTTON */}

<button
onClick={()=>navigate("/admin-dashboard")}
style={backBtn}
>
⬅ Back to Dashboard
</button>

<h2 style={title}>📚 Add Book</h2>

<div style={formCard}>

<input
name="title"
placeholder="Book Title"
onChange={handleChange}
style={input}
/>

<input
name="authorId"
placeholder="Author ID"
onChange={handleChange}
style={input}
/>

<input
name="category"
placeholder="Category"
onChange={handleChange}
style={input}
/>

<input
name="isbn"
placeholder="ISBN"
onChange={handleChange}
style={input}
/>

<input
name="quantity"
placeholder="Quantity"
onChange={handleChange}
style={input}
/>

<p style={label}>Upload Book PDF</p>

<input
type="file"
accept="application/pdf"
onChange={handlePdfChange}
style={fileInput}
/>

<p style={label}>Upload Book Cover Image</p>

<input
type="file"
accept="image/*"
onChange={handleImageChange}
style={fileInput}
/>

<button onClick={addBook} style={button}>
Add Book
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
marginBottom:"25px"
};

const backBtn={
background:"gold",
border:"none",
padding:"10px 20px",
borderRadius:"8px",
cursor:"pointer",
fontWeight:"bold",
marginBottom:"25px",
display:"block",
marginLeft:"auto",
marginRight:"auto"
};

const formCard={
background:"#111827",
padding:"30px",
borderRadius:"12px",
border:"1px solid gold",
display:"flex",
flexDirection:"column",
alignItems:"center",
width:"340px"
};

const input={
width:"100%",
padding:"10px",
marginBottom:"15px",
borderRadius:"8px",
border:"1px solid gold",
background:"#0f172a",
color:"white"
};

const label={
color:"gold",
alignSelf:"flex-start",
marginBottom:"5px"
};

const fileInput={
width:"100%",
marginBottom:"15px",
color:"white"
};

const button={
background:"gold",
border:"none",
padding:"12px",
width:"100%",
borderRadius:"10px",
fontWeight:"bold",
cursor:"pointer"
};

export default AddBook;