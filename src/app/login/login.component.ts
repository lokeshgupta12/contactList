import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from '../login.service';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  webserviceError: boolean;
  webservicePass : boolean;
  @ViewChild('f') loginForm : NgForm;
  constructor(private loginservice : LoginService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
  }

  /*  methodName  : login
      description : this method is call when we click login button. check login credentials
                    through "checkLogin" service
  */
  login() {
  	this.loginservice.checkLogin({username: this.loginForm.value.email, password: this.loginForm.value.password})
  	.then((userValue: any) => {
      this.webservicePass =true;
      this.webserviceError = false;
      localStorage.setItem('token',userValue.data.token);
        this.router.navigate(["home"]);
      }, (err) => {
        this.webserviceError = true;
      });
  }
}
