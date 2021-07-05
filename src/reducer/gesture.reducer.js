export const gestureInitialState = {
  ref: null,
  strokeMode: 'none',
  start: {
    x: null,
    y: null,
  },
  end: {
    x: null,
    y: null,
  },
};

export function gestureReduce(state, action) {
  switch (action.type) {
    case 'SET_REF':
      return {
        ...state,
        ref: action.payload,
      };
    case 'CLEAR_STROKE':
      return {
        ...state,
        strokeMode: 'none',
      };
    case 'MOUSE_MOVE':
      return {
        ...state,
        end: {
          x: action.payload.clientX - state.ref.current.offsetLeft,
          y: action.payload.clientY - state.ref.current.offsetTop,
        },
      };
    case 'MOUSE_UP':
      return {
        ...state,
        strokeMode: 'done',
      };
    case 'MOUSE_DOWN':
      return {
        ...state,
        strokeMode: 'stroke',
        start: {
          x: action.payload.clientX - state.ref.current.offsetLeft,
          y: action.payload.clientY - state.ref.current.offsetTop,
        },
      };
    default:
      throw new Error(`Unhandled type: ${action.type}`);
  }
}
