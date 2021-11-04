import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: "backend/.env" });

const auth = async (req, res, next) => {
  // const token = req.headers.authorization.split(" ")[1];
  const token = req.header("x-auth-token");

  // Check for token
  if (!token) return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Add user from payload
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({ msg: "Token is not valid" });
  }
};

export default auth;
