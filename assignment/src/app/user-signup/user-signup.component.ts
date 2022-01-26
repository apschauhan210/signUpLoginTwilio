import { User } from './../user';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserServiceService } from '../user-service.service';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css']
})
export class UserSignupComponent implements OnInit {

  constructor(private userService: UserServiceService, private router: Router, private dataService: DataService) { }

  ngOnInit(): void {
  }

  onSubmit(addUser: NgForm): void{
    this.userService.requestOTP(addUser.value).subscribe(
      (response: string) => {
        this.dataService.setOTP(response);
        this.dataService.setTempUser(addUser.value);
        addUser.reset();
        this.router.navigateByUrl('/enterOtp');
      },
      (error: HttpErrorResponse) => {alert(error.message);}
    )
  }
}
