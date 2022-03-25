const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const HttpError = require('../models/http-error');
const Club = require('../models/club');
const Event = require('../models/event');

const createEvent = async (req, res, next) => {
    const {clubId, eventname, year, month, day, hour, location } = req.body;
    let images = [];
    let date_string = year + '-' + month + '-' + day;
    console.log(date_string);
    //let date = new Date(date_string);
    let club
    try{
        club = await Club.findById(clubId);
    } catch(err) {
        return next(new HttpError('Something went wrong, could not find club by id.', 500));
    }
    if(!club){
        return next(new HttpError('Could not find club for pvoided id', 404));
    }
    const clubObj = club.toObject({getters: true});
    let club_img = clubObj.image;
    const createdEvent = new Event({
        eventname,
        date: date_string,
        time: hour,
        location,
        images,
        club_img,
        club: clubId
    });
    
    try{
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await createdEvent.save({ session: sess })
        console.log("HEEEEEEEEEEEEEEEEEEEEERREE");
        club.events.push(createdEvent);
        await club.save({session: sess});
        await sess.commitTransaction();
    } catch(err){
        console.log("ERROR HERE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        console.log(err);
        return next(new HttpError('creating event failed, please try again'), 500);
    }
    res.status(201).json({ message: "created event"});
}

exports.createEvent = createEvent;