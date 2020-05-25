import { Component, HostListener, OnInit } from '@angular/core';
import { screenSizeState, screenSize } from './services/screen-size.service';
import { styleSetterService } from './styleSetter.service';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers:[screenSizeState,styleSetterService]
})
export class AppComponent implements OnInit{
  title = 'OSM';
  appStyle;
  routerOutletStyle;

  constructor(private iconRegistry:MatIconRegistry,sanitizer:DomSanitizer,private screenState:screenSizeState,private styleSetter:styleSetterService){
      iconRegistry.addSvgIcon(
        'youtube',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/youtube.svg')
      );
      iconRegistry.addSvgIcon(
        'ipod',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/ipod.svg')
      );
      iconRegistry.addSvgIcon(
        'play',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/playbt1.svg')
      );
      iconRegistry.addSvgIcon(
        'pause',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/pausse.svg')
      );
      iconRegistry.addSvgIcon(
        'next',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/nxtIc.svg')
      );
      iconRegistry.addSvgIcon(
        'prev',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/prevIc.svg')
      );
      iconRegistry.addSvgIcon(
        'add',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/plus.svg')
      );
      iconRegistry.addSvgIcon(
        'cross',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/close.svg')
      );
      iconRegistry.addSvgIcon(
        'equalizer',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/equalizer.svg')
      );
      iconRegistry.addSvgIcon(
        'playsimple',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/playsimple.svg')
      );
      iconRegistry.addSvgIcon(
        'repeatOff',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/repeat.svg')
      );
      iconRegistry.addSvgIcon(
        'repeatOn',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/repeatact.svg')
      );
      iconRegistry.addSvgIcon(
        'repeatOne',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/repeatone.svg')
      );
      iconRegistry.addSvgIcon(
        'search',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/search.svg')
      );
      iconRegistry.addSvgIcon(
        'up',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/uparrow.svg')
      );
      iconRegistry.addSvgIcon(
        'curvearrow',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/curvearrow.svg')
      );
      iconRegistry.addSvgIcon(
        'down',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/arrow.svg')
      );
      iconRegistry.addSvgIcon(
        'edit',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/edit.svg')
      );
      iconRegistry.addSvgIcon(
        'editttl',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/editTtl.svg')
      );
      iconRegistry.addSvgIcon(
        'delete',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/delete.svg')
      );
      iconRegistry.addSvgIcon(
        'addblack',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/addblack.svg')
      );
      iconRegistry.addSvgIcon(
        'mute',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/mute1.svg')
      );
      iconRegistry.addSvgIcon(
        'one',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/vol1.svg')
      );
      iconRegistry.addSvgIcon(
        'two',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/vol2.svg')
      );
      iconRegistry.addSvgIcon(
        'three',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/volume3.svg')
      );
      iconRegistry.addSvgIcon(
        'info',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/help.svg')
      );
      iconRegistry.addSvgIcon(
        'gmail',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/gmail.svg')
      );
      iconRegistry.addSvgIcon(
        'fb',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/facebook.svg')
      );
      iconRegistry.addSvgIcon(
        'lin',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/linkedin.svg')
      );
      iconRegistry.addSvgIcon(
        'web',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/web.svg')
      );
      iconRegistry.addSvgIcon(
        'drag',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/dragger.svg')
      );
      iconRegistry.addSvgIcon(
        'plist',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/vinyl.svg')
      );
      iconRegistry.addSvgIcon(
        'plisthd',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/album.svg')
      );
      iconRegistry.addSvgIcon(
        'shuffleOn',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/shuffleac.svg')
      );
      iconRegistry.addSvgIcon(
        'shuffleOff',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/shuffle.svg')
      );
      iconRegistry.addSvgIcon(
        'cancel',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/cancel.svg')
      );
      iconRegistry.addSvgIcon(
        'pllist',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/playlisticn.svg')
        );
      iconRegistry.addSvgIcon(
        'hd',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/hd.svg')
        );
      iconRegistry.addSvgIcon(
        'sd',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/sd.svg')
        );
  }

  ngOnInit(){
      this.screenState.screenSize.subscribe((scrSz)=>{
          this.onScreensizeChange(scrSz);
      })
      this.screenState.updatedScreenSize(window.innerWidth,window.innerHeight,this.checkIfMobile(window.innerWidth,window.innerHeight));
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
  
      this.screenState.updatedScreenSize(window.innerWidth,window.innerHeight,this.checkIfMobile(window.innerWidth,window.innerHeight));
  }

  checkIfMobile(wdt:number,hgt:number){
    return (wdt/hgt)<=1.3;
  }

  onScreensizeChange(scrSz:screenSize){
    console.log("screen size changed to",scrSz.width,"X",scrSz.height," and is Mobile :" ,scrSz.isMobile);
    this.appStyle = this.styleSetter.appStyleSetter(scrSz);
    this.routerOutletStyle=this.styleSetter.routerOutletStyleSetter(scrSz);
  }

  
}
