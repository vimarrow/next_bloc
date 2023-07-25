'use client';

import type { LinkProps } from 'next/link';

import React from 'react';
import { useLink } from 'react-aria';
import Link from 'next/link';

export function AriaLink(props: LinkProps & any) {
  let ref = React.useRef(null);
  let { linkProps } = useLink(props, ref);

  return (
    <Link
      {...linkProps}
      ref={ref}
      href={props.href}
      target={props.target}
    >
      {props.children}
    </Link>
  );
}
