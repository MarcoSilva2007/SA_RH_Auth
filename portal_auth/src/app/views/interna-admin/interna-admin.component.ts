import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-interna-admin',
  templateUrl: './interna-admin.component.html',
  styleUrls: ['./interna-admin.component.scss']
})
export class AdminComponent implements OnInit {
  usuario: any;

  curriculos = [
    { nome: 'João Oliveira Campos', experiencia: 'Atividades de Recrutamento' },
    { nome: 'Ântonio Pereira Albuquerque', experiencia: 'Recrutamento e Seleção' },
    { nome: 'Juliana Ferreira Rodrigues', experiencia: 'Departamento Pessoal' },
    { nome: 'Guilherme Da Silva', experiencia: 'Gestão de Pessoas' },
    { nome: 'Anna Carolyna De Lima', experiencia: 'Generalista de RH' },
    { nome: 'Marcelina Santos de Souza', experiencia: 'Comunicação e Relação Interpessoal' },
  ];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.usuario = this.authService.usuarioAtual();

    if (!this.usuario || this.usuario.permissao !== 'admin') {
      alert('Acesso negado! Faça login como administrador.');
      this.router.navigate(['/login']);
    }
  }

  logout() {
    this.authService.logout();
  }
}
