import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-edit-button',
  imports: [RouterLink],
  templateUrl: './edit-button.component.html',
  styleUrl: './edit-button.component.css'
})
export class EditButtonComponent {
  @Input() id!: string;
}
