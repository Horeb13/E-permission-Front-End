// app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './Services/Auth/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { PermissionComponent } from './permission/permission.component';
import { NotificationsComponent } from './notifications/notifications.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { 
        path: '', 
        component: MainLayoutComponent, 
        canMatch: [AuthGuard], 
        children: [
            { path: 'home', component: HomeComponent },
            { path: 'permission', component: PermissionComponent},
            { path: 'profile', component: ProfileComponent },
            { path: 'notifications', component: NotificationsComponent}
            
        ] 
    },
    { path: '**', component: PageNotFoundComponent },
];
