import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from '../../../services/usuarios.service';
import { Router } from '@angular/router';
import { ModificarComponent } from '../../../pages/usuarios/modificar/modificar.component';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BuscarUsuarioResponseModel } from '../../../models/buscar-usuario-response-model';

@Component({
  selector: 'app-ver-detalles',
  templateUrl: './ver-detalles.component.html',
  styleUrls: ['./ver-detalles.component.css']
})
export class VerDetallesComponent {

  @Input() id!:number;

  form!: FormGroup;

  constructor(private http: HttpClient, private usuarioService: UsuariosService, private fb: FormBuilder, private router: Router,private dialogRef: MatDialogRef<ModificarComponent>,private _snackBar: MatSnackBar) { }

  ngOnInit(): void{
    this.form = this.fb.group({
      id:0,
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', Validators.required],
      role: ['', Validators.required],
    })

     this.usuarioService.getUser(this.id).subscribe((resp: BuscarUsuarioResponseModel) => {
      this.form.patchValue({
        id: resp.id,
        name: resp.name,
        lastName: resp.lastName,
        userName: resp.userName,
        email: resp.email,
        role: resp.role.roleName
      });
    });
  }
}
