import { Component, inject, Input } from '@angular/core';
import { toast } from 'ngx-sonner';
import { UsersService } from '../../../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-button',
  imports: [],
  templateUrl: './delete-button.component.html',
  styleUrl: './delete-button.component.css',
})
export class DeleteButtonComponent {
  @Input() id!: string;
  usersService = inject(UsersService);
  router = inject(Router);

  async deleteUser() {
    toast.warning('Desea eliminar el usuario?', {
      action: {
        label: 'Eliminar',
        onClick: async () => {
          try {
            const res = await this.usersService.delete(this.id);
            this.router.navigate(['/home']);
          } catch (error) {
            toast.error('Error al eliminar el usuario');
          }
        },
      },
      position: 'top-center',
      cancel: {
        label: 'Cancelar',
        onClick: () => {
          toast.dismiss();
        },
      },
      duration: Infinity,
    });
  }
}
