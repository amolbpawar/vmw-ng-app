import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { IEmployee } from '../../../shared/interfaces/interfaces';
import { select, Store } from '@ngrx/store';
import {
  addEmployee,
  updateEmployee,
} from '../../store/actions/employee.actions';
import { Observable } from 'rxjs';
import { selectEmployees } from '../../store/selectors/employee.selectors';
import { ModalNames } from '../../../shared/interfaces/interfaces';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.css',
})
export class EmployeeDetailsComponent {
  @Input() managerDetails!: IEmployee | undefined;
  @Input() isEdit: boolean | undefined = false;
  @Output() closeParentModal = new EventEmitter<string>();

  addEditButtonLabel: string = 'Add Reportee';
  designations?: string[];
  readonly employees$: Observable<IEmployee[]> | undefined;

  constructor(
    private empService: EmployeeService,
    private store: Store<{ employees: IEmployee[] }>
  ) {
    this.employees$ = this.store.pipe(select(selectEmployees));
  }

  ngOnInit() {
    this.designations = this.empService.getDesignations();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.isEdit && this.managerDetails) {
      this.addEditButtonLabel = 'Edit Reportee';
      this.employeeForm.setValue({
        firstName: this.managerDetails ? this.managerDetails?.firstName : '',
        lastName: this.managerDetails ? this.managerDetails?.lastName : '',
        designation: this.managerDetails
          ? this.managerDetails?.designation
          : '',
        address: this.managerDetails ? this.managerDetails?.address : '',
        email: this.managerDetails ? this.managerDetails?.email : '',
        phone: this.managerDetails ? this.managerDetails?.phone : '',
      });
    }
  }

  employeeForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    designation: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.minLength(10)]),
  });

  resetForm() {
    this.employeeForm.reset();
  }

  submit() {
    if (this.employeeForm.valid && !this.isEdit) {
      const empId = Math.floor(10000 + Math.random() * 90000);
      const managerName = this.managerDetails?.firstName
        ? `${this.managerDetails?.firstName} ${this.managerDetails?.lastName}`
        : '';

      this.store.dispatch(
        addEmployee({
          employee: {
            ...this.employeeForm.value,
            id: empId,
            parentId: this.managerDetails?.id || '',
            managerName,
          },
        })
      );
      this.closeParentModal.emit(ModalNames.ADD);
    }

    if (this.employeeForm.valid && this.isEdit) {
      this.store.dispatch(
        updateEmployee({
          employee: {
            ...this.managerDetails,
            ...this.employeeForm.value,
          },
        })
      );

      this.closeParentModal.emit(ModalNames.EDIT);
    }
  }
}
