import { Component, OnInit } from '@angular/core';

const WIDTH = 700;
const HEIGHT = 500;

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.scss']
})
export class NotfoundComponent implements OnInit {

  private canvas: any = null;
  private ctx: any = null;
  private imgData: any = null;
  private pix: any = null;
  private WIDTH: any = null;
  private HEIGHT: any = null;
  private flickerInterval: any = null;

  constructor() { }

  ngOnInit(): void {
    this.init();
  }

  private init(): void {
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = this.WIDTH;
    this.canvas.height = this.HEIGHT;
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(0, 0, WIDTH, HEIGHT);
    this.ctx.fill();
    this.imgData = this.ctx.getImageData(0, 0, WIDTH, HEIGHT);
    this.pix = this.imgData.data;
    this.flickerInterval = setInterval(this.flickering, 30);
  }

  private flickering(): void {
    for (var i = 0; i < this.pix.length; i += 4) {
      var color = (Math.random() * 255) + 50;
      this.pix[i] = color;
      this.pix[i + 1] = color;
      this.pix[i + 2] = color;
    }
    this.ctx.putImageData(this.imgData, 0, 0);
  }
}


// js source https://codepen.io/moklick/pen/zKleC  

// var Application = (function () {
//   var canvas;
//   var ctx;
//   var imgData;
//   var pix;
//   var WIDTH;
//   var HEIGHT;
//   var flickerInterval;

//   var init = function () {
//     canvas = document.getElementById('canvas');
//     ctx = canvas.getContext('2d');
//     canvas.width = WIDTH = 700;
//     canvas.height = HEIGHT = 500;
//     ctx.fillStyle = 'white';
//     ctx.fillRect(0, 0, WIDTH, HEIGHT);
//     ctx.fill();
//     imgData = ctx.getImageData(0, 0, WIDTH, HEIGHT);
//     pix = imgData.data;
//     flickerInterval = setInterval(flickering, 30);
//   };

//   var flickering = function () {
//     for (var i = 0; i < pix.length; i += 4) {
//       var color = (Math.random() * 255) + 50;
//       pix[i] = color;
//       pix[i + 1] = color;
//       pix[i + 2] = color;
//     }
//     ctx.putImageData(imgData, 0, 0);
//   };

//   return {
//     init: init
//   };
// }());

// Application.init();