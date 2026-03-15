import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import API from "../services/api";

function Login() {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [otp,setOtp] = useState("");
  const [otpSent,setOtpSent] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const role = params.get("role") || "user";

  /* BACK BUTTON */

  const goBack = () => {
    navigate("/");
  };

  /* LOGIN */

  const login = async () => {

    try {

      const res = await API.post("/auth/login",{
        email,
        password,
        role
      });

      alert(res.data.message || "OTP sent to email");
      setOtpSent(true);

    } catch (error) {

      alert(error.response?.data?.message || "Login Failed");

    }

  };

  /* VERIFY OTP */

  const verifyOtp = async () => {

    try {

      const res = await API.post("/auth/verify-login-otp",{
        email,
        otp
      });

      const token = res.data.token;
      const userRole = res.data.role;

      localStorage.setItem("token",token);
      localStorage.setItem("role",userRole);

      if(userRole === "admin"){
        navigate("/admin-dashboard");
      }
      else if(userRole === "author"){
        navigate("/author-dashboard");
      }
      else{
        navigate("/books");
      }

    } catch (error) {

      alert(error.response?.data?.message || "Invalid OTP");

    }

  };

  /* RESEND OTP */

  const resendOtp = async () => {

    try{
      await API.post("/auth/resend-otp",{email});
      alert("OTP resent");
    }
    catch{
      alert("Failed to resend");
    }

  };

  return (

    <div style={pageStyle}>

      <div style={card}>

        {/* BACK BUTTON */}

        <button onClick={goBack} style={backBtn}>
          Back
        </button>

        <h2 style={title}>
          {role.toUpperCase()} Login
        </h2>

        {/* EMAIL */}

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          style={input}
          onChange={(e)=>setEmail(e.target.value)}
        />

        {/* PASSWORD */}

        {!otpSent && (
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            style={input}
            onChange={(e)=>setPassword(e.target.value)}
          />
        )}

        {/* SEND OTP */}

        {!otpSent && (
          <button onClick={login} style={mainBtn}>
            Send OTP
          </button>
        )}

        {/* OTP SECTION */}

        {otpSent && (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              style={input}
              onChange={(e)=>setOtp(e.target.value)}
            />

            <button onClick={verifyOtp} style={mainBtn}>
              Verify OTP
            </button>

            <p onClick={resendOtp} style={resend}>
              Resend OTP
            </p>
          </>
        )}

        {/* REGISTER */}

       {role === "user" && (
  <p style={registerText}>
    Don't have an account?{" "}
    <Link to="/register" style={{color:"gold"}}>
      User Register
    </Link>
  </p>
)}

{role === "author" && (
  <p style={registerText}>
    Want to become an Author?{" "}
    <Link to="/author-register" style={{color:"gold"}}>
      Apply Here
    </Link>
  </p>
)}

      </div>

    </div>

  );

}

/* PAGE */

const pageStyle = {
  height:"100vh",
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  background:"#0f172a"
};

/* CARD */

const card = {
  width:"380px",
  padding:"40px",
  borderRadius:"12px",
  background:"#111827",
  textAlign:"center",
  boxShadow:"0 10px 25px rgba(0,0,0,0.6)"
};

/* TITLE */

const title = {
  color:"gold",
  marginBottom:"25px",
  fontSize:"28px"
};

/* INPUT */

const input = {
  width:"100%",
  padding:"12px",
  marginTop:"15px",
  borderRadius:"6px",
  border:"none",
  fontSize:"15px"
};

/* MAIN BUTTON */

const mainBtn = {
  width:"100%",
  padding:"12px",
  marginTop:"20px",
  background:"gold",
  border:"none",
  borderRadius:"6px",
  fontWeight:"bold",
  cursor:"pointer",
  fontSize:"15px"
};

/* BACK BUTTON */

const backBtn = {
  background:"transparent",
  border:"1px solid gold",
  color:"gold",
  padding:"6px 16px",
  borderRadius:"6px",
  cursor:"pointer",
  marginBottom:"10px"
};

/* RESEND */

const resend = {
  marginTop:"12px",
  cursor:"pointer",
  color:"gold"
};

/* REGISTER */

const registerText = {
  marginTop:"20px",
  fontSize:"14px",
  color:"white"
};

export default Login;