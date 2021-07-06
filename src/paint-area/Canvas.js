import React, { useEffect, useRef, useState } from 'react';
import { Layer, Stage } from 'react-konva';
import { getCurrentTool, useToolsState } from '../context/ToolsContext';
import { useGestureState } from 'context/CursorContext';
import { toolPropsFactory } from 'util/tool-props';
import Element from './Element';

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
          x: start.x,
          y: start.y,
          fill: toolsState.currentColor,
        },
      });
    } else if (strokeMode === 'done') {
      setDraggable(true);
      setToolsState({
        type: 'CLEAR_CURRENT_TOOL',
      });
    }
  }, [strokeMode, end.x, end.y]);

  const drag = (e, tool) => {
    if (!currentTool) {
      console.log(e);
      e.evt.stopPropagation();
      setToolsState({
        type: 'UPDATE_TOOL',
        payload: {
          ...tool,
          x: e.target.x(),
          y: e.target.y(),
        },
      });
      setToolsState({
        type: 'CLEAR_CURRENT_TOOL',
      });
    }
  };

  const click = (e, object) => {
    if (!currentTool) {
      console.log(e);

      e.evt.stopPropagation();
      setToolsState({
        type: 'SELECT_EXISTING_TOOL',
        payload: object.id,
      });
    }
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
                  selected={currentTool && object.id === currentTool.id}
                  key={JSON.stringify(object)}
                  draggable={isDraggable}
                  onDragEnd={(e) => drag(e, object)}
                  onClick={(e) => click(e, object)}
                />
              );
            })}
        </Layer>
      </Stage>
      <div>{currentTool && currentTool.id}</div>
    </div>
  );
}
