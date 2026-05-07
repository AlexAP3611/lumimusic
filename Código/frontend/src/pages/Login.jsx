import { useState, useContext } from "react";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";

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
            console.log("RESPUESTA LOGIN: ", res.data);
            login(res.data);
            console.log("Login correcto", res.data);
            navigate("/dashboard");
        } catch (error) {
            console.error("Error en el login:", error.response?.data || error.message);
        }
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="w-full max-w-md bg-[#1e293b] p-8 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10">
                <form onSubmit={handleSubmit} className="flex gap-5 flex-col">
                    <h2 className="text-2xl font-bold text-white mb-4 text-center">Inicio de sesión</h2>
                    <input
                        className="border rounded-2xl p-2"
                        placeholder="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                    <input
                        className="border rounded-2xl p-2"
                        type="password"
                        placeholder="password"
                        value={form.password}
                        onChange={(e) =>
                            setForm({ ...form, password: e.target.value })}
                    />
                    <Button type="submit">
                        Iniciar sesión
                    </Button>
                </form>
            </div>
        </div>
    );
}