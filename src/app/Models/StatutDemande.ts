import { BaseEntity } from './BaseEntity';

export class StatutDemande extends BaseEntity {
  id: number = 0;
  code: string = '';
  libelle: string = '';
}
