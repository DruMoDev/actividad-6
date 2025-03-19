import { Component, inject } from '@angular/core';
import { UserCardComponent } from '../user-card/user-card.component';
import { UsersService } from '../../services/users.service';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-users-list',
  imports: [UserCardComponent],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css',
})
export class UsersListComponent {
  usersList: User[] = [];
  usersService = inject(UsersService);
  page: number = 1;
  totalPages: number = 0;

  async ngOnInit() {
    try {
      let response = await this.usersService.getAll();
      this.usersList = response.results;
      this.totalPages = response.total_pages;
    } catch (error) {
      console.error(error);
    }
  }

  changePage(number: number) {
    this.page += number;
    if (this.page < 1) {
      this.page = 1;
    }
    if (this.page > this.totalPages) {
      this.page = 1;
    }
    this.usersService.getAll(this.page).then((response) => {
      this.usersList = response.results;
    });
  }
}
