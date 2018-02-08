import { CompanyService } from './../service/company.service';
import { Component, Input, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ScriptLoaderService } from '../../js/script-loader.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppService } from '../app.service';
@Component({
  selector: 'app-merchant',
  templateUrl: './merchant.component.html',
  styles: [`
    .some-class {
      background-color:#ffb822;
      color:white !important;
    }
  `],
})

export class MerchantComponent implements OnInit, AfterViewInit {
  @ViewChild('ippp') ippp: ElementRef;
  @ViewChild('ipppp') ipppp: ElementRef;
  rid: any;
  dataLoded: any = false;
  startRank: any;
  endRank: any;
  editing: any = false;
  dishRank: any = [];
  name: any;
  constructor(private _script: ScriptLoaderService, private appService: AppService, private cpyService: CompanyService) {

  }
  ngOnInit() {
      this.rid = localStorage.getItem('rid');
      this.name = localStorage.getItem('name');
      this.getDishRank();
  }
  ngAfterViewInit() {
  }
// init

  loadScript() {
    this._script.load('app-merchant',
    'assets/bootstrap-datepicker.js');
  }
  getDishRank() {
      this.cpyService.getDishRank(this.rid).subscribe(
        event => {
          this.dishRank = event.ea_data;
          this.dataLoded = true;
        },
        event => {
          if (event.ev_error === 10011) {
            alert('Your account has been logged in from another device.');
          } else if (event.ev_error === 10001) {
            alert('Token Expires. Please login again.');
          }
        }
      );
  }
  startEditing(item) {
    if (!item.isEditing) {
      item.isEditing = true;
      this.editing = true;
    }
    if (item.level) {
      this.startRank = item.level;
    }
  }
  cancelEditing(item) {
      item.isEditing = false;
      this.editing = false;
  }
  saveDishRank(item) {
    this.endRank = item.level;
    if (this.endRank < this.startRank) {
      this.dishRank.forEach(dish => {
        if (dish.level >= this.endRank && dish.level < this.startRank) {
          dish.level = parseInt(dish.level, 10) + 1;
        }
      });
      item.level = item.level - 1;
      this.cancelEditing(item);
    } else if (this.endRank > this.startRank) {
      this.dishRank.forEach(dish => {
        if (dish.level > this.startRank && dish.level <= this.endRank) {
          dish.level = parseInt(dish.level, 10) - 1;
        }
      });
      item.level = item.level + 1;
      this.cancelEditing(item);
    }
  }
  saveToDatabase() {
    const rankList = [];
    this.dishRank.forEach(dish => {
      const data = {
        dt_id: 0,
        level: 0
      };
      data.dt_id = dish.dt_id;
      data.level = dish.level;
      rankList.push(data);
    });
    console.log(rankList);
    this.cpyService.editDishRank(rankList).subscribe(
     event => {
       console.log(event);
     });
     this.getDishRank();
  }
}
