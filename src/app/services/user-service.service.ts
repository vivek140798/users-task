import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http: HttpClient) {}

  async getUsers(): Promise<any> {
    return this.http.get('https://reqres.in/api/users').toPromise();
  }
}
