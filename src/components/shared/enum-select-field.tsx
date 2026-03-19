import { type FieldValues, type FieldPath, type Control } from 'react-hook-form';
import { formatLabel } from '@/lib/format';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type EnumSelectFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  enumObj: Record<string, string>;
  placeholder?: string;
  disabled?: boolean;
};

export const EnumSelectField = <T extends FieldValues>({
  control,
  name,
  label,
  enumObj,
  placeholder = 'Select...',
  disabled,
}: EnumSelectFieldProps<T>) => {
  const options = Object.values(enumObj).map((value) => ({
    label: formatLabel(value),
    value,
  }));

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select onValueChange={field.onChange} value={field.value ?? ''} disabled={disabled}>
            <FormControl>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
