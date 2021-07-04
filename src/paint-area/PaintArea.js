import { useMouseDragStart, useMousePositionEnd, useMousePositionStart } from '../context/CursorContext';
import React, { useEffect, useState } from 'react';
import { Layer, Stage, Rect, Circle, Ellipse, Line, Text } from 'react-konva';
import { useTool } from '../context/ToolContext';
import ElementComposite from './ElementComposite';
import './PaintArea.css'

export default function PaintArea() {
    const tool = useTool();
    const [components, setComponents] = useState([]);
    // const mouseStartPos = useMousePositionStart();
    // const mouseEndPos = useMousePositionEnd();

    useEffect(() => {
        tool && setComponents(state => {
            return  [
                ...state,
                {
                    type: tool,
                    // x: mouseStartPos.clientX,
                    // y: mouseStartPos.clientY,
                    // height: 100,
                    // width: 100,
                    fill: "red"
                }
            ];
        });
    }, [tool])

    // const mousePosition = useMousePositionStart();
    // const mouseDragStart = useMouseDragStart();
    
    return (
        <div className="paint-container">
            {/* <span>x: {mousePosition && mousePosition.clientX}</span>
            <span>y: {mousePosition && mousePosition.clientY}</span> */}
            <div>state: {tool}</div>
            <ElementComposite components={components}></ElementComposite>
      </div>
    );
}