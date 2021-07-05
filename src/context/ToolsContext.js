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
  return null;
}

function updateToolsMap(state, action) {
  if (action.type === 'UPDATE_TOOL') {
    return {
      ...state,
      currentToolId: !!action.payload.height ? null : action.payload.id,
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
}

export default function ToolProvider({ children }) {
  const [toolsState, dispatchSetToolsState] = useReducer(updateToolsMap, {});

  return (
    <ToolsContext.Provider value={[toolsState, dispatchSetToolsState]}>
      {children}
    </ToolsContext.Provider>
  );
}
