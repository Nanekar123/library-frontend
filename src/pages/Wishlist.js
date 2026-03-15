import { useEffect, useState } from "react";
import API from "../services/api";

function Wishlist(){

const [books,setBooks] = useState([]);

useEffect(()=>{
fetchWishlist();
},[]);


const fetchWishlist = async () =>{

try{

const token = localStorage.getItem("token");
const payload = JSON.parse(atob(token.split(".")[1]));
const userId = payload.id;

const res = await API.get(`/wishlist/${userId}`);

setBooks(res.data);

}catch(err){

console.log(err);

}

};


return(

<div style={container}>

<h2 style={title}>❤️ My Wishlist</h2>

<div style={grid}>

{books.map((book)=>(

<div key={book.id} style={card}>

<img
src={`http://localhost:5000/${book.image_url}`}
alt={book.title}
style={{
width:"120px",
height:"150px",
objectFit:"cover",
borderRadius:"8px"
}}
/>

<h3>{book.title}</h3>

<p>{book.category}</p>

</div>

))}

</div>

</div>

);

}


const container={
background:"#0f172a",
minHeight:"100vh",
padding:"40px"
};

const title={
color:"gold",
marginBottom:"30px"
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

export default Wishlist;