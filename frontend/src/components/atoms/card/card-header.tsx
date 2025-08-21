import { IonCardHeader } from '@ionic/react';
import * as React from 'react';
import { cn } from '../../../libs/utils';

interface CardHeaderProps extends React.HTMLAttributes<HTMLIonCardHeaderElement> {
  className: string;
}

export const CardHeader = React.forwardRef<HTMLIonCardHeaderElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <IonCardHeader ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
  ),
);

CardHeader.displayName = 'CardHeader';
