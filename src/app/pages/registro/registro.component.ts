import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro',
  imports: [FormsModule, CommonModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css',
  standalone: true
})
export class RegistroComponent {
  nombre : string = '';
  apellido : string = '';
  email : string = '';
  password : string = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(){
    if(this.authService.isLogged()){
      if(this.authService.isAdmin())
        this.router.navigate(['/admin']);
      else
        this.router.navigate(['/perfil']);
    }
  }

  submitRegistro(){
    this.authService.registro(this.nombre, this.apellido, this.email, this.password).subscribe({
      next:() => {
        alert('Registro exitoso. Ya puedes iniciar sesión.');
        this.router.navigate(['/login']);
      },
      error:(err) => {
        const errores = err.error.errors as { [key: string]: any };
        const mensajes = Object.values(errores).map((v: any) => v.msg).flat().join('\n');
        alert(mensajes);
      }
    });
  }

  irALogin(){
    this.router.navigate(['/login']);
  }
}
