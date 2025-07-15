const express = require('express');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const { body, validationResult } = require('express-validator');
const path = require('path');

const app = express();
const port = 3000;
const testJwt = "1235";


app.use(express.json());
app.use(cors());
app.use('/img', express.static(path.join(__dirname, 'img')));
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

//    verify JWT token middleware
function verifyToken(req, res, next){
  const authHeader = req.headers.authorization;

  if(!authHeader){
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try{
    const decoded = jwt.verify(token, testJwt);
    req.user = decoded;
    next();
  }catch(err){
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

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

//    get infomation API
app.post('/info', verifyToken, async (req, res) =>{
  try{
    const [rows] = await con.execute("select email, name, lastname from user where email = ?", [req.user.email]);
    if(rows.length > 0){
      return res.json({email: rows[0].email, name: rows[0].name, lastname: rows[0].lastname});
    }
    return res.status(400).send("Invalid Credentials");

  }catch(err){
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
});

//    get product list
app.get('/product', async (req, res) =>{
  try{
    const [rows] = await con.execute("select * from product");
    return res.json(rows);
  }catch(err){
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
})

//    get product showprice, name, color 
app.post('/productVariant', async (req, res) =>{
  try{
    const {p} = req.body;
    const [rows] = await con.execute("SELECT DISTINCT p.p_name, v.v_color, p.p_showprice FROM product p, productVariant v WHERE p.p_id = v.p_id AND p.p_id = ?", [p]);
    return res.json(rows);
  }catch(err){
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
})

//    get product size, color, stock
app.post('/productVariant2', async (req, res) =>{
  try{
    const {p} = req.body;
    const [rows] = await con.execute("SELECT v_size, v_color, v_stock FROM productVariant WHERE p_id = ?", [p]);
    return res.json(rows);
  }catch(err){
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
})


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
