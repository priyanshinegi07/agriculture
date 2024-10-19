const express = require("express");
const router = express.Router();
const User = require("../models/User");
const passport = require("passport");

router.get("/register", (req, res) => {
    try {
        res.render("auth/signup");
    }
    catch(err) {
        console.log(err);
        res.render("error");
    }
})

router.post("/register", async (req, res) => {
    try {
        const {username, email, password} = req.body;
        const oldUser = await User.exists({username, email});
        if(oldUser) {
            req.flash("error", "A user with the given username is already registered. You may login if you are the one or try using another username");
            res.redirect("/login");
            // return res.status(400).json({error: "User already exists. Please login."});
            return;
        }
        const user = new User({username, email});
        const newUser = await User.register(user, password);
        res.redirect("/login");
        // res.status(200).json({message: "Registration successful! Please login."});
    }
    catch(err) {
        console.log(err);
        res.render("auth/sigup");
        // res.status(500).json({error: "An error occurred during registration."});
    }
    
})

router.get("/login", (req, res) => {
    try {
        res.render("auth/login");
        
    }
    catch(err) {
        console.log(err);
        res.render("error");
        
    }
})

router.post("/login", 
    passport.authenticate("local", {
        failureRedirect : "/login",
        failureFlash : true,
        failureMessage : true
    }),
    //on successful login
    function(req, res) {
        try {
            const user = req.user;
            // if(!user) {
            //     req.flash("error", "User data not found. Please signup");
            //     return res.redirect("/register");
            // }
            // else {
                req.flash("success", `Welcome ${user.username}`);
            // }
            res.redirect("/");
            // res.status(200).json({message:"login successfull"});
        }
        catch(err) {
            console.log(err);
            res.redirect("/login")
            // res.status(500).json({message:"error loggin in"});
        }
    }
)

module.exports = router;