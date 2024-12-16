import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IEmployee } from '../../../shared/interfaces/interfaces';
import { map, Observable } from 'rxjs';
import { selectEmployees } from '../../store/selectors/employee.selectors';
import { setLineManager } from '../../store/actions/employee.actions';
import { ModalNames } from '../../../shared/interfaces/interfaces';

@Component({
  selector: 'app-employee-line-manager',
  templateUrl: './employee-line-manager.component.html',
  styleUrl: './employee-line-manager.component.css',
})
export class EmployeeLineManagerComponent {
  employees$: Observable<IEmployee[]> | undefined;
  @Input() employeeDetails!: IEmployee | undefined;
  @Output() closeParentModal = new EventEmitter<string>();

  constructor(private store: Store<{ employees: IEmployee[] }>) {}

  ngOnChanges(changes: SimpleChanges) {
    this.employees$ = this.store.select(selectEmployees).pipe(
      map((emps) =>
        emps.filter((emp: IEmployee) => {
          return (
            emp.id != this.employeeDetails?.id &&
            emp.parentId != this.employeeDetails?.id
          );
        })
      )
    );
  }

  modalOpen = true;

  lineManagerForm = new FormGroup({
    lineManager: new FormControl('', Validators.required),
  });

  resetForm() {
    this.lineManagerForm.reset();
  }

  submit() {
    if (
      this.lineManagerForm.valid &&
      this.lineManagerForm.value.lineManager &&
      this.employeeDetails
    )
      this.store.dispatch(
        setLineManager({
          empId: this.employeeDetails?.id,
          managerId: this.lineManagerForm.value.lineManager,
        })
      );

    this.closeParentModal.emit(ModalNames.CHANGE_MANAGER);
  }
}
