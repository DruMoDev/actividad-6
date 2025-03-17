import { Component, inject, Input } from '@angular/core';
import {
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-user',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-user.component.html',
  styleUrl: './form-user.component.css',
})
export class FormUserComponent {
  userForm: FormGroup;
  @Input() id!: string;
  userService = inject(UsersService);
  router = inject(Router);
  title: string = 'Nuevo Usuario';
  buttonText: string = 'Crear Usuario';

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
    console.log('ID', this.id);

    if (this.id) {
      try {
        const res = await this.userService.getUserById(this.id);
        console.log('From Form', res);

        this.userForm.patchValue(res);
      } catch (error) {
        console.log(error);
      }
    }
  }

  submitForm() {
    console.log(this.userForm.value);
  }

  // getErrorMessage(controlName: string): string {
  //   const control = this.userForm.get(controlName);
  //   if (control?.hasError('required')) {
  //     return 'Este campo es requerido';
  //   }
  //   if (control?.hasError('email')) {
  //     return 'Por favor, introduce un email válido';
  //   }
  //   if (control?.hasError('minlength')) {
  //     return `El campo debe tener al menos ${control.errors?.['minlength'].requiredLength} caracteres`;
  //   }
  //   if (control?.hasError('pattern')) {
  //     return 'Por favor, introduce una URL válida';
  //   }
  //   return '';
  // }
}
