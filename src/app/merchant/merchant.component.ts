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
  editDish: any = {};
  editTopping: any = {};
  editing: any = false;
  dishRank: any = [];
  editDishList: any = [];
  edittoppingList: any = [];
  dishList: any = [];
  toppingList: any = [];
  name: any;
  typeOptions: any = [];
  status: any = 'dish';
  keyword: any = '';
  constructor(private _script: ScriptLoaderService, private appService: AppService, private cpyService: CompanyService) {

  }
// init

  ngOnInit() {
      this.rid = localStorage.getItem('rid');
      this.name = localStorage.getItem('name');
      this.getDishRank();
  }
  ngAfterViewInit() {
    this._script.load('app-merchant',
        'assets/bootstrap-notify.js');
  }
  addProp1(e) {
         console.log(e);
 }
 search() {
   if (this.status === 'dish') {
     this.getDishList();
   } else if (this.status === 'second') {
    this.getToppingList(this.keyword);
   }
 }
// init end
// type start
  getDishRank() {
      this.typeOptions = [];
      this.cpyService.getDishRank(this.rid).subscribe(
        event => {
          this.dishRank = event.ea_data;
          this.dataLoded = true;
          this.dishRank.forEach(item => {
              const data = {
                dt_id: 0,
                name: ''
              };
              data.dt_id = item.dt_id;
              data.name = item.name;
              this.typeOptions.push(data);
          });
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
        if (event.ev_error === 0) {
          alert('添加成功');
        }
      },
      event => {
        alert('添加失败');
      }
    );
     setTimeout(() => {
      this.getDishRank();
     }, 1000);
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
// type end
// edit start
  startEditing(item) {
    if (!item.isEditing) {
      item.isEditing = true;
    }
    if (item.level) {
      this.startRank = item.level;
    }
  }
  cancelEditing(item) {
      item.isEditing = false;
  }
  startEditingTopping(item) {
    if (!item.isEditing) {
      item.isEditing = true;
    }
  }
  cancelEditingTopping(item) {
    item.isEditing = false;
  }
// edit end

// dish start
getDishList() {
  this.cpyService.getDishList(this.rid, this.keyword).subscribe(
    event => {
      if (event.ev_error === 0) {
        this.dishList = event.ea_dishes;
        this.dataLoded = true;
        this.dishList.forEach(item => {
          if (item.status === 0) {
            item.status = true;
          } else if (item.status === 1) {
            item.status = false;
          }
        });
      }

    },
    event => {
      if (event.ev_error === 10011) {
        alert('Your account has been logged in from another device.');
      } else if (event.ev_error === 10001) {
        alert('Token Expires. Please login again.');
      } else {
        alert('添加失败');
      }
    }
  );
}
getDishDetail(item) {
  this.editDish = item;
  this.editDishList = this.editDish.tpgs;
}
addTopping(item) {
  this.editDishList.push(item);
}
setDishList() {
  console.log(this.editDish);
  this.editDish.tpgs = this.editDishList;
  this.editDish.rid = this.rid;
  this.editDishList.forEach(item => {
    delete item.tpg_limit;
    delete item.tpg_note;
    delete item.tps;
  });
  this.cpyService.setDishList(this.editDish).subscribe(
    event => {
      if (event.ev_error === 0) {
        alert('添加成功');
      }
    },
    event => {
      alert('添加失败');
    }
  );
  this.keyword = '';
  this.toppingList = [];
  setTimeout(() => {
    this.getDishList();
  }, 1000);
}
addNewDish() {
  this.editDishList = [];
  this.editDish = {};
}
setDishStatus(item) {
  if (item.status === false) {
    item.status = 1;
  } else if (item.status === true) {
    item.status = 0;
  }

  this.cpyService.setDishStatus(item).subscribe(
    event => {
      if (event.ev_error === 0) {
        alert('修改成功');
      }
    },
    event => {
      alert('修改失败');
    }
  );
  setTimeout(() => {
    this.getDishList();
  }, 1000);
}
// dish end

// topping start
initToppingList() {
  this.keyword = '';
  this.getToppingList(this.keyword);
}
getToppingList(keyword) {
  this.cpyService.getToppingList(keyword).subscribe(
    event => {
      this.toppingList = event.ea_tpgs;
      this.dataLoded = true;
      this.toppingList.forEach(item => {
        if (item.tps.length === 0) {
          item.tps.push({});
        }
      });
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
getToppings(item) {
  this.editTopping = item;
  this.edittoppingList = this.editTopping.tps;
}
addNewTopping() {
  this.edittoppingList.push({
    isEditing: true,
    tp_name: '',
    tp_price: '0.00'
  });
}
deleteToppings(item) {
  this.cpyService.deleteTopping(item).subscribe(
    event => {
      console.log(event);
    }
  );
  setTimeout(() => {
    this.initToppingList();

  }, 1000);

}
deleteTopping(item) {
  this.edittoppingList = this.edittoppingList.filter(function(el) {
    return el.tp_id !== item.tp_id;
});
}
saveEditTopping() {
  this.edittoppingList.forEach(item => {
    delete item.isEditing;
  });
  this.editTopping.tps = this.edittoppingList;
  this.cpyService.saveToppingList(this.editTopping).subscribe(
    event => {
      alert('添加成功');
    },
    event => {
      alert('添加失败');
    },
  );
  setTimeout(() => {
    this.initToppingList();
  }, 1000);

}
//  topping end
}
