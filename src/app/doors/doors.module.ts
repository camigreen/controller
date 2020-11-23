import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';

import { DoorsComponent } from './doors.component';


import { InfiniasService } from '../infinias.service';


@NgModule({
  imports: [
      HttpClientModule,
      CommonModule,
      NgbModalModule  
  ],
  declarations: [
    DoorsComponent
  ],
  providers: [ 
    InfiniasService 
  ],
  exports: [ 
    DoorsComponent 
  ]
})
export class DoorsModule {}