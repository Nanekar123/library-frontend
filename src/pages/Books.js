import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Books(){

const [books,setBooks] = useState([]);
const [ratings,setRatings] = useState({});
const [wishlist,setWishlist] = useState([]);
const [avgRatings,setAvgRatings] = useState({});

const navigate = useNavigate();

useEffect(()=>{
fetchBooks();
fetchWishlist();
},[]);

/* ================= FETCH BOOKS ================= */

const fetchBooks = async () => {

try{

const res = await API.get("/books");
setBooks(res.data);

/* fetch avg rating for each book */

res.data.forEach((book)=>{
fetchAvgRating(book.id);
});

}catch(err){
console.log(err);
}

};

/* ================= FETCH AVG RATING ================= */

const fetchAvgRating = async (bookId) => {

try{

const res = await API.get(`/ratings/${bookId}`);

setAvgRatings((prev)=>({
...prev,
[bookId]:res.data.avgRating
}));

}catch(err){
console.log(err);
}

};

/* ================= FETCH WISHLIST ================= */

const fetchWishlist = async () => {

try{

const token = localStorage.getItem("token");
const payload = JSON.parse(atob(token.split(".")[1]));
const userId = payload.id;

const res = await API.get(`/wishlist/${userId}`);

/* FIXED: using bookId */

const ids = res.data.map((item)=>item.bookId);

setWishlist(ids);

}catch(err){
console.log(err);
}

};

/* ================= TOGGLE WISHLIST ================= */

const toggleWishlist = async (bookId) => {

try{

const token = localStorage.getItem("token");
const payload = JSON.parse(atob(token.split(".")[1]));
const userId = payload.id;

await API.post("/wishlist",{userId,bookId});

fetchWishlist();

}catch{

alert("Wishlist action failed");

}

};

/* ================= ISSUE BOOK ================= */

const issueBook = async (bookId) => {

try{

const token = localStorage.getItem("token");
const payload = JSON.parse(atob(token.split(".")[1]));
const userId = payload.id;

await API.post("/issues",{userId,bookId});

alert("📚 Book Issued Successfully");

fetchBooks();

}catch{

alert("Issue failed");

}

};

/* ================= HANDLE RATING ================= */

const handleRating = async (bookId,rating) => {

try{

setRatings({...ratings,[bookId]:rating});

await API.post("/ratings",{
bookId,
rating
});

alert("⭐ Rating submitted successfully");

fetchAvgRating(bookId);

}catch{

alert("Rating failed");

}

};

/* ================= STAR DISPLAY ================= */

const renderStars = (bookId) => {

const selectedRating = ratings[bookId] || 0;

return(

<div style={{margin:"10px 0"}}>

{[1,2,3,4,5].map((star)=>(

<span
key={star}
onClick={()=>handleRating(bookId,star)}
style={{
fontSize:"24px",
cursor:"pointer",
color: star <= selectedRating ? "gold" : "gray"
}}

>

★ </span>

))}

</div>

);

};

return(

<div style={container}>

{/* TOP BAR */}

<div style={topBar}>

<h2 style={title}>📚 Library Books</h2>

<button
onClick={()=>navigate("/wishlist")}
style={wishlistBtn}

>

❤️ Wishlist </button>

</div>

<div style={grid}>

{books.map((book)=>(

<div key={book.id} style={card}>

{/* HEART ICON */}

<div
onClick={()=>toggleWishlist(book.id)}
style={{
fontSize:"28px",
cursor:"pointer",
textAlign:"right",
color: wishlist.includes(book.id) ? "gold" : "white"
}}
>
{wishlist.includes(book.id) ? "♥" : "♡"}
</div>

<img
src={`http://localhost:5000/${book.image_url}`}
alt={book.title}
style={{
width:"120px",
height:"150px",
objectFit:"cover",
borderRadius:"8px",
marginBottom:"10px"
}}
onError={(e)=>{
e.target.src="https://via.placeholder.com/120x150?text=Book";
}}
/>

<h3>{book.title}</h3>

<p><b>Category:</b> {book.category}</p>

<p><b>Available:</b> {book.available}</p>

<a
href={`http://localhost:5000/${book.pdf_url}`}
target="_blank"
rel="noreferrer"
style={pdf}

>

📄 Read Book </a>

{renderStars(book.id)}

<p style={{color:"gold",fontSize:"14px"}}>
⭐ {avgRatings[book.id] ? Number(avgRatings[book.id]).toFixed(1) : "0"} / 5
</p>

<button
onClick={()=>issueBook(book.id)}
disabled={book.available===0}
style={button}

>

Issue Book </button>

</div>

))}

</div>

</div>

);

}

/* ================= STYLES ================= */

const container={
background:"#0f172a",
minHeight:"100vh",
padding:"40px"
};

const topBar={
display:"flex",
justifyContent:"space-between",
alignItems:"center",
marginBottom:"30px"
};

const title={
color:"gold"
};

const wishlistBtn={
background:"gold",
border:"none",
padding:"10px 20px",
borderRadius:"8px",
fontWeight:"bold",
cursor:"pointer"
};

const grid={
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",
gap:"20px"
};

const card={
background:"#111827",
padding:"20px",
borderRadius:"12px",
color:"white",
border:"1px solid gold",
textAlign:"center"
};

const pdf={
display:"block",
marginBottom:"10px",
color:"gold"
};

const button={
background:"gold",
border:"none",
padding:"10px",
borderRadius:"8px",
fontWeight:"bold",
cursor:"pointer",
width:"100%"
};

export default Books;
