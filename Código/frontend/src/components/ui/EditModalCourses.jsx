import { useState, useEffect } from "react";
import api from "/src/services/api";
import Button from "./Button";

export default function EditModalCourses({ item, instruments, onClose, onSave }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [instrument_id, setInstrumentId] = useState("");
    const isEdit = !!item?.id;

    useEffect(() => {
        if (item) {
            setName(item.course_name || "");
            setDescription(item.course_description || "");
            setInstrumentId(item.instrument_id || (instruments[0]?.id || ""));
        } else {
            setName("");
            setDescription("");
            setInstrumentId(instruments[0]?.id || "");
        }
    }, [item, instruments]);

    const handleSave = async () => {
        if (isEdit) {
            await api.put(`/admin/courses/${item.id}`, {
                course_name: name,
                course_description: description,
                instrument_id: instrument_id,
            });
        } else {
            await api.post(`/admin/courses`, {
                course_name: name,
                course_description: description,
                instrument_id: instrument_id,
            });
        }

        onSave();
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-surface2 p-6 rounded-lg w-96">
                <h2 className="text-lg font-bold pb-5 text-center">
                    {isEdit ? "Editar curso" : "Crear curso"}
                </h2>

                <p className="text-gray pb-1">Nombre del curso:</p>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full mb-4 p-2 bg-surface3 text-white rounded"
                    placeholder="Nombre del curso"
                />

                <p className="text-gray pb-1">Descripción del curso:</p>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full mb-3 p-2 bg-surface3 text-white rounded"
                    placeholder="Descripción del curso"
                />

                <p className="text-gray pb-1">Instrumento del curso:</p>
                <select
                    value={instrument_id}
                    onChange={(e) => setInstrumentId(Number(e.target.value))}
                    className="w-full mb-4 p-2 bg-surface3 text-white rounded"
                    placeholder="ID del instrumento asociado"
                >
                    <option value="">Selecciona un instrumento</option>
                    {instruments.map((instrument) => (
                        <option key={instrument.id} value={instrument.id}>
                            {instrument.instrument_name}
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