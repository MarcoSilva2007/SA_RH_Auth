import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  senha: string = '';
  erro: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  entrar() {
    this.authService.login({ email: this.email, senha: this.senha }).subscribe(usuario => {
      if(usuario) {
        this.erro = '';
        this.router.navigate(['/interna']);
      } else {
        this.erro = 'Email ou senha inválidos';
      }
    });
  }
}