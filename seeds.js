var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comments");
var data = [
    {
        name: "Cloud's Rest",
        img: "https://images.unsplash.com/photo-1471115853179-bb1d604434e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1559&q=80",
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
    },
    {
        name: "Desert Mesa",
        img: "https://images.unsplash.com/photo-1497906539264-eb74442e37a9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80",
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
    },
    {
        name: "Cloud's Rest",
        img: "https://images.unsplash.com/photo-1528892677828-8862216f3665?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80",
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
    }
]
function seedDB(){
    Campground.remove({},function(err){
    //     if(err){
    //         console.log(err);
    //     }
    //     else{
    //         console.log("Removed the campgrounds");
    //         for(var i = 0; i<data.length; i++)
    //         {
    //             Campground.create(data[i],function(err,campground){
    //                 if(err)
    //                 {
    //                     console.log(err);
    //                 }
    //                 else{
    //                     console.log("added a campground");
    //                     //create a comment
    //                     Comment.create({
    //                         text: "This place is great, but I wish there was internet",
    //                         author: "Homer"
    //                     },function(err,comment){
    //                         if(err){
    //                             console.log(err);
    //                         }
    //                         else{
    //                                 campground.comments.push(comment);
    //                                 campground.save();
    //                                 console.log("created a new comment");
    //                         }
    //                     })
    //                 }
        
    //             })
    //         }
            
    //     };
        
    });
    //add some campgrounds
}
module.exports = seedDB;
