import { Injectable } from '@angular/core';
import {Location} from '@angular/common'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class LoginService  {
  constructor(public location:Location,private http:HttpClient) { }

  public login(user:string,password:string):Observable<any> {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded;'
    );

    const body = new HttpParams()
      .set('grant_type', 'password')
      .set('username', user)
      .set('password', password)
      .set('client_id', 'autoblindtest-auth')
      .set('client_secret', 'FXiYJsY0YaDT9IKiBn4IPtMOL66LHu8o');

    return this.http.post(
      'http://localhost:9090/realms/autoblindtest-app/protocol/openid-connect/token',
      body,
      {headers: headers }
    )
  }

  public logout()  {
    localStorage.clear();
    location.reload()
  }

  public getIsLogged(): boolean {
    return (localStorage.getItem('token')!=null);
  }

  public getUsername() {
    if(this.getIsLogged()){
      const token = localStorage!.getItem('token');
      const payload = token!.split('.')[1];
      const payloadDecodedJson = atob(payload);
      const payloadDecoded = JSON.parse(payloadDecodedJson);
      return payloadDecoded.preferred_username ;
    }
  }

  public getIsAdmin() {
    const token = localStorage.getItem('token');
    const payload = token!.split('.')[1];
    const payloadDecodedJson = atob(payload);
    const payloadDecoded = JSON.parse(payloadDecodedJson);
    console.log(payloadDecoded.resource_access["autoblindtest-auth"].roles);
    return payloadDecoded.resource_access["autoblindtest-auth"].roles.indexOf('admin') !== -1;
  }

}
