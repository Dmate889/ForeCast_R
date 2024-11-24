import { Component } from '@angular/core';

@Component({
  selector: 'app-login-page',
  standalone: false,
  
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {


  loginUser(event:any){
    event.preventDefault();

    const username = event.target.elements.username.value.trim();
    const password = event.target.elements.password.value.trim();

    

  }
}
