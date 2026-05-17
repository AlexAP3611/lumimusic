import { useState, useEffect } from "react";
import api from "/src/services/api";
import Button from "./Button";

export default function EditModalInstruments({ item, onClose, onSave }) {
    const [name, setName] = useState("");
    const isEdit = !!item?.id;

    useEffect(() => {
        if (item) {
            setName(item.instrument_name || "");
        }
    }, [item]);

    const handleSave = async () => {
        if (isEdit) {
            await api.put(`/admin/instruments/${item.id}`, {
                instrument_name: name
            });
        } else {
            await api.post(`/admin/instruments`, {
                instrument_name: name
            });
        }

        onSave();
        onClose();
    };

    

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-surface2 p-6 rounded-lg w-96">
                <h2 className="text-lg font-bold pb-5 text-center">
                    {isEdit ? "Editar instrumento" : "Crear instrumento"}
                </h2>
                <p className="text-gray pb-1">Nombre del instrumento:</p>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full mb-4 p-2 bg-surface3 text-white rounded"
                    placeholder="Nombre del instrumento"
                />
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