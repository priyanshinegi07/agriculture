const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Crop = require("../models/Crop");
const { ObjectId } = mongoose.Types;
// const { isLoggedIn } = require("../middleware");

router.get("/crops", async (req, res) => {
    try {
        const crops = await Crop.find({});
        res.render("products/index", { crops });
    } catch (err) {
        console.error(err);
        req.flash("error", "Unable to retrieve crops.");
        res.redirect("/"); 
    }
});

router.get("/crops/:cropid",  async (req, res) => {
    const { cropid } = req.params;
    try {
        const crop = await Crop.findById(cropid);
        if (!crop) {
            req.flash("error", "Crop not found.");
            return res.redirect("/crops");
        }
        const user = req.user;
        console.log(user)
        res.render("crops/show", {crop});
    } catch (err) {
        console.error(err);
        req.flash("error", "Error fetching crop details.");
        res.redirect("/crops");
    }
});
module.exports = router;