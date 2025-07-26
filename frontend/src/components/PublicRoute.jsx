import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const PublicRoute = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const [isChecking, setChecking] = useState(true);

    useEffect(() => {

        const checkLogin = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.post("http://localhost:3000/checkLogin", {}, { headers: { Authorization: `Bearer ${token}` } });
                if (res.data.message === "login") {
                    setIsLoggedIn(true);
                } else {
                    localStorage.removeItem("token");
                    setIsLoggedIn(false);
                }
            } catch (err) {
                localStorage.removeItem("token");
                setIsLoggedIn(false);
            } finally {
                setChecking(false);
            }

        }

        checkLogin();
    }, []);

    if (isChecking) return <div>Loading...</div>;

    return isLoggedIn ? <Navigate to="/" replace /> : <Outlet />
}

export default PublicRoute;