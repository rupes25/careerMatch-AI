// YE STATE LAYER AUR API LAYER KO MANAGE KRNE KA KAAM KREGA.

import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import { login, register, logout, currentUser } from "../services/auth.api";

export const AuthHook = () => {
    const context = useContext(AuthContext);
    const { user, setUser, loading, setLoading } = context;


    const handleLogin = async ({ usernameOrEmail, password }) => {
        setLoading(true);
        try {
            const data = await login({ usernameOrEmail, password });
            setUser(data.user);
            return data;
        }
        finally {
            setLoading(false);
        }
    }

    const handleRegister = async ({ username, email, password, fName }) => {
        setLoading(true);
        try {
            const data = await register({ username, email, password, fName });
            setUser(data.user);
            return data;
        }
        finally {
            setLoading(false);
        }
    }

    const handleLogout = async () => {
        setLoading(true);
        try {
            await logout();
            setUser(null);
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const getAndSetUser = async () => {
            try {
                const data = await currentUser();
                setUser(data.user);
            }
            catch {
                setUser(null);
            }
            finally {
                setLoading(false)
            }
        }
        getAndSetUser()

    }, [setLoading, setUser])

    return { user, loading, handleRegister, handleLogin, handleLogout }
}