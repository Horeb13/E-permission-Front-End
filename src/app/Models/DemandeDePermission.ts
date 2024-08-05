import { BaseEntity } from './BaseEntity';
import { StatutDemande } from './StatutDemande';
import { TypeDePermission } from './TypeDePermission';
import { Utilisateur } from './Utilisateur';

export class DemandeDePermission extends BaseEntity {
  id: number = 0;
  dateFin: Date = new Date();
  commentaire: string = '';
  dateDebut: Date = new Date();
  statutDemande: StatutDemande = new StatutDemande();
  typeDePermission: TypeDePermission = new TypeDePermission();
  utilisateur: Utilisateur = new Utilisateur();
  description: string = '';
}
