import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const SECRET_KEY = "your_secret_key"; // Store this securely (e.g., in .env)

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, password } = body;

  const user = await prisma.account.findUnique({ where: { email } });
  if (!user) {
    throw createError({ statusCode: 400, message: "Invalid email or password" });
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw createError({ statusCode: 400, message: "Invalid email or password" });
  }

  // Generate JWT token
  const token = jwt.sign({ userId: user.id, email: user.email }, SECRET_KEY, {
    expiresIn: "7d",
  });

  return { message: "Login successful", token };
});
