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

  async ngOnInit() {
    try {
      let response = await this.usersService.getAll();
      this.usersList = response.results;
      console.log(this.usersList);
    } catch (error) {
      console.error(error);
    }
  }
}
