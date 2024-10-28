import "./App.css";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import MyPasswords from "./pages/MyPasswords";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { setLoading } from "./slices/UserSlice";
import Settings from "./pages/Settings";
import VerifyEmail from "./pages/VerifyEmail";
import UpdatePassword from "./pages/UpdatePassword";
import ErrorPage from "./pages/ErrorPage";
import React from "react";

function App() {
    const location = useLocation();
    const dispatch = useDispatch();
    const darkMode = useSelector((state) => state.user.darkMode);
    const token = useSelector((state) => state.user.token);

    useEffect(() => {
        const handleNavigation = () => {
            dispatch(setLoading(true));
            setTimeout(() => {
                dispatch(setLoading(false));
            }, 500);
        };

        handleNavigation();
    }, [location.pathname]);

    return (
        <div
            className={`${
                darkMode ? "bg-[#001E2B] text-white" : "bg-white text-black"
            } h-[100vh] font-[poppins]`}>
            <Navbar />

            <Routes>
                <Route path="*" element={<ErrorPage />} />
                <Route path="/" element={<MyPasswords />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route
                    path="/settings"
                    element={token ? <Settings /> : <ErrorPage />}
                />
                <Route path="/verify-email" element={<VerifyEmail />} />
                <Route
                    path="/update-password/:id"
                    element={<UpdatePassword />}
                />
            </Routes>
        </div>
    );
}

export default App;
