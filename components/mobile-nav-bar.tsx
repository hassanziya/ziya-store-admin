'use client';

import { useState } from 'react';
import {
  Check,
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  Menu,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  StoreIcon,
  Users,
} from 'lucide-react';
import { useParams, usePathname, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import StoreSwitcher from './store-switcher';
import { Store } from '@prisma/client';
import { useStoreModal } from '@/hooks/use-store-modal';
import { cn } from '@/lib/utils';

interface MobileNavbarProps {
  stores: Store[];
}
export const MobileNavbar: React.FC<MobileNavbarProps> = ({ stores }) => {
  const [open, setOpen] = useState(false);
  const storeModal = useStoreModal();
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();

  const routes = [
    {
      href: `/${params.storeId}`,
      label: 'Overview',
      active: pathname === `/${params.storeId}`,
    },
    {
      href: `/${params.storeId}/billboards`,
      label: 'Billboards',
      active: pathname === `/${params.storeId}/billboards`,
    },
    {
      href: `/${params.storeId}/categories`,
      label: 'Categories',
      active: pathname === `/${params.storeId}/categories`,
    },
    {
      href: `/${params.storeId}/settings`,
      label: 'Settings',
      active: pathname === `/${params.storeId}/settings`,
    },
  ];
  const formatedItems = stores.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const currentStore = formatedItems.find(
    (item) => item.value === params.storeId
  );

  const onStoreSelect = (store: { value: string; label: string }) => {
    setOpen(false);
    router.push(`/${store.value}`);
  };

  const onRouteSelect = (href: string) => {
    router.push(`${href}`);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Menu />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <StoreIcon className="mr-2 h-4 w-4" />
              <span>{currentStore?.label}</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className="w-[200px] p-0 " sideOffset={5}>
                <Command>
                  <CommandList>
                    <CommandInput placeholder="Search store..." />
                    <CommandEmpty>No store found</CommandEmpty>
                    <CommandGroup heading="Stores">
                      {formatedItems.map((store) => (
                        <CommandItem
                          key={store.value}
                          onSelect={() => onStoreSelect(store)}
                          className="text-sm"
                        >
                          <StoreIcon className="mr-2 h-4 w-4" />
                          {store.label}
                          <Check
                            className={cn(
                              'ml-auto h-4 w-4',
                              currentStore?.value === store.value
                                ? 'opacity-100'
                                : 'opacity-0'
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                  <CommandSeparator />
                  <CommandList>
                    <CommandGroup>
                      <CommandItem
                        onSelect={() => {
                          setOpen(false);
                          storeModal.onOpen();
                        }}
                      >
                        <PlusCircle className="mr-2 h-5 w-5" />
                        Create store
                      </CommandItem>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          {routes.map((route) => (
            <DropdownMenuItem
              key={route.href}
              className={cn(
                ' py-2',
                route.active
                  ? 'text-black dark:text-white'
                  : 'text-muted-foreground'
              )}
              onSelect={() => onRouteSelect(route.href)}
            >
              <span>{route.label}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
