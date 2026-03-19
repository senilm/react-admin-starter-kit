export const ViewMode = {
  LIST: 'list',
  GRID: 'grid',
} as const;

export type ViewMode = (typeof ViewMode)[keyof typeof ViewMode];
