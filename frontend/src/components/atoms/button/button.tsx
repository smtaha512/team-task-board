import { Slot } from '@radix-ui/react-slot';
import * as React from 'react';

import type { JSX as IonicJSX } from '@ionic/core';
import { IonButton } from '@ionic/react';

export interface ButtonProps
  extends IonicJSX.IonButton,
    Omit<React.HTMLAttributes<HTMLIonButtonElement>, keyof IonicJSX.IonButton> {
  asChild?: boolean;
  className: string;
  children?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLIonButtonElement, ButtonProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : IonButton;
    return <Comp className={className} ref={ref} {...props} />;
  },
);
Button.displayName = 'Button';
