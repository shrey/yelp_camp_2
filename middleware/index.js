var middlewareObj = {};
var Campground = require("../models/campground")
var Comment = require("../models/comments")
middlewareObj.checkCampgroundOwnership = function(req,res,next)
    {
        if(req.isAuthenticated())
            {
                Campground.findById(req.params.id,function(err,foundCampground){
                    if(err || !foundCampground){
                        req.flash("error","Campground Not Found");
                        console.log(err);
                        res.redirect("back")
                    }
                    else{
                        if(foundCampground.author.id.equals(req.user._id))    
                            {
                                next();
                            }
                            else
                            {
                                req.flash("error","You don't have permission to do that")
                                res.redirect("back");
                            }
                    }
                    
                }) 
            }    
    };


middlewareObj.checkCommentOwnership = function(req,res,next)
{
    if(req.isAuthenticated())
    {
        Comment.findById(req.params.id2,function(err,foundComment){
            if(err || !foundComment){
                console.log(err);
                req.flash("error","Comment not found")
                res.redirect("back")
            }
            else{
                if(foundComment.author.id.equals(req.user._id))    
                    {
                       next();
                    }
                    else{
                        res.redirect("back");
                    }
            }
            }) 
    } 

};
middlewareObj.isLoggedIn = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    else{
        req.flash("error","You need to be logged in to do that")
        res.redirect("/login");
    }
}
module.exports = middlewareObj;
