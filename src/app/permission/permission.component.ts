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


@Component({
  selector: 'app-permission',
  standalone: true,
  imports: [
    TableModule, 
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
  styleUrls: ['./permission.component.css'],
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
  statuses: any[] = [
    { label: 'Pending', value: 'Pending' },
    { label: 'Approved', value: 'Approved' },
    { label: 'Rejected', value: 'Rejected' },
  ];

  constructor(
    private demandeService: DemandeDePermissionService,
    private typeDePermissionService: TypeDePermissionService,
    private authService: AuthService,
  
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
    this.demandeService.createDemande(this.newDemande).subscribe((demande) => {
      //this.demandes.push(demande);
      this.newDemande = new DemandeDePermissionDTO(); // Reset form
      this.demandeDialog = false;
    });
  }

  updateDemande(): void {
    this.demandeService.updateDemande(this.demande.id, this.demande).subscribe((demande) => {
      const index = this.demandes.findIndex((d) => d.id === demande.id);
      if (index !== -1) {
        this.demandes[index] = demande;
      }
      this.demandeDialog = false;
    });
  }

  deleteDemande(demande: DemandeDePermission): void {
    this.demandeService.deleteDemande(demande.id).subscribe(() => {
      this.demandes = this.demandes.filter((d) => d.id !== demande.id);
    });
  }

  deleteSelectedDemandes(): void {
    this.selectedDemandes.forEach((demande) => {
      this.deleteDemande(demande);
    });
    this.selectedDemandes = [];
  }

  editDemande(demande: DemandeDePermission): void {
    this.demande = { ...demande };
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

  filterGlobal(event: Event, stringVal: string) {
    const target = event.target as HTMLInputElement;
    this.dt.filterGlobal(target.value, stringVal);
  }
}
