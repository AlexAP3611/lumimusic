import { use, useState } from "react";
import api from "../services/api";
import PageContainer from "../components/layout/PageContainer";
import Button from "../components/ui/Button";

export default function Settings() {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async () => {
        setError(null);
        setSuccess(null);

        if (newPassword !== confirmPassword) {
            setError("Las contraseñas nuevas no coinciden");
            return;
        }

        try {
            await api.put("/user/password", {
                current_password: current_password,
                new_password: new_password,
                new_password_confirmation: confirmPassword,
            });
            setSuccess("Contraseña actualizada correctamente");
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (err) {
            setError(err.response?.data?.message || "Error al actualizar la contraseña");
        }
    };

    return (
        <PageContainer>
            <h1 className="text-3xl font-bold text-primary-text mb-6 text-center border-b border-gray pb-4">
                Ajustes
            </h1>

            <div className="max-w-md mx-auto bg-surface2 p-6 rounded-lg">

                <h2 className="text-xl font-semibold text-white mb-4 text-center">
                    Cambiar contraseña
                </h2>

                {error && <p className="text-red-400 mb-4">{error}</p>}
                {success && <p className="text-green-400 mb-4">{success}</p>}
                <div className="flex flex-col">
                    <p className="text-gray pb-1">Contraseña actual:</p>
                    <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full mb-4 p-2 bg-surface3 text-white placeholder:text-[#5a6b7c] rounded"
                        placeholder="Contraseña actual"
                    />

                    <p className="text-gray pb-1">Nueva contraseña:</p>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full mb-4 p-2 bg-surface3 text-white placeholder:text-[#5a6b7c] rounded"
                        placeholder="Nueva contraseña"
                    />

                    <p className="text-gray pb-1">Confirmar nueva contraseña:</p>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full mb-4 p-2 bg-surface3 text-white rounded"
                        placeholder="Confirmar nueva contraseña"
                    />

                    <Button onClick={handleSubmit}>
                        Guardar cambios
                    </Button>
                </div>
            </div>
        </PageContainer>
    )
}