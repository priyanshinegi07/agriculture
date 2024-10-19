const mongoose = require("mongoose")
const User = require("./User")
const cropSchema = new mongoose.Schema({
    name : String,
    price : Number,
    img : String,
    desc : String,
    // createdBy : {
    //     type : mongoose.Schema.Types.ObjectId,
    //     ref : "User",
    //     // required : true,
        

    // },
    // reviews : [
    //     {
    //         type : mongoose.Schema.Types.ObjectId,
    //         ref : "Review"
    //     }
    // ]
})

const Crop = mongoose.model("Crop", cropSchema)
module.exports = Crop