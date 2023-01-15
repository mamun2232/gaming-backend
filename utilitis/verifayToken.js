const jwt = require("jsonwebtoken");
const verifayToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ massage: "Unauthorization Access" });
  }
  const token = authHeader.split(" ")[1];
  console.log(token);
  jwt.verify(token, 'DPEEHEOEEPEERUR78USXPEPEEHC', function (err, decoded) {
    console.log(decoded);
    if (err) {
      return res.status(403).send({ massage: "Forbidden Access" });
    }
    req.decoded = decoded;
    next();
  });
};

module.exports = verifayToken;
