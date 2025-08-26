import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Curriculo {
  nome: string;
  experiencia: string;
}

interface Vaga {
  id: number;
  nome: string;
  foto: string;
  descricao: string;
  salario: number;
}

@Component({
  selector: 'app-admin',
  templateUrl: './interna-admin.component.html',
  styleUrls: ['./interna-admin.component.scss']
})
export class InternaAdminComponent implements OnInit {

  abaAtiva: 'curriculos' | 'vagas' = 'curriculos';

  curriculos: Curriculo[] = [
    { nome: 'João Oliveira Campos', experiencia: 'Atividades de Recrutamento' },
    { nome: 'Ântonio Pereira Albuquerque', experiencia: 'Recrutamento e Seleção' },
    { nome: 'Juliana Ferreira Rodrigues', experiencia: 'Departamento Pessoal' },
    { nome: 'Guilherme Da Silva', experiencia: 'Gestão de Pessoas' },
    { nome: 'Anna Carolyna De Lima', experiencia: 'Generalista de RH' },
    { nome: 'Marcelina Santos de Souza', experiencia: 'Comunicação e Relação Interpessoal' },
  ];

  vagas: Vaga[] = [
    { id: 2, nome: 'Desenvolver BackEnd Pleno', foto: 'foto2.jpg', descricao: 'Trabalhar com Desenvolvimento Web', salario: 7000 },
    { id: 3, nome: 'Desenvolver Fullstack Senior', foto: 'foto3.jpg', descricao: 'Trabalhar com Desenvolvimento Web', salario: 10000 },
    { id: 4, nome: 'Engenheiro Nuvem', foto: 'foto4.jpg', descricao: 'Trabalhar com Cloud', salario: 8000 },
    { id: 5, nome: 'Marco', foto: 'A', descricao: 'A', salario: 32233232 },
  ];

  mostrarForm: boolean = false;

  novaVaga: Vaga = { id: 0, nome: '', foto: '', descricao: '', salario: 0 };

  constructor(private router: Router) { }

  ngOnInit(): void {}

  logout() {
    console.log('Logout realizado!');
    this.router.navigate(['/login']);
  }

  setAba(aba: 'curriculos' | 'vagas') {
    this.abaAtiva = aba;
    this.mostrarForm = false;
  }

  // Cadastrar ou atualizar vaga
  salvarVaga() {
    if (!this.novaVaga.nome || !this.novaVaga.salario) return;

    if (this.novaVaga.id === 0) {
      // Novo ID incremental
      const novoId = this.vagas.length ? Math.max(...this.vagas.map(v => v.id)) + 1 : 1;
      this.vagas.push({ ...this.novaVaga, id: novoId });
    } else {
      const index = this.vagas.findIndex(v => v.id === this.novaVaga.id);
      if (index > -1) this.vagas[index] = { ...this.novaVaga };
    }

    this.novaVaga = { id: 0, nome: '', foto: '', descricao: '', salario: 0 };
    this.mostrarForm = false;
  }

  editarVaga(vaga: Vaga) {
    this.novaVaga = { ...vaga };
    this.mostrarForm = true;
  }

  excluirVaga(id: number) {
    if (confirm('Deseja realmente excluir esta vaga?')) {
      this.vagas = this.vagas.filter(v => v.id !== id);
    }
  }

  cadastrarNovaVaga() {
    this.novaVaga = { id: 0, nome: '', foto: '', descricao: '', salario: 0 };
    this.mostrarForm = true;
  }
}
