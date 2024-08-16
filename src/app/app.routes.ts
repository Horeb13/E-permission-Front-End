// app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './Services/Auth/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { PermissionComponent } from './permission/permission.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { SuperAdminGuard } from './Services/Auth/super-admin.guard';
import { RoleSelectionComponent } from './role-selection/role-selection.component';
import { AdminGuard } from './Services/Auth/admin.guard';
import { AccessdenyComponent } from './accessdeny/accessdeny.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent, canMatch:[AuthGuard] },
    { path: 'role-selection', component : RoleSelectionComponent, canMatch:[ SuperAdminGuard, AdminGuard]},
    {path: 'access-deny', component: AccessdenyComponent},
    
    { 
        path: '', 
        component: MainLayoutComponent, 
        canMatch: [AuthGuard], 
        children: [
            { path: 'home', component: HomeComponent },
            { path: 'permission', component: PermissionComponent},
            { path: 'profile', component: ProfileComponent },
            { path: 'notifications', component: NotificationsComponent, canMatch : [SuperAdminGuard]},
            
            
            
        ] 
    },
    { path: '**', component: PageNotFoundComponent },
    
];
