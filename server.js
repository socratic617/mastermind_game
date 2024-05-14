const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
// allows me to stay signed in
const session = require("express-session");
//stored in mongo data base or for your browser to be consistent and stay logged in 
const MongoStore = require("connect-mongo")(session);
//enables any type of request from the browser for any request
const methodOverride = require("method-override"); 
// sends messages for things like validation errors
const flash = require("express-flash");
//connecting diff code together
const logger = require("morgan");
//load database
const connectDB = require("./config/database");
//then connect my routes
const mainRoutes = require("./routes/main");
const gameRoutes = require("./routes/game");

//Use .env file in config folder to hold sensitive data
require("dotenv").config({ path: "./config/.env" });

// Passport config for auth
require("./config/passport")(passport);

//Connect To Database
connectDB();

//Using EJS for views
app.set("view engine", "ejs");

//Static Folder
app.use(express.static("public"));

//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Logging
app.use(logger("dev"));

//Use forms for put / delete
app.use(methodOverride("_method"));//

// Setup Sessions - stored in MongoDB
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Use flash messages for errors, info, ect...
app.use(flash());

//Setup Routes to direct to the right endpoints
app.use("/", mainRoutes); //login, sign up, game config
app.use("/game", gameRoutes); // create game, new game, get game

//Server Running
app.listen(process.env.PORT, () => {
  console.log("Port number : ",process.env.PORT)
  console.log("Server is running, you better catch it!");
});
