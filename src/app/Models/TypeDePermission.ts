import { BaseEntity } from './BaseEntity';

export class TypeDePermission extends BaseEntity {
  Id_Type_de_Permission: number = 0;
  Nom_de_la_permission: string = '';
  Description: string = '';
  duree: number = 0;
}
