import { BaseEntity } from './BaseEntity';
import { Departement } from './Departement';

export class Utilisateur extends BaseEntity {
  Id_utilisateur: number = 0;
  Nom: string = '';
  Prenom: string = '';
  Email: string = '';
  Mot_de_passe: string = '';
  Id_Departement: Departement = new Departement();
}
