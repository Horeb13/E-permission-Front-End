import { Component } from '@angular/core';
import { AuthService } from '../Services/Auth/auth.service';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-accessdeny',
  standalone: true,
  imports: [ButtonModule, RippleModule],
  templateUrl: './accessdeny.component.html',
  styleUrl: './accessdeny.component.css'
})
export class AccessdenyComponent {

  constructor(private authService: AuthService, private router: Router) {
     
   }

   back(){
    this.router.navigate(['/home']);
  }

}
