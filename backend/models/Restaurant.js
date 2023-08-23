const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    distance: {
        type: Number,
        require: true
    },
    openingTime: {
        type: String,
        require: true
    },
    closingTime: {
        type: String,
        require: true
    },
    bookingAmount: {
        type: String,
        require: true
    },
    specification: [String],
    description: {
        type: String,
        required: true,
        trim: true
    },
    pictures: [{
        public_id: String,
        url: String
    }],

}, { timestamps: true });

const Restaurant = mongoose.model("Restaurant", restaurantSchema);


module.exports = Restaurant;