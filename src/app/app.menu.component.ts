import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './Services/app.layout.service';
import { CommonModule } from '@angular/common';
import { AppMenuitemComponent } from './app.menuitem.component';


@Component({
    standalone:true,
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
    imports: [CommonModule, AppMenuitemComponent ]
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/home'] },
                    { label: 'Permission', icon: 'pi pi-fw pi-check-square', routerLink: ['/permission'] },
                    { label: 'Profile', icon: 'pi pi-fw pi-user', routerLink: ['/profile'] },
                    { label: 'Notifications', icon: 'pi pi-fw pi-home', routerLink: ['/notifications'] },

                ]
            },

            
        ];
    }
}
