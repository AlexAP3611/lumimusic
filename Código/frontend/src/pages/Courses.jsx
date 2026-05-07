import { useState, useEffect } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

import PageContainer from "../components/layout/PageContainer";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import ProgressBar from "../components/ui/ProgressBar";

export default function Courses() {
    const navigate = useNavigate();

    const [myCourses, setMyCourses] = useState([]);
    const [allCourses, setAllCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    const avaliable = allCourses.filter(
        course => !myCourses.find(c => c.id === course.id)
    );

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const myRes = await api.get("/my-courses");
                const allRes = await api.get("/courses");

                setMyCourses(myRes.data);
                setAllCourses(allRes.data);
            } catch (error) {
                console.error("Error fetching courses:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();

    }, []);

    if (loading) {
        return (
            <PageContainer>
                <p className="text-gray-400 text-center">
                    Cargando cursos...
                </p>
            </PageContainer>
        );
    }

    return (
        <PageContainer>
            <h1 className="text-3xl font-bold text-white mb-2 text-center border-b border-gray-700 pb-4">
                Cursos
            </h1>

            <h2 className="text-xl font-semibold text-white text-center pb-4">
                Mis cursos
            </h2>

            {myCourses.length === 0 ? (
                <p className="text-center text-gray-400 mb-6">
                    No estás inscrito en ningún curso. Explora los cursos disponibles y comienza a aprender.
                </p>
            ) : (
                <div className="grid md:grid-cols-2 gap-5 mb-10 border-b border-gray-700 pb-10">
                    {myCourses.map(course => (
                        <Card key={course.id}>
                            <h2 className="text-xl font-semibold text-white text-center mb-3">
                                {course.course_name}
                            </h2>
                            <img
                                src={course.image_url}
                                alt={course.course_name}
                                className="w-full h-32 object-cover rounded-lg mb-4"
                            />

                            <p className="text-gray-400 mt-2">
                                {course.course_description}
                            </p>

                            <p className="text-gray-400 mt-4">
                                Nivel: {course.level}
                            </p>

                            <div className="mt-4">
                                <ProgressBar value={course.progress ?? 0} />
                            </div>

                            <div className="mt-4">
                                <Button onClick={() => navigate(`/courses/${course.id}`)}>
                                    Ver lecciones
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            <h2 className="text-xl font-semibold text-white mt-10 pb-4 text-center">
                Cursos disponibles
            </h2>

            <div className="grid md:grid-cols-2 gap-5 mb-10 border-b border-gray-700 pb-10">
                {avaliable.map(course => (
                    <Card key={course.id}>
                        <h2 className="text-white font-semibold text-center mb-3">
                            {course.course_name}
                        </h2>
                        <img
                            src={course.image_url}
                            alt={course.course_name}
                            className="w-full h-32 object-cover rounded-lg mb-4"
                        />

                        <p className="text-gray-400 mt-2">
                            {course.course_description}
                        </p>

                        <p className="text-gray-400 mt-2">
                            Nivel: {course.level}
                        </p>

                        <Button onClick={() => navigate(`/courses/${course.id}`)}>
                            Ver curso
                        </Button>
                    </Card>
                ))}
            </div>
        </PageContainer>
    );
}