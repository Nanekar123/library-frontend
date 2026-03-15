import React from "react";

function DashboardHome() {
  return (
    <div style={container}>
      <h1 style={title}>📚 Welcome Back, Esteemed Author!</h1>
      <p style={message}>
        Your creativity and knowledge illuminate the world. Every book you share, every idea you
        express, and every story you craft has the power to inspire minds, spark curiosity, and
        change lives. Keep pushing boundaries, nurturing imagination, and enriching the lives of
        your readers. Remember, the world of knowledge grows brighter because of your words. ✨
      </p>
      <p style={message}>
        Today is another opportunity to write, create, and leave your mark. Embrace it, for your
        words are your legacy, and your readers await the brilliance only you can bring. Keep
        going, author – the journey is as magnificent as the stories you tell. 💛
      </p>
    </div>
  );
}

const container = {
  background: "#020617",
  minHeight: "100vh",
  color: "white",
  padding: "40px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
};

const title = {
  color: "gold",
  fontSize: "36px",
  fontWeight: "bold",
  marginBottom: "25px",
  fontFamily: "'Georgia', serif",
  textShadow: "1px 1px 6px #ffd700",
};

const message = {
  fontSize: "18px",
  lineHeight: "1.8",
  maxWidth: "800px",
  marginBottom: "20px",
  color: "#f5f5f5",
};

export default DashboardHome;