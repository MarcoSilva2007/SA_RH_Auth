import { Component, OnInit } from '@angular/core';
import { Vaga } from 'src/app/models/vaga.model';
import { VagasService } from 'src/app/services/vagas.service';

@Component({
  selector: 'app-admin-vagas',
  templateUrl: './admin-vagas.component.html',
  styleUrls: ['./admin-vagas.component.scss']
})
export class AdminVagasComponent implements OnInit {
  public vagas: Vaga[] = [];
  public mostrarForm: boolean = false;

  // objeto para criar nova vaga
  public novaVaga: Vaga = new Vaga(0, '', '', '', 0);

  constructor(private vagasService: VagasService) {}

  ngOnInit(): void {
    this.vagasService.getVagas().subscribe((data) => {
      this.vagas = data;
    });
  }

  // botão de cadastrar
  addVaga(): void {
    if (this.novaVaga.nome && this.novaVaga.salario) {
      this.vagas.push(new Vaga(
        this.novaVaga.id,
        this.novaVaga.nome,
        this.novaVaga.foto,
        this.novaVaga.descricao,
        this.novaVaga.salario
      ));

      // limpa formulário
      this.novaVaga = new Vaga(0, '', '', '', 0);
      this.mostrarForm = false;
    }
  }

  // botão editar vaga
  editarVaga(index: number): void {
    this.novaVaga = Vaga.fromMap(this.vagas[index].toMap()); // ✅ resolve erro do spread
    this.mostrarForm = true;
  }

  // botão excluir vaga
  excluirVaga(index: number): void {
    this.vagas.splice(index, 1);
  }

  // botão sair
  logout(): void {
    console.log("Logout realizado!");
    // aqui pode redirecionar para login, ex:
    // this.router.navigate(['/login']);
  }
}
