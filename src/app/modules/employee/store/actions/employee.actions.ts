import { createAction, props } from '@ngrx/store';
import { IEmployee } from '../../../shared/interfaces/interfaces';

export const addEmployee = createAction(
  '[Employee Component] Add',
  props<{ employee: any }>()
);
export const deleteEmployee = createAction(
  '[Employee Component] Delete',
  props<{ empId: string; managerId: string }>()
);
export const updateEmployee = createAction(
  '[Employee Component] Update',
  props<{ employee: any }>()
);
export const listEmployee = createAction('[Employee  Component] List',);
export const setLineManager = createAction(
  '[Employee Component] Change Manager',
  props<{ empId: string; managerId: string }>()
);

export const reset = createAction('[Employee Component] Reset');
