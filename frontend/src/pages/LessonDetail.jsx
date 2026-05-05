import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import Button from "../components/ui/Button";

export default function LessonDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [lesson, setLesson] = useState(null);

    useEffect(() => {
        api.get(`/lessons/${id}`)
            .then(res => setLesson(res.data))
            .catch(err => console.error(err));
    }, [id]);

    const markCompleted = async () => {
        try {
            await api.post("/progress", {
                lesson_id: id,
            });

            const res = await api.get(`/lessons/${id}`);
            console.log(res.data);
            setLesson(res.data);

        } catch (error) {
            console.error("Error marcando la lección como completada:", error);
        }
    };

    if (!lesson) return <p className="text-white">Cargando...</p>;

    return (
        <div className="max-w px-4 py-6 text-white">
            <div>
                <div className="pt-4">
                    <button onClick={() => navigate(-1)}
                        className="text-md text-gray-400 hover:text-white transition">
                        ← Volver
                    </button>
                </div>
            </div>
            <div className="border-b border-gray-700 pb-4 mb-6 text-center">
                <h1 className="text-3xl font-bold text-white mb-2">
                    {lesson.lesson_name}
                </h1>
                <p className="text-gray-400">
                    {lesson.lesson_description}
                </p>
                <Button
                    className="mt-4"
                    onClick={markCompleted}
                    disabled={lesson.completed}
                >
                    {lesson.completed ? "Lección completada" : "Marcar como completada"}
                </Button>
            </div>
        </div>
    );
}