'use client';

import type { IBloc } from "../bloc";

import { BehaviorSubject, Observable } from "rxjs";

export type InputValuePrimitiveType = string | number | boolean | Date;
export type InputValidatorFunctionType = ((newVal: InputValuePrimitiveType) => string | null | undefined) | undefined;

export interface IInputValue {
  isLoading: boolean;
  isValid: boolean;
  isRequired: boolean;
  isDisabled: boolean;
  value: InputValuePrimitiveType;
  errorMessage?: string | null;
};

export interface IInputBloc extends IBloc {
  id: string;
  name: string;
  validator: InputValidatorFunctionType;
  onValueChange: (newVal: InputValuePrimitiveType) => void;
  runValidation: (newVal?: InputValuePrimitiveType | undefined) => boolean;
};

export class InputBloc implements IInputBloc {
  public id;
  public name;
  public validator;
  private _value$;
  private _dTimer?: NodeJS.Timeout;

  constructor(
    id: string,
    name: string,
    isRequired: boolean,
    isDisabled: boolean,
    value: InputValuePrimitiveType,
    validator: InputValidatorFunctionType, 
    hasFormDataReady: boolean
  ) {
    this.id = id;
    this.name = name;
    this.validator = validator;
    this._value$ = new BehaviorSubject<IInputValue>({
      isLoading: hasFormDataReady,
      isRequired,
      isDisabled,
      isValid: true,
      value: value,
      errorMessage: null,
    });
  }

  private _debounced(fn: (...args: any[]) => any, tt = 1000) {
    return (...args: any[]) => {
      clearTimeout(this._dTimer);
      this._dTimer = setTimeout(() => {
        fn.apply(this, args);
        this._dTimer = undefined;
      }, tt);
    };
  }

  public get value$(): Observable<IInputValue> {
    return this._value$.asObservable();
  }

  onValueChange(newValue: InputValuePrimitiveType) {
    if (this.validator) {
      this._debounced(this.runValidation)(newValue);
    }
    this._value$.next({
      ...this._value$.getValue(),
      value: newValue
    });
  }

  runValidation(newVal?: InputValuePrimitiveType | undefined) {
    const currentState = this._value$.getValue();

    const result = this.validator!(newVal ?? currentState.value);

    if (result !== currentState.errorMessage) {
      this._value$.next({
        ...currentState,
        isValid: !result,
        errorMessage: result,
      })
    }

    return !result;
  }

  dispose(): void {
    this._value$.complete();
  }
}


