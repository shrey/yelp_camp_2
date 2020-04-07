var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var bodyParser = require("body-parser");
var middleware = require("../middleware");router.get("/",function(req,res){
	res.render("landing.ejs");
});
router.get("/register",function(req,res){
    res.render("register");
})
router.post("/register",function(req,res){
    console.log("route works")
    var newUser = new User({username: req.body.username,
                            firstName: req.body.firstName,
                            lastName:   req.body.lastName,
                            email: req.body.email,
                            avatar: req.body.avatar
    });
    if (req.body.adminCode == "dtusucks@123")
    {
        newUser.isAdmin = true;
    }
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
//User Profile
router.get("/users/:id",middleware.isLoggedIn,function(req,res){
    User.findById(req.params.id,function(err,foundUser){
        if(!foundUser || err){
            req.flash("error","User not found");
            res.redirect("/campgrounds");
        }
        else{
            res.render("users/show",{user: foundUser});
        }
    })
})




module.exports = router;