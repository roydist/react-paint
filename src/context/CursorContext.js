// @ts-nocheck
import React, { useState, useContext, useEffect } from "react";

export const CursorContext = React.createContext();

export function useCursorPosition() {
    return useContext(CursorContext);
}

export default function CursorProvider({ children }) {
    const [position, setPosition] = useState({clientX: 0, clientY: 0});
  
    const update = event => {
        const { clientX, clientY } = event;
    
        setPosition({
          clientX,
          clientY,
        });
      };
    
      useEffect(() => {
            document.addEventListener("mousemove", update, false);
        return () => {
            document.removeEventListener("mousemove", update);
        };
      }, []);

    return (
        <CursorContext.Provider value={position}>
            { children }
        </CursorContext.Provider>
    );
}