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
     * '/api/v1/mapbox/coordinates':
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
     *              $ref: '#/components/schemas/GenerateCoordinatesRequest'
     *      400:
     *        description: Bad request
     */

    this.router.post(`/coordinates`, this.coordinatesGen);
  }

  private coordinatesGen = (
    request: Request<{}, {}, CoordinatesRequest>,
    response: Response,
    next: NextFunction
  ) => {
    const data = request.body;

    try {
      const coordinatesData = this.randomCoordiates(data);
      console.log(coordinatesData);
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
      x: this.generateRandomNumber(data.point1.x, data.point2.x),
      y: this.generateRandomNumber(data.point1.y, data.point2.y),
    }));
  };

  private generateRandomNumber = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1) + min);

  private vaildateBoxData = (data: CoordinatesRequest) =>
    data.point1.x >= 0 &&
    data.point1.y >= 0 &&
    data.point1.x < data.point2.x &&
    data.point1.y < data.point2.y;
}

export default MapboxController;
