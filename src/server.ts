import App from "./app";
import MapboxController from "./controllers/mapbox.controller";

const app = new App(
  [
    new MapboxController()
  ]
);

app.listen();
