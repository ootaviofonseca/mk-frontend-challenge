import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarDispositivosComponent } from './listar-dispositivos.component';

describe('ListarDispositivosComponent', () => {
  let component: ListarDispositivosComponent;
  let fixture: ComponentFixture<ListarDispositivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarDispositivosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarDispositivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
