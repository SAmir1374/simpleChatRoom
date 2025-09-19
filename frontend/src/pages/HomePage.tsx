import NavBar from '@/components/NavBar';
import Chat from '@/components/Chat';
import { useEffect } from 'react';
import usersDispatcher from '@/dispatcher/user';

function HomePage() {
  useEffect(() => {
    usersDispatcher();
  }, []);

  return (
    <div>
      <NavBar />
      <Chat />
    </div>
  );
}

export default HomePage;
