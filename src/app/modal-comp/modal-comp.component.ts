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
  checkboxBool=[true];
  noOfTru=1;
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
        else{
          this.searchResults=this.searchResults.slice(0,20);
        }
        for(let result in this.searchResults){
          this.checkboxBool.push(false);
        }
        this.showLoading=false;
        this.isEmptySearch=false;
        this.titleText=('').concat(this.searchResults[0].title.split('|')[0].substring(0,30));
        this.selectedVal=this.searchResults[0];
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  boolChange(value){
      if(value){
        this.noOfTru++;
      }
      else{
        this.noOfTru--;
      }
  }

  sendData(){
    //console.log("sending....");
    let resultArr=[];
    for(let result in this.searchResults)
    {
      //console.log(this.checkboxBool[result]);
      if(this.checkboxBool[result]==true){
        resultArr.push({
          id:this.searchResults[result].id,
          title:this.searchResults[result].title,
          thumbnailUrl:this.searchResults[result].thumbnailUrl
        })
      }
    }
    if(resultArr.length==1 && this.titleText.length>0){
      resultArr[0].title=this.titleText;
    }
    return resultArr;
  }

}
