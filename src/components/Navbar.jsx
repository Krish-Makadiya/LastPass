import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setDarkMode } from "../slices/UserSlice";
import { setToken, setLoading } from "../slices/UserSlice";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { IoSettingsSharp } from "react-icons/io5";
import { IoLogoGithub } from "react-icons/io";

const Navbar = () => {
    const dispatch = useDispatch();
    const darkMode = useSelector((state) => state.user.darkMode);
    const token = useSelector((state) => state.user.token);
    const navigate = useNavigate();

    const logoutHandler = () => {
        dispatch(setLoading(true));
        setTimeout(() => {
            dispatch(setToken(null));
            localStorage.removeItem("token");
            dispatch(setLoading(false));
            navigate("/login");
        }, 1000);
    };

    return (
        <div className={darkMode ? "bg-[#001E2B]" : "bg-[#FFFFFF]"}>
            <nav className="flex w-9/12 h-[11vh] mx-auto py-4 items-center justify-between">
                <Link to={"/"}>
                    <h1
                        className={`${
                            darkMode ? "text-white" : "text-black"
                        } text-3xl font-[700]`}>
                        Logo.
                    </h1>
                </Link>

                <div className="flex gap-20 items-center">
                    <div className="flex gap-5">
                        <button
                            className={`${
                                darkMode ? "text-white" : "text-black"
                            }  transition-all duration-200 hover:scale-95`}
                            onClick={() => dispatch(setDarkMode(!darkMode))}>
                            {darkMode ? (
                                <MdDarkMode fontSize={30} />
                            ) : (
                                <MdLightMode fontSize={30} />
                            )}
                        </button>
                        <button className="bg-[#00ED64] px-3 py-2 rounded-md  transition-all duration-200 hover:scale-95">
                            <a
                                href="https://github.com/Krish-Makadiya?tab=repositories"
                                className="flex items-center gap-2">
                                <IoLogoGithub  fontSize={30} color="black"/>
                                <p className="text-[18px] text-black">Star</p>
                            </a>
                        </button>
                    </div>
                    <div
                        className={`${
                            darkMode ? "text-white" : "text-black"
                        } flex gap-6 items-center`}>
                        {!token && (
                            <Link
                                to={"/login"}
                                className={`font-[600] text-[18px] transition-all duration-200 hover:scale-95`}>
                                Login
                            </Link>
                        )}
                        {!token && (
                            <Link
                                to={"/signup"}
                                className={`text-black font-[600] text-[18px] bg-[#00ED64] px-3 py-2 rounded-md transition-all duration-200 hover:scale-95`}>
                                Sign Up
                            </Link>
                        )}
                        {token && (
                            <button
                                className="bg-[#00ED64] px-3 py-2 rounded-md font-[600] flex items-center gap-2 transition-all duration-200 hover:scale-95"
                                onClick={logoutHandler}>
                                <p className="text-black text-[18px] ">
                                    Logout
                                </p>
                                <IoLogOut fontSize={24} color="black" />
                            </button>
                        )}
                        {token && (
                            <Link to={'/settings'}>
                                <IoSettingsSharp size={32} className={``} />
                            </Link>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
