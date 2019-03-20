let express = require('express');
let router = express.Router();
//for using mongo
let mongoose = require('mongoose');

//reference to passports
let passport = require('passport');
let favouriteController=require('../controllers/favourites');

function requiredAuth(req, res, next){
    //checking if the user is logged in
    //console.log(req.user.username);
    if(!req.isAuthenticated()){
      return res.redirect('/login');
    }
 
    next();
  }


router.get('/',requiredAuth, favouriteController.displayFavouriteList);

// GET route for the add page
router.get('/add',requiredAuth, favouriteController.displayAddFavourits);

/*Post Route processing the add*/
router.post('/add', favouriteController.processAddFavouritList);

/*GET request display EDIT page */
router.get('/edit/:id', requiredAuth, favouriteController.displayEditPage);

/* POST request to update the DB with data from Edit page */
router.post('/edit/:id',requiredAuth, favouriteController.proccessEditPage);

/**GET request to perform the delete action */
router.get('/delete/:id',requiredAuth, favouriteController.performDelete);

module.exports = router;