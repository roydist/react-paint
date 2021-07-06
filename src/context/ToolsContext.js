import React, { useContext, useReducer } from 'react';
import { toolsReducer, toolsInitialState } from 'reducer/tools.reducer';

export const ToolsContext = React.createContext();

export function useToolsState() {
  return useContext(ToolsContext);
}

export function getCurrentTool() {
  const [toolsState] = useContext(ToolsContext);
  if (!!toolsState && !!toolsState.entities) {
    return toolsState.entities[toolsState.currentToolId];
  }
}

export default function ToolProvider({ children }) {
  const [state, dispatch] = useReducer(toolsReducer, toolsInitialState);

  return (
    <ToolsContext.Provider value={[state, dispatch]}>
      {children}
    </ToolsContext.Provider>
  );
}
