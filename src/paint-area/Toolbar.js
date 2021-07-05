import React from 'react';
import classNames from 'classnames';
import { nanoid } from 'nanoid';
import { useToolsState, useCurrentTool } from '../context/ToolsContext';
import './Toolbar.css';

export default function Toolbar() {
  const [_, dispatchUpdateTools] = useToolsState();
  const currentTool = useCurrentTool();

  const setTool = (type) => {
    const id = nanoid();
    dispatchUpdateTools({
      type: 'UPDATE_TOOL',
      payload: {
        id,
        type,
      },
    });
  };

  return (
    <div className="toolbar-container">
      <div
        className={classNames({
          active: currentTool && currentTool.type === 'Arrow',
        })}
        onClick={(e) => {
          dispatchUpdateTools({
            type: 'CLEAR_CURRENT_TOOL',
          });
        }}
      >
        Arrow
      </div>
      <div
        className={classNames({
          active: currentTool && currentTool.type === 'Rect',
        })}
        onClick={(e) => {
          setTool('Rect');
        }}
      >
        Rect
      </div>
      <div
        className={classNames({
          active: currentTool && currentTool.type === 'Circle',
        })}
        onClick={() => {
          setTool('Circle');
        }}
      >
        Circle
      </div>
      <div
        className={classNames({
          active: currentTool && currentTool.type === 'Line',
        })}
        onClick={() => {
          setTool('Line');
        }}
      >
        Line
      </div>
      <div
        className={classNames({
          active: currentTool && currentTool.type === 'Ellipse',
        })}
        onClick={() => {
          setTool('Ellipse');
        }}
      >
        Ellipse
      </div>
      <div
        className={classNames({
          active: currentTool && currentTool.type === 'Text',
        })}
        onClick={() => {
          setTool('Text');
        }}
      >
        Text
      </div>
      <div
        className={classNames({
          active: currentTool && currentTool.type === 'Star',
        })}
        onClick={() => {
          setTool('Star');
        }}
      >
        Star
      </div>
    </div>
  );
}
