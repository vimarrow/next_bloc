'use client';

import type { ComboBoxProps } from "@react-types/combobox";
import type { ComboBoxOption, ComboBoxSection } from "./comboBox";

import React, { useMemo, useRef } from "react";
import { useComboBoxState, useSearchFieldState, Item, Section } from "react-stately";
import { useComboBox, useFilter, useButton, useSearchField } from "react-aria";

import { ListBox, Popover } from "./comboBox";

export interface AAutocompleteProps<T> extends Omit<ComboBoxProps<T>, 'children'> {
  options: Array<ComboBoxOption | ComboBoxSection>;
}

function SearchAutocomplete<T extends object>(props: ComboBoxProps<T>) {
  let { contains } = useFilter({ sensitivity: "base" });
  let state = useComboBoxState({ ...props, defaultFilter: contains });

  let inputRef = useRef(null);
  let listBoxRef = useRef(null);
  let popoverRef = useRef(null);

  let { inputProps, listBoxProps, labelProps } = useComboBox(
    {
      ...props,
      inputRef,
      listBoxRef,
      popoverRef
    },
    state
  );

  // Get props for the clear button from useSearchField
  let searchProps = {
    label: props.label,
    value: state.inputValue,
    onChange: (v: string) => state.setInputValue(v)
  };

  let searchState = useSearchFieldState(searchProps);
  let { clearButtonProps } = useSearchField(searchProps, searchState, inputRef);
  let clearButtonRef = React.useRef(null);
  let { buttonProps } = useButton(clearButtonProps, clearButtonRef);
  let outerRef = React.useRef(null);

  return (
    <div className="inline-flex flex-col relative mt-4 w-52">
      <label
        {...labelProps}
        className="block text-sm font-medium text-gray-700 text-left"
      >
        {props.label}
      </label>
      <div
        ref={outerRef}
        className={`relative px-2 inline-flex flex-row items-center rounded-md overflow-hidden shadow-sm border-2 ${
          state.isFocused ? "border-pink-500" : "border-gray-300"
        }`}
      >
        S
        <input
          {...inputProps}
          ref={inputRef}
          className="w-full outline-none px-3 py-1 appearance-none"
        />
        <button
          {...buttonProps}
          ref={clearButtonRef}
          style={{ visibility: state.inputValue !== "" ? "visible" : "hidden" }}
          className="cursor-default text-gray-500 hover:text-gray-600"
        >
          x
        </button>
      </div>
      {state.isOpen && (
        <Popover
          popoverRef={popoverRef}
          triggerRef={outerRef}
          state={state}
          isNonModal
          placement="bottom start"
          className="w-52"
        >
          <ListBox {...listBoxProps} listBoxRef={listBoxRef} state={state} />
        </Popover>
      )}
    </div>
  );
};

export function AAutocomplete<T extends object>({ options, ...otherProps }: AAutocompleteProps<T>) {

  const children = useMemo(() => options?.map((o, i) => "sectionLabel" in o ? (
      <Section key={`section_${i}`} title={o.sectionLabel}>
        {
          o.value.map((item, d) => (<Item key={`item_${i}_${d}`}>{item.label}</Item>))
        }
      </Section>
    ) : (<Item key={`item_${i}`}>{o.label}</Item>)) || []
  , [options]);

  return (
    <SearchAutocomplete {...otherProps}>
      {children}
    </SearchAutocomplete>
  );
};
