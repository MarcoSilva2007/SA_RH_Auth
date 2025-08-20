import { Component, OnInit } from '@angular/core';
import { Curriculo } from 'src/app/models/curriculos.model';
import { CurriculoService } from 'src/app/services/curriculos.service';

@Component({
  selector: 'app-curriculos',
  templateUrl: './curriculos.component.html',
  styleUrls: ['./curriculos.component.scss']
})
export class CurriculosComponent implements OnInit{
  public curriculos: Curriculo[] = []; // vetor para armazenar os currículos do BD

  constructor(private _curriculoService: CurriculoService) {}

  ngOnInit(): void {
    this.listarCurriculos();
  }
  listarCurriculos() {
    this._curriculoService.getCurriculos().subscribe(
      (e) => [
        this.curriculos = e.map(
          (curriculo) => { 
            return Curriculo.fromMap(curriculo);
          }
        )
      ]
    )
  }
}
