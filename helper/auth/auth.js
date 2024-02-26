const jwtCtrl = require("./jwt");

const verifyKey = async (req, res, next) => {
  try {
    // console.log("verifyKey", verifyKey
    console.log("inside the verify key function", req.headers);
    const bearerHeader = req.headers["authorization"];
    if (!bearerHeader || bearerHeader.split(" ").length !== 2)
      return res
        .status(401)
        .json({ error: "Unauthorized, Auth token required" });
    const authKey = bearerHeader.split(" ")[1];
    console.log("authKey", authKey);
    const decoded = await jwtCtrl.decodeKey(authKey);
    console.log("decodedValue---", decoded);
    if (!decoded) return res.status(404).json({ message: "empty auth key" });

    req.user = decoded;
    next();
  } catch (error) {
    res
      .status(401)
      .json({ message: `Unauthorized, can't verify the auth key` });
  }
};

module.exports = {
  verifyKey,
};
