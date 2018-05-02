export class Contact {
  _id?: string;
  name: string;
  email: string;
  lastname: string;
  address : string;
  linkedinurl : string;
  phone: {
    mobile: number;
    work: string;
  }
}