import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { AuthService} from '../auth.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


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
  details = 'http://127.0.0.1:5000/get_recipe_details/';
  fetchedRecipe= []
  Recipedetail=[]
  actual_uid : string | undefined
  ratedValue = null;
  closeResult: string | undefined;
  

  constructor(private http:HttpClient, private authService:AuthService,private modalService: NgbModal) { }

  ngOnInit(): void {
     setTimeout(() => this.getUser(this.authService.uid),2000);
    
   
  }
  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;this.Recipedetail = []
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }


  getUser(uid: string){
    this.actual_uid = uid
    this.http.get(this.configGetUrl + '\'' + uid + '\'').subscribe(
      (Response:any) => console.log(this.getRecommendations(Response[0])),
       (error : any) => console.log(error)
  
      );

  }
  getRecommendations(uid : any){
    
    
    this.http.get(this.configUrl+uid).subscribe(
    (response : any) =>  {
      if(response != null )console.log(this.configUrl+uid, this.fetchedRecipe = response),
     (error : any) => console.log(error)
      else {
      this.http.get(this.configgetallURl).subscribe((response : any) => console.log(this.fetchedRecipe = response),
      (error : any) => console.log(error));
     }
    }

    );
    
    
      
    
       

  }
  rateItem(recipeName : any){
    console.log(this.ratedValue, recipeName);
    this.http.get(this.rateUrl + recipeName + "/" + this.ratedValue + "/" + this.authService.uid).subscribe(
      (Response : any) => console.log(Response[0]),
       (error : any) => console.log(error)
  
      );
  }
  getdetails(recipedetails : any){
    this.http.get(this.details + recipedetails).subscribe((Response : any) => console.log(this.details + recipedetails,this.Recipedetail = Response[0]), (error : any) => console.log(error));
  }

}





