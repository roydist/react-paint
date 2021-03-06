import React from 'react';
import classNames from 'classnames';
import { nanoid } from 'nanoid';
import { GithubPicker } from 'react-color';
import { useToolsState, getCurrentTool } from '../context/ToolsContext';
import './Toolbar.css';
import { useGestureState } from 'context/CursorContext';

export default function Toolbar() {
  const [gestureState, dispatchGestureAction] = useGestureState();
  const [_, dispatchUpdateTools] = useToolsState();
  const currentTool = getCurrentTool();

  const setTool = (type) => {
    const id = nanoid();
    dispatchUpdateTools({
      type: 'UPDATE_TOOL',
      payload: {
        id,
        type,
      },
    });
    dispatchGestureAction({
      type: 'CLEAR_STROKE',
    });
  };

  const setColor = ({ hex, source }, e) => {
    dispatchUpdateTools({
      type: 'UPDATE_COLOR',
      payload: {
        hex,
        source,
      },
    });
  };

  return (
    <div className="toolbar-container">
      <GithubPicker onChange={setColor} />
      <div
        className={classNames({
          active: currentTool && currentTool.type === 'Clear',
        })}
        onClick={(e) => {
          dispatchUpdateTools({
            type: 'CLEAR_CURRENT_TOOL',
          });
        }}
      >
        Clear
      </div>
      <div
        className={classNames({
          active: currentTool && currentTool.type === 'Arrow',
        })}
        onClick={(e) => {
          setTool('Arrow');
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
