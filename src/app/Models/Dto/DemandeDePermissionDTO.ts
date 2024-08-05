// demande-de-permission.dto.ts

export class DemandeDePermissionDTO {
    
    userEmail: string = '';
    typeDePermission: string = '';
    description: string = '';
    dateDebut: Date = new Date();
    dateFin: Date = new Date();
    
  }
  