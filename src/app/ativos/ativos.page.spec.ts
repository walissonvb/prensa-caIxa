import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AtivosPage } from './ativos.page';

describe('AtivosPage', () => {
  let component: AtivosPage;
  let fixture: ComponentFixture<AtivosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AtivosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
