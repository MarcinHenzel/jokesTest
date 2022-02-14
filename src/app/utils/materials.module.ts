import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
const materialModules = [MatTableModule,MatFormFieldModule, MatSelectModule, MatPaginatorModule, MatProgressSpinnerModule, MatSortModule];

@NgModule({
  imports: materialModules,
  exports: materialModules,
})
export class MaterialsModule {}
