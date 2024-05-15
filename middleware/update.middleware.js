const dbPool = require("../model/db");

exports.updatePackage = async (req, res, next) => {
  // const id = req.params.id;
  const todayDate = new Date(Date.now());
  // const todayDate= 1

  const query = `SELECT pickUpDate FROM packages`;
  const [result] = await dbPool.execute(query);
  if (!result) {
    res.status(400).json({});
  }
  if (result[10].pickUpDate > todayDate) {
    console.log("pending");
    await dbPool.execute(`UPDATE packages SET status= "pending"  WHERE id=?`, [
      13,
    ]);
    res.status(200).json({
      message: "Package not ready for pickup",
    });
  } else if (result <= todayDate) {
    console.log("Ready!");
    await dbPool.execute(`UPDATE packages SET status= "ready"  WHERE id=?`, [
      13,
    ]);
    res.status(200).json({
      message: "Package  ready for pickup",
    });
  }
};

// const setTimer = setInterval(updatePackage, 5000)
