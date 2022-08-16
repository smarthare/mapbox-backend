import { Request, Response, NextFunction, Router } from "express";

import Controller from "../types/controller";
import { CoordinatesRequest } from "../types/mapbox";
import BadRequestException from "../exceptions/BadRequestException";

class MapboxController implements Controller {
  public path = "mapbox";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    /**
     * @openapi
     * '/api/mapbox/coordinates':
     *  post:
     *     tags:
     *     - CoordinatesGenerator
     *     summary: Generate number of randomly located geometry coordinates within a given boundary box
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *             $ref: '#/components/schemas/GenerateCoordinatesRequest'
     *     responses:
     *      200:
     *        description: Success
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/GenerateCoordinatesResponse'
     *      400:
     *        description: Bad request
     */

    this.router.post(`/coordinates`, this.coordinatesGen);
  }

  private coordinatesGen = (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const data = request.body;

    try {
      const coordinatesData = this.randomCoordiates(data);

      response.send(coordinatesData);
    } catch (error) {
      next(error);
    }
  };

  private randomCoordiates = (data: CoordinatesRequest) => {
    if (!this.vaildateBoxData(data)) {
      throw new BadRequestException();
    }

    return [...Array(data.count)].map(() => ({
      lng: this.generateRandomNumber(data.width, data.center.lng),
      lat: this.generateRandomNumber(data.height, data.center.lat),
    }));
  };

  private generateRandomNumber = (size: number, center: number) =>
    center - Math.random() * size / 2000 * (Math.random() >= 0.5 ? 1 : -1);

  private vaildateBoxData = (data: CoordinatesRequest) =>
    data.width > 0 && data.height > 0 && data.count > 0;
}

export default MapboxController;
