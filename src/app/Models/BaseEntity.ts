export class BaseEntity {

    modifierPar: string = '';
    date_creation: Date = new Date();
    date_modification: Date = new Date();
    canDelete: boolean = false;
    selected: boolean = false;
    trackStatut: string = '';
  
    constructor() {
      const assignationCode = localStorage.getItem('assignationCode');
      if (assignationCode)
        this.modifierPar = assignationCode;
    }
  }