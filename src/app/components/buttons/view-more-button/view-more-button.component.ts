import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-view-more-button',
  imports: [RouterLink],
  templateUrl: './view-more-button.component.html',
  styleUrl: './view-more-button.component.css',
})
export class ViewMoreButtonComponent {
  @Input() id!: string;
}
