var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var methodOverride = require("method-override");
var commentRoutes = require("./routes/comments");
var campgroundRoutes = require("./routes/campgrounds");
var indexRoutes = require("./routes/index");
var flash = require("connect-flash");
app.use(bodyParser.urlencoded({extended:true}));

var Comment = require("./models/comments")
var Campground = require("./models/campground");
var User = require("./models/user");
var seedDB = require("./seeds");
app.use(express.static(__dirname + '/public'))
app.set("view engine","ejs");
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(flash());
// Seed the database
// seedDB();

app.locals.moment = require("moment");
//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Shrey will crack GSOC in 2020",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//ADDS THE CURRENT SIGNED IN USER TO ALL THE EJS FILES INCLUDING HEADER
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});
app.use(express.static("public"));



//requiring routes
app.use(indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);




app.listen(3000,function(){
		   console.log("Yelp Camp has started at port 3000")
           });
           
