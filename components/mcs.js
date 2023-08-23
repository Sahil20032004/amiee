<h3 onClick={handleLogoClick} className="text-orange-400 text-3xl font-bold cursor-pointer">AmieBharat</h3>
                <div className="">
                    <div onClick={handleClick}>
                        <span className="md:hidden">
                            <AccountCircleIcon className="text-orange-400 cursor-pointer" />
                        </span>
                        <span className="capitalize text-orange-400 font-medium hidden md:block cursor-pointer">{isAuthenticated ? user.name : "Sign in"}</span>
                    </div>

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
                </div>