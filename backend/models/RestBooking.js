const mongoose = require('mongoose');

const restbookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
        required: true
    },
    dates: [{
        type: Date,
        required: true
    }],
    time: [{
        type: String,
        required: true
    }],
    totalPrice: {
        type: Number,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    paidAt: {
        type: Date,
        required: true
    },
    paymentInfo: {
        id: String,
        status: String
    },
    status: {
        type: String,
        enum: ['Processing', 'Checked', 'Complete'],
        default: 'Processing'
    }
}, { timestamps: true });

const RestBooking = mongoose.model("Restaurant Bookings", restbookingSchema);

module.exports = RestBooking;