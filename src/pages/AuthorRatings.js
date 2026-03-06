import { useEffect, useState } from "react";

function AuthorRatings() {

  const [ratings, setRatings] = useState([]);

  const fetchRatings = async () => {

    const token = localStorage.getItem("token");

    const res = await fetch(
      "http://localhost:5000/api/ratings/book",
      {
        headers: { Authorization: token }
      }
    );

    const data = await res.json();
    setRatings(data);
  };

  useEffect(() => {
    fetchRatings();
  }, []);

  return (
    <div>

      <h2>Book Ratings</h2>

      {ratings.map((r) => (
        <div key={r._id}>

          <p>User: {r.userId.name}</p>
          <p>Rating: ⭐ {r.rating}</p>
          <p>Review: {r.review}</p>

        </div>
      ))}

    </div>
  );
}

export default AuthorRatings;