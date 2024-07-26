import { Component } from '@angular/core';
import { TokenService } from '../../services/token.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChangePasswordComponent } from '../auth/change-password/change-password.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
dashboard() {
    this.router.navigate(["/dashboard"])
  }
    constructor(public tokenService:TokenService, private dialog: MatDialog,private router:Router,private _snackBar:MatSnackBar
    ){
    }
  
    logout() {
      this.tokenService.logout();
      this.openSnackBar("Cierre de sesion exitoso","aceptar")
    }
  
    openSnackBar(message: string, action: string) {
      this._snackBar.open(message, action,{
        duration: 3000
      });
    }
  
    cambiarContrasenia(){
      const changePassword = this.dialog.open(ChangePasswordComponent);
      changePassword.afterClosed().subscribe();
    }
  
    isAdmin(){
      return this.tokenService.getRole() === 'ROLE_ADMIN';
    }

    isDirector(){
      return this.tokenService.getRole() === 'ROLE_DIRECTOR_CARRERA';
    }

}
