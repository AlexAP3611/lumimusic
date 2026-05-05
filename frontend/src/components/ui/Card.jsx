export default function Card({ children, className = ""}) {
    return (
        <div className={
            `bg-#1c2b3c border border-white/10 
            rounded-lg p-4 hover:border-cyan-400 
            transition-colors 
            ${className}`}>
            {children}
        </div>
    );
}