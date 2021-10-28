import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ListSolicitudComponent } from './pages/main/list-solicitud/list-solicitud.component';
import { solicitudComponent } from './pages/solicitud/solicitud.component';
import { DatoComplementarioPnaturalComponent } from './pages/main/dato-complementario-pnatural/dato-complementario-pnatural.component';
import { DatoComplementarioPjuridicaComponent } from './pages/main/dato-complementario-pjuridica/dato-complementario-pjuridica.component';





const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'solicitud',
    component: solicitudComponent
  },
  {
    path: 'main/listRequest',
    component: ListSolicitudComponent
  },
  {
    path: 'main/personanatural/:codigoSolicitud',
    component: DatoComplementarioPnaturalComponent
  },
  {
    path: 'main/personajuridica/:codigoSolicitud',
    component: DatoComplementarioPjuridicaComponent
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
