import { BaseEntity } from './BaseEntity';
import { StatutDemande } from './StatutDemande';
import { TypeDePermission } from './TypeDePermission';
import { Utilisateur } from './Utilisateur';

export class DemandeDePermission extends BaseEntity {
  Id_demande: number = 0;
  date_de_fin: Date = new Date();
  Commentaire: string = '';
  date_de_debut: Date = new Date();
  Id_STATUT: StatutDemande = new StatutDemande();
  Id_Type_de_Permission: TypeDePermission = new TypeDePermission();
  Id_utilisateur: Utilisateur = new Utilisateur();
}
