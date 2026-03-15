import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function ReturnBook() {

  const navigate = useNavigate();

  const [issueId, setIssueId] = useState("");

  const returnBook = async () => {

    try {

      await API.put(`/return/${issueId}`);

      alert("Book returned successfully");

      navigate("/success");

    } catch (err) {

      alert(err.response?.data?.message || "Return failed");

    }

  };

  return (

    <div style={{ padding: "40px" }}>

      <h2>Return Book</h2>

      <input
        placeholder="Enter Issue ID"
        value={issueId}
        onChange={(e) => setIssueId(e.target.value)}
      />

      <br /><br />

      <button onClick={returnBook}>
        Return Book
      </button>

    </div>

  );

}

export default ReturnBook;