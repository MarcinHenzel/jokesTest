import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
const components = [SidebarComponent, HeaderComponent];
@NgModule({
  declarations: [...components],
  imports: [CommonModule, RouterModule],
  exports: [...components]

})
export class CoreModule {}
