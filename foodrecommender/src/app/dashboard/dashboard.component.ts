import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { AuthService} from '../auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  configUrl = 'http://127.0.0.1:5000/predictions/';
  configGetUrl = 'http://127.0.0.1:5000/getUser/';
  configgetallURl = 'http://127.0.0.1:5000/getall/';
  rateUrl = 'http://127.0.0.1:5000/rateItem/';
  fetchedRecipe= []
  ratedValue = null;

  constructor(private http:HttpClient, private authService:AuthService) { }

  ngOnInit(): void {
    setTimeout(() => this.getUser(this.authService.uid),2000);
    
   
  }
  getUser(uid: string){
    this.http.get(this.configGetUrl + '\'' + uid + '\'').subscribe(
      (Response:any) => console.log(this.getRecommendations(Response[0])),
       (error : any) => console.log(error)
  
      );

  }
  getRecommendations(uid : any[]){
    
    this.http.get(this.configUrl+uid).subscribe(
    (response : any) =>  {
      if(response != null )console.log(this.configUrl+uid, this.fetchedRecipe = response),
     (error : any) => console.log(error)
      else{
      this.http.get(this.configgetallURl).subscribe((response : any) => console.log(this.fetchedRecipe = response),
      (error : any) => console.log(error));
     }
    }

    );
    
    
      
    
       

  }
  rateItem(recipeName : any){
    console.log(this.ratedValue, recipeName);
    this.http.get(this.rateUrl + recipeName + "/" + this.ratedValue + "/" + this.authService.uid).subscribe(
      (Response : any) => console.log(Response),
       (error : any) => console.log(error)
  
      );
  }

}




