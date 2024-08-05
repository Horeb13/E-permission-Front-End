import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/Auth/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  currentUser: any;

  constructor(private authService: AuthService) {
    
  }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentuser();
    console.log(this.currentUser);
  }

}
