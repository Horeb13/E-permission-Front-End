import { BaseEntity } from './BaseEntity';
import { Direction } from './Direction';

export class Departement extends BaseEntity {
  id: number = 0;
  nom: string = '';
  direction: Direction = new Direction();
}
