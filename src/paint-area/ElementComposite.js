import MouseProvider, { useMousePositionEnd, useMousePositionStart } from '../context/CursorContext';
import React from 'react';
import { Layer, Stage, Rect, Circle, Ellipse, Line, Text } from 'react-konva';
import Element from './Element';

export default function ElementComposite({ components }) {    
    // useEffect(() => {
    //     const selectTool = {
    //         'Rect': Rect,
    //         'Circle': Circle,
    //         'Ellipse': Ellipse,
    //         'Line': Line,
    //         'Text': Text,
    //     }

    //     const toolComponent = selectTool[tool];
    //     if (toolComponent) {
    //         debugger
    //         addComponent(state => {
    //             return [
    //                 ...state,
    //                 toolComponent
    //             ]
    //         });
    //     }
    // }, [tool]);

  
    
    return (
        <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
        {
            components.map((object, i) => (
              <MouseProvider key={i}>
                 <Element {...object} key={JSON.stringify(object)} />
            </MouseProvider>
            ))
        }
        </Layer>
      </Stage>
    );
}

// onMouseDown={start} onMouseMove={dragging} onMouseUp={dragEnd}