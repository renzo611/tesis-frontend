import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthRedirectGuard } from './guards/auth-redirect.guard';


const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  {
    path: 'carreras',
    loadChildren: ()=>import('./pages/carreras/carreras.module').then(m=>m.CarrerasModule),canActivate:[AuthGuard]
  },
  {
    path: 'materias',
    loadChildren: ()=>import('./pages/materias/materias.module').then(m=>m.MateriasModule),canActivate:[AuthGuard]
  },
  {
    path: 'timetable',
    loadChildren: ()=>import('./pages/timetabling/timetabling.module').then(m=>m.TimetablingModule),canActivate:[AuthGuard]
  },
  {
    path: 'docentes',
    loadChildren: ()=>import('./pages/docentes/docentes.module').then(m=>m.DocentesModule),canActivate:[AuthGuard]
  },
  { path:'usuarios',
    loadChildren: ()=>import('./pages/usuarios/usuarios.module').then(m=>m.UsuariosModule),canActivate:[AuthGuard],data: { expectedRoles: ['ROLE_ADMIN']}
  },
  { path:'aulas',
    loadChildren: ()=>import('./pages/aulas/aulas.module').then(m=>m.AulasModule),canActivate:[AuthGuard],data: { expectedRoles: ['ROLE_ADMIN']}
  },
  { path:'planes-de-estudio',
    loadChildren: ()=>import('./pages/planes-de-estudio/planes-de-estudio.module').then(m=>m.PlanesDeEstudioModule),canActivate:[AuthGuard],data: { expectedRoles: ['ROLE_ADMIN']}
  },
  { path:'login',
    loadChildren: ()=>import('./pages/auth/auth.module').then(m=>m.AuthModule),canActivate:[AuthRedirectGuard]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: "**", redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
