import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactDetailsComponent } from './contacts/contact-details/contact-details.component';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { LoginComponent } from './login/login.component';
import { LoginResolver } from './guards/login.resolve';
import { AuthGuard } from './guards/auth.guard';
let routes : Routes = [
	{path : '', component : LoginComponent, resolve : {loginResolver:LoginResolver}},
	{path : 'home', component : ContactListComponent, canActivate : [AuthGuard]},
	{path : '**', redirectTo : '' }
]
@NgModule({
	declarations : [],
	imports : [RouterModule.forRoot(routes, {useHash:true})],
	exports : [RouterModule]
})
export class AppRouting {

}