import { useState, useMemo } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { roleService } from '@/services/role.service';
import { QUERY_KEYS } from '@/lib/constants';

type RoleComboboxProps = {
  value: string;
  onChange: (value: string) => void;
};

export const RoleCombobox = ({ value, onChange }: RoleComboboxProps) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const { data: rolesData } = useQuery({
    queryKey: QUERY_KEYS.roles({ isSystem: 'false', s: search || undefined }),
    queryFn: () => roleService.getAll({ limit: 50, isSystem: 'false', s: search || undefined }),
  });

  const roles = useMemo(() => rolesData?.items ?? [], [rolesData]);
  const selectedRole = roles.find((r) => r._id === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between font-normal"
        >
          {selectedRole ? selectedRole.name : 'Select a role'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-(--radix-popover-trigger-width) p-0" align="start">
        <Command shouldFilter={false}>
          <CommandInput placeholder="Search roles..." value={search} onValueChange={setSearch} />
          <CommandList>
            <CommandEmpty>No roles found.</CommandEmpty>
            <CommandGroup>
              {roles.map((role) => (
                <CommandItem
                  key={role._id}
                  value={role._id}
                  onSelect={(val) => {
                    onChange(val === value ? '' : val);
                    setOpen(false);
                  }}
                >
                  <Check className={cn('mr-2 h-4 w-4', value === role._id ? 'opacity-100' : 'opacity-0')} />
                  {role.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
