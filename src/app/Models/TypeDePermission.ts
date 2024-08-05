import { BaseEntity } from './BaseEntity';

export class TypeDePermission extends BaseEntity {
  modifiePar: string | null = null;
  id: number = 0;
  nom: string = '';
  description: string = '';
  duree: number = 0;
}

