import { Component, Input } from '@angular/core';
import { User } from '../../interfaces/user.interface';
import { RouterLink } from '@angular/router';
import { DeleteButtonComponent } from '../buttons/delete-button/delete-button.component';
import { EditButtonComponent } from "../buttons/edit-button/edit-button.component";
import { ViewMoreButtonComponent } from "../buttons/view-more-button/view-more-button.component";
@Component({
  selector: '[app-user-card]',
  imports: [RouterLink, DeleteButtonComponent, EditButtonComponent, ViewMoreButtonComponent],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent {
  @Input() user!: User;


}
