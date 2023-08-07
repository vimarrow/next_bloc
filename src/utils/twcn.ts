import type { ClassValue } from 'clsx';

import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

export function cn(...args: ClassValue[]) {
  return twMerge(clsx(args));
}
