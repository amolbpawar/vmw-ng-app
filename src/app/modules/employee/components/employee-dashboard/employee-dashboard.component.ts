import { Component, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { IEmployee } from '../../../shared/interfaces/interfaces';
import { selectEmployees } from '../../store/selectors/employee.selectors';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrl: './employee-dashboard.component.css',
})
export class EmployeeDashboardComponent {
  employeeList: IEmployee[] = [];
  constructor(private store: Store<{ employees: IEmployee[] }>) {
    this.store.select(selectEmployees).subscribe((data) => {
      this.employeeList = data;
    });
    
  }

  ngOnChanges(changes: SimpleChanges) {}
}
