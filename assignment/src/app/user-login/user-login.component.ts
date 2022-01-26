import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserServiceService } from './../user-service.service';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  constructor(private userService: UserServiceService, private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(userLogin: NgForm): void{
    this.userService.validateUser(userLogin.value).subscribe(
      (response: boolean) => {
        if(response === true){
          this.dataService.setLoggedUser(userLogin.value);
          this.router.navigateByUrl('/').then(() => {
            window.location.reload();
          });
        }
        else
          alert("The mobile number or password you entered is incorrect. Please double check and try again.");
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }
}
