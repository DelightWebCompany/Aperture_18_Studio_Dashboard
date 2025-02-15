import { createContext, useEffect, useState, useMemo } from "react";
import useFetch from "../hooks/useFetch";
import BASE_URL from "../hooks/baseUrl";
import { useNavigate } from "react-router";

const AuthContext = createContext({
    auth: null,
    user: null,
    updateProfile: () => { },
});

const AuthContextProvider = ({ children }) => {
    const token = localStorage.getItem("token");
    const [url, setUrl] = useState("");
    const { data: userData, error } = useFetch(url);
    const [profile, setProfile] = useState(null);
    const navigate = useNavigate();
    
    useEffect(() => {
        if (token) {
            setUrl(`${BASE_URL}/user`);
            setProfile(userData);
        } else {
            setProfile(null);
            navigate("/login");
        }
    }, [token, userData, navigate]);

    const updateProfile = (newProfile) => setProfile(newProfile);

    const value = useMemo(() => ({
        auth: token,
        user: profile,
        updateProfile,
    }), [token, profile]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthContextProvider };
