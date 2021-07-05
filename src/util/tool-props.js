export function toolPropsFactory(tool) {
  const typeProxy = {
    Rect: (start, end) => ({
      height: end.y - start.y,
      width: end.x - start.x,
    }),
    Circle: (start, end) => ({
      radius: Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2)),
    }),
    Ellipse: (start, end) => ({
      height: Math.abs(end.y - start.y),
      width: Math.abs(end.x - start.x),
    }),
    Line: (start, end) => {
      if (!tool.points) {
        tool.points = [start.x, start.y];
      }
      return {
        points: [...tool.points, end.x, end.y],
        stroke: 'red',
      };
    },
  };

  return typeProxy[tool.type];
}
