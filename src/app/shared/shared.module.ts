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
import {RouterModule} from "@angular/router";
import { BottomSheetComponent } from './bottom-sheet/bottom-sheet.component';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import { MensajeFinalizadoComponent } from './mensaje-finalizado/mensaje-finalizado.component';
import { ReconocerComponent } from './reconocer/reconocer.component';
import { ModalAceptoTerminosComponent } from './modal-acepto-terminos/modal-acepto-terminos.component';
import { ExistenteComponent } from './existente/existente.component';

@NgModule({
  imports: [MatInputModule, MatDialogModule, MatCheckboxModule, MatSelectModule, MatButtonModule, MatProgressSpinnerModule, MatDatepickerModule, MatNativeDateModule, MatTooltipModule, ReactiveFormsModule, CommonModule, RouterModule,MatBottomSheetModule],
  exports: [DatosContactoComponent, MatInputModule, MatDialogModule, MatCheckboxModule, MatSelectModule, MatButtonModule, MatProgressSpinnerModule, MatDatepickerModule, MatNativeDateModule, MatTooltipModule, MensajeErrorComponent, MensajeRechazadoComponent,BottomSheetComponent],
    declarations: [
        DatosContactoComponent,
        MensajeErrorComponent,
        MensajeRechazadoComponent,
        MensajeAprobadoComponent,
        BottomSheetComponent,
        MensajeFinalizadoComponent,
        ReconocerComponent,
        ModalAceptoTerminosComponent,
        ExistenteComponent

    ],
    entryComponents: [DatosContactoComponent],
    providers: [],
})
export class SharedModule { }
