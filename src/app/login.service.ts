import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
@Injectable()
export class LoginService {
private loginUrl = '/api/login';
  constructor(private http: Http) { }
 // check login credentials
  checkLogin(userValue: object): Promise<any> {
      return this.http.post(this.loginUrl, userValue)
                 .toPromise()
                 .then(response => response.json())
                 .catch(this.handleError);
    }
   
   // handle error
    private handleError (error: any): Promise<any> {
      let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      return Promise.reject(errMsg);
    }
}
