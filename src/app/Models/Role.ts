import { BaseEntity } from './BaseEntity';
import { TypeRole } from './TypeRole';

export class Role extends BaseEntity {
  id: number = 0;
  libelle: string = '';
  parentRole?: Role = new Role();
  typeRole: TypeRole = new TypeRole();
}
