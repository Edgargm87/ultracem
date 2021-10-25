import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ExampleComponent } from './pages/example/example.component';





const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'example',
    component: ExampleComponent
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
