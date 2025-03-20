import { defineEventHandler } from "h3";
//const prisma = new usePrismaClient();
import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient({})

export default defineEventHandler(async () => {
  try {
    const accounts = await prisma.account.findMany();
    return { success: true, data: accounts };
  } catch (error) {
    console.error('Database Error:', error); // Logs error in terminal
    return createError({ statusCode: 500, statusMessage: 'Database error' });
  }
});