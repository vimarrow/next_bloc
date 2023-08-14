'use client';

import type { ComboBoxProps } from "@react-types/combobox";
import type { AriaListBoxOptions } from "@react-aria/listbox";
import type { OverlayTriggerState, ListState } from "react-stately";
import type { AriaPopoverProps } from "@react-aria/overlays";
import type { Node } from "@react-types/shared";

import React, { PropsWithChildren, useMemo, useRef } from 'react';
import { useButton, useComboBox, useFilter } from 'react-aria';
import { useComboBoxState, Item, Section } from 'react-stately';
import { usePopover, DismissButton, Overlay } from "@react-aria/overlays";
import { useListBox, useListBoxSection, useOption } from "react-aria";
import { mdiCheckBold } from "@mdi/js";

import { MdiIcon } from "../icons";

export interface AComboBoxProps<T> extends Omit<ComboBoxProps<T>, 'children'> {
  options: Array<ComboBoxOption | ComboBoxSection>;
};

export interface ComboBoxOption {
  label: string;
  value: string;
}

export interface ComboBoxSection {
  sectionLabel: string;
  value: Array<ComboBoxOption>;
};

interface OptionProps {
  item: Node<unknown>;
  state: ListState<unknown>;
};

interface ListBoxProps extends AriaListBoxOptions<unknown> {
  listBoxRef?: React.RefObject<HTMLUListElement>;
  state: ListState<unknown>;
};

interface SectionProps {
  section: Node<unknown>;
  state: ListState<unknown>;
};

interface PopoverProps extends Omit<AriaPopoverProps, "popoverRef"> {
  children: React.ReactNode;
  state: OverlayTriggerState;
  className?: string;
  popoverRef?: React.RefObject<HTMLDivElement>;
};

function Option({ item, state }: OptionProps) {
  let ref = useRef<HTMLLIElement>(null);
  let { optionProps, isDisabled, isSelected, isFocused } = useOption(
    {
      key: item.key
    },
    state,
    ref
  );

  let text = "text-gray-700";
  if (isFocused || isSelected) {
    text = "text-gray-600";
  } else if (isDisabled) {
    text = "text-gray-200";
  }

  return (
    <li
      {...optionProps}
      ref={ref}
      className={`m-1 rounded-md py-2 px-2 text-sm outline-none cursor-default flex items-center justify-between ${text} ${
        isFocused ? "bg-gray-100" : ""
      } ${isSelected ? "font-bold" : ""}`}
    >
      {item.rendered}
      {isSelected && (
        <MdiIcon aria-hidden="true" className="w-5 h-5 text-gray-600" path={mdiCheckBold} />
      )}
    </li>
  );
};

export function ListBox(props: ListBoxProps) {
  let ref = useRef<HTMLUListElement>(null);
  let { listBoxRef = ref, state } = props;
  let { listBoxProps } = useListBox(props, state, listBoxRef);

  return (
    <ul
      {...listBoxProps}
      ref={listBoxRef}
      className="w-full max-h-72 overflow-auto outline-none"
    >
      {[...state.collection].map((item) =>
        item.type === "section" ? (
          <ListBoxSection key={item.key} section={item} state={state} />
        ) : (
          <Option key={item.key} item={item} state={state} />
        )
      )}
    </ul>
  );
};

function ListBoxSection({ section, state }: SectionProps) {
  let { itemProps, headingProps, groupProps } = useListBoxSection({
    heading: section.rendered,
    "aria-label": section["aria-label"]
  });

  return (
    <>
      <li {...itemProps} className="pt-2">
        {section.rendered && (
          <span
            {...headingProps}
            className="text-xs font-bold uppercase text-gray-500 mx-3"
          >
            {section.rendered}
          </span>
        )}
        <ul {...groupProps}>
          {[...section.childNodes].map((node) => (
            <Option key={node.key} item={node} state={state} />
          ))}
        </ul>
      </li>
    </>
  );
};

export function Popover(props: PopoverProps) {
  let ref = useRef<HTMLDivElement>(null);
  let { popoverRef = ref, state, children, className } = props;

  let { popoverProps, underlayProps } = usePopover(
    {
      ...props,
      popoverRef
    },
    state
  );

  return (
    <Overlay>
      <div
        {...popoverProps}
        ref={popoverRef}
        className={`z-10 shadow-lg border border-gray-300 bg-white rounded-md mt-2 ${className}`}
      >
        {children}
        <DismissButton onDismiss={state.close} />
      </div>
    </Overlay>
  );
};

function ComboBox<T extends object>(props: ComboBoxProps<T>) {
  let { contains } = useFilter({ sensitivity: "base" });
  let state = useComboBoxState({ ...props, defaultFilter: contains });

  let buttonRef = React.useRef(null);
  let inputRef = React.useRef(null);
  let listBoxRef = React.useRef(null);
  let popoverRef = React.useRef(null);

  let {
    buttonProps: triggerProps,
    inputProps,
    listBoxProps,
    labelProps
  } = useComboBox(
    {
      ...props,
      inputRef,
      buttonRef,
      listBoxRef,
      popoverRef
    },
    state
  );

  let { buttonProps } = useButton(triggerProps, buttonRef);

  return (
    <div className="inline-flex flex-col relative w-52">
      <label
        {...labelProps}
        className="block text-sm font-medium text-gray-700 text-left"
      >
        {props.label}
      </label>
      <div
        className={`relative inline-flex flex-row rounded-md overflow-hidden shadow-sm border-2 ${
          state.isFocused ? "border-pink-500" : "border-gray-300"
        }`}
      >
        <input
          {...inputProps}
          ref={inputRef}
          className="outline-none px-3 py-1 w-full"
        />
        <button
          {...buttonProps}
          ref={buttonRef}
          className={`px-1 bg-gray-100 cursor-default border-l-2 ${
            state.isFocused
              ? "border-pink-500 text-pink-600"
              : "border-gray-300 text-gray-500"
          }`}
        >
          :D
        </button>
      </div>
      {state.isOpen && (
        <Popover
          popoverRef={popoverRef}
          triggerRef={inputRef}
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

export function AComboBox<T extends object>({ options, ...otherProps }: AComboBoxProps<T>) {

  const children = useMemo(() => options?.map((o, i) => "sectionLabel" in o ? (
      <Section key={`section_${i}`} title={o.sectionLabel}>
        {
          o.value.map((item, d) => (<Item key={`item_${i}_${d}`}>{item.label}</Item>))
        }
      </Section>
    ) : (<Item key={`item_${i}`}>{o.label}</Item>)) || []
  , [options]);

  return (
    <ComboBox {...otherProps}>
      {children}
    </ComboBox>
  );
}
