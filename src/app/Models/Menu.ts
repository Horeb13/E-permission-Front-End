import { BaseEntity } from './BaseEntity';

export class Menu extends BaseEntity {
  Id_MENU: number = 0;
  LIEN: string = '';
  LIBELLE: string = '';
  ICONE: string = '';
  Id_MENU_1?: Menu = new Menu();
}
