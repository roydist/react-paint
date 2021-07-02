import React, { useState } from 'react';
import { Layer, Stage, Rect, Circle, Ellipse, Line, Text } from 'react-konva';
import ElementComposite from './ElementComposite';
import { ToolContext } from '../App';

export const PaintArea = () => {
    const [mousePosition, setMousePosition] = useState({
        x: null,
        y: null
    });

    const mouseMove = (evt) => {
        setMousePosition({
        x: evt.clientX,
        y: evt.clientY
        });
    }
    
    return (
        <div className="paint-container" onMouseMove={mouseMove}>
        <span>x: {mousePosition.x}</span>
        <span>y: {mousePosition.y}</span>
        <div>state: 
            <ToolContext.Consumer>
                {tool => tool}
            </ToolContext.Consumer>
        </div>
        <ElementComposite components={[
            <Rect 
                x={50}
                y={200}
                width={200}
                height={100}
                fill="red"
                shadowBlur={10}>
            </Rect>
        ]}></ElementComposite>
      </div>
    );
}