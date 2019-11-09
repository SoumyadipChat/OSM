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
  isEmptySearch=false;
  showLoading=true;
  titleText='';

  selectedVal;
  

  constructor(public dialogRef: MatDialogRef<ModalCompComponent>,
    @Inject(MAT_DIALOG_DATA) public data: adderData,private youtube: YouTubeSearchService) { }

  ngOnInit() {
    
  this.showLoading=true;
    this.youtube.search(this.data.search).subscribe(searchList=>{
        this.searchResults=searchList;
        if(this.searchResults.length==0){
          this.isEmptySearch=true;
          return;
        }
        if(this.data.type==1){
          this.searchResults=this.searchResults.slice(0,4);
        }
        this.showLoading=false;
        this.isEmptySearch=false;
        this.titleText=this.searchResults[0].title.split('|')[0].substring(0,20);
        this.selectedVal=this.searchResults[0];
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  updateSelection(){
    this.selectedVal=this.searchResults[this.selectIndex];
    this.titleText=this.searchResults[this.selectIndex].title.split('|')[0].substring(0,20);
  }

  updateTitle(){
    this.selectedVal.title=this.titleText;
  }
  

}
