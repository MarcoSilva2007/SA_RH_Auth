import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3001/usuarios';
  private readonly CHAVE_AUTH = 'usuarioLogado';

  constructor(private router: Router, private http: HttpClient) {}

  registrar(usuario: any): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}?email=${usuario.email}`).pipe(
      switchMap((res) => {
        if (res.length > 0) {
          return throwError(() => new Error('Usuário Já cadastrado')); 
        }
        return this.http.post<any>(this.apiUrl, usuario);
      })
    );
  }

  login(credenciais: { email: string, senha: string }): Observable<any> {
    return this.http
      .get<any[]>(`${this.apiUrl}?email=${credenciais.email}&senha=${credenciais.senha}`)
      .pipe(
        map((usuarios) => {
          if (usuarios.length > 0) {
            localStorage.setItem(this.CHAVE_AUTH, JSON.stringify(usuarios[0]));
            return usuarios[0];
          }
          return null;
        })
      );
  }

  logout() {
    localStorage.removeItem(this.CHAVE_AUTH);
    this.router.navigate(['/login']);
  }

  estaAutenticado(): boolean {
    return !!localStorage.getItem(this.CHAVE_AUTH);
  }

  usuarioAtual(): any {
    return JSON.parse(localStorage.getItem(this.CHAVE_AUTH) || '{}');
  }
}