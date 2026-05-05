import api from "../services/api";
import PageContainer from "../components/layout/PageContainer";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import ProgressBar from "../components/ui/ProgressBar";
import { useState, useEffect, useContext, use } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useInstrument } from "../context/InstrumentContext";

export default function Dashboard() {
    const navigate = useNavigate();
    const { logout, user } = useContext(AuthContext);
    const [myInstruments, setMyInstruments] = useState([]);
    const [myCourses, setMyCourses] = useState([]);

    const filteredCourses = (myInstruments ?? []).length === 0
        ? myCourses
        : myCourses.filter(course =>
            myInstruments.some(inst => inst.id === course.instrument_id)
        );

    useEffect(() => {
        api.get("/my-courses")
            .then(res => setMyCourses(res.data))
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        api.get("/user-instruments")
            .then(res => setMyInstruments(res.data ?? []))
            .catch(err => console.error(err));
    }, []);

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
        <PageContainer>

            <div className="mb-4 border-b border-gray-700 pb-4 ">
                <h1 className="text-3xl font-bold text-white mb-6">
                    Bienvenido, <span className={`text-secondary`}>{user?.name}</span>
                </h1>
                <div className="flex items-center gap-3 mt-4 w-full">
                    <p className="text-gray-400">
                        ¡Bienvenido a tu panel de control!
                    </p>
                    <Button
                        className="px-6 py-3 ml-auto"
                        onClick={() => navigate("/practice")} >
                        Ir a práctica
                    </Button>
                </div>
            </div>

            <h2 className="text-xl text-white pb-5 text-center">
                Mis Instrumentos
            </h2>

            <div className="flex justify-center mb-6 border-b border-gray-700 pb-6">
                {myInstruments.length === 0 ? (
                    <p className="text-gray-400 mb-6 text-center">
                        No has añadido instrumentos aún
                    </p>
                ) : (
                    <div className="flex flex-wrap gap-3 mb-10">
                        {myInstruments.map(inst => (
                            <Card key={inst.id} className="px-4 py-3">
                                <h3 className="text-white font-semibold text-center pb-5">
                                    {inst.instrument_name.charAt(0).toUpperCase() + inst.instrument_name.slice(1)}
                                </h3>
                                <img
                                    src={inst.image_url}
                                    alt={inst.instrument_name}
                                    className="w-full h-32 object-cover rounded-lg mb-4"
                                />

                                <Button
                                    className="w-full"
                                    onClick={() => navigate(`/courses?instrument=${inst.id}`)}>
                                    Ver cursos
                                </Button>
                            </Card>
                        ))}
                    </div>
                )}
            </div>

            {/* MIS CURSOS */}
            <h2 className="text-xl text-white pb-5 text-center">Mis Cursos</h2>

            {filteredCourses.length === 0 ? (
                <p className="text-gray-400 mb-6 text-center">No tienes cursos aún</p>
            ) : (
                <div className="flex flex-wrap gap-5 mb-10 justify-center border-b border-gray-700 pb-10">
                    {filteredCourses.map(course => (
                        <Card key={course.id}>
                            <h3 className="text-white font-semibold text-center pb-5">
                                {course.course_name}
                            </h3>
                            <img
                                src={course.image_url}
                                alt={course.course_name}
                                className="w-full h-32 object-cover rounded-lg mb-4"
                            />

                            <div className="mt-2 mb-3">
                                <ProgressBar value={course.progress ?? 0} />
                            </div>

                            <Button
                                className="w-full"
                                onClick={() => navigate(`/courses/${course.id}`)}>
                                Continuar
                            </Button>
                        </Card>
                    ))}
                </div>
            )}

        </PageContainer>
    );
}