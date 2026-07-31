import JWT from "jsonwebtoken";
import ApplicationError from "../error-handler/applicationError.js";

const jwtauth = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

//  console.log("All request headers:", req.headers);
//  console.log("Authorization header:", authorizationHeader);

  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    return next(new ApplicationError("Authentication token is required", 401));
  }

  const token = authorizationHeader.split(" ")[1];

  if (!token) {
    return next(new ApplicationError("Authentication token is required", 401));
  }
  try {
    const decodedpayload = JWT.verify(token, process.env.JWT_SECRET, {
      algorithms: ["HS256"],
    });
    req.user = decodedpayload;
    next();
  } catch (err) {
    // jsonwebtoken gives this name when the token has expired.
    if (err.name === "TokenExpiredError") {
      return next(
        new ApplicationError("Authentication token has expired", 401),
      );
    }

    return next(new ApplicationError("Invalid authentication token", 401));
  }
};

export default jwtauth;
