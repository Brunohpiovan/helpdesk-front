import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { TecnicoListComponent } from './components/tecnicos/tecnico-list/tecnico-list.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { TecnicoCreateComponent } from './components/tecnicos/tecnico-create/tecnico-create.component';
import { TecnicoUpdateComponent } from './components/tecnicos/tecnico-update/tecnico-update.component';
import { TecnicoDeleteComponent } from './components/tecnicos/tecnico-delete/tecnico-delete.component';

const routes: Routes = [
  {
    path:'login',component:LoginComponent
  },
  {
    path:'',component: NavComponent, canActivate:[AuthGuard], children:[
      {
        path:'home',component: HomeComponent
      },
      {
        path:'tecnicos',component: TecnicoListComponent
      },
      {
        path:'tecnicos/create',component: TecnicoCreateComponent
      },
      {
        path:'tecnicos/update/:id',component: TecnicoUpdateComponent
      },
      {
        path:'tecnicos/delete/:id',component: TecnicoDeleteComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
