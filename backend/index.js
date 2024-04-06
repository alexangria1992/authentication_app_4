import express from "express";
import colors from "colors";
import mysql from "mysql";
import bcrypt from "bcrypt";
import cors from "cors";

//EXPRESS INITIALIZATION
const app = express();

//Express middleeware
app.use(express.json());
app.use(cors());

//DB Connection
const con = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "nodejsdb",
});

con.connect(function (err) {
  if (err) {
    console.error("erro connecting: " + err.stack);
    return;
  }
  console.log(colors.magenta("Connected to database"));
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

//BCRYPT
app.get("/hash", (req, res) => {
  bcrypt.hash("123456", 10, (err, hash) => {
    if (err) return res.json({ Error: "Error in hashing password" });
    const values = [hash];
    return res.json({ result: hash });
  });
});

//REGISTER USER
app.post("/register", (req, res) => {
  const sql = "INSERT INTO users (`name`,`email`,`password`) VALUES (?)";
  bcrypt.hash(req.body.password.toString(), 10, (err, hash) => {
    if (err) return res.json({ Error: "Error in hashing password" });
    const values = [req.body.name, req.body.email, hash];
    con.query(sql, [values], (err, result) => {
      if (err) return res.json({ Error: "Error query" });
      return res.json({ Status: "Success" });
    });
  });
});

// PORT
const port = 3000;

app.listen(port, () => {
  console.log(colors.cyan(`Server running on port ${port}`));
});
