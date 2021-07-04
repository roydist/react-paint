import React, { useContext, useReducer } from "react";

const initialState = {
  start: {
    x: null,
    y: null,
  },
  end: {
    x: null,
    y: null,
  },
};
function reduce(state, action) {
  switch (action.type) {
    case "MOUSE_DOWN":
      return {
        ...state,
        start: {
          x: action.payload.clientX,
          y: action.payload.clientY,
        },
        end: {
          x: action.payload.clientX,
          y: action.payload.clientY,
        },
      };
    case "MOUSE_UP":
      return {
        ...state,
        end: {
          x: action.payload.clientX,
          y: action.payload.clientY,
        },
      };
    default:
      return state;
  }
}

export function useMouseDragStart() {
  return useContext(MouseDragStartContext);
}

export default function GestureProvider({ children }) {
  const [posStart, setStart] = useReducer(reduce, initialState);

  const dragEnd = ({ clientX, clientY }) => {
    // setPrint(false);
  };

  const dragging = ({ clientX, clientY }) => {
    setEnd({
      clientX,
      clientY,
    });
  };
}
