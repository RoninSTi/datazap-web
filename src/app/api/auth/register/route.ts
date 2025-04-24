import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import prisma from '@/database/client';
import { AuthRegisterRequestBodySchema } from '@/types/user';

export async function POST(request: NextRequest) {
  // Retrieve the JSON data from the request body
  const body = await request.json();

  // Use Zod to validate the received data against the UserSchema
  const result = AuthRegisterRequestBodySchema.safeParse(body);

  // Check if the validation is successful
  if (result.success) {
    const userExists = await prisma.user.findUnique({
      where: {
        email: result.data.email,
      },
    });

    if (userExists !== null) {
      return NextResponse.json(
        {
          error: 'User already exists',
        },
        {
          status: 409,
        },
      );
    }

    const user = await prisma.user.create({
      data: {
        email: result.data.email,
      },
    });

    return NextResponse.json({ user }, { status: 201 });
  }

  // If validation errors, map them into an object
  const serverErrors = Object.fromEntries(
    result.error?.issues?.map((issue) => [issue.path[0], issue.message]) || [],
  );

  // Respond with a JSON object containing the validation errors
  return NextResponse.json({ errors: serverErrors });
}
