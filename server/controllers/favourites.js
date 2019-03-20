let express = require('express');
let router = express.Router();

//reference to the db schema
let myFavourit = require('../models/favourits');

module.exports.displayFavouriteList = (req, res, next)=>{
    myFavourit.find((err, favouriteList)=>{

        if(err){
            return console.error(err);
        }
        else{
           //console.log(favouriteList);
            res.render('favourit/index', {
                title: 'Favourit List',
                favouriteList: favouriteList,
                displayName: req.user? req.user.displayName:""
            });
        }
    });
}
module.exports.displayAddFavourits = (req, res, next)=>{

    res.render('favourit/add', {
        title: 'Add new Favourites',
        displayName: req.user? req.user.displayName:""
    });

}
//updated controller
module.exports.processAddFavouritList =(req, res, next)=>{

    //console.log(req.body)

    let newFavourites = myFavourit({
        "FirstName": req.body.firstName,
        "LastName": req.body.lastName,
        "Age": req.body.age
    });
    
    myFavourit.create(newFavourites, (err, myFavourit)=>{

        if(err){
            console.log(err);
            res.end(err);
        }else{

            //refresh favorite list
            res.redirect('/favourite-List');
        }
    });
}

module.exports.displayEditPage =(req, res, next)=>{

    let id=req.params.id;
    //console.log(id);
    
    myFavourit.findById(id,(err, fvObject)=>{

        if(err){
            console.log(err);
            res.end(err);
        }else{
            //show edit view 
            res.render('favourit/edit',{
                title:'Edit Information',
                favorite: fvObject,
                displayName: req.user? req.user.displayName:""
            });
        }
    });

}

module.exports.proccessEditPage=(req, res, next)=>{

    let id=req.params.id;
    //use the above id to update all property. or all

    let updateDB = myFavourit({

        "_id": id,
        "FirstName": req.body.firstName,
        "LastName": req.body.lastName,
        "Age":req.body.age
    });

    myFavourit.update({ _id:id }, updateDB, (err)=>{

        if(err){
            console.log(err);
            res.end(err);
        }else{
            res.redirect('/favourite-List');
        }
    })
}

module.exports.performDelete = (req, res, next)=>{
    
    //consol
    let id = req.params.id;
    console.log("id: " + id);
    myFavourit.remove({_id: id}, (err) => {
        if(err) {
            console.log(err);
            res.end(err);
        }
        else {
            // refresh the Favourite list
            res.redirect('/favourite-List');
        }
    });
}