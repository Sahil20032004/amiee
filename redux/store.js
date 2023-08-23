import { configureStore } from '@reduxjs/toolkit';
import appReducer from './slices/appSlice';
import userReducer from './slices/userSlice';
import hotelReducer from './slices/hotelSlice';
import restaurantReducer from './slices/restaurantSlice';

const reducer = {
    appState: appReducer,
    userState: userReducer,
    hotelState: hotelReducer,
    restaurantState: restaurantReducer,
}

const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
})

export default store;