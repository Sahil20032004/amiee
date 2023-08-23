const Booking = require('../models/RestBooking');
const Restaurant = require('../models/Restaurant');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// new booking
const bookingsPerHour = {};

exports.createBooking = catchAsyncErrors(async (req, res, next) => {
  const { paymentInfo, dates, time, totalPrice, phone } = req.body;

  // Validation of payment info
  const intent = await stripe.paymentIntents.retrieve(paymentInfo.id);

  if (intent.status !== 'succeeded' || intent.amount !== totalPrice * 100) {
    return next(new ErrorHandler('Invalid Payment Info', 400));
  }

  const restaurant = await Restaurant.findById(req.params.id);
  if (!restaurant) {
    return next(new ErrorHandler('Restaurant not found', 404));
  }

  if (dates.length < 1) {
    return next(new ErrorHandler('Please insert booking dates', 400));
  }

  const hour = new Date().getHours();
  const timeSlot = `${hour}:00-${hour + 1}:00`;

  if (!bookingsPerHour[timeSlot]) {
    bookingsPerHour[timeSlot] = 0;
  }

  if (bookingsPerHour[timeSlot] >= 5) {
    return next(
      new ErrorHandler('Maximum bookings reached for this time slot', 429)
    );
  }

  bookingsPerHour[timeSlot]++;

  // Create booking and save room details
  await Booking.create({
    user: req.user.id,
    restaurant: restaurant.id,
    dates,
    time,
    totalPrice,
    phone,
    paymentInfo,
    paidAt: Date.now()
  });

  res.status(201).json({
    success: true
  });
});



// update booking status -- admin
exports.updateBooking = catchAsyncErrors(async (req, res, next) => {
    const status = req.body.status;

    if (status !== "Complete" && status !== "Checked") {
        return next(new ErrorHandler("Can't change booking status", 400));
    }
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
        return next(new ErrorHandler("Booking not found", 404));
    }

    if (status === 'Complete') {
        if (booking.status === "Complete") return next(new ErrorHandler("Can't change booking status", 400));

        const restaurant = await Restaurant.findById(booking.restaurant);
        const bookingDatesCopy = booking.dates.map((date) => Date.parse(date));

        booking.status = status;
        await booking.save();
    }

    if (status === "Checked") {
        if (booking.status === "Checked") return next(new ErrorHandler("User already checked in", 400));
        if (booking.status === "Complete") return next(new ErrorHandler("Can't change booking status", 400));

        booking.status = status;
        await booking.save();
    }

    const bookings = await Booking.find();

    res.status(200).json({
        success: true,
        bookings
    })
})

// get own booking details
exports.getOwnBookingDetails = catchAsyncErrors(async (req, res, next) => {
    const booking = await Booking.findById(req.params.id).populate('restaurant');

    if (!booking) {
        return next(new ErrorHandler("Booking not found", 404));
    }

    if (booking.user.toString() !== req.user.id) {
        return next(new ErrorHandler("Access denied", 403));
    }

    res.status(200).json({
        success: true,
        booking
    })
})

// get own all bookings
exports.getOwnBookings = catchAsyncErrors(async (req, res, next) => {
    const bookings = await Booking.find({
        user: req.user.id
    })

    if (!bookings) {
        return next(new ErrorHandler("You have no booking yet", 404));
    }

    res.status(200).json({
        success: true,
        bookings
    })
})

// get all bookings -- admin 
exports.getAllBookings = catchAsyncErrors(async (req, res, next) => {
    const bookings = await Booking.find();

    res.status(200).json({
        success: true,
        bookings
    })
})

// get booking details -- admin
exports.getBookingDetails = catchAsyncErrors(async (req, res, next) => {
    const booking = await Booking.findById(req.params.id).populate('restaurant');
    if (!booking) {
        return next(new ErrorHandler("Booking not found", 404));
    }

    res.status(200).json({
        success: true,
        booking
    })
})

// send stripe api key to client
exports.sendStripeApiKey = catchAsyncErrors((req, res, next) => {
    res.status(200).json({
        message: "success",
        stripeApiKey: process.env.STRIPE_API_KEY
    })
})

// send stripe secret key
exports.sendStripeSecretKey = catchAsyncErrors(async (req, res, next) => {
    const myPayment = await stripe.paymentIntents.create({
        amount: (req.body.amount * 100),
        currency: 'inr',
        metadata: {
            company: 'Amie Bharat'
        }
    });

    res.status(200).json({
        success: true,
        client_secret: myPayment.client_secret
    });
});


