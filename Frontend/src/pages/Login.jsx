import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../slices/UserSlice";
import { Link } from "react-router-dom";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import { user } from "../apiConnection/apis";

const { LOGIN_API } = user;

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const darkMode = useSelector((state) => state.user.darkMode);
    const loading = useSelector((state) => state.user.loading);

    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: "",
    });

    const { email, password } = data;

    const changeHandler = (e) => {
        setData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_API, {
                email,
                password,
            });

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            dispatch(setToken(response.data.token));
            localStorage.setItem("token", response.data.token);
            toast.success(response.data.message);
            navigate("/");
        } catch (error) {
            console.log("Login failed", error);
            console.log(error.response.data.message);
            toast.error(error.response.data.message);
        }
    };

    return (
        <div>
            {loading ? (
                <Loader />
            ) : (
                <div
                    className={`h-[89vh] lg:w-[30%] md:w-[60%] w-[85%] mx-auto flex flex-col justify-center gap-6`}>
                    <div>
                        <h1 className={`text-[36px] font-[600]`}>
                            Your <span className="text-[#00ED64]">Privacy</span>
                            , Our{" "}
                            <span className="text-[#00ED64]">Priority</span>
                        </h1>
                    </div>

                    <form
                        onSubmit={submitHandler}
                        className="flex flex-col gap-5">
                        <div className="flex flex-col gap-1">
                            <label
                                htmlFor="email"
                                className={`text-[16px] select-none`}>
                                Email Address
                            </label>
                            <input
                                required
                                type="text"
                                name="email"
                                value={email}
                                onChange={changeHandler}
                                placeholder="Enter email address"
                                className={`text-black bg-gray-100 w-full px-3 py-[6px] rounded-md text-[16px] border-[3px] ${
                                    !darkMode && "border-gray-300"
                                }`}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label
                                htmlFor="password"
                                className={`text-[16px] select-none`}>
                                Password
                            </label>
                            <div className="flex items-center gap-3 w-full">
                                <input
                                    required
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={password}
                                    onChange={changeHandler}
                                    placeholder="Enter Password"
                                    className={`text-black bg-gray-100 w-[90%] px-3 py-[6px] rounded-md text-[16px] border-[3px] ${
                                        !darkMode && "border-gray-300"
                                    }`}
                                />
                                <div
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }>
                                    {showPassword ? (
                                        <BiSolidHide
                                            fontSize={30}
                                            className={`transition-all duration-200 hover:scale-95`}
                                        />
                                    ) : (
                                        <BiSolidShow
                                            fontSize={30}
                                            className={`transition-all duration-200 hover:scale-95`}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col mt-5 gap-5">
                            <button
                                type="submit"
                                className={`text-black font-[600] text-[18px] bg-[#00ED64] px-3 py-3 rounded-md flex items-center justify-center gap-3 select-none transition-all duration-200 hover:scale-95`}>
                                <p>Login</p>
                                <FaArrowRight size={22} />
                            </button>
                            <div className="flex justify-between">
                                <Link
                                    to="/signup"
                                    className={`flex gap-3 items-center transition-all duration-200 hover:scale-95`}>
                                    <FaArrowLeft size={22} />
                                    <p className="text-[16px] select-none">
                                        Create Account
                                    </p>
                                </Link>
                                <Link
                                    to="/verify-email"
                                    className={`flex gap-3 items-center transition-all duration-200 hover:scale-95`}>
                                    <p className="text-[16px] select-none">
                                        Forgot Password
                                    </p>
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Login;
