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
  page_num: number = 1;
  new_merchant_id: any;
  restaurantList: any = [];
  totalList: any = [];
  pageNumArray: any = [];
  searchList: any = [];
  page_size: number;
  newUser: any = false;
  i: any;
  keyword: any = '';
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
  searchRestaurantList() {
    this.searchList = [];
    this.restaurantList.forEach(restaurant => {
     if (restaurant.name.includes(this.keyword)) {
       this.searchList.push(restaurant);
     }
    });
  }
  saveAccountID(item) {
    localStorage.setItem('rid', item.rid);
    localStorage.setItem('name', item.name);
    this.router.navigate(['merchant']);
  }
  getMerchants() {
    this.restaurantList = [];
    this.cpyService.getMerchants().subscribe(
      event => {
        this.restaurantList = event.ea_data;
      }
    );
  }
}

