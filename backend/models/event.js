const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    eventname: { type: String, required: true },
    date: { type: Date, required: true},
    time: {type: String, required: true},
    location: { type: String, required: true},
    images: [{ type: String, required: false }],
    club_image: {type: String, required: false},
    club: {type: mongoose.Types.ObjectId, required: true, ref: 'Club' }
});

eventSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Event', eventSchema);