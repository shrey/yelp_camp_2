var mongoose = require("mongoose")
var passportLocalMongoose = require("passport-local-mongoose");
var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    avatar: String,
    firstName: String,
    lastName: String,
    email: {type: String, unique: true, required: true},
    isAdmin: {type: Boolean, default: false},
    campgrounds: [
        {
             id: {
                type:  mongoose.Schema.Types.ObjectId,
                ref: "User"
             }    
        }
    ]
})
UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User",UserSchema);