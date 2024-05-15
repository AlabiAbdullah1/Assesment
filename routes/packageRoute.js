const { Router } = require("express");
const packagesendController = require("../controller/pacakges/sendPackage");
const trackPackageController = require("../controller/pacakges/trackPacakge");
const validator = require("../middleware/validation.middleware");
const { pacakge } = require("../validation/pacakage.validation");

const packageRoute = Router();

packageRoute.post(
  "/",
  validator.validateSchema(pacakge),
  packagesendController.sendPackage
);

packageRoute.get("/:id", trackPackageController.trackPackage);

module.exports = packageRoute;
