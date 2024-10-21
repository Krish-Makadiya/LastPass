import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PasswordSection from "../components/PasswordSection";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";
import { IoIosAddCircle } from "react-icons/io";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import HomePage from "./HomePage";

const MyPasswords = () => {
    const [data, setData] = useState({
        linkName: "",
        linkUrl: "",
        username: "",
        password: "",
    });
    const token = useSelector((state) => state.user.token);
    const [allPasswords, setAllPasswords] = useState([]);
    const [showPassword, setShowPassword] = useState(false);
    const darkMode = useSelector((state) => state.user.darkMode);
    const loading = useSelector((state) => state.user.loading);
    const [refreshPasswords, setRefreshPasswords] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const { linkName, linkUrl, username, password } = data;

    const changeHandler = (e) => {
        setData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:4000/api/v1/add-password",
                {
                    linkName,
                    linkUrl,
                    username,
                    password,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log(
                `API RESPONSE: ${JSON.stringify(response.data, null, 2)}`
            );

            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            setData({
                linkName: "",
                linkUrl: "",
                username: "",
                password: "",
            });
            toast.success(response.data.message);
            setRefreshPasswords((prev) => !prev);
        } catch (error) {
            console.log("Password addition failed", error);
            toast.error(error.response.data.message);
        }
    };

    const fetchPasswords = async () => {
        try {
            const response = await axios.get(
                "http://localhost:4000/api/v1/get-all-passwords",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(
                `API RESPONSE: ${JSON.stringify(response.data, null, 2)}`
            );
            setAllPasswords(response.data.data[0].savedPasswords);
        } catch (error) {
            console.error("Error fetching passwords:", error);
        }
    };

    const checkUserLoggedIn = ()=>{
        if(token){
            setIsLoggedIn(true);
        }
    }

    useEffect(() => {
        fetchPasswords();
    }, [token, refreshPasswords]);

    useEffect(()=>{
        checkUserLoggedIn();
    }, [])

    return (
        !isLoggedIn ? <HomePage/> :(<div
            className={`w-full min-h-[89%] ${
                darkMode ? "bg-[#001E2B]" : "bg-[#FFFFFF]"
            }`}>
            {loading ? (
                <Loader />
            ) : (
                <div className="h-full">
                    <form
                        onSubmit={submitHandler}
                        className="w-[60%] mx-auto py-6 flex flex-col gap-3 items-center">
                        <div className="flex w-full justify-between">
                            <input
                                type="text"
                                placeholder="Link Name"
                                value={linkName}
                                name="linkName"
                                onChange={changeHandler}
                                className={`text-black bg-gray-100 w-[29%] px-3 py-[6px] rounded-md text-[16px] border-[3px] ${
                                    !darkMode && "border-gray-300"
                                }`}
                            />
                            <input
                                type="text"
                                placeholder="Link URL"
                                value={linkUrl}
                                name="linkUrl"
                                onChange={changeHandler}
                                className={`text-black bg-gray-100 w-[69%] px-3 py-[6px] rounded-md text-[16px] border-[3px] ${
                                    !darkMode && "border-gray-300"
                                }`}
                            />
                        </div>
                        <div className="flex w-full justify-between">
                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                name="username"
                                onChange={changeHandler}
                                className={`text-black bg-gray-100 w-[49%] px-3 py-[6px] rounded-md text-[16px] border-[3px] ${
                                    !darkMode && "border-gray-300"
                                }`}
                            />
                            <div className="w-[49%] flex items-center gap-3">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    value={password}
                                    name="password"
                                    onChange={changeHandler}
                                    className={`text-black bg-gray-100 w-[90%] px-3 py-[6px] rounded-md text-[16px] border-[3px] ${
                                        darkMode ? "" : "border-gray-300"
                                    }`}
                                />
                                <div
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }>
                                    {showPassword ? (
                                        <BiSolidHide
                                            fontSize={30}
                                            className={`${
                                                darkMode
                                                    ? "text-white"
                                                    : "text-black"
                                            }`}
                                        />
                                    ) : (
                                        <BiSolidShow
                                            fontSize={30}
                                            className={`${
                                                darkMode
                                                    ? "text-white"
                                                    : "text-black"
                                            }`}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className={`text-black w-[30%] font-[600] text-[14px] bg-[#00ED64] px-3 py-3 rounded-md flex items-center justify-center gap-3 select-none transition-all duration-200 hover:scale-95`}>
                            <p>Add Password</p>
                            <IoIosAddCircle fontSize={24} />
                        </button>
                    </form>

                    <PasswordSection
                        passwords={allPasswords}
                        setData={setData}
                        setAllPasswords={setAllPasswords}
                    />
                </div>
            )}
        </div>)
        
    );
};

export default MyPasswords;
