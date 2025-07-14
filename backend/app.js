const express = require('express');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const { body, validationResult } = require('express-validator');

const app = express();
const port = 3000;
const testJwt = "1235";


app.use(express.json());
app.use(cors());

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true 
}));


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
      return res.status(400).send("All input is required");
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

//    register API
app.post('/register', async (req, res) =>{
  try{
    const {email, name, lastname, password} = req.body;

    if(!(email && name && lastname && password)){
      return res.status(400).send("All input is required");
    }

    const [rows] = await con.execute("select email from user where email = ?", [email]);

    if(rows.length > 0){
      return res.status(409).send("User already exist. Please login");
    }

    const encrypt = await bcrypt.hash(password, 10);
    
    const [rows1] = await con.execute("insert into user (email, name, lastname, password, type) values (?, ?, ?, ?, 0)", [email, name, lastname, encrypt]);

    const token = jwt.sign({email: email}, testJwt, {expiresIn: "1h"});

    return res.status(200).json(token);

  }catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
});


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
