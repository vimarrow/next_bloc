'use client';
import type { PropsWithChildren } from "react";
import type { IFormValueType } from "../models/forms/formBloc";

import React from "react";
import { FormBloc } from "../models/forms/formBloc";
import { useSubscription } from "../utils/blocHooks";

export interface SFormProps extends PropsWithChildren {
  formId: string;
  internalFormContext: {
    useNativeAction?: boolean;
  };
  action?: string;
  method?: string;
  target?: string;
  autocomplete?: string;
  novalidate?: boolean;
  enctype?: string;
  acceptCharset?: string;
};

// SubscribesForm
export function SForm({ formId, children, internalFormContext, ...other }: SFormProps) {

  const [_, subscription] = useSubscription<IFormValueType, FormBloc>(`form_${formId}`, new FormBloc(formId));

  return (
    <form
      {...other}
      id={formId}
      onSubmit={ev => { console.log("meow"); ev.preventDefault(); subscription.validate(); }}
    >
      {children}
    </form>
  );
}
