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
    <div>
      <label {...labelProps}>
        {label}
        {props.isRequired ? (<sup>*</sup>) : null}
      </label>
      <input {...inputProps} ref={ref} />
      {props.description && (
        <div {...descriptionProps}>
          {props.description}
        </div>
      )}
      {props.errorMessage && (
        <div {...errorMessageProps}>
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
