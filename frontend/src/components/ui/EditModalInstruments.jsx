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
            <div className="bg-[#1c2b3c] p-6 rounded-lg w-96">
                <h2 className="text-lg font-bold mb-4">Editar instrumento</h2>
                <p className="text-gray-300 mb-2">Nombre del instrumento:</p>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#2a3b4c] text-white 
                        placeholder:text-[#5a6b7c] border border-[#5a6b7c] 
                        focus:outline-none focus:ring-2 focus:ring-blue-500 
                        mb-4 px-2 py-1 rounded"
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