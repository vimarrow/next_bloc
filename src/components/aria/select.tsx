'use client';

import type { AriaSelectProps } from "@react-types/select";
import type { ComboBoxOption, ComboBoxSection } from "./comboBox";

import React, { useMemo, useRef } from "react";
import { mdiChevronDown } from '@mdi/js';
import { useSelectState, Item, Section } from "react-stately";
import {
  useSelect,
  HiddenSelect,
  useButton,
  mergeProps,
  useFocusRing
} from "react-aria";

import { ListBox, Popover } from "./comboBox";
import {MdiIcon} from "../icons";

export interface ASelectProps<T> extends Omit<AriaSelectProps<T>, 'children'> {
  options: Array<ComboBoxOption | ComboBoxSection>;
};

function Select<T extends object>(props: AriaSelectProps<T>) {
  // Create state based on the incoming props
  let state = useSelectState(props);

  // Get props for child elements from useSelect
  let ref = useRef(null);
  let { labelProps, triggerProps, valueProps, menuProps } = useSelect(
    props,
    state,
    ref
  );

  // Get props for the button based on the trigger props from useSelect
  let { buttonProps } = useButton(triggerProps, ref);

  let { focusProps, isFocusVisible } = useFocusRing();

  return (
    <div className="w-full my-2 flex flex-col gap-1.5">
      <label
        {...labelProps}
        className="text-gray-900 font-medium leading-tight"
      >
        {props.label}
      </label>
      <HiddenSelect
        state={state}
        triggerRef={ref}
        label={props.label}
        name={props.name}
      />
      <button
        {...mergeProps(buttonProps, focusProps)}
        ref={ref}
        className="self-stretch bg-white px-3.5 py-2.5 grow shrink basis-0 rounded-lg border border-gray-300 flex flex-row justify-between focus:shadow focus:outline-gray-300"
      >
        <span
          {...valueProps}
          className={`text-md ${
            state.selectedItem ? "text-gray-800" : "text-gray-500"
          }`}
        >
          {state.selectedItem
            ? state.selectedItem.rendered
            : "Select an option"}
        </span>
        <MdiIcon path={mdiChevronDown} size="24px" />
      </button>
      {state.isOpen && (
        <Popover
          state={state}
          triggerRef={ref}
          placement="bottom start"
          className="w-52"
        >
          <ListBox {...menuProps} state={state} />
        </Popover>
      )}
    </div>
  );
};

export function ASelect<T extends object>({ options, ...otherProps }: ASelectProps<T>) {

  const children = useMemo(() => options?.map((o, i) => "sectionLabel" in o ? (
      <Section key={`section_${i}`} title={o.sectionLabel}>
        {
          o.value.map((item, d) => (<Item key={`item_${i}_${d}`}>{item.label}</Item>))
        }
      </Section>
    ) : (<Item key={`item_${i}`}>{o.label}</Item>)) || []
  , [options]);

  return (
    <Select {...otherProps}>
      {children}
    </Select>
  );
};
