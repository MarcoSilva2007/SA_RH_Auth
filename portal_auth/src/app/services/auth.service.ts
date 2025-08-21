import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
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

  login(credenciais: { email: string, senha: string }): Observable<boolean> {
    return this.http
      .get<any[]>(`${this.apiUrl}?email=${credenciais.email}&senha=${credenciais.senha}`).pipe(
        map((usuarios) => {
          if (usuarios.length > 0) {
            // Se o usuário ja existe, armazena no local storage, que seria no armazenamento local do navegador
            localStorage.setItem(this.CHAVE_AUTH, JSON.stringify(usuarios[0]));
            return true;
          }
          // Caso nao seja encotrado retorna falso, ou seja para a pagina de login
          return false;
        })
      );
  }
  logout(){
    // Linmpa o armazenamento interno
    localStorage.removeItem(this.CHAVE_AUTH);
    // E volta para a pagina de login
    this.router.navigate(['/login']);
  }

  // Função para verificar se o usuário está autenticado
  estaAutenticado(): boolean {
    // Uso de dupla negação (!!) para converter o valor de texto em booleana
    // Se retornar vazio é falso, mas se retornar texto é true
    return !! localStorage.getItem(this.CHAVE_AUTH);
  }

  // Função para pegar as informações do usuário atual
  usuarioAtual(): any {
    // Converte o texto para JSON
    return JSON.parse(localStorage.getItem(this.CHAVE_AUTH) || '{}')
  }
}
