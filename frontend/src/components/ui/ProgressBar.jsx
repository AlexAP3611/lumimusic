export default function ProgressBar({ value = 0 }) {
    return (
        <div className="h-2 w-full bg-gray-300 rounded-full overflow-hidden">
            <div 
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
            style = {{ width: `${value}%` }}
            />
        </div>
    );
}