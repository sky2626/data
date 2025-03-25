import { defineEventHandler, readBody, createError } from 'h3';
import https from 'https';
import { PrismaClient } from '@prisma/client'; // Import PrismaClient

const prisma = new PrismaClient(); // Instantiate Prisma Client

// Use environment variable for Paystack Secret Key
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
export default defineEventHandler(async (event) => {
  try {
    // Read request body
    const body = await readBody(event);

    // Validate required fields
    if (!body.phone || !body.reference || !body.size || !body.amount || !body.status) {
      return { status: 400, message: "❌ Missing required fields" };
    }

    // Store payment in the database
    const payment = await prisma.payment.create({
      data: {
        phone: body.phone,
        reference: body.reference,
        size: body.size || null, // Optional
        amount: body.amount,
        status: body.status,
      },
    });

    return { status: 200, message: "✅ Payment recorded successfully!", payment };
  } catch (error) {
    console.error("❌ Error saving payment:", error);
    return { status: 500, message: "❌ Server error while saving payment" };
  }
});