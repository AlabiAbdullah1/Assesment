const joi = require("joi");

exports.pacakge = joi.object({
  packageName: joi.string().required(),
  status: joi.string().default("pending"),
  pickUpDate: joi.date(),
  Timestamp: joi.date().default(Date.now()),
});
