import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import type { z } from 'zod';

type ZodSchema = z.ZodType<any, any, any>;

/**
 * Creates a validation error response
 */
class ValidationError extends Error {
  public response: NextResponse;

  constructor(message: string, details: unknown) {
    super(message);
    this.name = 'ValidationError';
    this.response = NextResponse.json(
      {
        error: message,
        details,
      },
      { status: 400 },
    );
  }
}

/**
 * Validates a request body against a Zod schema
 *
 * @param request The NextRequest object
 * @param schema The Zod schema to validate against
 * @returns The parsed data or throws a response error
 */
export async function validateRequest<T extends ZodSchema>(
  request: NextRequest,
  schema: T,
): Promise<z.infer<T>> {
  try {
    const body = await request.json();
    const result = schema.safeParse(body);

    if (!result.success) {
      throw new ValidationError('Validation Failed', result.error.format());
    }

    return result.data;
  } catch (error) {
    if (error instanceof ValidationError) {
      throw error;
    }

    throw new ValidationError(
      'Invalid JSON',
      error instanceof Error ? error.message : 'Unknown error',
    );
  }
}

/**
 * HOF that wraps a route handler with validation
 *
 * @param schema Zod schema to validate the request body against
 * @param handler The route handler function
 * @returns A new handler with validation
 */
export function withValidation<T extends ZodSchema>(
  schema: T,
  handler: (
    request: NextRequest,
    validated: z.infer<T>,
  ) => Promise<NextResponse>,
): (request: NextRequest) => Promise<NextResponse> {
  return async function handleValidatedRequest(
    request: NextRequest,
  ): Promise<NextResponse> {
    try {
      const validated = await validateRequest(request, schema);
      return await handler(request, validated);
    } catch (error) {
      if (error instanceof ValidationError) {
        return error.response;
      }

      return NextResponse.json(
        {
          error: 'Server Error',
          details: error instanceof Error ? error.message : 'Unknown error',
        },
        { status: 500 },
      );
    }
  };
}
