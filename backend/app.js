const fs = require('fs');
const path = require('path');
//import express
const express = require('express');
//parse body of incoming requests
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const clubsRoutes = require('./routes/clubs-routes');
//relative path to the file, placesRoutes is a middleware
const placesRoutes = require('./routes/places-routes');
const usersRoutes = require('./routes/users-routes');
const eventsRoutes = require('./routes/events-routes');
const HttpError = require('./models/http-error');

//app object
const app = express();

/*App. use() is used to bind *application-level middleware to an 
instance of the app object which is instantiated on the creation of 
the Express server (router. use() for router-level middleware).*/

//parse for json data, extra json data and convert to regular javascript datas structures, calls next automatically to reach next middleware
app.use(bodyParser.json());

app.use('/uploads/images', express.static(path.join('uploads', 'images')));

//express will apply this middle ware on every incoming request

//This middleware is used to fix the cors error.
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

  next();
});

app.use('/api/clubs', clubsRoutes);
//routes added as middleware '/api/places' is the filter, express only forwards requests
//to placesRoutes if they start with '/api/places/(anything), or anything added to that url
app.use('/api/places', placesRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/events', eventsRoutes);

app.use((req, res, next) => { //only reached if some request didn't get a response before ^^, a request we don't want to handle
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});

//if you add another parameter express will process this as an error handling middleware function
//this function will execute if any middleware in front of it yields an error
app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, err => {
      console.log(err);
    });
  }
  if (res.headerSent) { //has response been sent already?
    return next(error);
  }
  res.status(error.code || 500); //if response not sent, 500 code something went wrong on the server
  res.json({ message: error.message || 'An unknown error occurred!' }); //send message to users
});

mongoose
  .connect(
    `mongodb+srv://evan:123@cluster0.n70jv.mongodb.net/UniventDB?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(5000);
  })
  .catch(err => {
    console.log(err);
  });
