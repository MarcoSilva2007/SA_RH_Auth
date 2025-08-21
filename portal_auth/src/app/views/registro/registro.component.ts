import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {
  nome: string = '';
  email: string = '';
  senha: string = '';
  erro: string = '';
  sucesso: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  registrar() {
    const novoUsuario = {
      nome: this.nome,
      email: this.email,
      senha: this.senha
    };

    this.authService.registrar(novoUsuario).subscribe({
      next: () => {
        this.sucesso = "Registro bem-sucedido! Vá para o login.";
        this.erro = '';
      },
      error: (err) => {
        this.erro = 'Erro ao registrar: ' + err.message;
      }
    });
  }
}
