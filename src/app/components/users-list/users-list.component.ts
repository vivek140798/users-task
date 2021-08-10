import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SnackBarConfig } from 'src/app/models/snack-bar.model';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { TableConfig } from '../../models/table-config.model';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ConfirmDialogModel } from '../confirm-dialog/ConfirmDialogModel';
import { UserServiceService } from '../../services/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  public tableConfigData: TableConfig;
  public snackBarData: SnackBarConfig;
  underProcess: boolean = false;
  headers: any;
  data: any;
  keys: any;
  tempId: number = 1000;

  constructor(private router: Router, public dialog: MatDialog, private readonly snackBarService: SnackBarService, private userServiceService:UserServiceService) { }

  ngOnInit(): void {
    this.tableConfigData = new TableConfig();
    this.snackBarData = new SnackBarConfig();
    this.headers = ['Id', 'Image', 'Name', 'Email','Actions'];
    this.data = [];
    this.keys = ['id', 'avatar', 'name','email'];
    this.frameTableConfigData();
    this.userServiceService.getUsers().then(result=>{
      let response = result.data;
      response.forEach(item => {
        item['name'] = item.first_name + ' ' + item.last_name;
      });
      this.data = response;
      this.frameTableConfigData();
      this.tableConfigData = { ...this.tableConfigData };
    })
  }

  frameTableConfigData() {
    this.tableConfigData.headers = this.headers
    this.tableConfigData.data = this.data
    this.tableConfigData.keys = this.keys
  }

  modify(result) {
    if (result.type == 'view') {
      this.router.navigate(['user', result.data.id], { state: { item: result.data } });
    }
    else if (result.type == 'delete') {
      this.deleteAction(result.data.id);
    }
  }

  deleteAction(id) {
    const dialogData = new ConfirmDialogModel('Delete the User', 'Are you sure you want to delete this user?', 'Delete', 'Cancel');
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: dialogData,
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.data.forEach((item, index) => {
          if (item.id == id) {
            this.data = this.data.slice(0, index).concat(this.data.slice(index + 1));
          }
        })
        this.frameTableConfigData();
        this.tableConfigData = { ...this.tableConfigData };
        this.frameSnackBarModel('Successfully deleted the record', 'top', 'center', 2000, ['success']);
        this.snackBarService.openSnackBar(this.snackBarData);
      }
    });
  }


  frameSnackBarModel(message, verticalPosition, horizontalPosition, duration, panelClass) {
    this.snackBarData.message = message;
    this.snackBarData.verticalPosition = verticalPosition;
    this.snackBarData.horizontalPosition = horizontalPosition;
    this.snackBarData.duration = duration;
    this.snackBarData.panelClass = panelClass;
  }


}
