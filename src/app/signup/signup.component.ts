import { Component, OnInit } from '@angular/core';
import { AuthService} from '../auth.service';
import { auth } from 'firebase/app';
import { app } from 'firebase/app';
import 'firebase/auth';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  email: string;
  password: string;

  constructor(public authService: AuthService) {
   this.email='';
    this.password='';
  }

  ngOnInit() {
  }

  signup(email: string, password: string) {
    this.email = email;
    this.password = password;
    this.authService.signup(this.email, this.password);
    this.email = this.password = '';
  }


}