import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'OSM';
  myStyles = {
    'width':  (window.innerWidth-16)+'px',
    'height': (window.innerHeight-16)+'px',
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    console.log(window)
  this.myStyles={
    'width': (window.innerWidth-16)+'px',
    'height' : (window.innerHeight-16)+'px'
  }
}
  
}
