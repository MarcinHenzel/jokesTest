import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JokesComponent } from './jokes.component';
import { TableJokeComponent } from './table-joke/table-joke.component';
import { SettingsJokeComponent } from './settings-joke/settings-joke.component';
import { MaterialsModule } from '../materials.module';
import { ReactiveFormsModule } from '@angular/forms';
import { JokeDialogComponent } from './joke-dialog/joke-dialog.component';
@NgModule({
  declarations: [
    JokesComponent,
    TableJokeComponent,
    SettingsJokeComponent,
    JokeDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialsModule,
    ReactiveFormsModule,
  ]
})
export class JokesModule { }
