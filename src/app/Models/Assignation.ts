import { BaseEntity } from './BaseEntity';
import { Utilisateur } from './Utilisateur';
import { Role } from './Role';

export class Assignation extends BaseEntity {
  Id_utilisateur: Utilisateur = new Utilisateur();
  Id_ROLE: Role = new Role();
  DATE_DEBUT: Date = new Date();
  DATE_FIN: Date = new Date();
}
