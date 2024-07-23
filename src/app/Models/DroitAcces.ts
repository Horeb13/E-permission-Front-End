import { BaseEntity } from './BaseEntity';
import { TypeRole } from './TypeRole';
import { Menu } from './Menu';
import { ActionPrivilege } from './ActionPrivilege';

export class DroitAcces extends BaseEntity {
  Id_TYPE_ROLE: TypeRole = new TypeRole();
  Id_MENU: Menu = new Menu();
  Id_ACTION_PRIVILEGE: ActionPrivilege = new ActionPrivilege();
}
