import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsJokeComponent } from './settings-joke.component';

describe('SettingsJokeComponent', () => {
  let component: SettingsJokeComponent;
  let fixture: ComponentFixture<SettingsJokeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsJokeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsJokeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
