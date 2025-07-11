import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
 
import { tap } from 'rxjs';
import { Token } from '../models/token';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  ruta_servidor: string = "http://localhost:8082/socrates";
  recurso: string = "users";

  constructor(private http:HttpClient) { }


  login(user: User) {
    this.logout();
    return this.http.post<Token>(this.ruta_servidor+"/"+this.recurso+"/"+"login",user).pipe(
    tap((data: Token) => {
      localStorage.setItem('jwtToken',  data.jwtToken);
      localStorage.setItem('user_id',   data.id.toString());
      // antes: localStorage.setItem('authorities', data.authorities);
     localStorage.setItem('authorities', JSON.stringify(data.authorities));

    })
    );
  }
  
  logout() {
    if (typeof localStorage !== "undefined") {
        localStorage.clear();
    }    
  }

  isLogged() {
    if(this.getUserIdActual()!=0) {
      return true;
    }
    return false;
  }

  getById(id: number) {
      return this.http.get<User>(this.ruta_servidor+"/"+this.recurso+"/"+id.toString());
  }
  
  getUserIdActual() {
    if (typeof localStorage !== "undefined") {
      if (localStorage.getItem('user_id')!==null)
        return parseInt(localStorage.getItem('user_id')!.toString());
    }
    return 0;
  }

  getTokenActual() {
    if (typeof localStorage !== "undefined") {
        return localStorage.getItem('jwtToken') || '';
    }
    return "";
  }

  geAuthoritiesActual() {
    if (typeof localStorage !== "undefined") {
        return localStorage.getItem('authorities');
    }
    return "";
  }

}
