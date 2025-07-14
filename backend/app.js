const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;


app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello!');
});

const con = mysql.createConnection({
  host: "db",
  user: "root",
  password: "1234",
  database: "mydatabase"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
