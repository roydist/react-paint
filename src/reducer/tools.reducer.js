export const toolsInitialState = {
  currentToolId: null,
  currentColor: null,
  entities: {},
};

export function toolsReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_TOOL':
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
    case 'SELECT_EXISTING_TOOL':
      return {
        ...state,
        currentToolId: action.payload,
      };
    case 'CLEAR_CURRENT_TOOL':
      return {
        ...state,
        currentToolId: null,
      };
    case 'UPDATE_COLOR':
      return {
        ...state,
        currentColor: action.payload.hex,
      };
    default:
      throw new Error(`Unhandled type: ${action.type}`);
  }
}
