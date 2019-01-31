import { Component, OnInit } from '@angular/core';
import * as img_data from '../../../img_data.json';
import { angularMath } from 'angular-ts-math';
import {HttpClient, HttpEventType, HttpHeaders, HttpParams, HttpRequest} from "@angular/common/http";

interface img_detail{
  row_id: number;
  name: string;
  slides: object;
};


interface slide_detail{

  Imageid: number;
  Name: string;
  order: number;
  URL: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  json_data;
  send_data: img_detail[] = [];
  length;
  key;
  imgs;
  tempOrder = 0;
  numOfSlide = 0;
  allImage: img_detail[] = [];
  inserted_img: slide_detail;
  imgWidth = 350;
  imgHeight = 250;
  imgGap = this.imgWidth + 30;
  imageID: number;
  imageName: string;
  imageOrder: number;
  imageURL: string;
  row_ID: number;
  row_index: number;
  step;
  metric;
  nWidth = 3000;
  constructor(private http: HttpClient){
  }

  ngOnInit() {
    // ...
    this.metric = 0;
    this.json_data = img_data;
    this.length = Object.keys(this.json_data).length - 1;
    for(var i = 0 ; i < this.length; i ++){
      this.allImage.push(this.json_data[i]);
      if(this.json_data[i].slides.length*this.imgGap > this.nWidth){
        this.nWidth = this.json_data[i].slides.length*this.imgGap;
      }
    }
  }

  dragStart(ev){
    
    
  }
  
  dragEnd(ev){
    this.inserted_img = {
      "Imageid": this.imageID,
      "Name": this.imageName,
      "order" : this.imageOrder,
      "URL" : this.imageURL
    }
    for(var i = 0; i < this.length; i++ ){
      if(this.json_data[i]['row id'] == this.row_ID){
        this.row_index = i;
      }
    }
    
    if( (ev.y%this.imgHeight)/this.imgHeight >= 0.5 ){
      this.step = angularMath.nearOfNumber(ev.y/this.imgHeight) - 1;
    }
    else if( (ev.y%this.imgHeight)/this.imgHeight <= -0.5 ){
      this.step = angularMath.nearOfNumber(ev.y/this.imgHeight) + 1;
    }
    else {
      this.step = angularMath.nearOfNumber(ev.y/this.imgHeight);
    }
    this.numOfSlide = this.row_index + this.step;
    if(this.step !== 0){
      if(ev.y/this.imgHeight < 0 && (this.numOfSlide >= 0) ){
             
        this.json_data[this.numOfSlide].slides.push(this.inserted_img);

        for(var i = 0; i < this.json_data[this.numOfSlide].slides.length; i++){
          if(this.inserted_img.order >= this.json_data[this.numOfSlide].slides[i].order && this.inserted_img.order <= this.json_data[this.numOfSlide].slides[i].order){
            
            for(var j = this.json_data[this.numOfSlide].slides.length-1; j > i; j--){
              this.json_data[this.numOfSlide].slides[j] = this.json_data[this.numOfSlide].slides[j-1];
            }
            this.json_data[this.numOfSlide].slides[i] = this.inserted_img;
            break;
          }
        }

        if( this.json_data[this.numOfSlide].slides.length * this.imgGap >  this.metric ){
          this.nWidth = this.json_data[this.numOfSlide].slides.length * this.imgGap;
          this.metric = this.nWidth;
        }
      }
      else if(ev.y/this.imgHeight > 0 && (this.numOfSlide) < this.length ){
        this.json_data[this.numOfSlide].slides.push(this.inserted_img);
        for(var i = 0; i < this.json_data[this.numOfSlide].slides.length; i++){
          if(this.inserted_img.order >= this.json_data[this.numOfSlide].slides[i].order && this.inserted_img.order <= this.json_data[this.numOfSlide].slides[i].order){
            
            for(var j = this.json_data[this.numOfSlide].slides.length-1; j > i; j--){
              this.json_data[this.numOfSlide].slides[j] = this.json_data[this.numOfSlide].slides[j-1];
            }
            this.json_data[this.numOfSlide].slides[i] = this.inserted_img;
            break;
          }
        }
        if( this.json_data[this.numOfSlide].slides.length * this.imgGap >  this.metric ){
          this.nWidth = this.json_data[this.numOfSlide].slides.length * this.imgGap;
          this.metric = this.nWidth;
        }
      }
      //const headers = new HttpHeaders().set("Content-Type", "application/json");
      //console.log(headers);
      for(var i = 0 ; i < this.length; i ++){
        this.send_data.push(this.json_data[i]);
      }
      
      this.http.post("http://localhost:3001",
      this.send_data)
      .subscribe(
          (val) => {
              console.log("POST call successful value returned in body", val);
          },
          response => {
              console.log("POST call in error", response);
          },
          () => {
              console.log("The POST observable is now completed.");
          });
      
    }
  }

  public getImageId(imageID, name, order, url, row_index){
    this.imageID = imageID;
    this.imageName = name;
    this.imageOrder = order;
    this.imageURL = url;
    this.row_ID = row_index;
  }
}
  
