import React, { useContext, useEffect, useState } from 'react';
import { Layer, Stage, Rect, Circle, Ellipse, Line, Text } from 'react-konva';
import { ToolContext } from './App';

export const PaintArea = () => {
    const [posStart, setStart] = useState({x: 0, y: 0});
    const [posEnd, setEnd] = useState({x: 0, y: 0});
    const [print, setPrint] = useState(false);
    const [Component, setComponent] = useState(null);
    const tool = useContext(ToolContext)

    useEffect(() => {
        const selectTool = () => {
            switch (tool) {
                case 'Rect': return Rect;
                case 'Circle': return Circle;
                case 'Ellipse': return Ellipse;
                case 'Line': return Line;
                case 'Text': return Text;
                default: return Line;

            }
        }

        const toolComponent = selectTool();
        setComponent(toolComponent);
    }, [tool]);

    const start = ({ evt }) => {
        setPrint(true);
        setEnd({
            x: evt.clientX,
            y: evt.clientY
        });
        setStart({
            x: evt.clientX,
            y: evt.clientY
        });
    }
  
    const dragEnd = ({ evt }) => {
    setPrint(false);
    }
      
    const dragging = ({ evt }) => {
        if (print) {
            setEnd({
            x: evt.clientX,
            y: evt.clientY
            });
        }
    }

    if (!Component) {
        return null;
    }
    
    return (
        <div className="paint-container">
        <span>x: {posStart.x}</span>
        <span>y: {posStart.y}</span>
        <span>x: {posEnd.x}</span>
        <span>y: {posEnd.y}</span>
        <div>state: {tool}</div>
        <Stage width={window.innerWidth} height={window.innerHeight} onMouseDown={start} onMouseMove={dragging} onMouseUp={dragEnd}>
          <Layer>
            <Component
                x={posStart.x}
                y={posStart.y}
                width={posEnd.x - posStart.x}
                height={posEnd.y - posStart.y}
                fill="red"
                shadowBlur={10}
            />
          </Layer>
        </Stage>
      </div>
    );
}