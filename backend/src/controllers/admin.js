import { PrismaClient } from "@prisma/client";
import { successResponse, errorResponse } from "../utils/response.js";

const prisma = new PrismaClient();

export const approveEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await prisma.event.update({
      where: { id },
      data: { status: "APPROVED" },
      include: { organizer: true }, // to get organizerId
    });

    // Notify the organizer
    await prisma.notification.create({
      data: {
        userId:  event.organizerId,
        title:   "Event Approved 🎉",
        message: `Your event "${event.title}" has been approved and is now live.`,
        type:    "EVENT_UPDATED",
      },
    });

    successResponse(res, event);
  } catch (error) {
    errorResponse(res, error.message);
  }
};

export const rejectEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await prisma.event.update({
      where: { id },
      data: { status: "REJECTED" },
      include: { organizer: true },
    });

    // Notify the organizer
    await prisma.notification.create({
      data: {
        userId:  event.organizerId,
        title:   "Event Rejected",
        message: `Your event "${event.title}" was not approved. Please review and resubmit.`,
        type:    "EVENT_CANCELLED",
      },
    });

    successResponse(res, event);
  } catch (error) {
    errorResponse(res, error.message);
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    });
    successResponse(res, users);
  } catch (error) {
    errorResponse(res, error.message);
  }
};

export const getReports = async (req, res) => {
  try {
    const [totalEvents, totalRegistrations, users] = await Promise.all([
      prisma.event.count(),
      prisma.registration.count(),
      prisma.user.findMany({
        select: {
          id:        true,
          name:      true,
          email:     true,
          role:      true,
          createdAt: true,
          _count: {
            select: { registrations: true }, // number of events each user registered for
          },
        },
        orderBy: { createdAt: "desc" },
      }),
    ]);

    successResponse(res, {
      total_events:        totalEvents,
      total_registrations: totalRegistrations,
      active_users:        users.length,
      users,
    });
  } catch (error) {
    errorResponse(res, error.message);
  }
};