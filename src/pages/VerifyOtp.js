import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../services/api";

function VerifyOtp() {

const navigate = useNavigate();
const location = useLocation();

const email = location.state?.email;

const [otp, setOtp] = useState("");

const verifyOtp = async (e) => {

```
e.preventDefault();

try {

  const res = await API.post("/auth/verify-login-otp", {
    email,
    otp
  });

  const token = res.data.token;
  const role = res.data.role;
  const userId = res.data.user.id;   // ⭐ GET USER ID

  // STORE LOGIN DATA
  localStorage.setItem("token", token);
  localStorage.setItem("role", role);
  localStorage.setItem("userId", userId);   // ⭐ IMPORTANT

  // REDIRECT BASED ON ROLE
  if (role === "admin") {
    navigate("/admin-dashboard");
  }
  else if (role === "author") {
    navigate("/author-dashboard");
  }
  else {
    navigate("/books");
  }

} catch (error) {

  alert(error.response?.data?.message || "Invalid OTP");

}
```

};

return (

```
<div style={{
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#0f172a",
  color: "white"
}}>

  <div style={{
    background: "#111827",
    padding: "40px",
    borderRadius: "10px",
    width: "350px",
    textAlign: "center"
  }}>

    <h2 style={{ color: "gold" }}>Verify OTP</h2>

    <p style={{ fontSize: "14px" }}>
      OTP sent to <b>{email}</b>
    </p>

    <form onSubmit={verifyOtp}>

      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        required
        style={{
          width: "100%",
          padding: "10px",
          marginTop: "20px",
          borderRadius: "5px",
          border: "none"
        }}
      />

      <button
        type="submit"
        style={{
          width: "100%",
          padding: "10px",
          marginTop: "20px",
          background: "gold",
          border: "none",
          fontWeight: "bold",
          cursor: "pointer",
          borderRadius: "5px"
        }}
      >
        Verify OTP
      </button>

    </form>

  </div>

</div>
```

);

}

export default VerifyOtp;
