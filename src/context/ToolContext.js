// @ts-nocheck
import React, { useState, useContext } from "react";

export const  ToolContext = React.createContext();
export const  SetToolContext = React.createContext();

export function useTool() {
    return useContext(ToolContext);
}

export function useSetTool() {
    return useContext(SetToolContext);
}

export default function ToolProvider({ children }) {
    const [tool, setTool] = useState();

    return (
        <ToolContext.Provider value={tool}>
            <SetToolContext.Provider value={setTool}>
                { children }
            </SetToolContext.Provider>
        </ToolContext.Provider>
    );
}