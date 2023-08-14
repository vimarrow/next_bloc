'use client';
import type { AriaSwitchProps } from 'react-aria';

import React, { useEffect, useRef } from "react";
import { useToggleState } from 'react-stately';
import { useFocusRing, useSwitch, VisuallyHidden } from 'react-aria';
import { animated, useSpring } from '@react-spring/web';

export interface ASwitchProps extends AriaSwitchProps {
  label: string;
};

export function ASwitch(props: ASwitchProps) {
  let state = useToggleState(props);
  let ref = useRef(null);
  let { inputProps } = useSwitch({...props, 'aria-label': props.label}, state, ref);
  let { isFocusVisible, focusProps } = useFocusRing();

  const anime = useSpring({
    cx: state.isSelected ? 28 : 12,
    fill: state.isSelected ? 'rgb(31,41,55)' : 'rgb(243, 244, 246)',
    config: { mass: 1, tension: 300, friction: 33, precision: 0.2 }
  });

  return (
    <label
      className="flex items-center"
    >
      <VisuallyHidden>
        <input {...inputProps} {...focusProps} ref={ref} />
      </VisuallyHidden>
      <svg
        className="shadow rounded-xl mr-2"
        width={40}
        height={24}
        aria-hidden="true"
      >
        <animated.rect
          x={0}
          y={0}
          width={40}
          height={24}
          rx={10}
          fill={anime.fill}
        />
        <animated.circle
          filter="drop-shadow(0px 1px 2px rgba(16, 24, 40, 0.06)) drop-shadow(0px 1px 3px rgba(16, 24, 40, 0.10))"
          cx={anime.cx}
          cy={12}
          r={10}
          fill="white"
        />
        {isFocusVisible &&
          (
            <rect
              x={1}
              y={1}
              width={38}
              height={22}
              rx={11}
              fill="none"
              stroke="gray"
              strokeWidth={2}
            />
          )}
      </svg>
      {props.label}
    </label>
  );
}
