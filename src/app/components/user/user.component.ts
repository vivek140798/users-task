import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  parentId: any;
  imgSrc: string = '';
  userName: string = '';
  userEmail: string = '';

  constructor(private router: Router, private userServiceService: UserServiceService) { }

  ngOnInit(): void {
    const getLastItem = thePath => thePath.substring(thePath.lastIndexOf('/') + 1)
    this.parentId = +getLastItem(this.router.url);
    if (history.state.item) {
      this.imgSrc = history.state.item.avatar;
      this.userName = history.state.item.name;
      this.userEmail = history.state.item.email;
    }
    else {
      this.userServiceService.getUsers().then(result => {
        let response = result.data;
        response.forEach(item => {
          if (item.id == this.parentId) {
            this.imgSrc = item.avatar;
            this.userName = item.first_name + ' ' + item.last_name;
            this.userEmail = item.email;
          }
        });
      })
    }
  }

}
