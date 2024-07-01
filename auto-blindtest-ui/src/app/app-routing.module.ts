import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginformComponent} from "./components/loginform/loginform.component";
import { HomeComponent } from './components/home/home.component';
import { AdminComponent } from './components/admin/admin.component';

const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch:'full'},
  {path: '', component: AppComponent,
    children:[
      {path: 'home', component: HomeComponent},
      {path: 'admin', component: AdminComponent},
      {path: 'login', component: LoginformComponent}]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
