import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatButtonModule, RouterLink, JsonPipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  authServie = inject(AuthService);

  isLoggedIn(){
    return this.authServie.isLoggedIn();
  }

  getRole(){
    return this.authServie.getRole();
  }

  logout(){
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('token');
  }
}
