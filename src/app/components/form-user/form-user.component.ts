import { Component, inject, Input } from '@angular/core';
import {
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-form-user',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './form-user.component.html',
  styleUrl: './form-user.component.css',
})
export class FormUserComponent {
  userForm: FormGroup;
  @Input() id!: string;
  userService = inject(UsersService);
  router = inject(Router);
  title: string = 'Nuevo Usuario';
  buttonText: string = 'Crear';

  constructor() {
    this.userForm = new FormGroup({
      first_name: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      last_name: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      image: new FormControl('', [
        Validators.required,
        Validators.pattern('https?://.+'),
      ]),
    });
  }

  async ngOnInit() {
    if (this.id) {
      try {
        const res = await this.userService.getUserById(this.id);
        console.log('From Form', res);
        this.userForm.patchValue(res);
        this.title = 'Editar Usuario';
        this.buttonText = 'Editar';
      } catch (error) {
        console.log(error);
      }
    }
  }

  async submitForm() {
    if (this.id) {
      try {
        const res = await this.userService.update(this.id, this.userForm.value);
        if ('error' in res) {
          toast.error(res.error);
        } else {
          toast.success(`Usuario ${res.first_name} actualizado correctamente`);
          this.router.navigate(['/home']);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const res = await this.userService.create(this.userForm.value);
        toast.success(`Usuario ${res.first_name} creado correctamente`);
        this.router.navigate(['/home']);
      } catch (error) {
        console.log(error);
      }
    }
  }

  getErrorMessage(controlName: string): string {
    const control = this.userForm.get(controlName);
    if (control?.hasError('required')) {
      return 'Este campo es requerido';
    }
    if (control?.hasError('email')) {
      return 'Por favor, introduce un email válido';
    }
    if (control?.hasError('minlength')) {
      return `El campo debe tener al menos ${control.errors?.['minlength'].requiredLength} caracteres`;
    }
    if (control?.hasError('pattern')) {
      return 'Por favor, introduce una URL válida';
    }
    return '';
  }
}
