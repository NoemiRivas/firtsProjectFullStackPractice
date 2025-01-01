const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const dotenv = require("dotenv").config();
const dbConnect = require("./config/dbConnection");
const PORT = process.env.PORT;
const User = require("./routes/user");
const Product = require("./routes/products")
const cors = require('cors');
const cookieParser = require('cookie-parser');


dbConnect();
app.use(cookieParser());


app.use(cors());
 
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extends: false }));
app.use("/api/user", User);
app.use("/api/", Product)


app.listen(PORT, () => {
  console.log(`server is running at ${PORT}`);
});
