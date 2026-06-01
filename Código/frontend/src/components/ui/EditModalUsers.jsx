import { useState, useEffect } from "react";
import api from "/src/services/api";
import Button from "./Button";

export default function EditModalUsers({ item, onClose, onSave }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const isEdit = !!item?.id;

    useEffect(() => {
        if (item) {
            setName(item.name || "");
            setEmail(item.email || "");
            setRole(item.role || "user");
            setPassword("");
        }
    }, [item]);

    const handleSave = async () => {
        const data = { name, email, role };
        if (password) {
            data.password = password
        }

        if (isEdit) {
            await api.put(`/admin/users/${item.id}`, data);
        } else {
            await api.post(`/register`, { ...data, password });
        }

        onSave();
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-surface2 p-6 rounded-lg w-96">
                <h2 className="text-lg font-bold pb-5 text-center">
                    {isEdit ? "Editar usuario" : "Crear usuario"}
                </h2>

                <p className="text-gray pb-1">Nombre del usuario:</p>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full mb-4 p-2 bg-surface3 text-white rounded"
                    placeholder="nombre"
                    />

                <p className="text-gray pb-1">Email del usuario:</p>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full mb-4 p-2 bg-surface3 text-white rounded"
                    placeholder="email"
                />

                <p className="text-gray pb-1">Contraseña del usuario:</p>
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full mb-4 p-2 bg-surface3 text-white rounded"
                    placeholder="Contraseña"
                />

                <p className="text-gray pb-1">Rol del usuario:</p>
                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full mb-4 p-2 bg-surface3 text-white rounded"
                    placeholder="email"
                >
                    <option value="user">Usuario</option>
                    <option value="admin">Administrador</option>
                </select>

                <div className="flex justify-end gap-2">
                    <Button onClick={onClose} color="secondary">Cancelar</Button>
                    <Button onClick={handleSave} color="secondary">Guardar</Button>
                </div>
            </div>
        </div>
    );
}