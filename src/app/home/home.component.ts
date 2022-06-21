import { Component, OnInit } from '@angular/core';
import  { Router } from '@angular/router';

import { AuthService} from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  constructor(private authService : AuthService) {
    
    
   }


  ngOnInit(): void {
  }
  
  login(email: string, password: string){
    this.authService.login(email, password);
    
  }


}
