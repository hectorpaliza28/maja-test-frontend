import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { AdminComponent } from './pages/admin/admin.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegistroComponent },
    { 
        path: 'admin', 
        component: AdminComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    { 
        path: 'perfil', 
        component: PerfilComponent,
        canActivate: [AuthGuard]
    },
    { path: '**', redirectTo: 'login' }
];
