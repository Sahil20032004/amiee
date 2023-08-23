const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const redis = require('redis');

const app = express();
const redisClient = redis.createClient();

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require('dotenv').config({ path: "config/config.env" })
}

// Routes import
const userRoute = require('./routes/userRoute');
const hotelRoute = require('./routes/hotelRoute');
const restaurantRoute = require('./routes/restaurantRoute');
const roomRoute = require('./routes/roomRoute');
const bookingRoute = require('./routes/bookingRoute');
const restaurantBookingRoute = require('./routes/restaurantBookingRoute');
const errorMiddleware = require('./middlewares/errorMiddleware');

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use((req, res, next) => {
    req.redisClient = redisClient;
    next();
  });
app.use(cookieParser());


// cors cofiguration
if (process.env.NODE_ENV !== "PRODUCTION") {
    app.use(require('cors')({
        origin: process.env.FRONTEND_URL,
        optionsSuccessStatus: 200,
    }))
}

app.use('/api/v1', userRoute);
app.use('/api/v1', hotelRoute);
app.use('/api/v1', restaurantRoute);
app.use('/api/v1', roomRoute);
app.use('/api/v1', bookingRoute);
app.use('/api/v1', restaurantBookingRoute);

app.use(express.static(path.join(__dirname + "./../frontend/build")));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "./../frontend/build/index.html"));
})

// error middileware
app.use(errorMiddleware)






module.exports = app;