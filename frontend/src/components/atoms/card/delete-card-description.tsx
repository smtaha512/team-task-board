import * as React from 'react';
import { cn } from '../../../libs/utils';
import type { ParagraphAttributes } from '../../../shared/types/html-element.attr.types';

export const CardDescription = React.forwardRef<HTMLParagraphElement, ParagraphAttributes>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
  ),
);

CardDescription.displayName = 'CardDescription';
