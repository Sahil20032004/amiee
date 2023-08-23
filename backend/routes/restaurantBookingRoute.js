const express = require('express');
const { createBooking, updateBooking, getOwnBookings, getOwnBookingDetails, getBookingDetails, getAllBookings, sendStripeApiKey, sendStripeSecretKey } = require('../controllers/restaurantBookingController');
const { isAuthenticatedUser, authorizedRole } = require('../middlewares/auth');

const router = express.Router();

router.route('/restaurant/:id/book').post(isAuthenticatedUser, createBooking);
router.route('/restaurantbooking/:id').put(isAuthenticatedUser, authorizedRole('admin'), updateBooking).get(isAuthenticatedUser, authorizedRole('admin'), getBookingDetails);
router.route('/restaurantbookings').get(isAuthenticatedUser, authorizedRole("admin"), getAllBookings);
router.route('/me/restaurantbookings').get(isAuthenticatedUser, getOwnBookings);
router.route('/me/restaurantbooking/:id').get(isAuthenticatedUser, getOwnBookingDetails);
router.route('/stripeapikey').get(isAuthenticatedUser, sendStripeApiKey);
router.route('/stripeclientkey').post(isAuthenticatedUser, sendStripeSecretKey);;

module.exports = router;