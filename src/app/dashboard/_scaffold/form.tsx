'use client';
import type { SFormProps } from '../../../components/sForm';

import dynamic from 'next/dynamic';
import React from 'react';

// LazySubscribedAriaComponent
const LSAriaTextInput = dynamic(() => import('../../../components/aria/textInput').then((module) => module.SAriaTextInput), {
  ssr: false,
});
const LSForm = dynamic(() => import('../../../components/sForm').then((module) => module.SForm), {
  ssr: false,
});
const LButton = dynamic(() => import('../../../components/aria/button').then((module) => module.AriaButton), {
  ssr: false,
});


export default function TestForm() {
  return (
    <LSForm formId="meow" internalFormContext={{ useNativeAction: false }}>
      <LSAriaTextInput
        label="Your Username"
        isRequired
        description="Enter the username"
        defaultValue="no"
        id="username"
        formId="meow"
        validator={(val) => val.toString().length < 3 ? "Minimum 3 chars" : null}
      />
      <LSAriaTextInput
        label="Your Password"
        isRequired
        description="Enter the password"
        defaultValue="no"
        id="password"
        formId="meow"
        validator={(val) => val.toString().length < 3 ? "Minimum 3 chars" : null}
      />
      <LButton type="submit">Submit</LButton>
    </LSForm>
  );
};
