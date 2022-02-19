import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JokesComponent } from './jokes.component';
import { TableJokeComponent } from './table-joke/table-joke.component';
import { SettingsJokeComponent } from './settings-joke/settings-joke.component';
import { MaterialsModule } from '../materials.module';
@NgModule({
  declarations: [
    JokesComponent,
    TableJokeComponent,
    SettingsJokeComponent
  ],
  imports: [
    CommonModule,
    MaterialsModule
  ]
})
export class JokesModule { }
