import api from "../services/api";
import PageContainer from "../components/layout/PageContainer";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { useEffect, useState, useContext } from "react";
import { useInstrument } from "../context/InstrumentContext";
import { useNavigate } from "react-router-dom";

export default function Instruments() {
    const [instruments, setInstruments] = useState([]);
    const [myInstruments, setMyInstruments] = useState([]);
    const navigate = useNavigate();

    const fetchMyInstruments = async () => {
        const res = await api.get("/user-instruments");
        setMyInstruments(res.data ?? []);
    }

    const handleAdd = async (instrument) => {
        await api.post("/user-instruments", {
            instrument_id: instrument.id
        });

        fetchMyInstruments();
    };

    const handleRemove = async (id) => {
        await api.delete(`/user-instruments/${id}`);
        fetchMyInstruments();
    };

    const handleViewCourses = (instrument) => {
        navigate(`/courses?instrument=${instrument.id}`);
    }

    const avaliableInstruments = instruments.filter(
        inst => !myInstruments.find(i => i.id === inst.id)
    );

    useEffect(() => {
        api.get("/instruments")
            .then(res => setInstruments(res.data))
            .catch(err => console.error(err));

        fetchMyInstruments();
    }, []);

    return (
        <PageContainer>
            <div className="border-b border-gray-700 mb-10">
                <h1 className="text-3xl font-bold text-white mb-6 text-center">
                    Instrumentos
                </h1>
            </div>

            {/* TUS INSTRUMENTOS */}
            <h2 className="text-xl text-white pb-5 text-center">Tus Instrumentos</h2>

            {myInstruments.length === 0 ? (
                <div className="border-b border-gray-700 mb-10">
                    <p className="text-gray-400 mb-6 text-center">
                        No has añadido ningún instrumento aún
                    </p>
                </div>
            ) : (
                <div className="grid md:grid-cols-3 gap-4 mb-10 border border-gray-700 pb-10">
                    {myInstruments.map(inst => (
                        <Card key={inst.id} className="relative group">
                            <h3 className="text-white font-semibold text-center pb-5">
                                {inst.instrument_name.charAt(0).toUpperCase() + inst.instrument_name.slice(1)}
                            </h3>
                            <img
                                src={inst.image_url}
                                alt={inst.instrument_name}
                                className="w-full h-32 object-cover rounded-lg mb-4"
                            />

                            {/* HOVER */}
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                                <Button onClick={() => handleViewCourses(inst)}>
                                    Cursos
                                </Button>
                                <Button onClick={() => handleRemove(inst.id)}>
                                    Quitar
                                </Button>
                            </div>

                        </Card>
                    ))}
                </div>
            )}

            {/* EXPLORAR */}

            <h2 className="text-xl text-white mb-4 text-center">
                Explorar Instrumentos
            </h2>

            <div className="grid md:grid-cols-3 gap-5 mt-8 mb-10 border-b border-gray-700 pb-10">

                {avaliableInstruments.map(inst => (
                    <Card key={inst.id} className="relative group overflow-hidden">
                        <h3 className="text-white font-semibold text-center pb-5">
                            {inst.instrument_name.charAt(0).toUpperCase() + inst.instrument_name.slice(1)}
                        </h3>
                        <img
                            src={inst.image_url}
                            alt={inst.instrument_name}
                            className="w-full h-32 object-cover rounded-lg mb-4"
                        />

                        <div className="
                            absolute inset-0 z-10 
                            bg-black/60 opacity-0 
                            group-hover:opacity-100 
                            transition flex items-center 
                            justify-center gap-2 
                            pointer-events-none 
                            group-hover:pointer-events-auto
                            ">
                            <Button onClick={() => handleAdd(inst)}>
                                Añadir
                            </Button>
                        </div>

                    </Card>
                ))}

            </div>

        </PageContainer>
    );
}