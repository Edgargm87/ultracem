import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { DatosContactoComponent } from '../components/modals/datos-contacto/datos-contacto.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import { MensajeErrorComponent } from './mensaje-error/mensaje-error.component';
import { MensajeRechazadoComponent } from './mensaje-rechazado/mensaje-rechazado.component';
import { MensajeAprobadoComponent } from './mensaje-aprobado/mensaje-aprobado.component';

@NgModule({
    imports: [MatInputModule, MatDialogModule, MatCheckboxModule, MatSelectModule, MatButtonModule, MatProgressSpinnerModule, MatDatepickerModule, MatNativeDateModule, MatTooltipModule, ReactiveFormsModule, CommonModule],
  exports: [DatosContactoComponent, MatInputModule, MatDialogModule, MatCheckboxModule, MatSelectModule, MatButtonModule, MatProgressSpinnerModule, MatDatepickerModule, MatNativeDateModule, MatTooltipModule, MensajeErrorComponent, MensajeRechazadoComponent],
    declarations: [
        DatosContactoComponent,
        MensajeErrorComponent,
        MensajeRechazadoComponent,
        MensajeAprobadoComponent,

    ],
    entryComponents: [DatosContactoComponent],
    providers: [],
})
export class SharedModule { }
