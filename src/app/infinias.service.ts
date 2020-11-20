import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfiniasDoorsResponse, InfiniasDoorResponse, InfiniasDoorStatus, InfiniasDoor, reqOptions } from "./infinias.datatypes";
import { Observable } from 'rxjs';

@Injectable( )
export class InfiniasService {

  private settings = {
    intervalDuration: 1000,
    server: "http://192.168.0.70",
    port: "3000"
    // server: "http://localhost",
    // port: "3000"
  };
  public doors:Observable<InfiniasDoorsResponse>;

  constructor(private http: HttpClient) {
    this.heartbeat()

   }

  heartbeat(){
    var self = this;
    this.doors = new Observable(observer => {
      setInterval(function() {
        self.getDoors()
            .subscribe((data: InfiniasDoorsResponse) => {
              observer.next(data);
            })
      }, self.settings.intervalDuration);
    })
  }

  getDoors() {
    return this.http.get<(InfiniasDoorsResponse)>(this.settings.server+':'+this.settings.port+'/api/doors/');
  } 

  getDoor(id: number):Observable<InfiniasDoorResponse> {
    return this.http.get<(InfiniasDoorResponse)>(this.settings.server+':'+this.settings.port+'/api/doors/'+id);
  }

  unlock(options: reqOptions) {
    console.log(options);
    return this.http.put<{}>(this.settings.server+':'+this.settings.port+'/api/doors/unlock', options);
  }

  lock(options: reqOptions) {
    console.log(options);
    return this.http.put<{}>(this.settings.server+':'+this.settings.port+'/api/doors/lock', options);
  }
  
  version() {
    return this.http.get(this.settings.server+':'+this.settings.port+'/api/version', { observe: 'response' });
  }




}
