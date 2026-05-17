import { useState, useEffect, useDebugValue } from "react";
import api from "/src/services/api";
import Button from "/src/components/ui/Button";

export default function EditModalLessons({ item, courses, onClose, onSave, isCreating }) {
    const [name, setName] = useState(item?.lesson_name || "");
    const [description, setDescription] = useState(item?.lesson_description || "");
    const [courseId, setCourseId] = useState(item?.course_id || "");

    const handleSave = async () => {
        try {
            if (item.id) {
                await api.put(`/admin/lessons/${item.id}`, {
                    lesson_name: name,
                    lesson_description: description,
                    course_id: courseId
                });
            } else {
                await api.post("/admin/lessons", {
                    lesson_name: name,
                    lesson_description: description,
                    course_id: courseId
                });
            }
            onSave();
            onClose();
        } catch (error) {
            console.error("Error saving lesson:", error);
        }
    };

    useEffect(() => {
        setName(item?.lesson_name || "");
        setDescription(item?.lesson_description || "");
        setCourseId(item?.course_id || "");
    }, [item]);

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-surface2 p-6 rounded-lg w-96">
                <h2 className="text-lg font-bold pb-5 text-center">
                    {item.id ? "Editar lección" : "Crear lección"}
                </h2>

                <p className="text-gray pb-1">Nombre del la lección:</p>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full mb-4 p-2 bg-surface3 text-white rounded"
                    placeholder="Nombre de la lección"
                />

                <p className="text-gray pb-1">Descripción de la lección:</p>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full mb-4 p-2 bg-surface3 text-white rounded"
                    placeholder="Descripción de la lección  "
                />

                <p className="text-gray pb-1">Curso de la lección:</p>
                <select
                    value={courseId}
                    onChange={(e) => setCourseId(e.target.value ? Number(e.target.value) : null)}
                    className="w-full mb-4 p-2 bg-surface3 text-white rounded"
                >
                    <option value="">Selecciona un curso</option>

                    {courses.map((course) => (
                        <option key={course.id} value={course.id}>
                            {course.course_name}
                        </option>
                    ))}
                </select>

                <div className="flex justify-end gap-2">
                    <Button onClick={onClose} color="secondary">
                        Cancelar
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Guardar
                    </Button>
                </div>
            </div>
        </div>
    )
}