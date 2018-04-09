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
  tpkeyword: any = '';
  dataLoded: any = false;
  success: any = false;
  level: any = false;
  fail: any = false;
  startRank: any;
  endRank: any;
  dishShow: any = false;
  totalList: any = [];
  filterList: any = [];
  editDish: any = {};
  editTopping: any = {};
  tpListCopy: any = [];
  editing: any = false;
  dishRank: any = [];
  editDishList: any = [];
  edittoppingList: any = [];
  dishList: any = [];
  searchList: any = [];
  searchTpList: any = [];
  toppingList: any = [];
  name: any;
  new_name: any;
  i: any;
  typeOptions: any = [];
  status: any = 'dish';
  keyword: any = '';
  total_length: any;
  total_page: number;
  pageNumArray: any = [];
  page_num: number = 1;
  filter: any = false;
  j: number;
  constructor(private _script: ScriptLoaderService, private appService: AppService, private cpyService: CompanyService) {

  }
// init
  ngOnInit() {
      this.rid = localStorage.getItem('rid');
      this.name = localStorage.getItem('name');
      this.getDishRank();
      this.getDishList();
      this.getToppingList();
  }
  addToTpg(topping) {
    if(!this.editDish.tpgs) {
      this.editDish.tpgs = [];
    }
    topping.selected = true;
    this.editDish.tpgs.push({
      tpg_id: topping.tpg_id,
      tpg_name: topping.tpg_name
    });
  }
  checkImage(topping) {
    // const test = this.editDishList.includes({
    //   tpg_id: topping.tpg_id,
    //   tpg_name: topping.tpg_name,
    // });
    // console.log(test);
    // return test;
    // for (let j = 0, len = this.editDishList.length; j < len; j++) {
    //   if (this.editDishList[j].tpg_id === topping.tpg_id) {
    //     break;
    //   }     console.log(j);

    // }
  //   try {

  // console.log(this.toppingList)
  // console.log(this.editDish)
  //   return this.editDish.tpgs.forEach(item => {
  //     if (item.tpg_id === topping.tpg_id) {
  //       return true;
  //     }
  //     return false;
  //   });
  }

  ngAfterViewInit() {
    this._script.load('app-merchant',
        'assets/bootstrap-notify.js');
  }
  addProp1(e) {
         console.log(e);
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
  addDishRank() {
    const lo_data = {
      name: this.new_name,
      rid: this.rid
    };
    this.cpyService.addDishRank(lo_data).subscribe(
      event => {
        if (event.ev_error === 0) {
          this.new_name = '';
          this.success = true;
          setTimeout(() => {
            this.success = false;
          }, 2000);
        }
      },
      event => {
        this.fail = true;
          setTimeout(() => {
            this.fail = false;
          }, 3000);
      }
    );
    setTimeout(() => {
      this.getDishRank();
     }, 1000);
  }
  saveToDatabase() {
    const newLevel = [];
    this.dishRank.forEach(element => {
      if (element.level !== 0) {
        newLevel.push(element);
      }
    });
    for (let i = 0 ; i < newLevel.length ; i ++) {
      for (let j = i + 1 ; j < newLevel.length ; j ++) {
         if (newLevel[i].level === newLevel[j].level) {
          this.level = true;
          setTimeout(() => {
            this.level = false;
          }, 2000);
            return;
         }
      }
    }
    const rankList = [];
    this.dishRank.forEach(dish => {
      const data = {
        dt_id: 0,
        name: '',
        status: 0,
        level: 0
      };
      data.dt_id = dish.dt_id;
      data.name = dish.name;
      data.status = dish.status;
      data.level = parseInt(dish.level, 10);
      rankList.push(data);
    });
    this.cpyService.editDishRank(rankList).subscribe(
      event => {
        if (event.ev_error === 0) {
          this.success = true;
          setTimeout(() => {
            this.success = false;
          }, 1500);
        }
      },
      event => {
        this.fail = true;
          setTimeout(() => {
            this.fail = false;
          }, 3000);
      }
    );
     setTimeout(() => {
      this.getDishRank();
     }, 1000);
  }
  DeleteCategory(item) {
    item.status = 9;
    const rankList = [];
    this.dishRank.forEach(dish => {
      const data = {
        dt_id: 0,
        name: '',
        status: 0,
        level: 0
      };
      data.dt_id = dish.dt_id;
      data.name = dish.name;
      data.status = dish.status;
      data.level = parseInt(dish.level, 10);
      rankList.push(data);
    });
    this.cpyService.editDishRank(rankList).subscribe(
      event => {
        if (event.ev_error === 0) {
          this.success = true;
          setTimeout(() => {
            this.success = false;
          }, 1500);
        }
      },
      event => {
        this.fail = true;
        setTimeout(() => {
          this.fail = false;
        }, 3000);
        setTimeout(() => {
          this.getDishRank();
         }, 1000);
      }
    );

  }
  saveDishRank(item) {
    this.cancelEditing(item);
  }
// type end

// edit start
  startEditing(item) {
    if (!item.isEditing) {
      item.isEditing = true;
    }
    this.startRank = item.level;
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
findByType(item) {
  this.keyword = '';
  this.filter = true;
  this.filterList = [];
  this.dishList.forEach(dish => {
    if (dish.dt_id === item.dt_id) {
      this.filterList.push(dish);
    }
   });
}
searchDishList() {
  this.filter = false;
  this.searchList = [];
  this.dishList.forEach(dish => {
   if (dish.ds_name.includes(this.keyword)) {
     this.searchList.push(dish);
   }
  });
}
async getDishList() {
  this.page_num = 1;
  this.dishList = [];
  this.cpyService.getDishList(this.rid, this.keyword).subscribe(
    event => {
      if (event.ev_error === 0) {
        this.dishList = event.ea_dishes;
        this.dishList.forEach(dish => {
          if (dish.status === 1) {
            dish.status = false;
          } else if (dish.status === 0) {
            dish.status = true;
          }
        });
        event.ea_dishes.sort(function(a, b){
          return parseInt(a.dt_id, 10)  - parseInt(b.dt_id, 10);
        });
      }
    },
    event => {
      if (event.ev_error === 10011) {
        alert('Your account has been logged in from another device.');
      } else if (event.ev_error === 10001) {
        alert('Token Expires. Please login again.');
      } else {
        this.fail = true;
        setTimeout(() => {
          this.fail = false;
        }, 3000);
      }
    }
  );
  return;
}
getDishDetail(item) {
  this.toppingList.forEach(element => {
    delete element.selected;
  });
  this.dishShow = true;
  this.editDish = item;
  this.editDishList = this.editDish.tpgs;
  for (let i = 0; i < this.editDishList.length; i ++) {
   const tpIndex =  this.toppingList.findIndex(
    x => x.tpg_id === this.editDishList[i].tpg_id);
    this.toppingList[tpIndex].selected = true;
  }
}
submit() {
  console.log('try');
}
addTopping(item) {
  this.editDishList.push(item);
}
setDishList() {
  const goTopage = this.page_num - 1;
  this.editDish.tpgs = this.editDishList;
  this.editDish.rid = this.rid;
  this.editDishList.forEach(item => {
    delete item.tpg_max_limit;
    delete item.tpg_min_limit;
    delete item.tpg_note;
    delete item.tps;
  });
  if (this.editDish.ds_id) {
    this.cpyService.setDishList(this.editDish).subscribe(
      event => {
        if (event.ev_error === 0) {
          this.success = true;
          setTimeout(() => {
            this.success = false;
          }, 1500);
        }
      },
      event => {
        this.fail = true;
          setTimeout(() => {
            this.fail = false;
          }, 3000);
        setTimeout(() => {
          this.getDishList();
       }, 1000);
      }
    );
  } else {
    this.cpyService.addDishList(this.editDish).subscribe(
      event => {
        if (event.ev_error === 0) {
          this.success = true;
          setTimeout(() => {
            this.success = false;
          }, 1500);
          return;
        }
      },
      event => {
        this.fail = true;
          setTimeout(() => {
            this.fail = false;
          }, 3000);
        setTimeout(() => {
          this.getDishList();
       }, 1000);
      }
    );
  }

  this.keyword = '';

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
        this.success = true;
          setTimeout(() => {
            this.success = false;
          }, 1500);
      }
    },
    event => {
      this.fail = true;
          setTimeout(() => {
            this.fail = false;
          }, 3000);
      setTimeout(() => {
        this.getDishList();
      }, 1000);
    }
  );

}
deleteDish(item) {
  this.cpyService.deleteDish(item).subscribe(
    event => {
      if (event.ev_error === 0) {
        this.success = true;
          setTimeout(() => {
            this.success = false;
          }, 1500);
      }
    },
    event => {
      setTimeout(() => {
        this.getDishList();
      }, 1000);
      this.fail = true;
          setTimeout(() => {
            this.fail = false;
          }, 3000);
    }
  );
}
deleteToppingGroup(item) {
  item.selected = false;
  this.editDishList = this.editDishList.filter(function(el) {
    return el.tpg_id !== item.tpg_id;
});

}
// dish end

