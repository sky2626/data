import { defineEventHandler, createError } from "h3";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const accounts = await prisma.account.findMany();

    if (!accounts) {
      throw createError({ statusCode: 404, statusMessage: "No accounts found" });
    }

    return { success: true, data: accounts };
  } catch (error) {
    console.error("Database Error:", error);
    throw createError({ statusCode: 500, statusMessage: "Database error" });
  }
});
