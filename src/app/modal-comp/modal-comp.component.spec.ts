import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCompComponent } from './modal-comp.component';

describe('ModalCompComponent', () => {
  let component: ModalCompComponent;
  let fixture: ComponentFixture<ModalCompComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCompComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
