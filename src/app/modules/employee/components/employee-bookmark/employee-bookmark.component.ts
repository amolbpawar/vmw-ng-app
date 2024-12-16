import { Component, Input, SimpleChanges } from '@angular/core';
import { IEmployee } from '../../../shared/interfaces/interfaces';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { selectEmployees } from '../../store/selectors/employee.selectors';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-employee-bookmark',
  templateUrl: './employee-bookmark.component.html',
  styleUrl: './employee-bookmark.component.css',
})
export class EmployeeBookmarkComponent {
  allReportees: any[] = [];
  employeeList: any[] = [];
  managerId: any;

  constructor(
    private store: Store<{ employees: IEmployee[] }>,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.managerId = params.get('id');

      this.store.select(selectEmployees).subscribe((data) => {
        this.employeeList = data;
        this.allReportees.push(
          ...data
            .filter((emp: IEmployee) => emp.id == this.managerId)
            .map((employee: IEmployee) => ({
              ...employee,
              parentId: '',
            }))
        );

        this.getAllReportees(this.managerId);
      });
    });
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {}

  getAllReportees(parentId: string) {
    this.employeeList.forEach((employee) => {
      if (employee.parentId == parentId) {
        this.allReportees.push(employee);
        this.getAllReportees(employee.id);
      }
    });
  }

  getAllChilds(parentId: string) {
    let parentData = this.employeeList.filter(
      (emp: IEmployee) => emp.id == parentId
    );
    parentData[0].parentId = '';
    console.log();
    this.allReportees = [...parentData];

    this.getAllReportees(parentId);
  }

  bookmark(parentId: string) {
    const parentData = this.employeeList.filter(
      (emp: IEmployee) => emp.id == parentId
    );

    this.allReportees = [...parentData];
    this.getAllReportees(parentId);

    const url = this.router.serializeUrl(
      this.router.createUrlTree(['/employee-bookmarks', parentId])
    );
    window.open(`${window.location.origin}${url}`, '_blank');
  }

  redirectToDashboard() {
    this.router.navigate(['/']);
  }
}
