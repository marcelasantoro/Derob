import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Iniciativas } from './iniciativas';

describe('Iniciativas', () => {
  let component: Iniciativas;
  let fixture: ComponentFixture<Iniciativas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Iniciativas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Iniciativas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
