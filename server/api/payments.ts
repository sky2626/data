import prisma from "~/server/api/accounts";
import { defineEventHandler, readBody, createError } from "h3";
import https from "https";
// Use environment variable for Paystack Secret Key
// const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
const PAYSTACK_SECRET_KEY = "pk_test_eb3bc9ba87ba3fe7f19a2fe09d4a7132ea9d37b2"

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { reference, phone, size, amount } = body;

    if (!reference) {
      throw createError({ statusCode: 400, statusMessage: "Reference is required" });
    }

    // Paystack verification
    const options = {
      hostname: "api.paystack.co",
      port: 443,
      path: `/transaction/verify/${reference}`,
      method: "GET",
      headers: {
        Authorization: "Bearer PAYSTACK_SECRET_KEY",
      },
    };

    const paystackResponse = await new Promise((resolve, reject) => {
      const req = https.request(options, (res) => {
        let data = "";

        res.on("data", (chunk) => {
          data += chunk;
        });

        res.on("end", () => {
          resolve(JSON.parse(data));
        });
      });

      req.on("error", (error) => {
        reject(error);
      });

      req.end();
    });

    // Check if the payment was successful
    if (!paystackResponse || paystackResponse.data.status !== "success") {
      throw createError({ statusCode: 400, statusMessage: "Payment verification failed" });
    }

    // Save payment in the database
    const payment = await prisma.payment.create({
      data: {
        phone,
        reference,
        size, 
        amount,
        status: "success",
      },
    });

    return { success: true, payment };
  } catch (error) {
    console.error("Payment verification error:", error);
    throw createError({ statusCode: 500, statusMessage: "Internal Server Error" });
  }
});
