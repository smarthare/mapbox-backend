/**
 * @openapi
 * components:
 *   Point:
 *     type: object
 *     required:
 *       - x
 *       - y
 *     properties:
 *       x:
 *         type: number
 *       y:
 *         type: number
 *   schemas:
 *     GenerateCoordinatesRequest:
 *       type: object
 *       required:
 *         - point1
 *         - point2
 *         - count
 *       properties:
 *         point1:
 *           "$ref": "#/components/Point"
 *         point2:
 *           "$ref": "#/components/Point"
 *         count:
 *           type: number
 *     CreateUserResponse:
 *       type: object
 *       properties:
 *         expiresIn:
 *           type: number
 *         token:
 *           type: string
 *         user:
 *           "$ref": "#/components/schemas/User"
 *
 */
