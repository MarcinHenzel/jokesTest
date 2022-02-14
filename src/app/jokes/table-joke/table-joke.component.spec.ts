import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableJokeComponent } from './table-joke.component';

describe('TableJokeComponent', () => {
  let component: TableJokeComponent;
  let fixture: ComponentFixture<TableJokeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableJokeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableJokeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
