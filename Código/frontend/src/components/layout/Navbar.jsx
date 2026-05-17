import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import api from "../../services/api";

export default function Navbar() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Menú móvil
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false); // Dropdown usuario

    const handleLogout = async () => {
        try {
            await api.post("/logout");
        } catch (err) {
            console.log(err);
        } finally {
            logout();
            navigate("/login");
        }
    };

    const linkClass = ({ isActive }) =>
        isActive
            ? "text-secondary border-b-2 border-cyan-400 pb-1"
            : "text-white hover:text-primary transition-all";

    return (
        <nav className="sticky top-0 w-full border-b border-primary bg-surface backdrop-blur-md shadow-sm z-50">
            <div className="flex justify-between items-center px-6 h-16 w-full max-w-[1280px] mx-auto">

                {/* LOGO */}
                <div className="flex items-center gap-3">
                    <span
                        className="material-symbols-outlined text-primary"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                        graphic_eq
                    </span>
                    <span className="text-lg font-black text-primary">
                        LumiMusic
                    </span>
                </div>

                {/* NAV LINKS (Desktop) */}
                <div className="hidden md:flex items-center gap-6 font-medium border-x px-4">
                    <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>
                    <NavLink to="/instruments" className={linkClass}>Instrumentos</NavLink>
                    <NavLink to="/courses" className={linkClass}>Cursos</NavLink>
                    <NavLink to="/tuner" className={linkClass}>Afinador</NavLink>
                    {/*
                    <NavLink to="/practice" className={linkClass}>Práctica</NavLink>
                    */}
                    <NavLink to="/settings" className={linkClass}>Ajustes</NavLink>
                    {user?.role === 'admin' && (
                        <NavLink to="/admin" className={linkClass}>
                            Admin
                        </NavLink>
                    )}
                </div>

                {/* USER SECTION (Desktop Dropdown & Mobile Toggle) */}
                <div className="flex items-center gap-4">

                    {/* USER */}
                    <div className="flex items-center gap-4 text">
                        <span className="text-primary font-bold">
                            {user?.name}
                        </span>
                        <button
                            onClick={handleLogout}
                            className="text-red-400 hover:text-red-500 transition"
                        >
                            Cerrar sesión
                        </button>
                    </div>
                </div>

                {/* BOTÓN HAMBURGUESA (Solo móvil) */}
                <button
                    className="md:hidden p-2 text-slate-400 hover:text-white"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <span className="material-symbols-outlined">
                        {isMenuOpen ? 'close' : 'menu'}
                    </span>
                </button>
            </div>


            {/* MENÚ MÓVIL */}
            {
                isMenuOpen && (
                    <div className="md:hidden bg-[#0f172a] border-b border-white/10 px-6 py-4 flex flex-col gap-4">
                        <NavLink to="/dashboard" className={linkClass} onClick={() => setIsMenuOpen(false)}>Dashboard</NavLink>
                        <NavLink to="/instruments" className={linkClass} onClick={() => setIsMenuOpen(false)}>Instrumentos</NavLink>
                        <NavLink to="/courses" className={linkClass} onClick={() => setIsMenuOpen(false)}>Cursos</NavLink>
                        <NavLink to="/tuner" className={linkClass} onClick={() => setIsMenuOpen(false)}>Afinador</NavLink>
                        {/*
                        <NavLink to="/practice" className={linkClass} onClick={() => setIsMenuOpen(false)}>Práctica</NavLink>
                        */}
                        <NavLink to="/settings" className={linkClass} onClick={() => setIsMenuOpen(false)}>Ajustes</NavLink>
                        {user?.role === 'admin' && (
                            <NavLink to="/admin" className={linkClass}>
                                Admin
                            </NavLink>
                        )}
                    </div>
                )}
        </nav >
    );
}