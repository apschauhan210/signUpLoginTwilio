import { UserServiceService } from './user-service.service';
import { Component } from '@angular/core';
import { DataService } from './data.service';
import { User } from './user';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(private dataService: DataService, private userService: UserServiceService){}

  loggedUser = this.dataService.getLoggedUser();

  toggleDropdown(): void {
    const dropdown =  document.getElementById('dropdown')
    if(dropdown?.style.getPropertyValue('display') === 'none') {
      dropdown.style.setProperty('display', 'block');
    }
    else{
     dropdown?.style.setProperty('display', 'none');
    }
  }

  logOut(){
    this.dataService.deleteLoggedUser();
    location.reload();
  }

  delete(){
    if(confirm("Are you sure to delete your account?")){
      this.userService.deleteUser(this.loggedUser.phone).subscribe(
        (response: User) => {
          alert("Your account has been deleted successfully");
          this.dataService.deleteLoggedUser();
          location.reload();
        },
        (error: HttpErrorResponse) => {alert(error.message);}
      )
    }
  }
}
