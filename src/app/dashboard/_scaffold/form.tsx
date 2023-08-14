'use client';

import dynamic from 'next/dynamic';
import React from 'react';

import { mdiMagnify, mdiArrowLeft } from '@mdi/js';
import { SATextArea } from '../../../components/aria/textArea';
import {ACheckbox} from '../../../components/aria/checkBox';
import {ACheckboxList} from '../../../components/checkBoxList';
import {ALink} from '../../../components/aria/link';
import {ANumberInput} from '../../../components/aria/numberInput';
import {AComboBox} from '../../../components/aria/comboBox';
import {ASelect} from '../../../components/aria/select';
import {ASwitch} from '../../../components/aria/switch';

// LazySubscribedAriaComponent
const SATextInput = dynamic(() => import('../../../components/aria/textInput').then((module) => module.SATextInput), {
  ssr: false,
});
const SForm = dynamic(() => import('../../../components/sForm').then((module) => module.SForm), {
  ssr: false,
});
const AButton = dynamic(() => import('../../../components/aria/button').then((module) => module.AButton), {
  ssr: false,
});


export default function TestForm() {
  return (
    <>
      <SForm formId="meow" internalFormContext={{ useNativeAction: false }}>
        <SATextInput
          insideSufixIcon={mdiMagnify}
          label="Your Username"
          isRequired
          description="Enter the username"
          defaultValue="no"
          id="username"
          formId="meow"
          validator={(val) => val.toString().length < 3 ? "Minimum 3 chars" : null}
        />
        <SATextArea
          label="Your Password"
          isRequired
          description="Enter the password"
          defaultValue="no"
          id="password"
          formId="meow"
          validator={(val) => val.toString().length < 3 ? "Minimum 3 chars" : null}
        />
        <ACheckboxList list={[{
            isDisabled: true,
            isSelected: true,
            isReadOnly: true,
            isRequired: true,
            label: "Wowo/// meow?",
            description: "Would you like some meow?"
          }, {
            label: "Whithout description"
          }]} />
        <ANumberInput label="Meow" id="num" />
        <AButton type="submit">Submit</AButton>
        <ASelect label="meow" options={[{label: "wow", value: "val"},{sectionLabel: "meow", value: [{ label: "nyam", value: "ok" }]}]} />
        <ASwitch label="Switch meowing on?" />
      </SForm>
      <ALink className="my-6 font-bold" href="tertiary" sufixIcon={mdiArrowLeft}>Open Modal</ALink>
    </>
  );
};
