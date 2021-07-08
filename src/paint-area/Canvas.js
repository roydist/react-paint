import React, { useEffect, useRef, useState } from 'react';
import { Layer, Stage } from 'react-konva';
import { nanoid } from 'nanoid';
import { getCurrentTool, useToolsState } from '../context/ToolsContext';
import { useGestureState } from 'context/CursorContext';
import { toolPropsFactory } from 'util/tool-props';
import Element from './Element';
import './Canvas.css';

export default function Canvas() {
  const ref = useRef();
  const currentTool = getCurrentTool();
  const [toolsState, setToolsState] = useToolsState();
  const [gestureState, setGestureState] = useGestureState();
  const [isDraggable, setDraggable] = useState(false);

  const { strokeMode, start, end } = gestureState;
  useEffect(() => {
    setGestureState({
      type: 'SET_REF',
      payload: ref,
    });
  }, []);

  useEffect(() => {
    if (!!currentTool && strokeMode === 'stroke') {
      setDraggable(false);
      const toolProps = toolPropsFactory(currentTool)(start, end);
      setToolsState({
        type: 'UPDATE_TOOL',
        payload: {
          ...currentTool,
          ...toolProps,
          stroke: toolsState.currentColor,
          fill: toolsState.currentColor,
        },
      });
    } else if (strokeMode === 'done') {
      setDraggable(true);
      const id = nanoid();
      setToolsState({
        type: 'UPDATE_TOOL',
        payload: {
          id,
          type: currentTool.type,
        },
      });
      setGestureState({
        type: 'CLEAR_STROKE',
      });
    }
  }, [strokeMode, end.x, end.y]);

  return (
    <div className="canvas-container" ref={ref}>
      <Stage width={1024} height={768}>
        <Layer>
          {toolsState.entities &&
            Object.values(toolsState.entities).map((object) => {
              return (
                <Element
                  key={JSON.stringify(object)}
                  {...object}
                  draggable={isDraggable}
                  disabled={!!currentTool}
                  selected={currentTool && object.id === currentTool.id}
                  dispatch={setToolsState}
                />
              );
            })}
        </Layer>
      </Stage>
      <div>{currentTool && currentTool.id}</div>
    </div>
  );
}
