'use client';

import type { Observable } from "rxjs";

export interface IBloc {
  value$: Observable<any>;
  dispose(): void;
};
