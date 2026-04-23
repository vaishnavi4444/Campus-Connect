import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  // console.log("token: ", token)
  if (!token) {
    return res.status(401).json({ success: false, error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    if (!user) {
      return res.status(401).json({ success: false, error: "User not found" });
    }
    // console.log("user in middleware: ",user)
    // req.id = decoded.id;
    req.user = user
    next();
  } catch {
    return res.status(401).json({ success: false, error: "Invalid token" });
  }
};