import type { LucideIcon } from 'lucide-react';

export type NavItem = {
  label: string;
  path: string;
  icon: LucideIcon;
  permission?: string | string[];
};

export type NavGroup = {
  label: string;
  items: NavItem[];
};
