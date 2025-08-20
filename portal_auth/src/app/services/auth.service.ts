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

  // Função para registrar um usuário
  registrar(usuario: any): Observable<any> {
    // Checa se o usuario eciste contando o quanto de ususarios existe
    return this.http.get<any[]>(`${this.apiUrl}?email=${usuario.email}`).pipe(
      switchMap((res) => {
        // Se o email já existe
        if (res.length > 0) {
          // Cria um erro para o sistema, e para que o erro seja resolvido, roda a função dentro do trycatch 
          return throwError(() => new Error('Usurário Já cadastrado')); // Para o programa aqui se o usuário já existir
        }
        // Se o email não existe no sistema bd, cria um novo usuário
        return this.http.post<any>(this.apiUrl, usuario);
      })
    );
  }

  // Função para oogar novo usuário 
  login(credenciais: any): Observable<boolean> {
    return this.http
      .get<any[]>(
        // Passa o email e a senha por ser login 
        `${this.apiUrl}?email=${credenciais.email}$senha=${credenciais.senha}`
      )
      .pipe(
        map((usuario) => {
          if (usuario.length > 0) {
            // Se o usuário ja existe, armazena no local storage, que seria no armazenamento local do navegador
            localStorage.setItem(this.CHAVE_AUTH, JSON.stringify(usuario[0]));
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
