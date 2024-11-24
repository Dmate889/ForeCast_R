import { Component } from '@angular/core';
import { LoginServiceService } from '../services/login-service.service';


@Component({
  selector: 'app-login-page',
  standalone: false,
  
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  constructor(private loginservice: LoginServiceService){}

  loginUser(event:any){
    event.preventDefault();

    const username = event.target.elements.username.value.trim();
    const password = event.target.elements.password.value.trim();

    this.loginservice.loginUser(username,password).subscribe( response => {
      console.log('User logged in!');
      
      const token = response.token;
      localStorage.setItem('jwtToken', token);

    },

    errr =>{
      alert('Invalid username or password');
    }
  )};

  
}
