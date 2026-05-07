import { useState, useEffect } from "react";
import api from "/src/services/api";
import Button from "../../components/ui/Button";
import EditModalCourses from "../../components/ui/EditModalCourses";
import Table from "../../components/ui/Table";

export default function CoursesAdmin() {
    const [data, setData] = useState([]);
    const [editing, setEditing] = useState(null);
    const [instruments, setInstruments] = useState([]);
    const [isCreating, setIsCreating] = useState(false);

    const fetchData = async () => {
        const res = await api.get("/courses");
        const instrumentsRes = await api.get("/instruments");
        setData(res.data);
        setInstruments(instrumentsRes.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        await api.delete(`/admin/courses/${id}`);
        fetchData();
    }

    return (
        <div>
            <h2 className="text-2xl mb-4">Cursos</h2>
            <Button
                onClick={() => {
                    setEditing(null);
                    setIsCreating(true);
                }}
                className="mb-4"
            >
                Agregar curso
            </Button>

            <Table
                columns={[
                    { key: "id", label: "ID" },
                    { key: "course_name", label: "Nombre del curso" },
                    { key: "course_description", label: "Descripción" },
                    { key: "instrument_name", label: "Instrumento" }
                ]}
                data={data.map(course => ({
                    ...course,
                    instrument_name: instruments.find(
                        inst => inst.id === course.instrument_id)?.instrument_name || "-"
                }))}
                renderActions={(row) => (
                    <div className="flex gap-2">
                        <Button onClick={() => {
                            setEditing(row);
                            setIsCreating(false);
                        }}>
                            Editar
                        </Button>
                        <Button onClick={() => handleDelete(row.id)}>
                            Eliminar
                        </Button>
                    </div>
                )}
            />

            {(editing || isCreating) && (
                <EditModalCourses
                    item={editing}
                    instruments={instruments}
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