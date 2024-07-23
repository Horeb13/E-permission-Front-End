import { BaseEntity } from './BaseEntity';
import { Direction } from './Direction';

export class Departement extends BaseEntity {
  Id_Departement: number = 0;
  Nom_du_departement: string = '';
  Id_Direction: Direction = new Direction();
}
