import { Component, Input } from '@angular/core';
import { Contact } from '../contact';
import { ContactService } from '../contact.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})

export class ContactDetailsComponent {
  @Input()
  contact: Contact;
  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;
  errorMessage : string;
  errorShow : boolean;
  crudValue : string;
  success : boolean
  constructor (private contactService: ContactService,  private route: ActivatedRoute,
              private router: Router) {}
  
  /*  methodName  : errorHandler
      description : this method is call when any web services throw an exception ans show
                   error message and navigate to login page
      @params : err (string) error message
  */
  errorHandler(err) {
    this.errorShow = true
    this.errorMessage = err
    this.router.navigate(['']);
    
  }
  
  /*  methodName  : createContact
      description : this method is call when new contact created. In this a method
                     "createContact" is call from contactService
      @params : contact (object) contact object
  */
  createContact(contact: Contact) {
    this.contactService.createContact(contact).then((newContact: Contact) => {
      this.success = true
      this.crudValue = "created"
      this.createHandler(newContact);
    }, this.errorHandler);
  }

  /*  methodName  : updateContact
      description : this method is call when we want to update the contacts. In this a
                    method "updateContact"  is call from contactService
      @params : contact (object) contact object
  */
  updateContact(contact: Contact): void {
    this.contactService.updateContact(contact).then((updatedContact: Contact) => {
      this.success = true
      this.crudValue = "updated"
      this.updateHandler(updatedContact);
    }, this.errorHandler);
  }
  /*  methodName  : deleteContact
      description : this method is call when we want to delete contact. In this a
                    method "deleteContact"  is call from contactService
      @params : contactId (String) id, whose contact is deleted
  */
  deleteContact(contactId: String): void {
    this.contactService.deleteContact(contactId).then((deletedContactId: String) => {
      this.success = true
      this.crudValue = "deleted"
      this.deleteHandler(deletedContactId);
    }, this.errorHandler);
  }
  
}