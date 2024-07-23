import { BaseEntity } from './BaseEntity';
import { DemandeDePermission } from './DemandeDePermission';

export class PieceJointe extends BaseEntity {
  Id_Pièce_jointe: number = 0;
  Nom_du_fichier: string = '';
  Type_de_fichier: string = '';
  Url_du_fichier: string = '';
  Id_demande: DemandeDePermission = new DemandeDePermission();
}
