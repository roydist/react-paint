import { ToolContext } from '../App';
import React, { useContext, useState } from 'react';
import { Rect, Circle, Ellipse, Line, Text } from 'react-konva';

const selectTool = {
    'Rect': Rect,
    'Circle': Circle,
    'Ellipse': Ellipse,
    'Line': Line,
    'Text': Text,
}

export default function Element(props) {
    const tool = useContext(ToolContext)

    const [posStart, setStart] = useState({x: 0, y: 0});
    const [posEnd, setEnd] = useState({x: 0, y: 0});
    const [print, setPrint] = useState(false);
    
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

    const renderElement = () => {
        
    };

    return (
        renderElement()
    );
}