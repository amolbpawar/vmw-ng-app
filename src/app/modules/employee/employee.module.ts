import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeDeleteComponent } from './components/employee-delete/employee-delete.component';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import { EmployeeLineManagerComponent } from './components/employee-line-manager/employee-line-manager.component';
import { EmployeeOrgChartComponent } from './components/employee-org-chart/employee-org-chart.component';
import {
  ClrDatagridModule,
  ClarityModule,
  ClrFormsModule,
  ClrModalModule,
} from '@clr/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeDashboardComponent } from './components/employee-dashboard/employee-dashboard.component';

import { StoreModule } from '@ngrx/store';
import {
  employeeReducer,
  getInitialAppState,
} from '../employee/store/reducer/employee.reducer';
import { EmployeeService } from './services/employee.service';
import { SharedModule } from '../shared/shared.module';
import { EmployeeBookmarkComponent } from './components/employee-bookmark/employee-bookmark.component';

@NgModule({
  declarations: [
    EmployeeListComponent,
    EmployeeDeleteComponent,
    EmployeeDetailsComponent,
    EmployeeLineManagerComponent,
    EmployeeOrgChartComponent,
    EmployeeDashboardComponent,
    EmployeeBookmarkComponent,
  ],
  imports: [
    CommonModule,
    ClrModalModule,
    ClrDatagridModule,
    ClarityModule,
    FormsModule,
    ReactiveFormsModule,
    ClrFormsModule,
    StoreModule.forRoot(
      { employees: employeeReducer },
      { initialState: getInitialAppState }
    ),
    SharedModule,
  ],
  exports: [
    EmployeeListComponent,
    EmployeeDeleteComponent,
    EmployeeDetailsComponent,
    EmployeeLineManagerComponent,
    EmployeeOrgChartComponent,
    EmployeeDashboardComponent,
    EmployeeBookmarkComponent,
    FormsModule,
    ReactiveFormsModule,
    ClrModalModule,
    ClrDatagridModule,
    ClarityModule,
    ClrFormsModule,
  ],
  providers: [EmployeeService],
})
export class EmployeeModule {}
