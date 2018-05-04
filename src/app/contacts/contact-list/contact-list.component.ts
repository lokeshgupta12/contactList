import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact';
import { ContactService } from '../contact.service';
import { ContactDetailsComponent } from '../contact-details/contact-details.component';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
  providers: [ContactService]
})

export class ContactListComponent implements OnInit {
  searchKeyword: string;
  contacts: Contact[]
  selectedContact: Contact
  contactListError : boolean;
  errorMesage : string;
  constructor(private contactService: ContactService, private route: Router) { }
  
  /*  methodName  : ngOnInit
      description : this method is call when contact list component initialize a method
                   "getContacts" that all the contact list form database
  */
  ngOnInit() {
     this.contactService
      .getContacts()
      .then((contacts: Contact[]) => {
        this.contactListError = false;
        this.contacts = contacts.map((contact) => {
          if (!contact.phone) {
            contact.phone = {
              mobile: 0,
              work: ''
            }
          }
          return contact;
        });
      }, (err) => {
        this.errorMesage = err
        this.contactListError = true;
        localStorage.removeItem("token")
        this.route.navigate([''])
      });
  }

  /*  methodName  : getIndexOfContact
      description : this method return the contact index
      @param      : contactId(String) Id of particular contact
  */
  private getIndexOfContact = (contactId: String) => {
    return this.contacts.findIndex((contact) => {
      return contact._id === contactId;
    });
  }

  /*  methodName  : selectContact
      description : this method select particular contact
      @param      : contact(object) particular contact Item
  */
  selectContact(contact: Contact) {
    this.selectedContact = contact
  }
  
  createNewContact() {
    var contact: Contact = {
      name: '',
      email: '',
      lastname: '',
      address : '',
      linkedinurl : '',
      phone: {
        work: '',
        mobile: 0
      }
    };

    // By default, a newly-created contact will have the selected state.
    this.selectContact(contact);
  }
  
  /*  methodName  : deleteContact
      description : this method delete particular contact In list
      @params : contactId (String) id, whose contact is deleted
  */
  deleteContact = (contactId: String) => {
    var idx = this.getIndexOfContact(contactId);
    if (idx !== -1) {
      this.contacts.splice(idx, 1);
      this.selectContact(null);
    }
    return this.contacts;
  }

  /*  methodName  : createContact
      description : this method is add particular contact In list
      @params : contact (object) contact object
  */
  addContact = (contact: Contact) => {
    this.contacts.push(contact);
    this.selectContact(contact);
    return this.contacts;
  }

  /*  methodName  : signout
      description : this method remove localstroge item when we click on signout button
  */
  signout () {
    localStorage.removeItem("token")
  }

  /*  methodName  : updateContact
      description : this method is update particular contact In list
      @params : contact (object) contact object
  */
  updateContact = (contact: Contact) => {
    var idx = this.getIndexOfContact(contact._id);
    if (idx !== -1) {
      this.contacts[idx] = contact;
      this.selectContact(contact);
    }
    return this.contacts;
  }
  
}