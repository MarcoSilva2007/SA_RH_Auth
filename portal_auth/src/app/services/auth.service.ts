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

  // Registrar novo usuário
  registrar(usuario: any): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}?email=${usuario.email}`).pipe(
      switchMap((res) => {
        if (res.length > 0) {
          return throwError(() => new Error('Usuário já cadastrado'));
        }
        return this.http.post<any>(this.apiUrl, usuario);
      })
    );
  }

  // Login
  login(credenciais: { email: string; senha: string }): Observable<any> {
    const admin = {
      id: '1',
      nome: 'Admin',
      email: 'admin@rh.connect.com',
      senha: 'admin1234',
      permissao: 'admin',
    };

    return this.http.get<any[]>(this.apiUrl).pipe(
      map((usuarios) => {
        // Verificar se é o admin
        if (
          credenciais.email === admin.email &&
          credenciais.senha === admin.senha
        ) {
          localStorage.setItem(this.CHAVE_AUTH, JSON.stringify(admin));
          return admin;
        }

        // Procurar usuário normal
        const usuario = usuarios.find(
          (u) => u.email === credenciais.email && u.senha === credenciais.senha
        );

        if (usuario) {
          localStorage.setItem(this.CHAVE_AUTH, JSON.stringify(usuario));
          return usuario;
        }

        return null;
      })
    );
  }

  // Logout
  logout(): void {
    localStorage.removeItem(this.CHAVE_AUTH);
    this.router.navigate(['/login']);
  }

  // Verifica se o usuário está autenticado
  estaAutenticado(): boolean {
    return !!localStorage.getItem(this.CHAVE_AUTH);
  }

  // Retorna o usuário logado
  usuarioAtual(): any {
    return JSON.parse(localStorage.getItem(this.CHAVE_AUTH) || 'null');
  }
}
