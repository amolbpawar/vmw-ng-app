import { Component, SimpleChanges, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IEmployee } from '../../../shared/interfaces/interfaces';
import { ModalNames } from '../../../shared/interfaces/interfaces';
import { selectEmployees } from '../../store/selectors/employee.selectors';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css',
})
export class EmployeeListComponent {
  readonly employees$: Observable<IEmployee[]> | undefined;
  isAddReportee = false;
  isEditEmployee = false;
  isDeleteEmployee = false;
  isChangeManager = false;

  selected: any[] = [];
  currentSelectedManager: IEmployee | undefined;
  employeeList: any;
  ngOnInit() {}
  constructor(private store: Store<{ employees: IEmployee[] }>) {
    this.employees$ = this.store.pipe(select(selectEmployees));
    this.store.select(selectEmployees).subscribe((data) => {
      this.employeeList = [...data];
    });
  }
  ngOnChanges(changes: SimpleChanges) {}

  addFirstEmp() {
    this.isAddReportee = true;
  }

  toggleModal(modalName: string, managerDetails: IEmployee) {
    this.currentSelectedManager = managerDetails;
    switch (modalName) {
      case ModalNames.ADD:
        return (this.isAddReportee = !this.isAddReportee);
      case ModalNames.EDIT:
        return (this.isEditEmployee = !this.isEditEmployee);
      case ModalNames.DELETE:
        return (this.isDeleteEmployee = !this.isDeleteEmployee);
      case ModalNames.CHANGE_MANAGER:
        return (this.isChangeManager = !this.isChangeManager);

      default:
        return false;
    }
  }

  closeModalFromChild(newMessage: string) {
    switch (newMessage) {
      case ModalNames.ADD:
        this.isAddReportee = false;
        break;
      case ModalNames.EDIT:
        this.isEditEmployee = false;
        break;
      case ModalNames.DELETE:
        this.isDeleteEmployee = false;
        break;
      case ModalNames.CHANGE_MANAGER:
        this.isChangeManager = false;
        break;

      default:
        break;
    }
  }
}
