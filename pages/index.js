import { useSession } from 'next-auth/react';
import Link from 'next/link';

//useRouter can access router
import { useRouter } from 'next/router';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return null;
  }

  //session is null if user is not logged in
  if (session) {
    //navigate to home
    router.push('/home');
  }

  return <Link href="/api/auth/signin">login</Link>;
}
