export function toolPropsFactory(tool) {
  const typeProxy = {
    Rect: (start, end) => ({
      x: start.x,
      y: start.y,
      height: end.y - start.y,
      width: end.x - start.x,
    }),
    Circle: (start, end) => ({
      x: start.x,
      y: start.y,
      radius: Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2)),
    }),
    Ellipse: (start, end) => ({
      x: start.x,
      y: start.y,
      height: Math.abs(end.y - start.y),
      width: Math.abs(end.x - start.x),
    }),
    Line: (start, end) => {
      if (!tool.points) {
        tool.points = [start.x, start.y];
      }
      return {
        points: [...tool.points, end.x, end.y],
      };
    },
  };

  return typeProxy[tool.type];
}
