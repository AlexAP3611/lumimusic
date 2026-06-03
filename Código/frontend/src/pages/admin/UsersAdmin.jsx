import { useEffect, useState } from "react";
import api from "../../services/api";
import PageContainer from "../../components/layout/PageContainer";
import Button from "../../components/ui/Button";
import Table from "../../components/ui/Table";
import EditModalUsers from "../../components/ui/EditModalUsers";
import Loading from "../../components/ui/Loading";

export default function UsersAdmin() {
    const [data, setData] = useState ([]);
    const [editing, setEditing] = useState(null);
    const [isCreating, setIsCreating] = useState(false);
    const [loading, setLoading] = useState(true);
    const fetchData = async () => {
        const res = await api.get("/admin/users");
        setData(res.data);
    };

    useEffect(() => {
        fetchData().finally(() => setLoading(false));
    }, []);

    const handleDelete = async (id) => {
        await api.delete(`/admin/users/${id}`);
        fetchData();
    };

    if (loading) return <Loading />;

    return (
        <div>
            <h2 className="text-2xl text-white mb-4">Usuarios</h2>
            <Button
                className="mb-4"
                onClick={() => {
                    setEditing(null);
                    setIsCreating(true);
                }}
            >
                Agregar usuario
            </Button>

            <Table
                columns={[
                    { key: "id", label: "ID" },
                    { key: "name", label: "Nombre" },
                    { key: "email", label: "Email" },
                    { key: "role", label: "Rol" },
                ]}
                data={data}
                renderActions={(row) => (
                    <div className="flex gap-2">
                        <Button onClick={() => {
                            setEditing(row);
                            setIsCreating(false);
                        }}>
                            Editar
                        </Button>
                        <Button onClick={() => handleDelete(row.id)} color="red">
                            Eliminar
                        </Button>
                    </div>
                )}
            />

            {(editing || isCreating) && (
                <EditModalUsers
                    item={editing}
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