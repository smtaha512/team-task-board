import { IonCard } from '@ionic/react';
import * as React from 'react';
import { cn } from '../../../libs/utils';

interface CardProps extends React.HTMLAttributes<HTMLIonCardElement> {
  className: string;
}

export const Card = React.forwardRef<HTMLIonCardElement, CardProps>(({ className, ...props }, ref) => (
  <IonCard ref={ref} className={cn('rounded-lg border bg-card text-card-foreground shadow-sm', className)} {...props} />
));

Card.displayName = 'Card';
