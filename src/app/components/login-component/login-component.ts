import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user-service';
import { User } from '../../models/user';
@Component({
  selector: 'app-login-component',
  standalone: false,
  templateUrl: './login-component.html',
  styleUrl: './login-component.css'
})
export class LoginComponent {

loginForm!: FormGroup;
ocultarPassword:boolean=true;

constructor (private formBuilder: FormBuilder, private userService: UserService,  private router: Router) {}


  ngOnInit(){
    this.userService.logout();
    this.CargaFormulario();
  }

  
  CargaFormulario(){
    this.loginForm = this.formBuilder.group({
      username:["",[Validators.required]],
      password:["",[Validators.required]]
      
    })
  }

  Login() {

    const user:User = {
            username: this.loginForm.get("username")?.value,
            password: this.loginForm.get("password")?.value,            
            id:0,
            authorities:""
        };


     this.userService.login(user).subscribe({
  next: data => {
    // guarda token y roles (si lo necesitas)
    localStorage.setItem('jwtToken', data.jwtToken);
    localStorage.setItem('authorities', JSON.stringify(data.authorities));

    // navegamos sin guards
    if (data.authorities.includes('ROLE_ADMIN')) {
      this.router.navigate(['/admin-home']);
    } else {
      this.router.navigate(['/user-home']);
    }
  },
  error: err => console.error(err)
});
  }


}
