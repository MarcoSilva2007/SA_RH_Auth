import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternaAdminComponent } from './interna-admin.component';

describe('InternaAdminComponent', () => {
  let component: InternaAdminComponent;
  let fixture: ComponentFixture<InternaAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InternaAdminComponent]
    });
    fixture = TestBed.createComponent(InternaAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
