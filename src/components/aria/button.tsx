'use client'

import type { ButtonProps } from 'react-aria-components';

import React from 'react';
import { useButton } from 'react-aria';

export function AriaButton(props: React.PropsWithChildren<ButtonProps>) {
  let ref = React.useRef(null);
  let { buttonProps } = useButton(props, ref);

  return (
    <button {...buttonProps} ref={ref}>
      {props.children}
    </button>
  );
}
