import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonneViewComponent } from './personne-view.component';

describe('PersonneViewComponent', () => {
  let component: PersonneViewComponent;
  let fixture: ComponentFixture<PersonneViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonneViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonneViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
