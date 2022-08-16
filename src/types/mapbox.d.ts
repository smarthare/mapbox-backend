export type MapboxPoint = {
  lng: number;
  lat: number;
};

export type CoordinatesRequest = {
  width: number;
  height: number;
  center: MapboxPoint;
  count: number;
};
