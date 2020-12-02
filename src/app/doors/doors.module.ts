import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';

import { DoorsComponent } from './doors.component';


import { InfiniasService } from '../infinias/infinias.service';
import { DoorComponent } from './door/door.component';
import { CameraModule } from '../camera/camera.module';


@NgModule({
  imports: [
      HttpClientModule,
      CommonModule,
      NgbModalModule,
      CameraModule  
  ],
  declarations: [
    DoorsComponent,
    DoorComponent
  ],
  providers: [ 
    InfiniasService 
  ],
  exports: [ 
    DoorsComponent 
  ]
})
export class DoorsModule {}