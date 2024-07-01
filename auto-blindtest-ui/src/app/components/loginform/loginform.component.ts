import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from "../../service/login.service";
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrl: './loginform.component.scss'
})
export class LoginformComponent implements OnInit{

  title = 'keycloak-angular';
  form!: FormGroup;
  error: boolean =false

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
    private primengConfig: PrimeNGConfig
  ) { }

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  login(){
    this.loginService.login(this.form.value.email,this.form.value.password)
      .subscribe({
        next: (res: any) => {
          localStorage.setItem("token", res.access_token);
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.error=true
        },
      });
  }

}
