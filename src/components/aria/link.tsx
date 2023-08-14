'use client';

import type { PropsWithChildren } from 'react';
import type { AriaLinkOptions } from 'react-aria';
import type { LinkProps } from 'next/link';

import React from 'react';
import { useLink } from 'react-aria';
import Link from 'next/link';
import {cn} from '../../utils/twcn';
import {MdiIcon} from '../icons';

interface ALinkProps extends PropsWithChildren<LinkProps & AriaLinkOptions> {
  className?: string;
  prefixIcon?: string;
  sufixIcon?: string;
  target?: string;
  href: string;
}

export function ALink(props: ALinkProps) {
  let ref = React.useRef(null);
  let { linkProps } = useLink(props, ref);

  return (
    <div className={cn("flex justify-center text-center underline items-center", props.className)}>
      {props.prefixIcon && (<MdiIcon className="mr-2" path={props.prefixIcon} size="24px" />)}
      <Link
        target={props.target}
        {...linkProps}
        ref={ref}
        href={props.href}
      >
        {props.children}
      </Link>
      {props.sufixIcon && (<MdiIcon className="ml-2" path={props.sufixIcon} size="24px" />)}
    </div>
  );
}
