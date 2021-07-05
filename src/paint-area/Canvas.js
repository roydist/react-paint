import React, { useEffect, useRef } from 'react';
import Element from './Element';
import { useCurrentTool, useToolsState } from '../context/ToolsContext';
import {
  useBoundingTargetState,
  useCursorPosition,
  useMouseDragBounding,
} from 'context/CursorContext';
import { Layer, Stage } from 'react-konva';

export default function Canvas() {
  const ref = useRef();
  const [toolsState, setToolsState] = useToolsState();
  const currentTool = useCurrentTool();
  const [boundingTargetState, setBoundingTargetState] = useBoundingTargetState();

  const { start, end } = useMouseDragBounding(ref);
  const { x, y } = useCursorPosition(ref);

  useEffect(() => setBoundingTargetState(ref), []);

  useEffect(() => {
    !!currentTool &&
      !!end.x &&
      !!end.y &&
      setToolsState({
        type: 'UPDATE_TOOL',
        payload: {
          ...currentTool,
          x: start.x,
          y: start.y,
          height: end.y - start.y,
          width: end.x - start.x,
          fill: 'red',
        },
      });
  }, [start.x, start.y, end.x, end.y]);

  const dragEnd = (e, draggedTool) => {
    setToolsState({
      type: 'UPDATE_TOOL',
      payload: {
        ...draggedTool,
        x: e.target.x(),
        y: e.target.y(),
      },
    });
  };

  return (
    <div className="paint-container" ref={ref}>
      <Stage width={800} height={500}>
        <Layer>
          {toolsState.entities &&
            Object.values(toolsState.entities).map((object) => {
              return (
                <Element
                  {...object}
                  key={JSON.stringify(object)}
                  draggable
                  onDragEnd={(e) => {
                    dragEnd(e, object);
                  }}
                />
              );
            })}
        </Layer>
      </Stage>
      <div>{JSON.stringify({ start, end })}</div>
      <div>{JSON.stringify({ x, y })}</div>
    </div>
  );
}

// onMouseDown={start} onMouseMove={dragging} onMouseUp={dragEnd}
