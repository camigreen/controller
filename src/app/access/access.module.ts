import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessComponent } from './access.component';
import { InfiniasService } from '../infinias/infinias.service'
// import { DoorsModule } from '../doors/doors.module';



@NgModule({
  declarations: [
    AccessComponent
  ],
  imports: [
    CommonModule,
    // DoorsModule
  ],
  providers: [
    InfiniasService
  ],
  exports: [
    AccessComponent
  ]
})
export class AccessModule { }
