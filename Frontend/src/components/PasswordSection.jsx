import React, { useState } from "react";
import { useSelector } from "react-redux";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import axios from "axios";
import { password } from "../apiConnection/apis";

const { DELETE_PASSWORD_API } = password;

const PasswordSection = ({ passwords, setData, setAllPasswords }) => {
    const darkMode = useSelector((state) => state.user.darkMode);
    const token = useSelector((state) => state.user.token);
    const [passToDelete, setPassToDelete] = useState({});
    const [deletePasswordDialog, setDeletePasswordDialog] = useState(false);

    const toasthandler = () => {
        toast.success("Copied!!!");
    };

    const editHandler = async (passwordEdit) => {
        setData({
            linkName: passwordEdit.linkName,
            linkUrl: passwordEdit.linkUrl,
            username: passwordEdit.username,
            password: passwordEdit.password,
        });

        const updatedPasswords = passwords.filter(
            (password) => password._id !== passwordEdit._id
        );
        setAllPasswords(updatedPasswords);

        try {
            const response = await axios.delete(DELETE_PASSWORD_API, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                data: {
                    passwordId: passwordEdit._id,
                },
            });

            if (!response.data.success) {
                throw new Error(response.data.message);
            }
        } catch (error) {
            console.log("Error deleting password", error);
        }
    };

    const deleteHandler = async (passwordToDelete) => {
        const updatedPasswords = passwords.filter(
            (password) => password._id !== passwordToDelete._id
        );
        setAllPasswords(updatedPasswords);
        setDeletePasswordDialog(!deletePasswordDialog);

        try {
            const response = await axios.delete(DELETE_PASSWORD_API, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                data: {
                    passwordId: passwordToDelete._id,
                },
            });

            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            setPassToDelete({});
            toast.success(response.data.message);
        } catch (error) {
            console.log("Error deleting password", error);
        }
    };

    return (
        <div className="lg:w-[60%] w-[90%] mx-auto lg:pb-12 pb-4 text-black">
            <h2
                className={`${
                    darkMode ? "text-white" : "text-black"
                } lg:text-3xl text-2xl font-semibold mb-6`}>
                Your Passwords
            </h2>

            {passwords.length === 0 && (
                <div
                    className={`text-center ${
                        darkMode ? "text-white" : "text-black"
                    }`}>
                    No passwords saved yet.
                </div>
            )}

            {passwords.map((password, idx) => (
                <div
                    key={idx}
                    className={`flex flex-col bg-white px-5 py-4 rounded-md gap-3 mb-4 ${
                        !darkMode && "border-[1px] border-gray-400"
                    }`}>
                    <div className="flex justify-between">
                        <p
                            className={
                                "w-[20%] font-[600] text-[18px] cursor-pointer"
                            }>
                            {password.linkName}
                        </p>
                        <div className={"flex gap-3"}>
                            <MdEdit
                                size={24}
                                onClick={() => editHandler(password)}
                                className={`transition-all duration-200 hover:scale-95 cursor-pointer`}
                            />
                            <MdDelete
                                size={24}
                                onClick={() => {
                                    setPassToDelete(password);
                                    setDeletePasswordDialog(
                                        !deletePasswordDialog
                                    );
                                }}
                                className={`transition-all duration-200 hover:scale-95 cursor-pointer`}
                            />
                        </div>
                        {deletePasswordDialog && (
                            <div className="fixed top-0 left-0 z-50 w-full h-full bg-[rgba(0,0,0,0.50)]">
                                <div className="flex flex-col justify-center items-center w-full h-full">
                                    <div
                                        className={`px-6 py-4 lg:w-[500px] w-[90%] rounded-[10px] border-[2px] border-gray-600 flex flex-col gap-5 ${
                                            darkMode
                                                ? "bg-[rgba(0,0,0,0.9)]"
                                                : "bg-[rgba(255,255,255,0.9)]"
                                        }`}>
                                        <div className="flex flex-col gap-1">
                                            <p className="text-[20px] font-[600] text-[#00ED64]">
                                                Delete Password
                                            </p>
                                            <p
                                                className={`text-[14px] ${
                                                    darkMode
                                                        ? "text-white"
                                                        : "text-black"
                                                }`}>
                                                Are you sure you want to delete
                                                your Password? This action is
                                                permanent and cannot be undone.
                                            </p>
                                        </div>

                                        <div className="flex justify-around">
                                            <button
                                                className={`transition-all duration-200 hover:scale-95 ${
                                                    darkMode
                                                        ? "text-white"
                                                        : "text-black"
                                                }`}
                                                onClick={() =>
                                                    setDeletePasswordDialog(
                                                        !deletePasswordDialog
                                                    )
                                                }>
                                                Cancel
                                            </button>

                                            <button
                                                className="bg-[#00ED64] lg:px-5 px-3 lg:py-2 py-2 rounded-md font-[600] flex items-center lg:gap-2 gap-1 transition-all duration-200 hover:scale-95 text-black"
                                                onClick={() => {
                                                    deleteHandler(passToDelete);
                                                }}>
                                                <p>Delete Password</p>
                                                <MdDelete size={24} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="flex w-full gap-2">
                        <div
                            className={`flex items-center w-[30%]  justify-between  border-[1px] border-gray-400 p-1 px-2 rounded-md  ${
                                !darkMode && "border-[1px] border-gray-300"
                            }`}>
                            <input
                                type="text"
                                value={password.linkUrl}
                                className="w-full outline-none cursor-pointer"
                                readOnly
                                onClick={() => {
                                    navigator.clipboard.writeText(
                                        password.linkUrl
                                    );
                                    toasthandler();
                                }}
                            />
                        </div>
                        <div
                            className={`flex items-center w-[40%] justify-between  border-[1px] border-gray-400 p-1 px-2 rounded-md  ${
                                !darkMode && "border-[1px] border-gray-300"
                            }`}>
                            <input
                                type="text"
                                value={password.username}
                                className="w-full outline-none cursor-pointer"
                                readOnly
                                onClick={() => {
                                    navigator.clipboard.writeText(
                                        password.username
                                    );
                                    toasthandler();
                                }}
                            />
                        </div>
                        <div
                            className={`flex items-center w-[30%] justify-between  border-[1px] border-gray-400 p-1 px-2 rounded-md  ${
                                !darkMode && "border-[1px] border-gray-300"
                            }`}>
                            <input
                                type="password"
                                value={password.password}
                                className="w-full outline-none cursor-pointer"
                                readOnly
                                onClick={() => {
                                    navigator.clipboard.writeText(
                                        password.password
                                    );
                                    toasthandler();
                                }}
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PasswordSection;
