import { useState, useEffect } from "react";
import api from "/src/services/api";
import Button from "/src/components/ui/Button";
import EditModalLessons from "../../components/ui/EditModalLessons";
import Table from "../../components/ui/Table";

export default function LessonsAdmin() {
    const [data, setData] = useState([]);
    const [editing, setEditing] = useState(null);
    const [courses, setCourses] = useState([]);
    const [isCreating, setIsCreating] = useState(false);
    const courseMap = Object.fromEntries(
        courses.map((c) => [c.id, c.course_name])
    );
    

    const fetchData = async () => {
        const res = await api.get("/lessons");
        const coursesRes = await api.get("/courses");
        setData(res.data);
        setCourses(coursesRes.data);
    };
    
    const handleDelete = async (id) => {
        try {
            await api.delete(`/admin/lessons/${id}`);
            fetchData();
        } catch (error) {
            console.error("Error deleting lesson:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <h2 className="text-2xl mb-4">Lecciones</h2>
            <Button 
                onClick={() => setEditing({ 
                    id: null,
                    lesson_name: "", 
                    lesson_description: "", 
                    course_id: "" })}
                className="mb-4"
            >
                Agregar lección
            </Button>

            <Table
                columns={[
                    { key: "id", label: "ID" },
                    { key: "lesson_name", label: "Nombre de la lección" },
                    { key: "lesson_description", label: "Descripción" },
                    { key: "course_name", label: "Curso" }
                ]}
                data={data.map((lesson) => ({
                    id: lesson.id,
                    lesson_name: lesson.lesson_name,
                    lesson_description: lesson.lesson_description,
                    course_name: courseMap[lesson.course_id] || "Curso no encontrado"
                }))}
                renderActions={(row) => {
                    const original = data.find((l) => l.id === row.id);
                    return (
                        <div className="flex gap-2">
                            <Button onClick={() => setEditing(original)}>
                                Editar
                        </Button>
                        <Button onClick={() => handleDelete(row.id)}>
                            Eliminar
                        </Button>
                    </div>    
    )}}
            />

            {(editing || isCreating) && (
                <EditModalLessons
                    item={editing}
                    courses={courses}
                    isCreating={isCreating}
                    onClose={() => {
                        setEditing(null);
                        setIsCreating(false);
                    }}
                    onSave={fetchData}
                />
            )}
        </div>
    )
}