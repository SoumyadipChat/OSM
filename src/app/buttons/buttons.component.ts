import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent implements OnInit {

  @Input() icon:string;
  @Output() buttonClicked:EventEmitter<void>=new EventEmitter();

  constructor() { }

    ngOnInit() {
  }

  clicked(){
    this.buttonClicked.emit();
  }

}
