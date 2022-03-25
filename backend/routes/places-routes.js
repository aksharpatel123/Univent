const express = require('express'); //import express in every file we need express in
const { check } = require('express-validator');

const placesControllers = require('../controllers/places-controllers');
const fileUpload = require('../middleware/file-upload');
const checkAuth = require('../middleware/check-auth');

const router = express.Router(); //router that we can export and use as component in app

//.get(req,res,next), only add thie path after the intial path you have in app.js: /api/places
//add colon to get dynamic element from url /:pid
//all the actuall functionality is in places.controllers
router.get('/:pid', placesControllers.getPlaceById);

router.get('/user/:uid', placesControllers.getPlacesByUserId); //point at it not executing getPlacesByUserId, let that execute when this route is executed

router.use(checkAuth);
//any post request that targets /api/places automatically reaches this route
router.post(
  '/',
  fileUpload.single('image'),
  [
    check('title')
      .not()
      .isEmpty(),
    check('description').isLength({ min: 5 }),
    check('address')
      .not()
      .isEmpty()
  ],
  placesControllers.createPlace
);

router.patch( //update
  '/:pid',
  [
    check('title')
      .not()
      .isEmpty(),
    check('description').isLength({ min: 5 })
  ],
  placesControllers.updatePlace
);

router.delete('/:pid', placesControllers.deletePlace);

module.exports = router; //exporting router constant
