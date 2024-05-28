import { getServerSession } from 'next-auth/next';

import { authOptions } from '@/config/auth';

export default async function Home() {
  // Get user session token
  const session = await getServerSession(authOptions);
  // session = null || { user: { name, email, image } }

  return (
    <div>
      <h2>My Amazing App</h2>

      {session && (
        <div>
          <p>Signed in as {session.user && session.user.name}</p>
          <a href="/api/auth/signout">Sign out by link</a>
        </div>
      )}

      {!session && <p>Not signed in</p>}
    </div>
  );
}
