import React, { useEffect, useState } from "react";
import axios from "axios";
import './assets/style.css';  // CSS für das Styling

function Home({ onLogout }) {
  const [name, setName] = useState("");

  // Benutzerdaten abrufen
  useEffect(() => {
    const email = localStorage.getItem("userEmail");

    axios
      .post("http://localhost:3001/user-details", { email })
      .then((response) => {
        if (response.data.name) {
          setName(response.data.name); // Benutzername setzen
        } else {
          console.log("User not found");
        }
      })
      .catch((err) => console.error(err));


  }, []);

  return (
    <div>
      <h1>Event Calendar, {name}!</h1>

      <button className="logout-btn" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
}

export default Home;
