import { Component, OnInit, ViewChild } from '@angular/core';
import { DemandeDePermissionService } from '../Services/demande-de-permission.service';
import { DemandeDePermission } from '../Models/DemandeDePermission';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TypeDePermissionService } from '../Services/type-de-permission-service.service';
import { TypeDePermission } from '../Models/TypeDePermission';
import { AuthService } from '../Services/Auth/auth.service';
import { DemandeDePermissionDTO } from '../Models/Dto/DemandeDePermissionDTO';
import { Table } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';
import { TagModule } from 'primeng/tag';
import { InputTextareaModule } from 'primeng/inputtextarea';
import jsPDF from 'jspdf';
import 'jspdf-autotable'
import autoTable from 'jspdf-autotable';


@Component({
  selector: 'app-permission',
  standalone: true,
  imports: [
    TableModule, 
    TagModule,
    DropdownModule, 
    ConfirmDialogModule, 
    InputTextModule, 
    ToastModule,
    CommonModule, 
    FormsModule, 
    ToastModule, 
    ToolbarModule, 
    FileUploadModule, 
    ButtonModule, 
    DialogModule, 
    DropdownModule, 
    ConfirmDialogModule, 
    InputTextModule,
    CalendarModule,
    InputTextareaModule,
    
  ],
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class PermissionComponent implements OnInit {
  @ViewChild('dt') dt!: Table;

  demandes: DemandeDePermission[] = [];
  demande: DemandeDePermission = new DemandeDePermission();
  newDemande: DemandeDePermissionDTO = new DemandeDePermissionDTO();
  editMode: boolean = false;
  typeDePermissions: TypeDePermission[] = [];
  currentUserEmail: string = '';
  selectedDemandes: DemandeDePermission[] = [];
  demandeDialog: boolean = false;
  submitted: boolean = false;
  deleteDemandDialog: boolean = false;
  deleteSeletedDemandDialog: boolean = false;
 

  constructor(
    private demandeService: DemandeDePermissionService,
    private typeDePermissionService: TypeDePermissionService,
    private authService: AuthService,
    private messageService: MessageService
  
  ) {}

  ngOnInit(): void {
    this.getDemandes();
    this.getTypeDePermissions();
    this.getUserEmail();
  }

  getDemandes(): void {
    this.demandeService.getDemandeByEmail(this.authService.getCurrentuser().email).subscribe({
      next : (demandes) => {
      this.demandes = demandes;
    },
    error : (error) => {
      this.messageService.add({ severity: 'error', summary: 'Erreur lors du chargements des demandes', life: 3000 });
    }
  
  });
  }

  getUserEmail(): void {
    this.currentUserEmail = this.authService.getCurrentuser().email;
  }

  getTypeDePermissions(): void {
    this.typeDePermissionService.getTypeDePermissions().subscribe((typeDePermissions) => {
      this.typeDePermissions = typeDePermissions;
    
      
    });
  }

  calculerDateFin() {
    if (this.demande.typeDePermission && this.demande.dateDebut) {
      const duree = this.demande.typeDePermission.duree; // Durée en jours
      const dateDebut = new Date(this.demande.dateDebut);

      this.demande.dateFin = new Date(dateDebut.getTime() + duree * 24 * 60 * 60 * 1000);
    }
  }

  createDemande(): void {
    this.submitted = true;
    this.newDemande.userEmail = this.currentUserEmail;
    this.newDemande.typeDePermission = this.demande.typeDePermission.nom;
    this.newDemande.description = this.demande.description;
    this.newDemande.dateDebut = this.demande.dateDebut;
    this.calculerDateFin();
    this.newDemande.dateFin = this.demande.dateFin;
    this.demandeService.createDemande(this.newDemande).subscribe({
      next : (demande) => {
  
      this.newDemande = new DemandeDePermissionDTO(); // Reset form
      this.demandeDialog = false;
      this.messageService.add({ severity:'success', summary: 'Demande créée avec succès', life: 3000 });
      this.getDemandes();
      
    },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Erreur lors de la création de la demande', life: 3000 });
      }
  });
    
    
    
  }

  updateDemande(): void {
    this.calculerDateFin(); // Calcul de la date de fin lors de la mise à jour
    this.demandeService.updateDemande(this.demande.id, this.demande).subscribe({
      next: (demande) => {
        const index = this.demandes.findIndex((d) => d.id === demande.id);
        if (index !== -1) {
          this.demandes[index] = demande;
        }
        this.demandeDialog = false;
        this.getDemandes();
        this.messageService.add({ severity: 'info', summary: 'Demande modifiée avec succès', life: 3000 });
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Erreur lors de la mise à jour de la demande', life: 3000 });
      }
    });
  }


  deleteDemande(demande: DemandeDePermission): void {
    this.deleteDemandDialog = true;
    this.demande = { ...demande}
    //this.confirmDeleteDemande(demande); // Demande confirmation de suppression
    
  }

  confirmDeleteDemande(demande: DemandeDePermission){
    this.demandeService.deleteDemande(demande.id).subscribe(() => {
      this.demandes = this.demandes.filter((d) => d.id !== demande.id);
    });
    this.deleteDemandDialog = false;
    this.messageService.add({ severity:'danger', summary: 'Demande supprimée avec succès', life: 3000 });
  }

  deleteSelectedDemandes(): void {
    this.deleteSeletedDemandDialog = true;
    
  }

  confimSelectedDemandes(): void {
    this.selectedDemandes.forEach((demande) => {
      this.confirmDeleteDemande(demande);
    });
    this.deleteSeletedDemandDialog = false;
    this.selectedDemandes = [];
  }

  editDemande(demande: DemandeDePermission): void {
    this.demande = { ...demande,
    dateDebut: demande.dateDebut ? new Date(demande.dateDebut) : new Date(),
    dateFin: demande.dateFin ? new Date(demande.dateFin) : new Date()
     };
    this.calculerDateFin(); // Calcul de la date de fin lors de l'édition
    this.demandeDialog = true;
  }

  openNew(): void {
    this.demande = new DemandeDePermission();
    this.submitted = false;
    this.demandeDialog = true;
  }

  hideDialog(): void {
    this.demandeDialog = false;
    this.submitted = false;
  }

  saveDemande(): void {
    this.submitted = true;

    if (this.demande.id) {
      this.updateDemande();
      
    } else {
      this.createDemande();
      
    }
  }

  getSeverity(status: string) : string {
    switch (status) {
        case "AT":
            return "info";
        case "CO":
            return "info";
        case "RP":
            return "warn";
        case "VA":
            return "success";
        case "RJ":
            return "error";
        default: return "";
    }
}

  filterGlobal(event: Event, stringVal: string) {
    const target = event.target as HTMLInputElement;
    this.dt.filterGlobal(target.value, stringVal);
  }

  exportSelectedDemandesToPDF() {
    if (!this.selectedDemandes?.length) {
      // Afficher un message si aucune demande n'est sélectionnée
      this.messageService.add({ severity: 'warn', summary: 'Aucune demande sélectionnée', life: 3000 });
      return;
    }
  
    const doc = new jsPDF();
    doc.text('Demandes de Permission Sélectionnées', 14, 20);
  
    const columns = ['ID', 'Type', 'Description', 'Date Début', 'Date Fin', 'Statut'];
    const rows = this.selectedDemandes.map(demande => ([
      demande.id,
      demande.typeDePermission.nom,
      demande.description,
      new Date(demande.dateDebut).toLocaleDateString(),
      new Date(demande.dateFin).toLocaleDateString(),
      demande.statutDemande.libelle
    ]));
  
    (doc as any).autoTable({
      head: [columns],
      body: rows,
      startY: 30,
    });
  
    doc.save('demandes_selectionnees.pdf');
  }

  
}
