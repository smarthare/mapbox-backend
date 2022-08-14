export type MapboxPoint = {
  x: number;
  y: number;
};

export type CoordinatesRequest = {
  point1: MapboxPoint;
  point2: MapboxPoint;
  count: number;
};
