const express = require("express");
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const ejs = require("ejs");
const ejsMate = require("ejs-mate");
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const User = require("./models/User")
const bodyParser = require("body-parser");
const LocalStrategy = require("passport-local")
const app = express();
const PORT = 5000;

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

mongoose.connect("mongodb://127.0.0.1:27017/agritech")
.then(() => console.log("connected to db successfully"))
.catch((err) => console.log("error connecting to db"));

const sessionConfig = {
    secret : "thisisasecret",
    resave : false,
    saveUninitialized : false,
    cookie : {
        httpOnly : true,
        expires : Date.now() + 7*24*60*1000
    }
}

app.use(session(sessionConfig));

//initialize flash
app.use(flash());
// initializes Passport so it can start handling authentication
app.use(passport.initialize())
// session-based authentication for persistent login
app.use(passport.session())

//set up local strategy
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next) => {
    res.locals.currentUser = req.user || null;
    res.locals.success = req.flash("success")
    res.locals.error = req.flash("error")
    next()
})

//routes
const authRoutes = require("./routes/authRoutes");


app.use(authRoutes);

app.get("/", (req, res) => {
    res.render("homepage")
})
app.get("/weather", (req, res) => {
    res.render("weather/show")
})

app.listen(PORT, (req, res) => {
    console.log(`server is running at port ${PORT}`);
})
