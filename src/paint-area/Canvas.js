import React, { useEffect, useRef } from 'react';
import { Layer, Stage } from 'react-konva';
import { useCurrentTool, useToolsState } from '../context/ToolsContext';
import { useGestureState } from 'context/CursorContext';
import { toolPropsFactory } from 'util/tool-props';
import Element from './Element';

export default function Canvas() {
  const ref = useRef();
  const currentTool = useCurrentTool();
  const [toolsState, setToolsState] = useToolsState();
  const [gestureState, setGestureState] = useGestureState();

  const { strokeMode, start, end } = gestureState;
  useEffect(() => {
    setGestureState({
      type: 'SET_REF',
      payload: ref,
    });
  }, []);

  useEffect(() => {
    if (!currentTool) {
      return;
    }
    if (strokeMode === 'stroke') {
      const toolProps = toolPropsFactory(currentTool)(start, end);
      setToolsState({
        type: 'UPDATE_TOOL',
        payload: {
          ...currentTool,
          ...toolProps,
          x: start.x,
          y: start.y,
          fill: 'red',
        },
      });
    } else if (strokeMode === 'done') {
      setToolsState({
        type: 'CLEAR_CURRENT_TOOL',
      });
      setGestureState({
        type: 'CLEAR_STROKE',
      });
    }
  }, [strokeMode, end.x, end.y]);

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
                    (e, draggedTool) => {
                      setToolsState({
                        type: 'UPDATE_TOOL',
                        payload: {
                          ...draggedTool,
                          x: e.target.x(),
                          y: e.target.y(),
                        },
                      });
                    };
                  }}
                  onClick={() => {
                    return setToolsState({
                      type: 'UPDATE_TOOL',
                      payload: {
                        ...object,
                      },
                    });
                  }}
                />
              );
            })}
        </Layer>
      </Stage>
      <div>{currentTool && currentTool.id}</div>
    </div>
  );
}
