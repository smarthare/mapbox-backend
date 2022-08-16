import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import Controller from "./types/controller";
import settings from "./config/settings";
import swaggerDocs from "./utils/swagger";
import logger from "./utils/logger";

class App {
  public app: express.Express;

  constructor(controllers: Controller[]) {
    this.app = express();

    this.initializeMiddleware();
    this.initializeControllers(controllers);
  }

  public listen() {
    this.app.listen(settings.PORT, () => {
      logger.info(`App listening on the port ${settings.PORT}`);
      swaggerDocs(this.app, Number(settings.PORT));
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddleware() {
    this.app.use(bodyParser.json());
    this.app.use(
      cors({
        origin: settings.FRONTEND_URL
      })
    );
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use(
        `/${settings.ENDPOINT}/${controller.path}`,
        controller.router
      );
    });
  }
}

export default App;
