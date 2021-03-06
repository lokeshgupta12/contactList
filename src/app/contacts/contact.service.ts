import { Injectable } from '@angular/core';
import { Contact } from './contact';
import { Http, Response,Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ContactService {
    private contactsUrl = '/api/contacts';
    // set token in header
    private headers = new Headers({
      token : localStorage.getItem('token')
    })
    constructor (private http: Http) {}

    // get("/api/contacts")
    getContacts(): Promise<Contact[]> {
      return this.http.get(this.contactsUrl, {headers: this.headers})
                 .toPromise()
                 .then(response => response.json() as Contact[])
                 .catch(this.handleError);
    }

    // post("/api/contacts")
    createContact(newContact: Contact): Promise<Contact> {
      return this.http.post(this.contactsUrl, newContact, {headers: this.headers})
                 .toPromise()
                 .then(response => response.json() as Contact)
                 .catch(this.handleError);
    }

    // get("/api/contacts/:id") endpoint not used by Angular app

    // delete("/api/contacts/:id")
    deleteContact(delContactId: String): Promise<String> {
      return this.http.delete(this.contactsUrl + '/' + delContactId, {headers: this.headers})
                 .toPromise()
                 .then(response => response.json() as String)
                 .catch(this.handleError);
    }

    // put("/api/contacts/:id")
    updateContact(putContact: Contact): Promise<Contact> {
      var putUrl = this.contactsUrl + '/' + putContact._id;
      return this.http.put(putUrl, putContact, {headers: this.headers})
                 .toPromise()
                 .then(response => response.json() as Contact)
                 .catch(this.handleError);
    }
    // handle errors
    private handleError (error: any): Promise<any> {
      let errorMessage = JSON.parse(error._body).error
      let errMsg = (errorMessage) ? errorMessage :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console
      return Promise.reject(errMsg);
    }
}