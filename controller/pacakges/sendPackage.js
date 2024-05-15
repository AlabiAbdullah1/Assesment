const dbPool = require("../../model/db");

module.exports.sendPackage = async (req, res) => {
  try {
    const packageName = req.body.packageName;
    const status = req.body.status;

    const currentTime = Date.now();
    const currentDate = new Date(currentTime);

    currentDate.setDate(currentDate.getDate() + 7);

    const pickDate = currentDate.getTime();
    const pickupdate = new Date(pickDate);

    const timeCreated = Date.now();
    const date = new Date(timeCreated);

    const query = `INSERT INTO packages (packageName, status, pickUpDate, TimeStamp) VALUES(?,?,?,?)`;

    const [results] = await dbPool.execute(query, [
      packageName,
      status,
      pickupdate,
      date,
    ]);

    if (!results) {
      res.status(400).json({
        status: false,
        message: "Error sending package",
      });
    }
    console.log(pickupdate);
    console.log(date);
    return res.status(201).json({
      result: "Posted Successfully!",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      errorStack: error.stack,
    });
  }
};
