var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comments");
var middleware = require("../middleware");
var User = require("../models/user");
//INDEX ROUTE
//change pathsss!!!
router.get("/",function(req,res){
//    console.log("route works");
    Campground.find({},function(err,allCampgrounds){
        if(err)
        {
            console.log(err);
        }
        else{
            res.render("campgrounds/index.ejs",{camps:allCampgrounds,
                                                currentUser: req.user
                                                });
        }
    })
})
	// res.render("camppage.ejs",{camps:camps});



//CREATE ROUTE
router.post("/",middleware.isLoggedIn,function(req,res){
	var newCamp = {name: req.body.campName,
                  img: req.body.url,
                  desc: req.body.desc,
                  author:{
                        id: req.user._id,
                        username: req.user.username
                  },
                  price: req.body.price
                };
                  
                
                User.findById(req.user._id,function(err,foundUser){
                    if(err){
                        req.flash("error","Some error occured");
                        res.redirect("/campgrounds");
                    }
                    else{
                        Campground.create(newCamp,function(err,campground){
                            if(err){
                                console.log(err);
                              }
                              else{
                               foundUser.campgrounds.push(campground);
                               foundUser.save();
                               res.redirect("/campgrounds");
                               }
                      })
                    }
                })
                    
	
                })


//NEW ROUTE
router.get("/new",middleware.isLoggedIn,function(req,res){
    res.render("campgrounds/new.ejs");
   
})



//SHOW ROUTE
router.get("/:id",function(req,res){
    
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err || !foundCampground)
        {
            req.flash("error","Campground Not Found")
            res.redirect("/campgrounds");
        }
        else{
            console.log(foundCampground);
            res.render("campgrounds/show.ejs",{campground:foundCampground});
        }
    })
    
})

//edit route
router.get("/:id/edit",middleware.checkCampgroundOwnership,function(req,res){
    //is user logged in
    Campground.findById(req.params.id,function(err,foundCampground){
        if(err || !foundCampground){
            res.redirect("back");
        }
        else{
            res.render("campgrounds/edit",{campground:foundCampground})
        }

    })
})
//udate route
router.put("/:id",middleware.checkCampgroundOwnership,function(req,res){
    Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        }
        else{
            req.flash("success","Edited Campground")
            res.redirect("/campgrounds/"+req.params.id);
        }
    })
})

//DESTROY ROUTE

router.delete("/:id",middleware.checkCampgroundOwnership,function(req,res){
    Campground.findByIdAndRemove(req.params.id,function(err,deletedCampground){
        if(err){
            res.redirect("/campgrounds");
        }else{
            Comment.deleteMany({"_id": {$in: deletedCampground.comments}},function(err){
                if(err)
                {
                    console.log(err);
                }
                req.flash("error","Deleted the Campground")
                res.redirect("/campgrounds");

            })
            
        }
    })
})


module.exports = router;