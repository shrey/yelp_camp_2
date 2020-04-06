var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var bodyParser = require("body-parser");

router.get("/",function(req,res){
	res.render("landing.ejs");
});
router.get("/register",function(req,res){
    res.render("register");
})
router.post("/register",function(req,res){
    console.log("route works")
    var newUser = new User({username: req.body.username});
    User.register(newUser,req.body.password,function(err,user){
        if(err)
        {
            req.flash("error",err.message);
            console.log(err);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req,res,function(){
            req.flash("success","Welcome to yelp camp " + user.username);
            res.redirect("/campgrounds");
        })
    })
})
//show login form
router.get("/login",function(req,res){
    res.render("login");
})
//login post request
router.post("/login",passport.authenticate("local",
{
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}),function(req,res){
    
})
//logout
router.get("/logout",function(req,res){
    req.logout();
    req.flash("success","Logged you out");
    res.redirect("/campgrounds");
})




module.exports = router;