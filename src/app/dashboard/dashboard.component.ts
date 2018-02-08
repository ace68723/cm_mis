import { CompanyService } from './../service/company.service';
import { Component, OnChanges, SimpleChanges, Input, OnInit, AfterViewInit } from '@angular/core';
import { ScriptLoaderService } from '../../js/script-loader.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppService } from '../app.service';
import {ActivatedRoute, Router} from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [`
    .some-class {
      background-color:#ffb822;
      color:white !important;
    }
  `],
})

export class DashboardComponent implements OnInit, AfterViewInit {
  page_num: number;
  new_merchant_id: any;
  restaurantList: any = [];
  totalList: any = [];
  pageNumArray: any = [];
  page_size: number;
  newUser: any = false;
  i: any;
  keyword: any;
  deleteItem: any;
  total_length: any;
  total_page: number;
  message: any = false;
  dataloded: any = false;
  constructor(private _script: ScriptLoaderService, private appService: AppService, private cpyService: CompanyService,
    public route: ActivatedRoute, private router: Router) {

  }
  ngOnInit() {
   this.getMerchants();
  }
  ngAfterViewInit() {

  }
  getNumber() {
    return this.pageNumArray = new Array(this.total_page);

  }
  goToPage(i) {
    this.restaurantList = [];
    this.totalList.forEach((item, index) => {
      if ( i * 10 <= index && index <= i * 10 + 9) {
        this.restaurantList.push(item);
      }
    });
  }
  getMerchantByKeyword() {
    this.restaurantList = [];
    this.totalList.forEach((item, index) => {
      if (item.name === this.keyword) {
        this.restaurantList.push(item);
      }
    });
    setTimeout(() => {
      this.getNumber();
    }, 2000);
  }
  saveAccountID(item) {
    localStorage.setItem('rid', item.rid);
    localStorage.setItem('name', item.name);
    this.router.navigate(['merchant']);
  }
  getMerchants() {
    this.cpyService.getMerchants().subscribe(
      event => {
        console.log(event);
        this.totalList = event.ea_data;
        this.total_length = event.ea_data.length;
        this.total_page = Math.ceil(this.total_length / 10);
        this.totalList.forEach((item, index) => {
          if (index <= 9) {
            this.restaurantList.push(item);
          }
        });
        // this.page_num = event.ev_data.page_num;
        // this.total_page = event.ev_data.total_page;
        this.dataloded = true;
      }
      // event => {
      //   if (event.ev_error === 10011) {
      //     alert('Your account has been logged in from another device.');
      //   } else if (event.ev_error === 10001) {
      //     alert('Token Expires. Please login again.');
      //   }
      // }
    );
    setTimeout(() => {
      this.getNumber();
    }, 2000);
  }
}

