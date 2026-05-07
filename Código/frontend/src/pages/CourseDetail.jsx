import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import ProgressBar from "../components/ui/ProgressBar";
import Button from "../components/ui/Button";
import { useNavigate } from "react-router-dom";

export default function CourseDetail() {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const navigate = useNavigate();

    const markCompleted = async (lessonId) => {
        try {
            await api.post("/progress", {
                lesson_id: lessonId,
            });

            // actualizar UI localmente
            setCourse(prev => ({
                ...prev,
                lessons: prev.lessons.map(lesson =>
                    lesson.id === lessonId
                        ? { ...lesson, completed: true }
                        : lesson
                )
            }));
        } catch (error) {
            console.error("Error marcando la lección como completada:", error);
        }
    };

    useEffect(() => {
        api.get(`/courses/${id}`)
            .then(res => {
                console.log(res.data);
                setCourse(res.data);
            })
            .catch(err => console.error(err));
    }, [id]);

    if (!course) return <p>Cargando...</p>;

    return (
        <div>
            <div className=" pt-4">
                <button onClick={() => navigate(-1)}
                    className="text-md text-gray-400 hover:text-white transition">
                    ← Volver
                </button>
            </div>
            <div className="mb-6 border-b border-gray-700 pb-4 text-center">
                <h1 className="text-3xl font-bold text-white mb-2">
                    {course.course_name}
                </h1>
                <p className="text-gray-400">
                    {course.course_description}
                </p>
                <span>Progreso:<ProgressBar value={course.progress ?? 0} /></span>
            </div>

            <h2 className="text-center text-xl font-semibold text-white mb-4">
                Lecciones:
            </h2>

            {course.lessons?.map(lesson => (
                <div key={lesson.id}
                    className="flex justify-between items-center p-4 rounded-lg border border-gray-700 mb-3">
                    <h3>
                        {lesson.lesson_name}
                        {lesson.completed && " (completada)"}
                    </h3>

                    <p>{lesson.lesson_description}</p>

                    {!lesson.completed && (
                        <Button onClick={() => markCompleted(lesson.id)}>
                            Marcar como completada
                        </Button>
                    )}
                    <Button onClick={() => navigate(`/lessons/${lesson.id}`)}>
                        Ver lección
                    </Button>

                </div>
            ))}
        </div>
    );
}