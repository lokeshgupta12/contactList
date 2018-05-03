import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FilterPipe }from './filter.pipe';
import { AppRouting } from './app.routing';
import { AppComponent } from './app.component';
import { ContactDetailsComponent } from './contacts/contact-details/contact-details.component';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginResolver } from './guards/login.resolve';
import { LoginService } from './login.service';
import { AlertsModule } from 'angular-alert-module';
@NgModule({
  declarations: [
    AppComponent,
    ContactDetailsComponent,
    ContactListComponent,
    FilterPipe,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRouting,
    AlertsModule.forRoot()
  ],
  providers: [
   AuthGuard,
   LoginService,
   LoginResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
