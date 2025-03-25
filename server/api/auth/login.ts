import { defineEventHandler, readBody, createError } from "h3";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET || "4f385fa75a046837ae04343a4c691340ee98a0916d68e956ab91a4812e9619bb"; // Change this in production!

export default defineEventHandler(async (event) => {
  try {
    const { email, password } = await readBody(event);

    // Find user by email
    const account = await prisma.account.findUnique({
      where: { email },
    });

    if (!account) {
      throw createError({ statusCode: 401, statusMessage: "Invalid credentials" });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, account.password);
    if (!isMatch) {
      throw createError({ statusCode: 401, statusMessage: "Invalid credentials" });
    }

    // Generate JWT Token
    const token = jwt.sign({ userId: account.id, email: account.email }, SECRET_KEY, { expiresIn: "24h" });

    return { success: true, token, message: "Sign-in successful" };
  } catch (error) {
    console.error("Auth Error:", error);
    throw createError({ statusCode: 500, statusMessage: "Internal server error" });
  }
});
