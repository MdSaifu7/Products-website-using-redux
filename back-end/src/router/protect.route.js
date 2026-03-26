import jwt from "jsonwebtoken";
const protectRoute = function (req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body._id = decode._id;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
export default protectRoute;
