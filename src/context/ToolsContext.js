// @ts-nocheck
import React, { useContext, useReducer } from 'react';

export const ToolsContext = React.createContext();

export function useToolsState() {
  return useContext(ToolsContext);
}

export function useCurrentTool() {
  const [toolsState] = useContext(ToolsContext);
  if (!!toolsState && !!toolsState.entities) {
    return toolsState.entities[toolsState.currentToolId];
  }
}

function updateToolsMap(state, action) {
  if (action.type === 'UPDATE_TOOL') {
    return {
      ...state,
      currentToolId: action.payload.id,
      entities: {
        ...state.entities,
        [action.payload.id]: {
          ...action.payload,
        },
      },
    };
  }
  if (action.type === 'CLEAR_CURRENT_TOOL') {
    return {
      ...state,
      currentToolId: null,
    };
  }
  if (action.type === 'UPDATE_COLOR') {
    return {
      ...state,
      currentColor: action.payload.hex,
    };
  }
}

export default function ToolProvider({ children }) {
  const [state, dispatch] = useReducer(updateToolsMap, {});

  return (
    <ToolsContext.Provider value={[state, dispatch]}>
      {children}
    </ToolsContext.Provider>
  );
}
