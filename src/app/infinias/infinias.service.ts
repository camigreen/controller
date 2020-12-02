import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfiniasDoorsResponse, InfiniasDoorResponse, InfiniasDoorStatus, InfiniasDoor, requestOptions } from "./infinias.datatypes";
import { Observable } from 'rxjs';
import { door } from "../doors/doors.datatypes";

@Injectable( )
export class InfiniasService {

  private settings = {
    intervalDuration: 1000,
    server: "http://192.168.0.70",
    port: "3000"
    // server: "http://localhost",
    // port: "3000"
  };
  
  public doors:Observable<door[]>;
  
  constructor(private http: HttpClient) {
    
    //this.heartbeat()
   }

  public heartbeat(){
    var self = this;
    this.doors = new Observable(observer => {
      setInterval(function() {
        self.getDoors()
            .subscribe((iDoors: InfiniasDoorsResponse) => {
              var doors:door[];
              iDoors.Values.forEach(function(iDoor) {
                console.log(iDoor);
                doors.push(self.parse(iDoor))
              })
              observer.next(doors);
            })
      }, self.settings.intervalDuration);
    })
  }

  private parse(iDoor: InfiniasDoorStatus):door {
    var door:door;
    door.id = iDoor.Id;
    door.name = iDoor.Door;
    return door;
  }

  getDoors() {
    return this.http.get<(InfiniasDoorsResponse)>(this.settings.server+':'+this.settings.port+'/api/doors/');
  } 

  getDoor(id: number):Observable<InfiniasDoorResponse> {
    return this.http.get<(InfiniasDoorResponse)>(this.settings.server+':'+this.settings.port+'/api/doors/'+id);
  }

  unlock(options: requestOptions) {
    console.log(options);
    return this.http.put<{}>(this.settings.server+':'+this.settings.port+'/api/doors/unlock', options);
  }

  lock(options: requestOptions) {
    console.log(options);
    return this.http.put<{}>(this.settings.server+':'+this.settings.port+'/api/doors/lock', options);
  }
  
  version() {
    return this.http.get(this.settings.server+':'+this.settings.port+'/api/version', { observe: 'response' });
  }




}
