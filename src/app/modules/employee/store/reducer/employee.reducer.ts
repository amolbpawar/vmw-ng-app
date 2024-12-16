import { createReducer, on } from '@ngrx/store';
import {
  addEmployee,
  deleteEmployee,
  listEmployee,
  setLineManager,
  updateEmployee,
  reset,
} from '../actions/employee.actions';
import { IEmployee } from '../../../shared/interfaces/interfaces';
import { EmployeeService } from '../../services/employee.service';

export function getInitialAppState() {
  const employees = localStorage.getItem('employees');
  if (employees != null) {
    return JSON.parse(employees);
  }
  return [];
}

const empService = new EmployeeService();
export const initialState = getInitialAppState();
export const employeeReducer = createReducer(
  initialState,
  on(addEmployee, (state, { employee }) => {
    const employees = [...state, employee];
    empService.updateEmployeesRecords(employees);
    return employees;
  }),
  on(updateEmployee, (state, { employee }) => {
    const empId = employee?.id;
    const employees = state.map((emp: IEmployee) =>
      emp.id === empId ? { ...emp, ...employee } : emp
    );

    empService.updateEmployeesRecords(employees);
    return employees;
  }),
  on(deleteEmployee, (state, { empId, managerId }) => {
    const employees = state.filter((emp: IEmployee) => emp.id !== empId);
    const managerData = state.filter((emp: IEmployee) => emp.id === managerId);
    const updatedManager = employees.map((emp: IEmployee) =>
      emp.parentId === empId
        ? {
            ...emp,
            parentId: managerId,
            managerName:
              managerData[0]?.firstName + ' ' + managerData[0]?.lastName,
          }
        : emp
    );

    empService.updateEmployeesRecords(updatedManager);
    return updatedManager;
  }),
  on(setLineManager, (state, { empId, managerId }) => {
    const managerData = state.filter((emp: IEmployee) => emp.id == managerId);
    const updatedManager = state.map((emp: IEmployee) =>
      emp.id === empId
        ? {
            ...emp,
            parentId: managerId,
            managerName:
              managerData[0]?.firstName + ' ' + managerData[0]?.lastName,
          }
        : emp
    );

    empService.updateEmployeesRecords(updatedManager);
    return updatedManager;
  }),
  on(listEmployee, (state) => [...state]),
  on(reset, (state) => [])
);
