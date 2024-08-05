import { BaseEntity } from './BaseEntity';
import { Departement } from './Departement';

export class Utilisateur extends BaseEntity {
  id: number = 0;
  nom: string = '';
  prenom: string = '';
  email: string = '';
  motDePasse: string = '';
  departement: Departement = new Departement();
}
