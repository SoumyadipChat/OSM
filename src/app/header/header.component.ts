import { Component, OnInit, Input, Inject, HostListener } from '@angular/core';
import { screenSizeState, screenSize } from '../services/screen-size.service';
import { YouTubeSearchService } from '../services/youtube-search.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers:[YouTubeSearchService]
})
export class HeaderComponent implements OnInit {

  @Input() username:string;

  screenSz:screenSize;
  constructor(private screenState:screenSizeState,public dialog: MatDialog,private router:Router) { }

  ngOnInit() {
    this.screenState.screenSize.subscribe(screen=>{
      this.screenSz=screen;
  })

}

onLogout(){
  const dialogRef = this.dialog.open(LogoutConfirmDialog, {
    width: '250px',
    data: this.username
  });

  dialogRef.afterClosed().subscribe(result => {
    //console.log('The dialog was closed');
    if(result && result=='logout'){
        console.log("logged out");
        sessionStorage.setItem('loggedIn','false');
        this.router.navigateByUrl("/login");
    }
  });

}

}


@Component({
  selector: 'logout-dialog',
  templateUrl: 'logout-dialog.html',
})
export class LogoutConfirmDialog implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<LogoutConfirmDialog>,
    @Inject(MAT_DIALOG_DATA) public data: string) {}

    ngOnInit(){
    }

  

  onNoClick(): void {
    this.dialogRef.close();
  }

}