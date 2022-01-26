import { Router } from '@angular/router';
import { UserServiceService } from './../user-service.service';
import { User } from './../user';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {

  constructor(private dataService: DataService, private userService: UserServiceService, private rounter: Router) { }

  otp = this.dataService.getOTP();
  phone = this.dataService.getTempUser().phone;

  ngOnInit(): void {
  }

  onSubmit(otpEnter: NgForm): void{
    // alert(otpEnter.value.otp + " " +this.otp);
    if(otpEnter.value.otp === this.otp){
      this.userService.registerUser(this.dataService.getTempUser()).subscribe(
        (response: User) => {
          this.dataService.setLoggedUser(response);
          this.dataService.deleteTempUser();
          this.dataService.deleteOTP();
          this.rounter.navigateByUrl('/').then(
            () => {
              window.location.reload();
            }
          );
        },
        (error: HttpErrorResponse) => { alert(error.message) }
      )
    }
  }

}
