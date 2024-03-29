import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { solicitudComponent } from './pages/solicitud/solicitud.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfigInterceptor } from './interceptor/httpconfig.interceptor';
import { CreditService } from './services/credit.service';
import { MainComponent } from './pages/main/main.component';
import { ListSolicitudComponent } from './pages/main/list-solicitud/list-solicitud.component';
import { DatoComplementarioPnaturalComponent } from './pages/main/dato-complementario-pnatural/dato-complementario-pnatural.component';
import { TimerlineComponent } from './pages/main/list-solicitud/timerline/timerline.component';
import { DirectionsComponent } from './components/modals/directions/directions.component';
import { DatoComplementarioPjuridicaComponent } from './pages/main/dato-complementario-pjuridica/dato-complementario-pjuridica.component';
import { CargoPublicoComponent } from './components/modals/cargo-publico/cargo-publico.component';
import { DocumentsComponent } from './pages/documents/documents.component';
import { LegalComponent } from './components/complementos/legal/legal.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatCardModule} from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { FirmarDocumentosComponent } from './components/modals/firmar-documentos/firmar-documentos.component';
import { DeclaracionComponent } from './components/modals/declaracion/declaracion.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    solicitudComponent,
    MainComponent,
    ListSolicitudComponent,
    DatoComplementarioPnaturalComponent,
    TimerlineComponent,
    DirectionsComponent,
    DatoComplementarioPjuridicaComponent,
    CargoPublicoComponent,
    DocumentsComponent,
    LegalComponent,
    FirmarDocumentosComponent,
    DeclaracionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSlideToggleModule,
    MatCardModule,
    MatMenuModule,
    MatDividerModule,
    MatListModule,
    MatAutocompleteModule
  ],
  providers: [
    CreditService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
