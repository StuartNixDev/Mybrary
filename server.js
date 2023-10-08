if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");

const indexRouter = require("./routes/index");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout"); //Sets default layout for multiple pages called 'layout'
app.use(expressLayouts);
app.use(express.static("public")); // public files. Javascript, stylesheets, images etc in folder called 'public'

const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Mongoose"));

app.listen(process.env.PORT || 3000); //First part allows the live server to tell us the port to listen too. For Dev we use 3000
app.use("/", indexRouter);
