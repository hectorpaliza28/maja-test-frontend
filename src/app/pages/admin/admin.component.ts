import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../environments/environment.dev';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  standalone: true
})
export class AdminComponent {
  users: any[] = [];

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(){
    this.cargarUsuarios();
  }

  cargarUsuarios(){
    this.authService.obtenerUsuarios().subscribe({
      next:(res) => {
        const response = res as { success: boolean, message: string, users: any[] };

        if(!response.success){
          alert(response.message);
          return;
        }

        this.users = response.users;
      },
      error:(err) => {
        console.log(err);
        alert('Error al cargar usuarios');
      }
    });
  }

  actualizarUsuario(usuario: any){
    if(!this.validarCampos(usuario)){
      return;
    }

    this.authService.actualizarUsuario(usuario).subscribe({
      next:(res) => {
        const response = res as { success: boolean, message: string };

        if(!response.success){
          alert(response.message);
          return;
        }

        alert('Usuario actualizado');
      },
      error:(err) => {
        console.log(err);
        alert('Error al actualizar usuario');
      }
    });
  }

  validarCampos(usuario: any){
    if(usuario.nombre == '' || usuario.apellido == '' || usuario.email == ''){
      alert('No puedes dejar campos vacíos');
      return false;
    }

    return true;
  }

  eliminarUsuario(usuario: any){
    const usuarioLogeado = this.authService.getUser();
    if(usuarioLogeado.id === usuario.id){
      alert('No puedes eliminar tu propio usuario');
      return;
    }

    if(confirm(`¿Estás seguro de eliminar al usuario ${usuario.nombre} ${usuario.apellido}?`)){
      this.authService.eliminarUsuario(usuario.id).subscribe({
        next:(res) => {
          const response = res as { success: boolean, message: string };

          if(!response.success){
            alert(response.message);
            return;
          }

          alert('Usuario eliminado');
          this.cargarUsuarios();
        },
        error:(err) => {
          console.log(err);
          alert('Error al eliminar usuario');
        }
      });
    }
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

  irAPerfil(){
    this.router.navigate(['/perfil']);
  }
}
