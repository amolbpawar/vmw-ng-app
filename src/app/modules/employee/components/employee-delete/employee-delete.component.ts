import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { deleteEmployee } from '../../store/actions/employee.actions';
import { IEmployee } from '../../../shared/interfaces/interfaces';
import { Store } from '@ngrx/store';
import { ModalNames } from '../../../shared/interfaces/interfaces';
@Component({
  selector: 'app-employee-delete',
  templateUrl: './employee-delete.component.html',
  styleUrl: './employee-delete.component.css',
})
export class EmployeeDeleteComponent {
  @Input() employeeDetails!: IEmployee | undefined;
  @Output() closeParentModal = new EventEmitter<string>();

  confirmModalOpen = false;

  constructor(private store: Store<{ employees: IEmployee[] }>) {}

  ngOnChanges(changes: SimpleChanges) {}

  resetForm() {
    this.confirmModalOpen = false;
  }

  submit() {
    this.confirmModalOpen = true;
  }

  confirmSubmit() {
    if (this.employeeDetails?.id && this.employeeDetails?.parentId) {
      this.store.dispatch(
        deleteEmployee({
          empId: this.employeeDetails?.id,
          managerId: this.employeeDetails?.parentId,
        })
      );
    }
    this.confirmModalOpen = false;
    this.closeParentModal.emit(ModalNames.DELETE);
  }
}
