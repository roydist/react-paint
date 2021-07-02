import { useMousePositionEnd, useMousePositionStart } from '../context/MouseContext';
import React, { useState } from 'react';
import { Rect, Circle, Ellipse, Line, Text } from 'react-konva';
import { useTool } from '../context/ToolContext';

const selectTool = {
    'Rect': Rect,
    'Circle': Circle,
    'Ellipse': Ellipse,
    'Line': Line,
    'Text': Text,
}

export default function Element(props) {

    const [print, setPrint] = useState(false);
    
    const renderElement = () => {
        const Component = selectTool[props.type];
        return <Component {...props}  
            x={mouseStartPos.clientX} 
            y={mouseEndPos.clientY} 
            height={mouseEndPos.clientY - mouseStartPos.clientY} 
            width={mouseEndPos.clientX - mouseStartPos.clientY}
         />;
    };

    const mouseStartPos = useMousePositionStart();
    const mouseEndPos = useMousePositionEnd();

    if (!props) return null;

    return (
        <>
            { renderElement() }
        </>
    );
}