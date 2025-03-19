import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { lastValueFrom } from 'rxjs';

type ApiResponse = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  results: User[];
};

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private baseUrl: string = 'https://peticiones.online/api/users';
  private httpClient = inject(HttpClient);

  getAll(page: number = 1): Promise<ApiResponse> {
    return lastValueFrom(
      this.httpClient.get<ApiResponse>(`${this.baseUrl}?page=${page}`)
    );
  }

  getUserById(id: string): Promise<User> {
    return lastValueFrom(this.httpClient.get<User>(`${this.baseUrl}/${id}`));
  }

  delete(id: string): Promise<User | { error: string }> {
    return lastValueFrom(this.httpClient.delete<User>(`${this.baseUrl}/${id}`));
  }

  create(user: User): Promise<User> {
    return lastValueFrom(this.httpClient.post<User>(this.baseUrl, user));
  }

  update(id: string, user: Partial<User>): Promise<User | { error: string }> {
    return lastValueFrom(
      this.httpClient.put<User>(`${this.baseUrl}/${id}`, user)
    );
  }
}
