export default function Loading() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
            <div className="w-12 h-12 border-4 border-gray-700 border-t-[#84cc16] rounded-full animate-spin" />
            <p className="text-gray-400 text-sm">Cargando...</p>
        </div>
    );
}