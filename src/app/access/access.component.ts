import { Component, OnInit } from '@angular/core';
import { requestOptions } from '../infinias/infinias.datatypes';
import { InfiniasService } from '../infinias/infinias.service';

@Component({
  selector: 'app-access',
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.css'],
  providers: [InfiniasService]
})
export class AccessComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log('test');
  }

}
