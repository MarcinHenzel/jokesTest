import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JokeDialogComponent } from './joke-dialog.component';

describe('JokeDialogComponent', () => {
  let component: JokeDialogComponent;
  let fixture: ComponentFixture<JokeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JokeDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JokeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
