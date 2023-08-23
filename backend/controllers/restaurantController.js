const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const Restaurant = require('../models/Restaurant');
const RestBooking = require('../models/RestBooking');
const ErrorHandler = require('../utils/errorHandler');
const cloudinary = require('cloudinary').v2;
const getDataUri = require('../utils/getDataUri');

// create restaurant -- admin
exports.createRestaurant = catchAsyncErrors(async (req, res, next) => {
    const { name, location, distance, openingTime, closingTime, specification, description, bookingAmount } = req.body;

    const restaurant = await Restaurant.create({
        name, location, distance, openingTime, closingTime, specification, description, bookingAmount
    });

    res.status(201).json({
        success: true
    })
});

// upload restaurant pictures -- admin
exports.uploadRestaurantPictures = catchAsyncErrors(async (req, res, next) => {
    const pictures = req.files;
    const id = req.params.id;

    if (pictures.length < 1) {
        return next(new ErrorHandler('Please upload Restaurant pictures', 400));
    }

    const restaurant = await Restaurant.findById(id);

    if (!restaurant) {
        return next(new ErrorHandler('Restaurant not found', 404));
    }

    
    const picturePath = await Promise.all(pictures.map(async (picture) => {
        const pictureUri = getDataUri(picture);

        const myCloud = await cloudinary.uploader.upload(pictureUri.content, {
            folder: '/amierestaurant/restaurant',
            crop: "scale",
        })

        return {
            public_id: myCloud.public_id,
            url: myCloud.secure_url
        }
    }))

    // destroy previous pictures
    if (restaurant.pictures.length > 0) {
        await Promise.all(restaurant.pictures.map(async (picture) => {
            await cloudinary.uploader.destroy(picture.public_id)
            return;
        }));
    }

    restaurant.pictures = picturePath;
    await restaurant.save();

    res.status(200).json({
        success: true,
        restaurant
    })
})

// update restaurant details -- admin
exports.updateRestaurant = catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id;
    const { name, location, distance, openingTime, closingTime, specification, description } = req.body;

    const restaurant = await Restaurant.findByIdAndUpdate(id, {
        $set: {
            name,
            location,
            distance,
            openingTime,
            closingTime,
            description,
            specification
        }
    }, { new: true })

    if (!restaurant) {
        return next(new ErrorHandler("Restaurant not found", 404));
    }

    res.status(200).json({
        success: true,
        restaurant
    })
})

// delete restaurant -- admin
exports.deleteRestaurant = catchAsyncErrors(async (req, res, next) => {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
        return next(new ErrorHandler("Restaurant not found", 404));
    }


    if (restaurant.pictures.length > 0) {
        await Promise.all(restaurant.pictures.map(async (picture) => {
            await cloudinary.uploader.destroy(picture.public_id)
        }))
    }


    // delete restaurant's booking details
    const bookings = await RestBooking.find({
        restaurant: restaurant.id
    })

    if (bookings.length > 0) {
        await Promise.all(bookings.map(async (booking) => await booking.delete()));
    }

    await restaurant.delete();
    const restaurants = await Restaurant.find();

    res.status(200).json({
        success: true,
        restaurant,
        message: "Restaurant deleted successfully"
    })
})

// get Restaurant details
exports.getRestaurantDetails = catchAsyncErrors(async (req, res, next) => {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
        return next(new ErrorHandler("Restaurant not found", 404));
    }

    res.status(200).json({
        success: true,
        restaurant
    })
})

// get all restaurants
exports.getAllRestaurants = catchAsyncErrors(async (req, res, next) => {
    const keyword = req.query.location;
    const dates = [];

    
    // for search query
    if (req.query.d1 && req.query.d2) {
        let startDate = req.query.d1;
        let endDate = req.query.d2;        

        if (startDate > endDate) return next(new ErrorHandler("Please check start and end date", 400));

        while ( new Date(startDate) <= new Date(endDate)) {
            dates.push(Date.parse(new Date(startDate)));

            startDate = new Date(new Date(startDate).setDate(new Date(startDate).getDate() + 1));
        }
    }

    let restaurants = await Restaurant.find({
        location: {
            $regex: keyword ? keyword : '',
            $options: 'i'
        },
        

    });

    // if (dates.length > 0) {
    //     hotels = hotels.filter((hotel) => {
    //         return hotel.rooms.some((room) => {
    //             return room.notAvailable.every((date) => {
    //                 return !dates.includes(Date.parse(date))
    //             })
    //         })
    //     })
    // }

    res.status(200).json({
        success: true,
        restaurants
        
    })
    console.log(restaurants);
})