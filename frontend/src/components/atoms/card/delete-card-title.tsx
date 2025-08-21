import * as React from 'react';
import { cn } from '../../../libs/utils';
import type { HeadingAttributes } from '../../../shared/types/html-element.attr.types';

export const CardTitle = React.forwardRef<HTMLParagraphElement, HeadingAttributes>(({ className, ...props }, ref) => (
  <h3 ref={ref} className={cn('text-2xl font-semibold leading-none tracking-tight', className)} {...props} />
));

CardTitle.displayName = 'CardTitle';
