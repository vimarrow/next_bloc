'use client';

import type { IBloc } from "../models/bloc";
import type { IInputValue, IInputBloc } from "../models/forms/inputBloc";
import type { IInputRegistrationOptions } from "../models/forms/formBloc";


import { useEffect, useState } from "react";
import { FormBloc } from "../models/forms/formBloc";

declare global {
    interface Window { Symbol: any; }
}

const rspk = Symbol('rootState');

const getBlocInstance = (channel: string) => (<any>window)?.[rspk]?.[channel];

const createSubscription = (channel: string, blocInstance: any) => {
  (<any>window)[rspk] = {
    ...(<any>window)[rspk],
    [channel]: blocInstance
  };

  return blocInstance;
};

const removeSubscription = (channel: string) => {
  const instance = getBlocInstance(channel);
  if (instance) {
    instance.dispose();
    delete (<any>window)[rspk][channel];
  }
};

export const useSubscription = <T, U extends IBloc>(channel: string, instance: U): [state: T | undefined, subscription: U] => {
  const [state, setState] = useState<T>();

  let subscription: U = getBlocInstance(channel);

  if (!subscription) {
    console.warn(`No subscription available on channel: '${channel}'`);
    subscription = createSubscription(channel, instance);
  }

  useEffect(() => {

    const subscriber = subscription.value$.subscribe((val: T) => setState(val));

    return () => {
      subscriber.unsubscribe()
    };
  }, []);

  return [state, subscription];
};

export const useFormSubscription = 
  <T extends IInputValue, U extends IInputBloc>(
    formId: string,
    props: IInputRegistrationOptions
  ): [state: T | undefined, subscription: U] => {

  const [state, setState] = useState<T>();

  let formSubscription: FormBloc = getBlocInstance(`form_${formId}`);

  if (!formSubscription) {
    console.warn(`No subscription available for form_${formId}. Creating one.`);
    formSubscription = createSubscription(`form_${formId}`, new FormBloc(formId));
  }

  let inputSubscription: U = formSubscription.getInputBloc(props.id);

  if (!inputSubscription) {
    console.warn(`No subscription available for form_${formId}_${props.id}. Creating one.`);
    inputSubscription = formSubscription.registerNewField(props) as unknown as U;
  }

  useEffect(() => {

    const subscriber = inputSubscription.value$.subscribe((val: T) => setState(val));

    return () => {
      subscriber.unsubscribe();
    };
  }, []);

  return [state, inputSubscription];
};
