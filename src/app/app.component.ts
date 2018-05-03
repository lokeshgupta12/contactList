import { Component } from '@angular/core';
import { AlertsService } from 'angular-alert-module';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
 constructor(private alert : AlertsService) {
 	 this.alert.setDefaults('timeout',1000);
 }

}
