import { Component, inject, Input } from '@angular/core';
import { User } from '../../interfaces/user.interface';
import { UsersService } from '../../services/users.service';
import { Router, RouterLink } from '@angular/router';
import { DeleteButtonComponent } from '../../components/buttons/delete-button/delete-button.component';
import { EditButtonComponent } from '../../components/buttons/edit-button/edit-button.component';
import { ViewMoreButtonComponent } from '../../components/buttons/view-more-button/view-more-button.component';
import { BackButtonComponent } from '../../components/buttons/back-button/back-button.component';

@Component({
  selector: 'app-user',
  imports: [
    RouterLink,
    DeleteButtonComponent,
    EditButtonComponent,
    BackButtonComponent,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  @Input() id!: string;
  user!: User;
  usersService = inject(UsersService);
  router = inject(Router);

  async ngOnInit() {
    const user = await this.usersService.getUserById(this.id);
    this.user = user;
  }
}
