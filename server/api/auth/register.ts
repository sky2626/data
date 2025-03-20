import { hash } from "bcryptjs";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const userExists = await prisma.account.findFirst({
    where: {
      OR: [
        { email: body.email }
      ]
    }
  })

  if (userExists) {
    throw createError({
      statusCode: 403,
      statusMessage: "User already exists",
    })
  }

  await prisma.account.create({
    data: {
      email: body.email,
      password: await hash(body.password, 12)
    },
  })

  setResponseStatus(event, 201)

  return { message: "User created" }
})