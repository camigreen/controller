import { state } from '@angular/animations';
import { Component, Input } from '@angular/core';
import JSMpeg from '@cycjimmy/jsmpeg-player';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-door',
  templateUrl: './door.component.html',
  styleUrls: ['./door.component.css']
})
export class DoorComponent {

  closeResult = '';

  constructor(private modalService: NgbModal) { }

  @Input() state = state;

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg', centered: true}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    var canvas = document.getElementById('canvas1');
    var player = new JSMpeg.VideoElement('#cam-container','ws://localhost:9990', {canvas: canvas});
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
