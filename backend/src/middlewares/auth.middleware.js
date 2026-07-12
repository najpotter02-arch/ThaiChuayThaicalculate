import jwt from "jsonwebtoken";

export function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    // ไม่มี Authorization Header
    if (!authHeader) {
      return res.status(401).json({
        message: "Authorization header is missing",
      });
    }

    // ต้องเป็น Bearer Token
    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Invalid authorization format",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // เก็บข้อมูลไว้ใช้ต่อ
    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
}