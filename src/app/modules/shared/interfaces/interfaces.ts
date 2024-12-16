export interface IEmployee {
  id: string;
  parentId?: string;
  firstName: string;
  lastName: string;
  designation: string;
  address: string;
  phone: string;
  email: string;
  managerName: string;
}


export const ModalNames ={
  ADD:'add',
  EDIT:'edit',
  DELETE:'delete',
  CHANGE_MANAGER:'change-manager',

}