import express from "express";
import colors from "colors";
import mysql from "mysql";

//EXPRESS INITIALIZATION
const app = express();

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

// PORT
const port = 3000;

app.listen(port, () => {
  console.log(colors.cyan(`Server running on port ${port}`));
});
