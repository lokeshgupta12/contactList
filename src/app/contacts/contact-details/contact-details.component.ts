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
  errorHandler(err) {
    this.errorShow = true
    this.errorMessage = err
    this.router.navigate(['']);
    
  }
  createContact(contact: Contact) {
    this.contactService.createContact(contact).then((newContact: Contact) => {
      this.success = true
      this.crudValue = "created"
      this.createHandler(newContact);
    }, this.errorHandler);
  }

  updateContact(contact: Contact): void {
    this.contactService.updateContact(contact).then((updatedContact: Contact) => {
      this.success = true
      this.crudValue = "updated"
      this.updateHandler(updatedContact);
    }, this.errorHandler);
  }

  deleteContact(contactId: String): void {
    this.contactService.deleteContact(contactId).then((deletedContactId: String) => {
      this.success = true
      this.crudValue = "deleted"
      this.deleteHandler(deletedContactId);
    }, this.errorHandler);
  }
  
}