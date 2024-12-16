import { createSelector } from '@ngrx/store';
import { IEmployee } from '../../../shared/interfaces/interfaces';
export interface AppState {
  employees: IEmployee[];
}
export const selectEmployees = (state: any) => state.employees;

export const employeesSelector = createSelector(
  selectEmployees,
  (state: AppState) => state.employees
);

export const errorSelector = createSelector(
  selectEmployees,
  (state) => state.error
);
