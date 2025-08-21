import { IonCardContent } from '@ionic/react';
import * as React from 'react';
import { cn } from '../../../libs/utils';

interface CardContentProps extends React.HTMLAttributes<HTMLIonCardContentElement> {
  className: string;
}

export const CardContent = React.forwardRef<HTMLIonCardContentElement, CardContentProps>(
  ({ className, ...props }, ref) => <IonCardContent ref={ref} className={cn('p-6 pt-0', className)} {...props} />,
);

CardContent.displayName = 'CardContent';
