import { Component } from '@angular/core';
import { UserCardComponent } from "../user-card/user-card.component";

@Component({
  selector: 'app-users-list',
  imports: [UserCardComponent],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent {

}
