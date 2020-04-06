//COMMENT ROUTES
///campgrounds/:id/comments is already included

var express = require("express");
var router = express.Router({mergeParams: true});
var Comment = require("../models/comments")
var Campground = require("../models/campground");
var middleware = require("../middleware");
//NEW ROUTE
router.get("/new",middleware.isLoggedIn,function(req,res){
    
    Campground.findById(req.params.id,function(err,foundCampground){
        if(err){
            console.log(err);
        }
        else{
            
            res.render("comments/new",{campground:foundCampground});
        }
    })
    
});

//CREATE ROUTE

router.post("/",middleware.isLoggedIn,function(req,res){
    //lookup campground using id
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds")
        }
            else{
                Comment.create(req.body.comment,function(err,newComment){
                    if(err)
                    {
                        console.log(err);
                    }else{
                        newComment.author.id = req.user._id;
                        newComment.author.username = req.user.username;
                        newComment.save();
                        campground.comments.push(newComment);
                        campground.save();
                        res.redirect("/campgrounds/"+campground._id);
                    }
                })
            }
        }
    )
    //create new comment
    //connect new comment to campground
    //redirect to campground show page
})
//Edit route
router.get("/:id2/edit",middleware.checkCommentOwnership,function(req,res){
     
    Campground.findById(req.params.id,function(err,foundCampground){
        Comment.findById(req.params.id2,function(err,foundComment){
            res.render("comments/edit",{
                comment: foundComment,
                campground: foundCampground
            })
        })
            
    
        
    })   
});
//update route
router.put("/:id2",middleware.checkCommentOwnership,function(req,res){
    Campground.findById(req.params.id,function(err,foundCampground){
        if(err || !foundCampground)
        {
            req.flash("error","Campground Id has been changed")
            return res.redirect("back");
        }

        Comment.updateOne({"_id": req.params.id2},{ $set: {"text": req.body.text}},function(err,result){
            if(err)
            {
                console.log(err);
                res.redirect("/campgrounds");
            }
            else{
                res.redirect("/campgrounds/" + req.params.id); 
            }
        })
        
    })
})
    
    

router.delete("/:id2",middleware.checkCommentOwnership,function(req,res){
    Comment.findByIdAndDelete(req.params.id2,function(err,deleted){
        if(err){
            console.log(err);
            res.redirect("/campgrounds")
        }else{
            res.redirect("/campgrounds/" + req.params.id); 
        }
    })
})


module.exports = router;

// Comment.findByIdAndRemove(req.params.id2,function(err){
//     if(err){
//         console.log(err);
//         res.redirect("/campgrounds/" + req.params.id);
//     }
//     else
//     {
//         res.redirect("/campgrounds/" + req.params.id);
//     }    
// })




// Comment.findByIdAndUpdate(req.params.id,{"$set": {text: req.body.text}},function(err,updadtedComment){
//     if(err)
//     {
//         console.log(err);
//     }
//     res.redirect("/campgrounds/" + req.params.id);
// })