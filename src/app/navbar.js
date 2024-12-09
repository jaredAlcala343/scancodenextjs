// components/Navbar.js

import { signIn, signOut, useSession } from 'next-auth/react';

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav>
      {status === 'unauthenticated' && (
        <>
          <span>You are not signed in</span>
          <a href="/api/auth/signin" onClick={(e) => { e.preventDefault(); signIn(); }}>Sign in</a>
        </>
      )}
      {status === 'authenticated' && (
        <>
          <span>Signed in as {session.user.email}</span>
          <a href="/api/auth/signout" onClick={(e) => { e.preventDefault(); signOut(); }}>Sign out</a>
        </>
      )}
    </nav>
  );
}
