import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminVagasComponent } from './admin-vagas.component';
import { VagasService } from 'src/app/services/vagas.service';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Vaga } from 'src/app/models/vaga.model';

describe('AdminVagasComponent', () => {
  let component: AdminVagasComponent;
  let fixture: ComponentFixture<AdminVagasComponent>;
  let vagasServiceMock: any;

  beforeEach(() => {
    // Mock do VagasService
    vagasServiceMock = {
      getVagas: jasmine.createSpy('getVagas').and.returnValue(of([
        { id: 1, titulo: 'Dev Front-end', descricao: 'React/Angular', salario: '5000' }
      ])),
      deleteVaga: jasmine.createSpy('deleteVaga').and.returnValue(of({})),
      updateVaga: jasmine.createSpy('updateVaga').and.returnValue(of({}))
    };

    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [AdminVagasComponent],
      providers: [
        { provide: VagasService, useValue: vagasServiceMock }
      ]
    });

    fixture = TestBed.createComponent(AdminVagasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should list vagas on init', () => {
    expect(vagasServiceMock.getVagas).toHaveBeenCalled();
    expect(component.vagas.length).toBe(1);
    expect(component.vagas[0].nome).toBe('Dev Front-end');
  });

  it('should edit a vaga', () => {
    spyOn(window, 'prompt').and.returnValues('Novo Título', 'Nova Desc', '6000');
    const vaga = component.vagas[0];
    component.editarVaga(0);

    expect(vagasServiceMock.updateVaga).toHaveBeenCalledWith(vaga.id, vaga);
    expect(vaga.nome).toBe('Novo Título');
    expect(vaga.descricao).toBe('Nova Desc');
    expect(vaga.salario).toBe(6000);
  });

  it('should delete a vaga', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    const id = component.vagas[0].id;
    component.excluirVaga(id);

    expect(vagasServiceMock.deleteVaga).toHaveBeenCalledWith(id);
    expect(component.vagas.length).toBe(0);
  });
});
