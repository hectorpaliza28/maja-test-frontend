import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  standalone: true
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  submitLogin() {
    this.authService.login(this.email, this.password).subscribe({
      next: (res) => {
        const response = res as { token: string, usuario: any, success: boolean, message: string };
        
        if(!response.success) {
          alert(response.message);
          return;
        }
        
        this.authService.guardarSesion(response.token, response.usuario);

        if(response.usuario.rol === 'admin') 
          this.router.navigate(['/admin']);
        else
          this.router.navigate(['/perfil']);
      },
      error: (err) => {
        console.log(err);
        alert('Error al iniciar sesión');
      }
    });
  }

  registrarse(){
    this.router.navigate(['/registro']);
  }
}
