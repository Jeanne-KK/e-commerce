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
function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, testJwt);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

//    Send order
app.post('/order', verifyToken, async (req, res) => {
  const { cart, address, name, email, phone, postal, note } = req.body;
  let totalPrice = 19
  try {
    //console.log(cart);
    //console.log(address);
    //console.log(name);
    //console.log(email);
    //console.log(phone);
    //console.log(postal);
    //console.log(note);
    const productIds = cart.map(item => item.productId);
    //console.log(cart);
    //console.log(productIds);
    const [rows] = await con.execute(`SELECT * FROM productVariant WHERE p_id IN (${productIds.map(() => '?').join(',')})`, productIds);

    //    check productVariant have enough in stock 

    for (const item of cart) {
      const match = rows.find(
        row => row.v_id === item.varintID

      );
      if (!match) {
        throw new Error(`variant not found for p_id : ${item.productId}`);
      }
      if (item.quantity > match.v_stock) {
        throw new Error(`Not enough stock for p_id : ${item.productId}`);
      }
      totalPrice += match.v_price * item.quantity;
    }

  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }


  let OrderId;


  //    insert order
  try {
    const [insertOrder] = await con.execute("insert into `order` (email, o_status, o_address, o_note, o_phone, o_email, o_name, o_totalprice) values (?, 0, ?, ?, ?, ?, ?, ?)", [req.user.email, `${address} ${postal}`, note, phone, email, name, totalPrice]);
    OrderId = insertOrder.insertId;
  } catch (err) {
    console.log(err);
    return res.status(500).send("insert order err");
  }


  //    insert orderedin
  try {
    if (OrderId !== null) {
      const placeholders = cart.map(() => '(?, ?, ?)').join(', ');
      const params = cart.flatMap(item => [OrderId, item.varintID, item.quantity]);
      const sql = `INSERT INTO orderedIn (o_id, v_id, v_quantity) VALUES ${placeholders}`;
      const [insertOrderVarint] = await con.execute(`${sql}`, params);
    }
  } catch (err) {
    //    remove Order when insert orderedin fail
    const [removeOrder] = await con.execute("delete from `order` where o_id = ?", [OrderId]);
    console.log(err);
    return res.status(500).send("insert orderedin err");
  }

  //    Update product left
  try {
    const placeholders1 = cart.map((items) => `when ${items.varintID} then v_stock - ${items.quantity}`).join(' ');
    const placeholders2 = cart.map((items) => `?`).join(",");
    const params = cart.flatMap(item => [item.varintID]);
    const sql = `update productVariant set v_stock = case v_id ${placeholders1} end where v_id in (${placeholders2})`;
    const [updateOrder] = await con.execute(sql, params);

  } catch (err) {
    //    remove OrderedIn when Update fail 
    const [removeOrderedin] = await con.execute("delete from `orderedIn` where o_id = ?", [OrderId]);

    //    remove Order when Update fail 
    const [removeOrder] = await con.execute("delete from `order` where o_id = ?", [OrderId]);
    console.log(err);
    return res.status(500).send("update stock err");
  }
  return res.json({ message: "success", orderID: OrderId })
});

//    check Login
app.post('/checkLogin', verifyToken, async (req, res) => {
  try {
    return res.json({ message: "login" });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
});

//    login API
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res.status(400).send("All input is required");
    }

    const [rows] = await con.execute("select email, password from user where email = ?", [email]);

    if (rows.length > 0 && (await bcrypt.compare(password, rows[0].password))) {
      const token = jwt.sign({ email: rows[0].email }, testJwt, { expiresIn: '1h' })
      return res.status(200).json(token);
    }
    return res.status(400).send("Invalid Credentials");

  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
});

