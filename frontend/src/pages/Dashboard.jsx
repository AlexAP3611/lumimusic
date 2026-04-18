import api from "../services/api";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);

    const [instruments, setInstruments] = useState([]);
    const [courses, setCourses] = useState([]);
    const [selectedInstrument, setSelectedInstrument] = useState(null);
    const [loadingCourses, setLoadingCourses] = useState(false);

    //1. cargar instrumentos
    useEffect(() => {
        api.get("/instruments")
            .then(res => setInstruments(res.data))
            .catch(err => console.error(err));
    }, []);

    //2. click instrumento -> cargar cursos 
    const handleInstrumentClick = (instrumentId) => {
        setSelectedInstrument(instrumentId);
        setLoadingCourses(true);
        setCourses([]);

        api.get(`/instruments/${instrumentId}/courses`)
            .then(res => {
                const data = Array.isArray(res.data) 
                ? res.data 
                : res.data.courses;

                setCourses(data);
            })
            .catch(err => console.error(err))
            .finally(() => setLoadingCourses(false));
    };

    const handleLogout = async () => {
        try {
            await api.post("/logout");
        } catch (error) {
            console.error("Error en el logout:", error.response?.data || error.message);
        }

        logout();
        navigate("/login");
    };

    return (
        <div>
            <h1>Dashboard</h1>

            <button onClick={handleLogout}>Logout</button>

            {/* INSTRUMENTOS */}
            <h2>Instrumentos</h2>
            
            {instruments.map(inst => (
                <button
                    key={inst.id}
                    onClick={() => handleInstrumentClick(inst.id)}
                >
                    {inst.instrument_name}
                </button>
            ))}

            <hr />

            {/* CURSOS */}
            <h2>Cursos</h2>

            {!selectedInstrument ? (
                <p>Selecciona un instrumento</p>
            ) : loadingCourses ? (
                <p>Cargando cursos...</p>
            ) : courses.length === 0 ? (
                <p>No hay cursos para este instrumento</p>
            ) : (
                courses.map(course => (
                    <div key={course.id}>
                        <h3>{course.course_name}</h3>
                        <p>{course.course_description}</p>
                        <p>Nivel: {course.level}</p>

                        {/* aquí luego metera navegación a lecciones */}
                        <button onClick={() => navigate(`/courses/${course.id}`)}
                            >Ver Curso
                        </button>
                    </div>
                ))
            )}
        </div>
    );
}