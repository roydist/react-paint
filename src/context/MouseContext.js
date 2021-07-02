// @ts-nocheck
import React, { useState, useContext, useEffect } from "react";

export const MouseStartContext = React.createContext();
export const MouseEndContext = React.createContext();
export const MouseDragStartContext = React.createContext();

export function useMousePositionStart() {
    return useContext(MouseStartContext);
}

export function useMousePositionEnd() {
    return useContext(MouseEndContext);
}

export function useMouseDragStart() {
    return useContext(MouseDragStartContext);
}

export default function MouseProvider({ children }) {
    const [posStart, setStart] = useState({clientX: 0, clientY: 0});
    const [posEnd, setEnd] = useState({clientX: 0, clientY: 0});
  
    const dragEnd = ({ clientX, clientY }) => {
    // setPrint(false);
    }
      
    const dragging = ({ clientX, clientY }) => {
        setEnd({
            clientX,
            clientY
        });
    }

    const updatePosition = event => {
        const { clientX, clientY } = event;
    
        setStart({
          clientX,
          clientY,
        });

        setEnd({
            clientX,
            clientY,
        });
      };
    
      useEffect(() => {
        // document.addEventListener("mousemove", updatePosition, false);
        document.addEventListener("mousedown", updatePosition, false);
        document.addEventListener("mouseup", dragging, false);
    
        return () => {
        //   document.removeEventListener("mousemove", updatePosition);
          document.removeEventListener("mousedown", updatePosition);
          document.removeEventListener("mouseup", dragging);
        };
      }, []);

    return (
        <MouseStartContext.Provider value={posStart}>
            <MouseEndContext.Provider value={posEnd}>
                        { children }
                </MouseEndContext.Provider>
        </MouseStartContext.Provider>
    );
}