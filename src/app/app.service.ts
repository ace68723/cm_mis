import {
  Injectable
} from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AppService {

  constructor(private http: Http) {

  }

  getCompanyInfo() {
    const headers = new Headers({
      'Auth-Token': localStorage.getItem('token'),
      'Content-Type': 'application/json'
    });
    const options = new RequestOptions({ headers: headers });

    return this.http
      .post('https://mcfpayapi.ca/api/v1/mgt/get_company_info/', {}, { headers: headers}
      ).map((response: Response) => {
        return response.json();
      }).catch(this.handleError);
  }

  login(model) {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const body = {
      'username': model.username,
      'password': model.password,
      'version': 'v0.1'
    };
    const options = new RequestOptions({ headers: headers });

    return this.http
      .post('https://mcfpayapi.ca/mgt/login/', body, {headers: headers}
      ).map((response: Response) => {
        return response.json();
      }).catch(this.handleError);
  }
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('token');
  }

  private handleError(error: Response) {
    return Observable.throw(error.json());
  }

}
