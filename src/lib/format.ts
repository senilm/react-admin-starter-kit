import { format, formatDistanceToNow } from 'date-fns';

export const formatDate = (date: string | Date | null | undefined, pattern = 'dd MMM, yyyy') => {
  if (!date) return '\u2014';
  return format(new Date(date), pattern);
};

export const formatDateTime = (date: string | Date) => {
  return format(new Date(date), 'dd MMM, yyyy \'at\' h:mm a');
};

export const formatRelativeTime = (date: string | Date) => {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};

export const formatCurrency = (
  value?: number | null,
  options: { currency?: string; compact?: boolean } = {},
): string => {
  if (value === null || value === undefined) return '\u2014';
  const { currency = 'USD', compact = false } = options;
  if (compact && value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  if (compact && value >= 1_000) return `$${(value / 1_000).toFixed(0)}K`;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const formatLabel = (str: string) => str.replace(/_/g, ' ');

export const formatFullName = (firstName?: string | null, lastName?: string | null): string =>
  [firstName, lastName].filter(Boolean).join(' ');

export const humanize = (str: string) => {
  return str
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
};

/**
 * Parses a date-only ISO string (YYYY-MM-DD) into a Date in local timezone.
 * Using `new Date('2026-02-23')` alone creates UTC midnight which shifts
 * to the previous day in negative-offset timezones — this avoids that.
 */
export const parseDateFromISO = (isoDateStr: string): Date =>
  new Date(isoDateStr + 'T00:00:00');

/**
 * Converts a Date to a date-only ISO string (YYYY-MM-DD).
 * Uses local date parts so the string matches what the user sees on screen.
 */
export const formatDateToISO = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Extracts YYYY-MM-DD from an ISO date string for use in <input type="date">.
 * Returns empty string if input is nullish.
 */
export const toDateInputValue = (isoString?: string | null): string =>
  isoString?.split('T')[0] ?? '';

/**
 * Locale-aware short date display.
 * Adapts to the user's browser locale automatically:
 *   en-US → "Feb 23, 2026"
 *   de-DE → "23. Feb. 2026"
 *   ja-JP → "2026年2月23日"
 */
export const formatDateShort = (date: Date): string =>
  new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
