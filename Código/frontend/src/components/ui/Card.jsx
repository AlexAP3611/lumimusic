export default function Card({ children, className = ""}) {
    return (
        <div className={
            `bg-surface border 
            rounded-lg p-4 hover:border-cyan-400 
            transition-colors 
            ${className}`}>
            {children}
        </div>
    );
}