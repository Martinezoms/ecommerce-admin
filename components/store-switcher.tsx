'use client';

import { useState } from 'react';
import { Store } from '@prisma/client';
import {
  Check,
  ChevronsUpDown,
  PlusCircle,
  Store as StoreIcon
} from 'lucide-react';
import { useParams, usePathname, useRouter } from 'next/navigation';

import { cn } from '@/lib/utils';
import { useStoreModal } from '@/hooks/use-store-modal';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem,
  CommandSeparator
} from '@/components/ui/command';

type PopOverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

type FormattedItem = {
  label: string;
  value: string;
};

interface StoreSwitcherProps extends PopOverTriggerProps {
  items: Store[];
}

const StoreSwitcher: React.FC<StoreSwitcherProps> = ({
  className,
  items = []
}) => {
  const [open, setOpen] = useState(false);
  const { onOpen } = useStoreModal();
  const params = useParams();
  // const pathname = usePathname();
  const router = useRouter();

  const formattedItems = items.map((item) => {
    return {
      label: item.name,
      value: item.id
    };
  });

  const currentStore = formattedItems.find(
    (item) => item.value === params.storeId
  );

  const onStoreSelect = (store: FormattedItem) => {
    setOpen(false);
    router.push(`/${store.value}`);
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          aria-label="select a store"
          className={cn('w-[200px] justify-between', className)}
        >
          <StoreIcon className="mr-2 h-4 w-4" />
          {currentStore?.label}
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search store..." />
            <CommandEmpty>No store found</CommandEmpty>
            <CommandGroup heading="Stores">
              {formattedItems.map((store) => (
                <CommandItem
                  key={store.value}
                  onSelect={() => onStoreSelect(store)}
                  className="text-sm cursor-pointer"
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
              <CommandItem onSelect={() => onOpen()} className="cursor-pointer">
                <PlusCircle className="mr-2 h-5 w-5" />
                Create store
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default StoreSwitcher;
