'use client';

import type { PropsWithChildren } from 'react';
import type { CheckboxProps } from 'react-aria-components';

import { useRef } from 'react';
import { useToggleState } from 'react-stately';
import { useCheckbox } from 'react-aria';

export interface ACheckboxProps extends PropsWithChildren<CheckboxProps> {
  label: string;
  description?: string;
}

export function ACheckbox(props: ACheckboxProps) {
  let { label, description } = props;
  let state = useToggleState(props);
  let ref = useRef(null);
  let { inputProps } = useCheckbox({
    ...props,
    'aria-label': label,
  }, state, ref);

  return (
    <label className="block py-2">
      <input {...inputProps} ref={ref} />
      <span className="ml-3">
        {label}
      </span>
      {
        description && (
          <>
            <br />
            <span className="ml-9 text-gray-500">{description}</span>
          </>
        )
      }
    </label>
  );
}
