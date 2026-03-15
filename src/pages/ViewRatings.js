import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ViewRatings() {

const navigate = useNavigate();

const [ratings, setRatings] = useState([]);
const [filteredRatings, setFilteredRatings] = useState([]);

const [searchType, setSearchType] = useState("bookId");
const [searchValue, setSearchValue] = useState("");

useEffect(() => {
fetchRatings();
}, []);


/* FETCH RATINGS */

const fetchRatings = async () => {

try {

const res = await axios.get("http://localhost:5000/api/ratings/books");

setRatings(res.data);
setFilteredRatings(res.data);

} catch (error) {

console.log(error);

}

};


/* SEARCH FUNCTION */

const handleSearch = () => {

if (searchValue === "") {
setFilteredRatings(ratings);
return;
}

const filtered = ratings.filter((r) => {

if (searchType === "bookId") {
return r.bookId.toString() === searchValue;
}

if (searchType === "title") {
return r.title.toLowerCase().includes(searchValue.toLowerCase());
}

if (searchType === "rating") {
return r.rating.toString() === searchValue;
}

return true;

});

setFilteredRatings(filtered);

};


/* STAR RENDER */

const renderStars = (rating) => {

let stars = [];

for (let i = 1; i <= 5; i++) {

stars.push(

<span
key={i}
style={{
color: i <= rating ? "gold" : "#555",
fontSize: "18px"
}}
>
★
</span>

);

}

return stars;

};


return (

<div style={container}>

{/* BACK BUTTON */}

<button
onClick={() => navigate("/admin-dashboard")}
style={backBtn}
>
⬅ Back to Dashboard
</button>

<h1 style={title}>⭐ Book Ratings</h1>


{/* SEARCH BOX */}

<div style={searchBox}>

<select
value={searchType}
onChange={(e) => setSearchType(e.target.value)}
style={input}
>

<option value="bookId">Search by Book ID</option>
<option value="title">Search by Book Name</option>
<option value="rating">Search by Rating</option>

</select>


<input
type="text"
placeholder="Enter value..."
value={searchValue}
onChange={(e) => setSearchValue(e.target.value)}
style={input}
/>


<button
onClick={handleSearch}
style={searchBtn}
>
Search
</button>

</div>


{/* TABLE */}

<table style={table}>

<thead>

<tr>

<th>ID</th>
<th>Book ID</th>
<th>Book Name</th>
<th>Rating</th>
<th>Stars</th>

</tr>

</thead>

<tbody>

{filteredRatings.length > 0 ? (

filteredRatings.map((r, index) => (

<tr key={index} style={row}>

<td>{r.id}</td>
<td>{r.bookId}</td>
<td>{r.title}</td>
<td>{r.rating}</td>
<td>{renderStars(r.rating)}</td>

</tr>

))

) : (

<tr>
<td colSpan="5" style={{ padding: "20px" }}>
No Data Found
</td>
</tr>

)}

</tbody>

</table>

</div>

);

}


/* ================= STYLES ================= */

const container = {
background: "#0f172a",
minHeight: "100vh",
padding: "40px",
color: "white"
};

const title = {
color: "gold",
marginBottom: "30px",
textAlign: "center"
};

const backBtn = {
background: "gold",
border: "none",
padding: "10px 20px",
borderRadius: "8px",
cursor: "pointer",
fontWeight: "bold",
marginBottom: "20px"
};

const searchBox = {
background: "#111827",
padding: "20px",
borderRadius: "10px",
border: "1px solid gold",
marginBottom: "30px",
display: "flex",
gap: "10px",
justifyContent: "center"
};

const input = {
padding: "10px",
borderRadius: "6px",
border: "1px solid gold",
background: "#0f172a",
color: "white"
};

const searchBtn = {
background: "gold",
border: "none",
padding: "10px 20px",
borderRadius: "6px",
cursor: "pointer",
fontWeight: "bold"
};

const table = {
width: "100%",
borderCollapse: "collapse",
background: "#111827",
borderRadius: "10px",
overflow: "hidden"
};

const row = {
textAlign: "center"
};

export default ViewRatings;