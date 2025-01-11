import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  login(email: string, password: string){
    return this.http.post(`${this.apiUrl}/auth/login`, {email, password});
  }

  registro(nombre: string, apellido: string, email: string, password: string){
    return this.http.post(`${this.apiUrl}/auth/registro`, {nombre, apellido, email, password});
  }

  guardarSesion(token: string, usuario: any){
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }

  logout(){
    return this.http.post(`${this.apiUrl}/auth/logout`, {});
  }

  eliminarSesion(){
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  }

  getToken(){
    return localStorage.getItem('token');
  }

  getUser(){
    const userRaw = localStorage.getItem('usuario');
    return userRaw ? JSON.parse(userRaw) : null;
  }

  isLogged(){
    return this.getToken() != null;
  }

  isAdmin(){
    const user = this.getUser();
    return user ? user.rol === 'admin' : false;
  }

  obtenerUsuarios(){
    return this.http.get(`${this.apiUrl}/usuarios`);
  }

  actualizarUsuario(usuario: any){
    return this.http.put(`${this.apiUrl}/usuarios/${usuario.id}`, usuario);
  }

  eliminarUsuario(id: number){
    return this.http.delete(`${this.apiUrl}/usuarios/${id}`);
  }
}
