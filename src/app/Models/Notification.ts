import { BaseEntity } from './BaseEntity';
import { StatutNotification } from './StatutNotification';
import { Utilisateur } from './Utilisateur';

export class Notification extends BaseEntity {
  Id_Notification: number = 0;
  contenu: string = '';
  date_d_envoi: Date = new Date();
  statut: string = '';
  Id_STATUT_NOTIFICATION: StatutNotification = new StatutNotification();
  Id_utilisateur: Utilisateur = new Utilisateur();
}
