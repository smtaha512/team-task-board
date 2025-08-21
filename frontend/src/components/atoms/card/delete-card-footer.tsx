import * as React from 'react';
import { cn } from '../../../libs/utils';
import type { DivAttributes } from '../../../shared/types/html-element.attr.types';

export const CardFooter = React.forwardRef<HTMLDivElement, DivAttributes>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...props} />
));

CardFooter.displayName = 'CardFooter';
