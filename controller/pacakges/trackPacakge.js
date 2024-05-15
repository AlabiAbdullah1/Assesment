const dbPool = require("../../model/db");
const setTimer = require("../../middleware/update.middleware");

module.exports.trackPackage = async (req, res) => {
  try {
    const id = req.params.id;
    const query = "SELECT packageName FROM packages WHERE id=?";
    const [result] = await dbPool.execute(query, [id]);

    if (!result) {
      res.status(404).json({
        status: false,
        message: "Pacakge not found!",
      });
    }
    setInterval(setTimer.updatePackage, 120000);
    res.status(200).json({
      result,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      stack: error.stack,
    });
  }
};
