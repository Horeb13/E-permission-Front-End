export class BaseEntity {

    modifierPar: string = '';
    dateCreation: Date = new Date();
    dateModification: Date = new Date();
    canDelete: boolean = false;
    selected: boolean = false;
    trackStatut: string = '';
  
    constructor() {
      const assignationCode = localStorage.getItem('assignationCode');
      if (assignationCode)
        this.modifierPar = assignationCode;
    }
  }