'use client'

import type { ButtonProps } from 'react-aria-components';

import React from 'react';
import { useButton } from 'react-aria';

import { cn } from '../../utils/twcn';

export interface AriaButtonProps extends React.PropsWithChildren<ButtonProps> {
  variant?: "primary" | "secondary" | "tertiary";
}

const variantMap = {
  "primary": "bg-gray-800 text-white",
  "secondary": "border border-gray-400 text-black",
  "tertiary": "text-black"
};

export function AriaButton({ variant, children, ...otherProps }: AriaButtonProps) {
  let ref = React.useRef(null);
  let { buttonProps } = useButton(otherProps, ref);

  const variantClassNames = variantMap[variant || "primary"];

  return (
    <button {...buttonProps} ref={ref}
      className={cn("w-full h-12 px-4 py-3 rounded-lg block text-base text-center font-semibold", variantClassNames)} 
    >
      {children}
    </button>
  );
}
// 
