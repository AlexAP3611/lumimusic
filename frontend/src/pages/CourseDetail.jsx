import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

export default function CourseDetail() {
    const { id } = useParams();
    const [course, setCourse] = useState(null);

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
            .then(res => setCourse(res.data))
            .catch(err => console.error(err));
    }, [id]);

    if (!course) return <p>Cargando...</p>;

    return (
        <div>
            <h1>{course.course_name}</h1>
            <p>{course.course_description}</p>

            <h2>Lecciones:</h2>

            {course.lessons?.map(lesson => (
                <div key={lesson.id}>
                    <h3>
                        {lesson.lesson_name}
                        {lesson.completed && " (completada)"}
                    </h3>

                    <p>{lesson.lesson_description}</p>

                    {!lesson.completed && (
                        <button onClick={() => markCompleted(lesson.id)}>
                            Marcar como completada
                        </button>
                    )}

                </div>
            ))}
        </div>
    );
}