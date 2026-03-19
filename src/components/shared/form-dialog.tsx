import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

type FormDialogShellProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: React.ReactNode;
  className?: string;
};

export const FormDialogShell = ({ open, onOpenChange, title, children, className }: FormDialogShellProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className={cn('p-0 gap-0', className)} showCloseButton={false}>
      <DialogHeader className="px-6 pt-6 pb-4 border-b">
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>
      {children}
    </DialogContent>
  </Dialog>
);

type FormDialogBodyProps = {
  children: React.ReactNode;
  className?: string;
};

export const FormDialogBody = ({ children, className }: FormDialogBodyProps) => (
  <div className={cn('px-6 py-6', className)}>{children}</div>
);

type FormDialogFooterProps = {
  children: React.ReactNode;
};

export const FormDialogFooter = ({ children }: FormDialogFooterProps) => (
  <div className="px-6 py-4 border-t flex justify-end gap-2">{children}</div>
);
