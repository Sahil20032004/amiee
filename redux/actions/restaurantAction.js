import { setError, setSuccess } from '../slices/appSlice';
import { setLoader, setRestaurants, setHasSearched, setRestaurant, setBookings, setHasBooked, setBooking, setAllRestaurants, setIsRestaurantCreated, setIsRestaurantUPdated, setAllBookings } from '../slices/restaurantSlice';
import axios from 'axios';

// search restaurant
export const searchRestaurantsAction = ({ location, d1 }) => async (dispatch) => {
    try {
        dispatch(setHasSearched(true));
        dispatch(setLoader(true));
        const { data } = await axios.get(`/api/v1/restaurant?location=${location}&d1=${d1}`);

        dispatch(setRestaurants(data.restaurants));
        dispatch(setLoader(false));
    } catch (err) {
        dispatch(setLoader(false));
        dispatch(setError(err.response.data.message));
    }
}

// get featured restaurants
export const getRestaurants = () => async (dispatch) => {
    try {
        dispatch(setHasSearched(false));
        dispatch(setLoader(true));
        const { data } = await axios.get(`/api/v1/restaurant`);

        dispatch(setRestaurants(data.restaurants));
        dispatch(setLoader(false));
    } catch (err) {
        dispatch(setLoader(false));
        dispatch(setError(err.response.data.message));
    }
}

// get restaurant details
export const getRestaurantsAction = (id) => async (dispatch) => {
    try {
        dispatch(setLoader(true));
        const { data } = await axios.get(`/api/v1/restaurant/${id}`);

        dispatch(setRestaurant(data.restaurant));
        dispatch(setLoader(false));
    } catch (err) {
        dispatch(setLoader(false));
        dispatch(setError(err.response.data.message));
    }
}



// new booking
export const newBookingAction = (formData, restaurantId ) => async (dispatch) => {
    try {
        await axios.post(`/api/v1/restaurant/${restaurantId}/book`, formData, { headers: { "Content-Type": "application/json" } })

        dispatch(setHasBooked(true));
    } catch (err) {
        dispatch(setError(err.response.data.message));
    }
}

// users bookings
export const getUsersBookings = () => async (dispatch) => {
    try {
        dispatch(setLoader(true));
        const { data } = await axios.get('/api/v1/me/restaurantbookings');

        dispatch(setBookings(data.bookings));
        dispatch(setLoader(false));
    } catch (err) {
        dispatch(setError(err.response.data.message));
        dispatch(setLoader(false));
    }
}

// // users booking details
export const getUserBooking = (id) => async (dispatch) => {
    try {
        dispatch(setLoader(true));
        const { data } = await axios.get(`/api/v1/me/restaurantbooking/${id}`);

        dispatch(setBooking(data.booking));
        dispatch(setLoader(false));
    } catch (err) {
        dispatch(setError(err.response.data.message));
        dispatch(setLoader(false));
    }
}

// get all restaurants -- admin
export const getAllRestaurants = () => async (dispatch) => {
    try {
        dispatch(setLoader(true));
        const { data } = await axios.get(`/api/v1/restaurant`);

        dispatch(setAllRestaurants(data.restaurants));
        dispatch(setLoader(false));
    } catch (err) {
        dispatch(setLoader(false));
        dispatch(setError(err.response.data.message));
    }
}

// upload restaurant picture --admin
export const uploadRestaurantPicture = (formData, id) => async (dispatch) => {
    try {
        dispatch(setLoader(true));
        await axios.put(`/api/v1/restaurant/${id}/images`, formData, { headers: { "Content-Type": "multipart/form-data" } });

        dispatch(setSuccess("Image uploaded successfully"));
        dispatch(setHasSearched(false));
        dispatch(setLoader(false));
    } catch (err) {
        dispatch(setError(err.response.data.message));
        dispatch(setLoader(false));
    }
}



// delete restaurant -- admin
export const deleteRestaurant = (id) => async (dispatch) => {
    try {
        dispatch(setLoader(true));
        const { data } = await axios.delete(`/api/v1/restaurant/${id}`);

        dispatch(setAllRestaurants(data.restaurants));
        dispatch(setSuccess("Restaurant deleted successfully"));
        dispatch(setLoader(false));
    } catch (err) {
        dispatch(setError(err.response.data.message));
        dispatch(setLoader(false));
    }
}



// create new restaurant --admin
export const createRestaurant = (formData) => async (dispatch) => {
    try {
        dispatch(setLoader(true));
        await axios.post(`/api/v1/restaurant/new`, formData, { headers: { "Content-Type": "application/json" } });

        dispatch(setSuccess("Restaurant Created successfully"));
        dispatch(setIsRestaurantCreated(true));
    } catch (err) {
        dispatch(setError(err.response.data.message));
        dispatch(setLoader(false));
    }
}

// update restaurant --admin
export const updateRestaurant = (formData, restaurantId) => async (dispatch) => {
    try {
        dispatch(setLoader(true));
        await axios.put(`/api/v1/restaurant/${restaurantId}`, formData, { headers: { "Content-Type": "application/json" } });

        dispatch(setSuccess("Restaurant Updated successfully"));
        dispatch(setIsRestaurantUPdated(true));
    } catch (err) {
        dispatch(setError(err.response.data.message));
        dispatch(setLoader(false));
    }
}


// // get all bookings -- admin
export const getAllBookings = () => async (dispatch) => {
    try {
        dispatch(setLoader(true));
        const { data } = await axios.get(`/api/v1/restaurantbookings`);

        dispatch(setAllBookings(data.bookings));
        dispatch(setLoader(false));
    } catch (err) {
        dispatch(setLoader(false));
        dispatch(setError(err.response.data.message));
    }
}

// change booking status --admin
export const changeBookingStatus = (status, bookingId) => async (dispatch) => {
    try {
        const { data } = await axios.put(`/api/v1/restaurantbooking/${bookingId}`, { status }, { headers: { "Content-Type": "application/json" } });

        dispatch(setAllBookings(data.bookings));
    } catch (err) {
        dispatch(setError(err.response.data.message));
    }
}

// get booking details -- admin
export const getBookingDetails = (id) => async (dispatch) => {
    try {
        dispatch(setLoader(true));
        const { data } = await axios.get(`/api/v1/restaurantbooking/${id}`);
        dispatch(setBooking(data.booking));
        dispatch(setLoader(false));
    } catch (err) {
        dispatch(setError(err.response.data.message));
        dispatch(setLoader(false));
    }
}