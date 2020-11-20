import { Component, OnInit } from '@angular/core';
import { JSMpeg } from '@cycjimmy/jsmpeg-player';
 
 
@Component({
  selector: 'app-cameras',
  templateUrl: './cameras.component.html',
  styleUrls: ['./cameras.component.css']
})
export class CamerasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    var jsmpeg = require('jsmpeg');
    var canvas = document.getElementById('canvas1');
    var player = new jsmpeg('ws://localhost:9999', {canvas: canvas});
  }

}
