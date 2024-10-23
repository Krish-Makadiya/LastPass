import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import toast from "react-hot-toast";
import { setToken } from "../slices/UserSlice";

const Settings = () => {
    const [user, setUser] = useState({});
    const darkMode = useSelector((state) => state.user.darkMode);
    const token = useSelector((state) => state.user.token);
    const loading = useSelector((state) => state.user.loading);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getUserInfo = async () => {
        try {
            const response = await axios.get(
                "http://localhost:4000/api/v1/get-user-data",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(
                `user:-  ${JSON.stringify(response.data.data[0], null, 2)}`
            );
            setUser(response.data.data[0]);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    useEffect(() => {
        getUserInfo();
    }, []);

    const forgotPasswordHandler = () => {
        navigate("/verify-email");
    };

    const deleteAccountHandler = async () => {
        try {
            const response = await axios.delete(
                "http://localhost:4000/api/v1/delete-account",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(JSON.stringify(response.data, null, 2));
            toast.success(response.data.message);
            dispatch(setToken(null));
            localStorage.removeItem("token");
            navigate("/login");
        } catch (error) {
            console.error("Error deleting account:", error);
            toast.error("Failed to delete account. Please try again.");
        }
    };

    return loading ? (
        <Loader />
    ) : (
        <div
            className={`w-full min-h-[89%] lg:pb-10 pb-6 ${
                darkMode ? "bg-[#001E2B]" : "bg-[#FFFFFF]"
            }`}>
            <div className="flex  lg:w-[60%] w-[90%] mx-auto flex-col gap-5">
                <h1 className="text-[30px] font-[600] pt-6">Settings</h1>

                <div
                    className={`lg:px-6 lg:py-8 px-4 py-6 flex lg:flex-row flex-col justify-between items-center w-full rounded-[10px] border-[2px] gap-8 ${
                        darkMode ? "border-slate-700" : "border-slate-300"
                    }`}>
                    <img
                        src="https://api.dicebear.com/9.x/glass/svg?seed=JD"
                        alt=""
                        className="rounded-[50%] h-36"
                    />

                    <div className="flex flex-col lg:w-[80%] w-[95%] gap-4">
                        <div className="flex justify-between w-full">
                            <div className="flex flex-col gap-[2px] w-[48%]">
                                <p className="font-[600] px-1">First Name</p>
                                <p className="bg-gray-100 px-3 py-[6px]  rounded-md border-2 border-gray-300 text-black">
                                    {user.firstName}
                                </p>
                            </div>
                            <div className="flex flex-col gap-[2px]  w-[48%]">
                                <p className="font-[600] px-1">Last Name</p>
                                <p className="bg-gray-100 px-3 py-[6px] rounded-md border-2 border-gray-300 text-black">
                                    {user.lastName}
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-[2px] w-full">
                            <p className="font-[600] px-1">Email Address</p>
                            <p className="bg-gray-100 px-3 py-[6px] rounded-md border-2 border-gray-300 text-black">
                                {user.email}
                            </p>
                        </div>
                    </div>
                </div>

                <div
                    className={`flex lg:flex-row flex-col justify-between w-full lg:px-6 px-4 lg:py-8 py-6 items-center rounded-[10px] border-[2px] lg:gap-0 gap-4 ${
                        darkMode ? "border-slate-700" : "border-slate-300"
                    }`}>
                    <div className="lg:w-[50%] w-[95%] flex flex-col lg:gap-2 gap-3">
                        <p className="text-[20px] font-[600] text-[#00ED64]">
                            Forgot Password
                        </p>
                        <p className="text-[14px]">
                            Forgot your password? No worries! Enter your email
                            below, and we'll send you a link to reset it.
                        </p>
                    </div>
                    <div
                        className="bg-[#00ED64] lg:px-3 px-2 py-2 rounded-md font-[600] flex items-center justify-center lg:gap-2 gap-1 transition-all duration-200 hover:scale-95 mt-1 text-black"
                        onClick={forgotPasswordHandler}>
                        <MdEdit className="text-[20px] lg:text-[30px]" />
                        <p className="text-[14px]">Forgot Password</p>
                    </div>
                </div>

                <div
                    className={`flex lg:flex-row flex-col justify-between w-full lg:px-6 px-4 lg:py-8 py-6 items-center rounded-[10px] border-[2px] lg:gap-0 gap-4 ${
                        darkMode ? "border-slate-700" : "border-slate-300"
                    }`}>
                    <div className="lg:w-[50%] w-[95%] flex flex-col lg:gap-2 gap-3">
                        <p className="text-[20px] font-[600] text-[#00ED64]">
                            Delete Account
                        </p>
                        <p className="text-[14px]">
                            Are you sure you want to delete your account? This
                            action is permanent and cannot be undone.
                        </p>
                    </div>
                    <div
                        className="bg-[#00ED64] lg:px-3 px-2 py-2 rounded-md font-[600] flex items-center justify-center lg:gap-2 gap-1 transition-all duration-200 hover:scale-95 mt-1 text-black"
                        onClick={deleteAccountHandler}>
                        <MdDelete className="text-[20px] lg:text-[30px]" />
                        <p className="text-[14px]">Delete Account</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
