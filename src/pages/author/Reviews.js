import { useEffect, useState } from "react";
import API from "../../services/api";

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const token = localStorage.getItem("token");
  const authorId = JSON.parse(atob(token.split(".")[1])).id;

  useEffect(() => {
  const fetchReviews = () => {
    API.get(`/author/reviews/${authorId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => setReviews(res.data))
      .catch((err) => console.log(err));
  };

  fetchReviews();
}, [authorId, token]); // now React is happy

  return (
    <div style={container}>
      <h2 style={title}>💬 Reader Reviews</h2>
      {reviews.length === 0 && <p>No reviews yet.</p>}
      {reviews.map((r, i) => (
        <div key={i} style={card}>
          <h3>{r.title}</h3>
          <p>{r.review}</p>
          <p style={date}>Reviewed on: {new Date(r.created_at).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
}

const container = { padding: "20px", color: "white" };
const title = { color: "gold", marginBottom: "15px" };
const card = {
  background: "#111827",
  padding: "15px",
  marginBottom: "10px",
  border: "1px solid gold",
  borderRadius: "8px"
};
const date = { fontSize: "12px", color: "#aaa", marginTop: "5px" };

export default Reviews;