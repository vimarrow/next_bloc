'use client';

import type { PropsWithChildren } from "react";
import type { AriaNumberFieldProps } from 'react-aria';
import type { NumberFieldStateOptions } from 'react-stately';

import React, { useRef } from 'react';
import { useLocale, useNumberField } from 'react-aria';
import { useNumberFieldState } from 'react-stately';
import { MdiIcon } from "../icons";

interface ANumberInputProps extends PropsWithChildren<AriaNumberFieldProps> {
  id: string;
  insidePrefixIcon?: string;
  insideSufixIcon?: string;
};

export function ANumberInput(props: ANumberInputProps) {
  const { locale } = useLocale();
  const state = useNumberFieldState({ ...props, locale });
  const ref = useRef(null);
  const {
    errorMessageProps,
    descriptionProps,
    labelProps,
    groupProps,
    inputProps,
  } = useNumberField(props, state, ref);

  const { isRequired, label, insideSufixIcon, insidePrefixIcon, description, errorMessage } = props;

  return (
    <div className="w-full my-2 flex flex-col gap-1.5">
      <label {...labelProps} className="text-gray-900 font-medium leading-tight">
        {label}
        {isRequired ? (<sup>*</sup>) : null}
      </label>
      <div {...groupProps} className="self-stretch bg-white rounded-lg border border-gray-300 flex flex-row justify-items-center focus-within:shadow focus-within:outline-gray-500">
        {insidePrefixIcon && <MdiIcon size="32px" path={insidePrefixIcon} className="my-auto pl-3 stroke-gray-400" />}
        <input {...inputProps} ref={ref} className="grow outline-none w-full rounded-lg px-3.5 py-2.5 shrink basis-0 text-gray-500 text-base font-normal leading-normal" />
        {insideSufixIcon && <MdiIcon size="32px" path={insideSufixIcon} className="my-auto pr-3 stroke-gray-400" />}
      </div>
      {description && (
        <div className="text-gray-500 text-sm font-normal leading-tight" {...descriptionProps}>
          {description}
        </div>
      )}
      {errorMessage && (
        <div className="text-red-500 text-sm font-normal leading-tight" {...errorMessageProps}>
          {errorMessage}
        </div>
      )}
    </div>    
  );
};
