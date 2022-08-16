export type CoordinatesType = {
  lng: number;
  lat: number;
};

export type CoordinatesRequest = {
  width: number;
  height: number;
  center: CoordinatesType;
  count: number;
};
