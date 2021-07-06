import React from 'react';
import { Rect, Circle, Ellipse, Line, Text } from 'react-konva';

const selectTool = {
  Rect: Rect,
  Circle: Circle,
  Ellipse: Ellipse,
  Line: Line,
  Text: Text,
};

export default function Element(props) {
  const renderElement = () => {
    const Component = selectTool[props.type];
    const stroke = props.selected ? 'black' : '';
    return <Component {...props} stroke={stroke} />;
  };

  return <>{renderElement()}</>;
}
