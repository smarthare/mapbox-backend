/**
 * @openapi
 * components:
 *   Point:
 *     type: object
 *     required:
 *       - lng
 *       - lat
 *     properties:
 *       lng:
 *         type: number
 *       lat:
 *         type: number
 *   schemas:
 *     GenerateCoordinatesRequest:
 *       type: object
 *       required:
 *         - width
 *         - height
 *         - center
 *         - count
 *       properties:
 *         width:
 *           type: number
 *         point2:
 *           type: number
 *         center:
 *           "$ref": "#/components/Point"
 *         count:
 *           type: number
 *       example:
 *         width: 1200
 *         height: 800
 *         center:
 *           lng: -121.88542
 *           lat: 37.33865
 *         count: 2
 *     GenerateCoordinatesResponse:
 *       type: array
 *       items:
 *         "$ref": "#/components/Point"
 *       example:
 *         - lng: 127.9771997183114
 *           lat: 36.4338598646912
 *         - lng: 128.1890735334201
 *           lat: 35.990202546958436
 *
 */