//    register API
app.post('/register', async (req, res) => {
  try {
    const { email, name, lastname, password } = req.body;

    if (!(email && name && lastname && password)) {
      return res.status(400).send("All input is required");
    }

    const [rows] = await con.execute("select email from user where email = ?", [email]);

    if (rows.length > 0) {
      return res.status(409).send("User already exist. Please login");
    }

    const encrypt = await bcrypt.hash(password, 10);

    const [rows1] = await con.execute("insert into user (email, name, lastname, password, type) values (?, ?, ?, ?, 0)", [email, name, lastname, encrypt]);

    const token = jwt.sign({ email: email }, testJwt, { expiresIn: "1h" });

    return res.status(200).json(token);

  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
});

//    get infomation API
app.post('/info', verifyToken, async (req, res) => {
  try {
    const [rows] = await con.execute("select email, name, lastname from user where email = ?", [req.user.email]);
    if (rows.length > 0) {
      return res.json({ email: rows[0].email, name: rows[0].name, lastname: rows[0].lastname });
    }
    return res.status(400).send("Invalid Credentials");

  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
});

//    get order history API
app.post('/orderhistory', verifyToken, async (req, res) => {
  try {
    const [rows] = await con.execute("select o_id, o_date, o_totalprice, o_status from `order` where email = ?", [req.user.email]);
    if (rows.length > 0) {
      return res.json(rows);
    }
    return res.status(400).send("Invalid Credentials");

  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
});

//    cancel order API
app.post('/cancelOrder', verifyToken, async (req, res) => {

  //    check orderDetail connect with user
  let rows = [];
  const { orderId } = req.body;
  try {
    const [data] = await con.execute("select v_id, v_quantity from orderedIn oi, `order` o where oi.o_id = o.o_id and o.email = ? and o.o_id = ?", [req.user.email, orderId]);
    if(data.length === 0){
      return res.status(400).send("Invalid Credentials");

    }
    rows = data;

  } catch (err) {
    return res.status(400).send("Invalid Credentials");

  }

  //    remove orderedIn with orderId cancel
  try {
    const [data] = await con.execute("delete from orderedIn where o_id = ?", [orderId]);
  } catch (err) {
    console.log("err to remove orderedIn with orderId");
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }

  //    backup order by orderId
  let backup = [];
  try {
    const [data] = await con.execute("select * from `order` where o_id = ?", [orderId]);
    backup = data;
  } catch (err) {
    console.log("err to backup order with orderId");
    console.log(err);

    //    insert orderedIn back
    const placeholders = rows.map(() => '(?, ?, ?)').join(', ');
    const params = rows.flatMap(item => [orderId, item.v_id, item.v_quantity]);
    const sql = `INSERT INTO orderedIn (o_id, v_id, v_quantity) VALUES ${placeholders}`;
    const [insertOrderVarint] = await con.execute(`${sql}`, params);
    return res.status(500).send("Internal Server Error");
  }

  //    remove order by orderId
  try {
    const [data] = await con.execute("delete from `order` where o_id = ?", [orderId]);
  } catch (err) {
    console.log("err to remove order with orderId");
    console.log(err);

    //    insert orderedIn back
    const placeholders = rows.map(() => '(?, ?, ?)').join(', ');
    const params = rows.flatMap(item => [orderId, item.v_id, item.v_quantity]);
    const sql = `INSERT INTO orderedIn (o_id, v_id, v_quantity) VALUES ${placeholders}`;
    const [insertOrderVarint] = await con.execute(`${sql}`, params);
    return res.status(500).send("Internal Server Error");
  }

  //    plus stock item from cancel order
  try {
    const placeholders1 = rows.map((items) => `when ${items.v_id} then v_stock + ${items.v_quantity}`).join(' ');
    const placeholders2 = rows.map(() => `?`).join(",");
    const params = rows.flatMap(item => [item.v_id]);
    const sql = `update productVariant set v_stock = case v_id ${placeholders1} end where v_id in (${placeholders2})`;
    const [data] = await con.execute(sql, params);

  } catch (err) {
    console.log("err to plus stock from cancel order");
    console.log(err);
    
    //    recover order
    const [insertOrder] = await con.execute("insert into `order` (o_id, email, o_date, o_status, o_address, o_note, o_phone, o_email, o_name, o_totalprice) values (?, ?, ?, 0, ?, ?, ?, ?, ?, ?)", [orderId, req.user.email, backup[0].o_date, backup[0].o_address, backup[0].o_note, backup[0].o_phone, backup[0].o_email, backup[0].o_name, backup[0].o_totalprice]);

    //    insert orderedIn back
    const placeholders = rows.map(() => '(?, ?, ?)').join(', ');
    const params = rows.flatMap(item => [orderId, item.v_id, item.v_quantity]);
    const sql = `INSERT INTO orderedIn (o_id, v_id, v_quantity) VALUES ${placeholders}`;
    const [insertOrderVarint] = await con.execute(`${sql}`, params);
    return res.status(500).send("Internal Server Error");
  }
  return res.json({status: "success"});



});

//    get order detail API
app.post('/orderdetail', verifyToken, async (req, res) => {
  const { o } = req.body;
  try {
    const [rows] = await con.execute("SELECT * FROM `order` o, orderedIn oi, productVariant v, product p WHERE p.p_id = v.p_id and v.v_id = oi.v_id and o.o_id = oi.o_id and o.o_id = ? and email = ?", [o, req.user.email]);
    if (rows.length > 0) {
      return res.json(rows);
    }
    return res.status(400).send("Invalid Credentials");

  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
});


//    get product list
app.get('/product', async (req, res) => {
  try {
    const [rows] = await con.execute("select * from product");
    return res.json(rows);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
})

//    get product showprice, name, color 
app.post('/productVariant', async (req, res) => {
  try {
    const { p } = req.body;
    const [rows] = await con.execute("SELECT DISTINCT p.p_name, v.v_color, p.p_showprice FROM product p, productVariant v WHERE p.p_id = v.p_id AND p.p_id = ?", [p]);
    return res.json(rows);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
})

//    get product size, color, stock
app.post('/productVariant2', async (req, res) => {
  try {
    const { p } = req.body;
    const [rows] = await con.execute("SELECT v_id, v_size, v_color, v_stock FROM productVariant WHERE p_id = ?", [p]);
    return res.json(rows);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
})


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
