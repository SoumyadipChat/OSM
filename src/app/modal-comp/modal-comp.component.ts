import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { YouTubeSearchService } from '../services/youtube-search.service';
import { screenSizeState } from '../services/screen-size.service';

export interface adderData{
  id:string,
  title:string,
  search:string,
  type:number
}

@Component({
  selector: 'app-modal-comp',
  templateUrl: './modal-comp.component.html',
  styleUrls: ['./modal-comp.component.scss'],
  providers:[screenSizeState]
})
export class ModalCompComponent implements OnInit {

  searchResults=[];
  selectIndex=0;
  screenSz;
  

  constructor(public dialogRef: MatDialogRef<ModalCompComponent>,
    @Inject(MAT_DIALOG_DATA) public data: adderData,private youtube: YouTubeSearchService,private screenState:screenSizeState) { }

  ngOnInit() {
    //console.log("modal opened");
    this.screenState.screenSize.subscribe(screen=>{
      console.log("screen size modal",screen.width,"X",screen.height," and is Mobile :" ,screen.isMobile);
      this.screenSz=screen;
  })
    this.youtube.search(this.data.search).subscribe(searchList=>{
        this.searchResults=searchList;
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  sendAddData(){
    console.log(this.selectIndex,this.searchResults[this.selectIndex]);
  }


}
