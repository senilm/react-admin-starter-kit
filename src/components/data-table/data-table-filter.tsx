import { useState, useCallback } from 'react';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  SelectField,
  StringField,
  DateRangeField,
  resolveFromKey,
  resolveToKey,
} from './data-table-filter-fields';

export type { FilterField } from './data-table-filter-fields';

type DataTableFilterProps = {
  fields: import('./data-table-filter-fields').FilterField[];
  values: Record<string, string>;
  onChange: (key: string, value: string) => void;
  onClear: () => void;
  activeCount: number;
};

export const DataTableFilter = ({
  fields,
  values,
  onChange,
  onClear,
  activeCount,
}: DataTableFilterProps) => {
  const [open, setOpen] = useState(false);

  const clearField = useCallback(
    (field: import('./data-table-filter-fields').FilterField) => {
      if (field.type === 'dateRange') {
        onChange(resolveFromKey(field), '');
        onChange(resolveToKey(field), '');
      } else {
        onChange(field.key, '');
      }
    },
    [onChange],
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="relative">
          <Filter />
          Filters
          {activeCount > 0 && (
            <span className="ml-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
              {activeCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit min-w-72 max-w-160" align="start">
        <div className="flex items-center justify-between gap-4 pb-3">
          <h4 className="text-sm font-medium">Filters</h4>
          <Button
            className="shrink-0 text-xs"
            onClick={onClear}
            variant="ghost"
            disabled={activeCount === 0}
          >
            Clear all
          </Button>
        </div>
        <div className="flex flex-wrap gap-3">
          {fields.map((field) => {
            switch (field.type) {
              case 'dateRange':
                return (
                  <DateRangeField
                    key={field.key}
                    field={field}
                    fromDate={values[resolveFromKey(field)] ?? ''}
                    toDate={values[resolveToKey(field)] ?? ''}
                    onChange={onChange}
                    onClear={clearField}
                  />
                );
              case 'string':
                return (
                  <StringField
                    key={field.key}
                    field={field}
                    value={values[field.key] ?? ''}
                    onChange={onChange}
                    onClear={clearField}
                  />
                );
              default:
                return (
                  <SelectField
                    key={field.key}
                    field={field}
                    value={values[field.key] ?? ''}
                    onChange={onChange}
                    onClear={clearField}
                  />
                );
            }
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
};
