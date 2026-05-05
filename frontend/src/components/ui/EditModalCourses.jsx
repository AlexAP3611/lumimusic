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
            <div className="bg-[#1c2b3c] p-6 rounded-lg w-96">
                <h2 className="text-lg font-bold mb-4">
                    {isEdit ? "Editar curso" : "Crear curso"}
                </h2>

                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#2a3b4c] text-white placeholder:text-[#5a6b7c] border border-[#5a6b7c] focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                    placeholder="Nombre del curso"
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-[#2a3b4c] text-white placeholder:text-[#5a6b7c] border border-[#5a6b7c] focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                    placeholder="Descripción del curso"
                />
                <select
                    value={instrument_id}
                    onChange={(e) => setInstrumentId(Number(e.target.value))}
                    className="w-full bg-[#2a3b4c] text-white placeholder:text-[#5a6b7c] border border-[#5a6b7c] focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
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