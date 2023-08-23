import { useNavigate } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Popover from '@mui/material/Popover';
import { Fragment, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from '../redux/actions/userAction';
import { setHasSearched } from '../redux/slices/hotelSlice';
import logo from '../images/logo.jpg'
import './Navbar.css'
const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuthenticated, user } = useSelector((state) => state.userState);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogoClick = () => {
        navigate('/');
        dispatch(setHasSearched(false));
    }

    const loginHandler = () => {
        navigate('/login');
        setAnchorEl(null);
    }

    const signupHandler = () => {
        navigate('/signup');
        setAnchorEl(null);
    }

    const accountHandler = () => {
        setAnchorEl(null);
        navigate('/account');
    }

    const logoutHandler = () => {
        dispatch(logoutAction());
        setAnchorEl(null)
    }

    return (
            <nav class="relative px-4 py-4 flex justify-between items-center bg-white fixed w-full z-10 top-0">
                <a href="#" class="flex items-center logo">
                    <img src={logo} class="h-11 mr-3   " alt="Flowbite Logo" />
                    <span class="text-sm text-blue-600 font-bold" onClick={handleLogoClick}>Ammie</span>
                </a>
                <div class="lg:hidden">
                    <button class="navbar-burger flex items-center text-blue-600 p-3">
                        <svg class="block h-4 w-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <title>Mobile menu</title>
                            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
                        </svg>
                    </button>
                </div>
                
                <ul className="hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:flex lg:mx-auto lg:flex lg:items-center lg:w-auto lg:space-x-6 navbar" id="navcompo">
                    <li><a class="text-sm text-black-400 hover:font-bold" href="#">Home</a></li>
                    <li class="text-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" class="w-4 h-4 current-fill" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                    </li>
                    <li><a class="text-sm text-blue-600 font-bold" href="#">About Us</a></li>
                    <li class="text-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" class="w-4 h-4 current-fill" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                    </li>
                    <li><a class="text-sm text-black-400 hover:font-bold" href="#">Explore</a></li>


                    <li class="text-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" class="w-4 h-4 current-fill" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                    </li>
                    <li><a class="text-sm text-black-400 hover:font-bold" href="#">Contact</a></li>
                </ul>
                <span class="hidden lg:inline-block py-2 px-6 bg-blue-500 hover:bg-blue-600 text-sm text-white font-bold rounded-xl transition duration-200" >{isAuthenticated ? user.name : "Sign in"}</span>
                <Popover
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right"
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right'
                        }}


                    >
                        <div className="bg-orange-100 w-screen sm:w-96 py-12 flex justify-center items-center flex-col gap-6 transition ease-in duration-300">
                            {!isAuthenticated && (
                                <Fragment>
                                    <button onClick={loginHandler} className="bg-orange-400 hover:bg-orange-500 py-2 rounded-lg w-48 text-center text-neutral-50 font-thin transition duration-200 ">Sign In</button>
                                    <button onClick={signupHandler} className=" border-orange-400 text-orange-400 hover:text-orange-500 hover:border-orange-500 hover:bg-orange-200 border-solid border py-2 rounded-lg w-48 text-center transition duration-200 box-border">Sign Up</button>
                                </Fragment>
                            )}
                            {isAuthenticated && (
                                <Fragment>
                                    <div className="text-center">
                                        <h2 className="capitalize text-xl font-semibold">Hi, {user.name}</h2>
                                        <span>Email: {user.email}</span>
                                    </div>
                                    <button onClick={accountHandler} className="bg-orange-400 hover:bg-orange-500 py-2 rounded-lg w-48 text-center text-neutral-50  transition duration-200 font-semibold">Account</button>
                                    <button onClick={logoutHandler} className=" border-orange-400 text-orange-400 hover:text-orange-500 hover:border-orange-500 hover:bg-orange-200 border-solid border py-2 rounded-lg w-48 text-center transition duration-200 box-border">Log out</button>
                                </Fragment>
                            )}
                        </div>
                    </Popover>
            </nav>
        
    )
}
export default Navbar;