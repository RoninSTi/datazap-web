import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import type { z } from 'zod';

type ZodSchema = z.ZodType<any, any, any>;

/**
 * Validates a request body against a Zod schema
 * 
 * @param request The NextRequest object
 * @param schema The Zod schema to validate against
 * @returns The parsed data or throws a response error
 */
export async function validateRequest<T extends ZodSchema>(
  request: NextRequest,
  schema: T
): Promise<z.infer<T>> {
  try {
    const body = await request.json();
    const result = schema.safeParse(body);
    
    if (!result.success) {
      throw NextResponse.json(
        {
          error: 'Validation Failed',
          details: result.error.format(),
        },
        { status: 400 }
      );
    }
    
    return result.data;
  } catch (error) {
    if (error instanceof NextResponse) {
      throw error;
    }
    
    throw NextResponse.json(
      { 
        error: 'Invalid JSON', 
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 400 }
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
  handler: (request: NextRequest, validated: z.infer<T>) => Promise<NextResponse>
) {
  return async function(request: NextRequest): Promise<NextResponse> {
    try {
      const validated = await validateRequest(request, schema);
      return await handler(request, validated);
    } catch (error) {
      if (error instanceof NextResponse) {
        return error;
      }
      
      return NextResponse.json(
        { error: 'Server Error', details: error instanceof Error ? error.message : 'Unknown error' },
        { status: 500 }
      );
    }
  };
}