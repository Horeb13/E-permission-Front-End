import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from './Services/app.layout.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
    standalone: true,
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    imports: [RouterModule, FormsModule]
})
export class AppTopBarComponent {

    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService) { }
}
