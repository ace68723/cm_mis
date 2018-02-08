import {
Injectable
} from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()

export class CompanyService {
  constructor(private http: Http) {

  }
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
  private handleError(error: Response) {
    return Observable.throw(error.json());
  }

}