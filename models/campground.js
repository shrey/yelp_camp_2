var mongoose = require("mongoose");
var campgroundSchema = new mongoose.Schema({
    name: String,
    img: String,
    desc: String,
    price: String,
    author: {
            id:{
                type:  mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }

    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});
var Campground = mongoose.model("Campground",campgroundSchema);
module.exports = Campground;