export default function Button({ children, onClick, className = "" }) {
    return (
        <button
            onClick={onClick}
            className={
                `bg-primary text-black px-4 py-2 rounded-xl
                hover:bg-primary/90 transition-colors 
                font-semibold hover:opacity-90 ${className}
                `}
            >
            {children}
            </button>
    );
}