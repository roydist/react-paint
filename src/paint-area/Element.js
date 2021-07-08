import React from 'react';

const selectTool = {
  Rect: Rect,
  Circle: Circle,
  Ellipse: Ellipse,
  Line: Line,
  Text: Text,
};

export default function Element(props) {
  const drag = (e, tool) => {
    if (!props.disabled) {
      e.evt.stopPropagation();
      props.dispatch({
        type: 'UPDATE_TOOL',
        payload: {
          ...tool,
          x: e.target.x(),
          y: e.target.y(),
        },
      });
      props.dispatch({
        type: 'CLEAR_CURRENT_TOOL',
      });
    }
  };

  const click = (e, object) => {
    if (!props.disabled) {
      e.evt.stopPropagation();
      props.dispatch({
        type: 'SELECT_EXISTING_TOOL',
        payload: object.id,
      });
    }
  };
  const renderElement = () => {
    const Component = selectTool[props.type];
    return (
      <Component
        {...props}
        onDragEnd={(e) => drag(e, props)}
        onClick={(e) => click(e, props)}
      />
    );
  };

  return <>{renderElement()}</>;
}
