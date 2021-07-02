import React, { useContext } from 'react';
import { Layer, Stage } from 'react-konva';
import Element from './Element';
import { ToolContext } from '../App';

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
            components.map(function(object, i) {
                const Component = selectTool[object.type];
                return <Element {...object.props} key={i} ></Element>;
            }, this)
          }
        </Layer>
      </Stage>
    );
}

// onMouseDown={start} onMouseMove={dragging} onMouseUp={dragEnd}