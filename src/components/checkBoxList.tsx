'use client';

import type { PropsWithChildren } from 'react';
import type { ACheckboxProps } from './aria/checkBox';

import { ACheckbox } from './aria/checkBox';

interface ACheckboxListProps {
  vertical?: boolean;
  list: ACheckboxProps[];
}

export function ACheckboxList(props: PropsWithChildren<ACheckboxListProps>) {
  let { list, vertical } = props;
  
  return (
    <div>
      {list.map((props, index) => (<ACheckbox key={`checkBox_${props.id}_${index}`} {...props} />))}
    </div>
  );
}
