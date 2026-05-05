import { useEffect, useState } from "react";
import api from "../../services/api";
import PageContainer from "../../components/layout/PageContainer";
import Button from "../../components/ui/Button";
import Table from "../../components/ui/Table";
import EditModalInstruments from "../../components/ui/EditModalInstruments";


export default function InstrumentsAdmin() {
    const [data, setData] = useState([]);
    const [editing, setEditing] = useState(null);
    const [isCreating, setIsCreating] = useState(false);

    const fetchData = async () => {
        const res = await api.get("/instruments");
        setData(res.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        await api.delete(`/admin/instruments/${id}`);
        fetchData();
    };

    return (
        <div>
            <h2 className="text-2xl mb-4">Instrumentos</h2>
            <Button 
                onClick={() => {
                    setEditing(null);
                    setIsCreating(true);
                }}
                className="mb-4"
            >
                Agregar instrumento
            </Button>

            <Table
                columns={[
                    { key: "id", label: "ID" },
                    { key: "instrument_name", label: "Nombre del instrumento" }
                ]}
                data={data}
                renderActions={(row) => (
                    <div className="flex gap-2">
                        <Button onClick={() => {
                            setEditing(row)
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
                <EditModalInstruments
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