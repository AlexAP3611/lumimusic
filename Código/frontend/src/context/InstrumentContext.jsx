import { createContext, useState, useContext, useEffect } from "react";

const InstrumentContext = createContext();

export const InstrumentProvider = ({ children }) => {
    const [selectedInstrument, setSelectedInstrument] = useState(null);

    return (
        <InstrumentContext.Provider value={{
            selectedInstrument,
            setSelectedInstrument,
        }}>
            {children}
        </InstrumentContext.Provider>
    );
};

export function useInstrument() {
    return useContext(InstrumentContext);
}