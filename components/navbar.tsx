import { UserButton, auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import { MainNav } from '@/components/main-nav';
import StoreSwitcher from '@/components/store-switcher';
import prismadb from '@/lib/prismadb';
import { MobileNavbar } from '@/components/mobile-nav-bar';

const Navbar = async () => {
  const { userId } = auth();
  if (!userId) {
    redirect('/sign-in');
  }

  const stores = await prismadb.store.findMany({
    where: {
      userId,
    },
  });
  return (
    <div className="border-b">
      <div className="flex sm:h-16  h-12 items-center sm:px-4 px-2">
        <div className="hidden sm:block">
          <StoreSwitcher items={stores} />
        </div>
        <MainNav className="mx-6 hidden sm:block" />
        <div className="sm:hidden">
          <MobileNavbar stores={stores} />
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
