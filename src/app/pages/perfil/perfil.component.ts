import { Component, OnInit } from '@angular/core'
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  imports: [CommonModule, FormsModule],
  templateUrl: './perfil.component.html',
  standalone: true
})
export class PerfilComponent {
  usuario: any = {};

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(){
    this.usuario = this.authService.getUser();
  }

  cerrarSesion(){
    this.authService.logout().subscribe({
      next:(res) => {
        const response = res as { success: boolean, message: string };

        if(!response.success){
          return;
        }

        alert(response.message);
        this.authService.eliminarSesion();
        this.router.navigate(['/login']);
      },
      error:(err) => {
        console.log(err);
        alert('Error al cerrar sesión');
      }
    });
  }
}
