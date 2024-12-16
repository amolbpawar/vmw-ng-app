import { Component, Input, input, SimpleChanges } from '@angular/core';
import { IEmployee } from '../../../shared/interfaces/interfaces';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-employee-org-chart',
  templateUrl: './employee-org-chart.component.html',
  styleUrl: './employee-org-chart.component.css',
})
export class EmployeeOrgChartComponent {
  @Input() employeeList: IEmployee[] = [];
  constructor(private store: Store<{ employees: IEmployee[] }>) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {}
}
