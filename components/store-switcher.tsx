'use client';

import { useState } from 'react';
import { Store } from '@prisma/client';
import { ChevronsUpDown, Store as StoreIcon } from 'lucide-react';
import { useParams, usePathname, useRouter } from 'next/navigation';

import { cn } from '@/lib/utils';
import { useStoreModal } from '@/hooks/use-store-modal';
import { Popover, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';

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
  const { isOpen, onOpen } = useStoreModal();
  const params = useParams();
  const pathname = usePathname();
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
          Current store
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
    </Popover>
  );
};

export default StoreSwitcher;
