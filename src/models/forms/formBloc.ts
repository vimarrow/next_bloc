'use client';

import { BehaviorSubject, Observable } from "rxjs";
import type { IBloc } from "../bloc";
import type { IInputBloc, InputValidatorFunctionType, InputValuePrimitiveType } from "./inputBloc";

import { InputBloc } from "./inputBloc";

export interface IInputRegistrationOptions {
  id: string,
  name?: string,
  validator: InputValidatorFunctionType
  isRequired?: boolean;
  isDisabled?: boolean;
  defaultValue: InputValuePrimitiveType;
};

export interface IFormValueType {
  isValid: boolean;
  errorMessage?: string | null;
  isLoading: boolean;
};

interface IFormBloc extends IBloc {
  id: string;
  dataSourceUrl?: string;
  registerNewField: (opts: IInputRegistrationOptions) => void;
  disposeField: (id: string) => void;
  validate: () => boolean;
};

export class FormBloc implements IFormBloc {
  public id;
  public dataSourceUrl?: string;
  private _value$;
  private _fields: Record<string, IInputBloc>;


  constructor(id: string) {
    this.id = id;
    this._fields = {};
    this._value$ = new BehaviorSubject<IFormValueType>({
      isValid: true,
      isLoading: true,
    });
  }

  initializeFormElement(dataSourceUrl?: string) {
    this.dataSourceUrl = dataSourceUrl;
    if (!dataSourceUrl) {
      this._value$.next({
        ...this._value$.getValue(),
        isLoading: false
      });
    } else {
      // load data;
    }
  }

  registerNewField({ id, name, validator, isRequired, defaultValue, isDisabled }: IInputRegistrationOptions) {

    const { isLoading } = this._value$.getValue();

    const newBloc = new InputBloc(
      id, name ?? id, isRequired ?? false, isDisabled ?? false, defaultValue, validator, isLoading
    );

    this._fields[id] = newBloc;

    return newBloc;
  }

  public getInputBloc<T extends IInputBloc>(id: string): T {
    return this._fields[id] as T;
  }

  disposeField(id: string) {
    if (this._fields[id]) {
      this._fields[id].dispose();
      delete this._fields[id];
    }
  }

  validate() {
    const invalidInputIndex = Object.values(this._fields).findIndex(s => !s.runValidation());
    if (invalidInputIndex < 0) {
      return true;
    }
    const id = Object.keys(this._fields)[invalidInputIndex];
    document.querySelector<HTMLInputElement>(`input#${id}`)?.focus();
    this._value$.next({
      ...this._value$.getValue(),
      errorMessage: "Some fields are not correct.",
      isLoading: false
    });
    return false;
  }

  public get value$() {
    return this._value$.asObservable();
  }

  dispose(): void {
    Object.values(this._fields).forEach(s => s.dispose());
  }
};
