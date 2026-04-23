import express from "express";
import { approveEvent, rejectEvent, getAllUsers, getReports } from "../controllers/admin.js";
import { protect } from "../middlewares/auth.js";
import { authorize } from "../middlewares/role.js";

const router = express.Router();

router.put("/events/:id/approve", protect, authorize("ADMIN"), approveEvent);
router.put("/events/:id/reject", protect, authorize("ADMIN"), rejectEvent);
router.get("/users", protect, authorize("ADMIN"), getAllUsers);
router.get("/reports", protect, authorize("ADMIN"), getReports);

export default router;