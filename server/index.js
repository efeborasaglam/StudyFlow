const express = require("express")
const mongoose = require('mongoose')
const cors = require("cors")
const UsersModel = require('./models/Users')
const bcrypt = require("bcrypt");


const app = express()
app.use(express.json())
app.use(cors())

require("dotenv").config(); 

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("Failed to connect to MongoDB Atlas", err));


app.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await UsersModel.findOne({ email });
      if (!user) {
        return res.json("No record existed");
      }
  
      // Passwort überprüfen
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        res.json("Success");
      } else {
        res.json("The password is incorrect");
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});

const validatePassword = (password) => {
    // Mindestens 8 Zeichen, mindestens eine Zahl, mindestens ein Sonderzeichen und Groß- und Kleinbuchstaben
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+]).{8,}$/;
    return passwordRegex.test(password);
  };

app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
  
    if (!validatePassword(password)) {
      return res.status(400).json("Password must be at least 8 characters long, contain a number, an uppercase letter, a lowercase letter, and a special character.");
    }
  
    try {
      // Passwort hashen
      const hashedPassword = await bcrypt.hash(password, 10); // 10 ist der Salt-Round-Wert
  
      // Benutzer erstellen
      const newUser = await UsersModel.create({
        name,
        email,
        password: hashedPassword,
      });
  
      res.json(newUser);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

app.post("/user-details", (req, res) => {
    const { email } = req.body;
    UsersModel.findOne({ email: email })
        .then(users => {
            if (users) {
                res.json(users); // Sendet den Benutzer zurück
            } else {
                res.json({ message: "User not found" });
            }
        })
        .catch(err => res.status(500).json({ error: err.message }));
});


app.listen(3001, () => {
    console.log("server is running");
})