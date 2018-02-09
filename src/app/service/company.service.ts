import {
Injectable
} from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()

export class CompanyService {
  constructor(private http: Http) {

  }
// init & handle error start
  getMerchants() {
    const headers = new Headers({
      'Authortoken': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxODc4NSIsImV4cGlyZWQiOjE1MjE4MzUyMDAsImxhc3Rsb2dpbiI6MTUxNTc3Njg5NX0.73wP3ohvwVK5dGRVySQQpqiv-7JlJKUIxHYC5tNryFI',
      'Content-Type': 'application/json'
    });
    const options = new RequestOptions({ headers: headers });

    return this.http
      .get('https://chanmao.us/api/v1/rr_info', { headers: headers}
      ).map((response: Response) => {
        return response.json();
      }).catch(this.handleError);
  }
  private handleError(error: Response) {
    return Observable.throw(error.json());
  }
// init & handle error end

// type start
  getDishRank(rid) {
    const headers = new Headers({
      'Authortoken': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxODc4NSIsImV4cGlyZWQiOjE1MDg4NzUyMDAsImxhc3Rsb2dpbiI6MTUwMjgyNDYwN30.jIbVCvagC6B3NFKgOPmLAeYeWIFRdOH8dsIRHhgiQBs',
      'Content-Type': 'application/json'
    });
    const body = {
      'iv_rid': 5
    };
    const options = new RequestOptions({ headers: headers });

    return this.http
      .post('https://norgta.com/api/manage/v1/get_dish_cat_rank', body, {headers: headers}
      ).map((response: Response) => {
        return response.json();
      }).catch(this.handleError);
  }
  editDishRank(ia_data) {
    const headers = new Headers({
      'Authortoken': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxODc4NSIsImV4cGlyZWQiOjE1MDg4NzUyMDAsImxhc3Rsb2dpbiI6MTUwMjgyNDYwN30.jIbVCvagC6B3NFKgOPmLAeYeWIFRdOH8dsIRHhgiQBs',
      'Content-Type': 'application/json'
    });
    const body = {
      'ia_rank_list': ia_data
    };
    const options = new RequestOptions({ headers: headers });

    return this.http
      .put('https://norgta.com/api/manage/v1/edit_dish_cat_rank', body, {headers: headers}
      ).map((response: Response) => {
        return response.json();
      }).catch(this.handleError);
  }
// type end
// dish start
getDishList(rid, keyword) {
  const headers = new Headers({
    'Authortoken': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxODc4NSIsImV4cGlyZWQiOjE1MDg4NzUyMDAsImxhc3Rsb2dpbiI6MTUwMjgyNDYwN30.jIbVCvagC6B3NFKgOPmLAeYeWIFRdOH8dsIRHhgiQBs',
    'Content-Type': 'application/json'
  });
  const body = {
    'rid': 5,
    'key': keyword
  };
  const options = new RequestOptions({ headers: headers });

  return this.http
    .post('http://norgta.com/api/manage/v1/get_dishes', body, {headers: headers}
    ).map((response: Response) => {
      return response.json();
    }).catch(this.handleError);
}
setDishList(data) {
  const headers = new Headers({
    'Authortoken': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxODc4NSIsImV4cGlyZWQiOjE1MDg4NzUyMDAsImxhc3Rsb2dpbiI6MTUwMjgyNDYwN30.jIbVCvagC6B3NFKgOPmLAeYeWIFRdOH8dsIRHhgiQBs',
    'Content-Type': 'application/json'
  });
  const body = {
    'rid': parseInt(data.rid, 10),
    'int_no': data.int_no,
    'dt_id': parseInt(data.dt_id, 10),
    'ds_name': data.ds_name,
    'ds_price': data.ds_price,
    'tpgs': data.tpgs
  };
  const options = new RequestOptions({ headers: headers });

  return this.http
    .post('http://norgta.com/api/manage/v1/set_dish', body, {headers: headers}
    ).map((response: Response) => {
      return response.json();
    }).catch(this.handleError);
}
setDishStatus(data) {
  const headers = new Headers({
    'Authortoken': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxODc4NSIsImV4cGlyZWQiOjE1MDg4NzUyMDAsImxhc3Rsb2dpbiI6MTUwMjgyNDYwN30.jIbVCvagC6B3NFKgOPmLAeYeWIFRdOH8dsIRHhgiQBs',
    'Content-Type': 'application/json'
  });
  const body = {
    'ds_id': data.ds_id,
    'status': data.status
  };
  const options = new RequestOptions({ headers: headers });

  return this.http
    .post('http://norgta.com/api/manage/v1/set_dish_status', body, {headers: headers}
    ).map((response: Response) => {
      return response.json();
    }).catch(this.handleError);
}
// dish end

// topping start
getToppingList(keyword) {
  const headers = new Headers({
    'Authortoken': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxODc4NSIsImV4cGlyZWQiOjE1MDg4NzUyMDAsImxhc3Rsb2dpbiI6MTUwMjgyNDYwN30.jIbVCvagC6B3NFKgOPmLAeYeWIFRdOH8dsIRHhgiQBs',
    'Content-Type': 'application/json'
  });
  const body = {
    'key': keyword
  };
  const options = new RequestOptions({ headers: headers });

  return this.http
    .post('http://norgta.com/api/manage/v1/find_tpgs', body, {headers: headers}
    ).map((response: Response) => {
      return response.json();
    }).catch(this.handleError);
}
saveToppingList(data) {
  const headers = new Headers({
    'Authortoken': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxODc4NSIsImV4cGlyZWQiOjE1MDg4NzUyMDAsImxhc3Rsb2dpbiI6MTUwMjgyNDYwN30.jIbVCvagC6B3NFKgOPmLAeYeWIFRdOH8dsIRHhgiQBs',
    'Content-Type': 'application/json'
  });
  const body = {
    'tpg_id': data.tpg_id ,
    'tpg_name': data.tpg_name,
    'tpg_note': data.tpg_note,
    'tpg_limit': parseInt(data.tpg_limit, 10),
     'tps': data.tps
  };
  const options = new RequestOptions({ headers: headers });

  return this.http
    .post('http://norgta.com/api/manage/v1/set_tpg', body, {headers: headers}
    ).map((response: Response) => {
      return response.json();
    }).catch(this.handleError);
}
deleteTopping(data) {
  const headers = new Headers({
    'Authortoken': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxODc4NSIsImV4cGlyZWQiOjE1MDg4NzUyMDAsImxhc3Rsb2dpbiI6MTUwMjgyNDYwN30.jIbVCvagC6B3NFKgOPmLAeYeWIFRdOH8dsIRHhgiQBs',
    'Content-Type': 'application/json'
  });
  const body = {
    'tpg_id': data.tpg_id
  };
  const options = new RequestOptions({ headers: headers });

  return this.http
    .post('http://norgta.com/api/manage/v1/delete_tpg', body, {headers: headers}
    ).map((response: Response) => {
      return response.json();
    }).catch(this.handleError);
}

// topping end
}