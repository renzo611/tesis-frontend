// app.component.ts
import { Component } from '@angular/core';
import { TokenService } from './services/token.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChangePasswordComponent } from './pages/auth/change-password/change-password.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(public tokenService:TokenService){}
}
