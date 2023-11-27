const jwt = require("jsonwebtoken");

const auth = async (request, response, next) => {
  try {
    if (!request.cookies.token) {
      response.status(401).json({ message: "Unauthorized" });
      return;
    }

    const token = await request.cookies.token;
    const decodedToken = await jwt.verify(token, process.env.JWT_KEY);
    request.userId = decodedToken.id;

    next();
  } catch (err) {
    response.status(403).json({ message: "Forbidden" });
  }
};

module.exports = auth;
