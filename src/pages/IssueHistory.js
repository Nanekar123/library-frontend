import { useEffect, useState } from "react";
import API from "../services/api";

function IssueHistory() {

const [issues,setIssues] = useState([]);
const [selectedBook,setSelectedBook] = useState(null);
const [rating,setRating] = useState(0);
const [review,setReview] = useState("");

useEffect(()=>{
fetchIssues();
},[]);


/* ================= FETCH ISSUES ================= */

const fetchIssues = async () => {

try{

const res = await API.get("/issues");
setIssues(res.data);

}catch(error){

console.error(error);

}

};


/* ================= SUBMIT REVIEW + RETURN ================= */

const submitReviewAndReturn = async () => {

try{

const token = localStorage.getItem("token");
const payload = JSON.parse(atob(token.split(".")[1]));
const userId = payload.id;

await API.post("/reviews",{
userId,
bookId:selectedBook.book_id,
review
});

const res = await API.put(`/issues/return/${selectedBook.id}`);

alert(`Book returned. Fine: ₹${res.data.fine || 0}`);

setSelectedBook(null);
setRating(0);
setReview("");

fetchIssues();

}catch{

alert("Return failed");

}

};


/* ================= STAR DISPLAY ================= */

const renderStars = () => {

return(

<div style={{margin:"10px 0"}}>

{[1,2,3,4,5].map((star)=>(

<span
key={star}
onClick={()=>setRating(star)}
style={{
fontSize:"26px",
cursor:"pointer",
color: star <= rating ? "gold" : "gray"
}}
>
★
</span>

))}

</div>

);

};


return(

<div
style={{
minHeight:"100vh",
background:"linear-gradient(135deg,#000000,#1a1a1a,#000000)",
padding:"40px",
color:"#FFD700",
fontFamily:"Segoe UI"
}}
>

<h2 style={{textAlign:"center",marginBottom:"30px"}}>
📚 Issue History
</h2>


{issues.length===0 ?(

<p style={{textAlign:"center"}}>
No issue records found
</p>

):( 

issues.map((issue)=>(

<div
key={issue.id}
style={{
background:"rgba(0,0,0,0.8)",
border:"1px solid #FFD700",
borderRadius:"12px",
padding:"20px",
marginBottom:"20px",
boxShadow:"0 0 20px rgba(255,215,0,0.4)"
}}
>

<h3>📖 {issue.title}</h3>

<p>✍ Author: {issue.author}</p>

<p>📌 Status: {issue.status}</p>

<p>
📅 Due Date: {new Date(issue.dueDate).toLocaleDateString()}
</p>

<p>💰 Fine: ₹{issue.fine || 0}</p>


{issue.status==="ISSUED" &&(

<button
onClick={()=>setSelectedBook(issue)}
style={{
marginTop:"10px",
padding:"10px 20px",
borderRadius:"8px",
border:"none",
background:"#FFD700",
color:"#000",
fontWeight:"bold",
cursor:"pointer"
}}
>

Return Book

</button>

)}

</div>

))

)}


{/* ================= REVIEW MODAL ================= */}

{selectedBook &&(

<div
style={{
position:"fixed",
top:"0",
left:"0",
width:"100%",
height:"100%",
background:"rgba(0,0,0,0.8)",
display:"flex",
justifyContent:"center",
alignItems:"center"
}}
>

<div
style={{
background:"#111",
padding:"30px",
borderRadius:"10px",
width:"400px",
border:"1px solid gold"
}}
>

<h3>Write Review</h3>

{renderStars()}

<textarea
placeholder="Write your review..."
value={review}
onChange={(e)=>setReview(e.target.value)}
style={{
width:"100%",
height:"100px",
padding:"10px",
borderRadius:"6px",
marginBottom:"10px"
}}
/>

<button
onClick={submitReviewAndReturn}
style={{
background:"gold",
border:"none",
padding:"10px",
width:"100%",
borderRadius:"8px",
fontWeight:"bold",
cursor:"pointer"
}}
>

Submit Review & Return

</button>

</div>

</div>

)}

</div>

);

}

export default IssueHistory;