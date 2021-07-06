import React, { useState, useContext, useEffect, useReducer } from 'react';
import { gestureReduce, gestureInitialState } from '../reducer/gesture.reducer';

const CursorContext = React.createContext();
const GestureContext = React.createContext();

export function useGestureState() {
  return useContext(GestureContext);
}

export default function CursorProvider({ children }) {
  const [position, setPosition] = useState({ clientX: 0, clientY: 0 });
  const [gestureState, setGestureState] = useReducer(
    gestureReduce,
    gestureInitialState
  );

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

  const mouseMove = ({ clientX, clientY }) => {
    setPosition({
      clientX,
      clientY,
    });
    setGestureState({
      type: 'MOUSE_MOVE',
      payload: { clientX, clientY },
    });
  };

  useEffect(() => {
    if (!!gestureState.ref && !!gestureState.ref.current) {
      gestureState.ref.current.addEventListener('mousemove', mouseMove, {
        capture: true,
      });
      gestureState.ref.current.addEventListener('mousedown', mouseDown, {
        capture: true,
      });
      gestureState.ref.current.addEventListener('mouseup', mouseUp, {
        capture: true,
      });
    }
    return () => {
      if (!!gestureState.ref && !!gestureState.ref.current) {
        gestureState.ref.current.removeEventListener('mousemove', mouseMove);
        gestureState.ref.current.removeEventListener('mousedown', mouseDown);
        gestureState.ref.current.removeEventListener('mouseup', mouseUp);
      }
    };
  }, [gestureState.ref]);

  return (
    <CursorContext.Provider value={[position.clientX, position.clientY]}>
      <GestureContext.Provider value={[gestureState, setGestureState]}>
        {children}
      </GestureContext.Provider>
    </CursorContext.Provider>
  );
}
