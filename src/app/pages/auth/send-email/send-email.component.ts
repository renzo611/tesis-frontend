import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EmailPasswordService } from '../../../services/email-password.service';
import { EmailValuesDTO } from '../../../models/email-values-dto';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.css']
})
export class SendEmailComponent implements OnInit {
  form!: FormGroup;
  dto!: EmailValuesDTO;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private emailPasswordService: EmailPasswordService, 
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      mailTo: ['', Validators.required],
    });
  }

  onSendEmail(): void {
    this.loading = true; // Mostrar el spinner
    const dto: EmailValuesDTO = this.form.value;
    this.emailPasswordService.sendEmail(dto).subscribe((data) => {
      this.loading = false; // Ocultar el spinner
      this.openSnackBar("Correo enviado con éxito", "aceptar");
      this.router.navigate(["/login"]);
    }, error => {
      this.loading = false; // Ocultar el spinner
      this.openSnackBar(error.error.mensaje, "aceptar");
      console.log(error);
    });
  }

  openSnackBar(message: string, action: string): void {
    this._snackBar.open(message, action, {
      duration: 3000
    });
  }

  volver(): void {
    this.router.navigate(['/login']);
  }
}
