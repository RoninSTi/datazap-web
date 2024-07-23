import prisma from '@/database/client';

export async function GET(
  request: Request,
  { params }: { params: { username: string } },
) {
  const { username } = params;

  const usernameAvailable = await prisma.userDetails.findUnique({
    where: {
      username,
    },
  });

  return new Response(
    JSON.stringify({ available: Boolean(!usernameAvailable) }),
    {
      status: 200,
    },
  );
}
