import { useEffect, useState } from "react";
import api from "../../services/api";
import PageContainer from "../../components/layout/PageContainer";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import InstrumentAdmin from "./InstrumentsAdmin";
import CoursesAdmin from "./CoursesAdmin";
import LessonsAdmin from "./LessonsAdmin";

export default function AdminPanel() {
    const [section, setSection] = useState("instruments");
    const [instruments, setInstruments] = useState([]);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        api.get("/instruments").then(res => setInstruments(res.data));
        api.get("/courses").then(res => setCourses(res.data));
    }, []);

    return (
        <PageContainer>
            <h1 className="text-3xl font-bold text-white mb-6">
                Panel de Administración
            </h1>

            <div className="flex gap-4 mb-8">
                <Button onClick={() => setSection("instruments")}>
                    Instrumentos
                </Button>
                <Button 
                    onClick={() => setSection("courses")}>
                    Cursos
                </Button>
                <Button onClick={() => setSection("lessons")}>
                    Lecciones
                </Button>
            </div>
            <div className="flex-1 p6">
                {section === "instruments" && <InstrumentAdmin />}
                {section === "courses" && <CoursesAdmin />}
                {section === "lessons" && <LessonsAdmin />}
            </div>

        </PageContainer>
    );
}