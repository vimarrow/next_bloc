'use client';

import type { PropsWithChildren } from "react";
import type { AriaTextFieldProps } from 'react-aria';
import type { IInputValue, InputBloc, InputValidatorFunctionType } from '../../models/forms/inputBloc';

import React, { useRef } from 'react';
import { useTextField } from 'react-aria';
import { useFormSubscription } from '../../utils/blocHooks';
import { MdiIcon } from "../icons";

interface ATextInputProps extends PropsWithChildren<AriaTextFieldProps> {
  id: string;
  insidePrefixIcon?: string;
  insideSufixIcon?: string;
};

export function ATextInput(props: ATextInputProps) {
  const { label, description, isRequired, errorMessage, insidePrefixIcon, insideSufixIcon } = props;
  const ref = useRef(null);
  const {
    labelProps,
    inputProps,
    descriptionProps,
    errorMessageProps
  } = useTextField(props, ref);

  return (
    <div className="w-full my-2 flex flex-col gap-1.5">
      <label {...labelProps} className="text-gray-900 font-medium leading-tight">
        {label}
        {isRequired ? (<sup>*</sup>) : null}
      </label>
      <div className="self-stretch bg-white rounded-lg border border-gray-300 flex flex-row justify-items-center focus-within:shadow focus-within:outline-gray-500">
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

interface SATextInputProps extends ATextInputProps {
  formId: string;
  validator?: InputValidatorFunctionType;
  isRequired?: boolean;
}

// SubscribedAriaTextInput
export function SATextInput(props: SATextInputProps) {

  const [state, subscription] = useFormSubscription<IInputValue, InputBloc>(props.formId, {
    id: props.id,
    name: props.name,
    validator: props.validator,
    isRequired: props.isRequired ?? false,
    isDisabled: props.isDisabled ?? false,
    defaultValue: props.defaultValue ?? ''
  });
  return (
    <ATextInput
      {...props} 
      validationState={state?.isValid ? 'valid' : 'invalid'}
      errorMessage={state?.errorMessage}
      value={(state?.value as string) ?? props.defaultValue ?? ''}
      onChange={(value) => { subscription.onValueChange(value); }}
      isReadOnly={props.isDisabled}
    />
  );
};
