import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Inject } from '@angular/core';
import { NgModule } from '@angular/core';
import {RouterModule, Routes}  from '@angular/router';
import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from'@angular/common/http';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule} from '@angular/fire/analytics';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import {environment} from '../environments/environment';
//import 'firebase';
import {AuthService} from './auth.service';
import { SignupComponent } from './signup/signup.component';
//import { HttpModule } from '@angular/common/http';

const appRoutes: Routes = [{path : '', component :  HomeComponent, },
//{path:'login',component:LoginComponent},
{path:'navbar',component:NavBarComponent},
{path:'dashboard',component:DashboardComponent},
{path:'signup',component: SignupComponent},

]


@NgModule({
  declarations: [
    AppComponent,
    
    HomeComponent,
    LoginComponent,
    
    RegisterComponent,
         NavBarComponent,
         DashboardComponent,
         SignupComponent,

    
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    
    AngularFirestoreModule,
    AngularFireAuthModule,
    //AngularFireAuth

  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
