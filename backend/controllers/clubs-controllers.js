const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const HttpError = require("../models/http-error");
const Club = require("../models/club");
const User = require("../models/user");

const getAllClubs = async (req, res, next) => {
  let clubs;
  try {
    clubs = await Club.find({});
  } catch (err) {
    return next(new HttpError("something went wrong", 500));
  }
  if (!clubs) {
    return next(new HttpError("can't find any clubs.", 404));
  }
  res.json({ clubs: clubs.map((club) => club.toObject({ getters: true })) });
};

const getClubByName = async (req, res, next) => {
  /**
   * takes a club name from the URL and returns the database entry for that club
   */
  const clubname = req.params.cn;
  let clubs;

  // find the club by clubname
  try {
    clubs = await Club.find({ clubname: clubname }).exec();
  } catch (err) {
    return next(new HttpError("something went wrong", 500));
  }

  if (!clubs) {
    return next(new HttpError("can't find club with that name", 404));
  }

  res.json({ clubs: clubs.map((club) => club.toObject({ getters: true })) });
};

const getClubsByUserId = async (req, res, next) => {
  /*
   * controller method to retrieve all of the clubs belonging to a specific user
   * the user id must be passed in the request body of the user we're interested in.
   * it is of type mongoose ObjectId
   */
  const userId = req.body.userId;

  console.log("USER ID: " + userId);

  let userWithClubs;
  try {
    userWithClubs = await User.findById(userId).populate("clubs");
  } catch (err) {
    console.log(err);
    return next(
      new HttpError("something went wrong, please try again later.", 500)
    );
  }

  console.log(userWithClubs);

  if (!userWithClubs || userWithClubs.clubs.length === 0) {
    console.log(userWithClubs);
    return next(
      new HttpError("Could not find Clubs for provided user id.", 404)
    );
  }
  console.log(userWithClubs.clubs);
  res.json({
    clubs: userWithClubs.clubs.map((club) => club.toObject({ getters: true })),
  });
  //res.json({clubs: 'this is working EEEEEEEEEEEEEEE'});
};

const createClub = async (req, res, next) => {
  /**
   * takes a http request containing a json object of the new club and adds it to the database
   */
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return new HttpError("invalid inputs passed, please check your data.", 422);
  }
  const { clubname, description, symbol, club_cat } = req.body;
  const createdClub = new Club({
    clubname,
    description,
    symbol,
    club_cat,
    image:
      "https://images.musement.com/cover/0003/90/am-pm-experience-cover_header-289357.png?lossless=false&auto=format&fit=crop&h=245&w=355",
    students: [],
    admin: [],
    events: [],
  });

  try {
    await createdClub.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError("creating club failed, please try again", 500);
    return next(error);
  }
  res.status(201).json({ message: "created club!" });
};

const updateClub = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return new HttpError("invalid inputs pased, please check your data.", 422);
  }
  const clubname = req.params.cn;
  let club;
  try {
    club = await Club.findOne({ clubname: clubname });
  } catch (err) {
    return next(new HttpError("something went wrong", 500));
  }
  for (const [key, value] of Object.entries(req.body)) {
    club[key] = value;
  }
  try {
    await club.save();
  } catch (err) {
    console.log(err);
    return next(new HttpError("editing club failed", 500));
  }
  res.status(201).json({ message: "update success" });
};

const deleteClub = async (req, res, next) => {
  const clubname = req.params.cn;
  let club;
  try {
    club = await Club.findOne({ clubname: clubname }).populate("users");
  } catch (err) {
    return next(new HttpError("something went wrong", 500));
  }
  if (!club) {
    return next(new HttpError("Could not find place for this id", 404));
  }
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    club.users.forEach(async (user) => {
      user.clubs.pull(club);
      await user.save({ session: sess });
    });
    await club.remove();
    await sess.commitTransaction();
  } catch (err) {
    return next(new HttpError("Something went wrong deleting club", 500));
  }
  res.status(200).json({ message: "deleted club" });
};

exports.getAllClubs = getAllClubs;
exports.createClub = createClub;
exports.getClubByName = getClubByName;
exports.getClubsByUserId = getClubsByUserId;
exports.updateClub = updateClub;
exports.deleteClub = deleteClub;
