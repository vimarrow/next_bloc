'use client'

import type { PropsWithChildren } from "react";
import type { AriaTextFieldProps } from 'react-aria';
import type { IInputValue, InputBloc, InputValidatorFunctionType } from '../../models/forms/inputBloc';

import React, { useRef } from 'react';
import { useTextField } from 'react-aria';
import { useFormSubscription } from '../../utils/blocHooks';

interface AriaTextInputProps extends PropsWithChildren<AriaTextFieldProps> {
  id: string;
};

export function AriaTextInput(props: AriaTextInputProps) {
  const { label } = props;
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
        {props.isRequired ? (<sup>*</sup>) : null}
      </label>
      <div className="self-stretch bg-white rounded-lg shadow border border-gray-200">
        <input {...inputProps} ref={ref} className="grow w-full rounded-lg px-3.5 py-2.5 shrink basis-0 text-gray-500 text-base font-normal leading-normal" />
      </div>
      {props.description && (
        <div className="text-gray-500 text-sm font-normal leading-tight" {...descriptionProps}>
          {props.description}
        </div>
      )}
      {props.errorMessage && (
        <div className="text-red-500 text-sm font-normal leading-tight" {...errorMessageProps}>
          {props.errorMessage}
        </div>
      )}
    </div>    
  );
};

interface SAriaTextInputProps extends AriaTextInputProps {
  formId: string;
  validator?: InputValidatorFunctionType;
  isRequired?: boolean;
}

// SubscribedAriaTextInput
export function SAriaTextInput(props: SAriaTextInputProps) {

  const [state, subscription] = useFormSubscription<IInputValue, InputBloc>(props.formId, {
    id: props.id,
    name: props.name,
    validator: props.validator,
    isRequired: props.isRequired ?? false,
    isDisabled: props.isDisabled ?? false,
    defaultValue: props.defaultValue ?? ''
  });
  return (
    <AriaTextInput
      {...props} 
      validationState={state?.isValid ? 'valid' : 'invalid'}
      errorMessage={state?.errorMessage}
      value={(state?.value as string) ?? props.defaultValue ?? ''}
      onChange={(value) => { subscription.onValueChange(value); }}
      isReadOnly={props.isDisabled}
    />
  );
;
};
