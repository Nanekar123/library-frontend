import React from "react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {

  const navigate = useNavigate();

  return (

    <div style={{
      height:"100vh",
      display:"flex",
      flexDirection:"column",
      justifyContent:"center",
      alignItems:"center",
      background:"#0f172a",
      color:"white"
    }}>

      <h1 style={{color:"gold"}}>Library Management System</h1>

      <p>Select login type</p>

      <div style={{marginTop:"20px"}}>

        <button
          style={{margin:"10px",padding:"10px 20px",background:"gold"}}
          onClick={()=>navigate("/login?role=admin")}
        >
          Admin Login
        </button>

        <button
          style={{margin:"10px",padding:"10px 20px",background:"gold"}}
          onClick={()=>navigate("/login?role=author")}
        >
          Author Login
        </button>

        <button
          style={{margin:"10px",padding:"10px 20px",background:"gold"}}
          onClick={()=>navigate("/login?role=user")}
        >
          User Login
        </button>

      </div>

    </div>

  );

};

export default Welcome;