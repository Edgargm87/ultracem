import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { solicitudComponent } from './pages/solicitud/solicitud.component';





const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'solicitud',
    component: solicitudComponent
  },
  {
    path: '',
    redirectTo: 'app',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
