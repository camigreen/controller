import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";

import { DoorsComponent } from './doors.component';
import { DoorComponent } from '../door/door.component';


import { InfiniasService } from '../infinias.service';
import { CamerasComponent } from '../cameras/cameras.component';


@NgModule({
  imports: [
      HttpClientModule,
      CommonModule  
  ],
  declarations: [
    DoorsComponent,
    DoorComponent,
    CamerasComponent
  ],
  providers: [ 
    InfiniasService 
  ],
  exports: [ 
    DoorsComponent 
  ]
})
export class DoorsModule {}