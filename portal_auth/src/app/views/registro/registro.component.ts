import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {
  usuario = {
    nome: '',
    email: '',
    senha: ''
  };
  mensagem = '';

  constructor(private authService: AuthService) {}

  registrar() {
    this.authService.registrar(this.usuario).subscribe({
      next: () => {
        this.mensagem = 'Usuário registrado com sucesso!';
      },
      error: (err) => {
        this.mensagem = err.message;
      }
    });
  }
}