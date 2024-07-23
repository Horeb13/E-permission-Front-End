import { BaseEntity } from './BaseEntity';
import { TypeRole } from './TypeRole';

export class Role extends BaseEntity {
  Id_ROLE: number = 0;
  LIBELLE: string = '';
  Id_ROLE_1?: Role = new Role();
  Id_TYPE_ROLE: TypeRole = new TypeRole();
}
