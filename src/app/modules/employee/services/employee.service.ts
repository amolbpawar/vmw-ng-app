import { Injectable, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { IEmployee } from '../../shared/interfaces/interfaces';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  allReportees: any[] = [];

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {}

  designations: string[] = [
    'Cheif Executive Officer(CEO)',
    'Head of Engineering',
    'Head of Sales',
    'Head of Marketing',
    'Product UX Designer',
    'Sales Executive',
    'DevOps Engineer',
  ];

  getDesignations() {
    return this.designations;
  }

  updateEmployeesRecords(employees: IEmployee[]) {
    localStorage.setItem('employees', JSON.stringify(employees));
  }


}
