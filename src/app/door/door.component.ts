import { Component, Input } from '@angular/core';
import { InfiniasDoorStatus, reqOptions } from '../infinias.datatypes';
import { doorConfig } from "../config.json";
import { InfiniasService } from '../infinias.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-door',
  templateUrl: './door.component.html',
  styleUrls: ['./door.component.css']
})
export class DoorComponent {

  @Input() door: InfiniasDoorStatus;
  public statusMap = doorConfig.statusMap;

  constructor(private _infiniasService: InfiniasService, private toastr: ToastrService) { }

  unlockMomentary() {
    var options:reqOptions = {
      doorIDs: this.door.Id.toString(),
      duration: 10
    };
    if (this.door.ControllerStatus == "Offline") {
      this.log('error',this.door.Door+'" is Offline.');
    } else {
      this.log('success', this.door.Door+' temporarily unlocked.');
      this._infiniasService.unlock(options).subscribe();
    }
    
  }

  lockOpen() {
    var options:reqOptions = {
      doorIDs: this.door.Id.toString(),
      duration: 0
    };
    if (this.door.ControllerStatus == "Offline") {
      this.log('error',this.door.Door+' is Offline.');
    } else {
      this.log('success',this.door.Door+' is locked OPEN.');
      this._infiniasService.unlock(options).subscribe();
    }
    
  }

  lockDown() {
    var options:reqOptions = {
      doorIDs: this.door.Id.toString(),
      lockStatus: "lockdown"
    };
    if (this.door.ControllerStatus == "Offline") {
      this.log('error',this.door.Door+' is Offline.');
    } else {
      this.log('success',this.door.Door+' is locked OPEN.');
      this._infiniasService.lock(options).subscribe();
    }
    
  }

  lockNormal() {
    var options:reqOptions = {
      doorIDs: this.door.Id.toString(),
      lockStatus: 'Normal'
    };
    this.log('success',this.door.Door+' has been returned to the schedule.');
    this._infiniasService.lock(options).subscribe();
  }

  log(type: string, message: string) {
    var options = {positionClass: 'toast-bottom-right'};
    if(type == 'success') {
      this.toastr.success(message, 'Success', options);
    } else if (type == 'error') {
      this.toastr.error(message, 'ERROR', options);
    } else {
      this.toastr.info(message, 'Information', options);
    }
  }

}
