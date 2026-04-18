import { useState, useContext } from "react";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const { login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await api.post("/login", form);
            login(res.data);
            console.log("Login correcto", res.data);
            navigate("/dashboard");
        } catch (error) {
            console.error("Error en el login:", error.response?.data || error.message);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <input
                placeholder="email"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <input
                type="password"
                placeholder="password"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <button type="submit">Login</button>
        </form>
    );
}