import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user-service';

@Component({
  selector: 'app-cabecera',
  standalone: false,
  templateUrl: './cabecera.html',
  styleUrl: './cabecera.css'
})
export class Cabecera {
 username: string = "";


  constructor (private userService: UserService, private router: Router){}

  ngOnInit(){
    this.CargaCabecera();
  }

CargaCabecera() {
  const id = this.userService.getUserIdActual();
  this.userService.getById(id).subscribe({
    next: (data: User) => {
      console.log('Usuario recibido:', data);
      this.username = data.authorities; // ← Si authorities contiene el nombre real
      // O usar otro campo si lo detectás por consola
    },
    error: err => console.log(err)
  });
}

  Logout() {
    this.userService.logout();
    this.router.navigate(["/"]);
  }

  HayUsuarioLogeado(){
    return this.userService.isLogged();
  }


}