// topping start
  getToppingList() {
    this.toppingList = [];
    this.cpyService.getToppingList(this.rid).subscribe(
      event => {
        this.toppingList = event.ea_tpgs;
        this.tpListCopy = this.toppingList.slice();
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
    this.toppingList = [];
    this.edittoppingList.push({
      isEditing: true,
      tp_name: '',
      tp_price: '0.00'
    });
  }
  deleteToppings(item) {
    this.cpyService.deleteTopping(item).subscribe(
      event => {
        if (event.ev_error === 0) {
          this.success = true;
          setTimeout(() => {
            this.success = false;
          }, 2000);
        }
      },
      event => {
        this.fail = true;
          setTimeout(() => {
            this.fail = false;
          }, 3000);
      }
    );
    setTimeout(() => {
      this.getToppingList();

    }, 1000);

  }
  deleteTopping(item) {
    this.edittoppingList = this.edittoppingList.filter(function(el) {
      return el.tp_id !== item.tp_id;
  });
  }
  searchTopList() {
    this.searchTpList = [];
    this.toppingList.forEach(dish => {
     if (dish.tpg_name.includes(this.tpkeyword)) {
       this.searchTpList.push(dish);
     }
    });
  }
  saveEditTopping() {
    this.edittoppingList.forEach(item => {
      delete item.isEditing;
    });
    this.editTopping.tps = this.edittoppingList;
    if (!this.editTopping.tpg_note) {
      this.editTopping.tpg_note = '';
    }
    this.cpyService.saveToppingList(this.rid, this.editTopping).subscribe(
      event => {
        this.success = true;
          setTimeout(() => {
            this.success = false;
          }, 1500);
        this.editTopping = {};
        this.edittoppingList = [];
      },
      event => {
        this.fail = true;
          setTimeout(() => {
            this.fail = false;
          }, 3000);
      },
    );
    setTimeout(() => {
      this.getToppingList();
    }, 1000);

  }
  
//  topping end
}
