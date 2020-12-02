import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { door } from './doors.datatypes';

@Component({
  selector: 'app-doors',
  templateUrl: './doors.component.html',
  styleUrls: ['./doors.component.css']
})

export class DoorsComponent implements OnInit {

  public doors:door[];
  protected _doors = {};
  private selectedDoors = [2,4];
  private selectedGates = [17,66,72,74];

  constructor() {}

  ngOnInit() {
    // this._infiniasService.version().subscribe(resp => {
    //   this.infiniasVersion = resp;
    //   console.log(this.infiniasVersion);
    // });
    
    // var temp: InfiniasDoorStatus[];
    this.test();
    // this._infiniasService.doors.subscribe((
    //   data ) => {
    //     this.doors = data;
    //     // this.renderData(data);
    //   }); 
  }
  test() {
    console.log("dooors");
  }

  parseDoors(data) {

  }

  renderData(data) {
    var i = 0;
    var result = [];
    var group = [];
    data.Values.forEach((door) => {
      if(this.selectedDoors.includes(door.Id) || this.selectedGates.includes(door.Id)) {
        if(door.ControllerStatus == "Offline") {
          door.DoorStatus = "Offline";
        }
        if (this.selectedGates.includes(door.Id)) {
          if(door.DoorStatus == "ForcedOpen") {
            door.DoorStatus = "VehicleExiting";
          }
        }
        if(i < 4) {
          
          group.push(door);
          i++;
        } else {
          result.push(group);
          group = [];
          group.push(door);
          i = 1;
        }
        this._doors[door.Id] = door;
      }
    });
    result.push(group);
    this.doors = result;
  }

  emergencyUnlock() {
    var options:requestOptions = {
      doorIDs: '17,66,72,74',
      duration: 0
    };

    this.log('success','Door(s) '+options.doorIDs+' emergency opened!');
    this._infiniasService.unlock(options).subscribe();
  }

  emergencyLock() {
    var options:requestOptions = {
      doorIDs: '17,66,72,74',
      lockStatus: 'Locked'
    };

    this.log('success','Door(s) '+options.doorIDs+' emergency locked!');
    this._infiniasService.unlock(options).subscribe();
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


