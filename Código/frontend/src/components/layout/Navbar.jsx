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
            ? "text-cyan-400 border-b-2 border-cyan-400 pb-1"
            : "text-slate-400 hover:text-[#84cc16] transition-all";

    return (
        <nav className="sticky top-0 w-full border-b border-white/10 bg-[#0f172a]/80 backdrop-blur-md shadow-sm z-50">
            <div className="flex justify-between items-center px-6 h-16 w-full max-w-[1280px] mx-auto">

                {/* LOGO */}
                <div className="flex items-center gap-3">
                    <span className="text-lg font-black text-[#84cc16]">
                        LumiMusic
                    </span>
                </div>

                {/* NAV LINKS (Desktop) */}
                <div className="hidden md:flex items-center gap-6 font-medium">
                    <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>
                    <NavLink to="/instruments" className={linkClass}>Instrumentos</NavLink>
                    <NavLink to="/courses" className={linkClass}>Cursos</NavLink>
                    <NavLink to="/tuner" className={linkClass}>Afinador</NavLink>
                    {/*
                    <NavLink to="/practice" className={linkClass}>Práctica</NavLink>
                    */}
                    {user?.role === 'admin' && (
                        <NavLink to="/admin" className={linkClass}>
                            Admin
                        </NavLink>
                    )}
                </div>

                {/* USER SECTION (Desktop Dropdown & Mobile Toggle) */}
                <div className="flex items-center gap-4">

                    {/* USER */}
                    <div className="flex items-center gap-4 text-sm">
                        <span className="text-primary font-semibold">
                            {user?.name}
                        </span>
                        <button
                            onClick={handleLogout}
                            className="text-red hover:text-red-300 transition"
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