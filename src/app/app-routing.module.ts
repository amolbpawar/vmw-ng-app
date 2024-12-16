import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmployeeDashboardComponent } from './modules/employee/components/employee-dashboard/employee-dashboard.component';
import { EmployeeBookmarkComponent } from './modules/employee/components/employee-bookmark/employee-bookmark.component';

const routes: Routes = [
  {
    path: 'employee-dashboard',
    component: EmployeeDashboardComponent,
  },
  {
    path: 'employee-bookmarks/:id',
    component: EmployeeBookmarkComponent,
  },
  { path: '', redirectTo: '/employee-dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
