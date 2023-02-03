const express = require('express');
const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.connect("mongodb://localhost:27017/db");
const app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

const cors = require("cors")
const userRouter = require("./routes/User");
const productRouter = require("./routes/Product");

const authenticate = require("./middleware/auth")

app.use(cors({ origin: "*" }))
app.use("/user", userRouter);
app.use("/product", productRouter);

app.get("/", authenticate, (req, res) => {
    res.send({ ok: true })
});



app.listen(process.env.PORT || 5500, () => {
    console.log("server started")
})