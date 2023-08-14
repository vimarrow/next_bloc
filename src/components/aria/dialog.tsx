'use client';

import type { AriaDialogProps } from 'react-aria';
import type { PropsWithChildren } from 'react';

import React from 'react';
import { useDialog } from 'react-aria';

interface ADialogProps extends PropsWithChildren<AriaDialogProps> {
  title?: React.ReactNode;
}

export function ADialog({ title, children, ...props }: ADialogProps) {
  let ref = React.useRef(null);
  let { dialogProps, titleProps } = useDialog(props, ref);

  return (
    <div {...dialogProps} ref={ref} style={{ padding: 30 }}>
      {title &&
        (
          <h3 {...titleProps} style={{ marginTop: 0 }}>
            {title}
          </h3>
        )}
      {children}
    </div>
  );
}
