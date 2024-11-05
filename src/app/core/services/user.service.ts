import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { User, UserDetails } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://randomuser.me/api/';

  constructor(private http: HttpClient) {}

  async getUserProfile(): Promise<UserDetails> {
    const {results} = await firstValueFrom(this.http.get<User>(`${this.apiUrl}`));
    const [first] = results
    return first;
  }
}
