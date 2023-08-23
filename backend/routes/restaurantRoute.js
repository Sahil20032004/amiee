const express = require('express');
const { createRestaurant, uploadRestaurantPictures, updateRestaurant, deleteRestaurant, getRestaurantDetails, getAllRestaurants } = require('../controllers/restaurantController');
const imageUpload = require('../middlewares/imageUpload');
const { isAuthenticatedUser, authorizedRole } = require('../middlewares/auth');

const router = express.Router();

router.route('/restaurant/new').post(isAuthenticatedUser, authorizedRole('admin') ,createRestaurant);
router.route('/restaurant/:id/images').put(isAuthenticatedUser, authorizedRole('admin'),imageUpload('pictures'), uploadRestaurantPictures);
router.route('/restaurant').get(getAllRestaurants);
router.route('/restaurant/:id').put(isAuthenticatedUser, authorizedRole('admin'),updateRestaurant).delete(isAuthenticatedUser, authorizedRole('admin'), deleteRestaurant).get(getRestaurantDetails);

module.exports = router;