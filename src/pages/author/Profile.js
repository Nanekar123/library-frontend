import { useEffect, useState } from "react";
import API from "../../services/api";

function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    biography: "",
    qualifications: "",
    experience: ""
  });

  const [editMode, setEditMode] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await API.get("/author/me", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfile(res.data);
    } catch (err) {
      console.log(err);
      alert("Error fetching profile. Please login again.");
    }
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const updateProfile = async () => {
    try {
      await API.put("/author/me", profile, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Profile updated successfully!");
      setEditMode(false);
      fetchProfile();
    } catch (err) {
      console.log(err);
      alert("Error updating profile");
    }
  };

  return (
    <div style={container}>
      <h2 style={title}>👤 My Profile</h2>

      <div style={field}>
        <label style={label}>Name:</label>
        {editMode ? (
          <input
            style={input}
            name="name"
            value={profile.name}
            onChange={handleChange}
          />
        ) : (
          <span style={value}>{profile.name}</span>
        )}
      </div>

      <div style={field}>
        <label style={label}>Email:</label>
        <span style={value}>{profile.email}</span>
      </div>

      <div style={field}>
        <label style={label}>Biography:</label>
        {editMode ? (
          <textarea
            style={textarea}
            name="biography"
            value={profile.biography}
            onChange={handleChange}
          />
        ) : (
          <span style={value}>{profile.biography}</span>
        )}
      </div>

      <div style={field}>
        <label style={label}>Qualifications:</label>
        {editMode ? (
          <input
            style={input}
            name="qualifications"
            value={profile.qualifications}
            onChange={handleChange}
          />
        ) : (
          <span style={value}>{profile.qualifications}</span>
        )}
      </div>

      <div style={field}>
        <label style={label}>Experience:</label>
        {editMode ? (
          <input
            style={input}
            name="experience"
            value={profile.experience}
            onChange={handleChange}
          />
        ) : (
          <span style={value}>{profile.experience} years</span>
        )}
      </div>

      {editMode ? (
        <div>
          <button style={btn} onClick={updateProfile}>
            Save
          </button>
          <button style={{ ...btn, marginLeft: "10px" }} onClick={() => setEditMode(false)}>
            Cancel
          </button>
        </div>
      ) : (
        <button style={btn} onClick={() => setEditMode(true)}>
          Edit Profile
        </button>
      )}
    </div>
  );
}

/* ================= STYLES ================= */
const container = {
  background: "#020617",
  color: "white",
  minHeight: "80vh",
  padding: "30px",
  borderRadius: "10px"
};

const title = { color: "gold", marginBottom: "20px" };
const field = { marginBottom: "15px" };
const label = { color: "gold", display: "block", marginBottom: "5px" };
const value = { display: "block", color: "white" };
const input = {
  display: "block",
  width: "100%",
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid gold",
  background: "#111",
  color: "white"
};
const textarea = {
  display: "block",
  width: "100%",
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid gold",
  background: "#111",
  color: "white",
  minHeight: "80px"
};
const btn = {
  background: "gold",
  color: "#000",
  border: "none",
  padding: "10px 20px",
  fontWeight: "bold",
  cursor: "pointer"
};

export default Profile;