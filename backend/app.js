const express = require('express');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');

const app = express();
const port = 3000;
const testJwt = "1235";


app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello!');
});


//    connect database
const con = mysql.createPool({
  host: "db",
  user: "root",
  password: "1234",
  database: "mydatabase"
}).promise();


//    login API
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if(!(email && password)){
      return res.status(400).send("All input is requried");
    }
    
    const [rows] = await con.execute("select email, password from user where email = ?", [email]);

    if(rows.length > 0 && (await bcrypt.compare(password, rows[0].password))){
      const token = jwt.sign({email: rows[0].email}, testJwt, {expiresIn: '1h'})
      
      return res.status(200).json(token);
    }
    return res.status(400).send("Invalid Credentials");

  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
});



app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
