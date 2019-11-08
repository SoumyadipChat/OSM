import { Component, OnInit, Input } from '@angular/core';
import { screenSizeState, screenSize } from '../services/screen-size.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() username:string;

  screenSz:screenSize;

  constructor(private screenState:screenSizeState) { }

  ngOnInit() {
    this.screenState.screenSize.subscribe(screen=>{
      this.screenSz=screen;
  })
  }

}
