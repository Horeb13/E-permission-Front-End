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
    this.demandeService.getDemandes().subscribe((demandes) => {
      this.demandes = demandes;
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

  createDemande(): void {
    this.newDemande.userEmail = this.currentUserEmail;
    this.newDemande.typeDePermission = this.demande.typeDePermission.nom;
    this.newDemande.description = this.demande.description;
    this.newDemande.dateDebut = this.demande.dateDebut;
    this.newDemande.dateFin = this.demande.dateFin;
    this.demandeService.createDemande(this.newDemande).subscribe((demande) => {
  
      this.newDemande = new DemandeDePermissionDTO(); // Reset form
      this.demandeDialog = false;
      this.getDemandes();
      
    });
    
    
    
  }

  updateDemande(): void {
    this.demandeService.updateDemande(this.demande.id, this.demande).subscribe((demande) => {
      const index = this.demandes.findIndex((d) => d.id === demande.id);
      if (index !== -1) {
        this.demandes[index] = demande;
      }
      this.demandeDialog = false;
      this.getDemandes();
    });

  }

  deleteDemande(demande: DemandeDePermission): void {
    this.demandeService.deleteDemande(demande.id).subscribe(() => {
      this.demandes = this.demandes.filter((d) => d.id !== demande.id);
    });
    this.messageService.add({ severity:'danger', summary: 'Demande supprimée avec succès', life: 3000 });
  }

  deleteSelectedDemandes(): void {
    this.selectedDemandes.forEach((demande) => {
      this.deleteDemande(demande);
    });
    this.selectedDemandes = [];
  }

  editDemande(demande: DemandeDePermission): void {
    this.demande = { ...demande,
    dateDebut: demande.dateDebut ? new Date(demande.dateDebut) : new Date(),
    dateFin: demande.dateFin ? new Date(demande.dateFin) : new Date()
     };
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
      this.messageService.add({ severity:'info', summary: 'Demande modifiée avec succès', life: 3000 });
    } else {
      this.createDemande();
      this.messageService.add({ severity:'success', summary: 'Demande créée avec succès', life: 3000 });
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

  
}
