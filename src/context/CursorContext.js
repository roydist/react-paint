import React, { useState, useContext, useEffect, useReducer } from 'react';

const CursorContext = React.createContext();
const BoundingTargetContext = React.createContext();
const GestureContext = React.createContext();

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
    case 'MOUSE_DOWN':
      return {
        ...state,
        start: {
          x: action.payload.clientX,
          y: action.payload.clientY,
        },
        end: {
          x: null,
          y: null,
        },
      };
    case 'MOUSE_UP':
      return {
        ...state,
        end: {
          x: action.payload.clientX,
          y: action.payload.clientY,
        },
      };
    default:
      throw new Error(`Unhandled type: ${action.type}`);
  }
}

export function useMouseDragStart() {
  return useContext(GestureContext);
}

export function useMouseDragBounding(ref) {
  const [gestureState, setGestureState] = useContext(GestureContext);

  const { start, end } = gestureState;
  if (!ref.current) {
    return { start, end };
  }

  return {
    start: {
      x: start.x - ref.current.offsetLeft,
      y: start.y - ref.current.offsetTop,
    },
    end: {
      x: end.x - ref.current.offsetLeft,
      y: end.y - ref.current.offsetTop,
    },
  };
}

export function useCursorPosition(ref) {
  const [clientX, clientY] = useContext(CursorContext);

  if (!ref.current) {
    return { x: clientX, y: clientY };
  }

  return { x: clientX - ref.current.offsetLeft, y: clientY - ref.current.offsetTop };
}

export function useBoundingTargetState() {
  return useContext(BoundingTargetContext);
}

export default function CursorProvider({ children }) {
  const [position, setPosition] = useState({ clientX: 0, clientY: 0 });
  const [boundingTargetState, setBoundingTargetState] = useState();
  const [gestureState, setGestureState] = useReducer(reduce, initialState);

  const mouseDown = ({ clientX, clientY }) => {
    setGestureState({
      type: 'MOUSE_DOWN',
      payload: { clientX, clientY },
    });
  };

  const mouseUp = ({ clientX, clientY }) => {
    setGestureState({
      type: 'MOUSE_UP',
      payload: { clientX, clientY },
    });
  };

  const update = (event) => {
    const { target, clientX, clientY } = event;
    setPosition({
      clientX,
      clientY,
    });
  };

  useEffect(() => {
    if (!!boundingTargetState) {
      boundingTargetState.current.addEventListener('mousemove', update, false);
      boundingTargetState.current.addEventListener('mousedown', mouseDown, false);
      boundingTargetState.current.addEventListener('mouseup', mouseUp, false);
    }
    return () => {
      if (!!boundingTargetState) {
        boundingTargetState.current.removeEventListener('mousemove', update);
        boundingTargetState.current.removeEventListener('mousedown', mouseDown);
        boundingTargetState.current.removeEventListener('mouseup', mouseUp);
      }
    };
  }, [boundingTargetState]);

  return (
    <CursorContext.Provider value={[position.clientX, position.clientY]}>
      <BoundingTargetContext.Provider
        value={[boundingTargetState, setBoundingTargetState]}
      >
        <GestureContext.Provider value={[gestureState, setGestureState]}>
          <BoundingTargetContext.Provider
            value={[boundingTargetState, setBoundingTargetState]}
          >
            {children}
          </BoundingTargetContext.Provider>
        </GestureContext.Provider>
      </BoundingTargetContext.Provider>
    </CursorContext.Provider>
  );
}
