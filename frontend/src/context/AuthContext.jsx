import { createContext, useState } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children}) {
    const [user, setUser] = useState(null);

    const login = (data) => {
        localStorage.setItem("token", data.token);
        setUser(data.user);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}