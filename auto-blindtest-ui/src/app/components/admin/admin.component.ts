import { Component, OnInit } from '@angular/core';
import { LoginService } from "../../service/login.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private loginService:LoginService, private router:Router) { }

  ngOnInit(): void {
    if(!this.loginService.getIsAdmin()){
      this.router.navigate(['/home'])
    }
  }

}
